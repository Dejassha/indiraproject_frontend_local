"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import LetterReveal from "./LetterReveal";
import MissionVisionSection from "./MissionVisionSection";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseSectionProps {
  isVisible?: boolean;
  status?: "current" | "past" | "future";
  onPrev?: () => void;
  onNext?: () => void;
}

interface ExpertiseCard {
  id: number;
  number: string;
  title: string;
  videoSrc: string;
  coverImage: string;
  activeColor: string;
  inactiveColor: string;
}

const EXPERTISE_CARDS: ExpertiseCard[] = [
  {
    id: 1,
    number: "01",
    title: "ENGINEERING & PROJECT MANAGEMENT",
    videoSrc: "/1.mp4",
    coverImage: "/video-cover.jpg",
    activeColor: "bg-[#F4511E] text-white",
    inactiveColor: "bg-[#FFE4DB] text-[#13193A]",
  },
  {
    id: 2,
    number: "02",
    title: "PROPERTY DEVELOPMENT",
    videoSrc: "/2.mp4",
    coverImage: "/construction-site.jpg",
    activeColor: "bg-[#D81B60] text-white",
    inactiveColor: "bg-[#FFD9CE] text-[#13193A]",
  },
  {
    id: 3,
    number: "03",
    title: "INDIRA EXPORT & LOGISTICS",
    videoSrc: "/3.mp4",
    coverImage: "/cargo-ship.jpg",
    activeColor: "bg-[#F4511E] text-white",
    inactiveColor: "bg-[#FFE2D6] text-[#13193A]",
  },
  {
    id: 4,
    number: "04",
    title: "DIGIPOLIS TECHNOLOGIES",
    videoSrc: "/4.mp4",
    coverImage: "/city-night.jpg",
    activeColor: "bg-[#D81B60] text-white",
    inactiveColor: "bg-[#FFD9CE] text-[#13193A]",
  },
  {
    id: 5,
    number: "05",
    title: "CELLDZYNE LIFE SCIENCE",
    videoSrc: "/5.mp4",
    coverImage: "/dna-cells.jpg",
    activeColor: "bg-[#F4511E] text-white",
    inactiveColor: "bg-[#FFE4DB] text-[#13193A]",
  },
];

export default function ExpertiseSection({
  isVisible,
  status,
}: ExpertiseSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const horizontalTrackRef =
    useRef<HTMLDivElement | null>(null);

  const videoRefs = useRef<{
    [key: number]: HTMLVideoElement | null;
  }>({});

  const videoWrapperRefs = useRef<{
    [key: number]: HTMLDivElement | null;
  }>({});

  const scrollTriggerRef =
    useRef<ScrollTrigger | null>(null);

  const [isRevealed, setIsRevealed] =
    useState(false);

  const [activeCardIndex, setActiveCardIndex] =
    useState(0);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(true);

  /*
   * --------------------------------------------------
   * SECTION VISIBILITY
   * --------------------------------------------------
   */

  useEffect(() => {
    if (
      isVisible !== undefined ||
      status !== undefined
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
          }
        },
        {
          threshold: 0.15,
        }
      );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, status]);

  const isCurrent =
    status !== undefined
      ? status === "current"
      : isVisible !== undefined
        ? isVisible
        : isRevealed;

  /*
   * --------------------------------------------------
   * HORIZONTAL SCROLL + VIDEO EFFECT
   * --------------------------------------------------
   */

  useEffect(() => {
    const section = sectionRef.current;
    const track = horizontalTrackRef.current;

    if (!section || !track) {
      return;
    }

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
      /*
       * ------------------------------------------------
       * HORIZONTAL DISTANCE
       * ------------------------------------------------
       */

      const getScrollAmount = () => {
        return Math.max(
          0,
          track.scrollWidth - window.innerWidth
        );
      };

      /*
       * ------------------------------------------------
       * ACTIVE CARD
       * ------------------------------------------------
       */

      const updateActiveCard = () => {
        const cards = gsap.utils.toArray('[data-expertise-card]');
        const centerX = window.innerWidth / 2;
        let newIndex = 0;

        cards.forEach((card: any, idx: number) => {
          const rect = card.getBoundingClientRect();
          if (rect.left <= centerX && rect.right >= centerX) {
            newIndex = idx;
          }
        });

        setActiveCardIndex((prev) => {
          if (prev !== newIndex) {
            setCanScrollLeft(newIndex > 0);
            setCanScrollRight(newIndex < EXPERTISE_CARDS.length - 1);
            return newIndex;
          }
          return prev;
        });
      };

      /*
       * ------------------------------------------------
       * INITIAL VIDEO STATE
       * ------------------------------------------------
       *
       * The video is zoomed and shifted slightly to the left.
       * As the card enters the viewport, the video shifts
       * opposite to card direction to create parallax depth.
       * ------------------------------------------------
       */

      EXPERTISE_CARDS.forEach((_, index) => {
        const video = videoRefs.current[index];
        const wrapper = videoWrapperRefs.current[index];

        if (video) {
          gsap.set(video, {
            xPercent: -13,
            yPercent: 4,
            scale: 1.38,
            transformOrigin: "center center",
          });
        }

        if (wrapper) {
          gsap.set(wrapper, {
            clipPath: "inset(0% 16% 0% 0%)",
          });
        }
      });

      /*
       * ------------------------------------------------
       * VIDEO MOVEMENT & PARALLAX
       * ------------------------------------------------
       *
       * The CARD moves horizontally to the LEFT:
       *        ← (card movement)
       *
       * At the same time, the VIDEO shifts to the RIGHT
       * inside its overflow container:
       *        → (video internal parallax)
       *
       * This creates a rich window / depth parallax effect.
       * ------------------------------------------------
       */

      const updateVideoMotion = () => {
        const viewportWidth = window.innerWidth;
        const panelWidth = Math.max(280, viewportWidth * 0.30); // Left fixed sidebar width

        EXPERTISE_CARDS.forEach((_, index) => {
          const card = track.querySelector<HTMLElement>(
            `[data-expertise-card="${index}"]`
          );

          const video = videoRefs.current[index];
          const wrapper = videoWrapperRefs.current[index];

          if (!card || !video || !wrapper) {
            return;
          }

          const rect = card.getBoundingClientRect();

          /*
           * Active Entrance & Reveal Window:
           * 0.0 = Card right edge just entering viewport (rect.left = viewportWidth)
           * 1.0 = Card reaches its active resting position at the left panel (rect.left = panelWidth)
           */
          const startX = viewportWidth;
          const endX = panelWidth;
          const totalDistance = startX - endX;

          let progress = (startX - rect.left) / totalDistance;
          progress = gsap.utils.clamp(0, 1, progress);

          /*
           * Easing for cinematic entrance curve.
           */
          const eased = gsap.parseEase("power2.out")(progress);

          /*
           * HIGH-IMPACT VIDEO REVEAL & PARALLAX:
           * 1. wrapper clipPath: Opens smoothly from inset(0% 16% 0% 0%) to inset(0% 0% 0% 0%),
           *    creating an architectural frame reveal as the card enters!
           * 2. video xPercent: Pans smoothly from -13% (shifted left) to +6.5% (shifted right).
           *    As card moves LEFT (←), video content pans RIGHT (→).
           * 3. video scale: Zooms smoothly down from 1.38 (entering zoom) to 1.15 (settled).
           * 4. video yPercent: Subtle vertical stabilization from +4% to 0%.
           */
          const clipRight = gsap.utils.interpolate(16, 0, eased);
          const xPercent = gsap.utils.interpolate(-13, 6.5, eased);
          const yPercent = gsap.utils.interpolate(4, 0, eased);
          const scale = gsap.utils.interpolate(1.38, 1.15, eased);

          gsap.set(wrapper, {
            clipPath: `inset(0% ${clipRight}% 0% 0%)`,
          });

          gsap.set(video, {
            xPercent,
            yPercent,
            scale,
            transformOrigin: "center center",
          });
        });
      };

      /*
       * Run immediately.
       */

      updateVideoMotion();

      /*
       * ------------------------------------------------
       * MAIN HORIZONTAL SCROLL
       * ------------------------------------------------
       */

      const horizontalTween =
        gsap.to(track, {
          x: () =>
            -getScrollAmount(),

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: () =>
              `+=${getScrollAmount() * 0.9}`,

            pin: true,

            scrub: 1,

            invalidateOnRefresh: true,

            /*
             * This runs continuously while the
             * vertical page scroll is converted
             * into horizontal movement.
             */

            onUpdate: (self) => {
              updateActiveCard();
              updateVideoMotion();
            },

            onEnter: () => {
              updateActiveCard();
              updateVideoMotion();
            },

            onEnterBack: () => {
              updateVideoMotion();
            },

            onLeave: () => {
              updateVideoMotion();
            },

            onLeaveBack: () => {
              updateActiveCard();
              updateVideoMotion();
            },
          },
        });

      scrollTriggerRef.current =
        horizontalTween.scrollTrigger ??
        null;

      /*
       * ------------------------------------------------
       * RESIZE
       * ------------------------------------------------
       */

      const handleResize = () => {
        ScrollTrigger.refresh();
        updateVideoMotion();
      };

      window.addEventListener(
        "resize",
        handleResize
      );

      return () => {
        window.removeEventListener(
          "resize",
          handleResize
        );

        scrollTriggerRef.current = null;
      };
      }); // end mm.add

      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray('[data-expertise-card]');
        cards.forEach((card: any, idx: number) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) {
                setActiveCardIndex(idx);
              }
            }
          });
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * --------------------------------------------------
   * VIDEO PLAYBACK
   * --------------------------------------------------
   *
   * Videos close to the viewport are allowed to play.
   *
   * This is important for the reference effect:
   *
   * horizontal card movement
   * +
   * video frame movement
   * +
   * continuous playback
   * --------------------------------------------------
   */

  useEffect(() => {
    const updatePlayback = () => {
      const viewportWidth =
        window.innerWidth;

      Object.entries(
        videoRefs.current
      ).forEach(
        ([indexString, video]) => {
          if (!video) {
            return;
          }

          const index =
            Number(indexString);

          const wrapper =
            videoWrapperRefs.current[index];

          if (!wrapper) {
            return;
          }

          const rect =
            wrapper.getBoundingClientRect();

          const isNearViewport =
            rect.right > -400 &&
            rect.left <
            viewportWidth + 400;

          if (
            isCurrent &&
            isNearViewport
          ) {
            if (video.paused) {
              video
                .play()
                .catch(() => { });
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        }
      );
    };

    updatePlayback();

    const timer =
      window.setInterval(
        updatePlayback,
        200
      );

    return () => {
      window.clearInterval(timer);
    };
  }, [
    isCurrent,
    activeCardIndex,
  ]);

  /*
   * --------------------------------------------------
   * SCROLL TO CARD
   * --------------------------------------------------
   */

  const scrollToCard =
    useCallback(
      (index: number) => {
        const section =
          sectionRef.current;

        const trigger =
          scrollTriggerRef.current;

        if (
          !section ||
          !trigger
        ) {
          return;
        }

        const maxIndex =
          EXPERTISE_CARDS.length - 1;

        const safeIndex =
          Math.min(
            maxIndex,
            Math.max(0, index)
          );

        const progress =
          maxIndex === 0
            ? 0
            : safeIndex / maxIndex;

        const targetY =
          trigger.start +
          (trigger.end -
            trigger.start) *
          progress;

        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      },
      []
    );

  /*
   * --------------------------------------------------
   * UI
   * --------------------------------------------------
   */

  return (
    <section
      ref={sectionRef}
      className="relative w-full md:h-screen min-h-[580px] flex flex-col justify-center bg-white text-zinc-900 z-10 overflow-hidden select-none"
    >
      <style>{`
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

        .animate-parallax-badge {
          animation:
            parallaxHeader
            1500ms
            cubic-bezier(0.22, 1, 0.36, 1)
            120ms
            both;
        }

        .animate-parallax-title {
          animation:
            parallaxHeader
            1600ms
            cubic-bezier(0.22, 1, 0.36, 1)
            240ms
            both;
        }

        .animate-parallax-desc {
          animation:
            parallaxHeader
            1700ms
            cubic-bezier(0.22, 1, 0.36, 1)
            360ms
            both;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ------------------------------------------------
          BACKGROUND GRID
      ------------------------------------------------ */}

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


      {/* ------------------------------------------------
          MAIN CONTENT
      ------------------------------------------------ */}

      <div className="relative z-20 w-full h-full md:overflow-hidden flex flex-col md:block">

        {/* ------------------------------------------------
            HORIZONTAL CARD TRACK
        ------------------------------------------------ */}

        <div
          ref={horizontalTrackRef}
          className="md:absolute left-0 md:top-0 h-auto md:h-full flex flex-col md:flex-row items-stretch"
        >
          <div className="w-full md:w-[100vw] shrink-0 h-auto md:h-full relative z-30">
            <MissionVisionSection />
          </div>

          <div className="w-full md:w-[50vw] md:min-w-[340px] sm:min-w-[440px] lg:min-w-[520px] xl:min-w-[560px] shrink-0 h-auto md:h-full flex flex-col justify-center items-center px-6 sm:px-10 md:px-16 lg:px-20 py-12 md:py-0 bg-white z-30 relative border-r border-zinc-100 shadow-[10px_0_30px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col items-start w-full max-w-sm xl:max-w-md">
              <div
                className={
                  isCurrent
                    ? "animate-parallax-badge"
                    : "opacity-0"
                }
              >
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#FF3366] uppercase mb-2 sm:mb-3 block">
                  OUR EXPERTISE
                </span>
              </div>

              <div
                className={
                  isCurrent
                    ? "animate-parallax-title"
                    : "opacity-0"
                }
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-semibold text-[#13193A] tracking-tight uppercase leading-tight mb-4 sm:mb-6">
                  <LetterReveal
                    text="LATEST PROJECTS"
                    isVisible={isCurrent}
                    direction="top-to-bottom"
                    delay={150}
                    stagger={24}
                    duration={750}
                  />
                </h2>
              </div>

              <div
                className={
                  isCurrent
                    ? "animate-parallax-desc"
                    : "opacity-0"
                }
              >
                <p className="text-sm sm:text-base md:text-lg text-zinc-600 font-normal leading-relaxed select-text">
                  Stay updated with industry
                  trends, project highlights,
                  and expert perspectives from
                  our team.
                </p>
              </div>
            </div>
          </div>

          {EXPERTISE_CARDS.map(
            (card, idx) => {
              const isActive =
                activeCardIndex === idx;

              return (
                <div
                  key={card.id}
                  data-expertise-card={idx}
                  className="w-full md:w-[50vw] md:min-w-[340px] sm:min-w-[440px] lg:min-w-[520px] xl:min-w-[560px] h-[450px] sm:h-[500px] md:h-full flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-zinc-200/80 transition-all"
                >

                  {/* ------------------------------------------------
                      VIDEO AREA
                  ------------------------------------------------ */}

                  <div
                    ref={(el) => {
                      videoWrapperRefs.current[
                        idx
                      ] = el;
                    }}
                    className="relative w-full h-[58%] sm:h-[60%] bg-black overflow-hidden group"
                  >


                    <video
                      ref={(el) => {
                        videoRefs.current[
                          idx
                        ] = el;
                      }}
                      src={card.videoSrc}
                      poster={card.coverImage}
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
                    />


                    <div className="absolute inset-0 pointer-events-none -z-10">
                      <Image
                        src={card.coverImage}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover object-center brightness-95"
                      />
                    </div>
                  </div>

                  {/* ------------------------------------------------
                      CARD TEXT
                  ------------------------------------------------ */}

                  <div
                    className={`w-full h-[42%] sm:h-[40%] px-6 sm:px-8 lg:px-10 py-5 sm:py-6 flex flex-col justify-center space-y-2 transition-colors duration-700 shadow-md ${isActive
                        ? card.activeColor
                        : card.inactiveColor
                      }`}
                  >
                    <span
                      className={`text-xs sm:text-sm font-bold tracking-widest ${isActive
                          ? "text-white/90"
                          : "text-zinc-600"
                        }`}
                    >
                      {card.number}
                    </span>

                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-[30px] xl:text-[34px] font-black uppercase tracking-tight leading-[1.2] ${isActive
                          ? "text-white"
                          : "text-zinc-800"
                        }`}
                    >
                      {card.title}
                    </h3>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

    </section>
  );
}