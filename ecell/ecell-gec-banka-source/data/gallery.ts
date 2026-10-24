// PLACEHOLDER: replace with verified campus/event photos

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  /** Tailwind aspect class hint for masonry variety */
  aspect?: "square" | "portrait" | "landscape";
  width: number;
  height: number;
};

/** Tiny neutral blur data URL for next/image placeholder */
export const blurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGcP//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//Z";

export const gallery: GalleryItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    alt: "Students at a campus pitch event",
    caption: "Pitch night — campus auditorium",
    aspect: "landscape",
    width: 800,
    height: 533,
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
    alt: "Workshop session with laptops",
    caption: "Skill workshop in progress",
    aspect: "portrait",
    width: 600,
    height: 800,
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    alt: "Speaker addressing audience",
    caption: "Guest speaker session",
    aspect: "landscape",
    width: 800,
    height: 500,
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
    alt: "Team brainstorming around a table",
    caption: "Ideate & Build lab",
    aspect: "square",
    width: 600,
    height: 600,
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    alt: "Mentorship discussion",
    caption: "Startup Clinic office hours",
    aspect: "landscape",
    width: 800,
    height: 533,
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
    alt: "Students collaborating on a prototype",
    caption: "Hackathon sprint",
    aspect: "portrait",
    width: 600,
    height: 750,
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1591115765373-432cb4da6fbb?w=800&q=80",
    alt: "Audience at an entrepreneurship event",
    caption: "E-Cell community meetup",
    aspect: "landscape",
    width: 800,
    height: 500,
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    alt: "Team celebrating after a demo",
    caption: "Demo day celebration",
    aspect: "square",
    width: 600,
    height: 600,
  },
];
