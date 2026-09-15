import { motion } from "framer-motion";
import {
  ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send, Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import { Chip, GlassCard, Reveal, SectionHeading } from "../components/ui";
import { profile } from "../data/profile";
import { Avatar } from "../components/Portrait";
import { useCopy } from "../lib/hooks";

const INTENTS = [
  { id: "role", label: "A role to discuss", subject: "Power BI Developer role: let's talk",
    body: "Hi Rahul,\n\nWe're hiring for a Power BI / BI engineering role and your background looks like a strong fit.\n\nRole:\nTeam:\nStack:\n\nWould you be open to a short call this week?" },
  { id: "audit", label: "A slow report to fix", subject: "We have a Power BI performance problem",
    body: "Hi Rahul,\n\nWe have reports taking far too long to load and refreshes that keep failing.\n\nData sources:\nApprox. model size:\nWhat users are complaining about:\n\nCould you take a look?" },
  { id: "govern", label: "Governance & RLS help", subject: "Power BI governance / RLS question",
    body: "Hi Rahul,\n\nWe need to get our Power BI tenant under control: security, certified datasets, workspace structure.\n\nCurrent state:\nNumber of users:\nBiggest pain:\n\nCan we set up a conversation?" },
  { id: "other", label: "Something else", subject: "Hello from your portfolio",
    body: "Hi Rahul,\n\n" },
];

export default function Contact() {
  const { copy, copied } = useCopy();
  const [intent, setIntent] = useState(INTENTS[0]);
  const [from, setFrom] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState(INTENTS[0].body);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(
      company ? `${intent.subject} (${company})` : intent.subject
    );
    const body = encodeURIComponent(
      `${message}\n\n${from || "(your name)"}${company ? `\n${company}` : ""}`
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }, [intent, message, from, company]);

  const pickIntent = (it: typeof INTENTS[number]) => {
    setIntent(it);
    setMessage(it.body);
  };

  return (
    <PageShell className="pt-[120px]">
      <section className="shell-wide">
        <SectionHeading
          eyebrow="06 / Contact"
          title="Tell me what's "
          accentWord="broken"
          lead="The most useful first message is usually the frustration rather than the job description. A report nobody trusts, a refresh that fails every Monday, forty versions of the same number. Start there and I'll tell you honestly whether I'm the right person."
        />

        <div className="mt-14 grid gap-6 pb-24 lg:grid-cols-[0.95fr_1.05fr]">
          {/* ───────── Direct channels ───────── */}
          <div className="space-y-4">
            <Reveal>
              <GlassCard className="p-7">
                <div className="flex items-center gap-2.5">
                  <span className="pulse-dot h-2 w-2 rounded-full" style={{ background: "var(--mint)", color: "var(--mint)" }} />
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: "var(--mint)" }}>
                    Available for conversations
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Avatar size={62} />
                  <div>
                    <p className="display text-[clamp(1.5rem,3.2vw,2rem)]">Rahul Reddy CH</p>
                    <p className="mt-1 text-[13.5px] text-muted">{profile.role}</p>
                  </div>
                </div>

                <div className="my-6 hairline" />

                <ul className="space-y-2.5">
                  <ContactRow
                    icon={<Mail size={15} />} label="Email" value={profile.email}
                    href={`mailto:${profile.email}`}
                    onCopy={() => copy(profile.email, "email")} copied={copied === "email"}
                  />
                  <ContactRow
                    icon={<Phone size={15} />} label="Phone" value={profile.phone}
                    href={profile.phoneHref}
                    onCopy={() => copy(profile.phone, "phone")} copied={copied === "phone"}
                  />
                  <ContactRow
                    icon={<MapPin size={15} />} label="Location" value={profile.location}
                  />
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.1}>
              <GlassCard className="p-7">
                <p className="eyebrow">What's useful to include</p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Your data sources: SQL Server, BigQuery, Redshift, Snowflake, Databricks, or something else entirely.",
                    "Roughly how many people depend on the reporting today.",
                    "The specific thing that's painful: speed, trust, security, or the release process.",
                    "Whether you need someone to build it, fix it, or own it end to end.",
                  ].map((t, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="flex gap-3 text-[13px] leading-relaxed text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                      {t}
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex flex-wrap gap-2">
                <Chip tone="accent">2+ yrs enterprise BI</Chip>
                <Chip tone="cyan">Full-stack ownership</Chip>
                <Chip tone="violet">US-based</Chip>
              </div>
            </Reveal>
          </div>

          {/* ───────── Composer ───────── */}
          <Reveal delay={0.08}>
            <GlassCard className="overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="flex items-center gap-2.5">
                  <Sparkles size={14} style={{ color: "var(--accent)" }} />
                  <p className="text-[13.5px] font-semibold">Compose an intro</p>
                </div>
                <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-faint">Opens your mail app</p>
              </div>

              <div className="px-6 py-6">
                <p className="eyebrow mb-3">What's this about?</p>
                <div className="flex flex-wrap gap-2">
                  {INTENTS.map((it) => {
                    const on = it.id === intent.id;
                    return (
                      <button key={it.id} onClick={() => pickIntent(it)} data-cursor="Select"
                        className="rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors"
                        style={{
                          border: `1px solid ${on ? "color-mix(in oklab, var(--accent) 50%, transparent)" : "var(--border)"}`,
                          background: on ? "color-mix(in oklab, var(--accent) 12%, transparent)" : "var(--panel)",
                          color: on ? "var(--accent)" : "var(--text-muted)",
                        }}>
                        {it.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Field label="Your name" value={from} onChange={setFrom} placeholder="Alex Morgan" />
                  <Field label="Company" value={company} onChange={setCompany} placeholder="Acme Logistics" />
                </div>

                <div className="mt-3">
                  <label className="eyebrow mb-2 block">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={9}
                    className="w-full resize-y rounded-xl px-4 py-3 text-[13px] leading-[1.7] outline-none transition-colors"
                    style={{ border: "1px solid var(--border)", background: "var(--panel)", fontFamily: "var(--font-sans)" }}
                  />
                </div>

                <a href={mailto} data-cursor="Send"
                  className="shine mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[13.5px] font-semibold"
                  style={{ background: "var(--accent)", color: "#0b0f1a" }}>
                  <Send size={15} /> Open in mail app
                </a>

                <p className="mt-3 text-center text-[11.5px] text-faint">
                  Nothing is submitted or stored here. This builds a draft in your own email client.
                </p>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label, value, onChange, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <input
        value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-xl px-4 py-2.5 text-[13px] outline-none transition-colors placeholder:text-[color:var(--text-faint)]"
        style={{ border: "1px solid var(--border)", background: "var(--panel)" }}
      />
    </div>
  );
}

function ContactRow({
  icon, label, value, href, onCopy, copied,
}: {
  icon: React.ReactNode; label: string; value: string;
  href?: string; onCopy?: () => void; copied?: boolean;
}) {
  const inner = (
    <span className="flex min-w-0 flex-1 items-center gap-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
        style={{ background: "var(--panel)", border: "1px solid var(--border)", color: "var(--accent)" }}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[9px] tracking-[0.18em] uppercase text-faint">{label}</span>
        <span className="block truncate text-[13.5px] font-medium">{value}</span>
      </span>
    </span>
  );

  return (
    <li className="flex items-center gap-2 rounded-xl px-1 py-1.5 transition-colors">
      {href ? (
        <a href={href} data-cursor="Open" className="group flex min-w-0 flex-1 items-center gap-2">
          {inner}
          <ArrowUpRight size={14} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "var(--text-faint)" }} />
        </a>
      ) : inner}
      {onCopy && (
        <button onClick={onCopy} aria-label={`Copy ${label}`} data-cursor="Copy"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors"
          style={{ border: "1px solid var(--border)", color: copied ? "var(--mint)" : "var(--text-faint)" }}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      )}
    </li>
  );
}
