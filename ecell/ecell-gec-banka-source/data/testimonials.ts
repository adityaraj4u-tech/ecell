// PLACEHOLDER: replace with verified quotes and names

export type TestimonialCategory = "faculty" | "founder" | "mentor";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  startup?: string;
  content: string;
  category: TestimonialCategory;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Faculty Head Name",
    role: "Faculty Coordinator, E-Cell",
    content:
      "E-Cell gives our students a structured path from curiosity to execution. Watching teams iterate on real problems has become one of the most rewarding parts of campus life.",
    category: "faculty",
    initials: "FH",
  },
  {
    id: "2",
    name: "Student Founder One",
    role: "Founder",
    startup: "Startup Placeholder A",
    content:
      "The Startup Clinic forced us to confront product-market fit early. Mentor feedback was direct, practical, and changed how we build.",
    category: "founder",
    initials: "SF",
  },
  {
    id: "3",
    name: "Mentor Name",
    role: "Advisor & Angel",
    content:
      "What stands out at GEC Banka is the hunger to ship. Pitch nights here feel energetic and grounded—students come prepared with experiments, not just slides.",
    category: "mentor",
    initials: "MN",
  },
  {
    id: "4",
    name: "Student Founder Two",
    role: "Co-founder",
    startup: "Startup Placeholder B",
    content:
      "Ideate & Build helped our cross-branch team speak the same language. We left the hackathon with a prototype and a clear next experiment.",
    category: "founder",
    initials: "S2",
  },
  {
    id: "5",
    name: "Faculty Advisor Name",
    role: "Department Faculty Advisor",
    content:
      "Linking classroom projects to E-Cell pathways has improved student confidence. Entrepreneurship is no longer abstract—it is a weekly practice.",
    category: "faculty",
    initials: "FA",
  },
];
