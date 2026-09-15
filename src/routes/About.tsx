import { motion } from "framer-motion";
import {
  BadgeCheck, Boxes, FileText, Gauge, GraduationCap, Rocket, ShieldCheck, Users, Workflow,
} from "lucide-react";
import { useState } from "react";
import PageShell from "../components/PageShell";
import Quiz from "../components/Quiz";
import { FeaturePortrait } from "../components/Portrait";
import { Chip, GlassCard, Reveal, SectionHeading, Stagger, staggerChild } from "../components/ui";
import { certifications, education, leadership, principles, profile } from "../data/profile";

const ICONS: Record<string, any> = { Boxes, Gauge, ShieldCheck, Workflow, Users, FileText };

const PROCESS = [
  { step: "Discover", body: "Sit with the people who'll use it. Find the decision they are trying to make, not the chart they think they want.", c: "var(--accent)" },
  { step: "Model", body: "Grain, relationships, cardinality. Star schema over SQL Server, BigQuery, Redshift or the lakehouse. Get this right and everything downstream is easy.", c: "var(--cyan)" },
  { step: "Build", body: "Power Query that folds, DAX that respects filter context, a layout an executive can read in six seconds.", c: "var(--violet)" },
  { step: "Secure", body: "Row-level security, least-privilege access, validated with View-as-role before anything ships. Audit should never be a surprise.", c: "var(--mint)" },
  { step: "Ship", body: "Scheduled refresh, incremental partitions, monitoring in place, then release. Nobody should learn about a failed load from a stakeholder.", c: "var(--accent)" },
  { step: "Enable", body: "User training, data dictionaries, report standards and post go-live support. Work only I can maintain is not finished work.", c: "var(--rose)" },
];

export default function About() {
  const [openPrinciple, setOpenPrinciple] = useState<string | null>("01");

  return (
    <PageShell className="pt-[120px]">
      {/* ───────────────────────── Intro ───────────────────────── */}
      <section className="shell-wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="02 / About"
              title="Two years of making data "
              accentWord="trustworthy"
              lead={profile.summary}
            />
          </div>
          <div className="mx-auto w-full max-w-[340px] lg:max-w-none">
            <FeaturePortrait />
          </div>
        </div>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-wrap gap-2">
            <Chip tone="accent">Financial Services</Chip>
            <Chip tone="cyan">Insurance</Chip>
            <Chip tone="violet">Enterprise Operations</Chip>
            <Chip tone="mint">Azure + AWS</Chip>
            <Chip>Requirements → Model → Dashboard → Training → Go-live support</Chip>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────── Operating principles ───────────────────── */}
      <section className="shell-wide mt-24">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Operating principles</p>
            <h3 className="display mt-4 text-[clamp(1.9rem,4.4vw,3rem)]">
              Six rules I don't <span className="serif-accent amber-text">bend</span>
            </h3>
            <p className="mt-4 text-[14px] text-muted">Tap any one to open it.</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl"
          style={{ background: "var(--border)", border: "1px solid var(--border)" }}>
          {principles.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Boxes;
            const open = openPrinciple === p.n;
            return (
              <Reveal key={p.n} delay={i * 0.05}>
                <button
                  onClick={() => setOpenPrinciple(open ? null : p.n)}
                  data-cursor={open ? "Close" : "Open"}
                  className="w-full px-5 py-6 text-left transition-colors sm:px-8"
                  style={{ background: open ? "color-mix(in oklab, var(--accent) 6%, var(--panel-solid))" : "var(--panel-solid)" }}>
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[11px] shrink-0" style={{ color: open ? "var(--accent)" : "var(--text-faint)" }}>{p.n}</span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors"
                      style={{ background: open ? "color-mix(in oklab, var(--accent) 14%, transparent)" : "var(--panel)", border: "1px solid var(--border)" }}>
                      <Icon size={16} style={{ color: open ? "var(--accent)" : "var(--text-faint)" }} />
                    </span>
                    <span className="flex-1 text-[clamp(1.05rem,2.2vw,1.4rem)] font-bold tracking-tight">{p.title}</span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
                      className="text-[20px] leading-none" style={{ color: open ? "var(--accent)" : "var(--text-faint)" }}>+</motion.span>
                  </div>
                  <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <p className="pt-4 pl-[4.55rem] text-[13.5px] leading-[1.75] text-muted">{p.body}</p>
                  </motion.div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ───────────────────────── Process ───────────────────────── */}
      <section className="shell-wide mt-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">How an engagement runs</p>
            <h3 className="display mt-4 text-[clamp(1.9rem,4.4vw,3rem)]">
              From frustration to <span className="serif-accent amber-text">enablement</span>
            </h3>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((p, i) => (
            <motion.div key={p.step} variants={staggerChild}>
              <GlassCard className="group relative h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full font-mono text-[11px] font-semibold"
                    style={{ background: `color-mix(in oklab, ${p.c} 14%, transparent)`, border: `1px solid color-mix(in oklab, ${p.c} 34%, transparent)`, color: p.c }}>
                    {i + 1}
                  </span>
                  <h4 className="text-[16px] font-bold tracking-tight">{p.step}</h4>
                </div>
                <p className="mt-4 text-[13px] leading-[1.7] text-muted">{p.body}</p>
                <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: p.c }} />
              </GlassCard>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* ───────────────────────── Fun / quiz ───────────────────────── */}
      <section className="shell-wide mt-28">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div>
              <p className="eyebrow">A small detour</p>
              <h3 className="display mt-4 text-[clamp(1.9rem,4.4vw,2.8rem)]">
                Want to know how I <span className="serif-accent amber-text">think</span>?
              </h3>
              <p className="mt-5 text-[14px] leading-[1.75] text-muted">
                Anyone can list DAX on a résumé. Here are three questions where the right answer reveals whether
                someone has actually debugged a slow model at 11pm, or only read about it.
              </p>
              <p className="mt-4 text-[13px] text-faint">Have a go. No score is recorded anywhere.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}><Quiz /></Reveal>
        </div>
      </section>

      {/* ───────────────────────── Education ───────────────────────── */}
      <section className="shell-wide mt-28 pb-24">
        <Reveal>
          <div className="flex items-center gap-3">
            <GraduationCap size={17} style={{ color: "var(--accent)" }} />
            <p className="eyebrow">Education</p>
            <span className="hairline flex-1" />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.1}>
              <GlassCard className="group relative h-full overflow-hidden p-7">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-50"
                  style={{ background: e.accent }} />
                <div className="relative">
                  <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase" style={{ color: e.accent }}>
                    {e.degree}
                  </p>
                  <h4 className="mt-3 text-[clamp(1.25rem,2.6vw,1.6rem)] leading-tight font-bold tracking-tight">
                    {e.field}
                  </h4>
                  <p className="mt-2 text-[14px] font-medium text-muted">
                    {e.school}{e.abbr ? ` (${e.abbr})` : ""}
                  </p>
                  {e.location && (
                    <p className="mt-1 text-[12px] text-faint">{e.location}</p>
                  )}
                  <div className="my-5 hairline" />
                  <p className="text-[13px] leading-[1.7] text-muted">{e.note}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* ───────────────────── Certifications ───────────────────── */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex items-center gap-3">
            <BadgeCheck size={17} style={{ color: "var(--cyan)" }} />
            <p className="eyebrow">Certifications</p>
            <span className="hairline flex-1" />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <GlassCard className="group h-full p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: c.accent }} />
                  <div>
                    <p className="text-[15px] leading-snug font-semibold tracking-tight">{c.name}</p>
                    <p className="mt-1.5 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{c.issuer}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* ───────────────────── Leadership ───────────────────── */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex items-center gap-3">
            <Users size={17} style={{ color: "var(--violet)" }} />
            <p className="eyebrow">Leadership &amp; activities</p>
            <span className="hairline flex-1" />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {leadership.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.1}>
              <GlassCard className="group relative h-full overflow-hidden p-7">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-45"
                  style={{ background: l.accent }} />
                <div className="relative">
                  <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase" style={{ color: l.accent }}>
                    {l.where}
                  </p>
                  <h4 className="mt-3 text-[17px] leading-tight font-bold tracking-tight">{l.org}</h4>
                  <p className="mt-2 text-[13px] font-medium text-muted">{l.role}</p>
                  <div className="my-5 hairline" />
                  <p className="text-[13px] leading-[1.7] text-muted">{l.body}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl p-7 sm:flex-row sm:items-center sm:justify-between"
            style={{ border: "1px solid color-mix(in oklab, var(--accent) 26%, transparent)", background: "color-mix(in oklab, var(--accent) 6%, transparent)" }}>
            <div className="flex items-start gap-4">
              <Rocket size={20} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
              <div>
                <p className="text-[15px] font-semibold">Currently Power BI Developer at NextGen IT Solutions.</p>
                <p className="mt-1.5 text-[13px] text-muted">
                  Available for contract engagements, and experienced owning projects end to end. Let's talk about the problem.
                </p>
              </div>
            </div>
            <a href={`mailto:${profile.email}`} data-cursor="Email"
              className="shine shrink-0 rounded-full px-5 py-2.5 text-[13px] font-semibold"
              style={{ background: "var(--accent)", color: "#0b0f1a" }}>
              Start a conversation
            </a>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
