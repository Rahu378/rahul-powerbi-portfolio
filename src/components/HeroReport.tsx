import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Filter, RefreshCw, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SERIES = [104, 96, 88, 79, 72, 61, 57, 48, 42, 35, 31, 27];
const BARS = [62, 88, 44, 97, 71, 55, 83];
const W = 340, H = 96;

function areaPath(vals: number[], w: number, h: number, pad = 4) {
  const max = Math.max(...vals) * 1.12;
  const step = (w - pad * 2) / (vals.length - 1);
  const pts = vals.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)] as const);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const mx = (px + cx) / 2;
    d += ` C ${mx} ${py}, ${mx} ${cy}, ${cx} ${cy}`;
  }
  return { line: d, fill: `${d} L ${pts[pts.length - 1][0]} ${h} L ${pts[0][0]} ${h} Z`, pts };
}

/** A mock governed Power BI report that tilts to the pointer and animates on mount. */
export default function HeroReport() {
  const wrap = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 160, damping: 20 });

  const [refreshing, setRefreshing] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRefreshing(true);
      setTimeout(() => { setRefreshing(false); setTick((t) => t + 1); }, 1100);
    }, 7200);
    return () => clearInterval(id);
  }, []);

  const jitter = (v: number, i: number) => Math.max(8, v + Math.sin(tick * 1.7 + i) * 6);
  const series = SERIES.map(jitter);
  const bars = BARS.map(jitter);
  const { line, fill, pts } = areaPath(series, W, H);

  return (
    <motion.div
      ref={wrap}
      onPointerMove={(e) => {
        const r = wrap.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[440px]"
    >
      {/* glow */}
      <div className="absolute -inset-8 -z-10 rounded-[40px] opacity-70 blur-3xl"
        style={{ background: "radial-gradient(60% 55% at 50% 40%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 70%)" }} />

      <div className="card overflow-hidden rounded-[22px]" style={{ boxShadow: "var(--shadow-lg)" }}>
        {/* chrome */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "color-mix(in oklab, var(--rose) 65%, transparent)" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "color-mix(in oklab, var(--accent) 65%, transparent)" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "color-mix(in oklab, var(--mint) 65%, transparent)" }} />
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-faint">Ops&nbsp;Scorecard.pbix</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[8.5px] tracking-wider uppercase"
              style={{ color: "var(--mint)", background: "color-mix(in oklab, var(--mint) 12%, transparent)" }}>
              <ShieldCheck size={9} /> RLS
            </span>
            <motion.span animate={{ rotate: refreshing ? 360 : 0 }} transition={{ duration: 1, ease: "linear" }}>
              <RefreshCw size={11} style={{ color: refreshing ? "var(--accent)" : "var(--text-faint)" }} />
            </motion.span>
          </div>
        </div>

        {/* filter bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
          <Filter size={10} style={{ color: "var(--text-faint)" }} />
          {["FY26", "All Regions", "Service"].map((f, i) => (
            <motion.span key={f}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
              className="rounded-full px-2 py-0.5 font-mono text-[9px] tracking-wide"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
              {f}
            </motion.span>
          ))}
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {[
            { k: "Load time", v: "4.4s", d: "-65%", up: false, c: "var(--mint)" },
            { k: "Active users", v: "204", d: "+38%", up: true, c: "var(--cyan)" },
            { k: "Refresh", v: "2m 11s", d: "on time", up: true, c: "var(--accent)" },
          ].map((t, i) => (
            <motion.div key={t.k}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="px-3.5 py-3" style={{ background: "var(--panel-solid)" }}>
              <p className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-faint">{t.k}</p>
              <p className="mt-1 text-[17px] font-bold tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>{t.v}</p>
              <p className="mt-0.5 flex items-center gap-0.5 text-[9.5px] font-medium" style={{ color: t.c }}>
                {t.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}{t.d}
              </p>
            </motion.div>
          ))}
        </div>

        {/* area chart */}
        <div className="px-4 pt-4 pb-1">
          <div className="mb-2 flex items-baseline justify-between">
            <p className="text-[11.5px] font-semibold">Report render time trend</p>
            <p className="font-mono text-[9px] text-faint">seconds · rolling 12</p>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 96 }}>
            <defs>
              <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.38" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((g) => (
              <line key={g} x1="4" x2={W - 4} y1={H * g} y2={H * g} stroke="var(--grid-line)" strokeWidth="1" />
            ))}
            <motion.path d={fill} fill="url(#heroFill)"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.9 }} />
            <motion.path d={line} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 1.25, duration: 1.5, ease: [0.16, 1, 0.3, 1] }} />
            {pts.map(([x, y], i) => (
              <motion.circle key={i} cx={x} cy={y} r="2.4" fill="var(--panel-solid)" stroke="var(--accent)" strokeWidth="1.6"
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + i * 0.045, duration: 0.35 }} />
            ))}
          </svg>
        </div>

        {/* bars */}
        <div className="px-4 pt-2 pb-4">
          <p className="mb-2 text-[11.5px] font-semibold">Adoption by business domain</p>
          <div className="flex h-[52px] items-end gap-1.5">
            {bars.map((b, i) => (
              <motion.div key={i}
                className="flex-1 rounded-t-[3px]"
                style={{ background: i === 3 ? "var(--accent)" : "color-mix(in oklab, var(--cyan) 42%, transparent)" }}
                initial={{ height: 0 }}
                animate={{ height: `${(b / 110) * 100}%` }}
                transition={{ delay: 1.7 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* floating chips */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 2.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="float-slow absolute -top-4 -left-5 hidden rounded-xl px-3 py-2 sm:block"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-lg)" }}>
        <p className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-faint">Storage mode</p>
        <p className="text-[11.5px] font-semibold" style={{ color: "var(--cyan)" }}>Import + Aggregations</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }} animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 2.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="float-slow absolute -right-6 -bottom-5 hidden rounded-xl px-3 py-2 sm:block"
        style={{ background: "var(--panel-solid)", border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-lg)", animationDelay: "1.4s" }}>
        <p className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-faint">Dataset</p>
        <p className="flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: "var(--mint)" }}>
          <ShieldCheck size={12} /> Certified
        </p>
      </motion.div>
    </motion.div>
  );
}
