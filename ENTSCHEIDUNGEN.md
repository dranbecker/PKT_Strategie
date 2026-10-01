# Entscheidungen

Festgehaltene Konzeptentscheidungen mit Alternativen und Begründung.
Nummern ohne Eintrag betreffen einrichtungsinterne Entscheidungen.

---

## E-001 · Datenhoheit statt Mehrfach-Anamnese

- **Datum:** 2026-09-30 · **Status:** beschlossen (Konzept)
- **Entscheidung:** Jedes Datenobjekt (Medikation, Sozialanamnese,
  Mobilität, PROMs …) hat genau einen Owner; alle anderen lesen.
- **Alternativen:** (a) Status quo – jede Berufsgruppe erhebt eigene
  Anamnese; (b) zentrale Aufnahme ausschließlich durch ÄD.
- **Begründung:** (a) erzeugt die größten Redundanzen und
  widersprüchliche Angaben; (b) bündelt Arbeit an der knappsten
  Ressource. Die Verteilung nach Fachkompetenz nutzt vorhandene
  Screenings und entlastet den ärztlichen Dienst.

## E-002 · Physician Assistance verantwortet Pre-Admission und Dokumentationsfluss

- **Datum:** 2026-09-30 · **Status:** beschlossen (Konzept)
- **Entscheidung:** PA ist Owner der Pre-Admission (ANAP, Vorbefunde,
  PDQ-39/WHODAS 2.0/FOG-Q), führt Aufnahme, Diagnostik-Arbeitsliste,
  Teambesprechungsprotokoll und Arztbrief-Entwurf – unter ärztlicher
  Delegation.
- **Alternativen:** Parkinson Nurse als Owner; Tandem PA + PN;
  Verbleib bei Ambulanzärztin/-arzt.
- **Begründung:** Die Aufgaben sind überwiegend ärztlich-delegierbar und
  dokumentationsnah. Die PN übernimmt die medikations- und
  alltagsnahen Anteile, sobald besetzt.

## E-003 · Zielmessung mit GAS plus schlankem Kernset

- **Datum:** 2026-09-30 · **Status:** beschlossen (Konzept)
- **Entscheidung:** Goal Attainment Scaling je ICF-Ziel plus Kernset
  (PDQ-39, WHODAS 2.0, FOG-Q, MDS-UPDRS III, TUG, Mini-BESTest; MoCA
  und Schluckscreening bei Bedarf).
- **Alternativen:** nur standardisierte Scores; nur GAS.
- **Begründung:** GAS bildet individuell bedeutsame Alltagsziele ab,
  Scores machen Ergebnisse vergleichbar und für Qualitätsberichte
  nutzbar. Das Kernset bleibt bewusst klein, um keinen
  Dokumentationsmehraufwand zu erzeugen.

## E-004 · Strukturierte Nachsorge mit jährlicher PROM-Erhebung

- **Datum:** 2026-09-30 · **Status:** beschlossen (Konzept)
- **Entscheidung:** Telefon-Follow-up (1/6/12 Wochen) durch PN,
  Netzwerk-Übergabe, digitale Anbindung, jährliches WHODAS 2.0 und
  PDQ-39.
- **Alternativen:** feste Ambulanz-Wiedervorstellung für alle; keine
  strukturierte Nachsorge.
- **Begründung:** Nachhaltigkeit der Effekte (vgl. Studienlage) sichern,
  Patientenbindung stärken, eigene Real-World-Daten gewinnen, ohne die
  Ambulanzkapazität zu überlasten.

## E-005 · Oberärztinnen und Oberärzte als Entscheider und Projektverantwortliche

- **Datum:** 2026-09-30 · **Status:** beschlossen (Konzept)
- **Entscheidung:** Das „A" des ärztlichen Dienstes liegt bei den
  Oberärztinnen und Oberärzten. Sie sind Lotsen der Therapie, bilden die
  Assistenzärztinnen und -ärzte aus und verantworten Qualität, Planung
  und Organisation von PKT 3.0.
- **Alternativen:** Entscheidungsverantwortung bei den
  Stationsärztinnen und -ärzten; Projektverantwortung bei der PA.
- **Begründung:** Oberärztinnen und Oberärzte sind feste Größen ohne
  Rotation und tragen die fachärztliche Behandlungsleitung
  nach OPS 8-97d. Entscheidungen gehören zur Rolle mit Kontinuität und
  Facharztkompetenz; die PA bereitet vor, entscheidet aber nicht.

## E-007 · Screenings nach dem Prinzip „Screenen – Vertiefen – Weiterleiten“

- **Datum:** 2026-09-30 · **Status:** beschlossen (Konzept)
- **Entscheidung:** Jede Berufsgruppe screent nur ihren Kernbereich
  innerhalb von 48 Stunden; Hinweise außerhalb des eigenen Bereichs
  werden weitergeleitet. Logopädie und Ernährung erhalten eigene
  Screenings. Psychotherapie, Sport-, Kunst- und Musiktherapie sowie
  Klinische Pharmazie erhalten **kein eigenes Screening**; ihre
  Indikation ergibt sich aus Neuropsychologie, Physiotherapie,
  Zielvereinbarung bzw. STRIP-PD.
- **Alternativen:** eigenes Screening für jede Berufsgruppe; ein
  gemeinsamer Aufnahmebogen für alle.
- **Begründung:** Eigene Screenings für alle Berufsgruppen würden die
  Mehrfacherhebung wieder einführen; ein einziger Bogen würde die
  fachliche Tiefe verlieren. Die Weiterleitungsregeln
  ([screening/README.md](screening/README.md)) machen Überschneidungen
  eindeutig.

## E-008 · Dokumentationswerkzeuge zunächst als Orbis-Textbausteine

- **Datum:** 2026-09-30 · **Status:** beschlossen (Konzept)
- **Entscheidung:** Aufnahmeprofil, Screenings, ICF-Zielmatrix,
  Teambesprechung und Arztbrief starten als Orbis-Textbausteine
  ([werkzeuge/orbis](werkzeuge/orbis/README.md)); ein KIS-Formular folgt,
  wenn sich die Inhalte bewährt haben.
- **Alternativen:** direkt ein KIS-Formular; Word- oder PDF-Vorlagen.
- **Begründung:** Textbausteine sind ohne IT-Projekt kurzfristig
  einsetzbar und bleiben im KIS. Word- oder PDF-Vorlagen würden eine
  zusätzliche Übertragung erzeugen. Das KIS-Formular ist der zweite
  Schritt, sobald die Struktur erprobt ist.

## E-009 · Öffentliches Konzept, einrichtungsinterne Inhalte getrennt

- **Datum:** 2026-09-30 · **Status:** beschlossen
- **Entscheidung:** Dieses Repository enthält das übertragbare
  Versorgungskonzept. Einrichtungsspezifische Angaben – Stellen,
  Kennzahlen, Planungstermine und Präsentationen – werden nicht
  veröffentlicht. Rollen werden neutral beschrieben (z. B. „bis zur
  Besetzung einer PN-Stelle übergangsweise PA“).
- **Alternativen:** vollständige Veröffentlichung; privates Repository.
- **Begründung:** Das Konzept soll für den fachlichen Austausch offen
  zugänglich bleiben, ohne interne Personal- und Planungsdaten
  preiszugeben.
