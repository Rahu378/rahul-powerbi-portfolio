import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3, Boxes, Cloud, Database, Grid2X2, Landmark, Layers, LayoutList,
  Search, Sparkles, Terminal, Workflow, Wrench, X,
} from "lucide-react";
import { useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import { Chip, Meter, Reveal, SectionHeading } from "../components/ui";
import { skillCategories, skills, type SkillCategoryId } from "../data/profile";
import { useApp } from "../lib/app-context";

const ICONS: Record<string, any> = {
  BarChart3, Boxes, Cloud, Layers, Database, Workflow, Terminal, Landmark, Wrench,
};

type View = "cards" | "chart";

export default function Skills() {
  const { openSkill } = useApp();
  const [cat, setCat] = useState<SkillCategoryId | "all">("all");
  const [q, setQ] = useState("");
  const [view, setView] = useState<View>("cards");

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    return skills.filter((s) => {
      if (cat !== "all" && s.category !== cat) return false;
      if (!n) return true;
      const initials = s.name.split(/[\s/&·-]+/).filter(Boolean).map((w) => w[0]).join("").toLowerCase();
      return (
        s.name.toLowerCase().includes(n) ||
        s.id.toLowerCase().includes(n) ||
        initials.startsWith(n) ||
        s.blurb.toLowerCase().includes(n) ||
        s.proof.toLowerCase().includes(n) ||
        s.tags.some((t) => t.toLowerCase().includes(n))
      );
    });
  }, [cat, q]);

  const sortedForChart = useMemo(
    () => [...filtered].sort((a, b) => b.level - a.level),
    [filtered]
  );

  const accentFor = (id: SkillCategoryId) =>
    skillCategories.find((c) => c.id === id)?.accent ?? "var(--accent)";

  return (
    <PageShell className="pt-[120px]">
      <section className="shell-wide">
        <SectionHeading
          eyebrow="03 / Capability matrix"
          title="Every skill, "
          accentWord="explained"
          lead={`${skills.length} capabilities across ${skillCategories.length} disciplines. Nothing here is a logo on a wall. Click any one and it tells you what it is, why it matters and exactly where it showed up in production.`}
        />

        {/* ───────────── Controls ───────────── */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-[340px]">
              <Search size={15} className="absolute top-1/2 left-4 -translate-y-1/2" style={{ color: "var(--text-faint)" }} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search: try “DAX”, “refresh”, “security”…"
                aria-label="Search skills"
                className="w-full rounded-full py-3 pr-10 pl-11 text-[13px] outline-none transition-colors placeholder:text-[color:var(--text-faint)]"
                style={{ border: "1px solid var(--border)", background: "var(--panel)" }}
              />
              {q && (
                <button onClick={() => setQ("")} aria-label="Clear search"
                  className="absolute top-1/2 right-3.5 -translate-y-1/2" style={{ color: "var(--text-faint)" }}>
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[10.5px] tracking-wide text-faint">
                {filtered.length} of {skills.length}
              </span>
              <div className="flex rounded-full p-1" style={{ border: "1px solid var(--border)", background: "var(--panel)" }}>
                {([["cards", Grid2X2, "Cards"], ["chart", LayoutList, "Chart"]] as const).map(([v, Icon, label]) => (
                  <button key={v} onClick={() => setView(v)} data-cursor={label}
                    className="relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium"
                    style={{ color: view === v ? "#0b0f1a" : "var(--text-muted)" }}>
                    {view === v && (
                      <motion.span layoutId="view-pill" className="absolute inset-0 -z-10 rounded-full"
                        style={{ background: "var(--accent)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                    )}
                    <Icon size={13} /> {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ───────────── Category rail ───────────── */}
        <Reveal delay={0.26}>
          <div className="scrollbar-none mt-5 flex gap-2 overflow-x-auto pb-2">
            <CatBtn active={cat === "all"} onClick={() => setCat("all")} label="All" count={skills.length} accent="var(--accent)" />
            {skillCategories.map((c) => {
              const Icon = ICONS[c.icon] ?? Sparkles;
              return (
                <CatBtn
                  key={c.id}
                  active={cat === c.id}
                  onClick={() => setCat(c.id)}
                  label={c.short}
                  count={skills.filter((s) => s.category === c.id).length}
                  accent={c.accent}
                  icon={<Icon size={13} />}
                />
              );
            })}
          </div>
        </Reveal>

        {/* active category description */}
        <AnimatePresence mode="wait">
          {cat !== "all" && (
            <motion.p
              key={cat}
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 max-w-2xl text-[13.5px] text-muted">
              <span className="font-semibold" style={{ color: accentFor(cat) }}>
                {skillCategories.find((c) => c.id === cat)?.name}
              </span>{": "}
              {skillCategories.find((c) => c.id === cat)?.desc}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ───────────── Views ───────────── */}
        <div className="mt-9 pb-24">
          <AnimatePresence mode="wait">
            {view === "cards" ? (
              <motion.div key="cards"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {filtered.map((s, i) => {
                    const accent = accentFor(s.category);
                    return (
                      <motion.button
                        key={s.id}
                        layout
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.34, delay: Math.min(i * 0.018, 0.3), ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -5 }}
                        onClick={() => openSkill(s.id)}
                        data-cursor="Explain"
                        className="card card-sheen group relative overflow-hidden p-5 text-left"
                      >
                        <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                          style={{ background: accent }} />
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-[14.5px] leading-snug font-semibold tracking-tight">{s.name}</h3>
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                        </div>

                        <p className="mt-2.5 line-clamp-3 text-[12px] leading-relaxed text-muted">{s.blurb}</p>

                        <div className="mt-4 flex items-center gap-2.5">
                          <Meter value={s.level} color={accent} height={3} delay={0.1} />
                          <span className="font-mono text-[10px] shrink-0 text-faint" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {s.level}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-faint">
                            {s.years} yrs
                          </span>
                          <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{ color: accent }}>
                            Open →
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div key="chart"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="card overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <p className="text-[13.5px] font-semibold">Capability depth by skill</p>
                    <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.14em] uppercase text-faint">
                      Sorted descending · click any bar to drill through
                    </p>
                  </div>
                  <BarChart3 size={16} style={{ color: "var(--accent)" }} />
                </div>

                <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {sortedForChart.map((s, i) => {
                    const accent = accentFor(s.category);
                    return (
                      <motion.button
                        key={s.id}
                        onClick={() => openSkill(s.id)}
                        data-cursor="Drill through"
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: Math.min(i * 0.02, 0.5), duration: 0.45 }}
                        className="group grid w-full grid-cols-[minmax(0,168px)_1fr_auto] items-center gap-4 px-5 py-2.5 text-left transition-colors hover:bg-[color:color-mix(in_oklab,var(--accent)_6%,transparent)]"
                      >
                        <span className="truncate text-[12.5px] font-medium">{s.name}</span>
                        <span className="relative h-[18px] overflow-hidden rounded-[4px]"
                          style={{ background: "color-mix(in oklab, var(--text) 5%, transparent)" }}>
                          <motion.span
                            className="absolute inset-y-0 left-0 rounded-[4px]"
                            initial={{ width: 0 }}
                            animate={{ width: `${s.level}%` }}
                            transition={{ delay: 0.1 + Math.min(i * 0.02, 0.5), duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            style={{ background: `linear-gradient(90deg, color-mix(in oklab, ${accent} 42%, transparent), ${accent})` }}
                          />
                        </span>
                        <span className="w-14 text-right font-mono text-[11px] text-muted" style={{ fontVariantNumeric: "tabular-nums" }}>
                          {s.level}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3.5" style={{ borderTop: "1px solid var(--border)" }}>
                  {skillCategories.map((c) => (
                    <span key={c.id} className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-wide uppercase text-faint">
                      <span className="h-2 w-2 rounded-[3px]" style={{ background: c.accent }} /> {c.short}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="card mt-2 px-6 py-16 text-center">
              <p className="text-[15px] font-semibold">No capability matched “{q}”.</p>
              <p className="mt-2 text-[13px] text-muted">
                Try <button onClick={() => setQ("DAX")} className="underline" style={{ color: "var(--accent)" }}>DAX</button>,{" "}
                <button onClick={() => setQ("security")} className="underline" style={{ color: "var(--accent)" }}>security</button> or{" "}
                <button onClick={() => { setQ(""); setCat("all"); }} className="underline" style={{ color: "var(--accent)" }}>reset everything</button>.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function CatBtn({
  active, onClick, label, count, accent, icon,
}: { active: boolean; onClick: () => void; label: string; count: number; accent: string; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      data-cursor="Filter"
      className="relative flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px] font-medium whitespace-nowrap transition-colors"
      style={{
        border: `1px solid ${active ? `color-mix(in oklab, ${accent} 50%, transparent)` : "var(--border)"}`,
        background: active ? `color-mix(in oklab, ${accent} 12%, transparent)` : "var(--panel)",
        color: active ? accent : "var(--text-muted)",
      }}
    >
      {icon}
      {label}
      <span className="font-mono text-[9.5px] opacity-65">{count}</span>
    </button>
  );
}
