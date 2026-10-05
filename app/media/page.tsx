"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import LetterReveal from "../components/LetterReveal";
import FooterSection from "../components/FooterSection";
import { fetchfromCMS } from "../components/api";

export default function MediaPage() {
  const [isInitialRevealed, setIsInitialRevealed] = useState(false);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [ytUrl, setytUrl] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialRevealed(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadGalleryImages = async () => {
      const data = await fetchfromCMS('media');
      console.log("Fetched data from CMS:", data);
      if (data?.docs) {
        setGalleryImages(data.docs);
      }
    };
    loadGalleryImages();
  }, []);


  useEffect(() => {

    const loadYtURL = async () => {
      const data = await fetchfromCMS('YTlinks');
      console.log("Fetched data from Links:", data);
      if (data?.docs) {
        setytUrl(data.docs)
      }
    }
    loadYtURL();
  }, [])
  return (
    <main className="min-h-screen w-full bg-white text-zinc-900 selection:bg-[#E64A38]/20 selection:text-[#E64A38] font-sans relative overflow-hidden">
      <Navbar />

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

      <div className="relative z-10 w-full pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 flex flex-col items-center">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-zinc-900 tracking-tight leading-none mb-3">
            <LetterReveal
              text="MEDIA"
              isVisible={isInitialRevealed}
              direction="top-to-bottom"
              delay={100}
              stagger={32}
              duration={750}
            />
          </h1>
          <Reveal isVisible={isInitialRevealed} direction="down" duration={900} delay={300}>
            <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed max-w-xl">
              Explore our latest updates, project walkthroughs, and highlights.
            </p>
          </Reveal>
        </div>

        <Reveal isVisible={isInitialRevealed} direction="up" duration={900} delay={400} className="w-full">
          <div className="w-full pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 pr-4">
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {ytUrl.map((media: any) => {
                let thumbnailUrl = media.thumbnail;
                
                if (thumbnailUrl && typeof thumbnailUrl === 'object' && thumbnailUrl.url) {
                  thumbnailUrl = thumbnailUrl.url;
                }

                if (thumbnailUrl && typeof thumbnailUrl === 'string' && !thumbnailUrl.startsWith('http')) {
                  thumbnailUrl = `${process.env.NEXT_PUBLIC_CMS_URL || ''}${thumbnailUrl}`;
                }

                return (
                  <div key={media.id} className="snap-center shrink-0 w-[280px] sm:w-[320px] md:w-[400px] flex flex-col gap-3 group cursor-pointer">
                    <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img
                        src={thumbnailUrl}
                        alt={media.title || "Media thumbnail"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-[#E64A38] shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl text-zinc-900 group-hover:text-[#E64A38] transition-colors">
                      {media.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal isVisible={isInitialRevealed} direction="up" duration={900} delay={500} className="w-full mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-zinc-900 tracking-tight mb-8">
              Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {galleryImages.map((img) => {
                const isPayloadImage = img.url !== undefined;
                let imageUrl = img.src || img.url;

                if (isPayloadImage && imageUrl && !imageUrl.startsWith('http')) {
                  imageUrl = `${process.env.NEXT_PUBLIC_CMS_URL}${imageUrl}`;
                }

                return (
                  <div key={img.id} className="w-full aspect-square overflow-hidden rounded-xl sm:rounded-2xl shadow-md group cursor-pointer">
                    <img
                      src={imageUrl}
                      alt={img.alt || "Gallery image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      <FooterSection />
    </main>
  );
}
