import { useCallback, useRef } from "react";

interface TiltOptions {
  maxTilt?: number;
  scale?: number;
  speed?: number;
}

export const useTilt = (options: TiltOptions = {}) => {
  const { maxTilt = 8, scale = 1.02, speed = 400 } = options;
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale},${scale},${scale})`;

      // Light reflection
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      el.style.setProperty("--glare-x", `${glareX}%`);
      el.style.setProperty("--glare-y", `${glareY}%`);
    },
    [maxTilt, scale]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${speed}ms ease-out`;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, speed);
  }, [speed]);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "";
  }, []);

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
  };
};
