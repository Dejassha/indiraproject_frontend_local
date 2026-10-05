
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import LetterReveal from "../components/LetterReveal";
import OurLocations from "./OurLocations";
import FooterSection from "../components/FooterSection";
import { fetchfromCMS } from "../components/api";

const REGEX_PATTERNS = {
  firstname: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/,
  name: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?[\d\s.-]{6,16}$/,
};

export default function ContactPage() {
  const [isInitialRevealed, setIsInitialRevealed] = useState(false);
  const [isFullRevealed, setIsFullRevealed] = useState(false);
  const [contactInfo, setContactInfo] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    firstname: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsInitialRevealed(true);
    }, 150);

    const timer2 = setTimeout(() => {
      setIsFullRevealed(true);
    }, 600);

    return () => {
      clearTimeout(timer1)

      clearTimeout(timer2);
    };
  }, []);

  const handleFieldInteraction = () => {
    if (!isFullRevealed) {
      setIsFullRevealed(true);
    }
  };

  useEffect(() => {
    const loadContactInfo = async () => {
      const data = await fetchfromCMS('contact-info');
      console.log("fetched data from CMS");
      if (data?.docs) {
        setContactInfo(data.docs);
      }
    }
    loadContactInfo();
  }, [])

  const validateField = (field: string, value: string): string => {
    const trimmed = value.trim();
    switch (field) {
      case "firstname":
        if (!trimmed) return "First name is required.";
        if (!REGEX_PATTERNS.firstname.test(trimmed)) {
          return "Please enter a valid first name (letters only, min 2 characters).";
        }
        return "";
      case "name":
        if (!trimmed) return "Last name is required.";
        if (!REGEX_PATTERNS.name.test(trimmed)) {
          return "Please enter a valid last name (letters only).";
        }
        return "";
      case "email":
        if (!trimmed) return "Email is required.";
        if (!REGEX_PATTERNS.email.test(trimmed)) {
          return "Please enter a valid email address (e.g. jane.doe@example.com).";
        }
        return "";
      case "phone":
        if (!trimmed) return "Phone number is required.";
        const digits = trimmed.replace(/\D/g, "");
        if (digits.length < 7 || digits.length > 15 || !REGEX_PATTERNS.phone.test(trimmed)) {
          return "Please enter a valid phone number (e.g. +33 (0)1 23 45 67 89).";
        }
        return "";
      case "message":
        if (!trimmed) return "Message is required.";
        if (trimmed.length < 10) {
          return "Message must be at least 10 characters long.";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: typeof formData) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev: Record<string, string>) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev: Record<string, boolean>) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev: Record<string, string>) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFieldInteraction();

    const newErrors: Record<string, string> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof typeof formData>).forEach((fieldKey) => {
      const error = validateField(fieldKey, formData[fieldKey]);
      if (error) {
        newErrors[fieldKey] = error;
        isValid = false;
      }
    });

    setTouched({
      firstname: true,
      name: true,
      email: true,
      phone: true,
      message: true,
    });
    setErrors(newErrors);

    if (isValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          firstname: "",
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setTouched({});
        setErrors({});
        setTimeout(() => setIsSubmitted(false), 6000);
      }, 700);
    }
  };

  const getInputClass = (fieldName: string) => {
    const isError = touched[fieldName] && errors[fieldName];
    const isValid = touched[fieldName] && !errors[fieldName] && formData[fieldName as keyof typeof formData].trim().length > 0;

    return `w-full bg-transparent border rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all ${isError
      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
      : isValid
        ? "border-emerald-500/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        : "border-zinc-400/80 focus:border-[#E64A38] focus:ring-1 focus:ring-[#E64A38]"
      }`;
  };

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

      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">

          <div className="lg:col-span-7 flex flex-col justify-start">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-zinc-900 tracking-tight leading-none mb-3">
              <LetterReveal
                text="CONTACT US"
                isVisible={isInitialRevealed}
                direction="top-to-bottom"
                delay={100}
                stagger={32}
                duration={750}
              />
            </h1>

            <Reveal isVisible={isInitialRevealed} direction="down" duration={900} delay={300}>
              <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed mb-8 sm:mb-10 max-w-xl">
                Reach out to explore collaborations, request a consultation, or discuss your next visionary project.
              </p>
            </Reveal>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl flex items-center gap-3 animate-fade-in">
                <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm font-medium">
                  Thank you! Your inquiry has been submitted successfully. We will get back to you shortly.
                </p>
              </div>
            )}

            <form id="contact-form" onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-5 sm:gap-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Reveal isVisible={isInitialRevealed} direction="up" duration={850} delay={300}>
                  <div>
                    <label htmlFor="firstname" className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-zinc-500 mb-2 block">
                      FIRSTNAME
                    </label>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      placeholder="Jane"
                      value={formData.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFieldInteraction}
                      className={getInputClass("firstname")}
                    />
                    {touched.firstname && errors.firstname && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1">
                        <span>•</span> {errors.firstname}
                      </p>
                    )}
                  </div>
                </Reveal>

                <Reveal isVisible={isInitialRevealed} direction="up" duration={850} delay={350}>
                  <div>
                    <label htmlFor="name" className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-zinc-500 mb-2 block">
                      LASTNAME
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Doe"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFieldInteraction}
                      className={getInputClass("name")}
                    />
                    {touched.name && errors.name && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1">
                        <span>•</span> {errors.name}
                      </p>
                    )}
                  </div>
                </Reveal>
              </div>

              <Reveal isVisible={isFullRevealed} direction="up" duration={850} delay={150}>
                <div>
                  <label htmlFor="email" className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-zinc-500 mb-2 block">
                    EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFieldInteraction}
                    className={getInputClass("email")}
                  />
                  {touched.email && errors.email && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1">
                      <span>•</span> {errors.email}
                    </p>
                  )}
                </div>
              </Reveal>

              <Reveal isVisible={isFullRevealed} direction="up" duration={850} delay={250}>
                <div>
                  <label htmlFor="phone" className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-zinc-500 mb-2 block">
                    PHONE NUMBER
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+33 (0)1 23 45 67 89"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFieldInteraction}
                    className={getInputClass("phone")}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1">
                      <span>•</span> {errors.phone}
                    </p>
                  )}
                </div>
              </Reveal>

              <Reveal isVisible={isFullRevealed} direction="up" duration={850} delay={350}>
                <div>
                  <label htmlFor="message" className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-zinc-500 mb-2 block">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project Requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFieldInteraction}
                    className={`${getInputClass("message")} resize-none`}
                  />
                  {touched.message && errors.message && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1">
                      <span>•</span> {errors.message}
                    </p>
                  )}
                </div>
              </Reveal>

              <Reveal isVisible={isFullRevealed} direction="up" duration={850} delay={450}>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-[480px]:w-auto bg-gradient-to-b from-[#F97316] to-[#E34D25] hover:brightness-105 active:scale-[0.98] disabled:opacity-75 text-white font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-lg hover:shadow-[0_15px_30px_rgba(227,77,37,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </div>
              </Reveal>

            </form>

          </div>

          <div className="lg:col-span-5 w-full flex flex-col">
            <Reveal isVisible={isInitialRevealed} direction="up" duration={950} delay={250} className="w-full">
              <div className="relative w-full bg-gradient-to-b from-[#F97316] to-[#E34D25] text-white rounded-3xl p-8 sm:p-10 lg:p-11 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[620px] group transition-all duration-500 hover:shadow-[0_25px_50px_rgba(227,77,37,0.4)] border border-white/10">

                <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/20 rounded-full blur-3xl pointer-events-none" />

                <div className="absolute -top-12 -right-12 pointer-events-none opacity-20">
                  <svg className="w-72 h-72 sm:w-80 sm:h-80 text-white" viewBox="0 0 200 200" fill="none" stroke="currentColor">
                    <circle cx="100" cy="100" r="90" strokeWidth="1.5" strokeDasharray="5 5" />
                    <circle cx="100" cy="100" r="65" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="40" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="200" y2="100" strokeWidth="1.5" />
                    <line x1="100" y1="0" x2="100" y2="200" strokeWidth="1.5" />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col gap-8 sm:gap-9">

                  <Reveal isVisible={isInitialRevealed} direction="up" duration={800} delay={300}>
                    <div>
                      <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-white/75 uppercase mb-2 block">
                        LOCATION
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1 leading-tight">
                        {contactInfo?.[0]?.location?.streetAddress}
                      </h3>
                      <p className="text-white/80 text-sm sm:text-base font-light">
                        {contactInfo?.[0]?.location?.cityCountry}
                      </p>
                    </div>
                  </Reveal>

                  <Reveal isVisible={isInitialRevealed} direction="up" duration={800} delay={400}>
                    <div>
                      <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-white/75 uppercase mb-2 block">
                        DIRECT LINES
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1 leading-tight">
                        {contactInfo?.[0]?.directLines?.phone}
                      </h3>
                      <p className="text-white/80 text-sm sm:text-base font-light">
                        {contactInfo?.[0]?.directLines?.email}
                      </p>
                    </div>
                  </Reveal>

                  <Reveal isVisible={isFullRevealed} direction="up" duration={850} delay={200}>
                    <div>
                      <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-white/75 uppercase mb-3 block">
                        HOURS OF OPERATION
                      </span>
                      {contactInfo?.[0]?.hoursOfOperation?.length > 0 ? (
                        contactInfo[0].hoursOfOperation.map((op: any, index: number) => (
                          <div key={index} className={`flex justify-between items-center text-xs sm:text-sm font-medium text-white/90 ${index > 0 ? 'mt-1.5' : ''}`}>
                            <span>{op.days}</span>
                            <span>{op.hours}</span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-white/90">
                            <span>Mon - Fri</span>
                            <span>9:00 AM — 6:00 PM</span>
                          </div>
                          <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-white/90 mt-1.5">
                            <span>Sat - Sun</span>
                            <span>Closed</span>
                          </div>
                        </>
                      )}
                    </div>
                  </Reveal>

                </div>

                <Reveal isVisible={isFullRevealed} direction="up" duration={850} delay={300}>
                  <div className="relative z-10 mt-8 pt-6 border-t border-white/20">
                    <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-white/75 uppercase mb-3 block">
                      FOLLOW US
                    </span>
                    <div className="flex items-center gap-3">
                      {contactInfo?.[0]?.socialLinks?.length > 0 ? (
                        contactInfo[0].socialLinks.map((social: any, index: number) => (
                          <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white text-[#E34D25] rounded-md flex items-center justify-center font-bold text-xs shadow-sm hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                          >
                            {social.platform}
                          </a>
                        ))
                      ) : (
                        <>
                          <a
                            href="#facebook"
                            className="w-10 h-10 bg-white text-[#E34D25] rounded-md flex items-center justify-center font-bold text-xs shadow-sm hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                          >
                            FB
                          </a>
                          <a
                            href="#linkedin"
                            className="w-10 h-10 bg-white text-[#E34D25] rounded-md flex items-center justify-center font-bold text-xs shadow-sm hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                          >
                            IN
                          </a>
                          <a
                            href="#twitter"
                            className="w-10 h-10 bg-white text-[#E34D25] rounded-md flex items-center justify-center font-bold text-xs shadow-sm hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                          >
                            TW
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </Reveal>

              </div>
            </Reveal>
          </div>

        </div>
      </div>

      <section className="relative z-10 w-full bg-white">
        <OurLocations />
      </section>

      <FooterSection />
    </main>
  );
}
