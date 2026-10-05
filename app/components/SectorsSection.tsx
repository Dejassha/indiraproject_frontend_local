"use client";

import React, { useState, useRef, useEffect } from "react";
import LetterReveal from "./LetterReveal";

interface SectorCard {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const SECTOR_CARDS: SectorCard[] = [
  {
    id: 1,
    title: "Real Estate &\nProperty\nDevelopment",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9 fill-current">
        <path d="M4 4h16a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a1 1 0 0 1 1-1zm0 8h2v7H4v-7zm4 0h8v7H8v-7zm10 0h2v7h-2v-7z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Technology",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9 fill-current">
        <path d="M12 2 2 7v2h20V7L12 2zm-7 9v8h3v-8H5zm5 0v8h3v-8h-3zm5 0v8h3v-8h-3zm-9 10v2h18v-2H6z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Exports &\nLogistics",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9 fill-current">
        <path d="M19 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM9 6h2v2H9V6zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm6 4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V6h2v2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Life Science",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9 fill-current">
        <path d="M12 2 2 7v2h20V7L12 2zm-7 9v8h3v-8H5zm5 0v8h3v-8h-3zm5 0v8h3v-8h-3zm-9 10v2h18v-2H6z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Engineering &\nInfrastructure",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9 fill-current">
        <path d="M12 3 2 9v12h20V9L12 3zm-6 8h12v8H6v-8zm2 2v4h8v-4H8z" />
      </svg>
    ),
  },
];

export default function SectorsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardId, setActiveCardId] = useState<number>(3); // Card 3 (Exports & Logistics) active by default

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 md:py-32 bg-white text-zinc-900 z-10 overflow-hidden select-none"
    >
      <style jsx>{`
        @keyframes fadeUpSector {
          0% {
            opacity: 0;
            transform: translateY(35px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-sector-title {
          animation: fadeUpSector 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both;
        }
        .animate-sector-card-0 {
          animation: fadeUpSector 900ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both;
        }
        .animate-sector-card-1 {
          animation: fadeUpSector 900ms cubic-bezier(0.22, 1, 0.36, 1) 280ms both;
        }
        .animate-sector-card-2 {
          animation: fadeUpSector 900ms cubic-bezier(0.22, 1, 0.36, 1) 360ms both;
        }
        .animate-sector-card-3 {
          animation: fadeUpSector 900ms cubic-bezier(0.22, 1, 0.36, 1) 440ms both;
        }
        .animate-sector-card-4 {
          animation: fadeUpSector 900ms cubic-bezier(0.22, 1, 0.36, 1) 520ms both;
        }
      `}</style>

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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div
          className={`text-center max-w-4xl mx-auto mb-14 sm:mb-20 ${
            isVisible ? "animate-sector-title" : "opacity-0"
          }`}
        >
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E91E63] uppercase mb-2.5 sm:mb-3 block">
            OUR SECTORS
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-[#13193A] tracking-tight uppercase leading-tight">
            <LetterReveal
              text="KEY BUSINESS SECTORS"
              isVisible={isVisible}
              direction="top-to-bottom"
              delay={120}
              stagger={18}
              duration={700}
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 w-full items-stretch">
          {SECTOR_CARDS.map((card, idx) => {
            const isActive = activeCardId === card.id;
            const bgClass = isActive ? "bg-[#D81B60]" : "bg-[#F4511E]";
            const elevationClass = isActive
              ? "shadow-2xl shadow-pink-600/35 scale-[1.03] z-20"
              : "shadow-lg hover:shadow-xl hover:scale-[1.02] z-10";

            return (
              <div
                key={card.id}
                onClick={() => setActiveCardId(card.id)}
                onMouseEnter={() => setActiveCardId(card.id)}
                className={`group relative overflow-hidden text-white p-5 sm:p-6 rounded-[20px] sm:rounded-[24px] flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out h-[195px] sm:h-[215px] md:h-[225px] lg:h-[235px] ${bgClass} ${elevationClass} ${
                  isVisible ? `animate-sector-card-${idx}` : "opacity-0"
                }`}
              >
                <div className="text-white/95 transition-transform duration-300 group-hover:scale-110">
                  {card.icon}
                </div>

                <h3 className="text-lg sm:text-xl lg:text-[17.5px] xl:text-[19px] font-bold text-white tracking-tight leading-[1.25] whitespace-pre-line">
                  {card.title}
                </h3>

                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
