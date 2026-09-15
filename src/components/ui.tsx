import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";
import { useCountUp, useSheen } from "../lib/hooks";

/* --------------------------------------------------------------- REVEAL */
export function Reveal({
  children, delay = 0, y = 26, once = true, className = "",
}: { children: ReactNode; delay?: number; y?: number; once?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------- STAGGERED CHILDREN */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Stagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      variants={staggerParent}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------- SPLIT HEADLINE */
export function SplitText({
  text, className = "", delay = 0, stagger = 0.032,
}: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.95, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------ SECTION HEADING */
export function SectionHeading({
  eyebrow, title, accentWord, lead, align = "left", id,
}: {
  eyebrow: string; title: string; accentWord?: string; lead?: string;
  align?: "left" | "center"; id?: string;
}) {
  const parts = accentWord ? title.split(accentWord) : [title];
  return (
    <div id={id} className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-8" style={{ background: "var(--accent)" }} />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display mt-5 text-[clamp(2.1rem,5.4vw,4rem)]">
          {parts[0]}
          {accentWord && <span className="serif-accent amber-text">{accentWord}</span>}
          {parts[1]}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-[clamp(0.98rem,1.5vw,1.125rem)] leading-relaxed text-muted">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- COUNTER */
export function Counter({
  to, suffix = "", prefix = "", decimals = 0, className = "",
}: { to: number; suffix?: string; prefix?: string; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const v = useCountUp(to, inView);
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}{v.toFixed(decimals)}{suffix}
    </span>
  );
}

/* ------------------------------------------------------------- GLASS CARD */
export function GlassCard({
  children, className = "", style, onClick, as = "div", tabIndex, ariaLabel,
}: {
  children: ReactNode; className?: string; style?: CSSProperties;
  onClick?: () => void; as?: "div" | "button"; tabIndex?: number; ariaLabel?: string;
}) {
  const { ref, onMove } = useSheen<HTMLDivElement>();
  const Tag: any = as;
  return (
    <Tag
      ref={ref as any}
      onMouseMove={onMove}
      onClick={onClick}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className={`card card-sheen overflow-hidden ${onClick ? "cursor-pointer text-left" : ""} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ CHIP */
export function Chip({
  children, tone = "default", className = "",
}: { children: ReactNode; tone?: "default" | "accent" | "cyan" | "violet" | "mint"; className?: string }) {
  const map: Record<string, string> = {
    default: "var(--text-faint)", accent: "var(--accent)", cyan: "var(--cyan)",
    violet: "var(--violet)", mint: "var(--mint)",
  };
  const c = map[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] tracking-wide uppercase whitespace-nowrap ${className}`}
      style={{
        color: c,
        background: `color-mix(in oklab, ${c} 11%, transparent)`,
        border: `1px solid color-mix(in oklab, ${c} 26%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------- KBD */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd
      className="rounded-[6px] px-1.5 py-0.5 font-mono text-[10px] font-medium"
      style={{ border: "1px solid var(--border-strong)", background: "var(--panel)", color: "var(--text-muted)" }}
    >
      {children}
    </kbd>
  );
}

/* --------------------------------------------------------------- MAGNETIC */
export function Magnetic({ children, strength = 0.28, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={(e) => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onMouseLeave={() => { const el = ref.current; if (el) el.style.transform = "translate3d(0,0,0)"; }}
      style={{ transition: "transform .55s cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- PROGRESS */
export function Meter({ value, color = "var(--accent)", height = 4, delay = 0 }: { value: number; color?: string; height?: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <div ref={ref} className="w-full overflow-hidden rounded-full" style={{ height, background: "color-mix(in oklab, var(--text) 10%, transparent)" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : {}}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: "100%", background: `linear-gradient(90deg, color-mix(in oklab, ${color} 55%, transparent), ${color})`, borderRadius: 99 }}
      />
    </div>
  );
}

/* --------------------------------------------------------------- MARQUEE */
export function Marquee({ items, speed = 42 }: { items: string[]; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3" style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
      <div className="marquee-track gap-10" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-[11.5px] tracking-[0.18em] whitespace-nowrap uppercase text-faint">
            {t}
            <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}
