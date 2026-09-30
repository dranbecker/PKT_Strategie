# RACI-Matrix und Datenhoheit

> **Status:** Konzept

Die RACI-Matrix legt für jede Aufgabe der [Patient Journey](patient-journey.md)
fest, wer sie durchführt und wer das Ergebnis verantwortet. Die
Datenhoheits-Tabelle legt fest, **wer welche Information erhebt** – und
damit, wer sie *nicht* erneut erheben muss.

- **R** – Responsible: führt die Aufgabe durch
- **A** – Accountable: verantwortet das Ergebnis (genau eine Stelle je Aufgabe)
- **C** – Consulted: wird fachlich einbezogen
- **I** – Informed: wird informiert
- **A/R** – verantwortet und führt selbst durch

Abkürzungen: siehe [README](README.md#verwendete-abkürzungen).

> **Ärztlicher Dienst (ÄD):** Das „A" liegt bei der **Oberärztin bzw. dem
> Oberarzt** – sie sind die Entscheider und Lotsen der Therapie. Das „R"
> des ärztlichen Dienstes übernehmen Assistenzärztinnen und -ärzte unter
> oberärztlicher Anleitung. Siehe [Rollenprofil](../rollen/oberaerzte.md).
>
> **Hinweis zu PA und PN:** Aufgaben der Physician Assistance und der
> Parkinson Nurse erfolgen im Rahmen ärztlicher Delegation. Das „A" für
> medizinische Entscheidungen verbleibt beim ärztlichen Dienst. Solange
> keine PN-Stelle besetzt ist, übernimmt die PA die PN-Aufgaben
> (siehe
> [Übergangsregelung](../rollen/parkinson-nurse.md#übergangsregelung-bis-zur-stellenbesetzung)).

## RACI-Matrix

| Phase / Aufgabe | ÄD | PA | PN | PF | PT | ET | LO | NP | PSY | SKM | SD | KP | EB |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1 Erstkontakt Ambulanz** | A/R | C | C | | | | | | | | | | |
| **2 Indikation & Anmeldung** | A/R | R | I | I | | | | | | | I | | |
| **3 Pre-Admission** | | | | | | | | | | | | | |
| ANAP vervollständigen, Vorbefunde | A | R | C | | | | | | | | | | |
| Fragebögen PDQ-39, WHODAS 2.0, FOG-Q | I | A/R | C | | | | | | | | | | |
| Medikations-/On-Off-Tagebuch | I | C | A/R | | | | | | | | | C | |
| Soziale Triggerfragen | | R | | | | | | | | | A | | |
| **4 Aufnahmetag** | | | | | | | | | | | | | |
| Ärztliche Aufnahme, Untersuchung, MDS-UPDRS III | A | R | | I | | | | | | | | | |
| Medikationsanamnese mit Einnahmezeiten | C | I | A/R | R | | | | | | | | C | |
| Pflegerische Aufnahme, Onboarding | I | I | C | A/R | | | | | | | | | |
| **5 Screening** | | | | | | | | | | | | | |
| Diagnostische Arbeitsliste | A | R | I | I | | | | | | | | | |
| Screening Parkinson-Nurse | I | I | A/R | R | | | | | | | | | |
| Screening Mobilität (PT) | I | I | C | C | A/R | | | | | | | | |
| Screening Alltag/ADL (ET) | I | I | | C | C | A/R | | | | | | | |
| Screening Sprechen/Schlucken (LO) | I | I | C | C | | | A/R | | | | | | C |
| Screening Kognition/Psyche (NP) | C | I | C | | | C | | A/R | C | | | | |
| Screening Sozialmedizin (SD) | I | I | C | C | | C | | | | | A/R | | |
| STRIP-PD-Medikationsanalyse | A | C | C | | | | | C | | | | R | |
| Ernährungsscreening | I | | C | R | | | C | | | | | | A/R |
| Zusammenführung Aufnahmeprofil | A | R | C | C | C | C | C | C | C | C | C | C | C |
| **6 ICF-Ziele & GAS** | A | R | C | C | C | C | C | C | C | C | C | | |
| **7 Therapieplanung inkl. OPS-Check** | A | R | C | | C | C | C | C | C | C | | | |
| **8 Therapie & Monitoring** | | | | | | | | | | | | | |
| Therapiedurchführung | A | | | | R | R | R | R | R | R | | | R |
| On/Off-/Dyskinesie-Monitoring | A | I | R | R | C | C | | | | | | | |
| Medikationsentscheidung | A/R | C | C | I | C | | | C | | | | C | |
| Abarbeitung Diagnostik-Arbeitsliste | A | R | | C | | | | | | | | | |
| Device-Therapie-Betreuung | A | C | R | C | | | | | | | | | |
| **9 Teambesprechung** (Leitung / Protokoll) | A | R | C | C | C | C | C | C | C | C | C | C | |
| **10 Entlassplanung** | | | | | | | | | | | | | |
| Anschlussversorgung, Anträge, Pflegegrad | I | I | C | C | | C | | | | | A/R | | |
| Hilfsmittel, Heimübungsprogramm | I | I | | | R | A/R | | | | | C | | |
| Medikations- und Device-Edukation | C | I | A/R | R | | | | | | | | C | |
| **11 Entlassung** | | | | | | | | | | | | | |
| Arztbrief-Entwurf | A | R | C | | C | C | C | C | C | | C | C | |
| Finaler Medikationsplan | A | C | C | I | | | | | | | | R | |
| Abschlussassessments (Kernset) | A | R | | | R | | | R | | | | | |
| Freigabe Arztbrief | A/R | I | | | | | | | | | | | |
| **12 Nachsorge & Bindung** | | | | | | | | | | | | | |
| Telefon-Follow-up 1/6/12 Wochen | C | I | A/R | | | | | | | | C | | |
| Netzwerk-Übergabe | C | R | A/R | | | | | | | | C | | |
| Jährliche WHODAS 2.0 + PDQ-39 | I | A/R | C | | | | | | | | | | |
| Wiedervorstellung Ambulanz | A/R | R | C | | | | | | | | | | |

> Bei „A/R" in einer Zeile ist die Gruppe zugleich verantwortlich und
> durchführend. Zeilen mit mehreren „R" (z. B. Therapiedurchführung)
> bedeuten parallele Durchführung in den jeweiligen Fachbereichen.

## Datenhoheit (Single Source of Truth)

Diese Tabelle ist das zentrale Werkzeug gegen Mehrfach-Anamnese: Jedes
Datenobjekt hat **genau einen Owner**, der es erhebt und aktuell hält.
Alle anderen Berufsgruppen **lesen** es.

| Datenobjekt | Owner (erhebt) | Zeitpunkt | Nutzer (lesen, nicht neu erheben) |
|---|---|---|---|
| ANAP / Behandlungsfragestellung | PA (ÄD freigegeben) | Pre-Admission | alle |
| Vorbefunde, Vorerkrankungen | PA | Pre-Admission | ÄD, KP, NP |
| Medikationsanamnese mit Einnahmezeiten | PN (übergangsweise PA) | Tag 1 | ÄD, PA, KP, PF |
| On/Off-, Dyskinesie-Protokoll | PN / PF | laufend | ÄD, KP, PT, ET |
| Medikationsanalyse (STRIP-PD) | KP | Tag 2 | ÄD, PN |
| Neurologischer Befund, MDS-UPDRS III | PA (ÄD freigegeben) | Tag 1, Entlassung | alle |
| PROMs: PDQ-39, WHODAS 2.0, FOG-Q | PA | Pre-Admission, Entlassung, jährlich | alle |
| Mobilität, Gang, Gleichgewicht, Sturzrisiko | PT | Tag 1–2, Entlassung | PF, ET, ÄD |
| ADL, Feinmotorik, Hilfsmittelbedarf | ET | Tag 1–2, Entlassung | PF, SD, PT |
| Sprechen, Stimme, Schlucken | LO | Tag 1–2 | PF, EB, PN |
| Kognition, Stimmung, Impulskontrolle | NP | Tag 1–3 | ÄD, ET, PSY, PN |
| Soziale Situation, Pflegegrad, Wohnen | SD | Pre-Admission (Trigger), Tag 1–2 | ET, PN, PA |
| Ernährungsstatus | EB | Tag 1–2 | PF, LO, ÄD |
| Kontaktpersonen / Angehörige | PF | Tag 1 | alle |
| ICF-Zielmatrix mit GAS | PA (ÄD verantwortlich) | Tag 3, wöchentlich, Entlassung | alle |
| Therapieminuten (OPS) | jeweilige Therapie | laufend | ÄD, PA, Controlling |

## Zuordnung der Interventionsklassen des Therapie-Index

Die im Projekt hinterlegte Therapie-Datenbank (73 Interventionen)
ordnet die Maßnahmen folgenden Berufsgruppen zu:

| Interventionsbereich | Führend | Mitwirkend |
|---|---|---|
| Gang, Gleichgewicht, Cueing, LSVT BIG, Sturzprävention, Haltung | PT | SKM, ET |
| Ausdauer, Kraft, Boxen, Tanz, Tai Chi, Nordic Walking, Aquatherapie | SKM (Sport) | PT |
| ADL-Training, Hilfsmittel, Feinmotorik, Fatigue-Management | ET | PT |
| LSVT LOUD, EMST, Dysphagietherapie, Sialorrhoe, AAC | LO | ÄD, PF |
| Kognitives Training, kognitive Stimulation, Reminiszenz | NP | ET |
| KVT bei Depression/Angst/Insomnie/Impulskontrolle, Achtsamkeit | PSY | NP |
| Medikamentenmanagement, Adhärenz, Obstipation, Edukation | PN / PF | ÄD, KP |
| Device-Therapien (Indikation: THS, Pumpen) | ÄD | PN, PA |
| Orthostase, Blase, Schlaf, Schmerz (medizinisch) | ÄD | PN, PA |
| Pflegegrad, GdB, berufliche Wiedereingliederung, Selbsthilfe | SD | PN |
| Proteinredistribution, Mangelernährung, Obstipation | EB | PF, ÄD |
| Advance Care Planning, Palliativversorgung | ÄD | PN, SD, PSY |
