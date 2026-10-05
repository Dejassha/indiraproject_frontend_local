import { notFound } from 'next/navigation';
import Image from 'next/image';
import RelatedProjects from '../../components/RelatedProjects';
import { fetchfromCMS } from '../../components/api';

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let rawProject = null;
  let type: 'ongoing' | 'upcoming' = 'ongoing';

  let data = await fetchfromCMS(`ongoing-projects/${id}`);
  if (data && !data.errors) {
    rawProject = data;
    type = 'ongoing';
  } else {
    data = await fetchfromCMS(`upcoming-projects/${id}`);
    if (data && !data.errors) {
      rawProject = data;
      type = 'upcoming';
    }
  }

  if (!rawProject) {
    notFound();
  }

  const formatUrl = (url: string) => {
    if (!url) return '';
    const formatted = url.replace('/api/media/file/', '/media/');
    return formatted.startsWith('http') ? formatted : `${process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001"}${formatted}`;
  };

  const project = {
    id: rawProject.id.toString(),
    title: rawProject.title,
    type: type,
    location: rawProject.location || 'Location not specified',
    image: formatUrl(rawProject.mainImage?.url) || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: rawProject.overview || '',
    amenities: rawProject.amenities?.map((a: { item: string }) => a.item) || [],
    highlights: rawProject.highlights?.map((h: { item: string }) => h.item) || [],
    layoutPlan: formatUrl(rawProject.layoutPlan?.url) || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  };

  return (
    <div className="relative min-h-screen bg-white pt-20 overflow-hidden">
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

      <div className="relative z-10">
        <div className="relative h-[60vh] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block py-1 px-3 rounded-full bg-[#DE4C26] text-white text-sm font-semibold mb-4 uppercase tracking-wider">
                {project.type} Project
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2">{project.title}</h1>
              <p className="text-xl text-gray-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Highlights</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-[#DE4C26] mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 text-lg">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Layout Plan</h2>
                <div className="relative h-96 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src={project.layoutPlan}
                    alt={`${project.title} Layout Plan`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h3>
                <ul className="space-y-4">
                  {project.amenities.map((amenity: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-[#DE4C26] rounded-full mr-3" />
                      <span className="text-lg">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#130c41] rounded-2xl p-8 text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Interested?</h3>
                <p className="text-gray-300 mb-6">Get in touch with our sales team for pricing and availability.</p>
                <button className="w-full bg-[#DE4C26] hover:bg-[#b63a1b] text-white font-bold py-3 px-4 rounded transition-colors duration-300">
                  Contact Us
                </button>
              </div>
            </div>

          </div>
        </div>

        <RelatedProjects currentId={project.id} type={project.type} />
      </div>
    </div>
  );
}




