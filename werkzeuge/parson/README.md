# PARson – Parkinson-Informationen als FHIR

> **Status:** Vision / Idee – nicht Teil der aktuellen Umsetzung.
> Es gibt weder Software noch einen Server; dieses Verzeichnis beschreibt
> das Zielbild und ist Grundlage für die fachliche Diskussion.

**PARson** setzt sich aus **PAR**kinson und J**SON** zusammen. JSON ist
das Datenformat, in dem FHIR-Ressourcen ausgetauscht werden – codiert mit
internationalen Terminologien wie **SNOMED CT** und **LOINC**.

## Die Idee

Ein Mensch mit Parkinson begegnet über viele Jahre vielen Beteiligten:
Neurologie in Klinik und Praxis, Hausarztpraxis, Physio-, Ergotherapie
und Logopädie, Pflege und Home-Nursing, Sozialdienst, Apotheke – und
im Krankenhaus bis zu 13 Berufsgruppen gleichzeitig. Jede Stelle
erhebt Diagnose, Medikation, Befunde und Termine neu, oft auf Papier
oder in Systemen, die nicht miteinander sprechen.

PARson beschreibt eine **gemeinsame, Parkinson-spezifische Sicht** auf
diese Informationen:

- **Diagnostik** – Diagnose, Subtyp, Verlauf, Assessments (z. B. MDS-UPDRS III, Hoehn und Yahr, MoCA)
- **Therapie** – Ziele (ICF, GAS), Therapiepläne, Device-Therapien
- **Medikation** – mit exakten Einnahmezeiten, Änderungen und Begründung
- **Termine** – Ambulanz, Follow-ups, Wiedervorstellungen
- **Krankenhausaufenthalte** – inklusive Parkinson-Komplexbehandlung
- **Selbstberichtete Daten** – Fragebögen (PDQ-39, WHODAS 2.0, FOG-Q) und Symptomtagebuch

Im Mittelpunkt stehen **Patientinnen, Patienten und Angehörige**. Sie
sehen ihre Daten ein und tragen selbst bei – etwa ihr Symptomtagebuch,
Fragebögen und Termine.

## Grundsätze

1. **Sicht statt Silo.** PARson ist keine neue Datenbank, in die alles
   doppelt eingetragen wird. Die Daten bleiben dort, wo sie entstehen –
   im KIS, in der Praxissoftware, in der elektronischen Patientenakte
   (ePA). PARson definiert, **wie** Parkinson-Informationen strukturiert
   und codiert sind, und führt sie über FHIR-Schnittstellen zusammen.
   Das setzt die [Datenhoheit](../../prozesse/raci-matrix.md#datenhoheit-single-source-of-truth)
   über die Klinik hinaus fort.
2. **Standards nutzen, nicht erfinden.** PARson baut auf bestehenden
   deutschen und internationalen Spezifikationen auf (siehe
   [Ressourcenmodell](ressourcenmodell.md#standards-auf-denen-parson-aufbaut)).
   Neu ist nur, was Parkinson-spezifisch ist – etwa Einnahmezeiten,
   ON/OFF-Phasen oder Device-Parameter.
3. **Wer erhebt, verantwortet.** Jede Ressource trägt ihre Herkunft
   (wer hat was wann eingetragen). Die Zuständigkeit folgt der
   [RACI-Matrix](../../prozesse/raci-matrix.md).
4. **Datenschutz von Anfang an.** Zugriff nur nach Rolle und
   Einwilligung, jede Einsicht wird protokolliert (siehe
   [Datenschutz](datenschutz.md)).

## Wer greift zu?

| Beteiligte | Lesen | Eigene Einträge |
|---|---|---|
| Patientin/Patient | eigene Daten vollständig | Symptomtagebuch, Fragebögen, Termine, Notizen |
| Angehörige | nach Freigabe durch die Patientin/den Patienten | nach Freigabe, z. B. Beobachtungen im Alltag |
| Klinik (13 Berufsgruppen) | nach Rolle und Behandlungsauftrag | eigener Fachbereich (Datenhoheit) |
| Niedergelassene Neurologie, Hausarztpraxis | nach Einwilligung | Befunde, Medikation, Überweisungen |
| Ambulante Therapien, Pflege, Home-Nursing | nach Einwilligung, nur relevante Ausschnitte | Therapieverlauf, Pflegebeobachtungen |
| Forschung | nur pseudonymisiert und mit gesonderter Einwilligung | – |

Ärztliche und therapeutische Einträge können Patientinnen und Patienten
lesen, aber nicht ändern. Fehler werden über einen
Korrekturhinweis an die erhebende Stelle gemeldet.

## Nutzen

- **Weniger Mehrfach-Anamnese** – auch über Sektorengrenzen hinweg
- **Sichere Medikation** – ein aktueller Plan mit exakten Einnahmezeiten statt widersprüchlicher Listen
- **Bessere Übergänge** – Aufnahme mit vollständigen Vorbefunden, Entlassung mit strukturierter Übergabe an das Netzwerk
- **Beteiligung** – Patientinnen und Patienten werden von Befragten zu Mitwirkenden
- **Eigene Ergebnisdaten** – PROMs und Verläufe über Jahre, auswertbar für Qualität und (pseudonymisiert) Forschung

## Inhalt dieses Verzeichnisses

| Datei | Inhalt |
|---|---|
| [ressourcenmodell.md](ressourcenmodell.md) | Welche Parkinson-Information wird mit welcher FHIR-Ressource und welchem Codesystem abgebildet? |
| [datenschutz.md](datenschutz.md) | Rechtsgrundlagen, Einwilligung, Rollen und Zugriffe, Protokollierung |
| [roadmap.md](roadmap.md) | Stufen von der Vision bis zum sektorenübergreifenden Betrieb |
| [beispiele/beispiel-bundle.json](beispiele/beispiel-bundle.json) | Synthetisches FHIR-Bundle einer erfundenen Person |

Begriffe: [Abkürzungs- und Begriffsverzeichnis](../../ABKUERZUNGEN.md) ·
Entscheidung: [E-012](../../ENTSCHEIDUNGEN.md#e-012--parson-als-fhir-vision)
