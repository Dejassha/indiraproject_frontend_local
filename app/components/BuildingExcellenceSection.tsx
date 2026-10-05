"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import LetterReveal from "./LetterReveal";

interface BuildingExcellenceSectionProps {
  isVisible?: boolean;
  status?: "current" | "past" | "future";
  onPrev?: () => void;
  onNext?: () => void;
}

export default function BuildingExcellenceSection({
  isVisible,
  status,
  onPrev,
  onNext,
}: BuildingExcellenceSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });
  const [isClickPopped, setIsClickPopped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    ? `absolute inset-0 w-full h-full bg-white text-zinc-900 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden select-none flex flex-col justify-center ${positionClass}`
    : "relative w-full min-h-screen py-16 sm:py-24 flex flex-col justify-center bg-white text-zinc-900 z-10 overflow-hidden select-none";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;
    setTilt({ x: rotateX, y: rotateY, scale: 1.03 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, scale: 1 });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -24;
    const rotateY = ((x - centerX) / centerX) * 24;

    setIsClickPopped(true);
    setTilt({ x: rotateX, y: rotateY, scale: 1.08 });

    setTimeout(() => {
      setIsClickPopped(false);
      setTilt({ x: 0, y: 0, scale: 1.02 });
    }, 750);
  };

  return (
    <section
      ref={sectionRef}
      className={containerClass}
    >
      <style jsx>{`
        /* Smooth multi-layer top-to-bottom parallax keyframes */
        @keyframes parallaxFeatureLeft {
          0% {
            opacity: 0;
            transform: translateY(45px);
          }
          48% {
            opacity: 1;
            transform: translateY(-22px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes parallaxImageContainer {
          0% {
            opacity: 0;
            transform: translateY(50px);
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

        @keyframes innerImageParallaxZoom {
          0% {
            transform: translateY(18px) scale(1.0);
          }
          48% {
            transform: translateY(-10px) scale(1.07);
          }
          100% {
            transform: translateY(0) scale(1.12);
          }
        }

        .animate-parallax-feature {
          animation: parallaxFeatureLeft 1700ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both;
        }
        .animate-parallax-img-container {
          animation: parallaxImageContainer 1800ms cubic-bezier(0.22, 1, 0.36, 1) 220ms both;
        }
        .animate-inner-image {
          animation: innerImageParallaxZoom 2000ms cubic-bezier(0.22, 1, 0.36, 1) 220ms both;
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

      <div className="relative z-10 w-full max-w-[94vw] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full max-w-[94vw] mx-auto">
          
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-right pr-0 lg:pr-8 order-2 lg:order-1">
            <div className={isCurrent ? "animate-parallax-feature flex flex-col items-center lg:items-end" : "opacity-0"}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full bg-[#E64A19] text-white flex items-center justify-center shadow-xl mb-4 sm:mb-6">
                <svg
                  className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <polygon points="12,2 16.5,4.6 12,7.2 7.5,4.6" fill="#FFFFFF" />
                  <polygon points="7.5,4.6 12,7.2 12,11.5 7.5,8.9" fill="rgba(0,0,0,0.4)" />
                  <polygon points="12,7.2 16.5,4.6 16.5,8.9 12,11.5" fill="rgba(255,255,255,0.75)" />

                  <polygon points="6.5,12 11,14.6 6.5,17.2 2,14.6" fill="#FFFFFF" />
                  <polygon points="2,14.6 6.5,17.2 6.5,21.5 2,18.9" fill="rgba(0,0,0,0.4)" />
                  <polygon points="6.5,17.2 11,14.6 11,18.9 6.5,21.5" fill="rgba(255,255,255,0.75)" />

                  <polygon points="17.5,12 22,14.6 17.5,17.2 13,14.6" fill="#FFFFFF" />
                  <polygon points="13,14.6 17.5,17.2 17.5,21.5 13,18.9" fill="rgba(0,0,0,0.4)" />
                  <polygon points="17.5,17.2 22,14.6 22,18.9 17.5,21.5" fill="rgba(255,255,255,0.75)" />
                </svg>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#E64A19] tracking-tight mb-2.5">
                <LetterReveal
                  text="Building Excellence"
                  isVisible={isCurrent}
                  direction="top-to-bottom"
                  delay={150}
                  stagger={24}
                  duration={750}
                />
              </h3>

              <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-sm">
                Our focus on masterful building ensures every square foot meets the highest standards.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 w-full flex justify-center order-1 lg:order-2 [perspective:1400px]">
            <div className={`w-full ${isCurrent ? "animate-parallax-img-container" : "opacity-0"}`}>
              <div
                ref={cardRef}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-[46vh] sm:h-[52vh] lg:h-[58vh] xl:h-[62vh] cursor-pointer rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group select-none"
                style={{
                  transformStyle: "preserve-3d",
                }}
                title="Click or move cursor to experience 3D parallax"
              >
                <div
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})`,
                    transition: isClickPopped
                      ? "transform 750ms cubic-bezier(0.18, 0.89, 0.32, 1.28), box-shadow 750ms ease"
                      : "transform 160ms ease-out, box-shadow 300ms ease",
                    transformStyle: "preserve-3d",
                  }}
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
                >
                  <div
                    style={{
                      transform: `translateZ(45px) scale(1.15) translate(${-tilt.y * 1.4}px, ${tilt.x * 1.4}px)`,
                      transition: isClickPopped
                        ? "transform 750ms cubic-bezier(0.18, 0.89, 0.32, 1.28)"
                        : "transform 160ms ease-out",
                    }}
                    className={`relative w-full h-full ${isCurrent ? "animate-inner-image" : ""}`}
                  >
                    <Image
                      src="/building-excellence.jpg"
                      alt="High-rise construction buildings and tower cranes"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                      className="object-cover object-center pointer-events-none"
                    />
                  </div>

                  <div
                    style={{
                      background: `radial-gradient(circle at ${50 + tilt.y * 2.5}% ${50 + tilt.x * 2.5}%, rgba(255,255,255,0.35) 0%, transparent 65%)`,
                    }}
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
