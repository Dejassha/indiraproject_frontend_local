"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTextTrailProps {
  text: string;
  className?: string;
}

export default function ScrollTextTrail({ text, className = "" }: ScrollTextTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    if (chars.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Trigger when it enters the viewport
          toggleActions: "play none none none" // Play once automatically without scrubbing
        }
      });
      
      tl.to(chars, {
        y: "0%",
        opacity: 1, 
        stagger: 0.012, 
        ease: "power3.out",
        duration: 0.75
      }, 0);
      
      tl.to(chars, {
        color: "#13193A",
        stagger: 0.012,
        ease: "power2.inOut",
        duration: 0.8
      }, 0.4); // Start turning black before the fall finishes
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`text-[#E91E63] ${className}`}>
      {words.map((word, wordIndex) => {
        const isItalic = word.startsWith("*") && word.endsWith("*");
        const cleanWord = isItalic ? word.slice(1, -1) : word;

        return (
          <React.Fragment key={wordIndex}>
            <span className={`inline-block whitespace-nowrap ${isItalic ? "italic" : ""}`}>
              {cleanWord.split("").map((char, charIndex) => (
                <span key={charIndex} className="inline-block overflow-hidden align-top">
                  <span className="char inline-block -translate-y-[115%] opacity-0">
                    {char}
                  </span>
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </div>
  );
}
