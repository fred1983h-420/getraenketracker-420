"use strict";

// Die PWA-Anbindung kennt keine Getränkeeinträge und liest keinen localStorage.
const pwaStatus = document.querySelector("#pwa-status");
let offlineReady = false;
let updatePending = false;

function showPwaStatus() {
  if (updatePending) {
    pwaStatus.textContent = "Neue App-Version bereit. Schließe nach Abschluss deiner Eingaben alle App-Fenster und öffne die App erneut, um sie zu verwenden.";
  } else if (offlineReady) {
    pwaStatus.textContent = navigator.onLine
      ? "Für Offline-Nutzung bereit. Installation über das Chrome-Menü möglich."
      : "Offline – deine Einträge werden weiterhin lokal in diesem Browser gespeichert.";
  }
}

async function registerPwa() {
  if (location.protocol === "file:") {
    pwaStatus.textContent = "Lokaler Dateimodus. Installation und Offline-App sind über HTTPS oder localhost verfügbar; die bisherigen Funktionen bleiben nutzbar.";
    return;
  }
  if (!window.isSecureContext || !("serviceWorker" in navigator)) {
    pwaStatus.textContent = "Offline-App hier nicht verfügbar. Verwende HTTPS oder localhost und einen Browser mit Service-Worker-Unterstützung.";
    return;
  }
  try {
    // Keine erzwungene Aktivierung und kein automatisches Neuladen während Eingaben.
    const registration = await navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" });
    const checkWaiting = () => {
      if (registration.waiting && navigator.serviceWorker.controller) {
        updatePending = true;
        showPwaStatus();
      }
    };
    checkWaiting();
    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      if (worker) worker.addEventListener("statechange", checkWaiting);
    });
    await navigator.serviceWorker.ready;
    offlineReady = true;
    showPwaStatus();
  } catch (error) {
    pwaStatus.textContent = "Offline-Vorbereitung fehlgeschlagen. Die App bleibt online nutzbar. Versuche es später mit Verbindung erneut; deine Einträge werden nicht verändert.";
  }
}

window.addEventListener("online", showPwaStatus);
window.addEventListener("offline", showPwaStatus);
window.addEventListener("load", registerPwa);
