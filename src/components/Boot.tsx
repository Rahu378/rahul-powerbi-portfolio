import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  "Establishing gateway connection",
  "Loading semantic model",
  "Evaluating DAX measures",
  "Applying row-level security",
  "Rendering canvas",
];

/** A short BI-flavoured cold-start sequence. Runs once per browser session. */
export default function Boot({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(() => {
    try { return sessionStorage.getItem("rr-booted") !== "1"; } catch { return true; }
  });
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!show) { onDone(); return; }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 600 : 2150;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / total);
      setPct(p * 100);
      setStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try { sessionStorage.setItem("rr-booted", "1"); } catch { /* ignore */ }
        setTimeout(() => { setShow(false); onDone(); }, 420);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center"
          style={{ background: "var(--bg)" }}
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 grid-bg grid-fade opacity-60" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            <div className="flex items-end gap-1.5" aria-hidden>
              {[18, 34, 26, 48, 38, 58].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-2.5 rounded-t-[3px]"
                  style={{ background: i % 2 ? "var(--cyan)" : "var(--accent)", opacity: 0.85 }}
                  initial={{ height: 4 }}
                  animate={{ height: [4, h, h * 0.62, h] }}
                  transition={{ duration: 1.5, delay: i * 0.09, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
              ))}
            </div>

            <p className="mt-8 text-[15px] font-semibold tracking-tight">Rahul Reddy CH</p>
            <p className="mt-1 font-mono text-[9.5px] tracking-[0.28em] uppercase text-faint">Power BI Developer</p>

            <div className="mt-8 h-[2px] w-[min(280px,62vw)] overflow-hidden rounded-full"
              style={{ background: "color-mix(in oklab, var(--text) 12%, transparent)" }}>
              <div className="h-full rounded-full"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--accent), var(--cyan))", transition: "width .1s linear" }} />
            </div>

            <div className="mt-4 h-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="font-mono text-[10px] tracking-[0.14em] uppercase text-faint"
                >
                  {STEPS[step]}<span className="tick">_</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
