import { motion } from "framer-motion";
import {
  Activity, ArrowDownRight, ArrowUpRight, Clock, Filter, Info, RefreshCw,
  ShieldCheck, Users, Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, Cell, Legend, Pie, PieChart, PolarAngleAxis,
  PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import PageShell from "../components/PageShell";
import { Chip, Counter, Reveal, SectionHeading } from "../components/ui";
import { capabilityRadar, demoTrend, domainSplit, metrics, sprintSavings } from "../data/profile";

/* ----------------------------------------------------------- Custom tooltip */
function TT({ active, payload, label, unit = "" }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3.5 py-2.5"
      style={{ background: "var(--panel-solid)", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-lg)" }}>
      {label && <p className="mb-1.5 font-mono text-[9.5px] tracking-[0.16em] uppercase text-faint">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="flex items-center gap-2 text-[12px]">
          <span className="h-2 w-2 rounded-sm" style={{ background: p.color || p.fill }} />
          <span className="text-muted">{p.name}</span>
          <span className="font-mono font-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>
            {typeof p.value === "number" ? p.value.toFixed(1) : p.value}{unit}
          </span>
        </p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- Report tile */
function Tile({
  title, subtitle, children, className = "", info,
}: { title: string; subtitle?: string; children: React.ReactNode; className?: string; info?: string }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className={`card flex flex-col overflow-hidden ${className}`}>
      <div className="flex items-start justify-between gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold tracking-tight">{title}</p>
          {subtitle && <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.14em] uppercase text-faint">{subtitle}</p>}
        </div>
        {info && (
          <button onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}
            onClick={() => setShowInfo((s) => !s)} aria-label="About this visual"
            className="relative shrink-0" style={{ color: "var(--text-faint)" }}>
            <Info size={14} />
            {showInfo && (
              <motion.span
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 right-0 z-20 w-56 rounded-lg p-3 text-left text-[11.5px] leading-relaxed font-normal normal-case"
                style={{ background: "var(--panel-solid)", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-lg)", color: "var(--text-muted)" }}>
                {info}
              </motion.span>
            )}
          </button>
        )}
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

export default function Impact() {
  const [domain, setDomain] = useState<string | null>(null);
  const [refreshedAt, setRefreshedAt] = useState(() => new Date());
  const [refreshing, setRefreshing] = useState(false);

  const factor = useMemo(() => {
    if (!domain) return 1;
    const d = domainSplit.find((x) => x.name === domain);
    return d ? d.value / 25 : 1;
  }, [domain]);

  const trend = useMemo(
    () => demoTrend.map((d) => ({
      ...d,
      after: +(d.after * (domain ? 0.86 + factor * 0.12 : 1)).toFixed(2),
      users: Math.round(d.users * (domain ? (factor * 0.34 + 0.15) : 1)),
    })),
    [domain, factor]
  );

  const doRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); setRefreshedAt(new Date()); }, 1150);
  };

  const kpis = [
    { icon: Zap, label: "Dashboard load time", value: 4.6, suffix: "s", delta: "−67%", down: true, c: "var(--accent)",
      note: "Down from roughly 15s after tuning the SQL and the Power BI model." },
    { icon: Clock, label: "Reporting latency", value: 1, suffix: "d", delta: "was several days", down: true, c: "var(--cyan)",
      note: "Manual spreadsheet pulls replaced with direct connections and scheduled refresh." },
    { icon: Users, label: "Industries delivered in", value: 3, suffix: "", delta: "finance · insurance · ops", down: false, c: "var(--violet)",
      note: "Financial services, insurance and enterprise operations." },
    { icon: ShieldCheck, label: "Clouds in production", value: 2, suffix: "", delta: "Azure + AWS", down: false, c: "var(--mint)",
      note: "Data Factory, Synapse and Azure SQL alongside S3, Glue, Redshift and Athena." },
  ];

  return (
    <PageShell className="pt-[120px]">
      <section className="shell-wide">
        <SectionHeading
          eyebrow="05 / Measured impact"
          title="The numbers, as a "
          accentWord="live report"
          lead="A BI developer's portfolio should be a dashboard. Use the slicer, hover the visuals, cross-filter the page. It behaves the way the reports I ship behave."
        />

        {/* ───────────── Report canvas ───────────── */}
        <Reveal delay={0.18}>
          <div className="mt-12 overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--border-strong)", background: "var(--panel)", boxShadow: "var(--shadow-lg)" }}>

            {/* report ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
              style={{ borderBottom: "1px solid var(--border)", background: "color-mix(in oklab, var(--text) 3%, transparent)" }}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: "var(--accent)" }}>
                  <Activity size={14} color="#0b0f1a" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold tracking-tight">Career Impact · Executive Scorecard</p>
                  <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-faint">
                    Last refresh {refreshedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Chip tone="mint"><ShieldCheck size={9} /> Certified</Chip>
                <button onClick={doRefresh} data-cursor="Refresh"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-wide uppercase transition-colors"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  <motion.span animate={{ rotate: refreshing ? 360 : 0 }} transition={{ duration: 1, ease: "linear" }} className="grid place-items-center">
                    <RefreshCw size={11} />
                  </motion.span>
                  {refreshing ? "Refreshing" : "Refresh"}
                </button>
              </div>
            </div>

            {/* slicer */}
            <div className="flex flex-wrap items-center gap-2 px-5 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.16em] uppercase text-faint">
                <Filter size={11} /> Industry
              </span>
              <button onClick={() => setDomain(null)} data-cursor="Clear"
                className="rounded-full px-3 py-1 text-[11.5px] transition-colors"
                style={{
                  border: `1px solid ${!domain ? "var(--accent)" : "var(--border)"}`,
                  background: !domain ? "color-mix(in oklab, var(--accent) 14%, transparent)" : "transparent",
                  color: !domain ? "var(--accent)" : "var(--text-muted)",
                }}>
                All
              </button>
              {domainSplit.map((d) => {
                const on = domain === d.name;
                return (
                  <button key={d.name} onClick={() => setDomain(on ? null : d.name)} data-cursor="Cross-filter"
                    className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] transition-colors"
                    style={{
                      border: `1px solid ${on ? d.color : "var(--border)"}`,
                      background: on ? `color-mix(in oklab, ${d.color} 14%, transparent)` : "transparent",
                      color: on ? d.color : "var(--text-muted)",
                    }}>
                    <span className="h-2 w-2 rounded-sm" style={{ background: d.color }} /> {d.name}
                  </button>
                );
              })}
              {domain && (
                <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  className="ml-auto font-mono text-[9.5px] tracking-wide uppercase" style={{ color: "var(--accent)" }}>
                  1 filter applied · visuals cross-filtered
                </motion.span>
              )}
            </div>

            {/* KPI row */}
            <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "var(--border)" }}>
              {kpis.map((k, i) => (
                <motion.div key={k.label}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group px-5 py-5" style={{ background: "var(--panel-solid)" }}>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.14em] uppercase text-faint">
                      <k.icon size={11} style={{ color: k.c }} /> {k.label}
                    </span>
                  </div>
                  <p className="mt-3 text-[clamp(1.9rem,3.4vw,2.5rem)] leading-none font-extrabold tracking-tight"
                    style={{ color: k.c }}>
                    <Counter to={k.value} suffix={k.suffix} decimals={k.value % 1 !== 0 ? 1 : 0} />
                  </p>
                  <p className="mt-2 flex items-center gap-1 text-[11px] font-medium" style={{ color: k.down ? "var(--mint)" : k.c }}>
                    {k.down ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}{k.delta}
                  </p>
                  <p className="mt-2.5 text-[11px] leading-snug text-faint opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    {k.note}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* visuals */}
            <div className="grid gap-px lg:grid-cols-[1.55fr_1fr]" style={{ background: "var(--border)" }}>
              <Tile title="Dashboard load time, before vs after tuning"
                subtitle="seconds · lower is better"
                info="Untuned model and queries against the tuned version: star schema, incremental refresh, folded queries and rewritten SQL. Around 15 seconds down to under 5 on the wealth management engagement."
                className="rounded-none border-0">
                <ResponsiveContainer width="100%" height={268}>
                  <AreaChart data={trend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gBefore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--rose)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="var(--rose)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gAfter" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="m" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} width={44} />
                    <Tooltip content={<TT unit="s" />} cursor={{ stroke: "var(--border-strong)", strokeDasharray: "4 4" }} />
                    <Legend iconType="circle" iconSize={7}
                      wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", paddingTop: 8 }} />
                    <Area type="monotone" dataKey="before" name="Before" stroke="var(--rose)" strokeWidth={1.6}
                      strokeDasharray="4 3" fill="url(#gBefore)" animationDuration={1400} />
                    <Area type="monotone" dataKey="after" name="After" stroke="var(--accent)" strokeWidth={2.4}
                      fill="url(#gAfter)" animationDuration={1600} />
                  </AreaChart>
                </ResponsiveContainer>
              </Tile>

              <Tile title="Delivery by industry"
                subtitle="share of solutions delivered"
                info="Click a segment to cross-filter the whole page, the same interaction model as a real Power BI report."
                className="rounded-none border-0">
                <ResponsiveContainer width="100%" height={268}>
                  <PieChart>
                    <Tooltip content={<TT unit="%" />} />
                    <Pie data={domainSplit} dataKey="value" nameKey="name" cx="50%" cy="47%"
                      innerRadius={54} outerRadius={88} paddingAngle={3} stroke="none"
                      animationDuration={1200}
                      onClick={(d: any) => setDomain((cur) => (cur === d.name ? null : d.name))}>
                      {domainSplit.map((d) => (
                        <Cell key={d.name} fill={d.color} cursor="pointer"
                          opacity={!domain || domain === d.name ? 1 : 0.22} />
                      ))}
                    </Pie>
                    <Legend iconType="circle" iconSize={7} verticalAlign="bottom"
                      wrapperStyle={{ fontSize: 10.5, fontFamily: "var(--font-mono)" }} />
                  </PieChart>
                </ResponsiveContainer>
              </Tile>
            </div>

            <div className="grid gap-px lg:grid-cols-2" style={{ background: "var(--border)" }}>
              <Tile title="Capability profile"
                subtitle="self-assessed depth · 0–100"
                info="Weighted across the nine disciplines on the skills page. The shape matters more than any single axis: this is a full-stack BI profile, not a report-builder profile."
                className="rounded-none border-0">
                <ResponsiveContainer width="100%" height={272}>
                  <RadarChart data={capabilityRadar} outerRadius="72%">
                    <PolarGrid stroke="var(--grid-line)" />
                    <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10.5, fill: "var(--text-faint)", fontFamily: "var(--font-mono)" }} />
                    <Tooltip content={<TT />} />
                    <Radar name="Depth" dataKey="v" stroke="var(--cyan)" strokeWidth={2}
                      fill="var(--cyan)" fillOpacity={0.22} animationDuration={1500} />
                  </RadarChart>
                </ResponsiveContainer>
              </Tile>

              <Tile title="Reporting latency, manual to automated"
                subtitle="hours from source change to report"
                info="Manual spreadsheet pulls delayed reporting by several days each week. Connecting BI straight to BigQuery and SQL Server with scheduled refresh collapses that to a single cycle."
                className="rounded-none border-0">
                <ResponsiveContainer width="100%" height={272}>
                  <BarChart data={sprintSavings} margin={{ top: 16, right: 12, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} width={42} />
                    <Tooltip content={<TT unit="h" />} cursor={{ fill: "color-mix(in oklab, var(--accent) 7%, transparent)" }} />
                    <Bar dataKey="hours" name="Hours" radius={[6, 6, 0, 0]} animationDuration={1300}>
                      {sprintSavings.map((s, i) => <Cell key={i} fill={s.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Tile>
            </div>

            {/* footer strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 font-mono text-[9.5px] tracking-[0.14em] uppercase text-faint"
              style={{ borderTop: "1px solid var(--border)" }}>
              <span>Model: star schema · incremental refresh · RLS enabled</span>
              <span>{domain ? `Filtered: ${domain}` : "No filters applied"}</span>
            </div>
          </div>
        </Reveal>

        {/* ───────────── Narrative behind the numbers ───────────── */}
        <div className="mt-20 pb-24">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Behind each number</p>
              <h3 className="display mt-4 text-[clamp(1.8rem,4vw,2.7rem)]">
                No number without a <span className="serif-accent amber-text">method</span>
              </h3>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {metrics.map((m, i) => {
              const c = { amber: "var(--accent)", cyan: "var(--cyan)", violet: "var(--violet)", mint: "var(--mint)" }[m.accent];
              return (
                <Reveal key={m.id} delay={i * 0.08}>
                  <div className="card h-full p-6">
                    <div className="flex items-baseline gap-4">
                      <span className="text-[clamp(2.2rem,4.4vw,3rem)] leading-none font-extrabold tracking-tight" style={{ color: c }}>
                        <Counter to={m.value} suffix={m.suffix} />
                      </span>
                      <span className="text-[14px] font-semibold">{m.label}</span>
                    </div>
                    <div className="my-5 hairline" />
                    <p className="text-[13.5px] leading-[1.7] text-muted">{m.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
