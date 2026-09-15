import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Boxes, Command, Gauge, MousePointerClick,
  ShieldCheck, Sparkles, Workflow,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import HeroReport from "../components/HeroReport";
import { Avatar } from "../components/Portrait";
import { Chip, Counter, GlassCard, Marquee, Reveal, SplitText, Stagger, staggerChild } from "../components/ui";
import { metrics, profile, skills } from "../data/profile";
import { useApp } from "../lib/app-context";
import { ROUTES } from "../lib/routes";

/** Shown as clickable chips in the hero. Ids are resolved against `skills`. */
const FEATURED_SKILL_IDS = ["dax", "star-schema", "rls", "power-query", "databricks", "bigquery"];

const PILLARS = [
  {
    icon: Boxes, accent: "var(--accent)", title: "Architect the model",
    body: "Star schemas over SQL Server, BigQuery, Redshift and Databricks. Grain decided first, relationships single-direction, cardinality understood. This is the foundation every fast report stands on.",
    link: "/skills", cta: "See the modeling stack",
  },
  {
    icon: Gauge, accent: "var(--cyan)", title: "Make it fast, provably",
    body: "Tuned SQL, folded queries, incremental refresh and rewritten measures. On the advisory engagement that meant around 15 seconds down to under 5, with usage rising once it stopped hurting to open.",
    link: "/impact", cta: "See the numbers",
  },
  {
    icon: ShieldCheck, accent: "var(--violet)", title: "Govern it so audit passes",
    body: "Row-level security so managers see only their own data, scheduled refresh so teams stop quoting different numbers for the same period, and drill-through evidence when compliance asks.",
    link: "/about", cta: "See the principles",
  },
];

export default function Home() {
  const { openPalette, openSkill } = useApp();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const [activeMetric, setActiveMetric] = useState<string>(metrics[0].id);

  const accentMap: Record<string, string> = {
    amber: "var(--accent)", cyan: "var(--cyan)", violet: "var(--violet)", mint: "var(--mint)",
  };

  return (
    <PageShell>
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100svh] pt-[100px] pb-16">
        <motion.div style={{ y: heroY, opacity: heroFade }} className="shell-wide">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
            {/* copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="inline-flex items-center gap-2.5 rounded-full py-1.5 pr-3.5 pl-2"
                style={{ border: "1px solid color-mix(in oklab, var(--mint) 30%, transparent)", background: "color-mix(in oklab, var(--mint) 8%, transparent)" }}>
                <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--mint)", color: "var(--mint)" }} />
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--mint)" }}>
                  {profile.openTo}
                </span>
              </motion.div>

              <h1 className="display mt-7 text-[clamp(2.9rem,7.6vw,5.6rem)]">
                <SplitText text="Rahul Reddy" delay={0.45} />
                <br />
                <span className="amber-text"><SplitText text="CH" delay={0.6} /></span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.82, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 flex items-center gap-3.5">
                <Avatar size={46} />
                <span className="h-px w-8" style={{ background: "var(--accent)" }} />
                <span className="font-mono text-[clamp(0.7rem,1.1vw,0.82rem)] tracking-[0.24em] uppercase">
                  Power BI Developer
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-[58ch] text-[clamp(1.02rem,1.55vw,1.22rem)] leading-[1.65] text-muted">
                {profile.yearsExp} years delivering BI and reporting across financial services, insurance and
                enterprise operations. <span style={{ color: "var(--text)" }}>{profile.tagline}</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-9 flex flex-wrap items-center gap-3">
                <Link to="/impact" data-cursor="Explore"
                  className="shine group inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-semibold"
                  style={{ background: "var(--accent)", color: "#0b0f1a" }}>
                  See the impact
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link to="/experience" data-cursor="Read"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-medium transition-colors"
                  style={{ border: "1px solid var(--border-strong)" }}>
                  The journey <ArrowUpRight size={14} />
                </Link>
                <button onClick={openPalette} data-cursor="⌘K"
                  className="hidden items-center gap-2 rounded-full px-4 py-3 text-[12.5px] text-muted sm:inline-flex"
                  style={{ border: "1px dashed var(--border-strong)" }}>
                  <Command size={13} /> Search anything
                </button>
              </motion.div>

              {/* quick skill taste */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
                className="mt-10">
                <p className="mb-3 flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.2em] uppercase text-faint">
                  <MousePointerClick size={11} /> Click a capability
                </p>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_SKILL_IDS.map((id, i) => {
                    const skill = skills.find((s) => s.id === id);
                    if (!skill) return null;
                    return (
                      <motion.button key={id} onClick={() => openSkill(id)} data-cursor="Open"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.35 + i * 0.06, duration: 0.5 }}
                        whileHover={{ y: -2 }}
                        className="rounded-full px-3.5 py-1.5 text-[12px] transition-colors"
                        style={{ border: "1px solid var(--border)", background: "var(--panel)" }}>
                        {skill.name}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* visual */}
            <div className="flex justify-center lg:justify-end">
              <HeroReport />
            </div>
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 0.8 }}
          className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.26em] uppercase text-faint">Scroll</span>
          <span className="relative h-9 w-[1px] overflow-hidden" style={{ background: "var(--border-strong)" }}>
            <motion.span className="absolute inset-x-0 h-3"
              style={{ background: "var(--accent)" }}
              animate={{ y: ["-100%", "320%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          </span>
        </motion.div>
      </section>

      {/* ═════════════════════════════ METRICS ═════════════════════════════ */}
      <section className="shell-wide py-20">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">The short version</p>
              <h2 className="display mt-3 text-[clamp(1.7rem,3.6vw,2.6rem)]">
                Four numbers that <span className="serif-accent amber-text">actually</span> matter
              </h2>
            </div>
            <p className="max-w-[34ch] text-[13px] text-muted">
              Select one. Each is a real outcome with the technique behind it, not a rounded-up claim.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => {
            const active = activeMetric === m.id;
            const c = accentMap[m.accent];
            return (
              <Reveal key={m.id} delay={i * 0.08}>
                <GlassCard
                  as="button" onClick={() => setActiveMetric(m.id)} ariaLabel={m.label}
                  className="h-full w-full p-5"
                  style={{
                    borderColor: active ? `color-mix(in oklab, ${c} 45%, transparent)` : undefined,
                    background: active ? `color-mix(in oklab, ${c} 9%, var(--panel))` : undefined,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-faint">
                      0{i + 1}
                    </span>
                    <motion.span animate={{ rotate: active ? 45 : 0 }} transition={{ duration: 0.35 }}>
                      <ArrowUpRight size={15} style={{ color: active ? c : "var(--text-faint)" }} />
                    </motion.span>
                  </div>
                  <p className="mt-6 text-[clamp(2.4rem,4.6vw,3.2rem)] leading-none font-extrabold tracking-tight" style={{ color: c }}>
                    <Counter to={m.value} suffix={m.suffix} />
                  </p>
                  <p className="mt-2.5 text-[13.5px] font-semibold">{m.label}</p>
                  <motion.div
                    initial={false}
                    animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden">
                    <p className="pt-3 text-[12.5px] leading-relaxed text-muted">{m.detail}</p>
                  </motion.div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="hairline" />
      <Marquee items={[
        "Power BI", "Tableau", "SSRS", "DAX", "Power Query · M", "SQL Server", "Google BigQuery",
        "Amazon Redshift", "Snowflake", "Databricks", "PySpark", "Delta Lake", "Azure Data Factory",
        "Azure Synapse", "AWS Glue", "AWS S3", "SSIS", "Alteryx", "Python", "PowerShell", "Azure DevOps",
      ]} />
      <div className="hairline" />

      {/* ═════════════════════════════ PILLARS ═════════════════════════════ */}
      <section className="shell-wide py-24">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">How the work actually goes</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.2rem)]">
              Three things, in <span className="serif-accent amber-text">this order</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Most BI failures aren't chart failures. They're modelling decisions made in week one that nobody
              revisits until the report takes forty seconds to open and two teams disagree about revenue.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title} variants={staggerChild}>
              <GlassCard className="group h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{ background: `color-mix(in oklab, ${p.accent} 14%, transparent)`, border: `1px solid color-mix(in oklab, ${p.accent} 30%, transparent)` }}>
                    <p.icon size={19} style={{ color: p.accent }} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-faint">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-[19px] font-bold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-[13.5px] leading-[1.7] text-muted">{p.body}</p>
                <Link to={p.link} data-cursor="Go"
                  className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-colors"
                  style={{ color: p.accent }}>
                  {p.cta}
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* ═══════════════════════ ROUTE / CHAPTER INDEX ══════════════════════ */}
      <section className="shell-wide pb-24">
        <Reveal>
          <div className="mb-8 flex items-center gap-3">
            <Sparkles size={15} style={{ color: "var(--accent)" }} />
            <p className="eyebrow">Take the tour</p>
            <span className="hairline flex-1" />
          </div>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl" style={{ background: "var(--border)", border: "1px solid var(--border)" }}>
          {ROUTES.filter((r) => r.path !== "/").map((r, i) => (
            <Reveal key={r.path} delay={i * 0.05}>
              <Link to={r.path} data-cursor="Open"
                className="group flex items-center gap-5 px-5 py-6 transition-colors sm:px-8"
                style={{ background: "var(--panel-solid)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in oklab, var(--accent) 6%, var(--panel-solid))")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--panel-solid)")}>
                <span className="font-mono text-[11px] text-faint">{r.index}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[clamp(1.15rem,2.4vw,1.6rem)] font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-1.5">
                    {r.label}
                  </span>
                  <span className="mt-1 block text-[12.5px] text-muted">{r.blurb}</span>
                </span>
                <span className="hidden gap-2 sm:flex">
                  {r.path === "/skills" && <Chip tone="accent">{skills.length} capabilities</Chip>}
                  {r.path === "/experience" && <Chip tone="cyan">3 enterprises</Chip>}
                  {r.path === "/impact" && <Chip tone="violet">Live dashboard</Chip>}
                </span>
                <ArrowUpRight size={20} className="shrink-0 transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: "var(--text-faint)" }} />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ CLOSING LINE ═══════════════════════════ */}
      <section className="shell py-16">
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <Workflow size={22} className="mx-auto mb-6" style={{ color: "var(--accent)" }} />
            <blockquote className="display text-[clamp(1.4rem,3.4vw,2.35rem)] leading-[1.24]">
              “A dashboard isn't finished when it looks good. It's finished when the person
              looking at it <span className="serif-accent amber-text">stops asking</span> whether the number is right.”
            </blockquote>
            <figcaption className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-faint">
              Rahul Reddy CH
            </figcaption>
          </figure>
        </Reveal>
      </section>
    </PageShell>
  );
}
