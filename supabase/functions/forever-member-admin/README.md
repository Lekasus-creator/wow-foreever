# Neue WoW-Forever-Accounts anlegen
Die Seite besitzt bereits den Reiter „Verwaltung“ für forever1.
Für die Kontoerstellung ist eine Supabase Edge Function nötig. Ihre
Bereitstellung über die Supabase-Verbindung schlug mehrfach selbst für
kleinste Funktionen mit einem internen Serverfehler fehl.
**Die Kontoanlage bleibt bis zum erfolgreichen Deployment inaktiv.**

## Installation über GitHub Actions
1. Im Supabase-Dashboard ein Personal Access Token erstellen.
2. Im GitHub-Repository unter Settings → Secrets and variables → Actions
   das Secret SUPABASE_ACCESS_TOKEN anlegen. Niemals das Token in Dateien eintragen.
3. Unter Actions den Workflow „WoW Forever - Admin-Funktion bereitstellen“
   per „Run workflow“ starten.
4. In Supabase → Edge Functions prüfen, ob forever-member-admin aktiv ist.

Alternativ im lokalen, bei Supabase angemeldeten CLI:
supabase functions deploy forever-member-admin --project-ref tsfjsbjjqfpaaizikunv --use-api

## Funktionsprüfung
- Nur ein authentifizierter forever1 darf Nutzer anlegen; andere liefern 401/403.
- Ein neuer Nutzer meldet sich mit dem gewählten Namen und Passwort über
  forever-login an, wählt seine Horde-Rasse und -Klasse und erhält einen Reiter.
- Die Funktion nutzt nur serverseitige Umgebungsvariablen für Admin-Rechte.
- Bei Datenbankfehlern wird die frische Auth-Anlage zurückgenommen.
