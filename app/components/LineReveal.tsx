"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LineReveal({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !textRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const splitText = new SplitType(textRef.current, { types: "lines" });

    splitText.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "inline-block";
      wrapper.style.verticalAlign = "top";
      wrapper.style.width = "100%";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        splitText.lines,
        { y: "115%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "power4.out",
          delay: delay / 1000,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ctx.revert();
      splitText.revert();
    };
  }, [isMounted, delay]);

  return (
    <p ref={textRef} className={className} style={{ opacity: isMounted ? 1 : 0 }}>
      {children}
    </p>
  );
}
