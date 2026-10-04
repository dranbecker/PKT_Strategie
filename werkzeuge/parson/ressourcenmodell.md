# PARson – Ressourcenmodell

> **Status:** Vision – erste Zuordnung zur Diskussion. Codes, die mit
> „zu prüfen“ markiert sind, müssen vor einer Umsetzung in den
> offiziellen Terminologie-Browsern verifiziert werden. FHIR-Version:
> R4 (wie die deutschen Basisprofile und ISiK).

## Grundidee

FHIR (Fast Healthcare Interoperability Resources) zerlegt Gesundheits-
informationen in kleine, wiederverwendbare **Ressourcen** – etwa eine
Diagnose, einen Messwert oder einen Termin. Jede Ressource ist ein
JSON-Dokument, verweist auf andere Ressourcen und ist über
**Codesysteme** eindeutig maschinenlesbar.

PARson legt fest, **welche** Parkinson-Information in **welcher**
Ressource mit **welchem** Code steht. Dafür werden später
**Profile** (Einschränkungen und Erweiterungen bestehender Ressourcen)
in einem Implementation Guide beschrieben.

## Zuordnung

### Person und Team

| Information | FHIR-Ressource | Hinweise |
|---|---|---|
| Patientin/Patient | `Patient` | Deutsche Basisprofile / ISiK; Versichertennummer als Identifier |
| Angehörige, Bezugspersonen | `RelatedPerson` | Beziehung und Freigaben (siehe `Consent`) |
| Behandelnde Personen | `Practitioner`, `PractitionerRole` | Rolle je Berufsgruppe (OA, PA, PN, PT …) |
| Behandlungsteam | `CareTeam` | Stationäres PKT-Team und ambulantes Netzwerk |
| Einrichtungen | `Organization` | Klinik, Praxen, Therapiepraxen, Pflegedienste |

### Diagnostik

| Information | FHIR-Ressource | Codesystem | Beispiel |
|---|---|---|---|
| Parkinson-Diagnose | `Condition` | SNOMED CT, ICD-10-GM | SNOMED CT 49049000 *Parkinson's disease*; ICD-10-GM G20.- (5. Stelle zu prüfen) |
| Subtyp, Fluktuationen, Dyskinesien | `Condition` oder `Observation` | SNOMED CT | Codes zu prüfen |
| Nichtmotorische Symptome (Schlaf, Stimmung, Orthostase, Schlucken) | `Observation`, `Condition` | SNOMED CT, LOINC | Codes zu prüfen |
| MDS-UPDRS III, Hoehn und Yahr | `Observation` | LOINC | Codes zu prüfen; Lizenzbedingungen der MDS für die Skala beachten |
| TUG, Mini-BESTest, MoCA | `Observation` | LOINC | Codes zu prüfen |
| Bildgebung, Labor, Vorbefunde | `DiagnosticReport`, `DocumentReference` | LOINC | Vorhandene Befunde verlinken, nicht abtippen |

### Medikation

| Information | FHIR-Ressource | Codesystem | Parkinson-Besonderheit |
|---|---|---|---|
| Arzneimittel | `Medication` | ATC, PZN | Levodopa mit Decarboxylasehemmer z. B. ATC N04BA02 |
| Aktuelle Einnahme (berichtet) | `MedicationStatement` | – | **Exakte Uhrzeiten** über `dosage.timing.repeat.timeOfDay` (z. B. 07:00, 10:30, 14:00) |
| Ärztliche Verordnung | `MedicationRequest` | – | Begründung der Änderung in `reasonCode`/`note` |
| Gabe in der Klinik | `MedicationAdministration` | – | Tatsächliche Uhrzeit vs. geplante Uhrzeit (Zeitkritik) |
| Medikationsanalyse STRIP-PD | `DetectedIssue`, `Task` | – | Befund der Klinischen Pharmazie, Entscheidung durch OA |
| Unverträglichkeiten | `AllergyIntolerance` | SNOMED CT | z. B. Kontraindikation bestimmter Antiemetika/Neuroleptika |

### Device-Therapien

| Information | FHIR-Ressource | Hinweise |
|---|---|---|
| Implantat bzw. Pumpe | `Device` | THS-Impulsgenerator, Elektroden, Pumpe; Hersteller, Modell, Seriennummer |
| Einstellparameter | `Observation` (mit `device`-Verweis) | Kontakte, Amplitude, Pulsbreite, Frequenz bzw. Förderrate – Parkinson-spezifisches Profil nötig |
| Implantation, Feinjustage | `Procedure` | OPS-Codes |

### Aufenthalte, Termine und Ablauf

| Information | FHIR-Ressource | Codesystem | Hinweise |
|---|---|---|---|
| Krankenhausaufenthalt | `Encounter` | v3-ActCode (IMP = stationär) | Aufnahme-/Entlassdatum, Fachabteilung |
| Parkinson-Komplexbehandlung | `Procedure` | OPS 8-97d.- | Mit Verweis auf den Aufenthalt |
| Teambesprechung | `Communication` oder `Procedure` | – | OPS-Nachweis je Behandlungswoche |
| Termine (Ambulanz, Follow-up) | `Appointment` | – | Auch von Patientinnen/Patienten eingetragene Termine (als solche gekennzeichnet) |
| Aufgaben, Wiedervorlagen | `Task` | – | z. B. Telefon-Follow-up nach 1, 6, 12 Wochen |
| Behandlungsplan | `CarePlan` | – | Bündelt Ziele, Therapien und Termine |
| Überleitung, Arztbrief | `Composition` / `DocumentReference` | LOINC | Strukturierter Arztbrief, an das Netzwerk übergeben |

### Ziele und Ergebnisse

| Information | FHIR-Ressource | Codesystem | Hinweise |
|---|---|---|---|
| ICF-Ziel | `Goal` | ICF | Alltagsnahe Formulierung in `description`, ICF-Kategorie als Code |
| GAS-Bewertung | `Goal.target` + `Observation` | – | Skala −2 bis +2; Bewertung bei Entlassung als `Observation` mit Verweis auf das Ziel |
| Fragebögen (PDQ-39, WHODAS 2.0, FOG-Q) | `Questionnaire`, `QuestionnaireResponse` | LOINC | Lizenzbedingungen der Fragebögen beachten |
| Symptomtagebuch (ON/OFF, Stürze) | `Observation` | – | Eintrag durch Patientin/Patient, Herkunft über `performer` und `Provenance` |

### Datenschutz und Herkunft

| Information | FHIR-Ressource | Hinweise |
|---|---|---|
| Einwilligung, Freigaben | `Consent` | Wer darf was sehen – je Beteiligtem und Zweck |
| Herkunft eines Eintrags | `Provenance` | Wer hat wann was eingetragen oder geändert |
| Zugriffsprotokoll | `AuditEvent` | Wer hat wann was gelesen |

## Codesysteme

| Codesystem | Wofür | Hinweis |
|---|---|---|
| **SNOMED CT** | Diagnosen, Befunde, Symptome, Prozeduren | In Deutschland über die nationale Lizenz nutzbar (Verwaltung durch das BfArM) – Bedingungen zu prüfen |
| **LOINC** | Messwerte, Assessments, Fragebögen, Dokumenttypen | Frei nutzbar nach Lizenzbedingungen von Regenstrief |
| **ICD-10-GM** | Abrechnungsdiagnosen | Amtliche Klassifikation (BfArM) |
| **OPS** | Prozeduren, PKT 8-97d | Amtliche Klassifikation (BfArM) |
| **ATC**, **PZN** | Wirkstoffe, Arzneimittel | ATC (WIdO/BfArM), PZN für das konkrete Präparat |
| **ICF** | Ziele, Funktionsfähigkeit, Teilhabe | WHO-Klassifikation |
| **UCUM** | Einheiten (mg, ml/h, s) | Einheitlich maschinenlesbar |

## Standards, auf denen PARson aufbaut

| Spezifikation | Rolle für PARson |
|---|---|
| **Deutsche Basisprofile** (HL7 Deutschland) | Grundlage für Patient, Diagnose, Medikation usw. im deutschen Kontext |
| **ISiK** – Informationstechnische Systeme in Krankenhäusern (gematik) | Verpflichtende FHIR-Schnittstellen der Krankenhaus-IT; Weg, Daten aus dem KIS zu lesen, ohne sie neu zu erfassen |
| **Kerndatensatz der Medizininformatik-Initiative** | Abgestimmte Module für Diagnosen, Medikation, Laborwerte; anschlussfähig für pseudonymisierte Forschung |
| **ePA** (elektronische Patientenakte) inkl. Medikationsliste | Patientengeführte Akte; PARson soll ergänzen, nicht konkurrieren |
| **SMART on FHIR** | Standard für Apps, Anmeldung und Berechtigungen auf FHIR-Servern |

## Was PARson ergänzen müsste

Folgende Inhalte sind in den bestehenden Spezifikationen nach
derzeitigem Kenntnisstand nicht oder nicht ausreichend
Parkinson-spezifisch abgebildet und wären Kandidaten für eigene Profile:

- Einnahmezeiten-genaue Medikation mit Bezug zu ON/OFF-Phasen
- Symptomtagebuch (ON, OFF, ON mit Dyskinesien, Schlaf) im Halbstunden-Raster
- Device-Parameter für THS und Pumpentherapien im Verlauf
- ICF-Ziele mit GAS als durchgehendes Ziel- und Ergebnisformat
- OPS-8-97d-Nachweis (Therapieminuten je Behandlungswoche, Teambesprechung)

## Beispiel

Ein synthetisches Bundle mit einer erfundenen Person:
[beispiele/beispiel-bundle.json](beispiele/beispiel-bundle.json)
