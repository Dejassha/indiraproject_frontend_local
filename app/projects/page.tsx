import Navbar from "../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import ongoingImage from "./photos/brown-high-skyscrapers.jpg";
import upcomingImage from "./photos/low-angle-shot-tall-city-building-with-blue-sky-background-new-york.jpg";
import completedImage from "./photos/completed-projects.jpg";
export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen w-full bg-white text-zinc-900 overflow-hidden">

      
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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 w-full max-w-7xl">

          
          <Link href="/projects/completedprojects" className="relative w-full min-h-[450px] sm:min-h-[600px] rounded-3xl shadow-2xl overflow-hidden border border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-3xl group block flex items-end p-8 sm:p-10">
            <Image
              src={completedImage}
              alt="Completed Projects"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            
            <h2 className="relative z-20 text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
              Completed Projects
            </h2>
          </Link>

          <Link href="/projects/ongoingprojects" className="relative w-full min-h-[450px] sm:min-h-[600px] rounded-3xl shadow-2xl overflow-hidden border border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-3xl group block flex items-end p-8 sm:p-10">
            <Image
              src={ongoingImage}
              alt="Ongoing Projects"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            
            <h2 className="relative z-20 text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
              Ongoing Projects
              
            </h2>
          </Link>

          <Link href="/projects/upcomingprojects" className="relative w-full min-h-[450px] sm:min-h-[600px] rounded-3xl shadow-2xl overflow-hidden border border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-3xl group block flex items-end p-8 sm:p-10">
            <Image
              src={upcomingImage}
              alt="Upcoming Projects"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            
            <h2 className="relative z-20 text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
              Upcoming Projects
            </h2>
          </Link>

        </div>

      </div>

    </main>
  );
}