"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import LetterReveal from "../components/LetterReveal";
import WhatWeDo from "./WhatWeDo";
import WhatUniq from "./WhatUniq";
import AboutFounder from "./AboutFounder";
import ClientsSection from "../components/ClientsSection";
import FooterSection from "../components/FooterSection";
import ParallaxMedia from "../components/ParallaxMedia";
import Link from "next/link";

export default function AboutPage() {
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="min-h-screen w-full bg-white text-zinc-900 selection:bg-[#E64A38]/20 selection:text-[#E64A38] font-sans">
      <Navbar />
      <section className="relative w-full h-screen overflow-hidden select-none bg-[#0e141b]">
        <ParallaxMedia className="absolute inset-0" speed={0.05}>
          <video
            src="/about-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </ParallaxMedia>
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 pt-28 sm:pt-32 pb-10 sm:pb-14 pointer-events-none">
          <div className="my-auto pt-8 flex flex-col items-center text-center pointer-events-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-black text-white tracking-tight leading-[1.2] pb-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <LetterReveal
                text="Building Sustainable Businesses Across Engineering, Property Development, Logistics, Technology & Life Sciences."
                isVisible={isTextVisible}
                direction="top-to-bottom"
                delay={200}
                stagger={15}
                duration={600}
              />
            </h1>

            <Reveal isVisible={isTextVisible} direction="down" duration={800} delay={2200}>
              <Link
                href="/service"
                className="mt-8 md:mt-10 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#F97316] to-[#E34D25] hover:brightness-110 px-8 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
              >
                EXPLORE OUR BUSINESS
              </Link>
            </Reveal>
          </div>


          <div className="self-end max-w-lg md:max-w-xl text-left md:text-right">
            <Reveal isVisible={isTextVisible} direction="down" duration={900} delay={500}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100/95 font-light md:font-normal leading-relaxed md:leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                Operating across India, Singapore, Maldives,{" "}
                <span className="hidden md:inline"><br /></span>
                Malaysia and UAE since 2010{" "}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="relative z-10 w-full bg-white border-t border-zinc-100">
        <WhatWeDo />
      </section>
      <section className="relative z-10 w-full bg-white border-t border-zinc-100">
        <WhatUniq />
      </section>
      <section className="relative z-10 w-full bg-white border-t border-zinc-100">
        <AboutFounder />
      </section> 

      {/* ========================================================================= */}
      {/* SECTION 5: CLIENTS & PARTNERS LOGO SECTION                                */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full bg-white">
        <ClientsSection standalone={true} />
      </section>
 
      {/* ========================================================================= */}
      {/* SECTION 6: FOOTER SECTION                                                 */}
      {/* ========================================================================= */}
      <FooterSection />
    </main>
  );
}