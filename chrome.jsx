// Axis Visa — Landing page · chrome (utility bar, nav, disclaimer, footer)

const NAV_LINKS = [
  ["How it works", "process"],
  ["Pricing", "pricing"],
  ["Free Visa Report", "visa-checker"],
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
          Visa &amp; Travel Authorisation Application Service
        </div>
        <div style={{ display: "flex", gap: 18, fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", alignItems: "center", flexShrink: 0 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--stamp)", display: "inline-block" }}></span>
            Apply online
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
        <Btn variant="primary" size="sm" onClick={onStart}>Start my application <Icon name="arrow-right" size={15} /></Btn>
      </div>
    </header>
  );
}

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
            Axis Visa does not provide application or immigration services for UK entry clearance.
            Visa decisions, boarding decisions and final admission are made by the relevant government,
            airline or border authority. Axis Visa does not guarantee visa approval or entry.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Footer({ onStart }) {
  const cols = [
    ["Service", [["How it works", "process"], ["Pricing", "pricing"], ["What we handle", "handles"], ["Free Visa Report", "visa-checker"], ["FAQ", "faq"]]],
  ];
  return (
    <footer id="footer" style={{ background: "var(--ink)", color: "var(--fg-on-ink-2)", padding: "72px 0 0" }}>
      <div style={WRAP}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 56, flexWrap: "wrap", paddingBottom: 44, borderBottom: "1px solid var(--line-ink)" }}>
          <div style={{ maxWidth: 340 }}>
            <Logo size={20} paper tagline />
            <p style={{ marginTop: 20, fontSize: 14.5, lineHeight: 1.62, color: "var(--fg-on-ink-2)", maxWidth: 320 }}>
              Apply online. Upload your documents. Axis Visa handles the application.
            </p>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="mailto:contact@axisvisahq.com" style={{ fontSize: 14, color: "var(--fg-on-ink-2)" }}>contact@axisvisahq.com</a>
              <a href="https://wa.me/447000000000" style={{ fontSize: 14, color: "var(--fg-on-ink-2)" }}>WhatsApp</a>
              <span style={{ fontSize: 13, color: "var(--fg-on-ink-3)" }}>Mon–Fri · 09:00–18:00</span>
            </div>
            <div style={{ marginTop: 22 }}>
              <Btn variant="primary" size="sm" onClick={onStart}>Start my application <Icon name="arrow-right" size={15} /></Btn>
            </div>
          </div>
          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            {cols.map(([h, items]) => (
              <div key={h}>
                <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--fg-on-ink-3)", marginBottom: 18 }}>{h}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {items.map(([label, t]) => (
                    <a key={label} href={"#" + t} onClick={(e) => { e.preventDefault(); scrollToId(t); }} className="footlink" style={{ fontSize: 14, color: "var(--fg-on-ink-2)", cursor: "pointer", whiteSpace: "nowrap" }}>{label}</a>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--fg-on-ink-3)", marginBottom: 18 }}>Company</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "var(--fg-on-ink-2)" }}>
                <a href="mailto:contact@axisvisahq.com" style={{ color: "inherit" }}>Contact us</a>
                <span style={{ fontSize: 13, color: "var(--fg-on-ink-3)", lineHeight: 1.7 }}>
                  Axis Visa Ltd<br />
                  483 Green Lanes<br />
                  London, England<br />
                  N13 4BS
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "22px 0 28px", fontSize: 13, lineHeight: 1.6, color: "var(--fg-on-ink-3)", display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ margin: 0, maxWidth: 820 }}>
            Axis Visa does not provide application or immigration services for UK entry clearance.
            Visa decisions, boarding decisions and final admission are made by the relevant government, airline or border authority.
          </p>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap", fontSize: 11.5, fontFamily: "var(--font-label)", letterSpacing: ".06em", fontWeight: 500, textTransform: "uppercase" }}>
            <span>© 2026 Axis Visa Ltd · Company no. 15704239</span>
            <span>Privacy policy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
      <style>{`.footlink{position:relative}.footlink:hover{color:var(--paper)!important}`}</style>
    </footer>
  );
}

Object.assign(window, { UtilityBar, SiteNav, NavLink, DisclaimerBand, Footer, scrollToId, NAV_LINKS });
