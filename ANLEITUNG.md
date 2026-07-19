# My ToDo Organizer — Einrichtung

Einmalige Einrichtung in zwei Schritten: App online stellen, dann das Google-Cloud-Projekt anlegen. Dauer insgesamt etwa 20–30 Minuten.

## Schritt 1: App über https bereitstellen (GitHub Pages)

Die Google-Anmeldung funktioniert nur über https (oder localhost), nicht bei einer lokal geöffneten Datei.

1. Auf github.com anmelden (kostenloses Konto genügt) und ein neues Repository anlegen, z. B. `my-todo-organizer`. Es kann **privat** bleiben.
2. Alle Dateien dieses Ordners hochladen: `index.html`, `manifest.json`, `sw.js` und den Ordner `icons/`.
3. Im Repository: **Settings → Pages → Source: Deploy from a branch**, Branch `main`, Ordner `/ (root)`, speichern.
4. Nach ein bis zwei Minuten ist die App erreichbar unter
   `https://DEINNAME.github.io/my-todo-organizer/`
   Diese Adresse gleich notieren — sie wird in Schritt 2 gebraucht.

Hinweis: Die Seite selbst ist öffentlich erreichbar, zeigt aber ohne deinen Google-Login nur einen leeren Datenbestand. Wer die Adresse nicht kennt, findet sie nicht; wer sie kennt, sieht keine deiner Daten.

## Schritt 2: Google-Cloud-Projekt und Client-ID

1. https://console.cloud.google.com öffnen und mit dem Google-Konto anmelden, dessen Kalender genutzt werden soll.
2. Oben links **Projekt erstellen**, Name z. B. „My ToDo Organizer“. Kostenlos, keine Zahlungsdaten nötig.
3. **APIs aktivieren** (Menü „APIs & Dienste → Bibliothek“), jeweils suchen und „Aktivieren“ klicken:
   - Google Calendar API
   - Google Drive API
4. **OAuth-Zustimmungsbildschirm** (Menü „APIs & Dienste → OAuth-Zustimmungsbildschirm“):
   - Nutzertyp: **Extern**, App-Name und deine E-Mail eintragen, Rest kann leer bleiben.
   - Beim Punkt **Testnutzer** deine eigene Gmail-Adresse hinzufügen.
   - Den Status auf **Testing** belassen — dadurch entfällt Googles Verifizierungsverfahren komplett. Einzige Folge: Die stille Anmeldung läuft nach einiger Zeit ab und die App bittet gelegentlich um eine erneute Bestätigung.
5. **Anmeldedaten** (Menü „APIs & Dienste → Anmeldedaten“):
   - „Anmeldedaten erstellen → OAuth-Client-ID → Webanwendung“.
   - Unter **Autorisierte JavaScript-Quellen** die Adresse aus Schritt 1 eintragen, **ohne** Pfad und ohne Schrägstrich am Ende:
     `https://DEINNAME.github.io`
     Für Tests am PC zusätzlich: `http://localhost:8000`
   - Weiterleitungs-URIs werden **nicht** benötigt (Token-Flow).
   - Erstellen — die angezeigte **Client-ID** (endet auf `.apps.googleusercontent.com`) kopieren.
6. In der App: **Einstellungen → Google-Konto**, Client-ID einfügen, „Mit Google verbinden“. Google fragt einmal nach der Freigabe für Kalender und den App-Datenbereich von Drive.

Die Client-ID ist kein Geheimnis — sie darf im Browser sichtbar sein. Ein Client-Secret gibt es bei diesem Verfahren nicht.

## Auf allen Geräten einrichten

- **PC (Chrome/Edge):** Adresse öffnen → Installationssymbol in der Adressleiste → installieren.
- **Android:** Adresse in Chrome öffnen → Menü → „App installieren“ bzw. „Zum Startbildschirm hinzufügen“.
- **iPad:** Adresse in Safari öffnen → Teilen-Symbol → „Zum Home-Bildschirm“.

Auf jedem Gerät einmal die Client-ID eintragen und verbinden — danach lädt jedes Gerät automatisch den jeweils neuesten Stand aus Google Drive.

## Wie die Synchronisation arbeitet

- Der komplette Datenbestand liegt als `state.json` im **App-Datenordner** von Google Drive. Dieser Bereich ist in der normalen Drive-Oberfläche unsichtbar und nur für diese App zugänglich.
- Nach jeder Änderung wird mit kurzer Verzögerung hochgeladen. Beim Öffnen der App, beim Zurückkehren in den Tab und alle fünf Minuten wird geprüft, ob ein anderes Gerät einen neueren Stand hat — der neuere gewinnt.
- Deshalb: nicht auf zwei Geräten **gleichzeitig** offline arbeiten und dann beide online bringen; der ältere der beiden Stände würde überschrieben. Im Alltag (ein Gerät nach dem anderen) passiert das nicht.
- Der JSON-Export unter Einstellungen funktioniert weiterhin und ist als gelegentliche Zweitsicherung sinnvoll.

## Lokal testen (optional)

Im Ordner ein Terminal öffnen und `python3 -m http.server 8000` starten, dann `http://localhost:8000` aufrufen. Voraussetzung: `http://localhost:8000` ist wie oben beschrieben als JavaScript-Quelle eingetragen.

## Bekannte Grenzen

- iPad/Safari: Benachrichtigungen sind eingeschränkt; Safari kann lokale Daten lange ungenutzter Web-Apps löschen — dank Drive-Sync wird beim nächsten Öffnen einfach alles neu geladen.
- Die Fristen-Voreinstellungen bei Referendaren (10/8/6/2 Wochen vor der UPP) sind Platzhalter — bitte an die tatsächlich geltenden APVO-Vorgaben anpassen; sie sind pro Person einstellbar.
- Die hinterlegten Ferientermine (Niedersachsen bis Sommer 2027) stammen vom Kultusministerium, sind aber ohne Gewähr und in den Einstellungen editierbar.
