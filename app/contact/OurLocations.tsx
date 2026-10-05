"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "../components/Reveal";
import LetterReveal from "../components/LetterReveal";
import { fetchfromCMS } from "../components/api";

interface OurLocationsProps {
  isVisible?: boolean;
}

interface LocationData {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
    alt?: string;
  };
}

export default function OurLocations({ isVisible: forcedVisible }: OurLocationsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [location, setLocation] = useState<LocationData[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeVisible = forcedVisible !== undefined ? forcedVisible : isRevealed;

  useEffect(() => {
    const loadlocation = async () => {
      const data = await fetchfromCMS("locations")
      console.log("fetched location", data);
      if (data?.docs) {
        setLocation(data.docs);
      }
      else {
        console.log("failed to fetch locations")
      }



    }
    loadlocation();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-900 overflow-hidden select-none pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-24 border-t border-zinc-100"
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

      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center">

        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold uppercase text-zinc-900 tracking-tight leading-tight">
            <LetterReveal
              text="OUR LOCATION"
              isVisible={activeVisible}
              direction="top-to-bottom"
              delay={100}
              stagger={30}
              duration={800}
            />
          </h2>
        </div>

        <div className="w-full flex flex-col gap-5 sm:gap-6 lg:gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-6">
            {location && location.length > 0 ? (
              location.map((loc, index) => {
                const isFullWidth = index % 3 === 2;
                const formattedUrl = loc.image?.url?.replace('/api/media/file/', '/media/');
                const imageUrl = formattedUrl
                  ? formattedUrl.startsWith("http")
                    ? formattedUrl
                    : `${process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3000"}${formattedUrl}`
                  : "";

                return (
                  <Reveal
                    key={loc.id || index}
                    isVisible={activeVisible}
                    direction="up"
                    duration={isFullWidth ? 900 : 850}
                    delay={200 + index * 100}
                    className={`w-full ${isFullWidth ? "md:col-span-2" : "h-full"}`}
                  >
                    <div
                      className={`relative w-full rounded-3xl overflow-hidden shadow-xl group border border-zinc-200/60 transition-all duration-300 hover:shadow-2xl ${isFullWidth
                          ? "h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px]"
                          : "h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px]"
                        }`}
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={loc.image?.alt || loc.title}
                          fill
                          sizes={isFullWidth ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                          className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-200" />
                      )}

                      <div
                        className={`absolute inset-x-0 bottom-0 ${isFullWidth ? "pt-28" : "pt-24"
                          } pb-6 sm:pb-8 px-6 sm:px-8 bg-gradient-to-t from-white via-white/80 to-transparent flex flex-col justify-end`}
                      >
                        <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-slate-900 tracking-wider mb-1 leading-tight">
                          {loc.title}
                        </h3>
                        <p
                          className={`text-xs sm:text-[13.5px] text-slate-700 font-light leading-relaxed ${isFullWidth ? "max-w-xl" : "max-w-md"
                            }`}
                        >
                          {loc.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })
            ) : (
              <p className="text-zinc-500 text-center w-full col-span-full">
                Loading locations...
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
