export const dynamic = 'force-dynamic';

import ProjectCard from '../../components/projectCard';
import { fetchfromCMS } from '../../components/api';

export default async function UpcomingProjectsPage() {
  const data = await fetchfromCMS('upcoming-projects');
  const upcomingProjects = data?.docs || [];

  return (
    <div className="relative min-h-screen bg-white pt-24 pb-12 overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl tracking-tight">
            Upcoming <span className="text-[#DE4C26]">Projects</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Get a sneak peek at our future developments. Unveiling the next generation of luxury living.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {upcomingProjects.map((project: any) => {
            const formattedUrl = project.mainImage?.url?.replace('/api/media/file/', '/media/');
            const imageSrc = formattedUrl
              ? formattedUrl.startsWith("http")
                ? formattedUrl
                : `${process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001"}${formattedUrl}`
              : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; // Fallback image

            return (
              <div key={project.id} className="flex justify-center">
                <ProjectCard 
                  id={project.id.toString()}
                  title={project.title}
                  location={project.location || "Location not specified"}
                  image={imageSrc}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
