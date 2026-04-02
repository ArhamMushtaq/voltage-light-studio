import { useState, useEffect } from "react";

const ElectricLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"dark" | "flash1" | "dark2" | "flash2" | "dark3" | "flash3" | "reveal" | "done">("dark");

  useEffect(() => {
    const timeline = [
      { phase: "flash1" as const, delay: 300 },
      { phase: "dark2" as const, delay: 100 },
      { phase: "flash2" as const, delay: 150 },
      { phase: "dark3" as const, delay: 80 },
      { phase: "flash3" as const, delay: 200 },
      { phase: "reveal" as const, delay: 400 },
      { phase: "done" as const, delay: 800 },
    ];

    let totalDelay = 0;
    const timers: NodeJS.Timeout[] = [];

    timeline.forEach(({ phase: p, delay }) => {
      totalDelay += delay;
      timers.push(setTimeout(() => setPhase(p), totalDelay));
    });

    timers.push(setTimeout(onComplete, totalDelay));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  const isFlash = phase === "flash1" || phase === "flash2" || phase === "flash3";
  const isReveal = phase === "reveal";

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{
        backgroundColor: isFlash ? "transparent" : isReveal ? "transparent" : "hsl(0 0% 3%)",
        transition: isReveal
          ? "background-color 0.6s ease-out, opacity 0.6s ease-out"
          : "none",
        opacity: isReveal ? 0 : 1,
      }}
    >
      {/* Flash overlay */}
      {isFlash && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, 
              hsl(0 0% 100% / ${phase === "flash3" ? 0.6 : phase === "flash2" ? 0.3 : 0.15}) 0%, 
              hsl(0 0% 100% / ${phase === "flash3" ? 0.15 : 0.05}) 50%, 
              transparent 80%)`,
            animation: "electric-flicker 0.1s ease-out",
          }}
        />
      )}

      {/* Spark lines */}
      {isFlash && (
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: phase === "flash3" ? 0.6 : 0.3 }}>
          <line
            x1="50%" y1="30%" x2="48%" y2="70%"
            stroke="white" strokeWidth="1.5"
            style={{ filter: "blur(1px) drop-shadow(0 0 4px white)" }}
          />
          <line
            x1="52%" y1="25%" x2="54%" y2="65%"
            stroke="white" strokeWidth="1"
            style={{ filter: "blur(1px) drop-shadow(0 0 3px white)" }}
          />
        </svg>
      )}

      {/* Center glow on reveal */}
      {isReveal && (
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, hsl(0 0% 100% / 0.08) 0%, transparent 60%)",
            animation: "glow-expand 0.8s ease-out forwards",
          }}
        />
      )}
    </div>
  );
};

export default ElectricLoader;
