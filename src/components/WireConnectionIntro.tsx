import { useState, useEffect, useRef } from "react";
import wireLeftImg from "@/assets/wire-left.png";
import wireRightImg from "@/assets/wire-right.png";

const WireConnectionIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"wires" | "spark" | "flash" | "done">("wires");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Canvas spark particles
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
      life: number; maxLife: number; size: number; hue: number;
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
        p.vy += 0.15;
        p.vx *= 0.96;
        p.vy *= 0.96;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,75%,${p.life})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,60%,${p.life * 0.15})`;
        ctx.fill();
      }
      if (alive) frame = requestAnimationFrame(animate);
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

  const wireHeight = isMobile ? 60 : 100;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: "hsl(0 0% 3%)",
        opacity: phase === "flash" ? 0 : 1,
        transition: "opacity 0.6s ease-out",
      }}
    >
      {/* Left wire (black) - slides in from left */}
      <div
        className="absolute wire-img-left"
        style={{
          right: "50%",
          top: "50%",
          transform: "translateY(-50%)",
          height: wireHeight,
          width: "55%",
        }}
      >
        <img
          src={wireLeftImg}
          alt=""
          style={{
            width: "100%",
            height: wireHeight,
            objectFit: "cover",
            objectPosition: "right center",
          }}
        />
        {/* MR TRADERS branding */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: "50%",
            right: isMobile ? "30%" : "25%",
            transform: "translateY(-50%)",
            color: "hsla(0,0%,60%,0.5)",
            fontSize: isMobile ? 8 : 13,
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          MR TRADERS
        </span>
      </div>

      {/* Right wire (red) - slides in from right */}
      <div
        className="absolute wire-img-right"
        style={{
          left: "50%",
          top: "50%",
          transform: "translateY(-50%)",
          height: wireHeight,
          width: "55%",
        }}
      >
        <img
          src={wireRightImg}
          alt=""
          style={{
            width: "100%",
            height: wireHeight,
            objectFit: "cover",
            objectPosition: "left center",
          }}
        />
        {/* MR TRADERS branding */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: "50%",
            left: isMobile ? "30%" : "25%",
            transform: "translateY(-50%)",
            color: "hsla(0,0%,85%,0.35)",
            fontSize: isMobile ? 8 : 13,
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          MR TRADERS
        </span>
      </div>

      {/* Spark glow at center */}
      {phase === "spark" && (
        <div
          className="absolute z-10 rounded-full spark-center-glow"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 60,
            height: 60,
            background: "radial-gradient(circle, hsla(45,100%,90%,0.9) 0%, hsla(45,100%,70%,0.4) 40%, transparent 70%)",
          }}
        />
      )}

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
