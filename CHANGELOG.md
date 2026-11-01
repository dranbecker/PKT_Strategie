# Changelog

## 2026-11-01

### Hinzugefügt
- `werkzeuge/icf/icf-mapping-pdq39-whodas.json`: Linking der Items von
  PDQ-39 (39) und WHODAS 2.0 (36) auf ICF-Kategorien mit deutschen
  Titeln (BfArM 2005), Überlappung auf 3-stelliger Ebene (13 gemeinsam,
  21 nur PDQ-39, 18 nur WHODAS 2.0) und Lückenanalyse mit Zuordnung zum
  Kernset. WHODAS nach WHO-Zuordnung (Üstün 2010); PDQ-39-Komponenten
  nach Nilsson 2010, Kategorien eigene Zuordnung, unabhängig geprüft.
  Status: Konzept; Titelabgleich mit REHADAT-ICF steht aus
- `werkzeuge/README.md`: ICF-Mapping und ICF-Kreis ergänzt
- `werkzeuge/icf/icf-kreis.html`: interaktiver Prototyp **ICF-Kreis** –
  Langzeitverlauf je Patientin/Patient: Segmente = ICF-Kapitel, Speichen
  = 57 ICF-Codes (festes PKT-Set), Ringe = Erhebungen (innen alt, außen
  neu), Farbe = Ausprägung 0–4 aus PDQ-39 und WHODAS 2.0, Rauten = GAS-
  Ziele; Detailansicht mit Items, Tabellenansicht, lokales Laden eigener
  JSON-Daten; rote Grenzlinie um alle Felder, in denen mindestens ein
  Item erheblich ist (≥ 3; Orientierungswert, nicht validiert);
  stationäre Aufenthalte und Kontakte (Ambulanz, PN) in der oberen
  Lücke, zeitlich zwischen den Erhebungen interpoliert. Status: Konzept
- `werkzeuge/icf/beispiel-verlauf-fiktiv.json`: fiktiver Beispielverlauf
  (5 Erhebungen 2023–2026) als Datenformat-Vorlage
- `werkzeuge/icf/build/`: Build-Skript für Prototyp und Folien-Grafik
  (`node build/build.js <Repo-Pfad> build`)
  – erzeugt zusätzlich `icfkreis-modell.json` und `icfkreis-render.js`
  zur Wiederverwendung; Zeichenfunktion nimmt vorberechnete Werte und
  eine eigene Grenzregel an (z. B. für Gruppenauswertungen)

## 2026-10-29

### Geändert
- `prozesse/icf-ziele-und-messung.md`: GAS-Abschlussbewertung „vor der
  Entlassung“ statt „Tag 12–13“ (passend zur Verweildauer und zur
  Patient Journey)

## 2026-10-04

### Hinzugefügt
- `werkzeuge/parson/`: Vision **PARson** (Parkinson + JSON) – Parkinson-
  spezifische FHIR-Sicht über alle Versorgungsstationen: Zielbild und
  Beteiligte, Ressourcenmodell mit Codesystemen (SNOMED CT, LOINC,
  ICD-10-GM, OPS, ATC, ICF), Datenschutz-Leitlinien, Roadmap in fünf
  Stufen und ein synthetisches FHIR-Beispiel-Bundle
- `werkzeuge/README.md`: Übersicht der Werkzeuge (Orbis heute, PARson als Vision)
- `ENTSCHEIDUNGEN.md`: E-012 (PARson als FHIR-Vision)
- `ABKUERZUNGEN.md`: Abschnitt „Digitale Gesundheitsdaten und Interoperabilität“

### Geändert
- `README.md`: Inhaltsverzeichnis um Werkzeuge und PARson ergänzt

## 2026-10-01

### Hinzugefügt
- `ENTSCHEIDUNGEN.md`: E-007 (Screening-Prinzip), E-008 (Orbis-Textbausteine),
  E-009 (Trennung öffentliches Konzept / einrichtungsinterne Inhalte)

## 2026-09-30

### Hinzugefügt
- `prozesse/`: Patient Journey in 12 Phasen mit Zeitstrahl auf Werktagsbasis
  (keine Therapien an Wochenenden/Feiertagen; 7,5 h je Behandlungswoche
  ≙ Ø 1,5 h je Werktag, davon ≥ 1 h Einzeltherapie), OPS-8-97d-Nachweis,
  RACI-Matrix mit Datenhoheits-Tabelle, ICF-Ziele mit Goal Attainment
  Scaling und Kernset-Assessments
- `rollen/`: Rollenprofile Oberärztinnen/Oberärzte (Entscheider und Lotsen
  der Therapie), Physician Assistance, Parkinson Nurse inkl.
  Übergangsregelung
- `werkzeuge/orbis/`: Orbis-Textbausteine für ärztliche Aufnahme,
  Medikationsanamnese, Screenings, ICF-Zielmatrix mit GAS, Teambesprechung
  mit OPS-Nachweis und Arztbrief-Vorlage
- `ENTSCHEIDUNGEN.md`: Konzeptentscheidungen mit Alternativen und Begründung
- `ABKUERZUNGEN.md`: Abkürzungs- und Begriffsverzeichnis
- `screening/`: Übersicht mit Prinzip, Weiterleitungen und Berufsgruppen
  ohne eigenes Screening; neue Screenings Logopädie und Ernährung;
  alle Screenings um Zeitpunkt, Datenhoheit, Kernset, Orbis-Baustein und
  Schnittstellen ergänzt und untereinander verlinkt
- Orbis-Baustein 03-EB (Ernährung)

### Geändert
- `README.md`: Inhaltsverzeichnis ergänzt
- `screening_diagnsotik.md` umbenannt in `screening_diagnostik.md` (Tippfehler)
