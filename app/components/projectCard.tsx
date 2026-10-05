import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
}

export default function ProjectCard({ id, title, location, image }: ProjectCardProps) {
    return (
        <Link href={`/projects/${id}`} className="block w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group">
            <div className="relative h-64 w-full overflow-hidden">
                <Image 
                    src={image} 
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                    <p className="text-sm font-medium text-gray-200 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {location}
                    </p>
                </div>
            </div>
        </Link>
    );
}
