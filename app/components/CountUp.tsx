"use client";

import React, { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  isVisible: boolean;
  decimals?: number;
  padZeros?: number;
  className?: string;
}

export default function CountUp({
  end,
  start = 0,
  duration = 1600,
  delay = 0,
  prefix = "",
  suffix = "",
  isVisible,
  decimals = 0,
  padZeros,
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState<number>(start);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isVisible) {
      setCount(start);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now();

      const updateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = start + (end - start) * easeOut;

        setCount(currentVal);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };

      rafRef.current = requestAnimationFrame(updateCount);
    }, delay);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isVisible, end, start, duration, delay]);

  const rawRounded = Math.round(count).toString();
  const formattedValue =
    decimals > 0
      ? count.toFixed(decimals)
      : padZeros
      ? rawRounded.padStart(padZeros, "0")
      : rawRounded;

  return (
    <span className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
