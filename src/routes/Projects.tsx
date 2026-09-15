import { ArrowUpRight, CodeXml } from "lucide-react";
import PageShell from "../components/PageShell";
import { Chip, GlassCard, Reveal, SectionHeading } from "../components/ui";
import { projects } from "../data/profile";

export default function Projects() {
  return (
    <PageShell className="pt-[120px]">
      <section className="shell-wide">
        <SectionHeading
          eyebrow="04 / Projects"
          title="Research and technical "
          accentWord="projects"
          lead="Work built outside the reporting stack — GPU kernels, agentic systems, compliance tooling and data infrastructure. Every one of them is public."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <GlassCard
                className={`group relative flex h-full flex-col overflow-hidden p-8 ${i === 0 ? "lg:col-span-2" : ""}`}
              >
                <div
                  className="absolute -top-20 -right-20 h-52 w-52 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-45"
                  style={{ background: p.accent }}
                />

                <div className="relative flex flex-1 flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p
                        className="font-mono text-[9.5px] tracking-[0.2em] uppercase"
                        style={{ color: p.accent }}
                      >
                        {p.kind}
                      </p>
                      <h3 className="mt-3 text-[clamp(1.35rem,3vw,1.9rem)] leading-tight font-bold tracking-tight">
                        {p.name}
                      </h3>
                    </div>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Open repo"
                      className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium transition-colors"
                      style={{
                        border: "1px solid var(--border-strong)",
                        color: "var(--text)",
                      }}
                    >
                      <CodeXml size={13} />
                      GitHub
                      <ArrowUpRight size={12} />
                    </a>
                  </div>

                  <p className="mt-4 text-[14.5px] leading-[1.7] text-muted">{p.summary}</p>

                  <div className="my-6 hairline" />

                  <ul className="flex flex-col gap-3">
                    {p.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-[13.5px] leading-[1.7] text-muted">
                        <span
                          className="mt-[9px] h-px w-3 shrink-0"
                          style={{ background: p.accent, opacity: 0.8 }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2 pt-7">
                    {p.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
