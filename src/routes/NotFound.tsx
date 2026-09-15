import { ArrowLeft, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Reveal } from "../components/ui";
import { ROUTES } from "../lib/routes";

export default function NotFound() {
  return (
    <PageShell className="pt-[140px]">
      <section className="shell flex min-h-[60vh] flex-col items-center justify-center pb-24 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase"
            style={{ border: "1px solid color-mix(in oklab, var(--rose) 32%, transparent)", background: "color-mix(in oklab, var(--rose) 8%, transparent)", color: "var(--rose)" }}>
            <TriangleAlert size={12} /> Error · no rows returned
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display mt-8 text-[clamp(3.4rem,12vw,8rem)]">404</h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-muted">
            The filter context eliminated every row on this page. Nothing here matches, so try one of the
            pages that does.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="mt-9 flex flex-wrap justify-center gap-2">
            {ROUTES.map((r) => (
              <Link key={r.path} to={r.path} data-cursor="Go"
                className="rounded-full px-4 py-2 text-[13px] transition-colors"
                style={{ border: "1px solid var(--border)", background: "var(--panel)" }}>
                {r.label}
              </Link>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.34}>
          <Link to="/" data-cursor="Home"
            className="shine mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-semibold"
            style={{ background: "var(--accent)", color: "#0b0f1a" }}>
            <ArrowLeft size={15} /> Back to the start
          </Link>
        </Reveal>
      </section>
    </PageShell>
  );
}
