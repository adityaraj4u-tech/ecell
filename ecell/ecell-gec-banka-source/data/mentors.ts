// PLACEHOLDER: replace with verified data

export type Mentor = {
  id: string;
  name: string;
  role: string;
  company?: string;
  /** Initials used for avatar placeholder */
  initials: string;
  linkedin?: string;
  bio?: string;
};

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Mentor Name One",
    role: "Founder & CEO",
    company: "Company Placeholder",
    initials: "M1",
    linkedin: "https://linkedin.com",
    bio: "Placeholder bio for mentor one.",
  },
  {
    id: "2",
    name: "Mentor Name Two",
    role: "Angel Investor",
    company: "Investor Network",
    initials: "M2",
    linkedin: "https://linkedin.com",
    bio: "Placeholder bio for mentor two.",
  },
  {
    id: "3",
    name: "Mentor Name Three",
    role: "Product Lead",
    company: "Tech Company",
    initials: "M3",
    linkedin: "https://linkedin.com",
    bio: "Placeholder bio for mentor three.",
  },
  {
    id: "4",
    name: "Mentor Name Four",
    role: "Startup Advisor",
    company: "Incubator Placeholder",
    initials: "M4",
    linkedin: "https://linkedin.com",
    bio: "Placeholder bio for mentor four.",
  },
  {
    id: "5",
    name: "Mentor Name Five",
    role: "Legal Counsel",
    company: "Counsel Placeholder",
    initials: "M5",
    linkedin: "https://linkedin.com",
    bio: "Placeholder bio for mentor five.",
  },
  {
    id: "6",
    name: "Mentor Name Six",
    role: "Growth Marketer",
    company: "Agency Placeholder",
    initials: "M6",
    linkedin: "https://linkedin.com",
    bio: "Placeholder bio for mentor six.",
  },
];
