"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import OverviewSection from "./components/OverviewSection";
import OurStorySection from "./components/OurStorySection";
import ExpertiseSection from "./components/ExpertiseSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import SectorsSection from "./components/SectorsSection";
import FaqSection from "./components/FaqSection";
import ClientsSection from "./components/ClientsSection";
import FooterSection from "./components/FooterSection";
import LetterReveal from "./components/LetterReveal";
import Reveal from "./components/Reveal";
import ParallaxMedia from "./components/ParallaxMedia";
import GlobalDemo from "./components/GlobalPresence";


interface CarouselItem {
  id: number;
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  type: "crane" | "building" | "containers";
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 0,
    name: "Crane",
    src: "/hero-2.png",
    alt: "Yellow construction tower crane",
    width: 850,
    height: 1100,
    type: "crane",
  },
  {
    id: 1,
    name: "Building",
    src: "/hero-3.png",
    alt: "Modern orange commercial architecture building",
    width: 850,
    height: 1300,
    type: "building",
  },
  {
    id: 2,
    name: "Containers",
    src: "/hero-1.png",
    alt: "Stacked shipping containers",
    width: 750,
    height: 520,
    type: "containers",
  },
];

type CarouselPosition = "center" | "right" | "left" | "out_left" | "resetting";

interface ItemState {
  pos: CarouselPosition;
  noTransition?: boolean;
}

export default function Home() {
  const [isHeroTextVisible, setIsHeroTextVisible] = useState(false);

  const [itemStates, setItemStates] = useState<Record<number, ItemState>>({
    0: { pos: "left" },
    1: { pos: "center" },
    2: { pos: "right" },
  });

  const isAnimatingRef = useRef(false);
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [heroSlopeProgress, setHeroSlopeProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroTextVisible(true);
    }, 200);

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const progress = Math.max(0, Math.min(1, scrollY / 400));
      setHeroSlopeProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const advanceCarousel = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    setItemStates((prev) => {
      let leftId = 0;
      let centerId = 1;
      let rightId = 2;

      Object.entries(prev).forEach(([idStr, state]) => {
        const id = Number(idStr);
        if (state.pos === "left") leftId = id;
        if (state.pos === "center") centerId = id;
        if (state.pos === "right" || state.pos === "resetting") rightId = id;
      });

      return {
        ...prev,
        [rightId]: { pos: "center" },
        [centerId]: { pos: "left" },
        [leftId]: { pos: "out_left" },
      };
    });

    setTimeout(() => {
      setItemStates((prev) => {
        let outId = 0;
        Object.entries(prev).forEach(([idStr, state]) => {
          if (state.pos === "out_left") outId = Number(idStr);
        });

        return {
          ...prev,
          [outId]: { pos: "resetting", noTransition: true },
        };
      });

      setTimeout(() => {
        setItemStates((prev) => {
          let resetId = 0;
          Object.entries(prev).forEach(([idStr, state]) => {
            if (state.pos === "resetting") resetId = Number(idStr);
          });

          return {
            ...prev,
            [resetId]: { pos: "right" },
          };
        });

        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 660);
      }, 40);
    }, 300);
  };

  const handleManualClick = (clickedId: number) => {
    if (isAnimatingRef.current) return;
    const currentState = itemStates[clickedId]?.pos;
    if (currentState === "right" || currentState === "left") {
      advanceCarousel();
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
      loopTimerRef.current = setInterval(advanceCarousel, 3800);
    }
  };

  useEffect(() => {
    loopTimerRef.current = setInterval(() => {
      advanceCarousel();
    }, 3800);

    return () => {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-white text-zinc-900 font-sans selection:bg-[#E64A38]/30 selection:text-white overflow-x-hidden">
      <Navbar />

      <section className="relative w-full h-screen overflow-hidden select-none bg-[#182029]">
        <ParallaxMedia className="absolute inset-0 pointer-events-none z-0" speed={0.06}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#141b23] via-[#1d2530] via-45% to-[#151b22]" />
          <div
            className="absolute inset-0 opacity-85"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 36% 76%, rgba(220, 50, 85, 0.48) 0%, rgba(235, 90, 45, 0.26) 38%, rgba(22, 28, 38, 0) 72%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 70% 35% at 70% 80%, rgba(215, 75, 110, 0.32) 0%, rgba(240, 115, 55, 0.16) 42%, transparent 70%)",
            }}
          />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
        </ParallaxMedia>

        <div className="absolute top-[12vh] sm:top-[10vh] md:top-[11vh] lg:top-[12vh] left-1/2 -translate-x-1/2 z-20 w-full px-4 sm:px-6 text-center pointer-events-none">
          <div className="max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center">
            <Reveal isVisible={isHeroTextVisible} direction="down" duration={600} delay={0}>
              <div className="max-w-3xl lg:max-w-4xl mx-auto mb-4 sm:mb-4 space-y-1.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">

                <p className="text-[12px] md:text-[13.5px] text-slate-300 font-bold leading-relaxed uppercase tracking-wider">
                  The Group&apos;s experience extends across India, Singapore, Malaysia, Maldives and the UAE, reflecting its international outlook and ability to deliver solutions across diverse markets.
                </p>
              </div>
            </Reveal>
            <h1 className="text-2xl md:text-[clamp(1.1rem,2.4vw,2.1rem)] font-black tracking-tight text-white uppercase leading-snug max-w-4xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)] mt-2">
              <LetterReveal
                text="Building Businesses. Creating Possibilities. Shaping the Future."
                isVisible={isHeroTextVisible}
                direction="top-to-bottom"
                delay={0}
                stagger={10}
                duration={550}
              />
            </h1>
          </div>
        </div>

        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-auto">
          {CAROUSEL_ITEMS.map((item) => {
            const state = itemStates[item.id] || { pos: "center" };
            const { pos, noTransition } = state;


            let leftVal = "50%";
            let scaleVal = pos === "center" && item.type === "containers" ? 1.4 : 1.15;
            let zIndexVal = 30;
            let opacityVal = 1;
            let shadowVal = "drop-shadow(0 25px 40px rgba(0,0,0,0.75))";
            let transitionStyle =
              "left 1000ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1000ms ease, filter 1000ms ease";

            if (pos === "right") {
              leftVal = "86%";
              scaleVal = 0.75;
              zIndexVal = 25;
              opacityVal = 0.82;
              shadowVal = "drop-shadow(0 15px 25px rgba(0,0,0,0.55))";
              transitionStyle =
                "left 660ms cubic-bezier(0.22, 1, 0.36, 1), transform 660ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease, filter 500ms ease";
            } else if (pos === "left") {
              leftVal = "14%";
              scaleVal = 0.75;
              zIndexVal = 25;
              opacityVal = 0.82;
              shadowVal = "drop-shadow(0 15px 25px rgba(0,0,0,0.55))";
              transitionStyle =
                "left 1000ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1000ms ease, filter 1000ms ease";
            } else if (pos === "out_left") {
              leftVal = "-28%";
              scaleVal = 0.75;
              zIndexVal = 22;
              opacityVal = 0;
              shadowVal = "drop-shadow(0 15px 25px rgba(0,0,0,0))";
              transitionStyle = "left 300ms ease-in, transform 300ms ease-in, opacity 300ms ease-in";
            } else if (pos === "resetting") {
              leftVal = "115%";
              scaleVal = 0.75;
              zIndexVal = 25;
              opacityVal = 0;
              shadowVal = "drop-shadow(0 15px 25px rgba(0,0,0,0))";
              transitionStyle = "none";
            } else {
              leftVal = "50%";
              scaleVal = item.type === "containers" ? 1.4 : 1.15;
              zIndexVal = 30;
              opacityVal = 1;
              shadowVal = "drop-shadow(0 25px 40px rgba(0,0,0,0.75))";
              transitionStyle =
                "left 1000ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1000ms ease, filter 1000ms ease";
            }

            if (noTransition) {
              transitionStyle = "none";
            }

            const sharedSizeClasses = "h-[65vh] md:h-[55vh] lg:h-[60vh] w-[95vw] md:w-[35vw] lg:w-[30vw] md:max-w-[500px] min-w-[240px]";
            let itemClasses = "";
            if (item.type === "crane") {
              itemClasses = `bottom-[-5%] sm:bottom-[-4%] md:bottom-[-2%] ${sharedSizeClasses} ${pos === "center" ? "-ml-[8vw] md:ml-0" : ""}`;
            } else if (item.type === "building") {
              itemClasses = `bottom-[-2%] sm:bottom-[-1%] md:bottom-[0%] ${sharedSizeClasses}`;
            } else {
              itemClasses = `bottom-[2%] sm:bottom-[3%] md:bottom-[0%] ${sharedSizeClasses}`;
            }

            return (
              <div
                key={item.id}
                onClick={() => handleManualClick(item.id)}
                style={{
                  left: leftVal,
                  transform: `translateX(-50%) scale(${scaleVal})`,
                  transformOrigin: "bottom center",
                  zIndex: zIndexVal,
                  opacity: opacityVal,
                  filter: shadowVal,
                  transition: transitionStyle,
                }}
                className={`absolute cursor-pointer flex items-end justify-center carousel-pos-${pos} ${itemClasses}`}
                title={`Click to bring ${item.name} to center`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  priority
                  className="w-full h-auto max-h-full object-contain object-bottom select-none pointer-events-none"
                />
              </div>
            );
          })}
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .carousel-pos-left,
            .carousel-pos-right,
            .carousel-pos-out_left,
            .carousel-pos-resetting {
              opacity: 0 !important;
              pointer-events: none !important;
            }
          }
        `}</style>
        <div className="absolute -bottom-[2px] left-0 right-0 w-full z-20 pointer-events-none leading-none overflow-hidden">
          <svg
            viewBox="0 0 1920 180"
            preserveAspectRatio="none"
            className="w-full h-[calc(15vh+2px)] md:h-[calc(13vh+2px)] lg:h-[calc(15vh+2px)] block"
          >
            <polygon
              points={`-10,220 -10,${Math.round(25 + 140 * heroSlopeProgress)} 960,${Math.round(165 - 140 * heroSlopeProgress)} 1930,${Math.round(25 + 140 * heroSlopeProgress)} 1930,220`}
              fill="#FFFFFF"
              className="transition-all duration-150 ease-out"
            />
          </svg>
        </div>
      </section>

      <section className="relative z-10 w-full bg-white -mt-[2px]">
        <OverviewSection />
      </section>

      <OurStorySection />


      <section className="relative z-10 w-full bg-white border-t border-zinc-100">
        <ExpertiseSection />
      </section>

      <section className="relative z-10 w-full bg-white border-t border-zinc-100">
        <WhyChooseUsSection />
      </section>

      <section className="relative z-10 w-full bg-white border-t border-zinc-100">
        <SectorsSection />
      </section>

      <section className="relative z-10 w-full bg-white border-t border-zinc-100">
        <FaqSection />
      </section>

      <section className="relative z-10 w-full bg-white border-t border-zinc-100">

        <GlobalDemo />


      </section>

      <section className="relative z-10 w-full bg-white border-t border-zinc-100">
        <ClientsSection />
      </section>

      <FooterSection />
    </main>
  );
}