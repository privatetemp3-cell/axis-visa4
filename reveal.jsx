// Axis Visa — scroll reveal + parallax system
// Reveals are driven by CSS classes toggled imperatively (via ref), NOT by
// React-managed inline styles — so App re-renders (scroll/modal state) can't
// reconcile opacity/transform back to hidden. Robust in the preview iframe.
// Respects reduced-motion.

(function injectRevealCSS() {
  if (document.getElementById("ax-reveal-css")) return;
  const s = document.createElement("style");
  s.id = "ax-reveal-css";
  s.textContent = `
    .ax-rv { opacity: 0; transform: translateY(var(--ax-ry, 16px));
      transition: opacity 760ms cubic-bezier(0.2,0,0,1), transform 760ms cubic-bezier(0.2,0,0,1);
      transition-delay: var(--ax-rd, 0ms); will-change: opacity, transform; }
    .ax-rv.ax-show { opacity: 1; transform: translateY(0); }
    @media (prefers-reduced-motion: reduce) {
      .ax-rv { opacity: 1 !important; transform: none !important; transition: none !important; }
    }
    html[data-ax-reduce="1"] .ax-rv { opacity: 1 !important; transform: none !important; transition: none !important; }
  `;
  (document.head || document.documentElement).appendChild(s);
})();

const prefersReducedMotion = () =>
  window.__axisReduceMotion === true ||
  (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

// ---- shared reveal registry: one rAF-throttled scroll listener for all ----
const _revealReg = new Set();
let _revealRAF = null;

function _getRoot() {
  const el = document.getElementById("scrollroot");
  if (el) {
    const ov = getComputedStyle(el).overflowY;
    if (ov === "auto" || ov === "scroll") return el;
  }
  return window;
}

function _checkReveals() {
  _revealRAF = null;
  const vh = window.innerHeight;
  _revealReg.forEach((entry) => {
    const el = entry.el;
    if (!el || !el.isConnected) { _revealReg.delete(entry); return; }
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.92 && rect.bottom > -40) {
      el.classList.add("ax-show");
      if (entry.once) _revealReg.delete(entry);
    }
  });
}
function _scheduleCheck() { if (_revealRAF == null) _revealRAF = requestAnimationFrame(_checkReveals); }

if (typeof window !== "undefined" && !window.__axisRevealInit) {
  window.__axisRevealInit = true;
  const attach = () => {
    const root = _getRoot();
    const tgt = root === window ? window : root;
    tgt.addEventListener("scroll", _scheduleCheck, { passive: true });
    window.addEventListener("resize", _scheduleCheck, { passive: true });
  };
  attach();
  setTimeout(attach, 60);
  setTimeout(_scheduleCheck, 90);
}

function Reveal({ children, delay = 0, y = 16, once = true, style, className = "", as = "div", ...rest }) {
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ax-ry", y + "px");
    el.style.setProperty("--ax-rd", delay + "ms");
    el.classList.add("ax-rv");
    if (prefersReducedMotion()) { el.classList.add("ax-show"); return; }
    const entry = { el, once };
    _revealReg.add(entry);
    // immediate check for content already in view on load
    const vh = window.innerHeight;
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.97 && rect.bottom > -40) {
      // next frame so the transition runs from hidden → shown
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("ax-show")));
      if (once) _revealReg.delete(entry);
    } else {
      _scheduleCheck();
    }
    // failsafe: never leave content invisible
    const fs = setTimeout(() => { el.classList.add("ax-show"); _revealReg.delete(entry); }, 3200);
    return () => { _revealReg.delete(entry); clearTimeout(fs); };
  }, [once, delay, y]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}

// Stagger: reveals each child in sequence with a step delay.
function Stagger({ children, step = 90, y = 18, baseDelay = 0, style, className }) {
  const arr = React.Children.toArray(children);
  return (
    <div style={style} className={className}>
      {arr.map((child, i) => (
        <Reveal key={i} delay={baseDelay + i * step} y={y} style={{ height: "100%" }}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

// Parallax: gentle translateY based on scroll. Disabled under reduced-motion.
function useParallax(ref, strength = 0.12) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const root = _getRoot();
    let raf = null;
    const update = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const offset = (rect.top + rect.height / 2 - vh / 2);
      el.style.transform = `translate3d(0, ${(-offset * strength).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update); };
    update();
    const tgt = root === window ? window : root;
    tgt.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    setTimeout(update, 60);
    return () => { tgt.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [ref, strength]);
}

Object.assign(window, { Reveal, Stagger, useParallax, prefersReducedMotion });
