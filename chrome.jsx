// Axis Visa — Landing page · chrome (utility bar, nav, disclaimer, footer)

const NAV_LINKS = [
  ["How it works", "process"],
  ["Who it's for", "who"],
  ["The offer", "offer"],
  ["Refusals", "refusals"],
  ["FAQ", "faq"],
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

function UtilityBar() {
  return (
    <div style={{ background: "var(--ink)", color: "var(--fg-on-ink-2)" }}>
      <div style={{ ...WRAP, height: 38, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          We review before you risk the application fee
        </div>
        <div style={{ display: "flex", gap: 18, fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--stamp)", display: "inline-block" }}></span>
            Tourist visa support
          </span>
        </div>
      </div>
    </div>
  );
}

function NavLink({ children, target }) {
  const [h, setH] = React.useState(false);
  return (
    <a href={"#" + target} onClick={(e) => { e.preventDefault(); scrollToId(target); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontFamily: "var(--font-text)", fontSize: 15, fontWeight: 500, color: "var(--ink)", position: "relative", paddingBottom: 4, whiteSpace: "nowrap", cursor: "pointer" }}>
      {children}
      <span style={{ position: "absolute", left: 0, bottom: 0, height: 1.5, width: h ? "100%" : 0, background: "var(--stamp)", transition: "width var(--dur) var(--ease)" }} />
    </a>
  );
}

function SiteNav({ scrolled, onStart }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40,
      background: scrolled ? "color-mix(in srgb, var(--paper) 84%, transparent)" : "var(--paper)",
      backdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(12px) saturate(1.4)" : "none",
      borderBottom: `1px solid ${scrolled ? "var(--line-strong)" : "var(--line)"}`,
      transition: "background var(--dur) var(--ease), border-color var(--dur) var(--ease)",
    }}>
      <div style={{ ...WRAP, height: scrolled ? 64 : 72, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "height var(--dur) var(--ease)" }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollToId("top"); }} style={{ cursor: "pointer" }}><Logo size={20} /></a>
        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {NAV_LINKS.map(([l, t]) => <NavLink key={t} target={t}>{l}</NavLink>)}
        </nav>
        <Btn variant="primary" size="sm" onClick={onStart}>Start pre-check <Icon name="arrow-right" size={15} /></Btn>
      </div>
    </header>
  );
}

// Elegant, visible legal disclaimer band — used near the foot of the page.
function DisclaimerBand() {
  return (
    <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <Reveal as="div" style={{ ...WRAP, padding: "40px 40px", display: "flex", gap: 22, alignItems: "flex-start" }}>
        <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--line-strong)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
          <Icon name="scale" size={19} color="var(--fg-2)" />
        </div>
        <div style={{ maxWidth: 880 }}>
          <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: 10 }}>Important — please read</div>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.62, color: "var(--fg-2)", textWrap: "pretty" }}>
            Axis Visa does not make visa decisions and does not guarantee visa approval. Decisions are made
            by the relevant embassy, consulate, or immigration authority. Axis Visa helps clients reduce
            avoidable mistakes and prepare stronger supporting evidence. We do not provide UK immigration advice.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Footer({ onStart }) {
  const cols = [
    ["Service", [["How it works", "process"], ["Who it's for", "who"], ["The offer", "offer"], ["Refusals", "refusals"], ["FAQ", "faq"]]],
    ["Destinations", [["Schengen Area", "offer"], ["South Africa", "offer"], ["Thailand", "offer"], ["Colombia", "offer"], ["UAE", "offer"]]],
  ];
  return (
    <footer id="footer" style={{ background: "var(--ink)", color: "var(--fg-on-ink-2)", padding: "72px 0 36px" }}>
      <div style={WRAP}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 56, flexWrap: "wrap", paddingBottom: 44, borderBottom: "1px solid var(--line-ink)" }}>
          <div style={{ maxWidth: 340 }}>
            <Logo size={20} paper tagline />
            <p style={{ marginTop: 20, fontSize: 14.5, lineHeight: 1.62, color: "var(--fg-on-ink-2)", maxWidth: 320 }}>
              Tourist visa application support for higher-risk travellers. Cleaner documents, stronger
              evidence, a clearer application pack — prepared properly before you submit.
            </p>
            <div style={{ marginTop: 24 }}>
              <Btn variant="primary" size="sm" onClick={onStart}>Start pre-check <Icon name="arrow-right" size={15} /></Btn>
            </div>
          </div>
          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            {cols.map(([h, items]) => (
              <div key={h}>
                <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--fg-on-ink-3)", marginBottom: 18 }}>{h}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {items.map(([label, t], i) => (
                    <a key={i} href={"#" + t} onClick={(e) => { e.preventDefault(); scrollToId(t); }} className="footlink" style={{ fontSize: 14, color: "var(--fg-on-ink-2)", cursor: "pointer", width: "fit-content", whiteSpace: "nowrap" }}>{label}</a>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--fg-on-ink-3)", marginBottom: 18 }}>Contact</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "var(--fg-on-ink-2)", whiteSpace: "nowrap" }}>
                <span>hello@axisvisa.example</span>
                <span>WhatsApp · +00 0000 000000</span>
                <span style={{ color: "var(--fg-on-ink-3)" }}>Mon–Fri · 09:00–18:00</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 26, fontFamily: "var(--font-label)", fontSize: 11.5, fontWeight: 500, letterSpacing: ".06em", color: "var(--fg-on-ink-3)", flexWrap: "wrap", gap: 12 }}>
          <span>© 2026 Axis Visa Ltd · Company no. [placeholder]</span>
          <span style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            <span>Privacy policy</span><span>Terms</span><span>Preparation &amp; evidence · Not legal representation</span>
          </span>
        </div>
      </div>
      <style>{`.footlink{position:relative}.footlink:hover{color:var(--paper)!important}`}</style>
    </footer>
  );
}

Object.assign(window, { UtilityBar, SiteNav, NavLink, DisclaimerBand, Footer, scrollToId, NAV_LINKS });
