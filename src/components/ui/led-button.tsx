import * as React from "react";
import { useCallback, useRef, useState, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const ledButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden select-none",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ledButtonVariants> {
  as?: "a";
  href?: string;
  target?: string;
  rel?: string;
}

const LedButton = React.forwardRef<HTMLButtonElement, LedButtonProps>(
  ({ className, variant, size, as, href, target, rel, children, ...props }, ref) => {
    const isMobile = useIsMobile();
    const innerRef = useRef<HTMLElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLElement>) || innerRef;
    const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [flickered, setFlickered] = useState(false);

    useEffect(() => {
      const t = setTimeout(() => setFlickered(true), Math.random() * 800 + 200);
      return () => clearTimeout(t);
    }, []);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (isMobile) return;
        const el = combinedRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setLightPos({ x, y });
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const dist = Math.sqrt(distX * distX + distY * distY);
        const radius = 120;
        if (dist < radius) {
          const pull = (1 - dist / radius) * 0.15;
          el.style.transform = `translate(${distX * pull}px, ${distY * pull}px) translateY(-2px) scale(1.05)`;
        }
      },
      [isMobile, combinedRef]
    );

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      setLightPos({ x: 50, y: 50 });
      const el = combinedRef.current;
      if (el) {
        el.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        el.style.transform = "translate(0, 0) translateY(0) scale(1)";
        setTimeout(() => { if (el) el.style.transition = ""; }, 400);
      }
    }, [combinedRef]);

    const isOutline = variant === "outline";
    const baseClasses = isOutline
      ? "border-2 border-accent/40 bg-background text-foreground"
      : "bg-accent text-accent-foreground";

    const sharedProps = {
      ref: combinedRef as any,
      className: cn(
        ledButtonVariants({ variant, size }),
        baseClasses,
        "led-btn-3d transition-all duration-200 will-change-transform",
        flickered ? "led-btn-on" : "led-btn-off",
        isPressed && "led-btn-pressed",
        className
      ),
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: () => setIsPressed(true),
      onMouseUp: () => setIsPressed(false),
      onTouchStart: () => setIsPressed(true),
      onTouchEnd: () => setIsPressed(false),
      style: { "--led-x": `${lightPos.x}%`, "--led-y": `${lightPos.y}%` } as React.CSSProperties,
    };

    const inner = (
      <>
        <span
          className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-300"
          style={{
            background: isOutline
              ? `radial-gradient(circle at var(--led-x) var(--led-y), hsl(var(--accent) / ${isHovered ? 0.15 : 0}) 0%, transparent 70%)`
              : `radial-gradient(circle at var(--led-x) var(--led-y), hsl(var(--glow-primary) / ${isHovered ? 0.3 : 0.05}) 0%, transparent 70%)`,
          }}
        />
        <span
          className="absolute inset-x-0 top-0 h-[45%] pointer-events-none rounded-t-lg transition-opacity duration-300"
          style={{
            background: "linear-gradient(180deg, hsl(var(--glow-primary) / 0.12) 0%, transparent 100%)",
            opacity: isHovered ? 1 : 0.5,
          }}
        />
        <span className="led-btn-sweep absolute inset-0 pointer-events-none rounded-lg" />
        <span className="relative z-10">{children}</span>
      </>
    );

    if (as === "a") {
      return (
        <a href={href} target={target} rel={rel} {...(sharedProps as any)}>
          {inner}
        </a>
      );
    }

    return (
      <button {...sharedProps} {...(props as any)}>
        {inner}
      </button>
    );
  }
);
LedButton.displayName = "LedButton";

export { LedButton, ledButtonVariants };
