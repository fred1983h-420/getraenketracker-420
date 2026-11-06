# Getränketracker 420 – Version 1.7

Lokale Web-App mit HTML, CSS und JavaScript, ohne Bibliotheken oder Server. Öffne index.html im bisherigen Browser am bisherigen Dateipfad. Bestehende Browserdaten nicht löschen.

## Vorbereitung für GitHub Pages (noch nicht veröffentlicht)

Die lokale Prüfung umfasst sämtliche elf vorhandenen Dateien einschließlich der vier PNG-Bilder und alle Unterordner. Gefunden wurden App-Code, Dokumentation, drei PWA-Icons und die Originalgrafik. Es wurden keine persönlichen Getränkeeinstellungen/-einträge, JSON-Sicherungen, Zugangsdaten, privaten Schlüssel, E-Mail-Adressen oder absoluten Benutzerpfade im zu veröffentlichenden Bestand gefunden. Verweise auf localStorage und Zeitstempel im JavaScript sind Programmcode, keine eingebetteten Verbrauchsdaten. Die Beispiele in dieser README sind allgemeine Anleitungen und dokumentierte künstliche Tests.

### Freigegebener Veröffentlichungsbestand

Die neue .gitignore arbeitet als Freigabeliste: Alles ist zunächst ausgeschlossen; nur diese Dateien werden zugelassen:

- .gitignore
- index.html
- style.css
- script.js
- pwa.js
- sw.js
- manifest.webmanifest
- README.md
- icons/icon-192.png
- icons/icon-512.png
- icons/icon-maskable-512.png

Die vollständige App einschließlich aller acht Service-Worker-Cachedateien, Worker und Manifest ist damit enthalten. Die PNG-Icons haben die vorgesehenen Abmessungen 192/512/512 Pixel und enthalten keine Text-, EXIF- oder zusätzlichen unbekannten PNG-Blöcke; die übrigen Blöcke betreffen Bilddaten, Farbe und Auflösung.

### Lokal behalten / ausschließen

- Die Originalgrafik icons/420-orginal.png bleibt lokal. Sie ist zur Laufzeit nicht nötig und enthält neben Bilddaten einen zusätzlichen PNG-Block caBX, dessen Inhalt hier nicht als veröffentlichungsgeeignet freigegeben wird. Die Datei wird nicht verändert oder entfernt. Auch die alternative Schreibweise icons/420-original.png ist ausgeschlossen.
- Sämtliche JSON-Dateien, insbesondere getraenketracker-backup-* und getraenketracker-sicherheitskopie-*, persönliche Datenordner sowie sonstige unbekannte Dateien.
- Zugangsdaten und Schlüssel (.env, .env.*, *.pem, *.key, *.p12, *.pfx), temporäre Dateien, Logs, lokale Editor-/Werkzeugordner und Betriebssystemdateien.

Bei künftigen notwendigen App-Dateien muss die Freigabeliste bewusst erweitert und erneut geprüft werden. manifest.webmanifest wird ausdrücklich zugelassen; das Verbot persönlicher *.json-Dateien blockiert dieses Manifest nicht. .gitignore ist weder Zugriffsschutz noch Verschlüsselung und entfernt keine bereits versionierten/veröffentlichten Dateien. Bei einer späteren manuellen Dateiauswahl ausschließlich die freigegebene Liste verwenden. Private Sicherungen zusätzlich außerhalb des Veröffentlichungsordners aufbewahren.

### Geprüfte relative Pfade

Die künftige Basisadresse wurde lokal als https://fred1983h-420.github.io/getraenketracker-420/ simuliert. Alle 20 Referenzen aus HTML, Manifest, Service-Worker-Dateiliste und Registrierung bleiben innerhalb dieses Unterordners und verweisen auf vorhandene Dateien. Insbesondere:

- Start: /getraenketracker-420/index.html
- Manifest: /getraenketracker-420/manifest.webmanifest
- Worker: /getraenketracker-420/sw.js
- App-ID und Geltungsbereich: /getraenketracker-420/
- Icons: /getraenketracker-420/icons/…

Eine Pfadänderung im App-Code ist nicht erforderlich. Erfassung, Berechnungen, Europe/Berlin, localStorage-Schlüssel, Datenformat und Service-Worker-Version bleiben unverändert. Alle bisherigen App-Dateien und Bilder wurden vor/nach dieser Vorbereitung per SHA-256 auf unveränderten Inhalt geprüft; nur README.md und die neue .gitignore gehören zu den Änderungen.

Diese Vorbereitung hat weder das entfernte Repository noch GitHub-Pages-Einstellungen verändert. Es wurden keine Git-Veröffentlichungsbefehle, Uploads oder Deployments ausgeführt und keine Browserdaten gelesen. Die künftige Website wurde nicht als bereits erreichbar geprüft. Git ist in dieser Umgebung nicht verfügbar; die Freigaberegeln wurden deshalb nicht mit git check-ignore ausgeführt. Vor einer späteren Veröffentlichung die konkrete Dateiauswahl nochmals gemeinsam prüfen. Tests und Sicherungen aus früheren Entwicklungsschritten lagen in getrennten temporären Testverzeichnissen und gehören nicht zum Projektbestand.

Beim späteren Wechsel von file:/localhost zur HTTPS-Adresse bleiben die bisherigen Browserdaten am alten Ursprung erhalten und werden nicht automatisch übertragen. Zuerst dort eine JSON-Sicherung erstellen und kontrollieren; erst danach bei Bedarf an der neuen Adresse mit den bestehenden Bestätigungsschritten importieren.

## Neu in Version 1.7: Installierbare Offline-App (PWA)

Eine Progressive Web App lässt sich aus Chrome wie eine App installieren und in einem eigenen Fenster öffnen. Name: **Getränketracker 420**; Darstellung: standalone; Browser-Theme: Blau (#0868bc). Die eigentliche Oberfläche bleibt im bisherigen dunklen Design.

### Dateien und Originalsymbol

- manifest.webmanifest: Name, stabile App-ID, Start-URL und Geltungsbereich relativ zum Projektordner, Farben und Icons. Funktioniert auch in einem Unterverzeichnis.
- pwa.js: Separate Service-Worker-Registrierung und Anzeige, ob die Offline-Vorbereitung abgeschlossen ist. Kein Zugriff auf Getränkedaten oder localStorage.
- sw.js: Versionierter Offline-Cache für acht statische App-Dateien. Keine Trackingdaten, JSON-Sicherungen oder fremden/API-Anfragen im Cache.
- icons/icon-192.png und icons/icon-512.png: PNG-Icons direkt aus der bereitgestellten Originalgrafik skaliert.
- icons/icon-maskable-512.png: Dasselbe Motiv mit blauem Sicherheitsrand für Android-Iconmasken.
- index.html: PWA-Verknüpfungen, blaues Theme, App-Name, Bereitschaftshinweis und Versionsanzeige 1.7.
- README.md: Installation, Offline-Nutzung und Datensicherung ergänzt. script.js und style.css bleiben bytegenau gegenüber Version 1.6 unverändert.

Die tatsächliche Quelldatei heißt **icons/420-orginal.png** (1254 × 1254 Pixel). Der ebenfalls geprüfte Pfad icons/420-original.png war nicht vorhanden. Es wurde kein Ersatzmotiv erzeugt; Glas, Flüssigkeit und weiße Zahl 420 stammen aus dem vorhandenen Original. Die Quelldatei wurde nicht verändert. Das maskierbare Icon erhält lediglich zusätzlichen Rand; die normalen Icons zeigen das vollständige Original.

### Lokal öffnen und später installieren

Der bisherige Doppelklick auf index.html funktioniert weiterhin für die normalen Funktionen. Eine Installation mit Service Worker funktioniert jedoch nicht im file:-Modus. Service Worker benötigen einen sicheren Ursprung: HTTPS oder für lokale Entwicklung localhost/Loopback. Siehe [Chromium-Dokumentation zu sicheren Ursprüngen](https://www.chromium.org/blink/serviceworker/service-worker-faq/).

Für einen lokalen Test kann ein rein lokaler statischer Server dienen. Falls Python bereits installiert ist: im Projektordner „python -m http.server 8000 --bind 127.0.0.1“ starten und http://127.0.0.1:8000/index.html öffnen. Das ist nur ein lokaler Test, keine Veröffentlichung. Es ist keine Python-Bibliothek Teil der App. Der temporäre Entwicklungs-Testserver dieser Umsetzung wurde nach den Prüfungen abgeschaltet.

Für die spätere Pixel-9-Installation nach gemeinsamer Freigabe:

1. Die vollständige App unter einer stabilen HTTPS-Adresse in Chrome aufrufen (oder für einen unveröffentlichten Gerätetest eine separat eingerichtete lokale USB-Portweiterleitung verwenden).
2. Den Hinweis „Für Offline-Nutzung bereit“ abwarten. Beim ersten Aufruf müssen alle App-Dateien erfolgreich geladen worden sein.
3. Im Chrome-Menü „App installieren“ beziehungsweise „Zum Startbildschirm hinzufügen“ wählen; der genaue Wortlaut hängt von der Chrome-Version ab. Siehe [Google-Dokumentation zur PWA-Installation](https://web.dev/learn/pwa/installation).
4. Die installierte App öffnen, schließen und anschließend im Flugmodus erneut öffnen. Diesen Gerätetest noch mit künstlichen Daten in einem getrennten Testprofil durchführen.

Es wurde **kein Hosting oder Deployment** durchgeführt und kein öffentlich erreichbarer Server eingerichtet. Die tatsächliche Installation und das Launcher-Symbol auf einem Google Pixel 9 müssen noch am Gerät geprüft werden.

### Offline und spätere Aktualisierungen

Nach erfolgreichem Erstaufruf liegen HTML, CSS, Erfassungs-JavaScript, PWA-Registrierung, Manifest und die drei Icons im Browsercache. Neustart, Erfassung, Nachträge, Löschen, Statistiken und die lokale JSON-Sicherung/Wiederherstellung funktionieren dann ohne Serververbindung. Eine gelöschte oder vom Betriebssystem entfernte Browserablage kann erneutes Laden mit Verbindung nötig machen; Offline-Cache ersetzt keine Datensicherung.

Vor jeder späteren Veröffentlichung von geänderten App-Dateien APP_VERSION in sw.js erhöhen und alle Dateien gemeinsam bereitstellen. Die neue Version installiert nur, wenn das vollständige Paket geladen werden kann. Solange alte App-Fenster offen sind, bleibt sie wartend. Ein Hinweis bittet um Schließen aller App-Fenster nach Abschluss laufender Eingaben. Es gibt kein erzwungenes Neuladen und kein skipWaiting, das einen offenen Import unterbrechen könnte. Beim Aktivieren werden nur ältere eigene App-Caches desselben Pfads entfernt, niemals localStorage oder fremde Caches. Das Browserupdate wird spätestens bei einem weiteren verbundenen Aufruf geprüft.

### Bestehende Daten beim Wechsel zur PWA schützen

Der Schlüssel getraenketracker-v1 und das Eintragsformat bleiben unverändert. Es gibt keine automatische Migration. Alle neun Getränke, 14 Mengen, Farben, Statistiken und Europe/Berlin bleiben erhalten. Persönliche Einträge bleiben lokal; die App enthält weder Upload-/Synchronisierungsfunktion noch Analyse-, Tracking- oder Datenbankdienst. Der statische Server erhält ausschließlich Anfragen für App-Dateien, keine Getränkedaten.

**Wichtig beim Wechsel von der lokalen Datei zu localhost/HTTPS oder zu einem anderen Gerät:** Browserspeicher ist an Ursprung und Browserprofil gebunden. Die PWA übernimmt den Dateimodus-Bestand nicht automatisch! Erstelle deshalb zuerst in der bisher verwendeten App eine JSON-Sicherung und kontrolliere die gespeicherte Datei. Öffne erst dann die neue Adresse und verwende dort bei Bedarf den bestehenden Import mit Vorschau, Sicherheitskopie und beiden Bestätigungen. Die alten Daten werden dadurch am bisherigen Speicherort nicht entfernt. Eine Sicherung des neuen, eventuell noch leeren Bestands ersetzt nicht die Sicherung deiner alten echten Daten. Regelmäßige externe JSON-Sicherungen bleiben auch nach Installation erforderlich; Browserdaten nicht zum „Aktualisieren“ löschen.

### Tatsächlich durchgeführte Tests für Version 1.7

- Syntax und Manifeststruktur einschließlich Name, standalone, relativer Start-URL, Scope und Iconangaben geprüft. PNG-Größen 192/512/512 kontrolliert; Original und abgeleitete Icons visuell geprüft.
- Service Worker isoliert geprüft: vollständiges Precache, Cachezugriff ohne Netz, Start über Index/Verzeichniswurzel, Cache-Löschung nur eigener alter Versionen, kein erzwungenes Update, fehlgeschlagene Installation und Ausschluss von Backups, POST und fremden URLs. Ein echtes Versionsupdate auf dem Pixel wurde nicht simuliert.
- Der abschließende reale Chrome-Test verwendete ein frisches Profil, einen nur auf 127.0.0.1 gebundenen statischen Testserver und ausschließlich künstliche Einträge. Die endgültigen Original-Icons und alle endgültigen App-Dateien wurden ausgeliefert. Nach Aktivierung wurde der Server abgeschaltet; eine separate Netzwerkprobe bestätigte seine Nichterreichbarkeit.
- **52 Browserprüfungen bestanden**, darunter echter Offline-Neustart, Cache aller acht Dateien, Manifest und Icons offline, neun Getränke mit jeweils sechs häufigen und acht zusätzlichen Mengen, Nachtrag und unveränderte Alteinträge, Literwerte, 7-/30-Tage-/Gesamtstatistik, Offline-Erfassung und einzelnes Löschen, JSON-Export sowie Importvorschau, Sicherheitskopie, separate Bestätigungen und geprüfte Wiederherstellung offline. Breiten 320, 375, 390 und 412 CSS-Pixel blieben zweispaltig ohne horizontale Seitenüberbreite.
- Downloadaufrufe im Datentest wurden abgefangen; der tatsächliche Speichererfolg einer JSON-Datei wurde nicht behauptet. Keine echten Browserdaten verwendet. Das Serverprotokoll enthielt nur statische Abrufe und den leeren lokalen Teststeuerungsaufruf zum Abschalten, keine Verbrauchsdaten.
- Erfassungs-JavaScript und Stylesheet per SHA-256 als unverändert gegenüber Version 1.6 bestätigt. Damit bleiben auch die zuvor dokumentierten 14-Mengen-Prüfungen relevant.

Noch offen sind eine tatsächliche Pixel-9-Installation, Chrome-Installationsdialog und Launcher-Maskierung, echter Flugmodus einschließlich Geräte-Neustart, native Datei-/Speicherdialoge und ein reales Update zwischen zwei veröffentlichten Versionen. Diese Schritte erfolgen erst nach gemeinsamer Prüfung; es wurde nichts veröffentlicht.

## Seit Version 1.6: Kompakte Mengenauswahl

Alle neun Getränke unterstützen jetzt exakt dieselben 14 Mengen: 100, 150, 200, 250, 300, 330, 350, 400, 500, 700, 750, 1000, 1500 und 2000 ml. Eine freie Eingabe gibt es nicht.

Nach der Getränkewahl erscheinen direkt sechs häufige Größen: 200, 250, 330, 350, 500 und 1000 ml. „Weitere Größen anzeigen“ klappt darunter zusätzlich 100, 150, 300, 400, 700, 750, 1500 und 2000 ml auf. Die häufigen Größen bleiben sichtbar. Derselbe Button heißt dann „Weitere Größen ausblenden“ und schließt nur den zusätzlichen Bereich, ohne etwas zu speichern.

Der Klick auf eine Menge speichert sofort für das gewählte Getränk und das sichtbar angegebene Trinkdatum. Die Auswahl schließt danach. Bei Getränk- oder Datumswechsel und nach einer Erfassung startet die Auswahl wieder kompakt. Keine Menge wird vorausgewählt oder gemerkt. Für häufige Größen bleibt es bei zwei Klicks; seltenere Größen benötigen zusätzlich das Aufklappen. Literwerte haben einheitlich zwei Nachkommastellen, z. B. 1000 ml · 1,00 l und 2000 ml · 2,00 l.

Alle Bedienelemente sind native Buttons mit Tastaturfokus und sichtbarer Fokusmarkierung. Tab navigiert durch die Buttons; Enter oder Leertaste aktiviert den fokussierten Button. Der Aufklappbutton meldet seinen Zustand mit aria-expanded und verweist mit aria-controls auf die zusätzlichen Größen. Ausgeblendete Größen sind nicht Teil der Tab-Reihenfolge. Die responsive Mengenauswahl nutzt die bestehenden mindestens 52 Pixel hohen Mengenbuttons. Getränkefarben und Smartphone-Raster bleiben erhalten.

### Begrenzte technische Änderungen

- index.html: Aufklappbutton und zusätzlicher Mengenbereich, Versionsanzeige 1.6.
- style.css: Gestaltung des Aufklappbuttons und explizites Ausblenden des geschlossenen Mengenrasters.
- script.js: Gemeinsame Listen für häufige, weitere und alle Mengen; dieselbe Liste wird in den vorhandenen Getränkedefinitionen und damit auch bei der Importprüfung verwendet. Beschriftung der Getränkekacheln auf den gemeinsamen Mengenbereich angepasst. Die bisherige feste Kaffee-/Sojamilch-Aufteilung wird nicht mehr für jede beliebige Größe behauptet.
- README.md: Neue Bedienung, verfügbare Mengen und tatsächliche Tests dokumentiert.

localStorage-Schlüssel, gespeichertes Eintragsformat, Sicherungsformat, Berliner Kalenderlogik und Statistikberechnung bleiben unverändert. Bestehende Einträge werden nicht migriert. Insbesondere behalten ältere Energy-Einträge ihre Namen, Mengen und vorhandenen Zusatzfelder. Neue Sicherungen akzeptiert Version 1.6 mit allen neuen Mengen; ältere App-Versionen können die erweiterten Mengen beim Import ablehnen. Zur Wiederherstellung neuer Sicherungen daher Version 1.6 oder eine kompatible neuere Version verwenden.

### Tatsächlich durchgeführte Tests für Version 1.6

Die automatischen Prüfungen verwendeten ausschließlich künstliche Daten. Der echte Browserbestand wurde weder gelesen noch geändert. Chrome lief ohne sichtbares Fenster mit neuem Testprofil; localStorage wurde zusätzlich durch isolierten In-Memory-Speicher ersetzt und Downloads wurden abgefangen.

Bei 320, 375, 390 und 412 CSS-Pixeln bestanden jeweils 928 Prüfungen, insgesamt 3712:

- Genau sechs sofort sichtbare und acht zunächst verborgene Mengen; Auf- und Zuklappen mit passender Beschriftung und aria-expanded, ohne Speicheränderung.
- Alle 14 Größen bei allen neun Getränken, insgesamt 504 künstliche Erfassungen über vier Ansichten. Jede Erfassung wurde auf Betrag, Getränkename, ausgewählten vergangenen Trinktag und anschließende Statistiksumme geprüft.
- Korrekte Beschriftung/Berechnung von 1000 ml als 1,00 l und 2000 ml als 2,00 l; 7-/30-Tage- und Gesamtauswertung; unveränderte ältere Einträge mit Zusatzfeldern.
- Getränk-/Datumswechsel und Schließen der Auswahl, Rückkehr des Fokus zum Getränk, programmatische Fokussierbarkeit der Mengen und des Aufklappbuttons.
- Zwei Getränkespalten, mindestens 44 × 44 Pixel sichtbare interaktive Flächen, keine überbreite Gesamtseite und keine seitlich herausragenden Elemente: kompakt, aufgeklappt, in der Historie sowie bei Importvorschau und letzter Bestätigung. Das lange Diagramm bleibt separat horizontal scrollbar.
- Export sämtlicher alter und neuer Einträge ohne Schreibzugriff; erneutes Einlesen aller 14 Größen, vorgeschriebene Sicherheitskopie und getrennte Bestätigungen; geprüfte vollständige Wiederherstellung. Nicht unterstützte Größen wie 123 ml werden beim Import abgewiesen.

Zusätzliche Node.js-Prüfungen mit simuliertem DOM und Speicher bestanden: heutige Erfassung von 1000 und 2000 ml, korrekte Tageszuordnung, einzelnes Löschen mit aktualisierter Summe und erneuter App-Start mit dem gespeicherten Testbestand ohne Schreibzugriff. Syntaxprüfung erfolgreich.

### Einschränkungen und manuelle Prüfung

Die Browserprüfungen nutzten DOM-Klicks und programmatisches Fokussieren, keine echten Tastendrücke oder Touchgesten. Native Button-Semantik und Touchflächen sind geprüft; Tab/Enter/Leertaste, Fingerbedienung und Wischen im Diagramm müssen noch auf echten Geräten geprüft werden. Auch eine visuelle Abnahme in Safari/iOS und Chrome/Android sowie echte Datei-/Downloaddialoge stehen aus. Erfassungs-, Lösch- und Importtests dafür ausschließlich mit künstlichen Daten in einem getrennten Testprofil durchführen.

## Seit Version 1.5: Smartphone-Bedienung

Die Änderungen betreffen ausschließlich Darstellung und Dokumentation: style.css, die Versionsanzeige und Viewport-Angabe in index.html sowie diese README. script.js ist gegenüber Version 1.4 bytegenau unverändert (SHA-256 vor/nach verglichen). Speicherformat, localStorage-Schlüssel, Getränke, Mengen, Farben, Berechnungen, Berliner Zeitzone und alle Sicherungsbestätigungen bleiben unverändert. Echte Browserdaten wurden für Entwicklung und Tests nicht verwendet.

- Von 300 bis 699 CSS-Pixeln bleiben die Getränkebuttons in zwei Spalten. Unter 300 Pixeln wechseln sie auf eine Spalte. Ab 700 Pixeln bleibt das vorhandene Raster mit drei Spalten erhalten, auch in entsprechend breitem Querformat.
- Buttons und die Checkbox zur Sicherheitsbestätigung haben mindestens 44 × 44 CSS-Pixel Bedienfläche. Die ganze Beschriftung der Checkbox ist ebenfalls anklickbar. Mengenbuttons sind mindestens 52 Pixel hoch.
- Kleine Bildschirme erhalten angepasste Innenabstände und besser lesbare Mengen-/Verlaufstexte. In der Tageshistorie stehen Getränkename und die Zeile mit Menge und Löschen übersichtlich untereinander.
- Datumsfeld und Statistik-Zeitraum können sich an die Breite anpassen. Eingabefelder nutzen mindestens 16 Pixel Schrift bei der üblichen Browser-Grundgröße; Zoom bleibt erlaubt.
- Export-/Importbuttons nutzen auf kleinen Bildschirmen die verfügbare Breite. Vorschau, Warnungen und endgültige Bestätigung brechen lange Texte um, statt sie abzuschneiden.
- Die Gesamtseite soll nicht horizontal scrollen. Breiten, Raster und Textumbrüche verhindern Überbreite; das Wurzelelement begrenzt zusätzlich horizontalen Überlauf. Das Tagesdiagramm bleibt ein eigener horizontaler Scrollbereich.
- Viewport und Seitenränder berücksichtigen verfügbare Safe-Area-Abstände. Bei flachem Querformat wird der obere Leerraum reduziert. Eine Systemeinstellung für reduzierte Bewegung wird berücksichtigt.

### Tatsächlich durchgeführte Prüfungen für Version 1.5

Mit dem installierten Chrome im Headless-Modus, einem neu angelegten Testprofil und ausschließlich künstlichen Einträgen wurden echte Browser-Layoutmessungen in eingebetteten Testansichten durchgeführt. localStorage war in diesen Testansichten zusätzlich durch einen isolierten In-Memory-Speicher ersetzt; Downloadaufrufe wurden abgefangen. Der echte Verbrauchsdatenbestand blieb unberührt. Die unveränderten Originaldateien style.css und script.js wurden von der Testseite geladen.

| Ansicht in CSS-Pixeln | Ergebnis |
| --- | --- |
| 320 × 740 und 740 × 320 | Layoutmessungen bestanden |
| 375 × 812 und 812 × 375 | Layoutmessungen bestanden |
| 390 × 844 und 844 × 390 | Layoutmessungen bestanden |
| 412 × 915 und 915 × 412 | Layoutmessungen bestanden |
| 768 × 1024 und 1024 × 768 | Layoutmessungen bestanden |
| 280 × 640 | Einspaltiger Sonderfall bestanden |

Insgesamt bestanden 539 Mess- und Funktionsprüfungen in elf Ansichten. Geprüft wurden die passenden Getränkespalten, sichtbare interaktive Flächen von mindestens 44 × 44 Pixeln, Dokumentbreite, Grenzen sichtbarer Inhalte und nicht abgeschnittene Texte. Diese Prüfungen liefen jeweils im Startzustand, mit offener Mengenauswahl, in der Tageshistorie, bei mehrmonatiger Statistik sowie in Importvorschau, Sicherheitsbestätigung, endgültiger Ersetzungsbestätigung und nach dem Import. Das lange Diagramm ließ sich separat horizontal verschieben.

Automatische DOM-Klicks prüften die Zwei-Klick-Erfassung, die Exportanforderung, Datei-Einlesen mit Vorschau ohne Schreibzugriff, Sperre vor Download/Bestätigung, den Klick auf die Checkbox-Beschriftung und die getrennte endgültige Freigabe. Erst die letzte Bestätigung schrieb die künstliche Wiederherstellung. Die CSS-Touch-Einstellung wurde ebenfalls geprüft. Das sind keine echten Finger- oder Wischgesten.

Die Headless-Prüfung lieferte Layoutmessungen; eine angeforderte Screenshotaufnahme war leer und eignet sich nicht als visuelle Abnahme. Eine Sichtprüfung auf einem echten Smartphone steht deshalb aus.

### Noch manuell prüfen

Auf einem echten Smartphone beziehungsweise in Safari/iOS und Chrome/Android: Lesbarkeit, Fingerbedienung und Wischen im Diagramm, Hoch-/Querformatwechsel im laufenden Betrieb, Browserzoom/größere Systemschrift, Aussparungen am Displayrand, den nativen Datumsauswahldialog und Datei-/Download-/Speicherdialoge. Die Tests verwendeten getrennte Ansichten für die Orientierungen, keinen echten Geräte-Drehvorgang.

Import- und Löschtests ausschließlich in einem separaten Testprofil mit künstlichen Daten durchführen. Dort den kompletten Ablauf einschließlich eines tatsächlich gespeicherten und kontrollierten Sicherheitskopie-Downloads prüfen. Im Profil mit echten Daten keine künstlichen Import-/Löschtests ausführen. Ein Download darf weiterhin erst nach eigener Kontrolle als erfolgreich gespeichert bestätigt werden.

## Seit Version 1.4: Datensicherung und Wiederherstellung

Echte Verbrauchsdaten wurden für Entwicklung und Tests weder gelesen noch geändert. Alle automatischen Tests liefen mit künstlichen Daten und einem isolierten Speicherersatz, ohne Browserzugriff.

### Sicherung erstellen

Unterhalb der Statistiken findest du „Datensicherung“. „Sicherung erstellen“ liest den tatsächlich gespeicherten Bestand und fordert einen normalen JSON-Download an, zum Beispiel getraenketracker-backup-2026-11-06.json. Es erfolgt kein Schreibzugriff auf localStorage. Prüfe selbst, ob die Datei im gewählten Ordner vorhanden und zugänglich ist. Der Browser kann der App den tatsächlichen Speichererfolg nicht zuverlässig bestätigen.

Die JSON-Hülle enthält format (getraenketracker-backup), formatVersion (1), createdAt (ISO-UTC-Erstellungszeitpunkt) und entries (alle gespeicherten Einträge). Die Formatversion der Sicherung ist unabhängig von der App-Version (aktuell 1.7). Alle Eintragsobjekte einschließlich vorhandener Zusatzfelder, unveränderter Namen, Mengen, Trinkdaten und Zeitstempel werden vollständig übernommen. Alte Einträge ohne date erhalten beim Export kein erfundenes Trinkdatum. Ihre Tageszuordnung lässt sich weiterhin aus timestamp in Europe/Berlin bestimmen. Es gibt keine Migration oder Normalisierung.

Exportiert wird der gespeicherte Browserbestand. Falls eine vorherige Erfassung wegen eines Speicherfehlers nur in der Anzeige existiert, ist sie nicht Teil dieses gespeicherten Bestands. Bei beschädigtem oder unlesbarem Speicher wird keine erfolgreiche Sicherung behauptet.

### Sicherung sicher wiederherstellen

Die Wiederherstellung ersetzt vollständig; sie führt nichts zusammen.

1. „Sicherung importieren“ öffnet die Dateiauswahl. Nur eine Sicherung mit dem beschriebenen Format und Formatversion 1 wird akzeptiert; eine bloße Eintragsliste ohne Metadaten wird abgelehnt.
2. Die Datei wird nur gelesen. Die App prüft JSON, Metadaten und sämtliche Einträge: eindeutige nichtleere Kennungen, bekannte Getränkenamen einschließlich der drei alten Energy-Bezeichnungen, zugehörige positive ganzzahlige Mengen, echte Kalenderdaten und eindeutige ISO-Zeitstempel mit Zeitzone. Zukünftige Trinktage, doppelte Kennungen und nicht sicher berechenbare Gesamtmengen werden abgewiesen. Vorhandene Zusatzfelder bleiben erhalten.
3. Eine Vorschau nennt die Anzahl aktuell gespeicherter Einträge, die Anzahl der Sicherungseinträge und den Trinkdatumsbereich nach Berliner Kalender. Auch eine leere Sicherung ist zulässig, wird ausdrücklich als leer angezeigt und würde den gesamten bisherigen Bestand entfernen.
4. Lade über den eigenen Button zuerst eine Sicherheitskopie des aktuellen Bestands herunter. Der Dateiname beginnt mit getraenketracker-sicherheitskopie-. Der Browser wählt bei gleichen Dateinamen üblicherweise selbst eine Ergänzung oder fragt nach; prüfe den tatsächlich gespeicherten Dateipfad.
5. Bestätige das Kästchen ausschließlich, wenn diese Sicherheitskopie tatsächlich erfolgreich gespeichert wurde und du auf sie zugreifen kannst. Wenn der Download abgebrochen wurde oder der Erfolg unklar ist: Kästchen nicht bestätigen, Import abbrechen. Die App behauptet keinen automatisch festgestellten Speichererfolg.
6. „Datenbestand ersetzen …“ zeigt nochmals beide Eintragszahlen. Erst der separate Button „Ja, bisherigen Datenbestand endgültig ersetzen“ schreibt die neuen Daten.
7. „Import abbrechen“ verwirft Datei und Freigaben jederzeit vor dem Ersetzen ohne Speicheränderung.

Im Erfolgsfall wird der vorhandene Schlüssel mit genau einem localStorage.setItem-Vorgang geschrieben und der vollständige gespeicherte Text anschließend zurückgelesen und verglichen. Erst danach werden Anzeige, Historie und Statistiken auf die importierten Daten umgestellt. Der Schlüssel und das Eintragsformat aus Version 1.3 bleiben erhalten.

Ändert sich der Bestand während der Vorschau oder Bestätigung, muss die Datei neu ausgewählt werden. Ungespeicherte Abweichungen zwischen Anzeige und Browserbestand verhindern den Import. Bereits erkennbare Änderungen aus anderen Tabs werden vor dem Ersetzen abgewiesen. localStorage bietet jedoch keine tabübergreifende Transaktion: Verwende die App für eine Wiederherstellung nur in einem Tab und erfasse währenddessen nichts in anderen Fenstern.

Bei einem Schreib- oder Rücklesefehler wird der ursprüngliche Speicherzustand geprüft und bei Bedarf möglichst exakt wiederhergestellt. Ein erkennbar fremder Zwischenstand wird nicht mit einem Rollback überschrieben. War der Schlüssel ursprünglich nicht vorhanden, wird bei erforderlichem Rollback dieser Zustand wiederhergestellt. Ein Rollback kann zusätzliche Schreibvorgänge erfordern. Scheitert auch die Überprüfung/Wiederherstellung, behauptet die App keinen Erfolg und sperrt weitere Schreibvorgänge der laufenden Seite. Bewahre die zuvor gespeicherte Sicherheitskopie auf. Ein Browser- oder Geräteabsturz lässt sich mit localStorage nicht vollständig absichern; genau dafür ist die extern gespeicherte Kopie erforderlich.

### Tatsächlich durchgeführte Tests für Version 1.4

Ausschließlich künstliche Daten in Node.js mit simuliertem DOM, Blob-Downloads und localStorage; kein Zugriff auf den echten Browserspeicher:

- Export mit allen Feldern, unveränderten Alteinträgen, Zusatzfeldern, Formatversion, Zeitstempel und Berliner Dateiname; kein Speicherschreibzugriff.
- Gültige Sicherung einlesen, korrekte Vorschau mit Anzahl und Datumsbereich; weiterhin kein Schreiben.
- 21 ungültige Sicherungen abgelehnt, darunter beschädigtes JSON, unbekannte Formatversion, negative/falsche Mengen, unbekannte Namen, doppelte Kennungen, falsche Kalenderdaten, Zukunftstage und Zeitstempel ohne Zeitzone.
- Bestätigungssperren geprüft: Downloadanforderung allein reicht nicht; Bestätigung des Speicherns allein reicht ebenfalls nicht zum Ersetzen.
- Abbruch an vier Stellen bis einschließlich der letzten Bestätigungsansicht ohne Datenänderung; auch abgebrochene Dateiauswahl und blockierter Download.
- Vollständiges Ersetzen nach den ausdrücklichen Bestätigungen mit genau einem Schreibvorgang und Rückleseprüfung, aktualisierter Tagesmenge und Erhaltung nach Neuladen.
- Simulierter Speicherfehler ohne Änderung, Fehler nach Schreiben und Rücklesefehler mit Wiederherstellung des exakten alten Bestands.
- Fehlgeschlagenes Rollback sperrt nachfolgende Schreibvorgänge und meldet keinen Erfolg.
- Änderungen während des Ablaufs, einschließlich eines simulierten anderen Tabs, verhindern eine veraltete Wiederherstellung.
- Kompatibilität aller drei alten Energy-Namen und neuer Nachträge ohne Umschreiben der Eintragsobjekte.
- Leere Sicherung erst nach allen Bestätigungen übernommen; bei Rollback auch ein ursprünglich fehlender Schlüssel korrekt wiederhergestellt.
- Beschädigter Ausgangsspeicher unangetastet und verspätete Ergebnisse abgebrochener Dateiauswahl verworfen.
- Bestehende Zwei-Klick-Nachträge, historisches Löschen, Statistikaktualisierung, Berliner Datumszuordnung, Getränkemengen und Farben sowie HTML-Verknüpfungen erneut geprüft.

Echte Browserdownloads, Betriebssystem-Speicherdialoge und die visuelle Smartphone-Darstellung wurden nicht automatisiert geprüft. Der erfolgreiche Dateidownload erfordert deshalb weiterhin deine tatsächliche Prüfung und ausdrückliche Bestätigung.

## Bedienung

Oben bleibt die heutige Tagesgesamtmenge mit Eintragsanzahl sichtbar. Direkt bei der schnellen Erfassung wählst du das Datum für Tageshistorie und neue Einträge. Standard ist heute in Europe/Berlin. Mit „Heute“ kommst du zurück. Ein deutlich sichtbarer Hinweis nennt das Erfassungsdatum; die Tageshistorie darunter zeigt die Summe und Anzahl des ausgewählten Tages.

1. Wähle heute oder einen vergangenen Kalendertag.
2. Wähle ein Getränk. Es wird noch nichts gespeichert.
3. Wähle die Menge. Das Getränk wird sofort gespeichert und die Mengenauswahl geschlossen.

Auch Einzelmengen benötigen den zweiten Klick. Keine Menge wird vorausgewählt oder gemerkt. Wechselst du Getränk oder Datum, wird die Mengenauswahl ersetzt bzw. geschlossen. Zukunftsdaten werden im Datumsfeld und zusätzlich vor dem Speichern abgewiesen. Innerhalb eines Tages stehen die zuletzt erfassten Einträge oben; Uhrzeiten werden nicht angezeigt. Löschen entfernt nur den gewählten Eintrag.

| Getränk | Mengenauswahl | Akzentfarbe |
| --- | --- | --- |
| Wasser | Alle 14 Größen | #38BDF8 |
| ISO-Drink | Alle 14 Größen | #A78BFA |
| Cola | Alle 14 Größen | #DC3545 |
| Cola Zero | Alle 14 Größen | #A1A1AA |
| Volvic Eistee | Alle 14 Größen | #84CC16 |
| Kaffee schwarz | Alle 14 Größen | #C49A6C |
| Kaffee mit Sojamilch | Alle 14 Größen | #E5CBA6 |
| Energy-Drink | Alle 14 Größen | #E5B83B |
| Bier | Alle 14 Größen | #D9A441 |

Jedes Getränk zählt mit der ausgewählten Gesamtmenge, auch Kaffee mit Sojamilch. Frühere Einträge bleiben unverändert; für neue Einträge gibt es keine fest vorgegebene Aufteilung in Kaffee und Sojamilch. Alle bisherigen Getränkefarben bleiben erhalten.

## Tageshistorie und Berliner Zeitzone

Alle Kalendertage werden fest in Europe/Berlin bestimmt, unabhängig von der Gerätezeitzone. Sommer- und Winterzeit berücksichtigt die eingebaute Intl-Datumsformatierung des Browsers. Kalenderarithmetik erfolgt separat mit UTC-Datumswerten, damit Tage mit 23 oder 25 Stunden den Durchschnitt nicht verfälschen.

Wenn heute ausgewählt ist, folgt die Anzeige beim Berliner Tageswechsel dem neuen Tag. Ein bewusst gewählter vergangener Tag bleibt ausgewählt. Der Tageswechsel wird jede Sekunde und beim Zurückkehren zur Seite geprüft. Eine durch Tageswechsel veraltete Mengenauswahl wird geschlossen; ein Klick darauf speichert nicht versehentlich für ein anderes Datum.

## Statistiken

Umschaltbar sind die letzten 7 bzw. 30 Kalendertage einschließlich heute und die Gesamthistorie. Die Gesamthistorie beginnt beim frühesten gespeicherten Trinktag und endet heute. Ohne Einträge wird heute als einzelner leerer Tag verwendet. Tage ohne Getränke zählen mit null mit. Durchschnitt = Gesamtmenge / Anzahl der Kalendertage.

Angezeigt werden Litergesamtmenge, Literdurchschnitt pro Kalendertag, Gesamtmenge je Getränkesorte und ein horizontal scrollbares Tagesdiagramm. Jeder Tag hat einen eigenen Balken, ein Datum und seinen Literwert; es wird nichts zeitlich zusammengefasst. Alle Anzeigen aktualisieren sich beim Hinzufügen und Löschen. Alte Energy-Namen werden nur für die Getränkeverteilung zu Energy-Drink zusammengefasst; im Verlauf bleiben ihre ursprünglichen Namen sichtbar. Alle Literanzeigen verwenden das deutsche Dezimalkomma.

## Speicherung und Kompatibilität

Der localStorage-Schlüssel bleibt getraenketracker-v1. Alte Einträge enthalten id, name, amount und timestamp. Ihre ISO-Zeitstempel mit Z bzw. explizitem UTC-Offset werden unverändert gelesen und für die Tageszuordnung nach Berlin umgerechnet. Dadurch können bisher in einer anderen Gerätezeitzone angezeigte Randzeiten nun unter einem anderen Kalendertag erscheinen; die gespeicherten Daten werden dabei nicht verändert.

Neue Einträge ergänzen das Feld date (YYYY-MM-DD) für den ausdrücklich ausgewählten Trinktag. timestamp bleibt der tatsächliche Erfassungszeitpunkt als ISO-UTC-Zeitstempel, auch bei Nachträgen. Ohne date wird der Berliner Tag aus timestamp abgeleitet. Eine Migration alter Daten ist nicht erforderlich. Beim Laden wird nichts zurückgeschrieben. Beim Hinzufügen bleiben bestehende Objekte erhalten; nur ausdrücklich gelöschte Einträge werden entfernt.

Falls gespeicherte Daten beschädigt sind oder ein Zeitstempel keine eindeutige Zeitzone enthält, zeigt die App einen Fehler und überschreibt die vorhandenen Browserdaten nicht. Solche Daten werden nicht automatisch migriert. Bis zur Klärung sind neue Änderungen nur im Arbeitsspeicher vorhanden. Auch blockierte Speicherung wird angezeigt.

Die Daten bleiben im jeweiligen Browserprofil und werden nicht übertragen. Private Browserfenster, gelöschte Browserdaten, ein anderer Browser oder ein veränderter Dateipfad können die Verfügbarkeit beeinflussen. Das Verhalten von localStorage bei direkt geöffneten Dateien hängt vom Browser ab.

## Dateien und Programmstruktur

- index.html: Seitenstruktur, Datumsauswahl, Tageshistorie, Statistiken und getrennte Export-/Importbedienung.
- style.css: Dunkles responsives Raster, Auswahlzustände, Datumsbedienung, Tagesdiagramm und lesbare Sicherungswarnungen.
- script.js: Bestehende Erfassung, Kalender und Statistiken sowie Sicherungsformat, Importprüfung, Bestätigungsablauf und geprüfte Wiederherstellung mit Rücksetzversuch.
- README.md: Bedienung, Datenformat und Prüfhinweise.

Zum Lernen: Beginne mit der HTML-Struktur. Im JavaScript enthält drinks weiterhin alle Getränke. berlinDay bestimmt Berliner Tage, entryDay unterstützt alte und neue Einträge, statistics berechnet Tageswerte und Verteilung, render aktualisiert die Oberfläche. loadEntries und saveEntries behalten den bisherigen Speicheransatz bei.

## Bisherige Prüfungen der Version 1.3

JavaScript wurde mit Node.js in einer simulierten DOM- und localStorage-Umgebung ausgeführt (keine zusätzliche Bibliothek in der App):

- Syntax und Start ohne Zurückschreiben vorhandener Daten.
- Heutige Zwei-Klick-Erfassung, Nachtrag und Löschen eines historischen Eintrags.
- Zukunftsdatum abgewiesen, Auswahl nach Erfassung geschlossen.
- 7 und 30 Tage, Gesamthistorie mit Nulltagen, leere Historie und Literdurchschnitt.
- Alte Energy-Namen angezeigt und gemeinsam ausgewertet; alte Objekte beim Ergänzen unverändert.
- Neuladen mit gespeicherten Testdaten und unverändertem Speicherschlüssel.
- UTC-Zeitstempel an Berliner Tagesgrenzen im Sommer und Winter sowie rund um beide Zeitumstellungen 2026.
- Simulierter Berliner Tageswechsel im Sommer und Winter einschließlich Schließen einer offenen Mengenauswahl.
- Gerätebezogene lokale Datumsmethoden wurden in den Tests absichtlich gesperrt; Berliner Zuordnung bleibt funktionsfähig.
- Mehrdeutiger Zeitstempel ohne Zeitzone führt zum Speicherschutz.

Ein echter Browsertest, eine Änderung der Betriebssystemzeitzone und eine visuelle Prüfung auf Smartphone/PC wurden nicht durchgeführt. Die automatischen Prüfungen verwenden isolierte Testdaten, keine persönlichen Browserdaten.

## Funktionstests nur mit künstlichen Daten

Nutze zum Testen ausschließlich ein getrenntes Browserprofil ohne echte Daten oder eine isolierte Testumgebung. In deinem echten Profil kannst du eine Sicherung erstellen und deine Daten ansehen; führe dort keine Import-, Lösch- oder künstlichen Erfassungstests aus.

1. Öffne index.html im getrennten Testprofil und arbeite dort ausschließlich mit künstlichen Daten.
2. Erfasse heute Wasser mit 700 ml. Heute-Summe und Eintragsanzahl steigen entsprechend.
3. Wähle gestern und erfasse Bier mit 400 ml. Der Hinweis und die Tageshistorie nennen gestern; die Heute-Summe bleibt gleich.
4. Lösche den Nachtrag. Tageshistorie und Statistiken müssen sich sofort aktualisieren.
5. Schalte zwischen 7 Tagen, 30 Tagen und Gesamthistorie um. Auch leere Tage müssen sichtbar sein und beim Durchschnitt mitzählen.
6. Lade neu und kontrolliere die erhaltenen Einträge. Die Auswahl startet wieder bei heute.
7. Prüfe ein schmales Fenster und scrolle das Diagramm horizontal. Optional: Ändere die Gerätezeitzone und prüfe, dass die Berliner Tageszuordnung gleich bleibt.
