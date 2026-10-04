# PARson – Roadmap

> **Status:** Vision – ohne Termine. PARson ist **nicht** Teil der
> aktuellen Einführung der Prozessverteilung; die Orbis-Textbausteine
> haben Vorrang (E-008).

| Stufe | Inhalt | Ergebnis | Voraussetzung |
|---|---|---|---|
| **0 · Vision** | Zielbild, Ressourcenmodell, Datenschutz-Leitlinien, synthetisches Beispiel | Dieses Verzeichnis | – |
| **1 · Datenmodell** | Parkinson-spezifische Profile auf Basis der deutschen Basisprofile und ISiK; Codes verifizieren; Implementation Guide (z. B. in FHIR Shorthand) | Abgestimmtes, maschinenlesbares Datenmodell | Fachlicher Konsens der Berufsgruppen; Terminologie-Prüfung |
| **2 · Prototyp** | FHIR-Server (z. B. Open-Source HAPI FHIR) mit **ausschließlich synthetischen Daten**; einfache Ansicht für Team und Patientin/Patient | Demonstrator, Nutzertests | Datenmodell aus Stufe 1 |
| **3 · Klinik** | Anbindung an das KIS über ISiK-Schnittstellen; strukturierte KIS-Formulare liefern die Daten | Parkinson-Sicht über echte Klinikdaten, ohne Doppelerfassung | Datenschutz-Folgenabschätzung, IT-Projekt, Freigaben |
| **4 · Netzwerk** | Sektorenübergreifend: Praxen, Therapien, Pflege im ParkinsonNetz; Patientenzugang mit Tagebuch und Fragebögen; Verbindung zur ePA | Gemeinsame Sicht über die gesamte Versorgung | Einwilligungsmanagement, Verträge, Finanzierung |

## Verbindung zu den bestehenden Werkzeugen

- Die Felder der [Orbis-Textbausteine](../orbis/README.md) sind die
  fachliche Vorlage für die Profile in Stufe 1.
- Was im Probelauf der Textbausteine nicht genutzt wird, kommt auch
  nicht in PARson.
- Die [Patient Journey](../../prozesse/patient-journey.md) bestimmt,
  welche Ressource in welcher Phase entsteht.

## Offene Fragen

- Wer betreibt PARson in Stufe 4 – Klinik, Netzwerk, Dritter?
- Wie wird der Betrieb finanziert (z. B. Innovationsfonds, Selektivverträge)?
- Welche Inhalte deckt die ePA künftig selbst ab, sodass PARson sie nur anzeigt?
- Lizenzbedingungen für Skalen und Fragebögen (MDS-UPDRS, PDQ-39) in digitaler Form
