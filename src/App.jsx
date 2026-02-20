import React, { useState, useEffect, useRef } from "react";

const C = {
  cream:"#F4EEE3", stone:"#E0D5C4", clay:"#B8724A", clayDeep:"#8C4E2A",
  moss:"#374732", mossMid:"#5A6855", dust:"#C8A99A", midnight:"#1E2018",
  white:"#FDFAF5", ink:"#2A2318"
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
html, body {
  max-width: 100vw;
  overflow-x: hidden;
}
body{background:#FDFAF5;color:#2A2318;font-family:'DM Sans',sans-serif;font-weight:300;line-height:1.7}
button{font-family:'DM Sans',sans-serif;cursor:pointer}
p{font-size:.92rem;line-height:1.85;margin:0}

@keyframes breathe{0%,100%{transform:scale(1);opacity:.45}50%{transform:scale(1.05);opacity:.85}}
@keyframes wkFadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}

.wk-section   { padding:6rem 5rem; }
.wk-section-s { padding:4.5rem 5rem; }
.wk-inner     { max-width:1280px; margin:0 auto; }
.wk-2col      { display:grid; grid-template-columns:1fr 1fr; gap:6rem; }
.wk-split     { display:grid; grid-template-columns:1fr 1fr; min-height:460px; }
.wk-hero-grid { display:grid; grid-template-columns:1.1fr .9fr; min-height:100vh; padding-top:70px; }
.wk-footer-g  { display:grid; grid-template-columns:1.6fr 1fr 1fr; gap:5rem; }
.wk-about-hero{ display:grid; grid-template-columns:1fr 1fr; min-height:90vh; padding-top:70px; }
.wk-tcm-hero  { display:grid; grid-template-columns:1fr .8fr; gap:6rem; align-items:center; padding:110px 5rem 5rem; max-width:1400px; margin:0 auto; }
.wk-aroma-hero{ display:grid; grid-template-columns:1fr .9fr; gap:6rem; align-items:center; padding:110px 5rem 5rem; max-width:1400px; margin:0 auto; }
.wk-nav-desk  { display:flex; gap:.15rem; align-items:center; }
.wk-nav-mob   { display:none; }
.wk-hide-mob  { display:inline; }

/* Responsive Grid Classes for Borders & Stacking */
.wk-grid-multi { display:grid; grid-template-columns:repeat(3,1fr); border:1px solid ${C.stone}; }
.wk-grid-multi > div { border-right:1px solid ${C.stone}; border-bottom:1px solid ${C.stone}; }
.wk-grid-multi > div:nth-child(3n) { border-right:none; }
.wk-grid-multi > div:nth-last-child(-n+3) { border-bottom:none; }

.wk-grid-single { display:grid; grid-template-columns:repeat(3,1fr); border:1px solid ${C.stone}; }
.wk-grid-single > div { border-right:1px solid ${C.stone}; }
.wk-grid-single > div:last-child { border-right:none; }

.wk-grid-kontakt { display:grid; grid-template-columns:repeat(3,1fr); gap:0; }
.wk-grid-kontakt > div { border-left:1px solid rgba(255,255,255,.07); padding-left:2.5rem; padding-right:2.5rem; }
.wk-grid-kontakt > div:first-child { border-left:none; padding-left:0; }
.wk-grid-kontakt > div:last-child { padding-right:0; }

@media(max-width:900px){
  .wk-section   { padding:4rem 1.4rem; }
  .wk-section-s { padding:3rem 1.4rem; }
  .wk-2col      { grid-template-columns:1fr; gap:2.5rem; }
  .wk-split     { grid-template-columns:1fr; }
  .wk-hero-grid { grid-template-columns:1fr; }
  .wk-footer-g  { grid-template-columns:1fr; gap:3rem; }
  .wk-about-hero{ grid-template-columns:1fr; min-height:auto; }
  .wk-tcm-hero  { grid-template-columns:1fr; padding:100px 1.4rem 3.5rem; gap:2rem; }
  .wk-aroma-hero{ grid-template-columns:1fr; padding:100px 1.4rem 3.5rem; gap:2rem; }
  .wk-nav-desk  { display:none; }
  .wk-nav-mob   { display:flex; }
  .wk-hero-right{ display:none; }
  .wk-hide-mob  { display:none; }

  .wk-grid-multi { grid-template-columns:1fr; }
  .wk-grid-multi > div { border-right:none !important; border-bottom:1px solid ${C.stone} !important; }
  .wk-grid-multi > div:last-child { border-bottom:none !important; }

  .wk-grid-single { grid-template-columns:1fr; }
  .wk-grid-single > div { border-right:none !important; border-bottom:1px solid ${C.stone} !important; }
  .wk-grid-single > div:last-child { border-bottom:none !important; }

  .wk-grid-kontakt { grid-template-columns:1fr; gap:2.5rem; }
  .wk-grid-kontakt > div { border-left:none; border-bottom:1px solid rgba(255,255,255,.07); padding:0 0 2.5rem 0; }
  .wk-grid-kontakt > div:first-child { padding-left:0; }
  .wk-grid-kontakt > div:last-child { border-bottom:none; padding-bottom:0; }
}
@media(max-width:600px){
  .wk-section   { padding:3rem 1.1rem; }
  .wk-section-s { padding:2.5rem 1.1rem; }
}
`;

/* ─── HOOKS ──────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.07 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(26px)" : "translateY(0)",
      transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
      ...style
    }}>{children}</div>
  );
}

function ImageSlot({ label, desc, aspect = "4/3", fill = false }) {
  const [hov, setHov] = useState(false);
  const [img, setImg] = useState(null);
  const inp = useRef(null);
  const onFile = e => { const f = e.target.files[0]; if (f) setImg(URL.createObjectURL(f)); };
  const wrap = fill
    ? { position: "absolute", inset: 0, cursor: "pointer" }
    : { position: "relative", aspectRatio: aspect, overflow: "hidden", cursor: "pointer",
        border: img ? "none" : `2px dashed ${hov ? C.clay : C.dust}`,
        background: img ? "transparent" : `linear-gradient(135deg,${C.stone},${C.dust},#D4B89A)`,
        transition: "border-color .3s" };
  return (
    <div style={wrap} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => inp.current?.click()}>
      <input ref={inp} type="file" accept="image/*" style={{ display: "none" }} onChange={onFile} />
      {img ? (
        <>
          <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s", transform: hov ? "scale(1.04)" : "scale(1)" }} />
          {hov && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: ".6rem 1rem", background: "rgba(30,32,24,.7)", backdropFilter: "blur(6px)" }}>
            <span style={{ fontSize: ".55rem", letterSpacing: ".2em", color: C.dust, textTransform: "uppercase" }}>Bild austauschen</span>
          </div>}
        </>
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.4rem", background: hov ? "rgba(184,114,74,.09)" : "transparent", transition: "background .3s" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${hov ? C.clay : C.dust}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: ".8rem", transition: "border-color .3s" }}>
            <span style={{ fontSize: "1.1rem", color: hov ? C.clay : C.dust, lineHeight: 1 }}>＋</span>
          </div>
          <div style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: hov ? C.clay : C.mossMid, marginBottom: ".5rem", textAlign: "center", fontFamily: "'DM Sans',sans-serif" }}>{label}</div>
          <div style={{ fontSize: ".68rem", color: "#8A7A6A", lineHeight: 1.55, textAlign: "center", maxWidth: 200, fontFamily: "'DM Sans',sans-serif" }}>{desc}</div>
          <div style={{ marginTop: ".8rem", fontSize: ".57rem", letterSpacing: ".15em", color: C.dust, textTransform: "uppercase", fontFamily: "'DM Mono',monospace" }}>Bild hochladen</div>
        </div>
      )}
    </div>
  );
}

function Label({ n, text, light = false }) {
  return (
    <div style={{ fontSize: ".62rem", letterSpacing: ".3em", textTransform: "uppercase", color: light ? C.dust : C.clay, marginBottom: "2.2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
      {n} — {text}<span style={{ display: "block", width: "3rem", height: "1px", background: light ? C.dust : C.clay, opacity: .5 }} />
    </div>
  );
}
function H2({ children, light = false, size = "clamp(2rem,3.2vw,3.6rem)" }) {
  return <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: size, lineHeight: 1.06, marginBottom: "1.1rem", color: light ? C.cream : C.moss }}>{children}</h2>;
}
function Lead({ children, light = false }) {
  return <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.1rem,1.7vw,1.6rem)", fontWeight: 300, lineHeight: 1.5, color: light ? C.stone : C.moss, marginBottom: "1.6rem" }}>{children}</p>;
}
function Tag({ children }) {
  return <span style={{ display: "inline-block", alignSelf: "flex-start", width: "max-content", maxWidth: "100%", fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", background: C.clay, color: C.white, padding: ".28rem .7rem", borderRadius: "2px", marginBottom: "1.4rem" }}>{children}</span>;
}
function Note({ children }) {
  return <div style={{ background: "rgba(184,114,74,.08)", borderLeft: `3px solid ${C.clay}`, padding: "1.3rem 1.8rem", margin: "1.8rem 0", fontSize: ".82rem", lineHeight: 1.7, color: "#4A3828" }}>{children}</div>;
}
function Btn({ children, onClick, variant = "solid", light = false }) {
  const [hov, setHov] = useState(false);
  const v = {
    solid: { background: hov ? C.clayDeep : C.clay, color: C.white, border: "none" },
    outline: { background: hov ? (light ? "rgba(255,255,255,.08)" : "rgba(184,114,74,.07)") : "transparent", color: light ? C.cream : C.clay, border: `1.5px solid ${light ? C.dust : C.clay}` },
  };
  return (
    <button style={{ ...v[variant], padding: ".82rem 2rem", fontSize: ".67rem", letterSpacing: ".22em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", transition: "all .22s", whiteSpace: "nowrap" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}>{children}</button>
  );
}
function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.stone}` }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer", padding: "1.3rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: C.moss, lineHeight: 1.3 }}>{q}</span>
        <span style={{ color: C.clay, fontSize: "1rem", flexShrink: 0, transition: "transform .3s", transform: open ? "rotate(45deg)" : "none" }}>{open ? "×" : "+"}</span>
      </div>
      <div style={{ maxHeight: open ? "500px" : "0", overflow: "hidden", transition: "max-height .5s ease" }}>
        <p style={{ paddingBottom: "1.3rem", fontSize: ".87rem", color: "#5A5040", lineHeight: 1.85, paddingRight: "1.5rem" }}>{a}</p>
      </div>
    </div>
  );
}
function Badge({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <span onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-block", border: `1px solid ${hov ? C.clay : C.stone}`, borderRadius: "20px", padding: ".38rem 1rem", fontSize: ".77rem", color: hov ? C.clay : C.moss, margin: ".28rem", background: hov ? C.cream : C.white, transition: "all .2s" }}>
      {children}
    </span>
  );
}

/* ─── BREATHING CIRCLE – Subdued Glow ───── */
function BreathingCircle({ size = 400 }) {
  const rings = [
    { pct: "0%",  strokeColor: C.dust,  strokeW: "1.5px", opacity: 0.5,  delay: "0s" },
    { pct: "14%", strokeColor: C.dust,  strokeW: "1px",   opacity: 0.32, delay: "1.6s" },
    { pct: "30%", strokeColor: C.clay,  strokeW: "1px",   opacity: 0.4,  delay: "3.2s" },
  ];
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0, pointerEvents: "none" }}>
      {/* Subdued ambient glow */}
      <div style={{
        position: "absolute",
        inset: "20%",
        borderRadius: "50%",
        background: `radial-gradient(ellipse at 50% 50%, rgba(184,114,74,.05) 0%, rgba(196,148,58,.02) 40%, transparent 65%)`,
        animation: `breathe 8s ease-in-out infinite 0.7s`
      }} />
      {rings.map((r, i) => (
        <div key={i} style={{
          position: "absolute",
          inset: r.pct,
          borderRadius: "50%",
          border: `${r.strokeW} solid ${r.strokeColor}`,
          opacity: r.opacity,
          animation: `breathe 8s ease-in-out infinite ${r.delay}`
        }} />
      ))}
    </div>
  );
}

/* ─── SERVICE CARD ───────────────────────────────── */
function SvcCard({ icon, title, desc, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "2.6rem 2rem",
        background: hov ? C.white : C.cream,
        cursor: "pointer",
        transition: "background .3s",
        boxShadow: hov ? `inset 3px 0 0 ${C.clay}` : "inset 3px 0 0 transparent",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
      <div style={{ fontSize: "1.2rem", marginBottom: ".9rem", color: hov ? C.clay : C.mossMid, transition: "color .3s" }}>{icon}</div>
      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 400, color: C.moss, marginBottom: ".6rem" }}>{title}</h3>
      <p style={{ fontSize: ".81rem", lineHeight: 1.75, color: "#5A5040", margin: 0, flexGrow: 1 }}>{desc}</p>
      <div style={{ marginTop: "1.3rem", fontSize: ".58rem", letterSpacing: ".22em", textTransform: "uppercase", color: hov ? C.clay : C.dust, transition: "color .3s" }}>Mehr erfahren →</div>
    </div>
  );
}

/* ─── OIL CARD (AROMA) ───────────────────────────── */
function OilCard({ name, lat, anw, kind }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "2.8rem 2.5rem",
        background: hov ? C.white : "transparent",
        transition: "background .3s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", color: C.moss, marginBottom: ".3rem" }}>{name}</div>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", color: C.clay, marginBottom: "1.2rem", fontStyle: "italic" }}>{lat}</div>
      <p style={{ fontSize: ".85rem", color: "#5A5040", margin: "0 0 1.2rem", lineHeight: 1.6, flexGrow: 1 }}>{anw}</p>
      <div style={{ fontSize: ".65rem", color: kind.includes("⚠") ? C.clayDeep : C.mossMid }}>{kind}</div>
    </div>
  );
}

/* ═══════════════ HOME PAGE ═══════════════════════ */
function HomePage({ nav }) {
  useEffect(() => { document.title = "GSUNDHEITSWERKSTATT – Craniosacral Therapie Mattersburg | Marion Sailer-Riegler"; }, []);

  const services = [
    { icon: "◉", title: "Craniosakrale Energetik", desc: "Sanfte Arbeit am craniosakralen System – spezialisiert auf Neugeborene, Säuglinge und Kleinkinder. Bei Koliken, Schlafproblemen, Stillschwierigkeiten und nach schwierigen Geburten.", id: "cranio" },
    { icon: "⊹", title: "TCM Ernährungsberatung", desc: "Traditionelle Chinesische Medizin für Babys, Kleinkinder und Mütter. Beikost-Einführung, saisonale Ernährung, Unterstützung bei Verdauungsproblemen.", id: "tcm" },
    { icon: "⌇", title: "Tuina & Massagetechniken", desc: "Sanfte Tuina-Massage und therapeutisches Schröpfen für Kinder und Erwachsene. Stärkt das Immunsystem, löst Spannungen, fördert den Energiefluss.", id: "tuina" },
    { icon: "⊙", title: "Schmerzbehandlung G-Well", desc: "Elektrisch-neurologische Schmerztherapie ohne Nadeln. Wirksam bei chronischen Schmerzen, Verspannungen und Narbenentstörung nach Kaiserschnitt.", id: "schmerz" },
    { icon: "✿", title: "Aromatherapie", desc: "Heilsame ätherische Öle in Bio-Qualität für das gesamte Familiensystem. Bei Unruhe, Schlafproblemen und emotionalen Belastungen.", id: "aroma" },
    { icon: "◌", title: "Babymassage & Kindermassage", desc: "Ausgebildete Kursleitung. Eltern lernen heilsame Griffe, die sie täglich zu Hause anwenden können — stärkt Bindung und Wohlbefinden.", id: "uebermich" },
  ];

  return (
    <>
      {/* HERO */}
      <section style={{ background: C.moss, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 65% 45%, rgba(184,114,74,.2) 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div className="wk-hero-grid" style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(4rem,8vw,7rem) clamp(1.4rem,5vw,5rem) clamp(3.5rem,6vw,5.5rem)" }}>
            <div style={{ fontSize: ".62rem", letterSpacing: ".35em", textTransform: "uppercase", color: C.dust, marginBottom: "2rem", display: "flex", alignItems: "center", gap: ".8rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: C.dust, opacity: .6 }} />
              Mattersburg · Burgenland · Österreich
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, lineHeight: 1.0, color: C.cream, marginBottom: "2rem", fontSize: "clamp(2.5rem,5.5vw,6.8rem)" }}>
              Dein Kind darf sich<br />
              <em style={{ color: C.clay, fontStyle: "italic" }}>wohlfühlen</em><br />
              <span style={{ fontSize: "clamp(2rem,3.8vw,4.6rem)", color: C.stone, fontStyle: "italic" }}>— und du auch.</span>
            </h1>
            <p style={{ fontSize: ".9rem", color: C.stone, lineHeight: 1.9, maxWidth: "400px", marginBottom: "2.8rem" }}>
              Spezialisierte Craniosacral Therapie für Säuglinge und Kleinkinder. Marion Sailer-Riegler, DGKP — Mattersburg.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Btn light variant="solid" onClick={() => window.open("tel:+436503631969")}>Termin anfragen</Btn>
              <Btn light variant="outline" onClick={() => nav("cranio")}>Zur Cranio Therapie</Btn>
            </div>
          </div>

          {/* RIGHT – breathing circles */}
          <div className="wk-hero-right" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(200,169,154,.15) 0%, transparent 65%)`, pointerEvents: "none" }} />
            <BreathingCircle size={400} />
            <div style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", fontFamily: "'DM Mono',monospace", fontSize: ".57rem", color: C.mossMid, letterSpacing: ".1em", textAlign: "right", lineHeight: 2.2 }}>
              CST · TCM · Tuina · G-Well · Aroma<br />
              J.N. Berger-Str. 19 · 7210 Mattersburg
            </div>
          </div>
        </div>
      </section>

      {/* 01 PHILOSOPHIE */}
      <section className="wk-section" style={{ background: C.white }}>
        <div className="wk-inner wk-2col" style={{ alignItems: "center" }}>
          <Reveal>
            <Label n="01" text="Philosophie" />
            <H2 size="clamp(2.2rem,3.8vw,4rem)">"Der erste Atem zählt."</H2>
            <p style={{ fontSize: ".93rem", lineHeight: 1.95, color: "#5A5040", marginBottom: "1.2rem" }}>
              Jedes Kind kommt mit einer Geschichte auf die Welt — dem Weg durch den Geburtskanal, dem ersten Atemzug, den ersten Stunden. Manche dieser Geschichten hinterlassen Spuren: Verspannungen, Unruhe, Schlafprobleme, Trinkschwierigkeiten.
            </p>
            <p style={{ fontSize: ".93rem", lineHeight: 1.95, color: "#5A5040", marginBottom: "2rem" }}>
              <strong style={{ color: C.clay }}>Gsundheitswerkstatt</strong> steht für das Wissen, dass ein Kind, das sich in seinem Körper wohlfühlt, tiefer Wurzeln schlägt — sicherer bondet, besser schläft, freier wächst.
            </p>
            <Btn onClick={() => nav("uebermich")}>Mehr über mich</Btn>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ position: "relative", maxWidth: "420px", margin: "0 auto" }}>
              <ImageSlot label="Portrait Marion Sailer-Riegler" desc="Natürliches Portrait. Kein weißer Kittel. Direkter Blickkontakt. Warmes Seitenlicht. Authentisch, keine Business-Pose." aspect="4/5" />
              <div style={{ position: "absolute", bottom: "-1.4rem", right: "-1.4rem", background: C.cream, border: `1px solid ${C.stone}`, padding: "1.3rem 1.8rem", maxWidth: "210px" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".63rem", color: C.clay, marginBottom: ".4rem" }}>27 Jahre</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: ".95rem", color: C.moss, lineHeight: 1.35 }}>Erfahrung mit Kindern & Familien</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 LEISTUNGEN */}
      <section className="wk-section-s" style={{ background: C.cream }}>
        <div className="wk-inner">
          <Reveal><Label n="02" text="Leistungen" /><H2>Was ich für dich und dein Kind tue.</H2></Reveal>
          
          <div className="wk-grid-multi" style={{ marginTop: "3rem" }}>
            {services.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                <SvcCard {...s} onClick={() => nav(s.id)} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 03 SYMPTOM NAVIGATOR */}
      <section className="wk-section" style={{ background: C.moss, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "480px", height: "480px", borderRadius: "50%", border: `1px solid rgba(196,148,58,.12)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <Label n="03" text="Wann kommen Familien zu mir" light />
            <H2 light size="clamp(1.9rem,3.2vw,3.6rem)">Dein Kind zeigt, was es braucht.<br /><em style={{ color: C.clay }}>Ich übersetze.</em></H2>
            <p style={{ color: C.stone, marginBottom: "2.5rem", fontSize: ".9rem", lineHeight: 1.85 }}>Viele Eltern kommen zu mir, wenn sie nicht mehr weiterwissen. Wenn das Baby einfach nicht schläft, schreit, sich nicht satt trinkt. Du bist nicht allein damit.</p>
            <div style={{ marginBottom: "3rem", lineHeight: 2.8 }}>
              {["Mein Baby schläft nicht", "Dreimonatskoliken", "Stillschwierigkeiten", "Nach Kaiserschnitt", "Nach Saugglocke / Zange", "Schiefhals / Schiefer Kopf", "Schreikindsyndrom", "Schlechtes Trinken", "Nach schwieriger Geburt", "Entwicklungsverzögerung", "Rückenschmerzen (Eltern)", "Chronische Verspannungen"].map(s => <Badge key={s}>{s}</Badge>)}
            </div>
            <Btn light variant="solid" onClick={() => window.open("tel:+436503631969")}>Jetzt Termin anfragen</Btn>
          </Reveal>
        </div>
      </section>

      {/* QUOTE + IMAGE */}
      <section className="wk-split">
        <div style={{ background: C.cream, display: "flex", alignItems: "center", padding: "clamp(2.5rem,5vw,5rem)" }}>
          <Reveal>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.4rem,2.5vw,2.8rem)", fontWeight: 300, lineHeight: 1.35, color: C.moss, fontStyle: "italic", marginBottom: "1.8rem" }}>
              "In jedem Körper steckt die Kraft zur Selbstheilung. Meine Aufgabe ist es, diesen Weg freizumachen."
            </div>
            <div style={{ fontSize: ".62rem", letterSpacing: ".25em", textTransform: "uppercase", color: C.clay, marginBottom: "1.8rem" }}>Marion Sailer-Riegler · DGKP · Mattersburg</div>
            <Btn onClick={() => nav("uebermich")} variant="outline">Mehr über mich</Btn>
          </Reveal>
        </div>
        <div style={{ position: "relative", minHeight: "380px" }}>
          <ImageSlot label="Behandlungsmoment" desc="Therapeutin bei der Arbeit mit einem Säugling. Warmes Seitenlicht. Weiches Leinen. Kein Klinikgefühl." fill />
        </div>
      </section>

      {/* ─── KONTAKT STRIP – Editorial Redesign ─── */}
      <section className="wk-section" style={{ background: C.cream, borderTop: `1px solid ${C.stone}` }}>
        <div className="wk-inner wk-2col" style={{ alignItems: "center" }}>
          <Reveal>
            <Label n="04" text="Kontakt" />
            <H2 size="clamp(2.5rem,4vw,4rem)">Bereit für den<br/><em style={{ color: C.clay, fontStyle: "italic" }}>ersten Schritt?</em></H2>
            <p style={{ fontSize: ".95rem", color: "#5A5040", lineHeight: 1.85, maxWidth: "420px", marginBottom: "2.5rem" }}>
              Ich beantworte gerne deine Fragen — telefonisch oder per WhatsApp. Kein Formular, kein langer Weg. Nur ein echtes Gespräch von Mutter zu Mutter oder Fachfrau zu Fachfrau.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Btn variant="solid" onClick={() => window.open("tel:+436503631969")}>Jetzt anrufen</Btn>
              <Btn variant="outline" onClick={() => window.open("https://wa.me/436503631969")}>WhatsApp</Btn>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ border: `1px solid ${C.stone}`, background: C.white }}>
              {[
                { label: "Telefon", main: "+43 650 363 19 69", sub: "Direktkontakt — kein Sekretariat", isMono: true },
                { label: "Praxis", main: "J.N. Berger-Str. 19", sub: "7210 Mattersburg · Burgenland", isMono: false },
                { label: "Ordination", main: "Mo–Fr nach Vereinbarung", sub: "Auch kurzfristige Termine möglich", isMono: false }
              ].map((item, i) => (
                <div key={i} style={{ padding: "2rem 2.5rem", borderBottom: i < 2 ? `1px solid ${C.stone}` : "none" }}>
                  <div style={{ fontSize: ".6rem", letterSpacing: ".25em", textTransform: "uppercase", color: C.clay, marginBottom: ".6rem" }}>{item.label}</div>
                  <div style={{ 
                    fontFamily: item.isMono ? "'DM Mono',monospace" : "'Cormorant Garamond',serif", 
                    fontSize: item.isMono ? "1.1rem" : "1.6rem", 
                    color: C.moss, 
                    marginBottom: ".3rem",
                    lineHeight: 1.2
                  }}>
                    {item.main}
                  </div>
                  <div style={{ fontSize: ".8rem", color: "#5A5040" }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ═══════════════ CRANIO PAGE ═════════════════════ */
function CranioPage({ nav }) {
  useEffect(() => { document.title = "Craniosakrale Energetik für Babys & Neugeborene | Gsundheitswerkstatt Mattersburg"; }, []);
  const faqs = [
    { q: "Ist das wirklich sicher für mein Neugeborenes?", a: "Ja. Die craniosacrale Therapie arbeitet mit einem Berührungsdruck von weniger als fünf Gramm — kaum mehr als das Gewicht einer Münze. Neugeborene reagieren besonders feinfühlig auf diese Berührungsqualität. In über 27 Jahren klinischer Erfahrung ist Marion Sailer-Riegler auf diese Zartheit spezialisiert." },
    { q: "Mein Kind ist erst 3 Wochen alt. Ist es schon zu früh?", a: "Nein – im Gegenteil. Je früher Spannungen aus der Geburt gelöst werden können, desto leichter fällt der Start ins Leben. Viele Familien kommen bereits in der zweiten Lebenswoche." },
    { q: "Was wenn mein Kind weint während der Behandlung?", a: "Weinen ist Kommunikation — kein Zeichen, dass etwas falsch läuft. Oft ist es das Gegenteil: der Körper lässt etwas los. Ich behandle immer im Dialog mit dem Kind, folge seinen Signalen und pausiere wann immer nötig." },
    { q: "Mein Kinderarzt ist skeptisch. Was soll ich ihm sagen?", a: "Skepsis ist berechtigt — die craniosacrale Therapie ist keine anerkannte Schulmedizin. Was ich biete, ist eine sanfte, ergänzende Unterstützung. Viele Eltern berichten von Verbesserungen bei Unruhe, Schlaf und Trinken. Die Entscheidung liegt immer bei Ihnen und Ihrem Arzt." },
    { q: "Wie viele Sitzungen braucht mein Kind?", a: "Das ist individuell. Manche Familien berichten schon nach 2–3 Sitzungen von Veränderungen. Ich kommuniziere ehrlich über realistische Erwartungen — keine Versprechen, keine unnötigen Folgesitzungen." },
  ];
  return (
    <>
      <section style={{ background: C.moss, paddingTop: "70px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "42%", zIndex: 0 }}>
          <ImageSlot label="Cranio Hero" desc="Sanfte Berührung am Kopf eines Neugeborenen. Warmes Licht von rechts. Hände liegen, drücken nicht. Stimmung: Stille, Geborgenheit." fill />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,#374732 0%,rgba(55,71,50,.2) 100%)", pointerEvents: "none" }} />
        </div>
        <div style={{ maxWidth: "620px", position: "relative", zIndex: 2, padding: "clamp(5rem,9vw,9rem) clamp(1.4rem,5vw,5rem) 5rem" }}>
          <Tag>Spezialisiert auf Neugeborene & Säuglinge</Tag>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,5.8rem)", fontWeight: 300, lineHeight: 1.0, color: C.cream, marginBottom: "1.4rem" }}>
            Craniosakrale<br /><em style={{ color: C.clay, fontStyle: "italic" }}>Energetik</em>
          </h1>
          <Lead light>Ich höre zu, wo Worte noch fehlen.</Lead>
          <p style={{ color: C.stone, fontSize: ".9rem", lineHeight: 1.85, marginBottom: "2.5rem", maxWidth: "460px" }}>
            Aus 27 Jahren Erfahrung in Unfall-OP und Kinderstation: eine ganzheitliche, ergänzende Therapieform für Säuglinge, Kleinkinder und deren Familien.
          </p>
          <Btn light variant="solid" onClick={() => window.open("tel:+436503631969")}>Termin anfragen</Btn>
        </div>
      </section>
      <section className="wk-section"><div className="wk-inner wk-2col">
        <Reveal>
          <Label n="01" text="Du machst nichts falsch." />
          <H2>Die ersten Wochen — magisch und erschöpfend zugleich.</H2>
          <p style={{ fontSize: ".92rem", lineHeight: 1.9, color: "#5A5040", marginBottom: "1.2rem" }}>Wenn das Baby viel weint, schlecht schläft, beim Trinken unruhig ist oder sich stark überstreckt, wächst die Sorge schnell: "Mache ich etwas falsch? Hat mein Kind Schmerzen?"</p>
          <p style={{ fontSize: ".92rem", lineHeight: 1.9, color: "#5A5040", marginBottom: "1.2rem" }}>Du machst nichts falsch. Manchmal hinterlässt der Weg ins Leben — eine rasante Geburt, ein Kaiserschnitt, der Einsatz einer Saugglocke — Spannungen im winzigen Körper.</p>
          <div style={{ padding: "1.5rem 2rem", background: C.cream, borderLeft: `3px solid ${C.clay}`, marginTop: "1rem" }}>
            <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", color: C.moss, marginBottom: ".5rem" }}>Sicherer Hafen für Mütter</h4>
            <p style={{ fontSize: ".82rem", color: "#5A5040", lineHeight: 1.75, margin: 0 }}>In meiner Praxis herrscht kein Zeitdruck. Wenn gestillt, gewickelt oder gekuschelt werden muss, machen wir Pause.</p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <ImageSlot label="Behandlungsdetail" desc="Hände der Therapeutin auf Rücken oder Becken eines Säuglings, Leinenunterlage." aspect="4/3" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            {[{ v: "< 5g", l: "Berührungsdruck" }, { v: "45–60", l: "Min. pro Sitzung" }, { v: "2–4", l: "Sitzungen oft ausreichend" }, { v: "ab Wo. 1", l: "Frühestmöglicher Start" }].map(s => (
              <div key={s.v} style={{ padding: "1.3rem 1.2rem", border: `1px solid ${C.stone}`, background: C.cream, textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 300, color: C.clay, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: ".62rem", letterSpacing: ".13em", textTransform: "uppercase", color: C.mossMid, marginTop: ".3rem" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div></section>
      
      <section className="wk-section-s" style={{ background: C.cream }}><div className="wk-inner">
        <Reveal><Label n="02" text="Wann kommen Familien zu mir" /><H2>Was Eltern häufig berichten.</H2>
          <p style={{ fontSize: ".88rem", color: "#5A5040", lineHeight: 1.85, maxWidth: "620px", marginBottom: "2rem" }}>Die craniosacrale Therapie ist eine ergänzende Methode — kein Ersatz für ärztliche Diagnosen.</p>
        </Reveal>
        
        {/* Responsive single grid */}
        <div className="wk-grid-single">
          {[
            { g: "Neugeborene & Säuglinge", items: ["Nach Kaiserschnitt", "Nach Saugglocke oder Zange", "Asymmetrischer Kopf / Schiefhals", "Stillschwierigkeiten & Saugprobleme", "Überstrecken des Körpers", "Anhaltende Unruhe & Schreien", "Schlafprobleme", "Verdauungsbeschwerden"] },
            { g: "Kleinkinder", items: ["Auffälligkeiten in der Entwicklung", "Koordinationsprobleme", "Nach Stürzen oder Verletzungen", "Zahnungsprobleme", "Häufige Infekte", "Schlafprobleme", "Innere Unruhe / Reizbarkeit"] },
            { g: "Mütter & Erwachsene", items: ["Erschöpfung nach der Geburt", "Rücken- und Beckenbeschwerden", "Chronische Kopfschmerzen", "Kiefergelenks-Beschwerden", "Nackenverspannungen", "Stress & innere Unruhe"] },
          ].map((g, i) => (
            <Reveal key={g.g} delay={i * 0.12} style={{ height: "100%" }}>
              <div style={{ padding: "2.3rem 1.8rem", height: "100%" }}>
                <div style={{ fontSize: ".6rem", letterSpacing: ".25em", textTransform: "uppercase", color: C.clay, marginBottom: "1.3rem" }}>{g.g}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {g.items.map(it => (
                    <li key={it} style={{ fontSize: ".84rem", color: "#5A5040", padding: ".4rem 0", borderBottom: `1px solid ${C.stone}`, lineHeight: 1.5 }}>
                      <span style={{ color: C.clay, marginRight: ".5rem" }}>◉</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div></section>
      
      <div className="wk-split">
        <div style={{ position: "relative", minHeight: "380px" }}>
          <ImageSlot label="Mutter-Kind Moment" desc="Entspannte Mutter hält ruhiges Baby nach der Behandlung. Echte Erleichterung." fill />
        </div>
        <div style={{ background: C.moss, display: "flex", alignItems: "center", padding: "clamp(2.5rem,5vw,5rem)" }}>
          <Reveal><Label n="03" text="Deine Fragen" light /><H2 light>Ehrliche Antworten.</H2></Reveal>
        </div>
      </div>
      <section className="wk-section-s" style={{ maxWidth: "900px", margin: "0 auto" }}>
        {faqs.map((f, i) => <Faq key={i} {...f} />)}
      </section>
      <section className="wk-section-s" style={{ background: C.moss }}><div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <Reveal>
          <Label n="04" text="Preise" light /><H2 light>Transparente Honorare</H2>
          <div style={{ border: `1px solid rgba(224,213,196,.2)`, marginTop: "2rem" }}>
            {[["Erstbehandlung Säugling (60 min)", "€ 75,–"], ["Folgebehandlung (45 min)", "€ 60,–"], ["Erstbehandlung Kleinkind / Erwachsener", "€ 80,–"], ["CST + Tuina kombiniert", "€ 85,–"]].map(([l, p], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center", padding: "1.1rem 1.8rem", borderBottom: "1px solid rgba(224,213,196,.15)", background: i % 2 === 0 ? "rgba(255,255,255,.03)" : "transparent" }}>
                <span style={{ fontSize: ".87rem", color: C.stone }}>{l}</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".84rem", color: C.clay }}>{p}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: ".73rem", color: C.mossMid, marginTop: "1rem", lineHeight: 1.7 }}>Barzahlung oder Honorarnote für private Zusatzversicherungen.</p>
        </Reveal>
      </div></section>
    </>
  );
}

/* ═══════════════ TCM PAGE ════════════════════════ */
function TCMPage() {
  useEffect(() => { document.title = "TCM Ernährungsberatung | Gsundheitswerkstatt Mattersburg"; }, []);
  return (
    <>
      <section style={{ background: C.moss }}>
        <div className="wk-tcm-hero">
          <div>
            <Tag>Akademische Expertin · Donau Universität Krems</Tag>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4.5vw,5.5rem)", fontWeight: 300, lineHeight: 1.0, color: C.cream, marginBottom: "1.4rem" }}>
              Nahrung als<br /><em style={{ color: C.clay }}>Medizin.</em>
            </h1>
            <Lead light>Die Energie der Mitte stärken.</Lead>
            <p style={{ color: C.stone, fontSize: ".9rem", lineHeight: 1.85, maxWidth: "480px" }}>Nach den Prinzipien der TCM kostet die Geburt viel Qi und Blut. Eine angepasste Ernährung hilft Müttern, wieder in ihre Kraft zu kommen — und dem Kind, eine starke Verdauungsmitte aufzubauen.</p>
          </div>
          <ImageSlot label="TCM Kräuter & Gewürze" desc="Wärmende Kräuter, Ingwer, Kardamom, kleine Schälchen auf Holz. Warm beleuchtet. Erdfarben." aspect="4/5" />
        </div>
      </section>
      <section className="wk-section"><div className="wk-inner wk-2col">
        <Reveal>
          <Label n="01" text="Fokus: Mutter" />
          <H2>Wiederaufbau nach der Geburt</H2>
          <p style={{ fontSize: ".9rem", lineHeight: 1.9, color: "#5A5040", marginBottom: "1.2rem" }}>Mit einfachen, alltagstauglichen Rezepten — wärmende Kraftsuppen, spezielle Porridges — füllen wir deine Speicher auf, unterstützen den Milchfluss und helfen dem Körper, das Erschöpfungs-Plateau nach der Geburt zu überwinden.</p>
          <Note><strong>Wann sinnvoll?</strong> Bei dauerhafter Erschöpfung trotz Schlaf, schwachem Milchfluss, oder wenn Sie das Wochenbett aktiv zur Erholung nutzen möchten.</Note>
        </Reveal>
        <Reveal delay={0.2}>
          <Label n="02" text="Fokus: Kind" />
          <H2>Beikost & Verdauung</H2>
          {[
            { t: "Beikost nach TCM", d: "Wann, was und wie — orientiert an Jahreszeiten und Verdauungstyp des Kindes." },
            { t: "Saisonale Ernährung", d: "Von Frühling bis Winter: jede Jahreszeit fordert andere Schwerpunkte." },
            { t: "Verdauungsprobleme", d: "Qi-stärkende Lebensmittel, wärmende Gewürze, sanfte Unterstützung." },
            { t: "Immunsystem", d: "Wei-Qi (Abwehr-Qi): wie Ernährung die kindliche Infektanfälligkeit beeinflussen kann." },
          ].map((s, i) => (
            <div key={i} style={{ padding: "1rem 0", borderBottom: `1px solid ${C.stone}` }}>
              <div style={{ fontSize: ".68rem", letterSpacing: ".15em", textTransform: "uppercase", color: C.clay, marginBottom: ".25rem" }}>{s.t}</div>
              <p style={{ fontSize: ".82rem", color: "#5A5040", margin: 0, lineHeight: 1.75 }}>{s.d}</p>
            </div>
          ))}
        </Reveal>
      </div></section>
    </>
  );
}

/* ═══════════════ TUINA PAGE ══════════════════════ */
function TuinaPage() {
  useEffect(() => { document.title = "Kinder-Tuina & Massagetechniken | Gsundheitswerkstatt Mattersburg"; }, []);
  return (
    <>
      <section style={{ background: C.moss, padding: "clamp(6rem,10vw,9rem) clamp(1.4rem,5vw,5rem) 5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", paddingTop: "40px" }}>
          <Tag>Ausgebildete Kursleitung · Little Path Neusiedl</Tag>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4.5vw,5.5rem)", fontWeight: 300, lineHeight: 1.0, color: C.cream, marginBottom: "1.4rem" }}>
            Kinder-Tuina &<br /><em style={{ color: C.clay }}>Massagetechniken</em>
          </h1>
          <Lead light>Sanfte chinesische Körpertherapie für Kinder und Erwachsene.</Lead>
          <p style={{ color: C.stone, fontSize: ".9rem", lineHeight: 1.85, maxWidth: "520px" }}>Tuina ist eine der fünf Säulen der TCM. Akupunkturpunkte und Meridiane werden durch sanftes Streichen, Kneten und Reiben stimuliert — schmerzfrei, wohltuend, wirksam.</p>
        </div>
      </section>
      <section className="wk-section"><div className="wk-inner wk-2col">
        <Reveal>
          <Label n="01" text="Kinder-Tuina" />
          <H2>Wenn Berühren unterstützt</H2>
          <p style={{ fontSize: ".9rem", lineHeight: 1.9, color: "#5A5040", marginBottom: "1.2rem" }}>Als ausgebildete Kursleitung gebe ich Eltern konkrete Griffe mit, die sie täglich zu Hause anwenden können — ein echtes Werkzeug für den Alltag, das die Bindung stärkt.</p>
          <div style={{ marginBottom: ".8rem", fontSize: ".6rem", letterSpacing: ".25em", textTransform: "uppercase", color: C.clay }}>Häufige Anwendungen</div>
          <div style={{ marginBottom: "1.5rem" }}>
            {["Koliken & Bauchschmerzen", "Verstopfung", "Häufige Erkältungen", "Schlafstörungen", "Zahnen", "Immununterstützung", "Atemwegsinfekte begleiten"].map(s => (
              <span key={s} style={{ display: "inline-block", border: `1px solid ${C.stone}`, borderRadius: "20px", padding: ".33rem .9rem", fontSize: ".75rem", color: C.moss, margin: ".22rem", background: C.white }}>{s}</span>
            ))}
          </div>
          <Note><strong>Ärztliche Diagnose zuerst.</strong> Kinder-Tuina ist eine ergänzende Methode — kein Ersatz für medizinische Behandlung.</Note>
        </Reveal>
        <Reveal delay={0.2}><ImageSlot label="Tuina Behandlung" desc="Sanfte Massage an einem Kleinkind. Hände der Therapeutin auf Rücken oder Bauch. Warmes Licht. Kind entspannt." aspect="1/1" /></Reveal>
      </div>
      <div className="wk-inner wk-2col" style={{ marginTop: "4rem", paddingTop: "4rem", borderTop: `1px solid ${C.stone}` }}>
        <Reveal><ImageSlot label="Schröpfgläser Detail" desc="Silikon-Schröpfköpfe auf Holzunterlage. Warme Erdtöne. Makro-Nahaufnahme." aspect="4/3" /></Reveal>
        <Reveal delay={0.2}>
          <Label n="02" text="Therapeutisches Schröpfen" />
          <H2>Tiefe Entlastung für Mütter</H2>
          <p style={{ fontSize: ".9rem", lineHeight: 1.9, color: "#5A5040", marginBottom: "1.5rem" }}>Besonders für Mütter, deren Schulter-Nacken-Bereich durch Tragen und Stillen verspannt ist, bietet das sanfte Trocken-Schröpfen spürbare Erleichterung.</p>
          {["Löst tiefe Muskelverspannungen und Faszienverklebungen.", "Fördert die lokale Durchblutung.", "Ergänzt die Tuina-Behandlung wirkungsvoll."].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", padding: ".75rem 0", borderBottom: `1px solid ${C.stone}`, fontSize: ".82rem", color: "#5A5040", lineHeight: 1.7 }}>
              <span style={{ color: C.clay, flexShrink: 0 }}>+</span>{s}
            </div>
          ))}
        </Reveal>
      </div></section>
    </>
  );
}

/* ═══════════════ G-WELL PAGE ═════════════════════ */
function SchmerzPage() {
  useEffect(() => { document.title = "Schmerzbehandlung G-Well Pointer | Gsundheitswerkstatt Mattersburg"; }, []);
  return (
    <>
      <section style={{ background: C.moss, padding: "clamp(6rem,10vw,9rem) clamp(1.4rem,5vw,5rem) 5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", paddingTop: "40px" }}>
          <Tag>Elektrisch-neurologische Schmerztherapie</Tag>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4.5vw,5.5rem)", fontWeight: 300, lineHeight: 1.0, color: C.cream, marginBottom: "1.4rem" }}>
            Moderne Impulse.<br /><em style={{ color: C.clay }}>Ohne Nadeln.</em>
          </h1>
          <Lead light>Präzise Punktstimulation bei akuten und chronischen Beschwerden.</Lead>
        </div>
      </section>
      <section className="wk-section"><div className="wk-inner wk-2col">
        <Reveal>
          <Label n="01" text="Was ist der G-Well Pointer" />
          <H2>Akupunkturpunkte — ohne Einstich</H2>
          <p style={{ fontSize: ".9rem", lineHeight: 1.9, color: "#5A5040", marginBottom: "1.5rem" }}>Der G-Well Pointer lokalisiert Akupunkturpunkte und Triggerpunkte durch Messung des Hautwiderstands und stimuliert sie mit sanften mikroelektrischen Impulsen — vollständig schmerzfrei.</p>
          {[{ n: "01", t: "Absolut schmerzfrei", d: "Ideal für alle, die Angst vor Nadeln haben." }, { n: "02", t: "Narbenentstörung nach Kaiserschnitt", d: "Besonders wirksam bei Narbengewebe — relevant für Mütter nach Kaiserschnitt." }, { n: "03", t: "Direkte Entspannung", d: "Wirkung bei stark verspanntem Nacken- und Schulterbereich." }].map(s => (
            <div key={s.n} style={{ padding: "1.1rem 1.4rem", background: C.cream, borderLeft: `3px solid ${C.clay}`, marginBottom: ".8rem" }}>
              <div style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.clay, marginBottom: ".2rem" }}>Vorteil {s.n}</div>
              <div style={{ fontSize: ".83rem", fontWeight: 500, color: C.moss, marginBottom: ".2rem" }}>{s.t}</div>
              <p style={{ fontSize: ".78rem", color: "#5A5040", margin: 0, lineHeight: 1.7 }}>{s.d}</p>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.2}><ImageSlot label="G-Well Pointer" desc="G-Well Pointer Gerät in der Hand der Therapeutin. Warmer Hintergrund. Präzision und Sicherheit." aspect="4/5" /></Reveal>
      </div></section>
    </>
  );
}

/* ═══════════════ AROMA PAGE ══════════════════════ */
function AromaPage() {
  useEffect(() => { document.title = "Aromatherapie für Familien & Babys | Gsundheitswerkstatt Mattersburg"; }, []);
  const oils = [
    { name: "Lavendel", lat: "Lavandula angustifolia", anw: "Schlaf, Beruhigung, Wunden", kind: "✓ ab 3. Monat" },
    { name: "Kamille blau", lat: "Matricaria recutita", anw: "Entzündungen, Zahnen, Haut", kind: "✓ ab 3. Monat" },
    { name: "Mandarine", lat: "Citrus reticulata", anw: "Stimmungsaufhellung, Verdauung", kind: "✓ ab 3. Monat" },
    { name: "Frankincense", lat: "Boswellia sacra", anw: "Atemwege, Immunsystem, Tiefe", kind: "✓ ab 6. Monat" },
    { name: "Eukalyptus", lat: "Eucalyptus radiata", anw: "Erkältung, Atemwege", kind: "⚠ erst ab 3 Jahren" },
    { name: "Rose", lat: "Rosa damascena", anw: "Emotionale Balance, Mama-Pflege", kind: "✓ für Mütter" },
  ];
  return (
    <>
      <section style={{ background: C.moss }}>
        <div className="wk-aroma-hero">
          <div>
            <Tag>Ausnahmslos naturreine Öle · Bio-Qualität</Tag>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.5rem,4.5vw,5.5rem)", fontWeight: 300, lineHeight: 1.0, color: C.cream, marginBottom: "1.4rem" }}>
              Was der Körper<br />riecht, <em style={{ color: C.clay }}>fühlt er.</em>
            </h1>
            <p style={{ color: C.stone, fontSize: ".9rem", lineHeight: 1.85, maxWidth: "480px" }}>
              Ätherische Öle wirken nicht nur über den Geruchssinn – sie interagieren direkt mit dem limbischen System, dem Zentrum für Emotionen und Gedächtnis, und über die Haut mit dem Organismus. In der Arbeit mit Babys und jungen Familien sind sie ein sanftes, hochwirksames Werkzeug.
            </p>
          </div>
          <ImageSlot label="Ätherische Öle" desc="Hochwertige Öl-Flacons auf Holzunterlage, umgeben von Kräutern. Warme Töne: Bernstein, Glas, Terrakotta." aspect="4/5" />
        </div>
      </section>
      
      <section className="wk-section"><div className="wk-inner wk-2col">
        <Reveal>
          <Label n="01" text="Was ist Aromatherapie" />
          <H2>Mehr als nur Duft</H2>
          <p style={{ fontSize: ".9rem", lineHeight: 1.9, color: "#5A5040", marginBottom: "1rem" }}>
            Therapeutische Aromatherapie unterscheidet sich grundlegend von Raumbeduftung oder Wellness-Düften. Es werden hochwertige, reine ätherische Öle in therapeutischen Konzentrationen eingesetzt – verdünnt in Trägerölen, als Inhalation, in Massagen oder als Kompressen.
          </p>
          <p style={{ fontSize: ".9rem", lineHeight: 1.9, color: "#5A5040", marginBottom: "1rem" }}>
            Für Babys und Kleinkinder ist besondere Vorsicht bei Auswahl und Verdünnung geboten. Marion Sailer-Riegler verfügt über eine fundierte Ausbildung in therapeutischer Aromatherapie und kennt die spezifischen Sicherheitsgrenzen für jede Altersgruppe.
          </p>
          <Note><strong>Nicht alle Öle sind für Babys geeignet.</strong> Eukalyptus, Pfefferminze und viele andere verbreitete Öle sind für Kinder unter 3 Jahren kontraindiziert. Bitte nie ohne Fachberatung anwenden.</Note>
        </Reveal>
        <Reveal delay={0.2}>
          <Label n="02" text="Anwendungsbereiche" />
          <H2>Wann Aromatherapie hilft</H2>
          {[
            { t: "Schlafprobleme", d: "Sanfte Einschlaf-Routinen mit bewährten Ölen für die ganze Familie." },
            { t: "Erkältungsinfekte", d: "Atemwegsunterstützung durch Inhalation und Einreibung – kindgerecht und wirksam." },
            { t: "Emotionale Balance der Mutter", d: "Postpartale Erschöpfung, Stimmungsschwankungen, Stress – Öle als stärkendes Ritual." },
            { t: "Hautpflege & Wundbehandlung", d: "Heilende Wirkung auf Wundheilung, Narben, gereizte Babyhaut." },
            { t: "Zahnen & Verdauungsbeschwerden", d: "Sanfte Bauchmassage mit verdünnten Ölen nach TCM-Punkten." }
          ].map((s, i) => (
            <div key={i} style={{ padding: ".9rem 0", borderBottom: i === 4 ? "none" : `1px solid ${C.stone}` }}>
              <div style={{ fontSize: ".68rem", letterSpacing: ".15em", textTransform: "uppercase", color: C.clay, marginBottom: ".2rem" }}>{s.t}</div>
              <p style={{ fontSize: ".82rem", color: "#5A5040", margin: 0, lineHeight: 1.75 }}>{s.d}</p>
            </div>
          ))}
        </Reveal>
      </div></section>

      <section className="wk-section-s" style={{ background: C.cream }}><div className="wk-inner">
        <Reveal><Label n="03" text="Ausgewählte Öle & Sicherheitsinfo" /><H2>Welche Öle für welches Alter</H2></Reveal>
        
        {/* Die Reveal-Animation sitzt jetzt als sicherer Container um den gesamten Grid, damit hover-Rahmen intakt bleiben */}
        <Reveal>
          <div className="wk-grid-multi" style={{ marginTop: "3rem" }}>
            {oils.map((o, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                <OilCard {...o} />
              </div>
            ))}
          </div>
        </Reveal>
        
      </div></section>
    </>
  );
}

/* ═══════════════ ÜBER MICH PAGE ══════════════════ */
function UeberMichPage() {
  useEffect(() => { document.title = "Über Marion Sailer-Riegler | Gsundheitswerkstatt Mattersburg"; }, []);
  const quals = [
    { t: "DGKP – Diplomierte Gesundheits- und Krankenpflegerin", s: "9 Jahre Unfall-OP-Ambulanz · 10 Jahre Leiterin Kinderstation KH Eisenstadt" },
    { t: "Cranio Sacral Energetikerin", s: "Cranio-Schule Prett · Graz" },
    { t: "Traumalösung bei Kindern", s: "Ausbildung bei Dr. Herrgesell" },
    { t: "Babymassage & Kindermassage", s: "Ausgebildete Kursleitung" },
    { t: "Kinesiotaping", s: "Therapeutisches Taping für Babys, Kinder und Erwachsene" },
    { t: "Tuina & Kinder-Tuina", s: "Little Path Neusiedl" },
    { t: "Intuitions- und Bewusstseinstrainerin", s: "Ausbildung bei Mag. Zinterhof" },
    { t: "TCM Praktikerin – Akademische Expertin", s: "Donau Universität Krems" },
    { t: "Humanenergetikerin & Lebens- und Sozialberaterin", s: "Systemische Elternbegleitung · Paarberatung" },
  ];
  return (
    <>
      <section className="wk-about-hero" style={{ background: C.moss }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(3rem,6vw,6rem) clamp(1.4rem,5vw,5rem) clamp(3rem,5vw,5rem)" }}>
          <Tag>DGKP · Craniosacral Energetikerin<span className="wk-hide-mob"> · TCM Akademische Expertin</span></Tag>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,5.5rem)", fontWeight: 300, lineHeight: 1.0, color: C.cream, marginBottom: "1.4rem" }}>
            Marion<br /><em style={{ color: C.clay }}>Sailer-Riegler</em>
          </h1>
          <Lead light>Verwurzelt im Wissen, geleitet vom Gespür.</Lead>
          <p style={{ color: C.stone, fontSize: ".9rem", lineHeight: 1.85, maxWidth: "440px" }}>Diplomierte Gesundheits- und Krankenpflegerin. 9 Jahre Unfall-OP, 10 Jahre Leiterin Kinderstation KH Eisenstadt. Heute in eigener Praxis in Mattersburg.</p>
        </div>
        <div style={{ position: "relative", minHeight: "420px" }}>
          <ImageSlot label="Portrait Marion Sailer-Riegler" desc="Natürliches Portrait. Kein weißer Kittel. Direkter Blickkontakt. Warmes Seitenlicht. Authentisch." fill />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(55,71,50,.35) 0%,transparent 40%)", pointerEvents: "none" }} />
        </div>
      </section>
      <section className="wk-section"><div className="wk-inner wk-2col">
        <Reveal>
          <Label n="01" text="Mein Weg" />
          <H2>27 Jahre an der Seite von Kindern und Familien.</H2>
          <p style={{ fontSize: ".9rem", lineHeight: 1.9, color: "#5A5040", marginBottom: "1.1rem" }}>Mein Weg zur craniosakralen Therapie begann mit der Faszination für die Weisheit des menschlichen Körpers. Jeder Mensch — vom ersten Atemzug an — trägt die Fähigkeit zur Selbstregulation in sich.</p>
          <p style={{ fontSize: ".9rem", lineHeight: 1.9, color: "#5A5040", marginBottom: "1.1rem" }}>Als ehemalige Leiterin der Kinderstation des Krankenhauses Eisenstadt habe ich Tausende von Kindern begleitet und Familien in den schwierigsten Momenten ihres Lebens gestützt.</p>
          <p style={{ fontSize: ".9rem", lineHeight: 1.9, color: "#5A5040" }}>In meiner Praxis in Mattersburg biete ich einen geschützten Raum — einen Raum, in dem Erschöpfung sein darf, Tränen fließen dürfen und wir gemeinsam die Wurzeln für ein gesundes Wachstum stärken.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <Label n="02" text="Ausbildung & Qualifikationen" />
          <H2>Fundiert. Zertifiziert. Erfahren.</H2>
          {quals.map((q, i) => (
            <div key={i} style={{ padding: ".9rem 0", borderBottom: `1px solid ${C.stone}`, display: "flex", gap: "1rem" }}>
              <span style={{ color: C.clay, flexShrink: 0, paddingTop: ".1rem" }}>◉</span>
              <div>
                <div style={{ fontSize: ".76rem", fontWeight: 500, color: C.moss, marginBottom: ".12rem" }}>{q.t}</div>
                <div style={{ fontSize: ".74rem", color: "#5A5040", lineHeight: 1.6 }}>{q.s}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div></section>
      <section className="wk-section-s" style={{ background: C.moss }}><div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <Reveal>
          <Label n="03" text="Meine Haltung" light />
          <H2 light>Medizinisch fundiert. Menschlich nah.</H2>
          <p style={{ color: C.stone, fontSize: ".9rem", lineHeight: 1.95, marginBottom: "1.3rem" }}>Ich nehme keine Rolle ein, die ich nicht erfüllen kann. Craniosacrale Therapie unterstützt die Selbstheilungskräfte des Körpers.</p>
          <p style={{ color: C.stone, fontSize: ".9rem", lineHeight: 1.95 }}>Ich spreche beide Sprachen: die der erschöpften Eltern um 3 Uhr nachts und die des Kinderarztes und medizinischen Befundes. Meine Aufgabe ist es, diese beiden Welten zu verbinden.</p>
        </Reveal>
      </div></section>
      <div className="wk-split">
        <div style={{ position: "relative", minHeight: "380px" }}>
          <ImageSlot label="Praxisraum Gsundheitswerkstatt" desc="Behandlungsraum: warm, aufgeräumt, einladend. Natürliche Materialien: Holz, Leinen, Ton." fill />
        </div>
        <div style={{ background: C.cream, padding: "clamp(2.5rem,5vw,5rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Reveal>
            <Label n="04" text="Kontakt & Anfahrt" />
            <H2>Praxis Gsundheitswerkstatt</H2>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".8rem", lineHeight: 2.8, color: C.ink, marginBottom: "2rem" }}>
              <div>Marion Sailer-Riegler</div>
              <div>J.N. Berger-Str. 19 · 7210 Mattersburg</div>
              <div>+43 650 363 19 69</div>
              <div style={{ fontSize: ".7rem", color: C.clay }}>Nach Vereinbarung · Mo–Fr</div>
            </div>
            <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
              <Btn onClick={() => window.open("tel:+436503631969")}>Anrufen</Btn>
              <Btn variant="outline" onClick={() => window.open("https://wa.me/436503631969")}>WhatsApp</Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

/* ═══════════════ NAVBAR ══════════════════════════ */
function Navbar({ current, nav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = id => { nav(id); setOpen(false); };
  const items = [
    { id: "cranio", short: "Cranio" }, { id: "tcm", short: "TCM" }, { id: "tuina", short: "Tuina" },
    { id: "schmerz", short: "G-Well" }, { id: "aroma", short: "Aroma" }, { id: "uebermich", short: "Über mich" },
  ];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled || open ? "rgba(253,250,245,.97)" : "rgba(253,250,245,.88)", backdropFilter: "blur(14px)", borderBottom: `1px solid rgba(184,114,74,${scrolled ? .2 : .08})`, transition: "all .3s" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1.2rem,3vw,2.5rem)", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => go("home")} style={{ background: "none", border: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(.85rem,2vw,1rem)", letterSpacing: ".15em", textTransform: "uppercase", color: C.clay, fontWeight: 500 }}>GSUNDHEITSWERKSTATT</button>
        <div className="wk-nav-desk">
          {items.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              style={{ background: "none", border: "none", fontSize: ".62rem", letterSpacing: ".13em", textTransform: "uppercase", color: current === n.id ? C.clay : C.moss, padding: ".5rem .7rem", transition: "color .2s", borderBottom: current === n.id ? `2px solid ${C.clay}` : "2px solid transparent", fontFamily: "'DM Sans',sans-serif", fontWeight: current === n.id ? 500 : 300 }}>
              {n.short}
            </button>
          ))}
          <button onClick={() => window.open("tel:+436503631969")}
            style={{ background: C.clay, color: C.white, border: "none", fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase", padding: ".6rem 1.2rem", marginLeft: ".8rem", transition: "background .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = C.clayDeep}
            onMouseLeave={e => e.currentTarget.style.background = C.clay}>Termin</button>
        </div>
        <button className="wk-nav-mob" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", width: 32, height: 32, flexDirection: "column", justifyContent: "center", gap: "5px", padding: "4px" }}>
          {[0, 1, 2].map(i => <span key={i} style={{ display: "block", height: "1.5px", background: C.moss, transition: "all .25s", opacity: open && i === 1 ? 0 : 1, transform: open ? (i === 0 ? "translateY(6.5px) rotate(45deg)" : i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "none") : "none" }} />)}
        </button>
      </div>
      {open && (
        <div style={{ background: C.white, borderTop: `1px solid ${C.stone}`, padding: "1.5rem 1.4rem 2rem" }}>
          {items.map(n => (
            <button key={n.id} onClick={() => go(n.id)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", fontSize: ".85rem", letterSpacing: ".1em", textTransform: "uppercase", color: current === n.id ? C.clay : C.moss, padding: ".9rem 0", borderBottom: `1px solid ${C.stone}`, fontFamily: "'DM Sans',sans-serif" }}>{n.short}</button>
          ))}
          <button onClick={() => window.open("tel:+436503631969")} style={{ width: "100%", background: C.clay, color: C.white, border: "none", fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", padding: ".9rem", marginTop: "1.2rem", fontFamily: "'DM Sans',sans-serif" }}>Jetzt Termin anfragen</button>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════ FOOTER ══════════════════════════ */
function Footer({ nav }) {
  return (
    <footer style={{ background: C.midnight, padding: "4.5rem clamp(1.4rem,5vw,5rem) 2.5rem" }}>
      <div className="wk-footer-g" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", color: C.cream, marginBottom: "1rem", letterSpacing: ".1em" }}>GSUNDHEITS<span style={{ color: C.clay }}>WERKSTATT</span></div>
          <p style={{ fontSize: ".8rem", lineHeight: 1.85, color: "rgba(224,213,196,.7)", maxWidth: "300px" }}>Spezialisierte Craniosacral Therapie für Säuglinge und Kleinkinder. TCM · Tuina · G-Well · Aromatherapie. Mattersburg, Burgenland.</p>
        </div>
        <div>
          <div style={{ fontSize: ".57rem", letterSpacing: ".28em", textTransform: "uppercase", color: C.clay, marginBottom: "1.3rem" }}>Leistungen</div>
          {[["cranio", "Craniosakrale Energetik"], ["tcm", "TCM Ernährung"], ["tuina", "Tuina & Massagetechniken"], ["schmerz", "G-Well Pointer"], ["aroma", "Aromatherapie"], ["uebermich", "Über mich"]].map(([id, l]) => (
            <button key={id} onClick={() => nav(id)} style={{ display: "block", background: "none", border: "none", fontSize: ".78rem", color: "rgba(224,213,196,.65)", padding: ".3rem 0", fontFamily: "'DM Sans',sans-serif", textAlign: "left", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = C.clay} onMouseLeave={e => e.target.style.color = "rgba(224,213,196,.65)"}>{l}</button>
          ))}
        </div>
        <div>
          <div style={{ fontSize: ".57rem", letterSpacing: ".28em", textTransform: "uppercase", color: C.clay, marginBottom: "1.3rem" }}>Kontakt</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".74rem", lineHeight: 2.5, color: C.dust, marginBottom: "1.5rem" }}>
            <div>+43 650 363 19 69</div>
            <div>J.N. Berger-Str. 19</div>
            <div>7210 Mattersburg</div>
          </div>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            {[["Anrufen", "tel:+436503631969"], ["WhatsApp", "https://wa.me/436503631969"]].map(([l, h]) => (
              <button key={l} onClick={() => window.open(h)} style={{ background: "transparent", border: `1px solid rgba(200,169,154,.3)`, color: C.dust, padding: ".55rem 1.1rem", fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", transition: "border-color .2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.dust} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(200,169,154,.3)"}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: "1200px", margin: "2.5rem auto 0", paddingTop: "1.8rem", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: ".58rem", color: "#444", letterSpacing: ".1em" }}>
        <span>© 2025 Gsundheitswerkstatt · Marion Sailer-Riegler · 7210 Mattersburg · Burgenland</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <span style={{ cursor: "pointer" }}>Impressum</span>
          <span style={{ cursor: "pointer" }}>Datenschutz</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════ APP ROOT ════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => {
    // Inject custom CSS logic dynamically once
    const s = document.createElement("style");
    s.id = "wk-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => { const el = document.getElementById("wk-css"); if (el) el.remove(); };
  }, []);
  const nav = p => { setPage(p); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 30); };
  const pages = {
    home: <HomePage nav={nav} />, cranio: <CranioPage nav={nav} />, tcm: <TCMPage />,
    tuina: <TuinaPage />, schmerz: <SchmerzPage />, aroma: <AromaPage />, uebermich: <UeberMichPage />,
  };
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar current={page} nav={nav} />
      <main>{pages[page] || pages.home}</main>
      <Footer nav={nav} />
    </div>
  );
}
