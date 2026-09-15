import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "../lib/routes";
import { useLockScroll } from "../lib/hooks";
import { Kbd } from "./ui";

export default function Nav({
  theme, toggleTheme, openPalette,
}: { theme: "dark" | "light"; toggleTheme: () => void; openPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useLockScroll(open);
  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled ? "color-mix(in oklab, var(--bg) 82%, transparent)" : "transparent",
            backdropFilter: scrolled ? "blur(22px) saturate(160%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(22px) saturate(160%)" : "none",
            borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          }}
        >
          <div className="shell-wide flex h-[68px] items-center justify-between gap-4 overflow-hidden">
            {/* Monogram */}
            <Link to="/" className="group flex items-center gap-3" data-cursor="Home">
              <span
                className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[11px]"
                style={{ background: "linear-gradient(140deg, var(--accent), #f59e0b)" }}
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="#0b0f1a">
                  <rect x="3" y="12" width="4" height="9" rx="1.4" />
                  <rect x="10" y="7" width="4" height="14" rx="1.4" opacity=".82" />
                  <rect x="17" y="3" width="4" height="18" rx="1.4" opacity=".62" />
                </svg>
              </span>
              <span className="hidden leading-tight whitespace-nowrap sm:block">
                <span className="block text-[13.5px] font-semibold tracking-tight">Rahul Reddy CH</span>
                <span className="block font-mono text-[9.5px] tracking-[0.2em] uppercase text-faint">
                  Power BI Developer
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 xl:flex">
              {ROUTES.map((r) => (
                <NavLink key={r.path} to={r.path} end={r.path === "/"} data-cursor={r.index}>
                  {({ isActive }) => (
                    <span className="relative block px-3.5 py-2 text-[13px] font-medium transition-colors duration-300"
                      style={{ color: isActive ? "var(--text)" : "var(--text-muted)" }}>
                      <span className="mr-1.5 font-mono text-[9.5px] opacity-55">{r.index}</span>
                      {r.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full"
                          style={{ background: "var(--panel)", border: "1px solid var(--border)" }}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={openPalette}
                data-cursor="Search"
                className="hidden items-center gap-2 rounded-full py-1.5 pr-1.5 pl-3 text-[12px] whitespace-nowrap transition-colors xl:flex"
                style={{ border: "1px solid var(--border)", background: "var(--panel)", color: "var(--text-muted)" }}
                aria-label="Open command palette"
              >
                <Command size={12.5} />
                <span>Jump to…</span>
                <Kbd>⌘K</Kbd>
              </button>

              <button
                onClick={toggleTheme}
                data-cursor={theme === "dark" ? "Light" : "Dark"}
                aria-label="Toggle colour theme"
                className="grid h-9 w-9 place-items-center rounded-full transition-colors"
                style={{ border: "1px solid var(--border)", background: "var(--panel)" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -80, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 80, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.28 }}
                    className="grid place-items-center"
                  >
                    {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              <Link
                to="/contact"
                data-cursor="Let's talk"
                className="shine hidden items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-semibold whitespace-nowrap sm:inline-flex"
                style={{ background: "var(--accent)", color: "#0b0f1a" }}
              >
                Get in touch <ArrowUpRight size={13} />
              </Link>

              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="grid h-9 w-9 place-items-center rounded-full xl:hidden"
                style={{ border: "1px solid var(--border)", background: "var(--panel)" }}
              >
                <Menu size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] xl:hidden"
            style={{ background: "color-mix(in oklab, var(--bg) 96%, transparent)", backdropFilter: "blur(20px)" }}
          >
            <div className="shell flex h-[68px] items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-faint">Navigation</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full"
                style={{ border: "1px solid var(--border)" }}>
                <X size={16} />
              </button>
            </div>
            <nav className="shell mt-6 flex flex-col">
              {ROUTES.map((r, i) => (
                <motion.div key={r.path}
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <NavLink to={r.path} end={r.path === "/"}
                    className="flex items-baseline gap-4 border-b py-5"
                    style={{ borderColor: "var(--border)" }}>
                    {({ isActive }) => (
                      <>
                        <span className="font-mono text-[11px]" style={{ color: isActive ? "var(--accent)" : "var(--text-faint)" }}>{r.index}</span>
                        <span className="flex-1">
                          <span className="block text-[26px] font-semibold tracking-tight"
                            style={{ color: isActive ? "var(--accent)" : "var(--text)" }}>{r.label}</span>
                          <span className="mt-0.5 block text-[12px] text-muted">{r.blurb}</span>
                        </span>
                        <ArrowUpRight size={18} style={{ color: "var(--text-faint)" }} />
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="shell mt-8 flex gap-3">
              <a href="mailto:rahul.r24.c@gmail.com"
                className="flex-1 rounded-full px-4 py-3 text-center text-[13px] font-semibold"
                style={{ background: "var(--accent)", color: "#0b0f1a" }}>Email me</a>
              <a href="tel:+18565269115"
                className="flex-1 rounded-full px-4 py-3 text-center text-[13px] font-semibold"
                style={{ border: "1px solid var(--border-strong)" }}>Call</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
