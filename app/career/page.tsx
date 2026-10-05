"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import GlobalDemo from "../components/GlobalPresence";
import {
  Star,
  Search,
  Briefcase,
  CheckCircle2,
  X,
  UploadCloud,
  GraduationCap,
  BadgeCheck,
  Globe,
  Rocket,
  ShieldPlus,
  PlaneTakeoff,
} from "lucide-react";

interface JobPosition {
  id: string;
  title: string;
  department: "Engineering" | "Product & Design" | "AI Research" | "AI Labs" | "Go-To-Market";
  type: string;
  location: string;
  experience?: string;
  salary: string;
  categoryTag: {
    label: string;
    bg: string;
    text: string;
  };
  locationTag: {
    label: string;
    bg: string;
    text: string;
  };
  shortDescription: string;
  fullDescription: string;
  requirements: string[];
}

// Jobs are now fetched dynamically from the CMS
export default function CareerPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [openPositions, setOpenPositions] = useState<JobPosition[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);

  const [activeJobForApplication, setActiveJobForApplication] = useState<JobPosition | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [applicantForm, setApplicantForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    linkedin: "",
    noticePeriod: "Immediate",
    coverNote: "",
    resumeName: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";
        const res = await fetch(`${CMS_URL}/api/jobs`);
        if (res.ok) {
          const data = await res.json();
          const jobs = data.docs.map((doc: any) => ({
            id: doc.id,
            title: doc.title,
            department: doc.department,
            type: doc.type,
            location: doc.location,
            experience: doc.experience,
            salary: doc.salary,
            categoryTag: doc.categoryTag,
            locationTag: doc.locationTag,
            shortDescription: doc.shortDescription,
            fullDescription: doc.fullDescription,
            requirements: doc.requirements?.map((req: any) => req.requirement) || [],
          }));
          setOpenPositions(jobs);
        }
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setIsLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);


  const filteredPositions = useMemo(() => {
    return openPositions.filter((job) => {
      const matchDepartment =
        selectedDepartment === "All" ||
        job.department === selectedDepartment ||
        (selectedDepartment === "AI Research" && (job.department === "AI Research" || job.department === "AI Labs"));
      const matchLocation =
        selectedLocation === "All" ||
        (selectedLocation === "SF" && job.location.includes("SF")) ||
        (selectedLocation === "Remote" && job.location.includes("Remote")) ||
        (selectedLocation === "Hybrid" && job.location.includes("Hybrid")) ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchQuery =
        searchQuery.trim() === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDepartment && matchLocation && matchQuery;
    });
  }, [selectedDepartment, selectedLocation, searchQuery]);


  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";
      let resumeId = null;

      // 1. Upload Resume Media
      if (resumeFile) {
        const formData = new FormData();
        formData.append("file", resumeFile);

        const mediaRes = await fetch(`${CMS_URL}/api/media`, {
          method: "POST",
          body: formData,
        });

        if (mediaRes.ok) {
          const mediaData = await mediaRes.json();
          resumeId = mediaData.doc.id;
        } else {
          console.error("Failed to upload resume");
          alert("Failed to upload resume. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Submit Candidate Profile
      const [firstName, ...lastNameArr] = applicantForm.name.trim().split(" ");
      const lastName = lastNameArr.length > 0 ? lastNameArr.join(" ") : "-";

      const profileRes = await fetch(`${CMS_URL}/api/candidate-profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: applicantForm.email,
          phone: applicantForm.phone,
          experience: applicantForm.experience,
          linkedin: applicantForm.linkedin,
          noticePeriod: applicantForm.noticePeriod,
          coverNote: applicantForm.coverNote,
          resume: resumeId, // Attach the media ID
        }),
      });

      if (profileRes.ok) {
        setApplicationSubmitted(true);
      } else {
        console.error("Failed to submit application");
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeApplicationModal = () => {
    setActiveJobForApplication(null);
    setApplicationSubmitted(false);
    setApplicantForm({
      name: "",
      email: "",
      phone: "",
      experience: "",
      linkedin: "",
      noticePeriod: "Immediate",
      coverNote: "",
      resumeName: "",
    });
    setResumeFile(null);
  };

  return (
    <main className="min-h-screen w-full bg-white text-zinc-900 selection:bg-[#E64A38]/20 selection:text-[#E64A38] font-sans relative overflow-x-hidden">
      <Navbar />

      <section className="relative w-full pt-32 sm:pt-40 md:pt-44 pb-14 sm:pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] h-[480px] bg-gradient-to-b from-[#FFF5EB] via-[#FFE8E8]/70 to-transparent rounded-full blur-[90px] pointer-events-none -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute top-20 right-[5%] w-[420px] h-[420px] bg-[#FCE7F3]/60 rounded-full blur-[110px] pointer-events-none -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute top-28 left-[5%] w-[380px] h-[380px] bg-[#FFEDD5]/60 rounded-full blur-[100px] pointer-events-none -z-10"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-[68px] lg:text-[76px] font-bold text-[#181E27] tracking-tight leading-[1.08] drop-shadow-sm">
            Build Your Future
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#D81B60] via-[#ED3F3B] to-[#F4511E] bg-clip-text text-transparent">
              With Us
            </span>
          </h1>

          <p className="mt-5 sm:mt-7 text-xs sm:text-sm md:text-[15px] lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Join an agile, distributed collective pioneering breakthrough technology platforms. Experience true high-autonomy ownership, competitive equity, and an uncompromisingly human culture.
          </p>

        </div>
      </section>

      <section id="open-positions" className="relative w-full py-16 sm:py-24 bg-white border-t border-slate-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 h-full">
              <div className="h-full flex justify-center"><div className="w-px h-full bg-slate-200/50" /></div>
              <div className="h-full flex justify-center"><div className="w-px h-full bg-slate-200/50" /></div>
              <div className="h-full flex justify-center"><div className="w-px h-full bg-slate-200/50" /></div>
              <div className="h-full flex justify-center"><div className="w-px h-full bg-slate-200/50" /></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#D81B60] uppercase mb-2 block">
                OPPORTUNITIES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
                Explore Open Positions
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#F1F3FD] px-4 py-1.5 rounded-full text-xs font-semibold text-[#1E293B] self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#D81B60]" />
              <span>{filteredPositions.length} Roles Currently Displayed</span>
            </div>
          </div>

          <div className="bg-[#F0F2FD] rounded-3xl p-6 sm:p-7 mb-10">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role, keyword, or technology (e.g., Rust, AI, Designer)..."
                className="w-full bg-white border-0 rounded-2xl pl-12 pr-10 py-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D81B60]/20 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {[
                  { label: "All Roles", value: "All" },
                  { label: "Engineering", value: "Engineering" },
                  { label: "Product & Design", value: "Product & Design" },
                  { label: "AI Research", value: "AI Research" },
                  { label: "Go-To-Market", value: "Go-To-Market" },
                ].map((dept) => {
                  const isActive = selectedDepartment === dept.value;
                  return (
                    <button
                      key={dept.value}
                      onClick={() => setSelectedDepartment(dept.value)}
                      className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${isActive
                          ? "bg-[#181E27] text-white shadow-xs"
                          : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-xs border border-slate-200/40"
                        }`}
                    >
                      {dept.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                <span className="text-xs sm:text-[13px] font-medium text-slate-600">Location:</span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-white text-xs sm:text-[13px] font-semibold text-slate-800 rounded-xl px-4 py-2 border-0 shadow-xs focus:outline-none cursor-pointer"
                >
                  <option value="All">All Locations</option>
                  <option value="SF">SF / Remote US</option>
                  <option value="Remote">Remote Worldwide</option>
                  <option value="Hybrid">SF / Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {isLoadingJobs ? (
              <div className="text-center py-16">
                <span className="w-8 h-8 border-4 border-[#D81B60] border-t-transparent rounded-full animate-spin inline-block"></span>
                <p className="mt-4 text-slate-500 font-medium">Loading open positions...</p>
              </div>
            ) : filteredPositions.length === 0 ? (
              <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-800">No positions found</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  We couldn&apos;t find any roles matching your current filter criteria. Try adjusting your search query.
                </p>
                <button
                  onClick={() => {
                    setSelectedDepartment("All");
                    setSelectedLocation("All");
                    setSearchQuery("");
                  }}
                  className="bg-[#1E2530] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-black transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredPositions.map((job, index) => (
                <div
                  key={job.id}
                  className="py-8 sm:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-slate-50/40 px-3 -mx-3 rounded-2xl transition-all duration-200"
                >
                  <div className="flex-1 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full ${job.categoryTag.bg} ${job.categoryTag.text}`}>
                        {job.categoryTag.label}
                      </span>
                      <span className="text-[11px] sm:text-xs font-medium text-[#4F46E5] bg-[#EEF2FF] px-3 py-1 rounded-full">
                        {job.type}
                      </span>
                      <span className={`text-[11px] sm:text-xs font-medium px-3 py-1 rounded-full ${job.locationTag.bg} ${job.locationTag.text}`}>
                        {job.locationTag.label}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight leading-snug">
                      {job.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-slate-500 mt-2 leading-relaxed font-normal">
                      {job.shortDescription}
                    </p>
                  </div>

                  <div className="flex sm:flex-row md:flex-col items-start md:items-end justify-between md:justify-center gap-3 shrink-0 pt-2 md:pt-0">
                    <div className="text-left md:text-right">
                      <span className="text-base sm:text-lg font-bold text-[#111827] tracking-tight">
                        {job.salary}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveJobForApplication(job)}
                      className={`inline-flex items-center gap-1.5 text-white font-medium text-xs sm:text-[13px] px-6 py-2.5 rounded-full shadow-xs hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer ${index % 2 === 0
                          ? "bg-[#D81B60] hover:bg-[#c2185b]"
                          : "bg-[#F4511E] hover:bg-[#e04516]"
                        }`}
                    >
                      <span>Apply Role</span>
                      <span className="leading-none text-sm font-semibold">→</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <FooterSection />

      {activeJobForApplication && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl p-[2px] bg-gradient-to-r from-pink-500 to-orange-400 my-6">
            <div className="bg-white rounded-[14px] sm:rounded-[22px] overflow-hidden w-full h-full relative">
              <div className="bg-gradient-to-r from-[#18212D] to-[#253245] text-white p-5 sm:p-6 relative">
                <button
                  onClick={closeApplicationModal}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="text-[11px] font-bold tracking-wider uppercase text-orange-400 block mb-1">
                  {activeJobForApplication.department} • {activeJobForApplication.location}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {activeJobForApplication.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Estimated Compensation: {activeJobForApplication.salary}
                </p>
              </div>

              <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
                {applicationSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      Application Submitted!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
                      Thank you for applying to Indira Projects. Our talent acquisition team will review your qualifications and reach out within 3 business days.
                    </p>
                    <button
                      onClick={closeApplicationModal}
                      className="bg-[#1E2530] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-black transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplicationSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantForm.name}
                          onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F4511E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantForm.email}
                          onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                          placeholder="e.g. ramesh@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F4511E]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantForm.phone}
                          onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F4511E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Total Experience
                        </label>
                        <input
                          type="text"
                          value={applicantForm.experience}
                          onChange={(e) => setApplicantForm({ ...applicantForm, experience: e.target.value })}
                          placeholder="e.g. 5.5 Years"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F4511E]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          LinkedIn or Portfolio URL
                        </label>
                        <input
                          type="url"
                          value={applicantForm.linkedin}
                          onChange={(e) => setApplicantForm({ ...applicantForm, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F4511E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Notice Period
                        </label>
                        <select
                          value={applicantForm.noticePeriod}
                          onChange={(e) => setApplicantForm({ ...applicantForm, noticePeriod: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F4511E] cursor-pointer"
                        >
                          <option value="Immediate">Immediate Joiner</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60 Days">60 Days</option>
                          <option value="90 Days">90 Days</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Upload Resume / CV (PDF, DOCX) *
                      </label>
                      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-300 rounded-xl p-4 cursor-pointer hover:border-orange-400 bg-slate-50/50 hover:bg-orange-50/20 transition-colors">
                        <UploadCloud className="w-7 h-7 text-slate-400 mb-1" />
                        <span className="text-xs text-slate-600 font-medium">
                          {applicantForm.resumeName || "Click to browse or drop your resume here"}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Maximum file size: 10MB</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setApplicantForm({ ...applicantForm, resumeName: file.name });
                              setResumeFile(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Brief Note / Why Indira Projects?
                      </label>
                      <textarea
                        rows={3}
                        value={applicantForm.coverNote}
                        onChange={(e) => setApplicantForm({ ...applicantForm, coverNote: e.target.value })}
                        placeholder="Share a brief overview of your projects, achievements, and why you are excited to join us..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F4511E]"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={closeApplicationModal}
                        className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-4 py-2.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-[#F97316] to-[#E34D25] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all shadow-md cursor-pointer flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <span>Submit Application</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <GlobalDemo></GlobalDemo>
      </div>

    </main>
  );
}
