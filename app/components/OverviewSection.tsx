"use client";

import React, { useRef, useState, useEffect } from "react";
import CountUp from "./CountUp";
import { fetchfromCMS } from "./api";
import ScrollTextTrail from "./ScrollTextTrail";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface OverviewSectionProps {
  isVisible?: boolean;
  status?: "current" | "past" | "future";
  onToggle?: () => void;
  onReplay?: (e: React.MouseEvent) => void;
}

interface StatMetric {
  id: string;
  end: number;
  suffix?: string;
  padZeros?: number;
  label: string;
}

/* ================================================================
   COMPONENT
   ================================================================ */

export default function OverviewSection({
  isVisible,
  status,
}: OverviewSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const row1LineRef = useRef<HTMLDivElement>(null);
  const row2LineRef = useRef<HTMLDivElement>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [row1Metrics, setRow1Metrics] = useState<StatMetric[]>([
    { id: "r1-1", end: 150, suffix: "+", label: "ESTABLISHED" },
    { id: "r1-2", end: 210, suffix: "+", label: "YEARS OF EXPERIENCE" },
    { id: "r1-3", end: 9, padZeros: 2, label: "PROJECTS DELIVERED" },
    { id: "r1-4", end: 18, suffix: "+", label: "SQ. FT. DEVELOPED / BUILT" },
  ]);
  const [row2Metrics, setRow2Metrics] = useState<StatMetric[]>([
    { id: "r2-1", end: 150, suffix: "+", label: "INTERNATIONAL PROJECTS" },
    { id: "r2-2", end: 210, suffix: "+", label: "BUSINESS VERTICALS" },
    { id: "r2-3", end: 9, padZeros: 2, label: "COUNTRIES OF PRESENCE" },
    { id: "r2-4", end: 18, suffix: "+", label: "CUSTOMERS / CLIENTS SERVED" },
  ]);

  useEffect(() => {
    async function loadStats() {
      const data = await fetchfromCMS('stats');
      if (data?.docs?.length > 0) {
        const parsedMetrics = data.docs.map((doc: any, index: number) => {
          let valueString = doc.value || "";
          let suffix = undefined;
          let padZeros = undefined;
          
          if (valueString.endsWith('+')) {
            suffix = '+';
            valueString = valueString.slice(0, -1);
          }
          
          if (valueString.startsWith('0')) {
            padZeros = valueString.length;
          }
          
          let end = parseInt(valueString, 10);
          if (isNaN(end)) end = 0;

          return {
            id: doc.id || `stat-${index}`,
            end,
            suffix,
            padZeros,
            label: doc.label || "",
          };
        });

        const mid = Math.ceil(parsedMetrics.length / 2);
        setRow1Metrics(parsedMetrics.slice(0, mid));
        setRow2Metrics(parsedMetrics.slice(mid));
      }
    }
    loadStats();
  }, []);

  /* ================================================================
     INTERSECTION OBSERVER
     ================================================================ */

  useEffect(() => {
    if (isVisible !== undefined || status !== undefined) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isVisible, status]);

  /* ================================================================
     GSAP SCROLLTRIGGER FOR LINES
     ================================================================ */

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 50%",
          scrub: 1,
        }
      });
      
      if (row1LineRef.current) {
        tl.fromTo(row1LineRef.current, { width: "0%" }, { width: "120%", ease: "none" }, 0);
      }
      if (row2LineRef.current) {
        tl.fromTo(row2LineRef.current, { width: "0%" }, { width: "120%", ease: "none" }, 0);
      }
    });
    
    return () => ctx.revert();
  }, []);

  /* ================================================================
     CURRENT STATE
     ================================================================ */

  const isCurrent =
    status !== undefined
      ? status === "current"
      : isVisible !== undefined
        ? isVisible
        : isRevealed;

  /* ================================================================
     RENDER
     ================================================================ */

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24 lg:py-28 bg-white text-zinc-900 overflow-hidden select-none"
    >
      {/* ============================================================
          ANIMATIONS
          ============================================================ */}

      <style jsx>{`
        @keyframes parallaxRisePop {
          0% {
            opacity: 0;
            transform: translateY(90px) scale(0.95);
            filter: blur(4px);
          }
          65% {
            opacity: 0.9;
            transform: translateY(-4px) scale(1.01);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes parallaxRiseLine {
          0% {
            opacity: 0;
            transform: translateY(50px) scaleX(0.7);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleX(1);
          }
        }

        .animate-parallax-text {
          animation: parallaxRisePop 1100ms cubic-bezier(0.16, 1, 0.3, 1)
            100ms both;
        }

        .animate-parallax-line1 {
          animation: parallaxRiseLine 1000ms cubic-bezier(0.16, 1, 0.3, 1)
            200ms both;
        }

        .animate-parallax-line2 {
          animation: parallaxRiseLine 1000ms cubic-bezier(0.16, 1, 0.3, 1)
            450ms both;
        }
      `}</style>

      {/* ============================================================
          BACKGROUND ARCHITECTURAL GRID
          ============================================================ */}

      <div className="absolute inset-0 pointer-events-none flex justify-between w-full px-2 sm:px-6 md:px-10 lg:px-14 xl:px-16 z-0">
        <div className="w-px h-full bg-zinc-200/50" />
        <div className="w-px h-full bg-zinc-200/50 hidden sm:block" />
        <div className="w-px h-full bg-zinc-200/50" />
        <div className="w-px h-full bg-zinc-200/50 hidden sm:block" />
        <div className="w-px h-full bg-zinc-200/50" />
        <div className="w-px h-full bg-zinc-200/50 hidden sm:block" />
        <div className="w-px h-full bg-zinc-200/50" />
        <div className="w-px h-full bg-zinc-200/50 hidden md:block" />
        <div className="w-px h-full bg-zinc-200/50" />
      </div>

      {/* ============================================================
          MAIN CONTENT
          ============================================================ */}

      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">

        {/* ==========================================================
            DESCRIPTION
            ========================================================== */}

        <div className="w-full mb-12 sm:mb-16 md:mb-20">
          <ScrollTextTrail 
            text="INDIRA GROUP IS A DIVERSIFIED BUSINESS GROUP WITH INTERESTS *SPANNING* ENGINEERING AND PROJECT MANAGEMENT, PROPERTY DEVELOPMENT, EXPORTS AND LOGISTICS, TECHNOLOGY, AND LIFE SCIENCES. FOUNDED IN 2010, THE GROUP HAS BUILT ITS FOUNDATION ON TECHNICAL EXPERTISE, CUSTOMER-FOCUSED EXECUTION AND A COMMITMENT TO CREATING SUSTAINABLE VALUE ACROSS INDUSTRIES AND GEOGRAPHIES."
            className="font-serif text-[22px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-medium leading-[1.6] sm:leading-[1.8] text-center tracking-[0.03em] sm:tracking-[0.07em] select-text uppercase"
          />
        </div>

        {/* ==========================================================
            STATISTICS
            ========================================================== */}

        <div className="relative w-full">

          {/* ========================================================
              MOBILE STATS CONTAINER
              ======================================================== */}
          <div className="md:hidden relative flex flex-col w-full my-8">
            
            <div className="flex flex-col gap-12 border-l-[1.5px] border-[#F4511E] w-[70%] py-2">
              {row1Metrics.map((metric, index) => (
                <div
                  key={metric.id}
                  style={{
                    transitionDelay: isCurrent ? `${280 + index * 140}ms` : "0ms",
                  }}
                  className={`flex flex-col items-center justify-center text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCurrent
                      ? "opacity-100 translate-y-0 scale-100 blur-0"
                      : "opacity-0 translate-y-20 scale-90 blur-sm"
                  }`}
                >
                  <div className="text-[2.5rem] font-black text-[#F4511E] tracking-tight leading-none mb-1.5">
                    <CountUp
                      end={metric.end}
                      suffix={metric.suffix}
                      padZeros={metric.padZeros}
                      isVisible={isCurrent}
                      duration={1600}
                      delay={280 + index * 140}
                    />
                  </div>
                  <div className="text-[10px] font-bold text-zinc-500 tracking-[0.14em] uppercase">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-12 border-r-[1.5px] border-[#F4511E] w-[70%] self-end py-2 mt-12">
              {row2Metrics.map((metric, index) => (
                <div
                  key={metric.id}
                  style={{
                    transitionDelay: isCurrent ? `${520 + index * 140}ms` : "0ms",
                  }}
                  className={`flex flex-col items-center justify-center text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCurrent
                      ? "opacity-100 translate-y-0 scale-100 blur-0"
                      : "opacity-0 translate-y-20 scale-90 blur-sm"
                  }`}
                >
                  <div className="text-[2.5rem] font-black text-[#F4511E] tracking-tight leading-none mb-1.5">
                    <CountUp
                      end={metric.end}
                      suffix={metric.suffix}
                      padZeros={metric.padZeros}
                      isVisible={isCurrent}
                      duration={1600}
                      delay={520 + index * 140}
                    />
                  </div>
                  <div className="text-[10px] font-bold text-zinc-500 tracking-[0.14em] uppercase">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ========================================================
              ROW 1 (Desktop)
              ======================================================== */}
          <div
            className="relative hidden md:grid grid-cols-4 w-4/5 ml-[2%] gap-x-[200px]"
          >
            <div 
              ref={row1LineRef}
              className="absolute top-0 left-[-10vw] h-[1px] bg-gradient-to-r from-[#F4511E] via-[#F4511E]/80 to-transparent"
              style={{ width: "0%" }}
            />
            {row1Metrics.map((metric, index) => (
              <div
                key={metric.id}
                style={{
                  transitionDelay: isCurrent ? `${280 + index * 140}ms` : "0ms",
                }}
                className={`py-8 lg:py-10 px-8 lg:px-12 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCurrent
                    ? "opacity-100 translate-y-0 scale-100 blur-0"
                    : "opacity-0 translate-y-20 scale-90 blur-sm"
                }`}
              >
                <div className="text-5xl lg:text-[52px] xl:text-[60px] font-black text-[#F4511E] tracking-tight leading-none mb-3">
                  <CountUp
                    end={metric.end}
                    suffix={metric.suffix}
                    padZeros={metric.padZeros}
                    isVisible={isCurrent}
                    duration={1600}
                    delay={280 + index * 140}
                  />
                </div>
                <div className="text-[12px] font-bold text-zinc-600 tracking-[0.14em] uppercase">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================
              ROW 2 (Desktop)
              ======================================================== */}
          <div
            className="relative hidden md:grid grid-cols-4 w-4/5 ml-[15%] gap-x-[200px]"
          >
            <div 
              ref={row2LineRef}
              className="absolute top-0 right-[-10vw] h-[1px] bg-gradient-to-l from-[#E91E63] via-[#E91E63]/80 to-transparent"
              style={{ width: "0%" }}
            />
            {row2Metrics.map((metric, index) => (
              <div
                key={metric.id}
                style={{
                  transitionDelay: isCurrent ? `${520 + index * 140}ms` : "0ms",
                }}
                className={`py-8 lg:py-10 px-6 lg:px-8 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCurrent
                    ? "opacity-100 translate-y-0 scale-100 blur-0"
                    : "opacity-0 translate-y-20 scale-90 blur-sm"
                }`}
              >
                <div className="text-5xl lg:text-[52px] xl:text-[60px] font-black text-[#F4511E] tracking-tight leading-none mb-3">
                  <CountUp
                    end={metric.end}
                    suffix={metric.suffix}
                    padZeros={metric.padZeros}
                    isVisible={isCurrent}
                    duration={1600}
                    delay={520 + index * 140}
                  />
                </div>
                <div className="text-[12px] font-bold text-zinc-600 tracking-[0.14em] uppercase">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}