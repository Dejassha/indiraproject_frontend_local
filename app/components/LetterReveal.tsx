"use client";

import React from "react";

interface LetterRevealProps {
  text?: string;
  children?: React.ReactNode;
  isVisible?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
  direction?: "top-to-bottom" | "bottom-to-top";
  mode?: "letter" | "word";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export default function LetterReveal({
  text,
  children,
  isVisible = true,
  delay = 0,
  stagger = 28,
  duration = 750,
  direction = "top-to-bottom",
  mode = "letter",
  className = "",
  as: Component = "span",
}: LetterRevealProps) {
  const content = text ?? (typeof children === "string" ? children : "");

  if (!content) {
    return <Component className={className}>{children}</Component>;
  }

  const words = content.split(" ");
  let globalCharIndex = 0;

  const initialTransform =
    direction === "top-to-bottom" ? "-translate-y-[115%]" : "translate-y-[115%]";

  return (
    <Component className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => {
        const wordKey = `word-${wordIndex}`;

        if (mode === "word") {
          const wordDelay = delay + wordIndex * (stagger * 2.5);
          return (
            <span key={wordKey} className="inline-block overflow-hidden mr-[0.28em] align-top pb-[0.1em]">
              <span
                style={{
                  transitionDuration: `${duration}ms`,
                  transitionDelay: `${wordDelay}ms`,
                }}
                className={`inline-block transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : `${initialTransform} opacity-0`
                }`}
              >
                {word}
              </span>
            </span>
          );
        }

        const chars = word.split("");
        return (
          <span key={wordKey} className="inline-block whitespace-nowrap mr-[0.28em] align-top">
            {chars.map((char, charIndex) => {
              const charKey = `${wordKey}-char-${charIndex}`;
              const charDelay = delay + globalCharIndex * stagger;
              globalCharIndex++;

              return (
                <span key={charKey} className="inline-block overflow-hidden align-top pb-[0.1em]">
                  <span
                    style={{
                      transitionDuration: `${duration}ms`,
                      transitionDelay: `${charDelay}ms`,
                    }}
                    className={`inline-block transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : `${initialTransform} opacity-0`
                    }`}
                  >
                    {char}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
}
