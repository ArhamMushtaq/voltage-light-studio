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
    const particleCount = isMobile ? 25 : 50;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number;
      hue: number;
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 8;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1, maxLife: 0.3 + Math.random() * 0.5,
        size: 1 + Math.random() * 3,
        hue: 40 + Math.random() * 20,
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
        p.vy += 0.15; // gravity
        p.vx *= 0.96;
        p.vy *= 0.96;
        const alpha = p.life;
        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,75%,${alpha})`;
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,60%,${alpha * 0.15})`;
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
    const t1 = setTimeout(() => setPhase("spark"), 1800);
    const t2 = setTimeout(() => setPhase("flash"), 2300);
    const t3 = setTimeout(() => setPhase("done"), 2900);
    const t4 = setTimeout(onComplete, 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "hsl(0 0% 3%)",
        opacity: phase === "flash" ? 0 : 1,
        transition: "opacity 0.6s ease-out",
      }}
    >
      {/* SVG Wires with branding */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="wire-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="spark-glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="text-glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Left wire gradient - dark rubber cable */}
          <linearGradient id="wire-left-body" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(0,0%,22%)" />
            <stop offset="30%" stopColor="hsl(0,0%,15%)" />
            <stop offset="50%" stopColor="hsl(0,0%,20%)" />
            <stop offset="70%" stopColor="hsl(0,0%,12%)" />
            <stop offset="100%" stopColor="hsl(0,0%,18%)" />
          </linearGradient>
          <linearGradient id="wire-right-body" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(0,0%,22%)" />
            <stop offset="30%" stopColor="hsl(0,0%,15%)" />
            <stop offset="50%" stopColor="hsl(0,0%,20%)" />
            <stop offset="70%" stopColor="hsl(0,0%,12%)" />
            <stop offset="100%" stopColor="hsl(0,0%,18%)" />
          </linearGradient>

          {/* Copper tip gradient */}
          <linearGradient id="copper-tip" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(30,60%,35%)" />
            <stop offset="40%" stopColor="hsl(35,70%,50%)" />
            <stop offset="60%" stopColor="hsl(40,80%,60%)" />
            <stop offset="100%" stopColor="hsl(45,90%,65%)" />
          </linearGradient>

          {/* Wire highlight for rubber sheen */}
          <linearGradient id="wire-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(0,0%,100%)" stopOpacity="0.08" />
            <stop offset="30%" stopColor="hsl(0,0%,100%)" stopOpacity="0.03" />
            <stop offset="100%" stopColor="hsl(0,0%,100%)" stopOpacity="0" />
          </linearGradient>

          {/* Inner current glow */}
          <linearGradient id="current-glow-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(45,100%,60%)" stopOpacity="0" />
            <stop offset="70%" stopColor="hsl(45,100%,60%)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(45,100%,60%)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="current-glow-right" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(45,100%,60%)" stopOpacity="0" />
            <stop offset="70%" stopColor="hsl(45,100%,60%)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(45,100%,60%)" stopOpacity="0.3" />
          </linearGradient>

          <clipPath id="left-wire-clip">
            <path d="M -80 235 Q 150 220, 350 240 Q 440 250, 530 245 L 580 245 L 580 260 L 530 260 Q 440 255, 350 260 Q 150 275, -80 265 Z" />
          </clipPath>
          <clipPath id="right-wire-clip">
            <path d="M 1280 235 Q 1050 220, 850 240 Q 760 250, 670 245 L 620 245 L 620 260 L 670 260 Q 760 255, 850 260 Q 1050 275, 1280 265 Z" />
          </clipPath>
        </defs>

        {/* ===== LEFT WIRE ===== */}
        <g className="wire-left" filter="url(#wire-glow)">
          {/* Main cable body */}
          <path
            d="M -80 235 Q 150 220, 350 240 Q 440 250, 530 245 L 580 245 L 580 260 L 530 260 Q 440 255, 350 260 Q 150 275, -80 265 Z"
            fill="url(#wire-left-body)"
            stroke="hsl(0,0%,10%)"
            strokeWidth="0.5"
          />
          {/* Rubber sheen highlight */}
          <path
            d="M -80 235 Q 150 220, 350 240 Q 440 250, 530 245 L 580 245 L 580 248 L 530 248 Q 440 252, 350 243 Q 150 224, -80 238 Z"
            fill="url(#wire-highlight)"
          />
          {/* Inner current glow */}
          <path
            d="M -80 242 Q 150 230, 350 247 Q 440 252, 530 250 L 580 250 L 580 255 L 530 255 Q 440 253, 350 255 Q 150 268, -80 258 Z"
            fill="url(#current-glow-left)"
            className="current-pulse"
          />
          {/* Copper exposed tip */}
          <rect x="570" y="243" width="25" height="19" rx="2" fill="url(#copper-tip)" />
          <rect x="570" y="243" width="25" height="6" rx="1" fill="hsl(40,80%,65%)" opacity="0.3" />

          {/* MR TRADERS branding on left wire */}
          <g clipPath="url(#left-wire-clip)" filter="url(#text-glow)">
            <text
              x="280"
              y="254"
              fill="hsl(0,0%,40%)"
              fontSize="9"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="600"
              letterSpacing="3"
              textAnchor="middle"
            >
              MR TRADERS
            </text>
          </g>
        </g>

        {/* ===== RIGHT WIRE ===== */}
        <g className="wire-right" filter="url(#wire-glow)">
          {/* Main cable body */}
          <path
            d="M 1280 235 Q 1050 220, 850 240 Q 760 250, 670 245 L 620 245 L 620 260 L 670 260 Q 760 255, 850 260 Q 1050 275, 1280 265 Z"
            fill="url(#wire-right-body)"
            stroke="hsl(0,0%,10%)"
            strokeWidth="0.5"
          />
          {/* Rubber sheen highlight */}
          <path
            d="M 1280 235 Q 1050 220, 850 240 Q 760 250, 670 245 L 620 245 L 620 248 L 670 248 Q 760 252, 850 243 Q 1050 224, 1280 238 Z"
            fill="url(#wire-highlight)"
          />
          {/* Inner current glow */}
          <path
            d="M 1280 242 Q 1050 230, 850 247 Q 760 252, 670 250 L 620 250 L 620 255 L 670 255 Q 760 253, 850 255 Q 1050 268, 1280 258 Z"
            fill="url(#current-glow-right)"
            className="current-pulse"
          />
          {/* Copper exposed tip */}
          <rect x="605" y="243" width="25" height="19" rx="2" fill="url(#copper-tip)" />
          <rect x="605" y="243" width="25" height="6" rx="1" fill="hsl(40,80%,65%)" opacity="0.3" />

          {/* MR TRADERS branding on right wire */}
          <g clipPath="url(#right-wire-clip)" filter="url(#text-glow)">
            <text
              x="920"
              y="254"
              fill="hsl(0,0%,40%)"
              fontSize="9"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="600"
              letterSpacing="3"
              textAnchor="middle"
            >
              MR TRADERS
            </text>
          </g>
        </g>

        {/* ===== SPARK AT CONNECTION ===== */}
        {phase === "spark" && (
          <g filter="url(#spark-glow)">
            <circle cx="600" cy="252" r="8" fill="hsl(45,100%,90%)" className="spark-core" />
            <circle cx="600" cy="252" r="16" fill="hsl(45,100%,80%)" opacity="0.5" className="spark-core" />
            <circle cx="600" cy="252" r="28" fill="hsl(45,100%,70%)" opacity="0.2" className="spark-ring" />
            {/* Electric arc lines */}
            <line x1="592" y1="245" x2="585" y2="235" stroke="hsl(45,100%,85%)" strokeWidth="1.5" opacity="0.8" className="spark-arc" />
            <line x1="608" y1="245" x2="615" y2="235" stroke="hsl(45,100%,85%)" strokeWidth="1.5" opacity="0.8" className="spark-arc" />
            <line x1="595" y1="260" x2="588" y2="272" stroke="hsl(45,100%,85%)" strokeWidth="1" opacity="0.6" className="spark-arc" />
            <line x1="605" y1="260" x2="612" y2="272" stroke="hsl(45,100%,85%)" strokeWidth="1" opacity="0.6" className="spark-arc" />
          </g>
        )}
      </svg>

      {/* Canvas for spark particles */}
      {(phase === "spark" || phase === "flash") && (
        <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />
      )}

      {/* Flash overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(45,100%,90%), hsl(45,50%,70%), transparent 70%)",
          opacity: phase === "spark" ? 0.7 : 0,
          transition: "opacity 0.2s ease-out",
        }}
      />
    </div>
  );
};

export default WireConnectionIntro;
