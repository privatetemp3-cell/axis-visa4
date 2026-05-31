// Axis Visa — Landing page · Free Visa Requirement Checker section
// Sits directly under the hero, before the trust statement.
// Reuses the Pre-Check form primitives (Field, TextInput, SelectInput, ChoiceRow).

const VC_DESTINATIONS = ["Schengen Area", "United States", "Thailand", "China", "Colombia", "Brazil", "Mexico", "Other"];
const VC_PURPOSE = ["Tourism / holiday", "Visiting family or friends", "Short business trip", "Event or conference", "Other"];
const VC_STAY = ["Up to 1 week", "1–2 weeks", "2–4 weeks", "1–3 months", "Over 3 months"];

const vcEmpty = {
  fullName: "", email: "", nationality: "", residence: "",
  destination: "", purpose: "", stay: "", travelDate: "",
  transiting: "", transitCountries: "", existingVisas: "",
};

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

function VCReportRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "9px 0", borderBottom: "1px solid var(--line)" }}>
      <span style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--fg-3)", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13.5, color: value ? "var(--fg-1)" : "var(--fg-3)", fontWeight: value ? 600 : 400, textAlign: "right", fontStyle: value ? "normal" : "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value || "—"}</span>
    </div>
  );
}

function VisaChecker() {
  const [form, setForm] = React.useState(vcEmpty);
  const [touched, setTouched] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const ref = React.useRef("AX-VR-" + Math.floor(40000 + Math.random() * 50000));
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const valid = form.fullName.trim() && emailValid && form.destination;

  const submit = () => {
    setTouched(true);
    if (!valid) return;
    ref.current = "AX-VR-" + Math.floor(40000 + Math.random() * 50000);
    setDone(true);
  };

  const reportDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <section id="visa-checker" style={{ background: "var(--paper-2)", padding: "96px 0 84px", borderBottom: "1px solid var(--line)" }}>
      <div style={{ ...WRAP, display: "grid", gridTemplateColumns: ".92fr 1.08fr", gap: 60, alignItems: "start" }} className="visa-grid">

        {/* LEFT — editorial intro + trust points */}
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

        {/* RIGHT — form card (reuses pre-check field styling) */}
        <Reveal delay={160} y={26}>
          <div className="visa-card" style={{ background: "var(--card)", border: "1px solid var(--line-strong)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "18px 24px", borderBottom: "1px solid var(--line)", background: "var(--paper)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <Mark size={24} />
                <span style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--fg-2)" }}>
                  {done ? "Report requested" : "Free visa requirement check"}
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--stamp-deep)", background: "var(--stamp-tint)", padding: "4px 10px", borderRadius: "var(--r-pill)", whiteSpace: "nowrap" }}>£0 · Free</span>
            </div>

            {!done && (
              <div style={{ padding: "24px 24px 22px" }}>
                <div style={{ display: "grid", gap: 15 }}>
                  <Field label="Full name" required>
                    <TextInput value={form.fullName} onChange={set("fullName")} placeholder="Full Name" invalid={touched && !form.fullName.trim()} />
                  </Field>
                  <Field label="Email address" required>
                    <TextInput type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" invalid={touched && !emailValid} />
                  </Field>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="visa-pair">
                    <Field label="Passport / nationality">
                      <TextInput value={form.nationality} onChange={set("nationality")} placeholder="e.g. Nigerian" />
                    </Field>
                    <Field label="Country of residence">
                      <TextInput value={form.residence} onChange={set("residence")} placeholder="Where you live now" />
                    </Field>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="visa-pair">
                    <Field label="Destination country" required>
                      <SelectInput value={form.destination} onChange={set("destination")} options={VC_DESTINATIONS} placeholder="Choose a destination" invalid={touched && !form.destination} />
                    </Field>
                    <Field label="Travel purpose">
                      <SelectInput value={form.purpose} onChange={set("purpose")} options={VC_PURPOSE} placeholder="Select a purpose" />
                    </Field>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="visa-pair">
                    <Field label="Intended length of stay">
                      <SelectInput value={form.stay} onChange={set("stay")} options={VC_STAY} placeholder="Select length" />
                    </Field>
                    <Field label="Intended travel date" hint="An estimate is fine">
                      <TextInput type="date" value={form.travelDate} onChange={set("travelDate")} />
                    </Field>
                  </div>
                  <Field label="Are you transiting through another country?">
                    <ChoiceRow value={form.transiting} onChange={set("transiting")} options={["Yes", "No", "Not sure"]} />
                  </Field>
                  {form.transiting === "Yes" && (
                    <Field label="Which transit country or countries?">
                      <TextInput value={form.transitCountries} onChange={set("transitCountries")} placeholder="e.g. Qatar, then onward" />
                    </Field>
                  )}
                  <Field label="Do you already hold any valid visas or residence permits?" hint="Optional">
                    <TextInput value={form.existingVisas} onChange={set("existingVisas")} placeholder="e.g. Schengen residence permit" />
                  </Field>
                </div>

                <div style={{ marginTop: 22 }}>
                  <Btn variant="primary" size="lg" onClick={submit} style={{ width: "100%", justifyContent: "center" }}>
                    Get my free visa report <Icon name="arrow-right" size={18} />
                  </Btn>
                  {touched && !valid && (
                    <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--danger)", fontWeight: 500, textAlign: "center" }}>
                      Add your name, a valid email and a destination.
                    </div>
                  )}
                  <div style={{ marginTop: 12, fontSize: 12.5, color: "var(--fg-3)", textAlign: "center", lineHeight: 1.5 }}>
                    Free report. No payment required. Sent by email.
                  </div>
                </div>
              </div>
            )}

            {done && (
              <div style={{ padding: "28px 24px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 18 }}>
                  <div style={{ flexShrink: 0, width: 46, height: 46, borderRadius: "50%", background: "var(--stamp-tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="mail-check" size={23} color="var(--stamp-deep)" />
                  </div>
                  <div>
                    <h3 className="h3" style={{ margin: 0, fontSize: 21 }}>Your Visa Requirement Report is on its way</h3>
                    <p style={{ margin: "3px 0 0", fontSize: 13.5, color: "var(--fg-2)" }}>We'll email it to <strong style={{ color: "var(--fg-1)" }}>{form.email}</strong> shortly.</p>
                  </div>
                </div>

                <div style={{ border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--ink)", color: "var(--paper)" }}>
                    <span style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>Visa requirement report</span>
                    <span style={{ fontFamily: "var(--font-label)", fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--stamp)", background: "color-mix(in srgb, var(--stamp) 18%, transparent)", padding: "3px 8px", borderRadius: "var(--r-pill)" }}>Preparing</span>
                  </div>
                  <div style={{ padding: "4px 16px 14px", background: "var(--card)" }}>
                    <VCReportRow label="Traveller" value={form.fullName} />
                    <VCReportRow label="Report date" value={reportDate} />
                    <VCReportRow label="Reference" value={ref.current} />
                    <VCReportRow label="Passport / nationality" value={form.nationality} />
                    <VCReportRow label="Destination" value={form.destination} />
                    <VCReportRow label="Transit" value={form.transiting === "Yes" ? (form.transitCountries || "Yes") : (form.transiting || "—")} />
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "11px 0 4px" }}>
                      <span style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--fg-3)" }}>Assessment</span>
                      <span style={{ fontSize: 13, color: "var(--ochre)", fontWeight: 700, textAlign: "right" }}>Being reviewed — sent by email</span>
                    </div>
                  </div>
                </div>

                <p style={{ margin: "16px 2px 0", fontSize: 12.5, lineHeight: 1.55, color: "var(--fg-3)" }}>
                  Your full report will confirm whether a visa is required, visa-free, or a transit visa may apply,
                  with an overall confidence level and recommended next steps.
                </p>
                <div style={{ marginTop: 18 }}>
                  <Btn variant="secondary" onClick={() => { setForm(vcEmpty); setTouched(false); setDone(false); }}>Check another trip</Btn>
                </div>
              </div>
            )}
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
        @media (max-width: 560px) {
          #visa-checker .visa-pair { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { VisaChecker });
