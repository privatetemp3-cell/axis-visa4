// Axis Visa — Landing page · sections B (why, faq, final CTA)

const SECTION_PAD = "96px 0 84px";

function WhyAxis() {
  const points = [
    ["send", "End-to-end handling", "We prepare and submit your application — you don't have to navigate the process yourself."],
    ["file-check-2", "Document review", "We check your documents for consistency and completeness before anything is submitted."],
    ["receipt", "Fixed, transparent fees", "£109 for tourist visa applications. £40 for ESTA, eTA and electronic travel authorisations. No hidden charges."],
    ["shield-check", "No approval guarantee", "We are honest about what we can and cannot do. We prepare your application; the decision rests with the relevant authority."],
    ["globe", "Wide destination coverage", "We handle applications for a broad range of countries. Check with us if you have a specific destination in mind."],
    ["lock", "Your data, protected", "Axis Visa is registered with the ICO. Your documents are handled under UK GDPR data protection standards."],
  ];

  return (
    <section id="why" style={{ background: "var(--paper)", padding: SECTION_PAD }}>
      <div style={{ ...WRAP, display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: 64, alignItems: "start" }} className="why-grid">
        <div>
          <Reveal><Eyebrow style={{ marginBottom: 18 }}>Why Axis Visa</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="h2" style={{ margin: "0 0 18px" }}>You apply. We handle the rest.</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="lead" style={{ fontSize: 19, margin: 0 }}>
              Apply online, upload your documents, and Axis Visa takes care of the application
              through to submission — so you don't have to work it out yourself.
            </p>
          </Reveal>
        </div>
        <Stagger step={80} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }} className="why-cells">
          {points.map(([ic, t, d]) =>
            <div key={t} style={{ background: "var(--card)", padding: "26px 24px", height: "100%", boxSizing: "border-box" }}>
              <Icon name={ic} size={21} color="var(--stamp-deep)" style={{ marginBottom: 14 }} />
              <div style={{ fontFamily: "var(--font-text)", fontWeight: 600, fontSize: 16, color: "var(--fg-1)", marginBottom: 8, lineHeight: 1.3 }}>{t}</div>
              <p style={{ margin: 0, fontSize: 14, color: "var(--fg-2)", lineHeight: 1.56 }}>{d}</p>
            </div>
          )}
        </Stagger>
      </div>
    </section>
  );
}

function FAQItem({ q, a, open, onToggle }) {
  const ref = React.useRef(null);
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button onClick={onToggle} style={{
        width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
        padding: "26px 0", display: "flex", justifyContent: "space-between", gap: 24, alignItems: "center",
        fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, letterSpacing: "-.015em", color: "var(--ink)"
      }}>
        <span style={{ textWrap: "pretty" }}>{q}</span>
        <span style={{
          flexShrink: 0, width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--line-strong)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform var(--dur) var(--ease), border-color var(--dur) var(--ease), background var(--dur) var(--ease)",
          transform: open ? "rotate(180deg)" : "none",
          background: open ? "var(--stamp-tint)" : "transparent",
          borderColor: open ? "var(--stamp)" : "var(--line-strong)"
        }}>
          <Icon name="chevron-down" size={17} color={open ? "var(--stamp-deep)" : "var(--fg-2)"} />
        </span>
      </button>
      <div style={{ overflow: "hidden", height: open ? ref.current ? ref.current.scrollHeight : "auto" : 0, transition: "height 360ms cubic-bezier(0.2,0,0,1)" }}>
        <div ref={ref} style={{ paddingBottom: 28, maxWidth: 720 }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.62, color: "var(--fg-2)" }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const faqs = [
    ["Do you guarantee my visa will be approved?",
      "No. Visa decisions are made entirely by the relevant embassy, consulate, airline or immigration authority — not by Axis Visa. We prepare and submit your application as accurately and completely as possible, but we cannot influence or guarantee the outcome."],
    ["What countries do you cover?",
      "We handle tourist visa applications for a wide range of destinations, as well as ESTA (United States), eTA (Canada), and other electronic travel authorisations. We do not provide any service for UK visas or UK entry clearance. Contact us at contact@axisvisahq.com for destination-specific enquiries."],
    ["What is included in the £109 tourist visa service?",
      "The £109 fee covers our service for preparing and submitting your tourist visa application — reviewing your documents, organising your supporting materials, preparing the application form, and submitting it on your behalf. Official visa fees payable to the embassy or authority are separate and charged at cost."],
    ["What is included in the £40 ESTA / ETA charge?",
      "The £40 flat charge covers our service for completing and submitting your ESTA, eTA or electronic travel authorisation application. The official government fee (where applicable) is included within the £40 charge at cost. No hidden extras."],
    ["Do you handle UK visas?",
      "No. Axis Visa does not provide any application or immigration services for UK entry clearance. We do not handle UK visitor visas or any other UK immigration matter."],
    ["How do I start my application?",
      "Use the selector at the top of the page. Select your passport country and your destination, then click 'Start my application'. You'll be shown a summary of the route, the applicable fee, and a link to complete payment and upload your documents. We'll take it from there."],
  ];

  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" style={{ background: "var(--paper)", padding: SECTION_PAD }}>
      <div style={{ ...WRAP, maxWidth: 980 }}>
        <Reveal><Eyebrow style={{ marginBottom: 18 }}>Questions</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="h2" style={{ margin: "0 0 40px" }}>Clear answers, before you ask.</h2>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ borderTop: "2px solid var(--ink)" }}>
            {faqs.map(([q, a], i) =>
              <FAQItem key={i} q={q} a={a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA({ onStart }) {
  return (
    <section style={{ background: "var(--stamp)", padding: "92px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", borderTop: "1px solid rgba(255,255,255,.22)", pointerEvents: "none" }} />
      <Reveal as="div" style={{ ...WRAP, textAlign: "center", position: "relative" }}>
        <div style={{ fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.82)", marginBottom: 22 }}>
          Ready to start?
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,3.8vw,50px)", letterSpacing: "-.03em", lineHeight: 1.08, color: "#fff", margin: "0 auto", maxWidth: 760, textWrap: "balance" }}>
          Apply online. We handle the application.
        </h2>
        <p style={{ margin: "20px auto 0", maxWidth: 520, fontSize: 17.5, lineHeight: 1.55, color: "rgba(255,255,255,.9)" }}>
          Select your passport and destination above, upload your documents, and let Axis Visa handle the rest.
        </p>
        <div style={{ marginTop: 36, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <Btn variant="secondary" paper size="lg" onClick={onStart} style={{ background: "var(--paper)", color: "var(--ink)", borderColor: "var(--paper)" }}>
            Start my application <Icon name="arrow-right" size={18} />
          </Btn>
          <Btn variant="ghost" paper size="lg" onClick={() => scrollToId("process")}>See how it works</Btn>
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { WhyAxis, FAQ, FinalCTA, SECTION_PAD });
