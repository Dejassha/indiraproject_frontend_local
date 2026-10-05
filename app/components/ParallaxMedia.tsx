"use client";

import { useEffect, useRef } from "react";

interface ParallaxMediaProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export default function ParallaxMedia({
  children,
  className = "",
  speed = 0.08,
}: ParallaxMediaProps) {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 767px)");
    let animationFrame = 0;

    const updatePosition = () => {
      animationFrame = 0;
      if (reducedMotion.matches || smallScreen.matches) {
        media.style.transform = "translate3d(0, 0, 0) scale(1.06)";
        return;
      }

      const bounds = media.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = bounds.top + bounds.height / 2 - viewportCenter;
      const offset = Math.max(-32, Math.min(32, distanceFromCenter * -speed));

      media.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.06)`;
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updatePosition);
      }
    };

    updatePosition();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    smallScreen.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      smallScreen.removeEventListener("change", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [speed]);

  return (
    <div ref={mediaRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
