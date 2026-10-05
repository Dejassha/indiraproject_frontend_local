"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import LetterReveal from "./LetterReveal";

interface ParallaxProps {
  children: React.ReactNode;
  type?: "image" | "content";
  baseOffset?: number;
  speed?: number;
  className?: string;
}

function ParallaxWrapper({
  children,
  type = "image",
  baseOffset,
  speed,
  className = "",
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isImage = type === "image";
  const defaultBaseOffset = isImage ? 180 : 280;

  const [y, setY] = useState(baseOffset ?? defaultBaseOffset);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollMetrics = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const isMobile = window.innerWidth < 768;

      const triggerPoint = windowHeight * 0.95;
      const scrollDelta = triggerPoint - rect.top;

      const activeBaseOffset = baseOffset ?? (isImage ? (isMobile ? 110 : 180) : (isMobile ? 160 : 280));
      const activeSpeed = speed ?? (isImage ? (isMobile ? 0.22 : 0.32) : (isMobile ? 0.36 : 0.50));

      if (scrollDelta > 0) {
        const entrance = Math.min(1, scrollDelta / (windowHeight * 0.3));
        const currentOpacity = Math.round(Math.pow(entrance, 1.2) * 100) / 100;

        const calculatedY = activeBaseOffset - scrollDelta * activeSpeed;

        setY(Math.round(calculatedY * 10) / 10);
        setOpacity(currentOpacity);
      } else {
        setY(activeBaseOffset);
        setOpacity(0);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollMetrics();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateScrollMetrics();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [baseOffset, speed, isImage]);

  return (
    <div
      ref={containerRef}
      style={{
        opacity,
        transform: `translate3d(0, ${y}px, 0)`,
        transition: "transform 0.08s ease-out, opacity 0.2s ease-out",
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

interface StrategicItem {
  id: number;
  badgeType: "pink" | "orange";
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
}

const STRATEGIC_ITEMS: StrategicItem[] = [
  {
    id: 1,
    badgeType: "pink",
    title: "Innovative Design",
    description:
      "We define aesthetics through a deep understanding of urban impact and client vision.",
    imageSrc: "/skyscrapers.jpg",
    imageAlt: "Modern glass high-rise skyscrapers low-angle view",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.435 4.565a1.5 1.5 0 0 0-2.122 0l-1.884 1.884 3.97 3.97 1.884-1.884a1.5 1.5 0 0 0 0-2.122l-1.848-1.848zM17.93 11.88 13.96 7.91 5.3 16.57a1.5 1.5 0 0 0-.395.707l-1.025 4.103a.5.5 0 0 0 .606.606l4.103-1.025a1.5 1.5 0 0 0 .707-.395l8.635-8.686zM8.5 17.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    badgeType: "orange",
    title: "Building Excellence",
    description:
      "Our focus on masterful building ensures every square foot meets the highest standards.",
    imageSrc: "/building-excellence.jpg",
    imageAlt: "Construction site cranes building modern architectural structures",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 1.5 8l10.5 6 10.5-6L12 2zm0 14.5L3.5 11.4v5.1l8.5 4.9 8.5-4.9v-5.1L12 16.5z" />
      </svg>
    ),
  },
  {
    id: 3,
    badgeType: "pink",
    title: "Integrated Capabilities",
    description:
      "Multiple capabilities under one Group enable us to manage projects and business requirements through integrated expertise.",
    imageSrc: "/skyscrapers.jpg",
    imageAlt: "Integrated modern commercial corporate towers",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9.07l-9-7-9 7 1.63 1.27L12 16z" />
      </svg>
    ),
  },
  {
    id: 4,
    badgeType: "orange",
    title: "International Experience",
    description:
      "Our experience across India and international markets gives us the ability to understand diverse regulatory, technical and business environments.",
    imageSrc: "/building-excellence.jpg",
    imageAlt: "International engineering and infrastructure project",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    id: 5,
    badgeType: "pink",
    title: "End-to-End Execution",
    description:
      "From planning and design to execution and delivery, our integrated approach helps improve coordination, quality and efficiency.",
    imageSrc: "/skyscrapers.jpg",
    imageAlt: "End to end infrastructure development execution",
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.75 3.03a11.96 11.96 0 0 1 8.22 8.22.75.75 0 0 1-.58.91l-2.42.48a1.5 1.5 0 0 0-1.12.92l-1.07 2.45a.75.75 0 0 1-.9.42 12.06 12.06 0 0 1-5.74-5.74.75.75 0 0 1 .42-.9l2.45-1.07a1.5 1.5 0 0 0 .92-1.12l.48-2.42a.75.75 0 0 1 .74-.65zM8.05 13.5l-2.73.91a.75.75 0 0 0-.48.56l-.8 3.63a.75.75 0 0 0 .88.88l3.63-.8a.75.75 0 0 0 .56-.48l.91-2.73a14.28 14.28 0 0 1-1.97-1.97zm8.4-1.95a1.5 1.5 0 1 0-2.12-2.12 1.5 1.5 0 0 0 2.12 2.12z" />
      </svg>
    ),
  },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 md:py-32 bg-white text-zinc-900 z-10 overflow-hidden select-none"
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

      <div className="relative z-10 w-full max-w-[94vw] xl:max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24">
          <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#E91E63] uppercase mb-2 sm:mb-3 block">
            STRATEGIC EXCELLENCE
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-black text-[#13193A] tracking-tight uppercase leading-tight mb-4">
            <LetterReveal
              text="WHY INDIRA GROUP?"
              isVisible={isVisible}
              direction="top-to-bottom"
              delay={100}
              stagger={20}
              duration={700}
            />
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-[19px] text-zinc-600 font-normal leading-relaxed max-w-3xl mx-auto select-text">
            We are a full-service architecture studio committed to delivering thoughtful,
            high-quality spaces. Our work blends creativity, technical skill, and an
            unwavering attention to detail.
          </p>
        </div>

        <div className="space-y-20 sm:space-y-28 lg:space-y-36">
          {STRATEGIC_ITEMS.map((item, index) => {
            const isImageLeft = index % 2 === 0;
            const badgeBg =
              item.badgeType === "pink"
                ? "bg-[#E91E63] text-white"
                : "bg-[#F4511E] text-white";
            const titleColor =
              item.badgeType === "pink" ? "text-[#E91E63]" : "text-[#F4511E]";

            return (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                <div
                  className={`lg:col-span-7 w-full ${
                    isImageLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"
                  }`}
                >
                  <ParallaxWrapper type="image" className="w-full">
                    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] group">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </ParallaxWrapper>
                </div>

                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isImageLeft
                      ? "order-2 lg:order-2 lg:pl-4 xl:pl-8 items-start text-left"
                      : "order-2 lg:order-1 lg:pr-4 xl:pr-8 items-end text-right"
                  }`}
                >
                  <ParallaxWrapper type="content" className={`w-full flex flex-col justify-center ${isImageLeft ? 'items-start' : 'items-end'}`}>
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full ${badgeBg} flex items-center justify-center shadow-lg mb-4 sm:mb-6 hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>

                    <h3
                      className={`text-2xl sm:text-3xl lg:text-[34px] font-bold ${titleColor} tracking-tight mb-3 sm:mb-4`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-base sm:text-lg lg:text-[19px] text-zinc-600 font-normal leading-relaxed max-w-lg select-text">
                      {item.description}
                    </p>
                  </ParallaxWrapper>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
