import { useCallback, useRef } from "react";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export const useMagnetic = (options: MagneticOptions = {}) => {
  const { strength = 0.3, radius = 100 } = options;
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        el.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`;
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    el.style.transform = "translate(0, 0)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  }, []);

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
};
