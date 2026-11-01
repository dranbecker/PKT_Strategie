// erzeugt von build.js – nicht von Hand ändern

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

if (typeof module !== "undefined") module.exports = { icfWerte, icfKreisSVG };
