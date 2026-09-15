import { ArrowUpRight, Copy, Check, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { ROUTES } from "../lib/routes";
import { useCopy } from "../lib/hooks";
import { Marquee } from "./ui";

export default function Footer() {
  const { copy, copied } = useCopy();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-32" style={{ borderTop: "1px solid var(--border)" }}>
      <Marquee
        speed={52}
        items={[
          "Star Schema", "DAX Optimization", "Row-Level Security", "Incremental Refresh",
          "Power Query · M", "Query Folding", "Azure Data Factory", "AWS Glue", "Databricks",
          "PySpark", "Portfolio Reporting", "Claims Analytics", "Supply Chain Analytics",
        ]}
      />
      <div className="hairline" />

      <div className="shell-wide grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-[clamp(1.6rem,3.4vw,2.4rem)]">
            Let's build the <span className="serif-accent amber-text">one dashboard</span><br />everyone finally trusts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} data-cursor="Email"
              className="shine inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold"
              style={{ background: "var(--accent)", color: "#0b0f1a" }}>
              <Mail size={14} /> {profile.email}
            </a>
            <button onClick={() => copy(profile.email, "e")} data-cursor="Copy"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px]"
              style={{ border: "1px solid var(--border-strong)" }}>
              {copied === "e" ? <><Check size={14} style={{ color: "var(--mint)" }} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
        </div>

        <nav>
          <p className="eyebrow">Navigate</p>
          <ul className="mt-4 space-y-2.5">
            {ROUTES.map((r) => (
              <li key={r.path}>
                <Link to={r.path} className="group inline-flex items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-[color:var(--accent)]">
                  <span className="font-mono text-[10px] opacity-55">{r.index}</span>
                  {r.label}
                  <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow">Direct</p>
          <ul className="mt-4 space-y-3 text-[13.5px] text-muted">
            <li className="flex items-center gap-2.5"><MapPin size={14} style={{ color: "var(--accent)" }} /> {profile.location}</li>
            <li><a href={profile.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-[color:var(--accent)]"><Phone size={14} style={{ color: "var(--accent)" }} /> {profile.phone}</a></li>
            <li><a href={`mailto:${profile.email}`} className="flex items-center gap-2.5 transition-colors hover:text-[color:var(--accent)]"><Mail size={14} style={{ color: "var(--accent)" }} /> {profile.email}</a></li>
          </ul>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ border: "1px solid color-mix(in oklab, var(--mint) 30%, transparent)", background: "color-mix(in oklab, var(--mint) 9%, transparent)" }}>
            <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--mint)", color: "var(--mint)" }} />
            <span className="font-mono text-[10px] tracking-wide uppercase" style={{ color: "var(--mint)" }}>{profile.openTo}</span>
          </div>
        </div>
      </div>

      <div className="hairline" />
      <div className="shell-wide flex flex-col items-center justify-between gap-2 py-6 font-mono text-[10.5px] tracking-wide text-faint sm:flex-row">
        <span>© {year} Rahul Reddy CH</span>
        <span>Designed &amp; built with an unreasonable attention to filter context.</span>
      </div>
    </footer>
  );
}
