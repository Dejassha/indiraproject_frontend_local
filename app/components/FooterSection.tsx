"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LetterReveal from "./LetterReveal";

interface FooterSectionProps {
  isVisible?: boolean;
  status?: "current" | "past" | "future";
  onPrev?: () => void;
}

export default function FooterSection({
  isVisible,
  status,
  onPrev,
}: FooterSectionProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const smokeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isVisible !== undefined) return;
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
  }, [isVisible]);

  useEffect(() => {
    const canvas = smokeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let isRunning = true;

    interface WaveLayer {
      y: number;
      speedY: number;
      speedX: number;
      amp1: number;
      amp2: number;
      freq1: number;
      freq2: number;
      phase: number;
      topColor: string;
      midColor: string;
      deepColor: string;
      bottomColor: string;
      alpha: number;
    }

    let waves: WaveLayer[] = [];

    const initWaves = () => {
      waves = [
        {
          y: height * 0.6,
          speedY: 0.9,
          speedX: 0.0018,
          amp1: 65,
          amp2: 35,
          freq1: 0.0018,
          freq2: 0.0032,
          phase: 0,
          topColor: "rgba(25, 65, 110, 0.92)",
          midColor: "rgba(16, 42, 75, 0.95)",
          deepColor: "rgba(11, 28, 52, 0.96)",
          bottomColor: "rgba(7, 19, 32, 0.98)",
          alpha: 0.92,
        },
      ];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initWaves();
    };

    resize();
    window.addEventListener("resize", resize);

    const render = (time: number) => {
      if (!isRunning) return;
      animId = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < waves.length; i++) {
        const w = waves[i];

        w.y -= w.speedY;

        if (w.y < -140) {
          w.y = height + 100;
        }

        ctx.save();
        ctx.globalAlpha = w.alpha;

        ctx.beginPath();
        const step = 8;
        const startY =
          w.y +
          Math.sin(0 * w.freq1 + time * w.speedX) * w.amp1 +
          Math.cos(0 * w.freq2 - time * w.speedX * 0.8 + w.phase) * w.amp2;
        ctx.moveTo(0, startY);

        for (let x = step; x <= width + step; x += step) {
          const waveY =
            w.y +
            Math.sin(x * w.freq1 + time * w.speedX) * w.amp1 +
            Math.cos(x * w.freq2 - time * w.speedX * 0.8 + w.phase) * w.amp2;
          ctx.lineTo(x, waveY);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, w.y - w.amp1, 0, Math.min(height, w.y + 360));
        grad.addColorStop(0, w.topColor);
        grad.addColorStop(0.25, w.midColor);
        grad.addColorStop(0.65, w.deepColor);
        grad.addColorStop(1, w.bottomColor);

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!isRunning) {
          isRunning = true;
          animId = requestAnimationFrame(render);
        }
      } else {
        isRunning = false;
        cancelAnimationFrame(animId);
      }
    });

    observer.observe(canvas);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  const activeVisible = isVisible !== undefined ? isVisible : isRevealed;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const isSliderMode = isVisible !== undefined || status !== undefined;
  const isCurrent = status !== undefined ? status === "current" : (isVisible ?? false);
  const isPast = status === "past";

  const sliderPositionClass = isCurrent
    ? "translate-y-0 opacity-100 shadow-2xl pointer-events-auto z-30"
    : isPast
      ? "-translate-y-full opacity-0 pointer-events-none z-20"
      : "translate-y-full opacity-0 pointer-events-none z-10";

  const containerPositionClass = isSliderMode
    ? `absolute inset-0 w-full h-full transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${sliderPositionClass}`
    : "relative w-full min-h-screen z-10 pointer-events-auto";

  return (
    <section
      ref={sectionRef}
      className={`${containerPositionClass} overflow-hidden select-none flex flex-col justify-between bg-[#071320]`}
    >
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <Image
          src="/footer-bg.png"
          alt="Footer Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none select-none footer-bg-animated"
        />

        <div className="absolute inset-0 pointer-events-none select-none footer-color-overlay" />
      </div>

      <canvas
        ref={smokeCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-[1] blur-[30px] sm:blur-[46px] scale-105 transform-gpu opacity-90"
      />

      <div className="absolute inset-x-0 top-0 h-48 sm:h-64 bg-gradient-to-b from-white via-white/80 via-30% to-transparent pointer-events-none z-[3]" />

      <style>{`
        @keyframes footerDarkBluePulse {
          0% {
            filter: brightness(100%) saturate(100%);
          }
          50% {
            filter: brightness(110%) saturate(118%);
          }
          100% {
            filter: brightness(100%) saturate(100%);
          }
        }

        @keyframes footerWaveFlow {
          0% {
            opacity: 0.3;
            background-position: 0% 50%;
          }
          50% {
            opacity: 0.6;
            background-position: 100% 50%;
          }
          100% {
            opacity: 0.3;
            background-position: 0% 50%;
          }
        }

        .footer-bg-animated {
          animation: footerDarkBluePulse 16s ease-in-out infinite;
          will-change: filter;
          transform: translateZ(0);
        }

        .footer-color-overlay {
          background: linear-gradient(
            135deg,
            rgba(18, 48, 88, 0.35),
            rgba(25, 65, 115, 0.45),
            rgba(15, 40, 78, 0.4),
            rgba(20, 52, 95, 0.35),
            rgba(10, 26, 52, 0.5)
          );
          background-size: 250% 250%;
          mix-blend-mode: soft-light;
          animation: footerWaveFlow 16s ease-in-out infinite alternate;
          will-change: opacity, background-position;
          transform: translateZ(0);
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none z-[1] flex justify-between w-full px-2 sm:px-6 md:px-10 lg:px-14 xl:px-16 h-full">
        <div className="w-px h-full bg-slate-400/20" />
        <div className="w-px h-full bg-slate-400/20 hidden sm:block" />
        <div className="w-px h-full bg-slate-400/20" />
        <div className="w-px h-full bg-slate-400/20 hidden sm:block" />
        <div className="w-px h-full bg-slate-400/20" />
        <div className="w-px h-full bg-slate-400/20 hidden sm:block" />
        <div className="w-px h-full bg-slate-400/20" />
        <div className="w-px h-full bg-slate-400/20 hidden md:block" />
        <div className="w-px h-full bg-slate-400/20" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full z-[2] pointer-events-none select-none flex items-end justify-center leading-none overflow-hidden pb-0 translate-y-2 sm:translate-y-3">
        <span className="text-[13.6vw] sm:text-[14vw] lg:text-[14.2vw] font-black uppercase text-[#3d5877]/85 tracking-tighter leading-none whitespace-nowrap block text-center w-full px-1 drop-shadow-sm">
          INDIRA GROUP
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[1515px] mx-auto px-6 sm:px-12 lg:px-[94px] pt-6 sm:pt-8 lg:pt-10 pb-2 sm:pb-3">
        <div className={`flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-8 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-col">
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#D81B60] uppercase mb-1.5 block">
              GET STARTED
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-[#151936] tracking-tight uppercase leading-[1.12] max-w-3xl">
              <LetterReveal
                text="READY TO START YOUR"
                isVisible={activeVisible}
                direction="top-to-bottom"
                delay={150}
                stagger={20}
                duration={750}
              />
              <br />
              <LetterReveal
                text="NEXT PROJECT?"
                isVisible={activeVisible}
                direction="top-to-bottom"
                delay={400}
                stagger={22}
                duration={750}
              />
            </h2>
          </div>

          <div className="md:pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#E64A38] hover:bg-[#d43928] text-white font-bold text-xs sm:text-sm md:text-base px-2 sm:px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Let&apos;s book a call</span>
              <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={`relative z-10 w-full max-w-[1515px] mx-auto px-6 sm:px-12 lg:px-[94px] my-1.5 sm:my-2 transition-all duration-1000 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-90"}`}>
        <div className="relative w-full flex items-center">
          <div className="w-full border-b border-slate-300/40" />

          <div className="absolute left-[51.5%] -translate-x-1/2 -top-3 w-6 h-6 flex items-center justify-center text-[#0288D1] pointer-events-none hidden lg:flex">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[#0288D1] stroke-[2]" fill="none">
              <path strokeDasharray="3 3" d="M4 4L20 20M20 4L4 20" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1515px] mx-auto px-6 sm:px-12 lg:px-[94px] py-2 sm:py-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">

          <div className={`flex flex-col justify-between space-y-6 transition-all duration-1000 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div>
              <div className="inline-block bg-white p-2 sm:p-2.5 rounded-lg shadow-md mb-4">
                <Image
                  src="/Homelogo/image 2316 (1).png"
                  alt="Indira Logo"
                  width={180}
                  height={65}
                  priority
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-[290px] font-normal">
                Defining the skyline of tomorrow, we build foundations for future businesses with engineering excellence and unwavering commitment.
              </p>
            </div>

            <div className="pt-1">
              <label htmlFor="newsletter-email" className="text-white font-bold text-xs sm:text-sm mb-2.5 block">
                Subscribe to the newsletter
              </label>

              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="bg-[#182C3F]/90 border border-[#2D4A66] rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-white transition-colors flex-1 min-w-0 shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-white text-[#151936] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors shadow-md shrink-0 active:scale-95 cursor-pointer"
                >
                  Submit
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-400 mt-2 font-medium">Thank you for subscribing!</p>
              )}
            </div>
          </div>

          <div className={`flex flex-col transition-all duration-1000 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h3 className="text-slate-300 font-bold tracking-[0.2em] text-xs uppercase mb-4">
              NAVIGATE
            </h3>

            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium min-[480px]:flex-col min-[480px]:gap-2.5 min-[480px]:text-sm">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/service" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  Services
                </Link>
              </li>

              <li>
                <Link href="/#projects" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  Projects
                </Link>
              </li>

              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className={`flex flex-col transition-all duration-1000 delay-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h3 className="text-slate-300 font-bold tracking-[0.2em] text-xs uppercase mb-4">
              SERVICES
            </h3>

            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium min-[480px]:flex-col min-[480px]:gap-2.5 min-[480px]:text-sm">
              <li>
                <Link href="/service" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  Office Complexes
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  Retail &amp; Malls
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  Industrial Hubs
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  Institutional Building
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  Pre-Construction Planning
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-slate-300 hover:text-white transition-colors duration-200 block py-0.5">
                  Commercial Design-Build
                </Link>
              </li>
            </ul>
          </div>

          <div className={`flex flex-col transition-all duration-1000 delay-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h3 className="text-slate-300 font-bold tracking-[0.2em] text-xs uppercase mb-4">
              CONTACT US
            </h3>

            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-300 font-medium min-[480px]:flex-col min-[480px]:gap-3 min-[480px]:text-sm">
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#E64A38] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 234 567 890
                </a>
              </li>

              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#E64A38] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@solidus.com" className="hover:text-white transition-colors">
                  info@solidus.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#E64A38] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed">
                  123 Construction Way<br />City, Country
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className={`relative z-10 w-full max-w-[1515px] mx-auto px-6 sm:px-12 lg:px-[94px] pb-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs mt-auto transition-all duration-1000 delay-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <p className="text-center sm:text-left text-slate-300/90 text-[11px] sm:text-xs">
          &copy; 2024 Realtor Construction. All rights reserved.
        </p>

        <div className="flex items-center gap-2.5">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full border border-slate-400/80 flex items-center justify-center text-slate-200 hover:text-white hover:border-slate-200 transition-all"
            aria-label="Instagram"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full border border-slate-400/80 flex items-center justify-center text-slate-200 hover:text-white hover:border-slate-200 transition-all"
            aria-label="Facebook"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
            </svg>
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full border border-slate-400/80 flex items-center justify-center text-slate-200 hover:text-white hover:border-slate-200 transition-all"
            aria-label="Twitter"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full border border-slate-500/80 flex items-center justify-center text-slate-200 hover:text-white hover:border-slate-200 transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
