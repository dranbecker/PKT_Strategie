# Werkzeuge

Werkzeuge setzen das Versorgungskonzept in der Dokumentation um. Sie
folgen einem gemeinsamen Grundsatz: **Jede Information wird einmal
erhoben und von allen genutzt** (siehe
[Datenhoheit](../prozesse/raci-matrix.md#datenhoheit-single-source-of-truth)).

| Stufe | Werkzeug | Status | Inhalt |
|---|---|---|---|
| Heute | [Orbis-Textbausteine](orbis/README.md) | Entwurf, Probelauf ausstehend | Aufnahme, Medikationsanamnese, Screenings, ICF-Zielmatrix, Teambesprechung, Arztbrief im KIS |
| Danach | KIS-Formular | geplant (E-008) | Strukturierte Felder statt Freitext, sobald sich die Inhalte bewährt haben |
| Vision | [PARson](parson/README.md) | Idee | Parkinson-spezifische FHIR-Sicht über alle Versorgungsstationen hinweg – mit Patientinnen, Patienten und Angehörigen als Beteiligten |

Die Stufen bauen aufeinander auf: Die Felder der Textbausteine werden
im KIS-Formular zu strukturierten Daten und lassen sich in PARson als
FHIR-Ressourcen abbilden.

## Referenzdaten

| Datei | Status | Inhalt |
|---|---|---|
| [icf/icf-mapping-pdq39-whodas.json](icf/icf-mapping-pdq39-whodas.json) | Konzept | Zuordnung der Items von PDQ-39 und WHODAS 2.0 zu ICF-Kategorien, Überlappung und Lücken – Grundlage für die ICF-Zielmatrix und spätere FHIR-Codierung |
| [icf/icf-kreis.html](icf/icf-kreis.html) | Konzept (Prototyp) | ICF-Kreis: Langzeitverlauf der Funktionsfähigkeit auf einen Blick, berechnet aus PDQ-39 und WHODAS 2.0; Beispiel mit fiktiven Daten |
