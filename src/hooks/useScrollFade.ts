import { useEffect, useRef } from "react";

interface ScrollFadeOptions {
  threshold?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export const useScrollFade = (options: ScrollFadeOptions = {}) => {
  const { threshold = 0.15, staggerChildren = false, staggerDelay = 100 } = options;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fade-up");

          if (staggerChildren) {
            const children = el.querySelectorAll("[data-stagger]");
            children.forEach((child, i) => {
              (child as HTMLElement).style.animationDelay = `${i * staggerDelay}ms`;
              child.classList.add("animate-fade-up");
            });
          }

          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, staggerChildren, staggerDelay]);

  return ref;
};
