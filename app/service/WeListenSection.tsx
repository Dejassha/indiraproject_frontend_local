"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/Reveal";
import LetterReveal from "../components/LetterReveal";

interface WeListenSectionProps {
  isVisible?: boolean;
}

export default function WeListenSection({ isVisible: forcedVisible }: WeListenSectionProps) {
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
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-900 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden select-none border-t border-zinc-100"
    >
      <div className="absolute inset-0 pointer-events-none flex justify-between w-full max-w-[1515px] mx-auto px-6 sm:px-12 lg:px-[94px] z-0">
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

      <div className="relative z-10 w-full max-w-[1515px] mx-auto px-6 sm:px-12 lg:px-[94px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 flex flex-col items-start justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[46px] xl:text-[50px] font-bold tracking-tight leading-[1.18] uppercase text-[#1F242E]">
              <LetterReveal
                text="WE LISTEN TO YOUR NEEDS AND"
                isVisible={activeVisible}
                direction="top-to-bottom"
                delay={100}
                stagger={20}
                duration={750}
              />{" "}
              <span className="block text-[#F05323] mt-1 sm:mt-1.5">
                <LetterReveal
                  text="BUILD IT TO YOUR DREAMS"
                  isVisible={activeVisible}
                  direction="top-to-bottom"
                  delay={450}
                  stagger={24}
                  duration={750}
                />
              </span>
            </h2>

            <Reveal isVisible={activeVisible} direction="down" duration={800} delay={250}>
              <p className="text-base sm:text-lg text-[#4B5563] font-normal leading-[1.65] mt-6 max-w-xl">
                Partner with Indira Group for unparalleled project management expertise. Let us engineer your vision into structural reality.
              </p>
            </Reveal>

            <Reveal isVisible={activeVisible} direction="down" duration={850} delay={350}>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-8 sm:mt-10">
                <Link
                  href="/#projects"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#E64A38] hover:bg-[#d83c27] text-white font-semibold text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>View all project</span>
                  <span className="text-lg leading-none">→</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white border border-[#CBD5E1] hover:border-slate-400 text-[#1F242E] font-bold text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  Contact Us
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <Reveal isVisible={activeVisible} direction="right" duration={900} delay={250} className="w-full max-w-[640px]">
              <div className="relative w-full h-auto">
                <Image
                  src="/crane-lineart.png"
                  alt="Construction Crane Vector Illustration"
                  width={650}
                  height={520}
                  priority
                  className="w-full h-auto object-contain pointer-events-none drop-shadow-sm"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
