// Axis Visa — Landing page · Pre-Check wizard modal

const DESTINATIONS = ["Schengen Area", "United States", "Thailand", "China", "Colombia", "Brazil", "Mexico", "Other"];
const EMPLOYMENT = ["Employed", "Self-employed / business owner", "Student", "Retired", "Not currently working"];
const FUNDS = ["Under £2,000", "£2,000 – £5,000", "£5,000 – £10,000", "Over £10,000"];
const YESNO = ["Yes", "No", "Not sure"];
const REFUSALS = ["No refusals", "Refused once", "Refused more than once"];

const emptyForm = {
  fullName: "", email: "", nationality: "", residence: "",
  destination: "", travelDate: "", purpose: "", urgent: "",
  employment: "", refusals: "", funds: "", bankStatements: "", evidence: "",
};

const STEPS = [
  { key: "you", label: "About you", n: "01" },
  { key: "trip", label: "Your trip", n: "02" },
  { key: "situation", label: "Your situation", n: "03" },
  { key: "review", label: "Review", n: "04" },
];

function StepHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h3 className="h3" style={{ margin: "0 0 6px", fontSize: 23 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 14.5, color: "var(--fg-2)", lineHeight: 1.5 }}>{sub}</p>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 18, padding: "11px 0", borderBottom: "1px solid var(--line)" }}>
      <span style={{ fontSize: 13.5, color: "var(--fg-3)", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 14, color: value ? "var(--fg-1)" : "var(--fg-3)", fontWeight: value ? 600 : 400, textAlign: "right", fontStyle: value ? "normal" : "italic" }}>{value || "Not provided"}</span>
    </div>
  );
}

function PreCheckModal({ open, onClose }) {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState(emptyForm);
  const [touched, setTouched] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const caseNo = React.useRef("AX-" + Math.floor(4000 + Math.random() * 5000));

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  useLucideModal(open, step, done);

  React.useEffect(() => {
    if (open) { setStep(0); setForm(emptyForm); setTouched(false); setDone(false); caseNo.current = "AX-" + Math.floor(4000 + Math.random() * 5000); }
  }, [open]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const step0Valid = form.fullName.trim() && emailValid;
  const step1Valid = !!form.destination;
  const canContinue = step === 0 ? step0Valid : step === 1 ? step1Valid : true;

  const next = () => {
    setTouched(true);
    if (!canContinue) return;
    setTouched(false);
    if (step < 3) setStep(step + 1);
    else setDone(true);
  };
  const back = () => { setTouched(false); setStep(Math.max(0, step - 1)); };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(17,22,27,.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "min(7vh,72px) 20px", overflowY: "auto" }}>
      <div onClick={(e) => e.stopPropagation()} className="precheck-modal" style={{ width: 600, maxWidth: "100%", background: "var(--card)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-lg)", overflow: "hidden" }}>
        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <Mark size={26} />
            <span style={{ fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--fg-2)" }}>
              {done ? "Pre-check received" : "Tourist visa pre-check"}
            </span>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg-3)", display: "flex", padding: 4 }}><Icon name="x" size={20} /></button>
        </div>

        {!done && (
          <React.Fragment>
            {/* step rail */}
            <div style={{ display: "flex", gap: 0, padding: "0 22px", borderBottom: "1px solid var(--line)", background: "var(--paper-2)" }}>
              {STEPS.map((s, i) => (
                <div key={s.key} style={{ flex: 1, padding: "13px 0 12px", borderBottom: `2px solid ${i === step ? "var(--stamp)" : "transparent"}`, display: "flex", alignItems: "center", gap: 8, opacity: i <= step ? 1 : .5 }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, fontWeight: 700, fontFamily: "var(--font-label)", background: i < step ? "var(--stamp)" : i === step ? "var(--ink)" : "transparent", color: i <= step ? "#fff" : "var(--fg-3)", border: i > step ? "1px solid var(--line-strong)" : "none" }}>
                    {i < step ? "✓" : i + 1}
                  </span>
                  <span style={{ fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 600, color: i === step ? "var(--ink)" : "var(--fg-3)", letterSpacing: "-.005em", whiteSpace: "nowrap" }} className="step-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* body */}
            <div style={{ padding: "26px 24px 8px", maxHeight: "min(56vh, 520px)", overflowY: "auto" }}>
              {step === 0 && (
                <div>
                  <StepHeader title="Let's start with you" sub="So we know who we're preparing this file for, and how to reach you." />
                  <div style={{ display: "grid", gap: 16 }}>
                    <Field label="Full name" required>
                      <TextInput value={form.fullName} onChange={set("fullName")} placeholder="Full Name" invalid={touched && !form.fullName.trim()} />
                    </Field>
                    <Field label="Email" required>
                      <TextInput type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" invalid={touched && !emailValid} />
                    </Field>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="field-pair">
                      <Field label="Nationality / passport held">
                        <TextInput value={form.nationality} onChange={set("nationality")} placeholder="e.g. Nigerian" />
                      </Field>
                      <Field label="Country of residence">
                        <TextInput value={form.residence} onChange={set("residence")} placeholder="Where you live now" />
                      </Field>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <StepHeader title="Where and when are you travelling?" sub="We tailor the review to your destination." />
                  <div style={{ display: "grid", gap: 16 }}>
                    <Field label="Destination country" required>
                      <SelectInput value={form.destination} onChange={set("destination")} options={DESTINATIONS} placeholder="Choose a destination" invalid={touched && !form.destination} />
                    </Field>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "11px 13px", marginTop: -4 }}>
                      <Icon name="info" size={16} color="var(--fg-3)" style={{ marginTop: 1, flexShrink: 0 }} />
                      <span style={{ fontSize: 12.5, color: "var(--fg-2)", lineHeight: 1.5 }}>
                        Axis Visa supports non-UK tourist visas only. We do not handle UK visa cases or provide UK immigration advice.
                      </span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="field-pair">
                      <Field label="Intended travel date" hint="An estimate is fine">
                        <TextInput type="date" value={form.travelDate} onChange={set("travelDate")} />
                      </Field>
                      <Field label="Any urgent deadline?">
                        <ChoiceRow value={form.urgent} onChange={set("urgent")} options={YESNO} />
                      </Field>
                    </div>
                    <Field label="Purpose of visit">
                      <SelectInput value={form.purpose} onChange={set("purpose")} options={["Tourism / holiday", "Visiting family or friends", "Short business trip", "Event or conference", "Other"]} placeholder="Select a purpose" />
                    </Field>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <StepHeader title="A little about your situation" sub="Honest answers let us read your real risk. Nothing here counts against you with us." />
                  <div style={{ display: "grid", gap: 16 }}>
                    <Field label="Employment status">
                      <SelectInput value={form.employment} onChange={set("employment")} options={EMPLOYMENT} placeholder="Select your status" />
                    </Field>
                    <Field label="Previous visa refusals">
                      <ChoiceRow value={form.refusals} onChange={set("refusals")} options={REFUSALS} />
                    </Field>
                    <Field label="Savings / funds available">
                      <SelectInput value={form.funds} onChange={set("funds")} options={FUNDS} placeholder="Approximate range" />
                    </Field>
                    <div style={{ display: "grid", gap: 16 }}>
                      <Field label="Can you provide bank statements?">
                        <ChoiceRow value={form.bankStatements} onChange={set("bankStatements")} options={YESNO} />
                      </Field>
                      <Field label="Can you provide employment, business, or student evidence?">
                        <ChoiceRow value={form.evidence} onChange={set("evidence")} options={YESNO} />
                      </Field>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <StepHeader title="Review your pre-check" sub="Check the details below, then submit. There's no charge to send this." />
                  <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "6px 18px 14px" }}>
                    <ReviewRow label="Full name" value={form.fullName} />
                    <ReviewRow label="Email" value={form.email} />
                    <ReviewRow label="Nationality" value={form.nationality} />
                    <ReviewRow label="Residence" value={form.residence} />
                    <ReviewRow label="Destination" value={form.destination} />
                    <ReviewRow label="Travel date" value={form.travelDate} />
                    <ReviewRow label="Purpose" value={form.purpose} />
                    <ReviewRow label="Urgent deadline" value={form.urgent} />
                    <ReviewRow label="Employment" value={form.employment} />
                    <ReviewRow label="Previous refusals" value={form.refusals} />
                    <ReviewRow label="Funds available" value={form.funds} />
                    <ReviewRow label="Bank statements" value={form.bankStatements} />
                    <ReviewRow label="Other evidence" value={form.evidence} />
                  </div>
                  <p style={{ margin: "14px 2px 0", fontSize: 12.5, color: "var(--fg-3)", lineHeight: 1.5 }}>
                    Axis Visa does not make visa decisions and does not guarantee approval. We help you reduce avoidable mistakes and prepare stronger evidence.
                  </p>
                </div>
              )}
            </div>

            {/* footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "16px 24px", borderTop: "1px solid var(--line)", background: "var(--paper)" }}>
              <div>
                {step > 0 && <Btn variant="ghost" size="sm" onClick={back}><Icon name="arrow-left" size={15} /> Back</Btn>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {touched && !canContinue && (
                  <span style={{ fontSize: 12.5, color: "var(--danger)", fontWeight: 500 }}>
                    {step === 0 ? "Add your name and a valid email" : "Choose a destination"}
                  </span>
                )}
                <Btn variant="primary" size="sm" onClick={next} style={!canContinue && touched ? {} : {}}>
                  {step < 3 ? "Continue" : "Submit pre-check"} <Icon name="arrow-right" size={15} />
                </Btn>
              </div>
            </div>
          </React.Fragment>
        )}

        {done && (
          <div style={{ padding: "44px 32px 40px", textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--stamp-tint)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
              <Icon name="check" size={30} color="var(--stamp-deep)" />
            </div>
            <h3 className="h3" style={{ margin: "0 0 10px", fontSize: 25 }}>Pre-check received</h3>
            <p style={{ margin: "0 auto 24px", fontSize: 15.5, color: "var(--fg-2)", maxWidth: 400, lineHeight: 1.6 }}>
              Thank you, {form.fullName.split(" ")[0] || "traveller"}. An advisor will review your details and
              be in touch within one working day with your next steps.
            </p>
            <div style={{ display: "inline-block", background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "12px 22px", fontFamily: "var(--font-label)", fontWeight: 600, fontSize: 13, letterSpacing: ".1em", color: "var(--ink)" }}>
              CASE No. {caseNo.current} · {(form.destination || "NON-UK").toUpperCase()}
            </div>
            <div style={{ marginTop: 28 }}><Btn variant="secondary" onClick={onClose}>Close</Btn></div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 540px) { .precheck-modal .step-label { display: none; } .precheck-modal .field-pair { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

// localised lucide refresher so the modal icons render on each step
function useLucideModal(open, step, done) {
  React.useEffect(() => {
    const id = requestAnimationFrame(() => { if (window.lucide) window.lucide.createIcons(); });
    return () => cancelAnimationFrame(id);
  }, [open, step, done]);
}

Object.assign(window, { PreCheckModal });
