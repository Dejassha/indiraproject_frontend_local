"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";
import Timeline from "../components/Timeline";
import LetterReveal from "../components/LetterReveal";
import LineReveal from "../components/LineReveal";

interface WhatWeDoProps {
  isVisible?: boolean;
}

export default function WhatWeDo({
  isVisible: forcedVisible,
}: WhatWeDoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 300);
        } else if (entry.boundingClientRect.top > 100) {
          setIsRevealed(false);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeVisible =
    forcedVisible !== undefined ? forcedVisible : isRevealed;

  return (
    <div className="w-full bg-white">
      {/* =========================================================
          TOP WHAT WE DO SECTION
      ========================================================= */}

      <section
        ref={sectionRef}
        className="w-full bg-white px-6 sm:px-10 md:px-16 lg:px-20 xl:px-[100px] pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-20 md:pb-24"
      >
        {/* Small heading */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <Reveal isVisible={activeVisible} delay={200}>
            <div className="flex items-center gap-3">
              <span className="text-[#F4511E] text-xl sm:text-2xl font-medium">
                +
              </span>

              <span className="text-[#F4511E] text-sm sm:text-base font-medium tracking-wide">
                What We Do
              </span>
            </div>
          </Reveal>
        </div>

        <div className="max-w-[1000px]">
          <LetterReveal
            text="INDIRA GROUP OF COMPANIES"
            isVisible={activeVisible}
            delay={350}
            className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px] font-semibold leading-[0.95] tracking-[-0.04em]"
          />
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 max-w-[900px]">
          <LineReveal
            delay={500}
            className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-[21px] leading-[1.6]"
          >
            Indira Group Of Companies is a diversified business group
            committed to creating meaningful value through innovation,
            engineering, technology, development, exports and life sciences.
            With a strong foundation and a forward-looking vision, we
            continuously build businesses that contribute to a better future.
          </LineReveal>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
          <Reveal isVisible={activeVisible} delay={650}>
            <div className="px-4 sm:px-5 py-2.5 border border-gray-300 rounded-full">
              <span className="text-xs sm:text-sm text-gray-700">
                ISO 9001:2015
              </span>
            </div>
          </Reveal>

          <Reveal isVisible={activeVisible} delay={750}>
            <div className="px-4 sm:px-5 py-2.5 border border-gray-300 rounded-full">
              <span className="text-xs sm:text-sm text-gray-700">
                ISO 45001:2018
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          TIMELINE SECTION
      ========================================================= */}
      <Timeline />
    </div>
  );
}