import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number };

/**
 * Ambient "data model" field: drifting nodes joined by relationship lines,
 * with a soft pointer field that pushes nodes apart on approach.
 */
export default function Background({ theme }: { theme: "dark" | "light" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0, h = 0, dpr = 1;
    let nodes: Node[] = [];

    const seed = () => {
      const area = w * h;
      const count = Math.max(26, Math.min(88, Math.round(area / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.19,
        vy: (Math.random() - 0.5) * 0.19,
        r: Math.random() * 1.7 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const LINK = 132;

    const draw = (t: number) => {
      const dark = themeRef.current === "dark";
      ctx.clearRect(0, 0, w, h);

      const nodeColor = dark ? "242,200,17" : "180,140,10";
      const linkColor = dark ? "255,255,255" : "20,30,60";
      const hotColor = dark ? "34,211,238" : "8,145,178";

      // relationship lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / LINK) * (dark ? 0.16 : 0.13);
          ctx.strokeStyle = `rgba(${linkColor},${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx; n.y += n.vy; n.pulse += 0.016;
          if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;

          if (pointer.current.active) {
            const dx = n.x - pointer.current.x;
            const dy = n.y - pointer.current.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 24000 && d2 > 1) {
              const d = Math.sqrt(d2);
              const force = (1 - d / 155) * 0.85;
              n.x += (dx / d) * force;
              n.y += (dy / d) * force;
            }
          }
        }

        const near = pointer.current.active &&
          Math.hypot(n.x - pointer.current.x, n.y - pointer.current.y) < 165;
        const breathe = 0.55 + Math.sin(n.pulse) * 0.28;
        const c = near ? hotColor : nodeColor;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (near ? 1.9 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},${(near ? 0.95 : 0.5) * breathe + 0.18})`;
        ctx.fill();

        if (near) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 5.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c},0.07)`;
          ctx.fill();
        }
      }

      // pointer halo
      if (pointer.current.active && !reduced) {
        const g = ctx.createRadialGradient(
          pointer.current.x, pointer.current.y, 0,
          pointer.current.x, pointer.current.y, 190
        );
        g.addColorStop(0, `rgba(${dark ? "242,200,17" : "201,155,6"},0.055)`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(pointer.current.x - 190, pointer.current.y - 190, 380, 380);
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      pointer.current.active = true;
    };
    const onLeave = () => { pointer.current.active = false; };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 grid-bg grid-fade" />
      <div className="absolute inset-0 overflow-hidden"><div className="aurora" /></div>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-x-0 bottom-0 h-64"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </div>
  );
}
