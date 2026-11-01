// Build: ICF-Kreis – Beispieldaten, interaktiver Prototyp, statisches SVG für die Folie
// Aufruf: node build.js <repoRoot> <scratchDir>
const fs = require('fs');
const path = require('path');
const [repo, scratch] = process.argv.slice(2);
const mapping = JSON.parse(fs.readFileSync(path.join(repo, 'werkzeuge/icf/icf-mapping-pdq39-whodas.json'), 'utf8'));

// ---------- Modell: festes PKT-Set ----------
const titles = Object.fromEntries(mapping.icf_codes.map(c => [c.code, c.titel_de]));
const CH = [
  ['b1', 'Mentale Funktionen', 'Mental', 'b'],
  ['b2', 'Sinnesfunktionen und Schmerz', 'Sinne · Schmerz', 'b'],
  ['b3', 'Stimm- und Sprechfunktionen', 'Stimme', 'b'],
  ['b5', 'Funktionen des Verdauungs-, Stoffwechsel- und endokrinen Systems', 'Verdauung · Stoffw.', 'b'],
  ['b7', 'Neuromuskuloskeletale und bewegungsbezogene Funktionen', 'Bewegung', 'b'],
  ['d1', 'Lernen und Wissensanwendung', 'Lernen', 'd'],
  ['d2', 'Allgemeine Aufgaben und Anforderungen', 'Aufgaben', 'd'],
  ['d3', 'Kommunikation', 'Kommunikation', 'd'],
  ['d4', 'Mobilität', 'Mobilität', 'd'],
  ['d5', 'Selbstversorgung', 'Selbstversorgung', 'd'],
  ['d6', 'Häusliches Leben', 'Haushalt', 'd'],
  ['d7', 'Interpersonelle Interaktionen und Beziehungen', 'Beziehungen', 'd'],
  ['d8', 'Bedeutende Lebensbereiche', 'Arbeit · Bildung', 'd'],
  ['d9', 'Gemeinschafts-, soziales und staatsbürgerliches Leben', 'Gemeinschaft', 'd'],
  ['e3', 'Unterstützung und Beziehungen', 'Unterstützung', 'e'],
  ['e4', 'Einstellungen', 'Einstellungen', 'e'],
];
// Codes aus Verdichtung (Fragebögen) + Parkinson-Lücken ohne Item (nur Untersuchung)
const fromQ = mapping.verdichtung.map(v => v.code);
const exam = ['b510', 'b735', 'b760', 'b765', 'b770'];
const allCodes = [...new Set([...fromQ, ...exam])];
const itemMap = {}; // code -> [{inst, nr, stichwort}]
const parent = c => c.slice(0, 4);
const isCat = c => /^[bde]\d{3,}$/.test(c);
for (const dim of mapping.instrumente['PDQ-39'].dimensionen) for (const it of dim.items)
  for (const c of it.icf) if (isCat(c)) (itemMap[parent(c)] ||= []).push({ inst: 'PDQ-39', nr: String(it.nr), stichwort: it.stichwort });
for (const dom of mapping.instrumente['WHODAS 2.0'].domaenen) for (const it of dom.items)
  for (const c of it.icf) if (isCat(c)) (itemMap[parent(c)] ||= []).push({ inst: 'WHODAS 2.0', nr: it.nr, stichwort: it.stichwort });
for (const k in itemMap) itemMap[k] = itemMap[k].filter((x, i, a) => a.findIndex(y => y.inst === x.inst && y.nr === x.nr) === i);
const model = {
  sectors: CH.map(([id, titel, kurz, comp]) => ({
    id, titel, kurz, comp,
    codes: allCodes.filter(c => c.slice(0, 2) === id).sort().map(c => ({
      code: c, titel: titles[c], items: itemMap[c] || [], nurUntersuchung: exam.includes(c) && !itemMap[c],
    })),
  })).filter(s => s.codes.length),
};
const unplaced = allCodes.filter(c => !model.sectors.some(s => s.codes.some(x => x.code === c)));
if (unplaced.length) throw new Error('Nicht zugeordnet: ' + unplaced);

// ---------- Fiktive Beispieldaten ----------
const T = [
  { id: 't1', datum: '2023-02-01', label: '02/23', anlass: 'vor PKT-Aufenthalt 1 (Pre-Admission)', gas: ['d450', 'd460', 'd920'] },
  { id: 't2', datum: '2023-03-10', label: '03/23', anlass: 'Entlassung PKT-Aufenthalt 1', gas: [] },
  { id: 't3', datum: '2024-03-15', label: '03/24', anlass: 'Jahreserhebung Nachsorge', gas: [] },
  { id: 't4', datum: '2025-03-15', label: '03/25', anlass: 'Jahreserhebung Nachsorge', gas: [] },
  { id: 't5', datum: '2026-10-01', label: '10/26', anlass: 'vor PKT-Aufenthalt 2 (Pre-Admission)', gas: ['d350', 'd460', 'd910'] },
];
const pdq = { // Item: Werte T1..T5 (0 nie … 4 immer/kann gar nicht)
  1: [2,1,2,3,3], 2: [1,1,1,2,2], 3: [1,1,1,2,2], 4: [3,2,3,3,4], 5: [2,1,2,2,3], 6: [1,0,1,2,2], 7: [2,1,2,3,3],
  8: [1,0,1,2,3], 9: [2,1,2,3,4], 10: [1,0,1,2,3], 11: [0,0,1,1,1], 12: [1,1,1,1,2], 13: [2,1,2,2,2], 14: [2,2,2,3,3],
  15: [1,1,1,2,2], 16: [1,1,1,1,2], 17: [1,1,1,2,2], 18: [0,0,1,1,2], 19: [0,0,0,1,1], 20: [1,0,1,1,1], 21: [2,1,2,2,3],
  22: [2,2,2,3,3], 23: [1,1,1,1,1], 24: [0,0,1,1,2], 25: [1,1,1,2,2], 26: [1,1,1,1,2], 27: [1,1,1,1,1], 28: [0,0,0,0,1],
  29: [0,0,0,1,1], 30: [1,1,1,2,2], 31: [1,1,1,1,2], 32: [0,0,1,1,2], 33: [0,0,0,0,1], 34: [0,0,1,2,3], 35: [0,0,1,1,2],
  36: [0,0,0,1,2], 37: [2,1,1,1,2], 38: [2,1,2,2,2], 39: [1,1,1,1,1],
};
const who = { // Schweregrad 0–4, gespeichert als WHODAS-Antwort 1–5; null = nicht zutreffend
  'D1.1': [1,1,1,1,2], 'D1.2': [0,0,1,1,2], 'D1.3': [0,0,0,1,1], 'D1.4': [1,1,1,1,2], 'D1.5': [0,0,0,1,1], 'D1.6': [0,0,1,1,2],
  'D2.1': [2,1,2,3,3], 'D2.2': [1,1,1,2,2], 'D2.3': [1,0,1,1,2], 'D2.4': [1,1,1,2,3], 'D2.5': [3,2,3,3,4],
  'D3.1': [0,0,1,1,1], 'D3.2': [1,1,1,1,2], 'D3.3': [0,0,0,1,1], 'D3.4': [0,0,0,1,1],
  'D4.1': [0,0,0,1,1], 'D4.2': [1,0,1,1,2], 'D4.3': [0,0,0,1,1], 'D4.4': [1,1,1,2,2], 'D4.5': [1,1,1,2,2],
  'D5.1': [1,1,1,2,2], 'D5.2': [1,1,1,2,2], 'D5.3': [1,1,2,2,3], 'D5.4': [2,1,2,2,3],
  'D5.5': null, 'D5.6': null, 'D5.7': null, 'D5.8': null,
  'D6.1': [1,1,2,2,3], 'D6.2': [1,1,1,2,2], 'D6.3': [0,0,0,1,1], 'D6.4': [1,1,1,2,2], 'D6.5': [1,1,1,2,2],
  'D6.6': [0,0,0,1,1], 'D6.7': [1,1,1,2,2], 'D6.8': [1,1,1,2,2],
};
const beispiel = {
  hinweis: 'FIKTIVER BEISPIELVERLAUF – keine echten Patientendaten',
  format: 'pdq39: Item 1–39 → 0–4 (0 nie … 4 immer/kann gar nicht); whodas: Item D1.1–D6.8 → 1–5 (1 keine … 5 extrem/nicht möglich), null = nicht zutreffend; gas: ICF-Codes der GAS-Ziele des Aufenthalts',
  patient: { bezeichnung: 'Beispielpatient (fiktiv)', erstdiagnose: '2019' },
  ereignisse: [
    { typ: 'stationaer', von: '2023-02-22', bis: '2023-03-10', label: 'PKT-Aufenthalt 1' },
    { typ: 'stationaer', von: '2025-07-14', bis: '2025-07-25', label: 'stationär nach Sturz' },
    ...[['2023-03-24', 'pn', 'Telefon-Follow-up PN'], ['2023-06-20', 'arzt', 'Parkinson-Ambulanz'], ['2023-10-17', 'arzt', 'Parkinson-Ambulanz'],
        ['2024-01-23', 'pn', 'Telefon-Follow-up PN'], ['2024-06-11', 'arzt', 'Parkinson-Ambulanz'], ['2024-11-19', 'arzt', 'Parkinson-Ambulanz'],
        ['2025-05-06', 'arzt', 'Parkinson-Ambulanz'], ['2025-08-12', 'pn', 'Telefon-Follow-up PN'], ['2025-09-09', 'arzt', 'Parkinson-Ambulanz'],
        ['2026-01-27', 'arzt', 'Parkinson-Ambulanz'], ['2026-05-19', 'arzt', 'Parkinson-Ambulanz'], ['2026-09-01', 'arzt', 'Parkinson-Ambulanz: Anmeldung PKT']]
      .map(([datum, typ, label]) => ({ typ, datum, label })),
  ],
  zeitpunkte: T.map((t, i) => ({
    ...t,
    pdq39: Object.fromEntries(Object.entries(pdq).map(([k, v]) => [k, v[i]])),
    whodas: Object.fromEntries(Object.entries(who).map(([k, v]) => [k, v === null ? null : v[i] + 1])),
  })),
};

// ---------- Berechnung + Zeichnung (wird 1:1 in den Prototyp übernommen) ----------
const shared = String.raw`
function icfWerte(model, daten) {
  // Wert je Code und Zeitpunkt = Mittelwert der verknüpften Items auf 0–4
  // (PDQ-39 0–4 direkt, WHODAS 2.0 1–5 minus 1). Stufe = gerundeter Mittelwert.
  const out = {};
  for (const s of model.sectors) for (const c of s.codes) {
    out[c.code] = daten.zeitpunkte.map(t => {
      const vals = [];
      for (const it of c.items) {
        const v = it.inst === 'PDQ-39' ? t.pdq39?.[it.nr] : (t.whodas?.[it.nr] == null ? null : t.whodas[it.nr] - 1);
        if (v != null && !Number.isNaN(+v)) vals.push({ ...it, wert: +v });
      }
      const m = vals.length ? vals.reduce((a, b) => a + b.wert, 0) / vals.length : null;
      const max = vals.length ? Math.max(...vals.map(x => x.wert)) : null;
      return { mittel: m, stufe: m == null ? null : Math.round(m), max, items: vals };
    });
  }
  return out;
}
function icfKreisSVG(model, daten, o = {}) {
  const R0 = o.r0 ?? 92, R = o.r ?? 330, n = daten.zeitpunkte.length;
  const gapCh = 0.7, gapComp = 1.8, gapTop = 6.5;
  const werte = o.werte || icfWerte(model, daten);
  // Winkel-Slots
  let slots = gapTop / 2, prevComp = null; const pos = [];
  model.sectors.forEach((s, si) => {
    if (si) slots += s.comp !== prevComp ? gapComp : gapCh;
    const start = slots;
    s.codes.forEach(c => { pos.push({ s, c, a: slots }); slots += 1; });
    s._a0 = start; s._a1 = slots; prevComp = s.comp;
  });
  slots += gapTop / 2;
  const k = 2 * Math.PI / slots, ang = x => x * k - Math.PI / 2;
  const P = (r, a) => [(r * Math.cos(a)).toFixed(1), (r * Math.sin(a)).toFixed(1)];
  const arc = (r1, r2, a1, a2) => {
    const [x1, y1] = P(r2, a1), [x2, y2] = P(r2, a2), [x3, y3] = P(r1, a2), [x4, y4] = P(r1, a1);
    const L = a2 - a1 > Math.PI ? 1 : 0;
    return 'M' + x1 + ' ' + y1 + 'A' + r2 + ' ' + r2 + ' 0 ' + L + ' 1 ' + x2 + ' ' + y2 + 'L' + x3 + ' ' + y3 + 'A' + r1 + ' ' + r1 + ' 0 ' + L + ' 0 ' + x4 + ' ' + y4 + 'Z';
  };
  const rw = (R - R0) / n, esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const deg = a => a * 180 / Math.PI;
  let g = '', gd = '';
  // Zellen
  for (const p of pos) {
    const a1 = ang(p.a) + 0.004, a2 = ang(p.a + 1) - 0.004;
    daten.zeitpunkte.forEach((t, i) => {
      const w = werte[p.c.code][i];
      const cls = p.c.nurUntersuchung ? 'ik-x' : (w.stufe == null ? 'ik-na' : 'ik-q' + w.stufe);
      g += '<path class="ik-cell ' + cls + '" d="' + arc(R0 + i * rw + 1, R0 + (i + 1) * rw - 1, a1, a2) + '" data-code="' + p.c.code + '" data-t="' + i + '"/>';
    });
    // GAS-Rauten
    daten.zeitpunkte.forEach((t, i) => {
      if ((t.gas || []).includes(p.c.code)) {
        const rr = R0 + (i + 0.5) * rw, [x, y] = P(rr, ang(p.a + 0.5)); const d = Math.max(5.5, Math.min(9, rw * 0.22, rr * k * 0.3));
        gd += '<path class="ik-gas" d="M' + x + ' ' + (y - d) + 'l' + d + ' ' + d + 'l-' + d + ' ' + d + 'l-' + d + ' -' + d + 'Z"/>';
      }
    });
    // Code-Beschriftung radial
    const am = ang(p.a + 0.5), flip = Math.cos(am) < 0;
    const [tx, ty] = P(R + 8, am);
    g += '<text class="ik-code" x="' + tx + '" y="' + ty + '" transform="rotate(' + (deg(am) + (flip ? 180 : 0)).toFixed(1) + ' ' + tx + ' ' + ty + ')" text-anchor="' + (flip ? 'end' : 'start') + '" dominant-baseline="central">' + p.c.code + '</text>';
  }
  // Kapitel-Bänder und -Beschriftung
  for (const s of model.sectors) {
    const a1 = ang(s._a0) + 0.003, a2 = ang(s._a1) - 0.003, rB = R + 50;
    g += '<path class="ik-band ik-' + s.comp + '" d="' + arc(rB, rB + 9, a1, a2) + '"><title>' + s.id + ' ' + esc(s.titel) + '</title></path>';
    const am = (a1 + a2) / 2, bottom = Math.sin(am) > 0.05, rt = rB + 24;
    const id = 'ikp-' + (o.idp || '') + s.id;
    const sw = bottom ? [P(rt + 8, a2), P(rt + 8, a1), 0] : [P(rt, a1), P(rt, a2), 1];
    g += '<path id="' + id + '" fill="none" d="M' + sw[0][0] + ' ' + sw[0][1] + 'A' + (bottom ? rt + 8 : rt) + ' ' + (bottom ? rt + 8 : rt) + ' 0 0 ' + sw[2] + ' ' + sw[1][0] + ' ' + sw[1][1] + '"/>';
    const passt = (s.id.length + s.kurz.length + 1) * 8.6 < rt * (a2 - a1);
    g += '<text class="ik-ch"><textPath href="#' + id + '" startOffset="50%" text-anchor="middle"><tspan class="ik-chid">' + s.id + '</tspan>' + (passt ? ' ' + esc(s.kurz) : '') + '</textPath><title>' + s.id + ' ' + esc(s.titel) + '</title></text>';
  }
  // Grenze mäßig | erheblich: Umriss aller Felder, in denen mindestens ein verknüpftes Item >= o.grenze (Standard 3) ist.
  // Orientierungswert, nicht validiert (PDQ-39 misst Häufigkeit, WHODAS 2.0 Schweregrad).
  const G = o.grenze ?? 3;
  const hi = (pi, i) => { const p = pos[pi]; if (!p || p.c.nurUntersuchung) return false; const w = werte[p.c.code][i]; return o.grenzeFn ? !!o.grenzeFn(w, p.c.code, i) : (w.max != null && w.max >= G); };
  const aL = (r, a1, a2) => { const [x1, y1] = P(r, a1), [x2, y2] = P(r, a2); return 'M' + x1 + ' ' + y1 + 'A' + r + ' ' + r + ' 0 0 1 ' + x2 + ' ' + y2; };
  const rL = (a, r1, r2) => { const [x1, y1] = P(r1, a), [x2, y2] = P(r2, a); return 'M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2; };
  let lim = '';
  pos.forEach((p, pi) => {
    const a1 = ang(p.a), a2 = ang(p.a + 1);
    for (let i = 0; i < n; i++) {
      if (!hi(pi, i)) continue;
      const ri = R0 + i * rw, ro = R0 + (i + 1) * rw;
      if (i === 0 || !hi(pi, i - 1)) lim += aL(ri, a1, a2);
      if (i === n - 1 || !hi(pi, i + 1)) lim += aL(ro, a1, a2);
      if (!pos[pi - 1] || pos[pi - 1].s !== p.s || !hi(pi - 1, i)) lim += rL(a1, ri, ro);
      if (!pos[pi + 1] || pos[pi + 1].s !== p.s || !hi(pi + 1, i)) lim += rL(a2, ri, ro);
    }
  });
  if (lim && o.grenzlinie !== false) g += '<path class="ik-lim-halo" d="' + lim + '"/><path class="ik-lim" d="' + lim + '"/>';
  g += gd;
  // Ereignisse in der oberen Lücke: links stationäre Aufenthalte, rechts Kontakte.
  // Zeit -> Radius stückweise linear zwischen den Ringmitten (Ringe = Erhebungen, nicht maßstäblich).
  const tOf = d => { const [y, m, dd] = String(d).split('-').map(Number); return y * 12 + (m - 1) + ((dd || 15) - 1) / 31; };
  const tc = daten.zeitpunkte.map(t => tOf(t.datum)), rc = i => R0 + (i + 0.5) * rw;
  const rOf = d => {
    const x = tOf(d); let r;
    if (n === 1) r = rc(0);
    else if (x <= tc[0]) r = rc(0) - (tc[0] - x) / (tc[1] - tc[0]) * rw;
    else if (x >= tc[n - 1]) r = rc(n - 1) + (x - tc[n - 1]) / (tc[n - 1] - tc[n - 2]) * rw;
    else { let i = 0; while (x > tc[i + 1]) i++; r = rc(i) + (x - tc[i]) / (tc[i + 1] - tc[i]) * rw; }
    return Math.max(R0 + 3, Math.min(R - 3, r));
  };
  const fmt = d => { const [y, m, dd] = String(d).split('-'); return (dd ? dd + '.' : '') + m + '.' + y; };
  const laneS = -Math.PI / 2 - 2.35 * k, laneK = -Math.PI / 2 + 2.35 * k;
  for (const e of daten.ereignisse || []) {
    if (e.typ === 'stationaer') {
      let r1 = rOf(e.von), r2 = rOf(e.bis); if (r2 - r1 < 6) { const m = (r1 + r2) / 2; r1 = m - 3; r2 = m + 3; }
      const [x1, y1] = P(r1, laneS), [x2, y2] = P(r2, laneS);
      g += '<circle class="ik-stayring" r="' + ((r1 + r2) / 2).toFixed(1) + '"/>';
      g += '<path class="ik-stay" d="M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2 + '"><title>' + esc(e.label || 'stationär') + ': ' + fmt(e.von) + '–' + fmt(e.bis) + '</title></path>';
    } else {
      const [x, y] = P(rOf(e.datum), laneK);
      g += '<circle class="ik-kon ' + (e.typ === 'pn' ? 'pn' : '') + '" cx="' + x + '" cy="' + y + '" r="3.6"><title>' + esc(e.label || 'Kontakt') + ': ' + fmt(e.datum) + '</title></circle>';
    }
  }
  // Ring-Beschriftung (Zeitpunkte) in der oberen Lücke
  daten.zeitpunkte.forEach((t, i) => {
    const r = R0 + (i + 0.5) * rw;
    g += '<text class="ik-ring" x="0" y="' + (-r).toFixed(1) + '" text-anchor="middle" dominant-baseline="central">' + esc(t.label) + '</text>';
  });
  // Zentrum
  g += '<circle class="ik-center" r="' + (R0 - 6) + '"/>';
  g += '<text class="ik-c1" y="-8" text-anchor="middle">' + esc(o.zentrum1 ?? 'Patient') + '</text>';
  g += '<text class="ik-c2" y="16" text-anchor="middle">' + esc(o.zentrum2 ?? (daten.zeitpunkte[0].label + ' → ' + daten.zeitpunkte[n - 1].label)) + '</text>';
  const V = R + 112;
  return '<svg class="ik" viewBox="' + (-V) + ' ' + (-V) + ' ' + 2 * V + ' ' + 2 * V + '" role="img" aria-label="' + esc(o.aria || 'ICF-Kreis') + '">' + g + '</svg>';
}
`;
eval(shared + ';globalThis.icfKreisSVG=icfKreisSVG;globalThis.icfWerte=icfWerte;');

// ---------- Ausgaben ----------
fs.writeFileSync(path.join(repo, 'werkzeuge/icf/beispiel-verlauf-fiktiv.json'), JSON.stringify(beispiel, null, 2));
// Wiederverwendung (z. B. Kohorten-Auswertung): Modell und Zeichenfunktion als eigene Dateien
fs.writeFileSync(path.join(scratch, 'icfkreis-modell.json'), JSON.stringify(model, null, 1));
fs.writeFileSync(path.join(scratch, 'icfkreis-render.js'), '// erzeugt von build.js – nicht von Hand ändern\n' + shared + '\nif (typeof module !== "undefined") module.exports = { icfWerte, icfKreisSVG };\n');
const aria = 'ICF-Kreis eines fiktiven Beispielpatienten: 16 ICF-Kapitel als Segmente, je Kapitel die ICF-Codes als Speichen, fünf Erhebungen von 02/23 (innen) bis 10/26 (außen). Zunehmende Einschränkung über die Jahre vor allem in Mobilität (d450, d460), Gemeinschaftsleben (d910, d920), Stimme und Kommunikation (b310, d330, d350) und Emotionen (b152). Rauten markieren GAS-Ziele der beiden PKT-Aufenthalte.';
const slideSVG = icfKreisSVG(model, beispiel, { idp: 's', zentrum1: 'Beispiel', zentrum2: 'fiktiv · 2023–2026', aria });
fs.writeFileSync(path.join(scratch, 'icf-kreis-slide.svg'), slideSVG);

const css = fs.readFileSync(path.join(scratch, 'icfkreis.css'), 'utf8');
const tpl = fs.readFileSync(path.join(scratch, 'prototyp.tpl.html'), 'utf8');
const html = tpl
  .replace('/*CSS*/', css)
  .replace('/*SHARED*/', shared)
  .replace('/*MODEL*/', JSON.stringify(model))
  .replace('/*DATEN*/', JSON.stringify(beispiel));
fs.writeFileSync(path.join(repo, 'werkzeuge/icf/icf-kreis.html'), html);

const w = icfWerte(model, beispiel);
console.log('Speichen:', model.sectors.reduce((a, s) => a + s.codes.length, 0), 'Sektoren:', model.sectors.length);
for (const c of ['d450', 'd460', 'd910', 'd920', 'b310', 'd350', 'b152', 'd850', 'b765']) console.log(c, w[c].map(x => x.mittel == null ? '–' : x.mittel.toFixed(1)).join(' '));
