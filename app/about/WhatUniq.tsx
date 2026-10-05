"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "../components/Reveal";
import LetterReveal from "../components/LetterReveal";

interface WhatUniqProps {
  isVisible?: boolean;
}

export default function WhatUniq({ isVisible: forcedVisible }: WhatUniqProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeVisible = forcedVisible !== undefined ? forcedVisible : isRevealed;

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-900 overflow-hidden select-none pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 min-h-screen flex flex-col justify-center"
    >
      <div className="absolute inset-0 pointer-events-none flex justify-between w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 z-0">
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

      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-20 flex flex-col items-center">
        <div className="text-center mb-8 sm:mb-12 md:mb-14">
          <Reveal isVisible={activeVisible} direction="down" duration={750} delay={100}>
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E64A38]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#E64A38] uppercase">
                What We Do
              </span>
            </div>
          </Reveal>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold uppercase text-zinc-900 tracking-tight leading-tight">
            <LetterReveal
              text="WHAT MAKES US UNIQUE"
              isVisible={activeVisible}
              direction="top-to-bottom"
              delay={200}
              stagger={30}
              duration={800}
            />
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-16 lg:pb-36">
          
          <Reveal isVisible={activeVisible} direction="up" duration={800} delay={200}>
            <div className="relative w-full rounded-[18px] p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col justify-center items-start min-h-[260px] sm:min-h-[280px] group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
              <Image
                src="/whatUniq.jpg"
                alt="Infrastructure"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

              <div className="relative z-10 flex flex-col items-start w-full">
                <div className="w-14 h-14 bg-[#D81B60] rounded-xl flex items-center justify-center text-white mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-[27px] font-bold text-white leading-tight tracking-tight drop-shadow-md">
                  ISO
                </h3>
              </div>
            </div>
          </Reveal>

          <Reveal isVisible={activeVisible} direction="up" duration={800} delay={300}>
            <div className="relative w-full rounded-[18px] p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col justify-center items-start min-h-[260px] sm:min-h-[280px] group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
              <Image
                src="/construction-site.jpg"
                alt="Infrastructure"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

              <div className="relative z-10 flex flex-col items-start w-full">
                <div className="w-14 h-14 bg-[#D81B60] rounded-xl flex items-center justify-center text-white mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M17 11V3H7v4H3v14h18V11h-4zm-8-4h2v2H9V7zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm4-8h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-[27px] font-bold text-white leading-tight tracking-tight drop-shadow-md">
                  Builders Association of India
                </h3>
              </div>
            </div>
          </Reveal>

          <Reveal isVisible={activeVisible} direction="up" duration={800} delay={400}>
            <div className="relative w-full rounded-[18px] p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col justify-center items-start min-h-[260px] sm:min-h-[280px] group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
              <Image
                src="/building-excellence.jpg"
                alt="Infrastructure"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

              <div className="relative z-10 flex flex-col items-start w-full">
                <div className="w-14 h-14 bg-[#D81B60] rounded-xl flex items-center justify-center text-white mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M17 5.92L9 2v18H7v-1.73c-1.79.35-3 .99-3 1.73 0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97V8.98l6-3.06z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-[27px] font-bold text-white leading-tight tracking-tight drop-shadow-md">
                  Green Building Association
                </h3>
              </div>
            </div>
          </Reveal>

          <Reveal isVisible={activeVisible} direction="up" duration={800} delay={500}>
            <div className="relative w-full rounded-[18px] p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col justify-center items-start min-h-[260px] sm:min-h-[280px] group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
              <Image
                src="/skyscrapers.jpg"
                alt="Infrastructure"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

              <div className="relative z-10 flex flex-col items-start w-full">
                <div className="w-14 h-14 bg-[#D81B60] rounded-xl flex items-center justify-center text-white mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-[27px] font-bold text-white leading-tight tracking-tight drop-shadow-md">
                  Tamil Chamber of Commerce
                </h3>
              </div>
            </div>
          </Reveal>

          <Reveal isVisible={activeVisible} direction="up" duration={800} delay={600}>
            <div className="relative w-full rounded-[18px] p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col justify-center items-start min-h-[260px] sm:min-h-[280px] group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
              <Image
                src="/city-night.jpg"
                alt="Infrastructure"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

              <div className="relative z-10 flex flex-col items-start w-full">
                <div className="w-14 h-14 bg-[#D81B60] rounded-xl flex items-center justify-center text-white mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-[27px] font-bold text-white leading-tight tracking-tight drop-shadow-md">
                  FCCI
                </h3>
              </div>
            </div>
          </Reveal>

          <Reveal isVisible={activeVisible} direction="up" duration={800} delay={700}>
            <div className="relative w-full rounded-[18px] p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col justify-center items-start min-h-[260px] sm:min-h-[280px] group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
              <Image
                src="/what-we-do.jpg"
                alt="Infrastructure"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

              <div className="relative z-10 flex flex-col items-start w-full">
                <div className="w-14 h-14 bg-[#D81B60] rounded-xl flex items-center justify-center text-white mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-[27px] font-bold text-white leading-tight tracking-tight drop-shadow-md">
                  SWFI
                </h3>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </div>
  );
}