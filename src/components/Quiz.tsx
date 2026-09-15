import { AnimatePresence, motion } from "framer-motion";
import { Check, RotateCcw, X } from "lucide-react";
import { useState } from "react";

const QUESTIONS = [
  {
    q: "A report opens in 14 seconds. Where do you look first?",
    options: [
      "Reduce the number of visuals on the page",
      "Performance Analyzer, then DAX Studio server timings",
      "Switch the dataset to DirectQuery",
      "Add more RAM to the gateway",
    ],
    answer: 1,
    why: "Profile before you touch anything. Performance Analyzer tells you which visual is slow; DAX Studio server timings tell you whether it's the storage engine (a model problem) or the formula engine (a DAX problem). Every other option is a guess.",
  },
  {
    q: "Your fact table has a datetime column at the second. What happens?",
    options: [
      "Nothing, VertiPaq handles it fine",
      "Time intelligence gets faster",
      "Cardinality explodes and the model balloons",
      "Query folding breaks",
    ],
    answer: 2,
    why: "VertiPaq compresses by column cardinality. A second-level datetime can be the single largest column in the model. Split it into a date key and a time key, and the model often shrinks by a third.",
  },
  {
    q: "Which of these silently breaks query folding?",
    options: [
      "Filtering rows early",
      "Removing columns",
      "Adding a custom column with Table.Buffer",
      "Changing a column type",
    ],
    answer: 2,
    why: "Table.Buffer forces the data into memory, so every step after it stops folding back to the source. A refresh that took 90 seconds can quietly become 40 minutes.",
  },
];

export default function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[i];

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (i === QUESTIONS.length - 1) { setDone(true); return; }
    setI((n) => n + 1);
    setPicked(null);
  };

  const reset = () => { setI(0); setPicked(null); setScore(0); setDone(false); };

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <p className="text-[13.5px] font-semibold">Three questions I'd ask in an interview</p>
          <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.14em] uppercase text-faint">
            {done ? "Complete" : `Question ${i + 1} of ${QUESTIONS.length}`}
          </p>
        </div>
        <div className="flex gap-1">
          {QUESTIONS.map((_, n) => (
            <span key={n} className="h-1.5 w-6 rounded-full transition-colors duration-500"
              style={{ background: n <= i || done ? "var(--accent)" : "color-mix(in oklab, var(--text) 12%, transparent)" }} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="px-6 py-10 text-center">
            <p className="text-[clamp(2.6rem,6vw,3.6rem)] leading-none font-extrabold tracking-tight amber-text">
              {score}/{QUESTIONS.length}
            </p>
            <p className="mt-4 text-[14px] font-semibold">
              {score === 3 ? "You've been in the VertiPaq trenches." : score === 2 ? "Solid instincts." : "Worth a conversation."}
            </p>
            <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted">
              These are the questions that separate someone who can build a chart from someone who can keep a
              200-user dataset fast, governed and trusted for three years.
            </p>
            <button onClick={reset}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[12.5px] font-medium"
              style={{ border: "1px solid var(--border-strong)" }}>
              <RotateCcw size={13} /> Run it again
            </button>
          </motion.div>
        ) : (
          <motion.div key={i}
            initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-6">
            <p className="text-[16px] leading-snug font-semibold tracking-tight">{q.q}</p>

            <div className="mt-5 grid gap-2">
              {q.options.map((o, idx) => {
                const isAnswer = idx === q.answer;
                const isPicked = picked === idx;
                const reveal = picked !== null;
                const tone = reveal && isAnswer ? "var(--mint)" : reveal && isPicked ? "var(--rose)" : "var(--border)";
                return (
                  <button key={idx} onClick={() => choose(idx)} disabled={reveal}
                    data-cursor={reveal ? undefined : "Pick"}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-[13px] transition-all duration-300"
                    style={{
                      border: `1px solid ${reveal && (isAnswer || isPicked) ? `color-mix(in oklab, ${tone} 55%, transparent)` : "var(--border)"}`,
                      background: reveal && isAnswer
                        ? "color-mix(in oklab, var(--mint) 9%, transparent)"
                        : reveal && isPicked
                        ? "color-mix(in oklab, var(--rose) 9%, transparent)"
                        : "var(--panel)",
                      opacity: reveal && !isAnswer && !isPicked ? 0.5 : 1,
                      cursor: reveal ? "default" : "pointer",
                    }}>
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full font-mono text-[10px]"
                      style={{ border: `1px solid ${reveal && (isAnswer || isPicked) ? tone : "var(--border-strong)"}`, color: reveal && (isAnswer || isPicked) ? tone : "var(--text-faint)" }}>
                      {reveal && isAnswer ? <Check size={11} /> : reveal && isPicked ? <X size={11} /> : String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{o}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {picked !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden">
                  <div className="mt-5 rounded-xl p-4"
                    style={{ border: "1px solid color-mix(in oklab, var(--accent) 26%, transparent)", background: "color-mix(in oklab, var(--accent) 7%, transparent)" }}>
                    <p className="font-mono text-[9.5px] tracking-[0.16em] uppercase" style={{ color: "var(--accent)" }}>Why</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{q.why}</p>
                  </div>
                  <button onClick={next}
                    className="mt-4 w-full rounded-full py-2.5 text-[13px] font-semibold"
                    style={{ background: "var(--accent)", color: "#0b0f1a" }}>
                    {i === QUESTIONS.length - 1 ? "See result" : "Next question"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
