"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import LetterReveal from "./LetterReveal";
import { fetchfromCMS } from "./api";

interface ClientsSectionProps {
  isVisible?: boolean;
  status?: "current" | "past" | "future";
  onPrev?: () => void;
  onNext?: () => void;
  standalone?: boolean;
}

const CLIENT_LOGOS = [
  {
    name: "Digipolis Technologies",
    src: "/logo-digipolis.png",
    width: 240,
    height: 70,
  },
  {
    name: "CELLDZYNE Life Sciences",
    src: "/logo-celldzyne.png",
    width: 260,
    height: 90,
  },
  {
    name: "Indira Projects",
    src: "/logo-indira-projects.png",
    width: 250,
    height: 95,
  },
];

export default function ClientsSection({
  isVisible,
  status,
  onPrev,
  onNext,
  standalone = false,
}: ClientsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [clientLogos, setClientLogos] = useState(CLIENT_LOGOS);

  useEffect(() => {
    const loadLogos = async () => {
      try {
        const data = await fetchfromCMS("client-marquee");
        if (data?.docs?.length > 0) {
          const cmsLogos = data.docs.map((doc: any) => {
            const formattedUrl = doc.logo?.url?.replace('/api/media/file/', '/media/');
            const src = formattedUrl
              ? formattedUrl.startsWith("http")
                ? formattedUrl
                : `${process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3000"}${formattedUrl}`
              : "/logo-digipolis.png"; // Fallback image

            return {
              name: doc.name || "Client",
              src,
              width: doc.logo?.width || 240,
              height: doc.logo?.height || 70,
            };
          });
          setClientLogos(cmsLogos);
        }
      } catch (err) {
        console.error("Failed to fetch client marquee logos", err);
      }
    };
    loadLogos();
  }, []);

  React.useEffect(() => {
    if (isVisible !== undefined || status !== undefined) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, status]);

  const isSliderMode = isVisible !== undefined || status !== undefined;
  const isCurrent = status !== undefined ? status === "current" : (isVisible !== undefined ? isVisible : isRevealed);
  const isPast = status === "past";

  const positionClass = isCurrent
    ? "translate-y-0 opacity-100 shadow-2xl pointer-events-auto z-30"
    : isPast
      ? "-translate-y-full opacity-0 pointer-events-none z-20"
      : "translate-y-full opacity-0 pointer-events-none z-10";

  const containerClass = isSliderMode
    ? `absolute inset-0 w-full h-full bg-white text-zinc-900 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden select-none flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 ${positionClass}`
    : "relative w-full py-16 sm:py-24 flex flex-col justify-center bg-white text-zinc-900 z-10 overflow-hidden select-none border-t border-zinc-100";

  const marqueeLogos = [
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
    ...clientLogos,
  ];

  if (standalone) {
    return (
      <section className="relative w-full bg-white text-zinc-900 overflow-hidden select-none py-10 sm:py-14 border-t border-zinc-100">
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

        <div className="relative z-10 w-full overflow-hidden py-10 sm:py-14 border-y border-zinc-200/80 bg-zinc-50/70">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max items-center animate-[clientsMarquee_26s_linear_infinite] hover:[animation-play-state:paused]">
            {marqueeLogos.map((logo, index) => (
              <div
                key={`standalone-logo-${index}`}
                className="flex items-center justify-center px-12 sm:px-20 lg:px-24 shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="relative h-14 sm:h-20 md:h-24 w-auto flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="max-h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes clientsMarquee {
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

  return (
    <section
      ref={sectionRef}
      className={containerClass}
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

      <style jsx>{`
        /* Smooth multi-layer bottom-to-top-then-bottom parallax keyframes */
        @keyframes parallaxHeader {
          0% {
            opacity: 0;
            transform: translateY(46px);
          }
          48% {
            opacity: 1;
            transform: translateY(-24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes parallaxMarquee {
          0% {
            opacity: 0;
            transform: translateY(52px);
          }
          48% {
            opacity: 1;
            transform: translateY(-26px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-parallax-badge {
          animation: parallaxHeader 1500ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
        }
        .animate-parallax-title {
          animation: parallaxHeader 1600ms cubic-bezier(0.22, 1, 0.36, 1) 240ms both;
        }
        .animate-parallax-desc {
          animation: parallaxHeader 1700ms cubic-bezier(0.22, 1, 0.36, 1) 360ms both;
        }
        .animate-parallax-marquee-track {
          animation: parallaxMarquee 1800ms cubic-bezier(0.22, 1, 0.36, 1) 280ms both;
        }

        @keyframes clientsMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 text-center mt-auto mb-6 sm:mb-10">
        <div className={isCurrent ? "animate-parallax-badge" : "opacity-0"}>
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.22em] text-[#E64A38] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E64A38]" />
            OUR CLIENTS & PARTNERS
          </span>
        </div>

        <div className={isCurrent ? "animate-parallax-title" : "opacity-0"}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-zinc-900 tracking-tight leading-tight">
            <LetterReveal
              text="TRUSTED BY INDUSTRY LEADERS"
              isVisible={isCurrent}
              direction="top-to-bottom"
              delay={150}
              stagger={22}
              duration={750}
            />
          </h2>
        </div>

        <div className={isCurrent ? "animate-parallax-desc" : "opacity-0"}>
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 font-light mt-3 max-w-2xl mx-auto leading-relaxed">
            Delivering visionary engineering, infrastructure excellence, and turnkey development for top corporations.
          </p>
        </div>
      </div>

      <div className={`relative z-10 w-full overflow-hidden py-10 sm:py-14 border-y border-zinc-200/80 bg-zinc-50/70 mb-auto ${isCurrent ? "animate-parallax-marquee-track" : "opacity-0"}`}>
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max items-center animate-[clientsMarquee_26s_linear_infinite] hover:[animation-play-state:paused]">
          {marqueeLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-12 sm:px-20 lg:px-24 shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="relative h-14 sm:h-20 md:h-24 w-auto flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center text-xs tracking-wider uppercase text-zinc-500 font-medium">
        {onPrev && (
          <button
            onClick={onPrev}
            className="flex items-center gap-2 hover:text-[#E64A38] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span>Previous: FAQs</span>
          </button>
        )}
        <div className="flex items-center gap-2 text-zinc-400">
          <span>08 / 08</span>
        </div>
      </div>
    </section>
  );
}
