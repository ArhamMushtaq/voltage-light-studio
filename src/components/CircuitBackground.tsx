const CircuitBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `
        linear-gradient(hsl(var(--accent) / 0.3) 1px, transparent 1px),
        linear-gradient(90deg, hsl(var(--accent) / 0.3) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px",
    }} />

    {/* Animated electric flow lines */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flow1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(45 100% 60%)" stopOpacity="0">
            <animate attributeName="offset" values="-0.3;1" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="15%" stopColor="hsl(45 100% 60%)" stopOpacity="0.6">
            <animate attributeName="offset" values="-0.15;1.15" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="30%" stopColor="hsl(45 100% 60%)" stopOpacity="0">
            <animate attributeName="offset" values="0;1.3" dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        <linearGradient id="flow2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(0 0% 100%)" stopOpacity="0">
            <animate attributeName="offset" values="-0.3;1" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="15%" stopColor="hsl(0 0% 100%)" stopOpacity="0.4">
            <animate attributeName="offset" values="-0.15;1.15" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="30%" stopColor="hsl(0 0% 100%)" stopOpacity="0">
            <animate attributeName="offset" values="0;1.3" dur="6s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      {/* Horizontal lines */}
      <line x1="0" y1="25%" x2="100%" y2="25%" stroke="url(#flow1)" strokeWidth="1" />
      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#flow1)" strokeWidth="1" style={{ animationDelay: "2s" }} />
      <line x1="0" y1="75%" x2="100%" y2="75%" stroke="url(#flow1)" strokeWidth="1" style={{ animationDelay: "1s" }} />
      {/* Vertical lines */}
      <line x1="20%" y1="0" x2="20%" y2="100%" stroke="url(#flow2)" strokeWidth="1" />
      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="url(#flow2)" strokeWidth="1" />
      <line x1="80%" y1="0" x2="80%" y2="100%" stroke="url(#flow2)" strokeWidth="1" />
    </svg>

    {/* Corner accent nodes */}
    {[
      { top: "25%", left: "20%" },
      { top: "50%", left: "50%" },
      { top: "75%", left: "80%" },
    ].map((pos, i) => (
      <div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-accent/20 animate-glow-pulse"
        style={{ ...pos, animationDelay: `${i * 1.5}s` }}
      />
    ))}
  </div>
);

export default CircuitBackground;
