// Axis Visa — Landing page · shared primitives

function Mark({ size = 34, paper = false }) {
  const stroke = paper ? "#F4F6FB" : "var(--ink)";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ display: "block" }}>
      <circle cx="24" cy="24" r="14.5" stroke={stroke} strokeWidth="2" />
      <line x1="2" y1="24" x2="46" y2="24" stroke={stroke} strokeWidth="2" />
      <circle cx="38.5" cy="24" r="3.5" fill="var(--stamp)" />
    </svg>
  );
}

function Logo({ paper = false, size = 21, tagline = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <Mark size={size * 1.45} paper={paper} />
      <div>
        <div style={{
          fontFamily: "var(--font-wordmark)", fontWeight: 500, fontSize: size,
          letterSpacing: ".02em", lineHeight: 1, textTransform: "uppercase",
          color: paper ? "var(--paper)" : "var(--ink)", whiteSpace: "nowrap",
        }}>Axis Visa</div>
        {tagline && (
          <div style={{
            fontFamily: "var(--font-label)", fontSize: 9.5, letterSpacing: ".22em", fontWeight: 600,
            textTransform: "uppercase", color: "var(--stamp-deep)", marginTop: 4,
          }}>Visa application service</div>
        )}
      </div>
    </div>
  );
}

function Eyebrow({ children, style, onInk = false }) {
  return (
    <div style={{
      fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 700,
      letterSpacing: ".18em", textTransform: "uppercase",
      color: onInk ? "var(--stamp)" : "var(--stamp-deep)",
      fontVariantNumeric: "tabular-nums", ...style,
    }}>{children}</div>
  );
}

function Btn({ children, variant = "primary", onClick, paper = false, size = "md", style, type = "button" }) {
  const [h, setH] = React.useState(false);
  const pad = size === "lg" ? "15px 28px" : size === "sm" ? "10px 18px" : "13px 24px";
  const fs = size === "lg" ? 16 : size === "sm" ? 14 : 15;
  const base = {
    fontFamily: "var(--font-text)", fontSize: fs, fontWeight: 600,
    borderRadius: "var(--r-sm)", padding: pad, cursor: "pointer",
    border: "1px solid transparent", display: "inline-flex", alignItems: "center",
    gap: 9, lineHeight: 1, whiteSpace: "nowrap",
    transition: "transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease), background var(--dur) var(--ease)",
    transform: h ? "translateY(-1px)" : "translateY(0)", ...style,
  };
  const variants = {
    primary: { background: h ? "var(--stamp-deep)" : "var(--stamp)", color: "#fff", boxShadow: h ? "var(--shadow-md)" : "none" },
    secondary: paper
      ? { background: h ? "var(--paper)" : "transparent", color: h ? "var(--ink)" : "var(--paper)", borderColor: h ? "var(--paper)" : "rgba(244,246,251,.45)" }
      : { background: h ? "var(--ink)" : "transparent", color: h ? "var(--paper)" : "var(--ink)", borderColor: h ? "var(--ink)" : "var(--line-strong)" },
    ghost: { background: "transparent", color: h ? "var(--stamp-deep)" : (paper ? "var(--paper)" : "var(--ink)"), padding: size === "sm" ? "10px 6px" : "13px 6px", transform: "none" },
  };
  return (
    <button type={type} style={{ ...base, ...variants[variant] }} onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>{children}</button>
  );
}

function Icon({ name, size = 18, color = "currentColor", style }) {
  return <i data-lucide={name} style={{ width: size, height: size, color, display: "inline-flex", ...style }}></i>;
}

const WRAP = { maxWidth: 1200, margin: "0 auto", padding: "0 40px", width: "100%", boxSizing: "border-box" };

// ---- Form field primitives (used by forms) ----

function Field({ label, hint, children, required }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <span style={{ fontFamily: "var(--font-text)", fontSize: 13.5, fontWeight: 600, color: "var(--fg-1)", letterSpacing: "-.005em" }}>
        {label}{required && <span style={{ color: "var(--stamp-deep)", marginLeft: 4 }}>*</span>}
      </span>
      {children}
      {hint && <span style={{ fontSize: 12, color: "var(--fg-3)", lineHeight: 1.4 }}>{hint}</span>}
    </label>
  );
}

const fieldStyle = (invalid = false) => ({
  fontFamily: "var(--font-text)", fontSize: 15, color: "var(--fg-1)",
  background: "var(--paper)", border: `1px solid ${invalid ? "var(--danger)" : "var(--line-strong)"}`,
  borderRadius: "var(--r-sm)", padding: "11px 13px", width: "100%", boxSizing: "border-box",
  outline: "none", transition: "border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)",
});

function TextInput({ value, onChange, placeholder, type = "text", invalid }) {
  const [f, setF] = React.useState(false);
  return (
    <input
      type={type} value={value} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ ...fieldStyle(invalid), borderColor: invalid ? "var(--danger)" : f ? "var(--stamp)" : "var(--line-strong)", boxShadow: f && !invalid ? "0 0 0 3px var(--stamp-tint)" : "none" }}
    />
  );
}

function SelectInput({ value, onChange, options, placeholder, invalid }) {
  const [f, setF] = React.useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ ...fieldStyle(invalid), appearance: "none", cursor: "pointer",
          color: value ? "var(--fg-1)" : "var(--fg-3)",
          borderColor: invalid ? "var(--danger)" : f ? "var(--stamp)" : "var(--line-strong)", boxShadow: f && !invalid ? "0 0 0 3px var(--stamp-tint)" : "none", paddingRight: 36 }}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <i data-lucide="chevron-down" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--fg-3)", pointerEvents: "none" }}></i>
    </div>
  );
}

function ChoiceRow({ value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => {
        const on = value === o;
        return (
          <button key={o} type="button" onClick={() => onChange(o)} style={{
            flex: "1 1 auto", minWidth: 0, textAlign: "center", padding: "11px 14px", cursor: "pointer",
            fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap",
            background: on ? "var(--stamp-tint)" : "var(--paper)", color: on ? "var(--stamp-deep)" : "var(--fg-2)",
            border: `1px solid ${on ? "var(--stamp)" : "var(--line-strong)"}`, borderRadius: "var(--r-sm)",
            transition: "all var(--dur) var(--ease)",
          }}>{o}</button>
        );
      })}
    </div>
  );
}

Object.assign(window, { Mark, Logo, Eyebrow, Btn, Icon, WRAP, Field, TextInput, SelectInput, ChoiceRow });
