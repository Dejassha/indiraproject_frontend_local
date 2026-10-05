"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_ITEMS = [
  {
    year: "1998",
    title: "OUR STORY",
    description:
      "Stay updated with industry trends, project highlights, and expert perspectives from our team.",
  },
  {
    year: "2004",
    title: "OUR STORY",
    description:
      "Stay updated with industry trends, project highlights, and expert perspectives from our team.",
  },
  {
    year: "2010",
    title: "OUR STORY",
    description:
      "Stay updated with industry trends, project highlights, and expert perspectives from our team.",
  },
  {
    year: "2016",
    title: "OUR STORY",
    description:
      "Stay updated with industry trends, project highlights, and expert perspectives from our team.",
  },
  {
    year: "2025",
    title: "OUR STORY",
    description:
      "Stay updated with industry trends, project highlights, and expert perspectives from our team.",
  },
];

function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const line = lineRef.current;

    if (!section || !track || !line) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* =====================================================
         DESKTOP HORIZONTAL SCROLL & PINNING
      ===================================================== */

      mm.add("(min-width: 768px)", () => {
        /*
         * Calculate required horizontal scroll distance.
         *
         * Distance = track.scrollWidth - window.innerWidth
         *
         * This guarantees the horizontal track travels completely through
         * 1998 -> 2004 -> 2010 -> 2016 -> 2025 before the ScrollTrigger pin releases.
         */
        const getScrollAmount = () => {
          return track ? Math.max(0, track.scrollWidth - window.innerWidth) : 0;
        };

        /*
         * Total vertical scroll distance required for pinning.
         * Adds a comfortable scroll buffer beyond horizontal travel distance
         * so the animation runs smoothly and gives the user time to view the
         * fully completed timeline before releasing the pin to the next section.
         */
        const getTotalScrollDistance = () => {
          return getScrollAmount() + window.innerHeight * 0.75;
        };

        /* ===================================================
           SVG LINE SETUP
        =================================================== */

        const lineLength = line.getTotalLength();

        gsap.set(line, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });

        /* ===================================================
           MAIN HORIZONTAL SCROLLTRIGGER & PINNING
        =================================================== */

        const horizontalTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getTotalScrollDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        const lineAnimDuration = 0.77;
        const lineAnimStart = 0.05;

        /*
         * Timeline Sequence:
         * 1. [0.00 - 0.05]: Initial settling hold so 1998 is established.
         * 2. [0.05 - 0.82]: Smooth horizontal movement across all years and complete SVG line drawing.
         * 3. [0.82 - 1.00]: Completion hold buffer - the timeline is 100% completed and stays pinned
         *    on screen so the user can absorb the final state (2025) before page scrolls to next section.
         */
        horizontalTimeline
          .to(
            track,
            {
              x: () => -getScrollAmount(),
              ease: "none",
              duration: lineAnimDuration,
            },
            lineAnimStart
          )
          .to(
            line,
            {
              strokeDashoffset: 0,
              ease: "none",
              duration: lineAnimDuration,
            },
            lineAnimStart
          )
          .to({}, { duration: 0.18 });

        /* ===================================================
           MILESTONE CONTENT REVEAL ON LINE TOUCH
        =================================================== */

        // Exact distance along SVG path where X coordinate matches target
        const getLengthAtX = (targetX: number) => {
          if (targetX <= 0) return 0;
          let low = 0;
          let high = lineLength;
          for (let i = 0; i < 28; i++) {
            const mid = (low + high) / 2;
            const pt = line.getPointAtLength(mid);
            if (pt.x < targetX) {
              low = mid;
            } else {
              high = mid;
            }
          }
          return (low + high) / 2;
        };

        const milestones = [
          { year: "2004", x: 460, offsetY: 10 },
          { year: "2010", x: 920, offsetY: 2 },
          { year: "2016", x: 1380, offsetY: 32 },
          { year: "2025", x: 1840, offsetY: 8 },
        ];

        milestones.forEach(({ year, x, offsetY }) => {
          const lineEl = track.querySelector(`[data-timeline-line="${year}"]`);
          const contentEl = track.querySelector(
            `[data-timeline-content="${year}"]`
          );
          const dot = track.querySelector(`[data-timeline-dot="${year}"]`);
          if (!lineEl || !contentEl) return;

          const distance = getLengthAtX(x);
          const touchTime =
            lineAnimStart + (distance / lineLength) * lineAnimDuration;

          const finalHeight = 195 + offsetY;

          // 1. Line shoots upwards from dot
          horizontalTimeline.fromTo(
            lineEl,
            { height: "0px" },
            {
              height: `${finalHeight}px`,
              duration: 0.025,
              ease: "power1.out",
            },
            touchTime
          );

          // 2. Content reveals right after line shoots up
          horizontalTimeline.fromTo(
            contentEl,
            {
              opacity: 0,
              x: 12,
              pointerEvents: "none",
            },
            {
              opacity: 1,
              x: 0,
              pointerEvents: "auto",
              duration: 0.025,
              ease: "power2.out",
            },
            touchTime + 0.015
          );

          // 3. Subtle pulse on dot when line touches it
          if (dot) {
            horizontalTimeline.fromTo(
              dot,
              { scale: 1 },
              {
                scale: 1.35,
                duration: 0.015,
                yoyo: true,
                repeat: 1,
                ease: "power1.out",
              },
              touchTime
            );
          }
        });

        const handleResize = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        const refreshTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 500);

        return () => {
          clearTimeout(refreshTimer);
          window.removeEventListener("resize", handleResize);
        };
      });

      /* =====================================================
         MOBILE VERTICAL SCROLL
      ===================================================== */

      mm.add("(max-width: 767px)", () => {
        gsap.set(track, {
          x: 0,
        });

        gsap.set(line, {
          clearProps: "all",
        });

        gsap.set("[data-timeline-line]", {
          clearProps: "all",
        });

        gsap.set("[data-timeline-content]", {
          clearProps: "all",
        });

        gsap.set("[data-timeline-dot]", {
          clearProps: "all",
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-10
        w-full
        min-h-screen
        md:h-screen
        flex
        flex-col
        justify-center
        overflow-hidden
        bg-white
      "
    >
      {/* =====================================================
          FIXED DESKTOP HEADER (STAYS FIXED IN VIEWPORT)
      ===================================================== */}

      <div
        className="
          hidden
          md:block
          absolute
          top-[20px] md:top-[26px] lg:top-[32px]
          left-1/2
          -translate-x-1/2
          z-30
          text-center
          w-full
          max-w-[1000px]
          px-4
          pointer-events-none
        "
      >
        <p
          className="
            text-xs sm:text-sm md:text-base
            font-bold
            tracking-[0.25em]
            text-[#E51B63]
            uppercase
            mb-2 sm:mb-3
          "
        >
          OUR STORY
        </p>

        <h2
          className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[82px]
            font-semibold
            tracking-[-0.04em]
            leading-[0.95]
            text-[#171447]
          "
        >
          INDIRA GROUP OF COMPANIES
        </h2>
      </div>

      {/* =====================================================
          DESKTOP TIMELINE
      ===================================================== */}

      <div
        ref={trackRef}
        className="
          hidden
          md:flex
          flex-none
          shrink-0
          relative
          h-full
          min-h-screen
          w-[285vw]
          min-w-[285vw]
          items-center
        "
      >
        <div className="relative h-full w-full">

          {/* =================================================
              BACKGROUND
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-[#FFFDFC]
              via-[#FFE7DC]
              to-[#F7B3A7]
            "
          />

          {/* =================================================
              VERTICAL GRID
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              pointer-events-none
              opacity-40
            "
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px)",
              backgroundSize: "7vw 100%",
            }}
          />

          {/* =================================================
              CURVED TIMELINE (Wavy Zig-Zag Path)
          ================================================= */}

          <svg
            className="
              absolute
              left-[50vw]
              top-[76%]
              h-[120px]
              w-[220vw]
              -translate-y-1/2
              overflow-hidden
              pointer-events-none
            "
            viewBox="0 0 2200 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="timelineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#E51B63" />
                <stop offset="12%" stopColor="#E51B63" />
                <stop offset="21%" stopColor="#F05A24" />
                <stop offset="32%" stopColor="#F05A24" />
                <stop offset="42%" stopColor="#E51B63" />
                <stop offset="52%" stopColor="#E51B63" />
                <stop offset="63%" stopColor="#F05A24" />
                <stop offset="73%" stopColor="#F05A24" />
                <stop offset="84%" stopColor="#E51B63" />
                <stop offset="100%" stopColor="#E51B63" />
              </linearGradient>
            </defs>

            {/* Background timeline */}
            <path
              d="
                M 0 94
                C 60 94, 90 92, 120 78
                C 150 64, 250 64, 360 64
                C 400 64, 430 68, 460 70
                C 530 70, 610 38, 690 38
                C 770 38, 850 56, 920 62
                C 970 68, 1040 46, 1120 46
                C 1220 46, 1300 92, 1380 92
                C 1460 92, 1540 52, 1620 52
                C 1710 52, 1780 64, 1840 68
                C 1920 72, 2060 74, 2200 74
              "
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Animated timeline */}
            <path
              ref={lineRef}
              d="
                M 0 94
                C 60 94, 90 92, 120 78
                C 150 64, 250 64, 360 64
                C 400 64, 430 68, 460 70
                C 530 70, 610 38, 690 38
                C 770 38, 850 56, 920 62
                C 970 68, 1040 46, 1120 46
                C 1220 46, 1300 92, 1380 92
                C 1460 92, 1540 52, 1620 52
                C 1710 52, 1780 64, 1840 68
                C 1920 72, 2060 74, 2200 74
              "
              stroke="url(#timelineGradient)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* =================================================
              1998
          ================================================= */}

          <TimelineItem
            year="1998"
            left="50vw"
            color="#E51B63"
            offsetY={34}
          />

          {/* =================================================
              2004
          ================================================= */}

          <TimelineItem
            year="2004"
            left="96vw"
            color="#F05A24"
            offsetY={10}
          />

          {/* =================================================
              2010
          ================================================= */}

          <TimelineItem
            year="2010"
            left="142vw"
            color="#E51B63"
            offsetY={2}
          />

          {/* =================================================
              2016
          ================================================= */}

          <TimelineItem
            year="2016"
            left="188vw"
            color="#F05A24"
            offsetY={32}
          />

          {/* =================================================
              2025
          ================================================= */}

          <TimelineItem
            year="2025"
            left="234vw"
            color="#E51B63"
            offsetY={8}
          />

        </div>
      </div>

      {/* =====================================================
          MOBILE TIMELINE
      ===================================================== */}

      <div
        className="
          block
          bg-gradient-to-b
          from-[#FFFDFC]
          via-[#FFE7DC]
          to-[#F7B3A7]
          px-6
          py-20
          md:hidden
        "
      >

        <div className="mb-14 sm:mb-16 text-center px-4">
          <p
            className="
              mb-2 sm:mb-3
              text-xs sm:text-sm
              font-bold
              tracking-[0.25em]
              text-[#E51B63]
              uppercase
            "
          >
            OUR STORY
          </p>

          <h2
            className="
              text-3xl sm:text-4xl md:text-5xl
              font-semibold
              tracking-[-0.04em]
              leading-[1.02]
              text-[#171447]
            "
          >
            INDIRA GROUP OF COMPANIES
          </h2>
        </div>


        <div
          className="
            relative
            ml-5
            border-l
            border-[#E45A4A]/40
            pl-8
          "
        >
          {TIMELINE_ITEMS.map((item, index) => (
            <div
              key={item.year}
              className="
                relative
                mb-14
                last:mb-0
              "
            >

              <div
                className="
                  absolute
                  -left-[41px]
                  top-1
                  h-4
                  w-4
                  rounded-full
                  border-[3px]
                  border-white
                "
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? "#E51B63"
                      : "#F05A24",
                }}
              />


              <p
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                "
                style={{
                  color: index % 2 === 0 ? "#E51B63" : "#F05A24",
                }}
              >
                {item.year}
              </p>


              <h3
                className="
                  mt-1.5
                  text-xs sm:text-sm
                  font-bold
                  tracking-[0.2em]
                  text-[#171447]
                  uppercase
                "
              >
                {item.title}
              </h3>


              <p
                className="
                  mt-2
                  max-w-[320px]
                  text-sm sm:text-base
                  leading-[1.6]
                  text-gray-600
                "
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          WHITE BOTTOM GRADIENT
      ===================================================== */}
      <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />
    </section>
  );
}

export default React.memo(Timeline);

/* =========================================================
   DESKTOP TIMELINE ITEM
========================================================= */

interface TimelineItemProps {
  year: string;
  left: string;
  color: string;
  offsetY?: number;
}

function TimelineItem({
  year,
  left,
  color,
  offsetY = 0,
}: TimelineItemProps) {
  const isInitial = year === "1998";
  const lineHeight = 195 + offsetY;

  return (
    <div
      className="
        absolute
        top-[76%]
        w-[320px] sm:w-[360px] md:w-[400px]
        -translate-y-1/2
      "
      style={{
        left,
      }}
    >
      {/* =================================================
          DOT (Dead center on the wavy curve)
      ================================================= */}

      <div
        data-timeline-dot={year}
        className="
          absolute
          left-0
          z-20
          h-[14px]
          w-[14px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border-2
          border-white
          shadow-md
        "
        style={{
          top: `calc(50% + ${offsetY}px)`,
          backgroundColor: color,
        }}
      />

      {/* =================================================
          VERTICAL LINE (Draws / shoots upwards from dot)
      ================================================= */}

      <div
        data-timeline-line={year}
        className="
          absolute
          left-0
          w-[4px]
          -translate-x-1/2
          overflow-hidden
          pointer-events-none
          z-10
        "
        style={{
          bottom: `calc(50% - ${offsetY}px)`,
          height: isInitial ? `${lineHeight}px` : "0px",
        }}
      >
        <div
          className="absolute bottom-0 left-0 w-full flex flex-col items-center"
          style={{ height: `${lineHeight}px` }}
        >
          {/* Top solid colored accent bar beside Year */}
          <div
            className="w-[3.5px] h-[34px] rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          {/* Dashed line extending down to the dot */}
          <div className="w-[1.5px] flex-1 border-l-2 border-dashed border-white/85 mt-2" />
        </div>
      </div>

      {/* =================================================
          MILESTONE CONTENT (Reveals after line shoots up)
      ================================================= */}

      <div
        data-timeline-content={year}
        className="
          absolute
          left-[16px]
          flex
          flex-col
          justify-start
          w-[320px] sm:w-[360px] md:w-[400px]
        "
        style={{
          bottom: `calc(50% - ${offsetY}px)`,
          height: `${lineHeight}px`,
          opacity: isInitial ? 1 : 0,
          transform: isInitial ? "none" : "translateX(10px)",
          pointerEvents: isInitial ? "auto" : "none",
        }}
      >
        {/* YEAR */}
        <p
          className="
            text-3xl sm:text-4xl
            font-extrabold
            leading-none
            tracking-tight
          "
          style={{
            color,
          }}
        >
          {year}
        </p>

        {/* SUBTITLE */}
        <p
          className="
            mt-2.5
            text-xs sm:text-sm
            font-bold
            tracking-[0.2em]
            text-[#171447]
            uppercase
          "
        >
          OUR STORY
        </p>

        {/* DESCRIPTION (Matching WhatWeDo paragraph font size) */}
        <p
          className="
            mt-2.5
            max-w-[340px] sm:max-w-[380px]
            text-base sm:text-lg
            leading-[1.55]
            text-white/95
            drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]
          "
        >
          Stay updated with industry trends, project highlights,
          and expert perspectives from our team.
        </p>
      </div>
    </div>
  );
}