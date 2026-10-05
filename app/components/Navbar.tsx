
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import IndiraLogo from "./IndiraLogo";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Service", href: "/service" },
  { name: "Career", href: "/career" },
  { name: "Media", href: "/media" },
  { name: "Contact us", href: "/contact" },
];

interface NavbarProps {
  hidden?: boolean;
}

export default function Navbar({ hidden = false }: NavbarProps) {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const activeItem =
    pathname === "/about" || pathname?.startsWith("/about/")
      ? "About us"
      : pathname === "/service" || pathname?.startsWith("/service/")
        ? "Service"
        : pathname === "/career" || pathname?.startsWith("/career/") || pathname === "/careerpage" || pathname?.startsWith("/careerpage/")
          ? "Career"
          : pathname === "/contact" || pathname?.startsWith("/contact/")
            ? "Contact us"
            : pathname === "/media" || pathname?.startsWith("/media/")
              ? "Media"
              : pathname === "/projects" || pathname?.startsWith("/projects/")
                ? "Projects"
                : "Home";



  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-opacity duration-500 bg-white md:bg-transparent shadow-sm md:shadow-none ${hidden ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 flex items-start justify-between pt-0 sm:pt-0">

        <div className={`relative z-30 pointer-events-auto select-none ${pathname === "/" ? "-mt-1 sm:-mt-2" : ""}`}>
          <Link href="/" className="inline-block focus:outline-none" aria-label="Indira Projects Home">
            {pathname === "/" ? (
              <Image
                src="/Homelogo/image 2316 (1).png"
                alt="Indira Projects Logo"
                width={85}
                height={120}
                className="w-[45px] h-[60px] sm:w-[92px] sm:h-[97px] drop-shadow-sm sm:drop-shadow-xl object-contain object-top"
                priority
              />
            ) : (
              <IndiraLogo width={74} height={90} className="w-[40px] h-[50px] sm:w-[80px] sm:h-[95px] drop-shadow-sm sm:drop-shadow-xl" />
            )}
          </Link>
        </div>

        <nav className={`hidden md:flex items-center pointer-events-auto ${pathname === "/" ? "mt-2 sm:mt-3" : "mt-5 sm:mt-6"}`} aria-label="Main Navigation">
          <div className="flex items-center gap-3.5 sm:gap-4 lg:gap-5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 sm:px-5 lg:px-5 lg:py-2 shadow-xl transition-all duration-300">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center text-[12.5px] lg:text-[13.5px] font-medium transition-all duration-200 ${isActive
                    ? "font-semibold text-black/80"
                    : "text-black/60 hover:text-black/80"
                    }`}
                >
                  {isActive && (
                    <svg
                      className="w-3.5 h-3.5 mr-1.5 shrink-0 inline-block"
                      viewBox="0 0 20 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="6.5" cy="9" r="4.5" fill="#D81B60" />
                      <circle cx="11.5" cy="7.5" r="4.5" fill="#F4511E" />
                    </svg>
                  )}
                  <span
                    className={
                      isActive
                        ? "bg-gradient-to-r from-[#D81B60] via-[#ED3F3B] to-[#F4511E] bg-clip-text text-transparent font-bold"
                        : ""
                    }
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className={`flex md:hidden items-center gap-3 pointer-events-auto ${pathname === "/" ? "mt-2" : "mt-5"}`}>
          <Link
            href="/contact"
            className="bg-[#F4511E] hover:bg-[#D81B60] text-white text-[11px] font-bold uppercase px-4 py-2 rounded-full transition-colors shadow-sm"
          >
            Get a Quote
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-zinc-900 focus:outline-none transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto mx-3 min-[375px]:mx-4 sm:mx-8 md:mx-10 mt-3 bg-[#1e2530]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl">
          <nav
            className="flex flex-col space-y-1.5"
            aria-label="Mobile Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeItem === item.name;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                      ? "bg-white/10 font-semibold"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {isActive && (
                    <svg
                      className="w-3.5 h-3.5 mr-2 shrink-0"
                      viewBox="0 0 20 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="6.5"
                        cy="9"
                        r="4.5"
                        fill="#D81B60"
                      />
                      <circle
                        cx="11.5"
                        cy="7.5"
                        r="4.5"
                        fill="#F4511E"
                      />
                    </svg>
                  )}

                  <span
                    className={
                      isActive
                        ? "bg-gradient-to-r from-[#D81B60] via-[#ED3F3B] to-[#F4511E] bg-clip-text text-transparent font-bold"
                        : ""
                    }
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}

            <Link
              href="/contact#contact-form"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#F97316] to-[#E34D25] px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110"
            >
              GET A QUOTE
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}