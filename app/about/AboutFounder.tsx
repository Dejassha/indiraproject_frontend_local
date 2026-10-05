"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "../components/Reveal";
import LetterReveal from "../components/LetterReveal";

interface AboutFounderProps {
  isVisible?: boolean;
}

export default function AboutFounder({ isVisible: forcedVisible }: AboutFounderProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [slopeProgress, setSlopeProgress] = useState(0); // 0 (V-shape opening) to 1 (A-shape peak)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const start = windowHeight;
      const end = windowHeight * 0.2;
      const rawProgress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setSlopeProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeVisible = forcedVisible !== undefined ? forcedVisible : isRevealed;

  const marqueeItems = [
    "INDIRA GROUP.",
    "INDIRA GROUP.",
    "INDIRA GROUP.",
    "INDIRA GROUP.",
  ];
  const loopMarquee = [...marqueeItems, ...marqueeItems];

  const sidesY = Math.round(25 + 140 * slopeProgress);
  const centerY = Math.round(165 - 140 * slopeProgress);

  const topPolygonPoints = `0,0 0,${sidesY} 960,${centerY} 1920,${sidesY} 1920,0`;

  const bottomSidesY = Math.round(155 - 140 * slopeProgress);
  const bottomCenterY = Math.round(15 + 140 * slopeProgress);
  const bottomPolygonPoints = `0,180 0,${bottomSidesY} 960,${bottomCenterY} 1920,${bottomSidesY} 1920,180`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden text-zinc-900 bg-white select-none pt-24 sm:pt-32 md:pt-36 pb-24 sm:pb-32"
    >

      <div className="absolute inset-0 pointer-events-none flex justify-between w-full px-2 sm:px-6 md:px-10 lg:px-14 xl:px-16 z-0">
        <div className="w-px h-full bg-zinc-200/60" />
        <div className="w-px h-full bg-zinc-200/60 hidden sm:block" />
        <div className="w-px h-full bg-zinc-200/60" />
        <div className="w-px h-full bg-zinc-200/60 hidden sm:block" />
        <div className="w-px h-full bg-zinc-200/60" />
        <div className="w-px h-full bg-zinc-200/60 hidden sm:block" />
        <div className="w-px h-full bg-zinc-200/60" />
        <div className="w-px h-full bg-zinc-200/60 hidden md:block" />
        <div className="w-px h-full bg-zinc-200/60" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="text-center max-w-5xl mx-auto px-4 sm:px-6 mb-1 sm:mb-2">
          <Reveal isVisible={activeVisible} direction="down" duration={700} delay={100}>
            <div className="inline-flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E91E63]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#E91E63] uppercase">
                <LetterReveal
                  text="ABOUT FOUNDER"
                  isVisible={activeVisible}
                  direction="top-to-bottom"
                  delay={150}
                  stagger={25}
                />
              </span>
            </div>
          </Reveal>

          <Reveal isVisible={activeVisible} direction="down" duration={800} delay={250}>
            <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-zinc-600 font-light leading-relaxed text-center max-w-5xl mx-auto px-2">
              We operate across diverse business verticals, ranging from real estate development to delivering turnkey property solutions. Our expertise ensures seamless integration of innovation and quality, catering to the unique needs of every project with a customer-centric approach. catering to the unique needs of every project with a customer-centric approach. catering to the unique needs of every project with a customer-centric approach.
            </p>
          </Reveal>
        </div>

        <div className="relative w-full flex flex-col items-center justify-end min-h-[440px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[620px]">

          <div className="absolute inset-0 pointer-events-none opacity-[0.15] overflow-hidden flex items-end justify-center">
            <Image
              src="/skyline-high-quality.png"
              alt="Architectural Skyline Silhouette"
              fill
              sizes="100vw"
              className="object-cover object-bottom pointer-events-none invert"
            />
          </div>

          <div className="absolute inset-x-0 bottom-12 sm:bottom-16 pointer-events-none select-none z-0 overflow-hidden opacity-60">
            <div 
              className="flex w-max items-center whitespace-nowrap"
              style={{ animation: 'seamlessLoop 22s linear infinite' }}
            >
              {loopMarquee.map((text, idx) => (
                <span
                  key={idx}
                  className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-black uppercase text-transparent tracking-tight px-6 sm:px-10 inline-block select-none"
                  style={{
                    WebkitTextStroke: "2.5px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>

          <div className="relative w-full flex flex-col items-center">
            <div className="relative z-10 w-[360px] sm:w-[460px] md:w-[560px] lg:w-[640px] h-[400px] sm:h-[480px] md:h-[540px] lg:h-[590px] overflow-hidden">
              <Reveal isVisible={activeVisible} direction="up" duration={900} delay={300} className="w-full h-full">
                <div
                  className="relative w-full h-[680px] sm:h-[820px] md:h-[940px] lg:h-[1020px] -top-1 sm:-top-2 md:-top-3"
                >
                  <Image
                    src="/founder.png"
                    alt="Mr. Bhupesh Nagarajan, B.E. LL.B.(Hons) - Founder of Indira Group"
                    fill
                    priority
                    sizes="(max-width: 768px) 400px, 640px"
                    className="object-contain object-top select-none pointer-events-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.3)]"
                  />
                </div>
              </Reveal>
            </div>
            
            <div className="relative z-20 mt-4 sm:mt-8 text-center px-4 pb-4 sm:pb-6">
              <Reveal isVisible={activeVisible} direction="up" duration={800} delay={450}>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold bg-gradient-to-r from-[#F4511E] to-[#E51B63] bg-clip-text text-transparent tracking-tight leading-tight uppercase">
                  Mr. Bhupesh Nagarajan, B.E. LL.B.(Hons)
                </h3>
              </Reveal>
            </div>

            <div className="absolute -bottom-10 sm:-bottom-16 left-1/2 -translate-x-1/2 w-[100vw] h-[300px] sm:h-[400px] bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none z-10" />
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes seamlessLoop {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
