// Axis Visa — Landing page · Free Visa Requirement Checker section
// Right-side card links directly to Monday WorkForm — no internal form submission.

const FREE_REPORT_URL = "https://wkf.ms/4x4L2g4";

function openFreeReport(e) {
  if (e) e.preventDefault();
  window.open(FREE_REPORT_URL, "_blank", "noopener,noreferrer");
}

function VCTrustPoint({ icon, children }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", background: "var(--stamp-tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={17} color="var(--stamp-deep)" />
      </div>
      <span style={{ fontSize: 15, fontWeight: 600, color: "var(--fg-1)" }}>{children}</span>
    </div>
  );
}

function VisaChecker() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const reportItems = [
    ["map-pin", "Whether a visa appears to be required"],
    ["arrow-right-left", "Whether transit rules may apply"],
    ["list-checks", "Recommended next steps"],
    ["shield-check", "No payment required"],
  ];

  return (
    <section id="visa-checker" style={{ background: "var(--paper-2)", padding: "96px 0 84px", borderBottom: "1px solid var(--line)" }}>
      <div style={{ ...WRAP, display: "grid", gridTemplateColumns: ".92fr 1.08fr", gap: 60, alignItems: "start" }} className="visa-grid">

        {/* LEFT — editorial intro + trust points (unchanged) */}
        <div>
          <Reveal><Eyebrow style={{ marginBottom: 20 }}>Free visa check</Eyebrow></Reveal>
          <Reveal delay={90}>
            <h2 className="h2" style={{ margin: "0 0 14px" }}>Do you need a visa?</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead" style={{ margin: "0 0 22px", maxWidth: 460 }}>
              Free Visa Report sent to you via email.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p style={{ margin: "0 0 32px", fontSize: 16, lineHeight: 1.62, color: "var(--fg-2)", maxWidth: 470, textWrap: "pretty" }}>
              Enter your passport, destination and travel route. Axis Visa will send you a simple Visa
              Requirement Report showing whether a visa appears to be required, whether transit rules may
              apply, and what your next step should be.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 34 }}>
              <VCTrustPoint icon="badge-check">Free visa requirement check</VCTrustPoint>
              <VCTrustPoint icon="route">Passport and route assessed</VCTrustPoint>
              <VCTrustPoint icon="mail">Report sent by email</VCTrustPoint>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div style={{ background: "color-mix(in srgb, var(--ochre) 9%, var(--card))", border: "1px solid color-mix(in srgb, var(--ochre) 26%, var(--line))", borderRadius: "var(--r-md)", padding: "18px 20px", maxWidth: 470 }}>
              <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 7 }}>Not the same as our paid service</div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--fg-2)" }}>
                This free report only checks whether a visa appears to be required. Our <strong style={{ color: "var(--fg-1)" }}>£109 Tourist Visa Application Support</strong> is the full service for preparing your application.
              </p>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — CTA card linking to Monday WorkForm */}
        <Reveal delay={160} y={26}>
          <div className="visa-card" style={{ background: "var(--card)", border: "1px solid var(--line-strong)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>

            {/* Card header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "18px 24px", borderBottom: "1px solid var(--line)", background: "var(--paper)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <Mark size={24} />
                <span style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--fg-2)" }}>
                  Free visa requirement check
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--stamp-deep)", background: "var(--stamp-tint)", padding: "4px 10px", borderRadius: "var(--r-pill)", whiteSpace: "nowrap" }}>£0 · Free</span>
            </div>

            {/* CTA body */}
            <div style={{ padding: "28px 24px 26px" }}>
              <p style={{ margin: "0 0 22px", fontSize: 15.5, lineHeight: 1.62, color: "var(--fg-2)", textWrap: "pretty" }}>
                Tell us your passport, destination and travel route. We'll send you a simple Visa Requirement Report by email — no payment required.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 26 }}>
                {reportItems.map(([ic, label]) => (
                  <div key={label} style={{ display: "flex", gap: 11, alignItems: "center", fontSize: 14.5, color: "var(--fg-1)" }}>
                    <Icon name={ic} size={16} color="var(--stamp-deep)" style={{ flexShrink: 0 }} />
                    {label}
                  </div>
                ))}
              </div>

              <Btn variant="primary" size="lg" onClick={openFreeReport} style={{ width: "100%", justifyContent: "center" }}>
                Get my free visa report <Icon name="arrow-right" size={18} />
              </Btn>

              <div style={{ marginTop: 12, fontSize: 12.5, color: "var(--fg-3)", textAlign: "center", lineHeight: 1.5 }}>
                Free report. No payment required. Sent by email.
              </div>

              <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--line)", fontSize: 12, lineHeight: 1.55, color: "var(--fg-3)" }}>
                Axis Visa does not provide UK immigration advice and does not advise on UK visitor visas. Visa and entry decisions are made by the relevant embassy, consulate, airline, immigration authority or border authority.
              </div>
            </div>

          </div>
        </Reveal>
      </div>

      {/* disclaimer — duplicates the site disclaimer-band style */}
      <Reveal as="div" style={{ ...WRAP, marginTop: 56 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", borderTop: "1px solid var(--line-strong)", paddingTop: 26 }}>
          <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: "50%", border: "1px solid var(--line-strong)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
            <Icon name="scale" size={18} color="var(--fg-2)" />
          </div>
          <div style={{ maxWidth: 900 }}>
            <div style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: 9 }}>Important — please read</div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.62, color: "var(--fg-2)", textWrap: "pretty" }}>
              Axis Visa does not provide UK immigration advice and does not advise on UK visitor visas. Axis Visa does
              not make visa or entry decisions and does not guarantee visa approval or entry. Visa and entry decisions
              are made by the relevant embassy, consulate, airline, immigration authority or border authority. Visa
              requirements can change and may depend on nationality, residence, route, purpose of travel, length of
              stay and airline rules.
            </p>
          </div>
        </div>
      </Reveal>

      <style>{`
        @media (max-width: 900px) {
          #visa-checker .visa-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { VisaChecker });
