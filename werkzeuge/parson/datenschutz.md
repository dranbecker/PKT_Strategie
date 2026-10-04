# PARson – Datenschutz

> **Status:** Vision – Orientierung für die Konzeptphase, **keine
> Rechtsberatung**. Vor jeder Umsetzung sind Datenschutzbeauftragte,
> Informationssicherheit und Rechtsabteilung einzubinden und eine
> Datenschutz-Folgenabschätzung durchzuführen.

Parkinson-Informationen sind **Gesundheitsdaten** und damit besonders
geschützt (Art. 9 DSGVO). PARson führt Daten mehrerer Stellen
zusammen – deshalb muss Datenschutz Teil der Architektur sein, nicht
ein nachträglicher Zusatz (Art. 25 DSGVO, *Privacy by Design*).

## Leitlinien

1. **Sicht statt Kopie.** Daten bleiben bei der Stelle, die sie erhebt
   und verantwortet. PARson liest über Schnittstellen und speichert
   nur, was sonst nirgends liegt (z. B. Symptomtagebuch).
2. **Die Patientin, der Patient entscheidet.** Wer außerhalb des
   aktuellen Behandlungsauftrags zugreift, braucht eine Freigabe.
3. **So wenig wie möglich.** Jede Rolle sieht nur die Ausschnitte, die
   sie für ihre Aufgabe braucht (Datenminimierung, Art. 5 DSGVO).
4. **Alles nachvollziehbar.** Jeder Eintrag hat eine Herkunft, jeder
   Zugriff wird protokolliert.
5. **Keine echten Daten in Entwicklung und Test.** Ausschließlich
   synthetische Daten – auch in Beispielen dieses Repositorys.

## Rechtsgrundlagen (zu prüfen)

| Verarbeitung | Mögliche Grundlage | Hinweis |
|---|---|---|
| Behandlung in der Klinik | Art. 9 Abs. 2 lit. h DSGVO i. V. m. Behandlungsvertrag; Dokumentationspflicht § 630f BGB | Landeskrankenhausgesetz des jeweiligen Landes ergänzend beachten |
| Austausch mit Praxen, Therapien, Pflege | Einwilligung (Art. 9 Abs. 2 lit. a DSGVO) oder gesetzliche Übermittlungsbefugnis | Schweigepflicht (§ 203 StGB) gilt für alle Beteiligten |
| Einträge durch Patientinnen/Patienten | Einwilligung | Freiwillig, jederzeit widerrufbar |
| Zugriff durch Angehörige | Einwilligung und Freigabe durch die Patientin/den Patienten | Bei fehlender Einwilligungsfähigkeit: gesetzliche Vertretung/Vorsorgevollmacht |
| Forschung und Qualitätsauswertung | Gesonderte Einwilligung (z. B. Broad Consent der Medizininformatik-Initiative) oder gesetzliche Forschungsgrundlage | Nur pseudonymisiert bzw. anonymisiert |

## Einwilligung und Freigaben

- Abbildung als FHIR-Ressource **`Consent`**: je Beteiligtem, Zweck
  (Behandlung, Nachsorge, Forschung) und Datenkategorie.
- Freigaben sind **fein steuerbar** – z. B. „Physiotherapiepraxis sieht
  Mobilität, Stürze und Therapieziele, aber keine psychischen Befunde“.
- **Widerruf** wirkt sofort für künftige Zugriffe.
- Besonders sensible Inhalte (psychische Befunde, Impulskontroll-
  störungen) sind standardmäßig nur für den Behandlungskontext
  freigegeben.

## Rollen und Zugriffe

| Rolle | Lesen | Schreiben |
|---|---|---|
| Patientin/Patient | eigene Daten | eigene Einträge (Tagebuch, Fragebögen, Termine) |
| Angehörige | nach Freigabe | nach Freigabe, als Angehörigen-Eintrag gekennzeichnet |
| Klinik-Berufsgruppen | Behandlungsauftrag, Ausschnitt nach Rolle | eigener Fachbereich (Datenhoheit) |
| Externe Behandelnde | nach Einwilligung, Ausschnitt nach Rolle | eigene Befunde |
| Forschung | nur pseudonymisierte Auszüge | – |

Technisch: Anmeldung und Berechtigung nach **SMART on FHIR**
(OAuth 2.0 / OpenID Connect), für Versicherte perspektivisch über
die **GesundheitsID**, für Leistungserbringer über die
Telematikinfrastruktur bzw. den elektronischen Heilberufsausweis.

Ärztliche und therapeutische Einträge sind für Patientinnen und
Patienten **lesbar, aber nicht änderbar**. Korrekturwünsche gehen als
Hinweis an die erhebende Stelle.

## Nachvollziehbarkeit

- **`Provenance`** – wer hat welchen Eintrag wann erstellt oder geändert
- **`AuditEvent`** – wer hat wann welche Daten gelesen
- Patientinnen und Patienten können das Zugriffsprotokoll einsehen
  (Transparenz, Auskunftsrecht Art. 15 DSGVO)
- Datenübertragbarkeit (Art. 20 DSGVO) ist mit FHIR als offenem
  Format naturgemäß angelegt

## Technische und organisatorische Maßnahmen (Art. 32 DSGVO)

- Verschlüsselung bei Übertragung und Speicherung
- Betrieb in Deutschland bzw. der EU; bei Cloud-Nutzung die besonderen
  Anforderungen für Gesundheitsdaten beachten (u. a. § 393 SGB V,
  C5-Testat) und Auftragsverarbeitungsvertrag (Art. 28 DSGVO)
- Rollen- und Rechtekonzept, regelmäßige Rezertifizierung der Zugriffe
- Notfallzugriff („Break the Glass“) nur protokolliert und nachträglich geprüft
- Pseudonymisierung über eine vertrauenswürdige Stelle für Auswertungen
- Lösch- und Aufbewahrungskonzept (Aufbewahrung der Behandlungs-
  dokumentation nach § 630f BGB; Tagebuchdaten nach Zweckerfüllung
  bzw. Widerruf)
- Informationssicherheit nach dem branchenspezifischen
  Sicherheitsstandard für Krankenhäuser (B3S) bzw. den einschlägigen
  Vorgaben für Krankenhäuser

## Pflichtschritte vor einer Umsetzung

- [ ] Datenschutz-Folgenabschätzung (Art. 35 DSGVO)
- [ ] Verzeichnis von Verarbeitungstätigkeiten ergänzen
- [ ] Einwilligungstexte in verständlicher Sprache, mit Patientenvertretung abgestimmt
- [ ] Rollen- und Rechtekonzept mit allen Beteiligten
- [ ] Klärung gemeinsamer Verantwortlichkeit (Art. 26 DSGVO) bei mehreren Einrichtungen
- [ ] Prüfung des Verhältnisses zur ePA (Ergänzung statt Parallelakte)
- [ ] Test ausschließlich mit synthetischen Daten
