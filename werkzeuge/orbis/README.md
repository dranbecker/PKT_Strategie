# Orbis-Textbausteine für die Parkinson-Komplexbehandlung

> **Status:** Entwurf – vor der Einführung in einem Probelauf zu testen

Diese Textbausteine setzen die [Patient Journey](../../prozesse/patient-journey.md),
die [Screenings](../../screening/README.md)
und die [Datenhoheit](../../prozesse/raci-matrix.md#datenhoheit-single-source-of-truth)
im KIS Orbis (Dedalus) um. Jede Berufsgruppe dokumentiert **nur ihren
Bereich** – Teambesprechung und Arztbrief bauen auf diesen Einträgen
auf, statt Informationen neu zu erheben.

## Übersicht

| Datei | Baustein | Wer | Wann |
|---|---|---|---|
| `01-aufnahme-aerztlich-pa.txt` | Ärztlicher Aufnahmebefund inkl. ANAP-Abgleich, MDS-UPDRS III, diagnostische Arbeitsliste | PA, Freigabe OA | Tag 1 |
| `02-medikationsanamnese.txt` | Medikationsanamnese mit exakten Einnahmezeiten, Fluktuationen, Device | PN (übergangsweise PA) | Tag 1 |
| `03-screenings-berufsgruppen.txt` | 6 Bausteine: Physiotherapie, Ergotherapie, Logopädie, Neuropsychologie, Sozialdienst, Ernährung | jeweilige Berufsgruppe (Ernährung: Basis-Screening durch Pflege) | Tag 1–2 |
| `04-screening-parkinson-nurse.txt` | Nichtmotorische Symptome, Schlucken, Mobilität im Pflegealltag, Warnsignale, Beratungsbedarf | PN (übergangsweise PA oder Bezugspflege) | Tag 1–2 |
| `10-icf-zielmatrix-gas.txt` | ICF-Zielmatrix mit GAS-Skala, 3–5 Ziele | PA moderiert, OA gibt frei | bis erste Teambesprechung |
| `11-teambesprechung-woche.txt` | Teambesprechung je Behandlungswoche inkl. OPS-Nachweis | PA bereitet am Vortag vor, OA leitet | wöchentlich |
| `12-arztbrief-pkt.txt` | Arztbrief-Vorlage mit GAS-Ergebnis und Verlaufsparametern | PA Entwurf, OA Freigabe | vor der Entlassung |

In `03-screenings-berufsgruppen.txt` ist jeder Abschnitt zwischen
`===== BAUSTEIN … =====` ein **eigener** Textbaustein; die Trennzeilen
werden nicht mit eingefügt.

Abkürzungen und Fachbegriffe: [Abkürzungs- und Begriffsverzeichnis](../../ABKUERZUNGEN.md)

## Verwendete Syntax

- `@PATVNAME@`, `@FALLNR@`, `@AUFNDAT@` … – automatisch aus dem KIS
- `#Feld#`, `#[Tn]Feld#`, `#[D]Feld#` – Freitext, mehrzeilig, Datum
- `#[L…]Feld#` / `#[M{G|, | und }…]Feld#` – Einfach- und Mehrfachauswahl
- `^…^` / `~…~` – Text für männliche bzw. weibliche Patienten
- `$IF … $ … && … $` – Bedingungen (Text in Anführungszeichen, Zahlen
  ohne), z. B. Ziele 4 und 5 nur bei entsprechender Anzahl
- `1K5` in Auswahllisten wird als „1,5" ausgegeben

**Voraussetzung:** Orbis ab Version 5.20 (`@GEBDAT@`, `$IF`,
Ersatzzeichen).

## Gestaltungsregeln

- **Bedingungen hängen an Einfachauswahlen** (ja/nein), nicht an
  Mehrfachauswahlen – deren Ausgabe (Groß-/Kleinschreibung,
  Kombinationen) ist für Vergleiche nicht verlässlich.
- **Keine Geschlechtsmarker in Auswahllisten.**
- Feldnamen sind je Baustein eindeutig, damit `@Feld@` eindeutig
  zurückverweist.
- Alle Bausteine wurden automatisch auf Klammerpaare, `$IF`-Struktur,
  Anführungszeichen-Regel und reservierte Zeichen geprüft.

## Test im Probelauf

- [ ] Alle Bausteine in Orbis anlegen und mit einem **Testpatienten**
      durchspielen – keine echten Patientendaten außerhalb des
      regulären Behandlungsfalls verwenden
- [ ] `$IF`-Zweige prüfen: Ziele 4/5, Device ja/nein, OPS nicht erfüllt,
      Dysphagie-Verdacht, ärztliche Rückmeldung Neuropsychologie
- [ ] Ausgabe der Mehrfachauswahl („A, B und C") kontrollieren
- [ ] Zeitbedarf je Baustein messen (Grundlage für die Messung der Dokumentationszeit)
- [ ] Rückmeldungen der Berufsgruppen sammeln und vor der Einführung
      einarbeiten

## Weiterentwicklung

In einem KIS-Formular können die Werte später direkt übernommen werden
(`#[Formularname].Feldname#`), z. B. die GAS-Skala aus der Zielmatrix
in die Teambesprechung und die Verlaufsparameter in den Arztbrief. In
der Einführungsphase werden die Einträge aus den vorhandenen Bausteinen
übernommen – die gleiche Struktur macht das ohne Neuerhebung möglich.
