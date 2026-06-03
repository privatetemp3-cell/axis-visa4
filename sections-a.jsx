// Axis Visa — Landing page · sections A

const SECTION_PAD = "96px 0";

// ---- Passport / Destination selector ----

function CountryDropdown({ label, placeholder, value, open, onToggle, search, onSearch, countries, onSelect }) {
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (open && inputRef.current) { setTimeout(() => inputRef.current && inputRef.current.focus(), 30); } }, [open]);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: 8 }}>{label}</div>
      <div role="button" tabIndex={0} onClick={onToggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } if (e.key === "Escape" && open) onToggle(); }}
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "13px 14px", minHeight: 52,
          background: "var(--paper)", cursor: "pointer", userSelect: "none",
          border: `1.5px solid ${open ? "var(--stamp)" : value ? "var(--atlas)" : "var(--line-strong)"}`,
          borderRadius: open ? "var(--r-sm) var(--r-sm) 0 0" : "var(--r-sm)",
          boxShadow: open ? "0 0 0 3px var(--stamp-tint)" : "none",
          transition: "border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)",
        }}>
        <span style={{ flex: 1, fontSize: 15, fontWeight: value ? 600 : 400, color: value ? "var(--fg-1)" : "var(--fg-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value ? value.name : placeholder}
        </span>
        <i data-lucide="chevron-down" style={{ width: 16, height: 16, color: open ? "var(--stamp)" : "var(--fg-3)", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur) var(--ease)", flexShrink: 0 }}></i>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 200,
          background: "var(--card)", border: "1.5px solid var(--stamp)", borderTop: "1px solid var(--line)",
          borderRadius: "0 0 var(--r-sm) var(--r-sm)", boxShadow: "var(--shadow-lg)", overflow: "hidden",
        }}>
          <div style={{ padding: "8px 10px", background: "var(--paper-2)", borderBottom: "1px solid var(--line)" }}>
            <input ref={inputRef} type="text" value={search} onChange={(e) => onSearch(e.target.value)}
              placeholder="Search countries…" autoComplete="off"
              onKeyDown={(e) => { if (e.key === "Escape") onToggle(); }}
              style={{ width: "100%", padding: "9px 12px", fontFamily: "var(--font-text)", fontSize: 14,
                border: "1.5px solid var(--line-strong)", borderRadius: "var(--r-sm)",
                outline: "none", background: "var(--paper)", color: "var(--fg-1)", boxSizing: "border-box",
              }}
            />
          </div>
          <ul style={{ maxHeight: 244, overflowY: "auto", listStyle: "none", margin: 0, padding: 0, scrollbarWidth: "thin" }}>
            {countries.length === 0 ? (
              <li style={{ padding: "12px 16px", color: "var(--fg-3)", fontSize: 14, fontStyle: "italic" }}>No countries found</li>
            ) : countries.map((c) => {
              const selected = value && value.code === c.code;
              return (
                <li key={c.code} onClick={() => onSelect(c)} style={{
                  padding: "10px 16px", cursor: "pointer", fontSize: 14.5,
                  background: selected ? "var(--stamp-tint)" : "transparent",
                  color: selected ? "var(--stamp-deep)" : "var(--fg-1)",
                  fontWeight: selected ? 600 : 400,
                  transition: "background var(--dur) var(--ease)",
                }}
                  onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = "var(--paper-2)"; }}
                  onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = "transparent"; }}
                >{c.name}</li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function PassportSelector() {
  const [passport, setPassport] = React.useState(null);
  const [dest, setDest] = React.useState(null);
  const [passOpen, setPassOpen] = React.useState(false);
  const [destOpen, setDestOpen] = React.useState(false);
  const [passSearch, setPassSearch] = React.useState("");
  const [destSearch, setDestSearch] = React.useState("");
  const [error, setError] = React.useState(false);
  const ref = React.useRef(null);
  const countries = window.COUNTRIES || [];
  const filteredPass = passSearch ? countries.filter(c => c.name.toLowerCase().includes(passSearch.toLowerCase())) : countries;
  const filteredDest = destSearch ? countries.filter(c => c.name.toLowerCase().includes(destSearch.toLowerCase())) : countries;

  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setPassOpen(false); setDestOpen(false); } };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const togglePass = () => { setPassOpen(o => !o); setDestOpen(false); };
  const toggleDest = () => { setDestOpen(o => !o); setPassOpen(false); };
  const selectPass = (c) => { setPassport(c); setPassOpen(false); setPassSearch(""); setError(false); };
  const selectDest = (c) => { setDest(c); setDestOpen(false); setDestSearch(""); setError(false); };

  const handleStart = () => {
    if (!passport || !dest) { setError(true); return; }
    window.location.href = "/start-application?passport=" + passport.code + "&destination=" + dest.code;
  };

  return (
    <div ref={ref} style={{
      background: "var(--card)", border: "1px solid var(--line-strong)", borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-lg)", padding: "26px 26px 22px", width: "100%", maxWidth: 800,
    }}>
      {/* Fields */}
      <div className="sel-grid" style={{ display: "grid", gridTemplateColumns: "1fr 32px 1fr", alignItems: "end", marginBottom: 14 }}>
        <CountryDropdown
          label="My passport" placeholder="Select passport country"
          value={passport} open={passOpen} onToggle={togglePass}
          search={passSearch} onSearch={setPassSearch}
          countries={filteredPass} onSelect={selectPass}
        />
        <div className="sel-arrow" style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 16, color: "var(--fg-3)", fontSize: 18, fontWeight: 300 }}>→</div>
        <CountryDropdown
          label="My destination" placeholder="Select destination"
          value={dest} open={destOpen} onToggle={toggleDest}
          search={destSearch} onSearch={setDestSearch}
          countries={filteredDest} onSelect={selectDest}
        />
      </div>

      {/* Validation error */}
      {error && (
        <div style={{ background: "var(--danger-tint, #FBE0E1)", border: "1px solid var(--danger)", color: "var(--danger)", fontSize: 13, padding: "9px 13px", borderRadius: "var(--r-sm)", marginBottom: 10 }}>
          Please select both your passport country and destination.
        </div>
      )}

      {/* Primary CTA */}
      <Btn variant="primary" size="lg" onClick={handleStart} style={{ width: "100%", justifyContent: "center", fontSize: 16, fontWeight: 700, padding: "15px 24px" }}>
        Start my application <Icon name="arrow-right" size={18} />
      </Btn>

      {/* Pricing line */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 20px", fontSize: 13, color: "var(--fg-2)", marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
        <span>Tourist visa applications: <strong style={{ color: "var(--fg-1)" }}>£109 service fee</strong> + official fees</span>
        <span>ESTA, ETA, eTA &amp; travel authorisations: <strong style={{ color: "var(--fg-1)" }}>£40 flat charge</strong></span>
      </div>
      <p style={{ margin: "8px 0 0", fontSize: 12.5, color: "var(--fg-3)", lineHeight: 1.5 }}>
        Independent application handling. Final visa, boarding and entry decisions are made by the relevant authority.
      </p>
    </div>
  );
}

// ---- Hero ----

function Hero() {
  return (
    <section id="top" style={{ background: "var(--paper)", borderBottom: "1px solid var(--line)", overflow: "hidden" }}>
      <div style={{ ...WRAP, padding: "76px 40px 80px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 28 }}>
        <Reveal>
          <Eyebrow style={{ marginBottom: 0 }}>Visa &amp; Travel Authorisation Application Service</Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 60px)", margin: 0, lineHeight: 1.04 }}>
            Start your visa application<br />with Axis Visa
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="lead" style={{ maxWidth: 560, margin: 0 }}>
            Apply online, upload your documents, and we handle the application through to
            submission, outcome and collection where applicable.
          </p>
        </Reveal>
        <Reveal delay={260} y={22} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <PassportSelector />
        </Reveal>
        <Reveal delay={340}>
          <Btn variant="ghost" size="md" onClick={() => scrollToId("visa-checker")}>
            Get a free Visa Requirement Report <Icon name="arrow-right" size={16} />
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}

// ---- How it works (3 steps) ----

function HowItWorks() {
  const steps = [
    ["01", "mouse-pointer-click", "Apply online", "Start your application and tell us your passport country, destination and travel plans."],
    ["02", "upload-cloud", "Upload your documents", "We collect the information and documents needed for your application."],
    ["03", "shield-check", "We handle the application", "Axis Visa prepares the application, organises the file, submits where permitted, and supports the process through to outcome and collection where applicable."],
  ];
  return (
    <section id="process" style={{ background: "var(--paper)", padding: SECTION_PAD }}>
      <div style={WRAP}>
        <Reveal><Eyebrow style={{ marginBottom: 18 }}>How it works</Eyebrow></Reveal>
        <Reveal delay={80}><h2 className="h2" style={{ maxWidth: 560, margin: "0 0 14px" }}>How Axis Visa works</h2></Reveal>
        <Reveal delay={140}><p className="lead" style={{ maxWidth: 520, margin: "0 0 52px" }}>Three clear steps. You apply. We handle.</p></Reveal>
        <div style={{ borderTop: "2px solid var(--ink)" }}>
          <Stagger step={100}>
            {steps.map(([n, ic, t, d]) => (
              <div key={n} className="proc-row" style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 28, alignItems: "start", padding: "28px 8px 28px 0", borderBottom: "1px solid var(--line)", transition: "background var(--dur) var(--ease)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, letterSpacing: "-.03em", color: "var(--stamp-deep)", lineHeight: 1 }}>{n}</div>
                <div style={{ maxWidth: 620 }}>
                  <div className="h3" style={{ fontSize: 22, marginBottom: 8 }}>{t}</div>
                  <p style={{ margin: 0, fontSize: 15.5, color: "var(--fg-2)", lineHeight: 1.6 }}>{d}</p>
                </div>
                <div style={{ width: 46, height: 46, borderRadius: "var(--r-sm)", border: "1px solid var(--line-strong)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} className="proc-ic">
                  <Icon name={ic} size={21} color="var(--fg-2)" />
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
      <style>{`.proc-row:hover{background:var(--paper-2)!important}.proc-row:hover .proc-ic{border-color:var(--stamp)!important}.proc-row:hover .proc-ic i{color:var(--stamp-deep)!important}`}</style>
    </section>
  );
}

// ---- Pricing (two-tier) ----

function Pricing({ onStart }) {
  return (
    <section id="pricing" style={{ background: "var(--paper-2)", padding: SECTION_PAD, borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={WRAP}>
        <Reveal><Eyebrow style={{ marginBottom: 18 }}>Pricing</Eyebrow></Reveal>
        <Reveal delay={80}><h2 className="h2" style={{ margin: "0 0 12px" }}>Clear pricing before we start</h2></Reveal>
        <Reveal delay={140}><p className="lead" style={{ margin: "0 0 48px", maxWidth: 520 }}>One fixed charge. No hidden fees. No outcome-based charges.</p></Reveal>
        <Reveal delay={120} y={22}>
          <div className="price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {/* Tourist visa */}
            <div style={{ background: "var(--card)", border: "1px solid var(--line-strong)", borderRadius: "var(--r-md)", overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--stamp-deep)", marginBottom: 18 }}>Tourist visa applications</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 62, letterSpacing: "-.035em", lineHeight: .88, color: "var(--fg-1)" }}>£109</span>
                </div>
                <div style={{ fontSize: 14, color: "var(--fg-3)", marginBottom: 24 }}>Axis Visa service fee + official fees</div>
                <p style={{ margin: "0 0 auto", fontSize: 15, lineHeight: 1.65, color: "var(--fg-2)" }}>
                  For standard tourist visa applications requiring document review, application preparation,
                  submission handling where permitted, and outcome or collection support.
                </p>
                <div style={{ marginTop: 28 }}>
                  <Btn variant="secondary" onClick={onStart} style={{ width: "100%", justifyContent: "center" }}>Start my application <Icon name="arrow-right" size={16} /></Btn>
                </div>
              </div>
            </div>
            {/* ESTA / ETA */}
            <div style={{ background: "var(--ink)", border: "1px solid var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden", boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--stamp)", marginBottom: 18 }}>ESTA, ETA, eTA &amp; travel authorisations</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 62, letterSpacing: "-.035em", lineHeight: .88, color: "var(--paper)" }}>£40</span>
                </div>
                <div style={{ fontSize: 14, color: "var(--fg-on-ink-3)", marginBottom: 24 }}>Flat customer charge</div>
                <p style={{ margin: "0 0 auto", fontSize: 15, lineHeight: 1.65, color: "var(--fg-on-ink-2)" }}>
                  For standard online travel authorisation applications with electronic outcomes.
                  The relevant official authorisation fee is paid from the £40 charge by Axis Visa where applicable.
                </p>
                <div style={{ marginTop: 28 }}>
                  <Btn variant="primary" onClick={onStart} style={{ width: "100%", justifyContent: "center" }}>Start my application <Icon name="arrow-right" size={16} /></Btn>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---- What we handle ----

function WhatWeHandle() {
  const items = [
    ["search", "Visa requirement check"],
    ["list-checks", "Personalised document checklist"],
    ["file-search", "Document review"],
    ["file-pen", "Application preparation"],
    ["layers", "File organisation"],
    ["send", "Submission where permitted"],
    ["calendar-check", "Appointment or biometrics support where required"],
    ["badge-check", "Outcome and collection support where applicable"],
  ];
  return (
    <section id="handles" style={{ background: "var(--paper)", padding: SECTION_PAD }}>
      <div style={{ ...WRAP, display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: 64, alignItems: "start" }} className="why-grid">
        <div>
          <Reveal><Eyebrow style={{ marginBottom: 18 }}>The service</Eyebrow></Reveal>
          <Reveal delay={80}><h2 className="h2" style={{ margin: "0 0 18px" }}>What we handle</h2></Reveal>
          <Reveal delay={140}>
            <p className="lead" style={{ fontSize: 18, margin: 0, maxWidth: 320 }}>
              A managed process from requirement check to outcome.
            </p>
          </Reveal>
        </div>
        <Stagger step={65} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }} className="why-cells">
          {items.map(([ic, label]) => (
            <div key={label} style={{ background: "var(--card)", padding: "20px 22px", display: "flex", alignItems: "center", gap: 13, transition: "background var(--dur) var(--ease)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--paper-2)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "var(--card)"}
            >
              <div style={{ width: 34, height: 34, borderRadius: "var(--r-sm)", border: "1px solid var(--line-strong)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={ic} size={17} color="var(--stamp-deep)" />
              </div>
              <span style={{ fontSize: 14.5, color: "var(--fg-1)", lineHeight: 1.4 }}>{label}</span>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// ---- Who it's for ----

function WhoFor() {
  const items = [
    ["plane", "Standard tourist visa applications", "Travelling to a destination that requires a tourist visa and want a clear, properly handled application."],
    ["zap", "US ESTA, Canada eTA, UK ETA", "Applying for an electronic travel authorisation and want it organised and submitted correctly."],
    ["globe", "Schengen area travel", "Applying for a Schengen visa for tourism across EU and associated states."],
    ["user-round", "First-time applicants", "Applying for the first time and want every step handled without navigating the process alone."],
    ["clock", "Time-conscious travellers", "Want the application prepared and managed without doing it yourself."],
    ["route", "Any standard travel route", "Any tourist visa or travel authorisation for a standard travel purpose."],
  ];
  return (
    <section id="who" style={{ background: "var(--paper-2)", padding: SECTION_PAD, borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={WRAP}>
        <Reveal><Eyebrow style={{ marginBottom: 18 }}>Who it's for</Eyebrow></Reveal>
        <Reveal delay={80}><h2 className="h2" style={{ maxWidth: 660, margin: "0 0 14px" }}>Built for travellers who want the process handled properly</h2></Reveal>
        <Reveal delay={140}><p className="lead" style={{ maxWidth: 560, margin: "0 0 52px" }}>Axis Visa is for travellers who need a tourist visa or travel authorisation and want a clear, managed application process.</p></Reveal>
        <Stagger step={80} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }} className="who-grid">
          {items.map(([ic, t, d]) => (
            <div key={t} className="who-cell" style={{ background: "var(--card)", padding: "30px 28px", height: "100%", boxSizing: "border-box", transition: "background var(--dur) var(--ease)" }}>
              <div style={{ width: 42, height: 42, borderRadius: "var(--r-sm)", border: "1px solid var(--line-strong)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Icon name={ic} size={20} color="var(--stamp-deep)" />
              </div>
              <div className="h4" style={{ marginBottom: 8, fontSize: 17 }}>{t}</div>
              <p style={{ margin: 0, fontSize: 14.5, color: "var(--fg-2)", lineHeight: 1.58 }}>{d}</p>
            </div>
          ))}
        </Stagger>
      </div>
      <style>{`.who-cell:hover{background:var(--paper-2)!important}`}</style>
    </section>
  );
}

Object.assign(window, { Hero, HowItWorks, Pricing, WhatWeHandle, WhoFor, PassportSelector, SECTION_PAD });
