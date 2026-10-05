"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ProjectSlide {
  id: number;
  number: string;
  title: string;
  location: string;
  category: string;
  image: string;
}

const PROJECT_SLIDES: ProjectSlide[] = [
  {
    id: 1,
    number: "01",
    title: "INDIRA HIGH\nCOURT ENCLAVE",
    location: "Thoraipakkam, Chennai",
    category: "Residential Development",
    image: "/building-excellence.jpg",
  },
  {
    id: 2,
    number: "02",
    title: "INDIRA TECH\nHORIZON PARK",
    location: "OMR, Chennai",
    category: "Commercial Infrastructure",
    image: "/skyscrapers.jpg",
  },
  {
    id: 3,
    number: "03",
    title: "MALDIVES RESORT &\nEPC DEVELOPMENT",
    location: "Malé, Maldives",
    category: "Marine & Resort Infrastructure",
    image: "/epc-maldives.jpg",
  },
  {
    id: 4,
    number: "04",
    title: "INDIRA GLOBAL\nLOGISTICS HUB",
    location: "Dubai, UAE",
    category: "Industrial Supply Chain",
    image: "/cargo-ship.jpg",
  },
];

export default function OurStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const founderGridRef = useRef<HTMLDivElement | null>(null);
  const projectGridRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [slopeProgress, setSlopeProgress] = useState(0); // 0 (V-shape opening) to 1 (A-shape peak)
  const [photoY, setPhotoY] = useState(130);
  const [photoOpacity, setPhotoOpacity] = useState(0);
  const [contentY, setContentY] = useState(420);
  const [contentOpacity, setContentOpacity] = useState(0);
  const [headerY, setHeaderY] = useState(150);
  const [headerOpacity, setHeaderOpacity] = useState(0);

  const [projectPhotoY, setProjectPhotoY] = useState(90);
  const [projectPhotoOpacity, setProjectPhotoOpacity] = useState(0);
  const [projectTitleY, setProjectTitleY] = useState(80);
  const [projectTitleOpacity, setProjectTitleOpacity] = useState(0);
  const [projectLocationY, setProjectLocationY] = useState(480);
  const [projectLocationOpacity, setProjectLocationOpacity] = useState(0);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScrollMetrics = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const start = windowHeight;
      const end = windowHeight * 0.2;
      const rawProgress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setSlopeProgress(clamped);

      if (founderGridRef.current) {
        const founderRect = founderGridRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;

        const triggerPoint = windowHeight * 0.95;
        const scrollDelta = triggerPoint - founderRect.top;

        const photoBaseOffset = isMobile ? 80 : 130;
        const photoSpeed = isMobile ? 0.14 : 0.20;

        const contentBaseOffset = isMobile ? 120 : 480;
        const contentSpeed = isMobile ? 0.18 : 0.58;

        const headerBaseOffset = isMobile ? 40 : 80;
        const headerSpeed = isMobile ? 0.08 : 0.12;

        if (scrollDelta > 0) {
          const entrance = Math.min(1, scrollDelta / (windowHeight * 0.3));
          const opacity = Math.round(Math.pow(entrance, 1.2) * 100) / 100;

          const calculatedPhotoY = photoBaseOffset - scrollDelta * photoSpeed;

          const calculatedContentY = contentBaseOffset - scrollDelta * contentSpeed;

          const calculatedHeaderY = Math.max(-50, headerBaseOffset - scrollDelta * headerSpeed);

          setPhotoY(Math.round(calculatedPhotoY * 10) / 10);
          setPhotoOpacity(opacity);
          setContentY(Math.round(calculatedContentY * 10) / 10);
          setContentOpacity(opacity);
          setHeaderY(Math.round(calculatedHeaderY * 10) / 10);
          setHeaderOpacity(opacity);
        } else {
          setPhotoY(photoBaseOffset);
          setPhotoOpacity(0);
          setContentY(contentBaseOffset);
          setContentOpacity(0);
          setHeaderY(headerBaseOffset);
          setHeaderOpacity(0);
        }
      }

      if (projectGridRef.current) {
        const projectRect = projectGridRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;

        const triggerPoint = windowHeight * 0.95;
        const scrollDelta = triggerPoint - projectRect.top;

        const photoBaseOffset = isMobile ? 60 : 90;
        const photoSpeed = isMobile ? 0.14 : 0.20;

        const titleBaseOffset = isMobile ? 40 : 80;
        const titleSpeed = isMobile ? 0.08 : 0.12;

        const locationBaseOffset = isMobile ? 60 : 30;
        const locationSpeed = isMobile ? 0.14 : 0.35;

        if (scrollDelta > 0) {
          const entrance = Math.min(1, scrollDelta / (windowHeight * 0.3));
          const opacity = Math.round(Math.pow(entrance, 1.2) * 100) / 100;

          const calculatedPhotoY = photoBaseOffset - scrollDelta * photoSpeed;

          const calculatedTitleY = Math.max(-50, titleBaseOffset - scrollDelta * titleSpeed);

          const calculatedLocationY = locationBaseOffset - scrollDelta * locationSpeed;

          setProjectPhotoY(Math.round(calculatedPhotoY * 10) / 10);
          setProjectPhotoOpacity(opacity);
          setProjectTitleY(Math.round(calculatedTitleY * 10) / 10);
          setProjectTitleOpacity(opacity);
          setProjectLocationY(Math.round(calculatedLocationY * 10) / 10);
          setProjectLocationOpacity(opacity);
        } else {
          setProjectPhotoY(photoBaseOffset);
          setProjectPhotoOpacity(0);
          setProjectTitleY(titleBaseOffset);
          setProjectTitleOpacity(0);
          setProjectLocationY(locationBaseOffset);
          setProjectLocationOpacity(0);
        }
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
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % PROJECT_SLIDES.length);
      setProgressKey((k) => k + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlideIndex]);

  const handlePrev = () => {
    setCurrentSlideIndex(
      (prev) => (prev - 1 + PROJECT_SLIDES.length) % PROJECT_SLIDES.length
    );
    setProgressKey((k) => k + 1);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % PROJECT_SLIDES.length);
    setProgressKey((k) => k + 1);
  };

  const currentSlide = PROJECT_SLIDES[currentSlideIndex];
  const nextSlideIndex = (currentSlideIndex + 1) % PROJECT_SLIDES.length;
  const nextSlide = PROJECT_SLIDES[nextSlideIndex];

  const V_DEPTH = 180;

  const sidesY = Math.round(25 + 140 * slopeProgress);
  const centerY = Math.round(165 - 140 * slopeProgress);
  const topPolygonPoints = `-10,-20 -10,${sidesY} 960,${centerY} 1930,${sidesY} 1930,-20`;



  const bottomSidesY = Math.round(195 - V_DEPTH * slopeProgress);
  const bottomCenterY = Math.round(15 + V_DEPTH * slopeProgress);

  const bottomPolygonPoints = `0,180 0,${bottomSidesY} 960,${bottomCenterY} 1920,${bottomSidesY} 1920,180`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden text-white select-none pt-24 sm:pt-32 md:pt-36 pb-6 sm:pb-8"
      style={{
        background:
          "linear-gradient(180deg, #D01552 0%, #DC2248 30%, #EA442B 65%, #F56012 100%)",
      }}
    >
      <style jsx>{`
        @keyframes fadeInRise {
          0% {
            opacity: 0;
            transform: translateY(32px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressFillLoop {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes slideContentFade {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes projectImageSwitch {
          0% {
            opacity: 0;
            transform: scale(0.99);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes projectTextSwitch {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-rise-header {
          animation: fadeInRise 1000ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both;
        }
        .animate-rise-card {
          animation: fadeInRise 1100ms cubic-bezier(0.22, 1, 0.36, 1) 250ms both;
        }
        .animate-rise-content {
          animation: fadeInRise 1100ms cubic-bezier(0.22, 1, 0.36, 1) 400ms both;
        }
        .animate-slide-change {
          animation: slideContentFade 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-project-image {
          animation: projectImageSwitch 1700ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .animate-project-text {
          animation: projectTextSwitch 1700ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>

      <div className="absolute -top-[2px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          viewBox="0 0 1920 180"
          preserveAspectRatio="none"
          className="w-full h-[calc(9vh+2px)] sm:h-[calc(11vh+2px)] md:h-[calc(13vh+2px)] lg:h-[calc(15vh+2px)] block"
        >
          <polygon
            points={topPolygonPoints}
            fill="#FFFFFF"
            className="transition-all duration-150 ease-out"
          />
        </svg>
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 30%, rgba(122,94,91,0.04) 60%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none flex justify-between w-full px-2 sm:px-6 md:px-10 lg:px-14 xl:px-16 z-0">
        <div className="w-px h-full bg-white/20" />
        <div className="w-px h-full bg-white/20 hidden sm:block" />
        <div className="w-px h-full bg-white/20" />
        <div className="w-px h-full bg-white/20 hidden sm:block" />
        <div className="w-px h-full bg-white/20" />
        <div className="w-px h-full bg-white/20 hidden sm:block" />
        <div className="w-px h-full bg-white/20" />
        <div className="w-px h-full bg-white/20 hidden md:block" />
        <div className="w-px h-full bg-white/20" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-20 sm:pt-28 md:pt-32 pb-2 sm:pb-4">
        <div
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 will-change-transform"
          style={{
            opacity: headerOpacity,
            transform: `translate3d(0, ${headerY}px, 0)`,
            transition: "transform 0.08s ease-out, opacity 0.2s ease-out",
          }}
        >
          <span className="inline-block text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-[0.25em] text-white/90 uppercase mb-3 sm:mb-4">
            OUR STORY
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black text-white uppercase tracking-tight leading-[1.25] text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
            FROM CONCEPT TO COMPLETION, WE MASTER EVERY SQUARE FOOT.
          </h2>
        </div>

        <div
          ref={founderGridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center max-w-7xl mx-auto"
        >
          <div
            className="lg:col-span-5 flex justify-center will-change-transform"
            style={{
              opacity: photoOpacity,
              transform: `translate3d(0, ${photoY}px, 0)`,
              transition: "transform 0.08s ease-out, opacity 0.2s ease-out",
            }}
          >
            <div
              className="relative w-full max-w-[380px] sm:max-w-[430px] p-4 sm:p-5 shadow-[0_12px_28px_rgba(0,0,0,0.18)]"
              style={{
                background: "linear-gradient(135deg, #F3B49A 0%, #EC9AA7 100%)",
              }}
            >
              <div className="relative aspect-[4/5] w-full border-2 border-white shadow-[0_10px_22px_rgba(0,0,0,0.12)] bg-gradient-to-b from-[#C8104E] via-[#D8224E] to-[#F4511E] flex items-end justify-center overflow-hidden">
                <Image
                  src="/founder-blue.png"
                  alt="Mr. Bhupesh Nagarajan, Founder and Chairman"
                  fill
                  sizes="(max-width: 768px) 100vw, 430px"
                  priority
                  className="object-contain object-bottom filter contrast-[1.03]"
                />
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left will-change-transform"
            style={{
              opacity: contentOpacity,
              transform: `translate3d(0, ${contentY}px, 0)`,
              transition: "transform 0.08s ease-out, opacity 0.2s ease-out",
            }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-extrabold text-white tracking-tight leading-snug drop-shadow-sm mb-1 sm:mb-2 uppercase">
              MR. BHUPESH NAGARAJAN,
              <br />
              B.E. LL.B.(HONS)
            </h3>

            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white/95 mb-6 sm:mb-8">
              Founder and Chairman
            </p>

            <div className="space-y-4 text-white/90 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-normal leading-[1.8] select-text">
              <p>
                Bringing extensive experience in engineering, construction,
                property development and international project execution.
              </p>
              <p>
                Since establishing the organization in 2010, he has driven its
                evolution from a construction and property development
                enterprise into a diversified business group with interests
                spanning engineering, property development, logistics,
                technology and life sciences.
              </p>
              <p>
                His professional experience across India and international
                markets has shaped the Group&apos;s approach to combining
                technical expertise, global standards and local understanding.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-0 sm:pt-2 pb-2 sm:pb-4 max-w-7xl mx-auto">
        <div
          ref={projectGridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 items-center"
        >

          <div
            className="md:col-span-4 flex flex-col justify-center text-left will-change-transform md:-mt-20 lg:-mt-28"
            style={{
              opacity: projectTitleOpacity,
              transform: `translate3d(0, ${projectTitleY}px, 0)`,
              transition: "transform 0.08s ease-out, opacity 0.2s ease-out",
            }}
          >
            <h3
              key={`title-${currentSlide.id}`}
              className="animate-project-text font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white uppercase tracking-tight leading-[1.15] drop-shadow-md whitespace-pre-line"
            >
              {currentSlide.title}
            </h3>
          </div>

          <div
            className="md:col-span-5 flex flex-col items-center justify-center will-change-transform"
            style={{
              opacity: projectPhotoOpacity,
              transform: `translate3d(0, ${projectPhotoY}px, 0)`,
              transition: "transform 0.08s ease-out, opacity 0.2s ease-out",
            }}
          >
            <div
              key={`img-${currentSlide.id}`}
              className="animate-project-image relative w-full max-w-[380px] sm:max-w-[420px] p-3.5 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
              style={{
                background: "linear-gradient(135deg, #F9B485 0%, #EF84A7 100%)",
              }}
            >
              <div className="relative aspect-[4/5] w-full border-2 border-white shadow-[0_15px_35px_rgba(0,0,0,0.25)] overflow-hidden bg-zinc-900">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-white text-[15px] sm:text-[17px] font-semibold tracking-wider w-full">

              <button
                onClick={handlePrev}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-all cursor-pointer select-none active:scale-95"
                title="Previous project"
              >
                <span className="text-lg">&lt;</span>
                <span>{currentSlide.number}</span>
              </button>

              <div className="relative w-32 sm:w-44 md:w-52 h-[2px] bg-white/30 rounded-full overflow-hidden">
                <div
                  key={progressKey}
                  className="h-full bg-[#D81B60] rounded-full"
                  style={{
                    animation: "progressFillLoop 5000ms linear forwards",
                  }}
                />
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-all cursor-pointer select-none active:scale-95"
                title="Next project"
              >
                <span>{nextSlide.number}</span>
                <span className="text-lg">&gt;</span>
              </button>

            </div>
          </div>

          <div
            className="md:col-span-3 flex flex-col justify-end text-left md:text-left self-end pb-2 will-change-transform"
            style={{
              opacity: projectLocationOpacity,
              transform: `translate3d(0, ${projectLocationY}px, 0)`,
              transition: "transform 0.08s ease-out, opacity 0.2s ease-out",
            }}
          >
            <div
              key={`meta-${currentSlide.id}`}
              className="animate-project-text space-y-1"
            >
              <p className="text-white/95 text-[13px] sm:text-[14px] md:text-[15px] font-medium leading-tight">
                {currentSlide.location}
              </p>
              <p className="text-white/75 text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-tight">
                {currentSlide.category}
              </p>
            </div>
          </div>

        </div>
      </div>

      { /* <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          viewBox="0 0 1920 240"
          preserveAspectRatio="none"
          className="w-full h-[9vh] sm:h-[11vh] md:h-[13vh] lg:h-[15vh] block"
        >
          <polygon
            points={bottomPolygonPoints}
            fill="#FFFFFF"
            className="transition-all duration-150 ease-out" 
          />
        </svg>
      </div> */}
    </section>
  );
}
