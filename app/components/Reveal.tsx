"use client";

import React from "react";

interface RevealProps {
  isVisible: boolean;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export default function Reveal({
  isVisible,
  children,
  delay = 0,
  duration = 1200,
  direction = "down",
  className = "",
}: RevealProps) {
  const getTransform = () => {
    if (isVisible) {
      return "translate-x-0 translate-y-0 opacity-100";
    }

    switch (direction) {
      case "down":
        return "-translate-y-[300px] opacity-0";

      case "up":
        return "translate-y-[300px] opacity-0";

      case "left":
        return "translate-x-[300px] opacity-0";

      case "right":
        return "-translate-x-[300px] opacity-0";

      case "none":
        return "opacity-0";

      default:
        return "-translate-y-[300px] opacity-0";
    }
  };

  return (
    <div
      style={{
        transitionProperty: "transform, opacity",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}