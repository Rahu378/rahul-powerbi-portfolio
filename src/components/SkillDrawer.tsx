import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Clock, ExternalLink, Gauge, X } from "lucide-react";
import { skillCategories, skills, type Skill } from "../data/profile";
import { useLockScroll } from "../lib/hooks";
import CodeBlock from "./CodeBlock";
import { Chip, Meter } from "./ui";

export default function SkillDrawer({
  skillId, onClose, onSelect,
}: { skillId: string | null; onClose: () => void; onSelect: (id: string) => void }) {
  const skill: Skill | undefined = skills.find((s) => s.id === skillId);
  useLockScroll(!!skill);

  const cat = skill ? skillCategories.find((c) => c.id === skill.category) : undefined;
  const related = skill
    ? skills.filter((s) => s.category === skill.category && s.id !== skill.id).slice(0, 5)
    : [];

  return (
    <AnimatePresence>
      {skill && (
        <motion.div className="fixed inset-0 z-[95]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0" onClick={onClose}
            style={{ background: "rgba(2,4,10,.6)", backdropFilter: "blur(8px)" }} />

          <motion.aside
            role="dialog" aria-modal="true" aria-label={`${skill.name} details`}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col overflow-y-auto"
            style={{ background: "var(--panel-solid)", borderLeft: "1px solid var(--border-strong)", boxShadow: "var(--shadow-lg)" }}
          >
            {/* top ribbon */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
              style={{ background: "color-mix(in oklab, var(--panel-solid) 92%, transparent)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ background: cat?.accent }} />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-faint">{cat?.name}</span>
              </div>
              <button onClick={onClose} aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full transition-colors"
                style={{ border: "1px solid var(--border)" }}>
                <X size={15} />
              </button>
            </div>

            <div className="px-6 pt-5 pb-10">
              <motion.h3
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.5 }}
                className="display text-[clamp(1.75rem,4.4vw,2.35rem)]">
                {skill.name}
              </motion.h3>

              {/* stat row */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.5 }}
                className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl px-4 py-3" style={{ border: "1px solid var(--border)", background: "var(--panel)" }}>
                  <div className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.16em] uppercase text-faint">
                    <Gauge size={11} /> Depth
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-1">
                    <span className="text-[26px] font-bold tracking-tight" style={{ color: cat?.accent, fontVariantNumeric: "tabular-nums" }}>{skill.level}</span>
                    <span className="text-[12px] text-faint">/ 100</span>
                  </div>
                  <div className="mt-2"><Meter value={skill.level} color={cat?.accent} delay={0.2} /></div>
                </div>
                <div className="rounded-xl px-4 py-3" style={{ border: "1px solid var(--border)", background: "var(--panel)" }}>
                  <div className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.16em] uppercase text-faint">
                    <Clock size={11} /> In production
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-1">
                    <span className="text-[26px] font-bold tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>{skill.years}</span>
                    <span className="text-[12px] text-faint">years</span>
                  </div>
                  <p className="mt-2 text-[11px] leading-snug text-faint">Used on live, business-critical reporting.</p>
                </div>
              </motion.div>

              {/* narrative */}
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-6 text-[14.5px] leading-[1.75] text-muted">
                {skill.blurb}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.5 }}
                className="mt-5 rounded-xl p-4"
                style={{ border: `1px solid color-mix(in oklab, ${cat?.accent} 26%, transparent)`, background: `color-mix(in oklab, ${cat?.accent} 7%, transparent)` }}>
                <div className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.16em] uppercase" style={{ color: cat?.accent }}>
                  <BadgeCheck size={12} /> Where it showed up
                </div>
                <p className="mt-2 text-[13px] leading-relaxed">{skill.proof}</p>
              </motion.div>

              {skill.snippet && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.5 }}
                  className="mt-6">
                  <p className="eyebrow mb-2.5">How it looks in practice</p>
                  <CodeBlock code={skill.snippet.code} lang={skill.snippet.lang} />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.5 }}
                className="mt-6 flex flex-wrap gap-2">
                {skill.tags.map((t) => <Chip key={t}>{t}</Chip>)}
              </motion.div>

              {skill.link && (
                <motion.a
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                  href={skill.link} target="_blank" rel="noopener noreferrer" data-cursor="Open docs"
                  className="mt-6 flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors"
                  style={{ border: "1px solid var(--border)", background: "var(--panel)" }}>
                  <span className="flex items-center gap-2.5 text-[13px]">
                    <ExternalLink size={14} style={{ color: cat?.accent }} />
                    Official documentation
                  </span>
                  <ArrowUpRight size={15} style={{ color: "var(--text-faint)" }} />
                </motion.a>
              )}

              {related.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44, duration: 0.5 }}
                  className="mt-8">
                  <p className="eyebrow mb-3">Sits next to</p>
                  <div className="flex flex-wrap gap-2">
                    {related.map((r) => (
                      <button key={r.id} onClick={() => onSelect(r.id)} data-cursor="Open"
                        className="rounded-full px-3 py-1.5 text-[12px] transition-colors"
                        style={{ border: "1px solid var(--border)", background: "var(--panel)" }}>
                        {r.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
