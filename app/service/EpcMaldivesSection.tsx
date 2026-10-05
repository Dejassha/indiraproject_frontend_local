"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "../components/Reveal";
import LetterReveal from "../components/LetterReveal";
import { fetchfromCMS } from "../components/api";

interface EpcMaldivesSectionProps {
  isVisible?: boolean;
}

export default function EpcMaldivesSection({ isVisible: forcedVisible }: EpcMaldivesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);

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

  const defaultSlides = [
    {
      id: 0,
      imageLeft: true,
      title: "EPC Maldives Police Project",
      description:
        "Maldives police infra project scope involve design,developing and construction of police station in 8 AtollStations, 23 Island Police stations, 21 Police posts, 1 detention centre, 2 Extension of Existing Facility, 1 Police station in Male, 1 Police station in Hulhumale and 4 Accomadation buildings, 14 Total 61 Infra Facilities.",
      imageSrc: "/epc-maldives.png",
      imageAlt: "EPC Maldives Police Project White Interior Architecture",
    },
    {
      id: 1,
      imageLeft: false,
      title: "EPC Maldives Police Project",
      description:
        "Maldives police infra project scope involve design,developing and construction of police station in 8 AtollStations, 23 Island Police stations, 21 Police posts, 1 detention centre, 2 Extension of Existing Facility, 1 Police station in Male, 1 Police station in Hulhumale and 4 Accomadation buildings, 14 Total 61 Infra Facilities.",
      imageSrc: "/epc-maldives.jpg",
      imageAlt: "EPC Maldives Police Project Living Lounge Architecture",
    },
  ];

  const [slides, setSlides] = useState(defaultSlides);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchfromCMS("services");
        if (data?.docs?.length > 0) {
          const cmsSlides = data.docs.map((doc: any, index: number) => {
            const formattedUrl = doc.image?.url?.replace('/api/media/file/', '/media/');
            const src = formattedUrl
              ? formattedUrl.startsWith("http")
                ? formattedUrl
                : `${process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3000"}${formattedUrl}`
              : index === 0 ? "/epc-maldives.png" : "/epc-maldives.jpg";
            
            return {
              id: index,
              imageLeft: index % 2 === 0,
              title: doc.title || defaultSlides[index % 2].title,
              description: doc.description || defaultSlides[index % 2].description,
              imageSrc: src,
              imageAlt: doc.title || "Project Architecture",
            };
          });
          setSlides(cmsSlides);
        }
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    loadServices();
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[activeSlide];

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-900 overflow-hidden select-none py-14 sm:py-20 md:py-24 border-t border-zinc-100 flex flex-col justify-between"
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

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-28">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 xl:gap-20 items-center mb-16 sm:mb-24">
          <div className="lg:col-span-6 xl:col-span-6 w-full">
            <Reveal isVisible={activeVisible} direction="down" duration={850} delay={150}>
              <div className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] lg:h-[580px] xl:h-[620px] overflow-hidden shadow-2xl rounded-2xl border border-zinc-200/60 group">
                <Image
                  src={slides[0].imageSrc}
                  alt={slides[0].imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center lg:pl-4 xl:pl-8">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[50px] font-bold text-[#F4511E] tracking-tight leading-tight mb-5 sm:mb-6">
              <LetterReveal
                text={slides[0].title}
                isVisible={activeVisible}
                direction="top-to-bottom"
                delay={200}
                stagger={24}
                duration={750}
              />
            </h3>

            <Reveal isVisible={activeVisible} direction="down" duration={850} delay={350}>
              <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-zinc-600 font-light leading-relaxed max-w-2xl">
                {slides[0].description}
              </p>
            </Reveal>
          </div>
        </div>

        {slides.length > 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 xl:gap-20 items-center pt-8 border-t border-zinc-200/50">
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center lg:pr-4 xl:pr-8 order-2 lg:order-1">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[50px] font-bold text-[#F4511E] tracking-tight leading-tight mb-5 sm:mb-6">
              <LetterReveal
                text={slides[1].title}
                isVisible={activeVisible}
                direction="top-to-bottom"
                delay={250}
                stagger={24}
                duration={750}
              />
            </h3>

            <Reveal isVisible={activeVisible} direction="down" duration={850} delay={350}>
              <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-zinc-600 font-light leading-relaxed max-w-2xl">
                {slides[1].description}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 xl:col-span-6 w-full order-1 lg:order-2">
            <Reveal isVisible={activeVisible} direction="down" duration={850} delay={150}>
              <div className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] lg:h-[580px] xl:h-[620px] overflow-hidden shadow-2xl rounded-none border border-zinc-200/60 group">
                <Image
                  src={slides[1].imageSrc}
                  alt={slides[1].imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                />
              </div>
            </Reveal>
          </div>
        </div>
        )}

        <div className="w-full flex justify-center mt-12 sm:mt-16">
          <div className="inline-flex items-center gap-4 bg-zinc-900 text-white rounded-full px-5 py-2.5 shadow-2xl border border-zinc-800">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-px h-4 bg-zinc-700" />
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
