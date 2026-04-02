import { useState, useEffect, useRef } from "react";

const WireConnectionIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"wires" | "spark" | "flash" | "done">("wires");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Canvas-based spark particles
  useEffect(() => {
    if (phase !== "spark") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const particleCount = isMobile ? 20 : 40;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number;
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1, maxLife: 0.4 + Math.random() * 0.4,
        size: 1 + Math.random() * 3,
      };
    });

    let frame: number;
    const start = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - start) / 1000, 0.05);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particles) {
        p.life -= dt / p.maxLife;
        if (p.life <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        const alpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(45,100%,70%,${alpha})`;
        ctx.fill();
        // glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(45,100%,60%,${alpha * 0.2})`;
        ctx.fill();
      }

      if (alive) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase, isMobile]);

  // Phase timing
  useEffect(() => {
    // wires animate for 1.8s via CSS, then spark
    const t1 = setTimeout(() => setPhase("spark"), 1800);
    const t2 = setTimeout(() => setPhase("flash"), 2200);
    const t3 = setTimeout(() => setPhase("done"), 2800);
    const t4 = setTimeout(onComplete, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        opacity: phase === "flash" ? 0 : 1,
        transition: "opacity 0.5s ease-out",
      }}
    >
      {/* SVG Wires */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="wire-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="wire-left-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(0,0%,40%)" />
            <stop offset="90%" stopColor="hsl(0,0%,70%)" />
            <stop offset="100%" stopColor="hsl(45,100%,60%)" />
          </linearGradient>
          <linearGradient id="wire-right-grad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(0,0%,40%)" />
            <stop offset="90%" stopColor="hsl(0,0%,70%)" />
            <stop offset="100%" stopColor="hsl(45,100%,60%)" />
          </linearGradient>
        </defs>

        {/* Left wire */}
        <g filter="url(#wire-glow)">
          <path
            d="M -50 250 Q 150 230, 300 250 Q 380 260, 460 250 L 495 250"
            fill="none"
            stroke="url(#wire-left-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            className="wire-left"
          />
          {/* Copper tip */}
          <circle cx="495" cy="250" r="4" fill="hsl(45,100%,60%)" className="wire-left-tip" />
        </g>

        {/* Right wire */}
        <g filter="url(#wire-glow)">
          <path
            d="M 1050 250 Q 850 270, 700 250 Q 620 240, 540 250 L 505 250"
            fill="none"
            stroke="url(#wire-right-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            className="wire-right"
          />
          <circle cx="505" cy="250" r="4" fill="hsl(45,100%,60%)" className="wire-right-tip" />
        </g>

        {/* Spark at connection point */}
        {phase === "spark" && (
          <circle cx="500" cy="250" r="12" fill="hsl(45,100%,80%)" className="animate-ping" opacity="0.8" />
        )}
      </svg>

      {/* Canvas for spark particles */}
      {(phase === "spark" || phase === "flash") && (
        <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />
      )}

      {/* White flash overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: "hsl(45,100%,90%)",
          opacity: phase === "spark" ? 0.6 : phase === "flash" ? 0 : 0,
          transition: "opacity 0.15s ease-out",
        }}
      />
    </div>
  );
};

export default WireConnectionIntro;
