import React from "react";
import Navbar from "../components/Navbar";
import ServiceOverview from "./ServiceOverview";
import EpcMaldivesSection from "./EpcMaldivesSection";
import WeListenSection from "./WeListenSection";
import FooterSection from "../components/FooterSection";

export default function ServicePage() {

  return (
    <main className="relative min-h-screen w-full bg-white text-zinc-900 selection:bg-[#E64A38]/20 selection:text-[#E64A38] overflow-x-hidden font-sans">
      <Navbar />

      <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center select-none">
        <video
          src="/IndiraPropertyDevelopmentPageVideoUpdated.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none z-10" />
      </section>

      <section className="relative z-10 w-full bg-white">
        <ServiceOverview />
      </section>

      <section className="relative z-10 w-full bg-white">
        <EpcMaldivesSection />
      </section>

      <section className="relative z-10 w-full bg-white">
        <WeListenSection />
      </section>

      <FooterSection />
    </main>
  );
}
