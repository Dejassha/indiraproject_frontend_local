export type ProjectType = 'ongoing' | 'upcoming';

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  location: string;
  image: string;
  description: string;
  amenities: string[];
  highlights: string[];
  layoutPlan: string;
}

export const projects: Project[] = [
  {
    id: "indira-ojas",
    title: "Indira Ojas",
    type: "ongoing",
    location: "OMR, Chennai",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Premium luxury apartments with sea views and modern amenities tailored for a comfortable lifestyle.",
    amenities: ["Swimming Pool", "Gymnasium", "Clubhouse", "24/7 Security", "Children's Play Area"],
    highlights: ["Sea View Apartments", "Vastu Compliant", "Prime Location on OMR"],
    layoutPlan: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "indira-radiance",
    title: "Indira Radiance",
    type: "ongoing",
    location: "Porur, Chennai",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience serene living in these modern villas built with high-quality materials and smart home features.",
    amenities: ["Landscaped Garden", "Smart Home Tech", "Power Backup", "Jogging Track", "Indoor Games"],
    highlights: ["Spacious Living", "Eco-friendly design", "Proximity to IT Parks"],
    layoutPlan: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "indira-zen",
    title: "Indira Zen",
    type: "ongoing",
    location: "Adyar, Chennai",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A sanctuary of peace in the bustling city. Indira Zen offers premium residences with a focus on holistic living.",
    amenities: ["Yoga Deck", "Meditation Center", "Organic Garden", "Spa", "Library"],
    highlights: ["Quiet Neighborhood", "Premium Finishes", "Close to top schools"],
    layoutPlan: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "indira-aurora",
    title: "Indira Aurora",
    type: "upcoming",
    location: "ECR, Chennai",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Stunning beachside properties offering the perfect blend of luxury and nature. Coming soon to ECR.",
    amenities: ["Private Beach Access", "Infinity Pool", "Helipad", "Concierge Service", "Mini Theatre"],
    highlights: ["Direct Beach Access", "Ultra-Luxury", "Exclusivity"],
    layoutPlan: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "indira-pinnacle",
    title: "Indira Pinnacle",
    type: "upcoming",
    location: "Guindy, Chennai",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The new landmark of Guindy. High-rise luxury apartments with unparalleled city views.",
    amenities: ["Rooftop Lounge", "Business Center", "Valet Parking", "Sky Gym", "Cafeteria"],
    highlights: ["Heart of the City", "Iconic Architecture", "Panoramic City Views"],
    layoutPlan: "https://images.unsplash.com/photo-1524813686514-a57563d77965?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export function getProjectsByType(type: ProjectType): Project[] {
  return projects.filter(project => project.type === type);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getRelatedProjects(currentId: string, type: ProjectType): Project[] {
  return projects.filter(project => project.type === type && project.id !== currentId);
}
