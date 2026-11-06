"use strict";

// Mengen werden als ganze Milliliter gespeichert und erst zur Anzeige umgerechnet.
const commonAmounts = [200, 250, 330, 350, 500, 1000];
const extraAmounts = [100, 150, 300, 400, 700, 750, 1500, 2000];
const allAmounts = [...commonAmounts, ...extraAmounts].sort((a, b) => a - b);
const drinks = [
  { name: "Wasser", amounts: allAmounts, color: "#38BDF8" },
  { name: "ISO-Drink", amounts: allAmounts, color: "#A78BFA" },
  { name: "Cola", amounts: allAmounts, color: "#DC3545" },
  { name: "Cola Zero", amounts: allAmounts, color: "#A1A1AA" },
  { name: "Volvic Eistee", amounts: allAmounts, color: "#84CC16" },
  { name: "Kaffee schwarz", amounts: allAmounts, color: "#C49A6C" },
  { name: "Kaffee mit Sojamilch", amounts: allAmounts, color: "#E5CBA6" },
  { name: "Energy-Drink", amounts: allAmounts, color: "#E5B83B" },
  { name: "Bier", amounts: allAmounts, color: "#D9A441" }
];
const storageKey = "getraenketracker-v1";
const historyList = document.querySelector("#history");
const status = document.querySelector("#status");
const storageError = document.querySelector("#storage-error");
let entries = [];
let storageReadable = true;

function showStorageError(message) {
  storageError.textContent = message;
  storageError.hidden = false;
}

function loadEntries() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === null) return;
    const parsed = JSON.parse(saved);
    // Beschädigte Daten werden nicht stillschweigend überschrieben.
    if (!Array.isArray(parsed) || !parsed.every(entry =>
      entry && typeof entry.id === "string" && typeof entry.name === "string" &&
      Number.isInteger(entry.amount) && entry.amount > 0 &&
      typeof entry.timestamp === "string" && Number.isFinite(Date.parse(entry.timestamp)) &&
      /(?:Z|[+-]\d{2}:?\d{2})$/i.test(entry.timestamp) &&
      (entry.date === undefined || validDay(entry.date))
    ) || new Set(parsed.map(entry => entry.id)).size !== parsed.length) {
      throw new Error("Ungültige gespeicherte Daten");
    }
    entries = parsed;
  } catch (error) {
    storageReadable = false;
    showStorageError("Die gespeicherten Daten konnten nicht geladen werden. Neue Einträge bleiben vorerst nur bis zum Schließen dieser Seite erhalten. Vorhandene Browserdaten werden nicht überschrieben. Mögliche Ursache: beschädigte Daten oder ein Zeitstempel ohne eindeutige Zeitzone.");
  }
}

function saveEntries() {
  invalidateImport("Die aktuellen Daten wurden geändert. Bitte die Sicherung erneut auswählen.");
  if (!storageReadable) return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(entries));
    storageError.hidden = true;
  } catch (error) {
    showStorageError("Speichern im Browser ist nicht möglich. Die aktuellen Änderungen gehen beim Neuladen verloren. Bitte prüfe, ob dein Browser lokale Speicherung erlaubt.");
  }
}

// Kalenderdatum immer in Berlin; UTC dient nur zum Rechnen mit Kalendertagen.
const berlinFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit"
});
function berlinDay(timestamp = new Date()) {
  const parts = Object.fromEntries(berlinFormatter.formatToParts(new Date(timestamp)).map(part => [part.type, part.value]));
  return parts.year + "-" + parts.month + "-" + parts.day;
}
function validDay(day) {
  return typeof day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(day) &&
    Number.isFinite(Date.parse(day + "T00:00:00Z")) &&
    new Date(day + "T00:00:00Z").toISOString().slice(0, 10) === day;
}
function shiftDay(day, offset) {
  const date = new Date(day + "T00:00:00Z");
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}
function formatDay(day) {
  return new Intl.DateTimeFormat("de-DE", { timeZone: "UTC", day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(day + "T00:00:00Z"));
}
function liters(amount) {
  return (amount / 1000).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " l";
}
function entryDay(entry) { return entry.date ?? berlinDay(entry.timestamp); }
const dateInput = document.querySelector("#selected-date");
let currentDay = berlinDay();
let selectedDay = currentDay;
let followsToday = true;
let statisticsPeriod = "7";

function closeAmounts() {
  document.querySelector("#amount-selection").hidden = true;
  document.querySelector("#amount-buttons").replaceChildren();
  document.querySelector("#extra-amount-buttons").replaceChildren();
  resetExtraAmounts();
  document.querySelectorAll(".drink-button").forEach(button => button.setAttribute("aria-pressed", "false"));
}
function syncDay() {
  const today = berlinDay();
  if (today !== currentDay) {
    currentDay = today;
    if (followsToday || selectedDay > today) {
      selectedDay = today;
      closeAmounts();
    }
  }
  dateInput.max = today;
  dateInput.value = selectedDay;
}
function statistics(period, today = berlinDay()) {
  const eligible = entries.filter(entry => entryDay(entry) <= today);
  let start = shiftDay(today, period === "30" ? -29 : -6);
  if (period === "all") start = eligible.reduce((first, entry) => entryDay(entry) < first ? entryDay(entry) : first, today);
  const days = [];
  for (let day = start; day <= today; day = shiftDay(day, 1)) days.push({ date: day, amount: 0 });
  const byDay = new Map(days.map(day => [day.date, day]));
  const distribution = new Map();
  let total = 0;
  eligible.forEach(entry => {
    const day = byDay.get(entryDay(entry));
    if (!day) return;
    day.amount += entry.amount;
    total += entry.amount;
    // Nur die Auswertung fasst alte Energy-Namen zusammen; gespeicherte Namen bleiben bestehen.
    const name = /^Energy-Drink(?: 0,(?:25|33|5) l)?$/.test(entry.name) ? "Energy-Drink" : entry.name;
    distribution.set(name, (distribution.get(name) || 0) + entry.amount);
  });
  return { start, end: today, days, total, average: total / days.length, distribution };
}
function renderStatistics() {
  const result = statistics(statisticsPeriod);
  document.querySelector("#statistics-range").textContent = formatDay(result.start) + " – " + formatDay(result.end) + " · " + result.days.length + " Kalendertage";
  document.querySelector("#statistics-total").textContent = liters(result.total);
  document.querySelector("#statistics-average").textContent = liters(result.average);
  const list = document.querySelector("#distribution");
  list.replaceChildren();
  if (!result.distribution.size) {
    const empty = document.createElement("li");
    empty.textContent = "Keine Einträge in diesem Zeitraum.";
    list.append(empty);
  }
  [...result.distribution].sort((a, b) => b[1] - a[1]).forEach(([name, amount]) => {
    const item = document.createElement("li");
    item.textContent = name + ": " + liters(amount) + " (" + amount.toLocaleString("de-DE") + " ml)";
    list.append(item);
  });
  const chart = document.querySelector("#daily-chart");
  chart.replaceChildren();
  const maximum = result.days.reduce((max, day) => Math.max(max, day.amount), 1);
  const fragment = document.createDocumentFragment();
  result.days.forEach(day => {
    const column = document.createElement("div");
    column.className = "chart-day";
    column.setAttribute("aria-label", formatDay(day.date) + ": " + liters(day.amount));
    const value = document.createElement("span");
    value.textContent = liters(day.amount);
    const track = document.createElement("div");
    track.className = "chart-track";
    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.height = (day.amount / maximum * 100) + "%";
    track.append(bar);
    const label = document.createElement("span");
    label.textContent = formatDay(day.date);
    column.append(value, track, label);
    fragment.append(column);
  });
  chart.append(fragment);
}

function render() {
  syncDay();
  const todayEntries = entries.filter(entry => entryDay(entry) === currentDay);
  const dayEntries = entries.filter(entry => entryDay(entry) === selectedDay);
  document.querySelector("#today-date").textContent = formatDay(currentDay);
  document.querySelector("#daily-total").textContent = liters(todayEntries.reduce((sum, entry) => sum + entry.amount, 0));
  document.querySelector("#daily-count").textContent = todayEntries.length;
  document.querySelector("#capture-date").textContent = "Neue Einträge für: " + formatDay(selectedDay) + (selectedDay === currentDay ? " (heute)" : " (Nachtrag)") + " · Europe/Berlin";
  document.querySelector("#history-date").textContent = formatDay(selectedDay) + " · Neueste Erfassung zuerst";
  document.querySelector("#selected-summary").textContent = liters(dayEntries.reduce((sum, entry) => sum + entry.amount, 0)) + " · " + dayEntries.length + " Einträge";
  document.querySelector("#empty-state").hidden = dayEntries.length > 0;
  document.querySelector("#empty-state").textContent = "Für diesen Tag sind noch keine Getränke erfasst.";
  historyList.replaceChildren();
  renderStatistics();

  [...dayEntries].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).forEach(entry => {
    const item = document.createElement("li");
    item.className = "history-item";
    const info = document.createElement("div");
    info.className = "entry-info";
    const name = document.createElement("span");
    name.className = "entry-name";
    name.textContent = entry.name;
    info.append(name);
    const amount = document.createElement("span");
    amount.className = "entry-amount";
    amount.textContent = `${entry.amount} ml`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-button";
    remove.textContent = "Löschen";
    remove.setAttribute("aria-label", `${entry.name}, ${formatDay(entryDay(entry))}, löschen`);
    remove.addEventListener("click", () => {
      const previousButtons = [...historyList.querySelectorAll("button")];
      const index = previousButtons.indexOf(remove);
      entries = entries.filter(candidate => candidate.id !== entry.id);
      saveEntries();
      render();
      const remaining = historyList.querySelectorAll("button");
      (remaining[Math.min(index, remaining.length - 1)] || document.querySelector(".drink-button")).focus();
      status.textContent = `${entry.name} gelöscht.`;
    });
    item.append(info, amount, remove);
    historyList.append(item);
  });
}

const amountSelection = document.querySelector("#amount-selection");
const amountButtons = document.querySelector("#amount-buttons");
const extraAmountButtons = document.querySelector("#extra-amount-buttons");
const toggleAmounts = document.querySelector("#toggle-amounts");

function resetExtraAmounts() {
  extraAmountButtons.hidden = true;
  toggleAmounts.setAttribute("aria-expanded", "false");
  toggleAmounts.textContent = "Weitere Größen anzeigen";
}

toggleAmounts.addEventListener("click", () => {
  const expanded = toggleAmounts.getAttribute("aria-expanded") !== "true";
  extraAmountButtons.hidden = !expanded;
  toggleAmounts.setAttribute("aria-expanded", String(expanded));
  toggleAmounts.textContent = expanded ? "Weitere Größen ausblenden" : "Weitere Größen anzeigen";
});

function showAmounts(drink, drinkButton) {
  syncDay();
  const captureDay = selectedDay;
  document.querySelectorAll(".drink-button").forEach(button => {
    button.setAttribute("aria-pressed", String(button === drinkButton));
  });
  amountSelection.style.setProperty("--drink-color", drink.color);
  document.querySelector("#amount-heading").textContent = `${drink.name}: Menge für ${formatDay(captureDay)} wählen`;
  amountButtons.replaceChildren();
  extraAmountButtons.replaceChildren();
  resetExtraAmounts();
  [...commonAmounts, ...extraAmounts].forEach(amount => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "amount-button";
    button.textContent = `${amount} ml · ${liters(amount)}`;
    button.addEventListener("click", () => {
      syncDay();
      if (!validDay(captureDay) || captureDay > currentDay || captureDay !== selectedDay) {
        closeAmounts();
        render();
        status.textContent = "Das Datum hat sich geändert. Bitte Getränk und Menge erneut wählen.";
        return;
      }
      entries.unshift({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: drink.name,
        amount,
        date: captureDay,
        timestamp: new Date().toISOString()
      });
      saveEntries();
      render();
      closeAmounts();
      drinkButton.focus();
      status.textContent = `${drink.name}: ${amount} ml für ${formatDay(captureDay)} hinzugefügt.`;
    });
    (commonAmounts.includes(amount) ? amountButtons : extraAmountButtons).append(button);
  });
  amountSelection.hidden = false;
  status.textContent = `${drink.name} ausgewählt. Bitte eine Menge wählen.`;
}

drinks.forEach(drink => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "drink-button";
  button.style.setProperty("--drink-color", drink.color);
  button.setAttribute("aria-pressed", "false");
  button.setAttribute("aria-controls", "amount-selection");
  const name = document.createElement("span");
  name.textContent = drink.name;
  const amount = document.createElement("small");
  amount.textContent = "100–2000 ml · Menge wählen";
  button.append(name, amount);
  button.addEventListener("click", () => showAmounts(drink, button));
  document.querySelector("#drink-buttons").append(button);
});

dateInput.addEventListener("change", () => {
  const requested = dateInput.value;
  if (!validDay(requested) || requested > berlinDay()) {
    status.textContent = "Bitte heute oder ein gültiges vergangenes Datum wählen.";
    dateInput.value = selectedDay;
    return;
  }
  selectedDay = requested;
  followsToday = requested === berlinDay();
  closeAmounts();
  render();
});
document.querySelector("#select-today").addEventListener("click", () => {
  selectedDay = berlinDay();
  followsToday = true;
  closeAmounts();
  render();
});
document.querySelector("#statistics-period").addEventListener("change", event => {
  statisticsPeriod = event.target.value;
  renderStatistics();
});

// Sicherungen sind eine Hülle um unveränderte Eintragsobjekte, keine Migration.
const backupFormat = "getraenketracker-backup";
const backupFormatVersion = 1;
const backupStatus = document.querySelector("#backup-status");
const backupError = document.querySelector("#backup-error");
const backupFile = document.querySelector("#backup-file");
const importPreview = document.querySelector("#import-preview");
const safetyConfirmed = document.querySelector("#safety-confirmed");
const replaceButton = document.querySelector("#replace-data");
const finalConfirmation = document.querySelector("#final-confirmation");
let pendingImport = null;
let importSequence = 0;

function backupFailure(message) {
  backupError.textContent = message;
  backupError.hidden = false;
}

function invalidateImport(message = "") {
  const active = pendingImport !== null || importPreview.hidden === false;
  importSequence += 1; // Auch eine noch laufende Datei-Leseoperation verwerfen.
  pendingImport = null;
  importPreview.hidden = true;
  finalConfirmation.hidden = true;
  safetyConfirmed.checked = false;
  safetyConfirmed.disabled = true;
  replaceButton.disabled = true;
  backupFile.value = "";
  if (message && active) backupStatus.textContent = message;
}

function validTimestamp(value) {
  if (typeof value !== "string") return false;
  const parts = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-](\d{2}):?(\d{2}))$/i.exec(value);
  return !!parts && validDay(parts[1]) && parts[1] >= "0001-01-01" &&
    Number(parts[2]) < 24 && Number(parts[3]) < 60 && Number(parts[4]) < 60 &&
    (parts[5].toUpperCase() === "Z" || (Number(parts[6]) < 24 && Number(parts[7]) < 60)) &&
    Number.isFinite(Date.parse(value));
}

function validateBackupEntries(data, strict = true) {
  if (!Array.isArray(data)) throw new Error("Die Einträge müssen als Liste vorliegen.");
  const ids = new Set();
  let total = 0;
  data.forEach((entry, index) => {
    const fail = reason => { throw new Error(`Eintrag ${index + 1}: ${reason}`); };
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) fail("Kein gültiges Eintragsobjekt.");
    if (typeof entry.id !== "string" || (strict && !entry.id.trim())) fail("Ungültige Kennung.");
    if (ids.has(entry.id)) fail("Die Kennung kommt mehrfach vor.");
    ids.add(entry.id);
    if (typeof entry.name !== "string" || (strict && !entry.name.trim())) fail("Ungültiger Getränkename.");
    if (!Number.isSafeInteger(entry.amount) || entry.amount <= 0) fail("Die Menge muss eine positive ganze Milliliterzahl sein.");
    if (typeof entry.timestamp !== "string" || !Number.isFinite(Date.parse(entry.timestamp)) ||
        !/(?:Z|[+-]\d{2}:?\d{2})$/i.test(entry.timestamp) || (strict && !validTimestamp(entry.timestamp))) {
      fail("Ungültiger Zeitstempel oder fehlende Zeitzone.");
    }
    if (entry.date !== undefined && !validDay(entry.date)) fail("Ungültiges Trinkdatum.");
    if (strict) {
      const oldEnergy = { "Energy-Drink 0,25 l": 250, "Energy-Drink 0,33 l": 330, "Energy-Drink 0,5 l": 500 };
      const drink = drinks.find(candidate => candidate.name === entry.name);
      const legacyAmount = Object.hasOwn(oldEnergy, entry.name) ? oldEnergy[entry.name] : undefined;
      if (!(drink && drink.amounts.includes(entry.amount)) && legacyAmount !== entry.amount) fail("Unbekanntes Getränk oder unzulässige Getränkemenge.");
      const day = entryDay(entry);
      if (!validDay(day) || day < "0001-01-01" || day > berlinDay()) fail("Das Trinkdatum muss heute oder in der Vergangenheit liegen.");
    }
    total += entry.amount;
    if (!Number.isSafeInteger(total)) fail("Die Gesamtmenge überschreitet den sicher berechenbaren Zahlenbereich.");
  });
  return data;
}

function readStoredSnapshot() {
  const raw = localStorage.getItem(storageKey);
  const data = raw === null ? [] : JSON.parse(raw);
  validateBackupEntries(data, false);
  return { raw, data };
}

function makeBackup(data) {
  return { format: backupFormat, formatVersion: backupFormatVersion, createdAt: new Date().toISOString(), entries: data };
}

function downloadBackup(data, safety = false) {
  const content = JSON.stringify(makeBackup(data), null, 2);
  const url = URL.createObjectURL(new Blob([content], { type: "application/json;charset=utf-8" }));
  const link = document.createElement("a");
  try {
    link.href = url;
    link.download = `getraenketracker-${safety ? "sicherheitskopie" : "backup"}-${berlinDay()}.json`;
    document.body.append(link);
    link.click();
  } finally {
    link.remove();
    // Der Download wird nur angestoßen. Ob gespeichert wurde, weiß nur der Nutzer.
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
}

function parseBackup(text) {
  let backup;
  try { backup = JSON.parse(text); }
  catch (error) { throw new Error("Die Datei enthält kein gültiges JSON."); }
  if (!backup || typeof backup !== "object" || backup.format !== backupFormat || backup.formatVersion !== backupFormatVersion) {
    throw new Error("Unbekanntes Sicherungsformat oder nicht unterstützte Formatversion.");
  }
  if (!validTimestamp(backup.createdAt)) throw new Error("Das Erstellungsdatum der Sicherung ist ungültig.");
  return validateBackupEntries(backup.entries);
}

function importRange(data) {
  if (!data.length) return "keine Einträge (leere Sicherung)";
  let first = entryDay(data[0]);
  let last = first;
  data.forEach(entry => {
    const day = entryDay(entry);
    if (day < first) first = day;
    if (day > last) last = day;
  });
  return `${formatDay(first)} bis ${formatDay(last)}`;
}

function checkImportBaseline() {
  if (!pendingImport || !storageReadable) throw new Error("Keine freigegebene Wiederherstellung verfügbar. Bitte die Datei erneut auswählen.");
  const snapshot = readStoredSnapshot();
  if (snapshot.raw !== pendingImport.originalRaw || JSON.stringify(entries) !== pendingImport.memoryRaw) {
    throw new Error("Die aktuellen Daten haben sich geändert. Import abgebrochen. Bitte zuerst die aktuellen Daten sichern und die Seite neu laden.");
  }
  return snapshot;
}

document.querySelector("#export-backup").addEventListener("click", () => {
  backupError.hidden = true;
  backupStatus.textContent = "";
  try {
    const snapshot = readStoredSnapshot();
    downloadBackup(snapshot.data);
    backupStatus.textContent = `Download für ${snapshot.data.length} gespeicherte Einträge angefordert. Bitte prüfe selbst, ob die JSON-Datei erfolgreich gespeichert wurde.`;
  } catch (error) {
    backupFailure(`Sicherung konnte nicht erstellt werden: ${error.message}`);
  }
});

document.querySelector("#choose-backup").addEventListener("click", () => {
  invalidateImport();
  backupError.hidden = true;
  backupStatus.textContent = "Datei auswählen. Das Einlesen verändert keine Daten.";
  backupFile.click();
});

backupFile.addEventListener("change", async () => {
  const file = backupFile.files && backupFile.files[0];
  invalidateImport();
  backupError.hidden = true;
  if (!file) { backupStatus.textContent = "Keine Datei ausgewählt. Daten unverändert."; return; }
  const sequence = importSequence;
  backupStatus.textContent = "Sicherung wird nur gelesen und geprüft …";
  try {
    const text = await file.text();
    if (sequence !== importSequence) return;
    const data = parseBackup(text);
    if (!storageReadable) throw new Error("Die aktuellen Browserdaten sind nicht sicher lesbar. Wiederherstellung ist gesperrt.");
    const snapshot = readStoredSnapshot();
    if (JSON.stringify(snapshot.data) !== JSON.stringify(entries)) throw new Error("Die Anzeige stimmt nicht mit dem gespeicherten Bestand überein. Bitte zuerst den aktuellen Bestand sichern und die Seite neu laden.");
    pendingImport = {
      data, originalRaw: snapshot.raw, memoryRaw: JSON.stringify(entries),
      safetyRequested: false, safetyAccepted: false, finalRequested: false
    };
    document.querySelector("#import-summary").textContent = `Aktuell gespeichert: ${snapshot.data.length} Einträge. Sicherung: ${data.length} Einträge. Trinkdatumsbereich: ${importRange(data)}. Der aktuelle Bestand wird vollständig ersetzt.`;
    importPreview.hidden = false;
    backupStatus.textContent = "Sicherung gültig. Noch keine Daten geändert. Lade zunächst die Sicherheitskopie herunter.";
  } catch (error) {
    if (sequence !== importSequence) return;
    invalidateImport();
    backupFailure(`Import abgelehnt: ${error.message} Es wurden keine Daten geändert.`);
  }
});

document.querySelector("#download-safety").addEventListener("click", () => {
  backupError.hidden = true;
  backupStatus.textContent = "";
  safetyConfirmed.checked = false;
  safetyConfirmed.disabled = true;
  replaceButton.disabled = true;
  finalConfirmation.hidden = true;
  if (pendingImport) {
    pendingImport.safetyRequested = false;
    pendingImport.safetyAccepted = false;
    pendingImport.finalRequested = false;
  }
  try {
    const snapshot = checkImportBaseline();
    downloadBackup(snapshot.data, true);
    pendingImport.safetyRequested = true;
    safetyConfirmed.disabled = false;
    backupStatus.textContent = "Download der Sicherheitskopie angefordert. Der Browser meldet keinen sicheren Speichererfolg. Bestätige das Kästchen nur, wenn die Datei tatsächlich gespeichert wurde und zugänglich ist. Bei Abbruch den Import abbrechen.";
  } catch (error) {
    invalidateImport();
    backupFailure(`Sicherheitskopie nicht freigegeben: ${error.message}`);
  }
});

safetyConfirmed.addEventListener("change", () => {
  if (!pendingImport || !pendingImport.safetyRequested || safetyConfirmed.disabled) return;
  pendingImport.safetyAccepted = safetyConfirmed.checked;
  pendingImport.finalRequested = false;
  finalConfirmation.hidden = true;
  replaceButton.disabled = !pendingImport.safetyAccepted;
});

replaceButton.addEventListener("click", () => {
  try {
    const snapshot = checkImportBaseline();
    if (!pendingImport.safetyRequested || !pendingImport.safetyAccepted || !safetyConfirmed.checked) throw new Error("Bitte zuerst die erfolgreich gespeicherte Sicherheitskopie ausdrücklich bestätigen.");
    pendingImport.finalRequested = true;
    document.querySelector("#replace-summary").textContent = `Endgültig ersetzen: ${snapshot.data.length} bisherige Einträge werden durch ${pendingImport.data.length} Einträge aus der Sicherung ersetzt. Möchtest du das jetzt ausführen?`;
    finalConfirmation.hidden = false;
    document.querySelector("#confirm-replace").focus();
  } catch (error) { backupFailure(error.message); }
});

function restoreConfirmedBackup() {
  const snapshot = checkImportBaseline();
  if (!pendingImport.safetyRequested || !pendingImport.safetyAccepted || !safetyConfirmed.checked || !pendingImport.finalRequested) {
    throw new Error("Die Bestätigung der Sicherheitskopie und die separate Freigabe zum Ersetzen fehlen.");
  }
  validateBackupEntries(pendingImport.data);
  const replacement = JSON.stringify(pendingImport.data);
  const imported = pendingImport.data;
  try {
    // Im Erfolgsfall genau ein Schreibvorgang, danach exakter Rücklesevergleich.
    localStorage.setItem(storageKey, replacement);
    if (localStorage.getItem(storageKey) !== replacement) throw new Error("Der gespeicherte Bestand stimmt nicht mit der Sicherung überein.");
  } catch (error) {
    let recovered = false;
    try {
      const current = localStorage.getItem(storageKey);
      if (current !== snapshot.raw) {
        // Einen erkennbar fremden Zwischenstand nicht durch ein Rollback überschreiben.
        if (current !== replacement) throw new Error("Der Speicher wurde zwischenzeitlich verändert.");
        if (snapshot.raw === null) localStorage.removeItem(storageKey);
        else localStorage.setItem(storageKey, snapshot.raw);
      }
      recovered = localStorage.getItem(storageKey) === snapshot.raw;
    } catch (rollbackError) { recovered = false; }
    invalidateImport();
    if (!recovered) {
      storageReadable = false; // Auch die normalen Erfassungsfunktionen dürfen nun nichts überschreiben.
      showStorageError("Speicherzustand nach fehlgeschlagener Wiederherstellung unklar. Weitere Schreibvorgänge sind gesperrt. Sicherheitskopie aufbewahren; die Seite nicht unüberlegt neu laden.");
    }
    throw new Error(recovered
      ? "Speichern fehlgeschlagen. Der ursprüngliche Browserbestand wurde unverändert bestätigt oder wiederhergestellt. Kein Import erfolgt."
      : "Speichern fehlgeschlagen; der ursprüngliche Zustand konnte nicht sicher wiederhergestellt werden. Keine erfolgreiche Wiederherstellung bestätigt. Verwende die zuvor gespeicherte Sicherheitskopie.");
  }
  entries = imported;
  invalidateImport();
  closeAmounts();
  storageError.hidden = true;
  render();
  backupStatus.textContent = `Wiederherstellung abgeschlossen: ${entries.length} Einträge gespeichert und durch Rücklesen geprüft.`;
}

document.querySelector("#confirm-replace").addEventListener("click", () => {
  backupError.hidden = true;
  backupStatus.textContent = "";
  try { restoreConfirmedBackup(); }
  catch (error) { backupFailure(error.message); }
});
document.querySelector("#cancel-import").addEventListener("click", () => {
  invalidateImport();
  backupError.hidden = true;
  backupStatus.textContent = "Import abgebrochen. Keine Daten durch den Import geändert.";
});

loadEntries();
render();
// Aktualisiert die Tagesübersicht auch, wenn die Seite über Mitternacht offen bleibt.
setInterval(() => {
  if (berlinDay() !== currentDay) render();
}, 1000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) render();
});
