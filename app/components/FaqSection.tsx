"use client";

import React, { useState, useRef, useEffect } from "react";
import LetterReveal from "./LetterReveal";
import { fetchfromCMS } from "./api";

interface FaqSectionProps {
  isVisible?: boolean;
  status?: "current" | "past" | "future";
  onPrev?: () => void;
  onNext?: () => void;
}


export default function FaqSection({
  isVisible,
  status,
  onPrev,
  onNext,
}: FaqSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [openId, setOpenId] = useState<number | null>(1);
  const [showAll, setShowAll] = useState(false);
  const [faq, setfaq] = useState<any[]>([]);

  useEffect(() => {
    const loadfaq = async () => {
      const data = await fetchfromCMS('faqs');
      console.log("FAQ API Response:", data);
      if (data?.docs) {
        setfaq(data.docs);
      } else {
        console.warn("FAQ docs missing from response. Setting faq to empty array.");
      }
    }
    loadfaq();
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
    ? `absolute inset-0 w-full h-full bg-white text-zinc-900 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden select-none flex flex-col justify-center ${positionClass}`
    : "relative w-full min-h-screen py-16 sm:py-24 flex flex-col justify-center bg-white text-zinc-900 z-10 overflow-hidden select-none";

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };



  return (
    <section
      ref={sectionRef}
      className={containerClass}
    >
      <style jsx>{`
        /* Smooth multi-layer top-to-bottom parallax keyframes */
        @keyframes parallaxHeader {
          0% {
            opacity: 0;
            transform: translateY(42px);
          }
          45% {
            opacity: 1;
            transform: translateY(-22px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes parallaxAccordionItem {
          0% {
            opacity: 0;
            transform: translateY(46px);
          }
          48% {
            opacity: 1;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-parallax-badge {
          animation: parallaxHeader 1500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both;
        }
        .animate-parallax-title {
          animation: parallaxHeader 1600ms cubic-bezier(0.22, 1, 0.36, 1) 220ms both;
        }
        .animate-parallax-desc {
          animation: parallaxHeader 1700ms cubic-bezier(0.22, 1, 0.36, 1) 340ms both;
        }
        .animate-parallax-cta {
          animation: parallaxHeader 1750ms cubic-bezier(0.22, 1, 0.36, 1) 440ms both;
        }

        .animate-faq-0 {
          animation: parallaxAccordionItem 1700ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both;
        }
        .animate-faq-1 {
          animation: parallaxAccordionItem 1700ms cubic-bezier(0.22, 1, 0.36, 1) 320ms both;
        }
        .animate-faq-2 {
          animation: parallaxAccordionItem 1700ms cubic-bezier(0.22, 1, 0.36, 1) 440ms both;
        }
        .animate-faq-3 {
          animation: parallaxAccordionItem 1700ms cubic-bezier(0.22, 1, 0.36, 1) 560ms both;
        }
        .animate-faq-4 {
          animation: parallaxAccordionItem 700ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both;
        }
        .animate-faq-5 {
          animation: parallaxAccordionItem 700ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both;
        }
        .animate-faq-6 {
          animation: parallaxAccordionItem 700ms cubic-bezier(0.22, 1, 0.36, 1) 300ms both;
        }
        .animate-faq-7 {
          animation: parallaxAccordionItem 700ms cubic-bezier(0.22, 1, 0.36, 1) 400ms both;
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

      <div className="relative z-10 w-full max-w-[94vw] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-center h-full py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full max-w-[94vw] mx-auto">

          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
            <div className={isCurrent ? "animate-parallax-badge" : "opacity-0"}>
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#FF3366] uppercase mb-2 sm:mb-3 block">
                QUESTIONS &amp; ANSWERS
              </span>
            </div>

            <div className={isCurrent ? "animate-parallax-title" : "opacity-0"}>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black text-[#13193A] tracking-tight uppercase leading-[1.12] mb-4 sm:mb-5">
                <LetterReveal
                  text="FREQUENTLY"
                  isVisible={isCurrent}
                  direction="top-to-bottom"
                  delay={150}
                  stagger={24}
                  duration={750}
                />
                <br />
                <LetterReveal
                  text="ASKED QUESTIONS"
                  isVisible={isCurrent}
                  direction="top-to-bottom"
                  delay={350}
                  stagger={22}
                  duration={750}
                />
              </h2>
            </div>

            <div className={isCurrent ? "animate-parallax-desc" : "opacity-0"}>
              <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
                Get answers to common questions about our construction services and processes.
              </p>
            </div>

            <div className={isCurrent ? "animate-parallax-cta" : "opacity-0"}>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-2 bg-[#F4511E] hover:bg-[#D81B60] text-white px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer w-fit"
              >
                <span>{showAll ? "Show Less" : "Know More"}</span>
                <span className="text-base">{showAll ? "↑" : "→"}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col w-full divide-y divide-zinc-200">
            {(showAll ? faq : faq.slice(0, 4)).map((item, idx) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`w-full ${isCurrent ? `animate-faq-${idx}` : "opacity-0"}`}
                >
                  <div className="py-5 sm:py-6 cursor-pointer group transition-all duration-300" onClick={() => toggleItem(item.id)}>
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className={`text-base sm:text-lg lg:text-[20px] font-bold tracking-tight transition-colors duration-300 ${isOpen ? "text-[#13193A]" : "text-zinc-800 group-hover:text-[#F4511E]"
                          }`}
                      >
                        {item.question}
                      </h3>
                      <span className={`text-xl sm:text-2xl font-bold text-[#FF3366] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-60 opacity-100 mt-3 sm:mt-4" : "max-h-0 opacity-0"
                        }`}
                    >
                      <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed pr-8">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
