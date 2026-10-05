"use client";

import React, { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import LetterReveal from "../components/LetterReveal";
import { fetchfromCMS } from "../components/api";

interface ServiceOverviewProps {
  isVisible?: boolean;
}

function CountingNumber({
  target,
  prefix = "",
  suffix = "",
  padZero = false,
  start = false,
  duration = 2000,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  padZero?: boolean;
  start: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easeOutProgress * target);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [start, target, duration]);

  const display = padZero && count < 10 ? `0${count}` : count;
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function ServiceOverview({ isVisible: forcedVisible }: ServiceOverviewProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [stats, setStats] = useState([
    { target: 150, suffix: "+", label: "CLIENTS SERVED", padZero: false },
    { target: 210, suffix: "+", label: "SUCCESSFUL PROJECTS", padZero: false },
    { target: 9, suffix: "", label: "PRESTIGIOUS AWARDS", padZero: true },
    { target: 18, suffix: "+", label: "YEARS OF EXPERIENCE", padZero: false },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientsData, projectsData, awardsData, yearsData] = await Promise.all([
          fetchfromCMS("clients-served"),
          fetchfromCMS("successful-projects"),
          fetchfromCMS("prestigious-awards"),
          fetchfromCMS("years-of-experience"),
        ]);

        const clientsVal = clientsData?.docs?.[0]?.value ?? 150;
        const projectsVal = projectsData?.docs?.[0]?.value ?? 210;
        const awardsVal = awardsData?.docs?.[0]?.value ?? 9;
        const yearsVal = yearsData?.docs?.[0]?.value ?? 18;

        setStats([
          { target: clientsVal, suffix: "+", label: "CLIENTS SERVED", padZero: false },
          { target: projectsVal, suffix: "+", label: "SUCCESSFUL PROJECTS", padZero: false },
          { target: awardsVal, suffix: "", label: "PRESTIGIOUS AWARDS", padZero: true },
          { target: yearsVal, suffix: "+", label: "YEARS OF EXPERIENCE", padZero: false },
        ]);
      } catch (e) {
        console.error("Failed to load dynamic stats", e);
      }
    };
    fetchStats();
  }, []);

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
      className="relative w-full bg-white text-zinc-900 overflow-hidden select-none pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-24 border-t border-zinc-100"
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

      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">
        
        <div className="text-center w-full max-w-5xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[2.85rem] font-bold uppercase text-zinc-900 tracking-tight leading-tight whitespace-normal md:whitespace-nowrap">
            <LetterReveal
              text="LEADING INFRASTRUCTURE AT A GLOBAL SCALE"
              isVisible={activeVisible}
              direction="top-to-bottom"
              delay={150}
              stagger={20}
              duration={750}
            />
          </h2>

          <Reveal isVisible={activeVisible} direction="down" duration={800} delay={450}>
            <div className="w-48 sm:w-64 md:w-80 h-[2px] bg-[#F4511E] mx-auto mt-3 sm:mt-4 rounded-full" />
          </Reveal>
        </div>

        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24 px-2">
          <Reveal isVisible={activeVisible} direction="down" duration={850} delay={300}>
            <p className="text-xs sm:text-sm md:text-[15px] lg:text-[16px] text-zinc-600 font-light leading-relaxed mb-4 sm:mb-5">
              Indira Group Of Companies is a Project Management company providing end-to-end solutions to the Construction Industry using the best of global standards and practices. We undertake a planned series of activities and design them in synchronization with our customer&apos;s requirements. This includes overall planning, coordination, monitoring and controlling of a project from inception to completion in order to produce a functionally and financially valuable project that will be completed on time, within authorized cost and to the required quality standards.
            </p>
          </Reveal>

          <Reveal isVisible={activeVisible} direction="down" duration={850} delay={400}>
            <p className="text-xs sm:text-sm md:text-[15px] lg:text-[16px] text-zinc-700 font-normal">
              Secure entrance with boundary walls 24/7.
            </p>
          </Reveal>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 text-center">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              isVisible={activeVisible}
              direction="down"
              duration={850}
              delay={400 + index * 80}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black text-[#F4511E] tracking-tight leading-none mb-2 sm:mb-3 drop-shadow-sm tabular-nums">
                <CountingNumber
                  target={stat.target}
                  suffix={stat.suffix}
                  padZero={stat.padZero}
                  start={activeVisible}
                  duration={2200}
                />
              </div>
              <div className="text-[10px] sm:text-xs md:text-[12.5px] font-bold tracking-[0.15em] uppercase text-zinc-500">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </div>
  );
}
