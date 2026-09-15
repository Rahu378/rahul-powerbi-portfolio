import { AnimatePresence, motion } from "framer-motion";
import {
  Building2, CheckCircle2, FastForward, FileText, MapPin, MessageSquare, Rewind,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PageShell from "../components/PageShell";
import { Chip, Reveal, SectionHeading } from "../components/ui";
import { jobs } from "../data/profile";

type Mode = "chat" | "resume";

export default function Experience() {
  const [activeId, setActiveId] = useState(jobs[0].id);
  const [mode, setMode] = useState<Mode>("chat");
  const job = jobs.find((j) => j.id === activeId)!;

  // progressive message reveal
  const [shown, setShown] = useState(0);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShown(0);
    if (mode !== "chat") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setShown(job.thread.length); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= job.thread.length) clearInterval(id);
    }, 820);
    return () => clearInterval(id);
  }, [activeId, mode, job.thread.length]);

  return (
    <PageShell className="pt-[120px]">
      <section className="shell-wide">
        <SectionHeading
          eyebrow="04 / Professional experience"
          title="Three enterprises, "
          accentWord="one conversation"
          lead="Every role started the same way: somebody frustrated, describing a problem in business language. These are those conversations, and what got built in response. Prefer the formal version? Switch to résumé mode."
        />

        {/* ───────────── Timeline strip ───────────── */}
        <Reveal delay={0.2}>
          <div className="mt-12">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-faint">
              <span>Jun 2019</span><span>Present</span>
            </div>
            <div className="relative flex h-14 gap-1.5 overflow-hidden rounded-xl p-1.5"
              style={{ border: "1px solid var(--border)", background: "var(--panel)" }}>
              {[...jobs].reverse().map((j) => {
                const active = j.id === activeId;
                const weight = j.id === "appworks" ? 1.0 : j.id === "dxc" ? 0.42 : 0.6;
                return (
                  <motion.button
                    key={j.id}
                    onClick={() => setActiveId(j.id)}
                    data-cursor={j.short}
                    className="group relative flex items-center overflow-hidden rounded-lg px-3 text-left"
                    style={{
                      flex: weight,
                      background: active
                        ? `color-mix(in oklab, ${j.accent} 20%, transparent)`
                        : "color-mix(in oklab, var(--text) 4%, transparent)",
                      border: `1px solid ${active ? `color-mix(in oklab, ${j.accent} 45%, transparent)` : "transparent"}`,
                    }}
                    whileHover={{ scale: 1.005 }}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-semibold"
                        style={{ color: active ? j.accent : "var(--text-muted)" }}>
                        {j.short}
                      </span>
                      <span className="block truncate font-mono text-[9px] tracking-wide text-faint">{j.period}</span>
                    </span>
                    {j.current && (
                      <span className="pulse-dot absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--mint)", color: "var(--mint)" }} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ───────────── Main panel ───────────── */}
        <div className="mt-8 grid gap-6 pb-24 lg:grid-cols-[380px_1fr]">
          {/* company card */}
          <div className="lg:sticky lg:top-[92px] lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={job.id}
                id={job.id}
                initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="card overflow-hidden"
              >
                <div className="relative px-6 pt-6 pb-5"
                  style={{ background: `linear-gradient(160deg, color-mix(in oklab, ${job.accent} 15%, transparent), transparent 70%)` }}>
                  <div className="flex items-start gap-3.5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-[15px] font-extrabold tracking-tight"
                      style={{ background: `color-mix(in oklab, ${job.accent} 18%, transparent)`, border: `1px solid color-mix(in oklab, ${job.accent} 38%, transparent)`, color: job.accent }}>
                      {job.initials}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[17px] leading-tight font-bold tracking-tight">{job.company}</h3>
                      <p className="mt-1 text-[13px] font-medium" style={{ color: job.accent }}>{job.role}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Chip tone="default">{job.period}</Chip>
                    {job.current
                      ? <Chip tone="mint">● Current</Chip>
                      : <Chip tone="default">{job.duration}</Chip>}
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <p className="flex items-start gap-2 text-[12px] text-faint">
                    <MapPin size={13} className="mt-0.5 shrink-0" /> {job.location}
                  </p>
                  <p className="mt-2 text-[12px] text-faint">{job.domain}</p>
                  <p className="mt-4 text-[13.5px] leading-[1.65] text-muted">{job.headline}</p>

                  <p className="eyebrow mt-6 mb-2.5">Stack in play</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.stack.map((t) => (
                      <span key={t} className="rounded-md px-2 py-1 font-mono text-[10px] tracking-wide"
                        style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* mode switch */}
            <div className="mt-4 flex rounded-full p-1" style={{ border: "1px solid var(--border)", background: "var(--panel)" }}>
              {([["chat", MessageSquare, "Conversation"], ["resume", FileText, "Résumé"]] as const).map(([m, Icon, label]) => (
                <button key={m} onClick={() => setMode(m)} data-cursor={label}
                  className="relative flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[12px] font-medium"
                  style={{ color: mode === m ? "#0b0f1a" : "var(--text-muted)" }}>
                  {mode === m && (
                    <motion.span layoutId="exp-mode" className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: "var(--accent)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                  )}
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* thread / résumé */}
          <div ref={threadRef}>
            <AnimatePresence mode="wait">
              {mode === "chat" ? (
                <motion.div key={`chat-${job.id}`}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="card overflow-hidden">
                  {/* thread header */}
                  <div className="flex items-center justify-between px-5 py-3.5"
                    style={{ borderBottom: "1px solid var(--border)", background: "var(--panel)" }}>
                    <div className="flex items-center gap-3">
                      <span className="relative grid h-9 w-9 place-items-center rounded-full"
                        style={{ background: `color-mix(in oklab, ${job.accent} 16%, transparent)`, border: `1px solid color-mix(in oklab, ${job.accent} 34%, transparent)` }}>
                        <Building2 size={15} style={{ color: job.accent }} />
                        <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full"
                          style={{ background: "var(--mint)", border: "2px solid var(--panel-solid)" }} />
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold">{job.company} · Stakeholders</p>
                        <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-faint">
                          {shown < job.thread.length ? "typing…" : `${job.thread.length} messages`}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => setShown(0)} aria-label="Replay conversation" data-cursor="Replay"
                        className="grid h-8 w-8 place-items-center rounded-full transition-colors"
                        style={{ border: "1px solid var(--border)", color: "var(--text-faint)" }}>
                        <Rewind size={13} />
                      </button>
                      <button onClick={() => setShown(job.thread.length)} aria-label="Show all messages" data-cursor="Skip"
                        className="grid h-8 w-8 place-items-center rounded-full transition-colors"
                        style={{ border: "1px solid var(--border)", color: "var(--text-faint)" }}>
                        <FastForward size={13} />
                      </button>
                    </div>
                  </div>

                  {/* messages */}
                  <div className="flex flex-col gap-3 px-4 py-6 sm:px-6"
                    style={{ background: "color-mix(in oklab, var(--text) 2%, transparent)", minHeight: 520 }}>
                    {job.thread.slice(0, shown).map((m, i) => {
                      const mine = m.from === "me";
                      return (
                        <motion.div
                          key={`${job.id}-${i}`}
                          initial={{ opacity: 0, y: 14, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                          className={`flex ${mine ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[84%] sm:max-w-[74%] ${mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                            {!mine && i === 0 && (
                              <span className="ml-1 font-mono text-[9px] tracking-[0.16em] uppercase text-faint">
                                Business stakeholder
                              </span>
                            )}
                            {mine && i > 0 && job.thread[i - 1].from !== "me" && (
                              <span className="mr-1 font-mono text-[9px] tracking-[0.16em] uppercase" style={{ color: job.accent }}>
                                Rahul
                              </span>
                            )}
                            <div className={`${mine ? "bubble-out" : "bubble-in"} px-4 py-3`}
                              style={mine ? { borderColor: `color-mix(in oklab, ${job.accent} 36%, transparent)`, background: `linear-gradient(135deg, color-mix(in oklab, ${job.accent} 20%, var(--panel-solid)), color-mix(in oklab, ${job.accent} 7%, var(--panel-solid)))` } : undefined}>
                              <p className="text-[13.5px] leading-[1.62]">{m.text}</p>
                              <div className="mt-1.5 flex items-center justify-end gap-1.5">
                                {m.kind === "stack" && <Chip tone="cyan">stack</Chip>}
                                {m.kind === "metric" && <Chip tone="mint">delivered</Chip>}
                                <span className="font-mono text-[9px] text-faint">{m.time}</span>
                                {mine && <CheckCircle2 size={10} style={{ color: "var(--mint)" }} />}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {shown < job.thread.length && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className={`flex ${job.thread[shown]?.from === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`${job.thread[shown]?.from === "me" ? "bubble-out" : "bubble-in"} typing px-4 py-3.5`}>
                          <span /><span /><span />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div key={`resume-${job.id}`}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="card overflow-hidden">
                  <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
                    <p className="text-[14px] font-semibold">{job.role} · {job.company}</p>
                    <p className="mt-0.5 font-mono text-[10px] tracking-[0.16em] uppercase text-faint">
                      {job.period} · {job.bullets.length} responsibilities
                    </p>
                  </div>
                  <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
                    {job.bullets.map((b, i) => (
                      <motion.li key={i}
                        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.045, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="group flex gap-4 px-6 py-4 transition-colors hover:bg-[color:color-mix(in_oklab,var(--accent)_5%,transparent)]">
                        <span className="mt-0.5 font-mono text-[10px] shrink-0 text-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13.5px] leading-[1.68] text-muted transition-colors group-hover:text-[color:var(--text)]">
                          {b}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
