"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function MissionVisionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden text-white select-none"
    >
      <style jsx>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(36px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-mission {
          animation: fadeSlideUp 1000ms cubic-bezier(0.22, 1, 0.36, 1) 150ms both;
        }
        .animate-vision {
          animation: fadeSlideUp 1000ms cubic-bezier(0.22, 1, 0.36, 1) 350ms both;
        }
      `}</style>

      <div className="absolute inset-0 z-0">
        <Image
          src="/mission-vision-bg.jpg"
          alt="Urban Skyline Architecture Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* <div className="absolute inset-0 bg-[#0c141f]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f18]/60 via-[#101826]/70 to-[#0a0f18]/85" /> */}
      </div>

      <div className="absolute inset-0 pointer-events-none flex justify-between w-full px-2 sm:px-6 md:px-10 lg:px-14 xl:px-16 z-10">
        <div className="w-px h-full bg-white/15" />
        <div className="w-px h-full bg-white/15 hidden sm:block" />
        <div className="w-px h-full bg-white/15" />
        <div className="w-px h-full bg-white/15 hidden sm:block" />
        <div className="w-px h-full bg-white/15" />
        <div className="w-px h-full bg-white/15 hidden sm:block" />
        <div className="w-px h-full bg-white/15" />
        <div className="w-px h-full bg-white/15 hidden md:block" />
        <div className="w-px h-full bg-white/15" />
      </div>

      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-16 py-20 sm:py-28 md:py-32 flex flex-col justify-between">
        
        <div className="flex justify-start w-full">
          <div
            className={`max-w-md lg:max-w-lg flex flex-col items-start ${
              isVisible ? "animate-mission" : "opacity-0"
            }`}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.35)] mb-4 sm:mb-5 hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#F4511E] fill-current"
              >
                <path d="M12.75 3.03a11.96 11.96 0 0 1 8.22 8.22.75.75 0 0 1-.58.91l-2.42.48a1.5 1.5 0 0 0-1.12.92l-1.07 2.45a.75.75 0 0 1-.9.42 12.06 12.06 0 0 1-5.74-5.74.75.75 0 0 1 .42-.9l2.45-1.07a1.5 1.5 0 0 0 .92-1.12l.48-2.42a.75.75 0 0 1 .74-.65zM8.05 13.5l-2.73.91a.75.75 0 0 0-.48.56l-.8 3.63a.75.75 0 0 0 .88.88l3.63-.8a.75.75 0 0 0 .56-.48l.91-2.73a14.28 14.28 0 0 1-1.97-1.97zm8.4-1.95a1.5 1.5 0 1 0-2.12-2.12 1.5 1.5 0 0 0 2.12 2.12z" />
              </svg>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md">
              Our Mission
            </h3>

            <p className="text-[14.5px] sm:text-[16px] md:text-[17.5px] text-white/90 font-normal leading-[1.7] drop-shadow-sm select-text">
              To empower urban landscapes through high performance engineering
              and innovative design that prioritizes sustainability.
            </p>
          </div>
        </div>

        <div className="h-12 sm:h-16 md:h-20" />

        <div className="flex justify-start md:justify-end w-full mt-10 md:mt-0">
          <div
            className={`max-w-md lg:max-w-lg flex flex-col items-start lg:items-start text-left ${
              isVisible ? "animate-vision" : "opacity-0"
            }`}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.35)] mb-4 sm:mb-5 hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#D81B60] fill-current"
              >
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md">
              Our Vision
            </h3>

            <p className="text-[14.5px] sm:text-[16px] md:text-[17.5px] text-white/90 font-normal leading-[1.7] drop-shadow-sm select-text">
              To be a global leader in commercial architecture, setting the
              standard for resilient, future-ready office complexes.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
