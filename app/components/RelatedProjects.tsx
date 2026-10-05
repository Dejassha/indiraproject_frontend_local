import ProjectCard from './projectCard';
import { fetchfromCMS } from './api';

interface RelatedProjectsProps {
  currentId: string;
  type: 'ongoing' | 'upcoming';
}

export default async function RelatedProjects({ currentId, type }: RelatedProjectsProps) {
  const endpoint = type === 'ongoing' ? 'ongoing-projects' : 'upcoming-projects';
  const data = await fetchfromCMS(endpoint);
  
  const relatedProjects = (data?.docs || []).filter((p: any) => p.id.toString() !== currentId.toString());

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related {type === 'ongoing' ? 'Ongoing' : 'Upcoming'} Projects</h2>
        
        <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory hide-scrollbar">
          {relatedProjects.map((project: any) => {
            const formattedUrl = project.mainImage?.url?.replace('/api/media/file/', '/media/');
            const imageSrc = formattedUrl
              ? formattedUrl.startsWith("http")
                ? formattedUrl
                : `${process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001"}${formattedUrl}`
              : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; // Fallback image
            
            return (
              <div key={project.id} className="snap-start shrink-0 w-[300px] sm:w-[350px]">
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
    </section>
  );
}
