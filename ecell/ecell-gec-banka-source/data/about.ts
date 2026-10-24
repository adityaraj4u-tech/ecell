// PLACEHOLDER: replace with verified data

export const aboutNarrative = `At GEC Banka, the Entrepreneurship Cell exists to close the gap between classroom theory and the messy, rewarding work of building something real. We turn curious engineers into confident founders—helping students test ideas, find mentors, and ship early products while they are still on campus. Rooted in Banka and connected across Bihar, we foster a culture where innovation is practical: pitch nights, clinics, and workshops that treat every student as a potential job creator. Whether you are sketching a first prototype or refining a go-to-market plan, E-Cell is the launchpad that keeps ambition grounded in execution.`;

export type TabContent = {
  id: "vision" | "mission" | "values";
  label: string;
  body: string;
};

export const aboutTabs: TabContent[] = [
  {
    id: "vision",
    label: "Vision",
    body: "To make GEC Banka a recognized hub for student-led innovation in Bihar—where every ambitious idea finds mentorship, peer support, and a clear path from campus to market.",
  },
  {
    id: "mission",
    label: "Mission",
    body: "Equip students with entrepreneurial skills, real-world exposure, and a supportive network so they can ideate, build, and scale ventures that create value for their communities.",
  },
  {
    id: "values",
    label: "Values",
    body: "Execution over hype. Inclusion across branches and batches. Mentorship that is honest and actionable. Community first—we succeed when more students try, learn, and ship.",
  },
];

export type Milestone = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export const milestones: Milestone[] = [
  {
    id: "1",
    year: "Founding",
    title: "E-Cell established",
    description: "Student-led cell formed to promote entrepreneurship on campus.",
  },
  {
    id: "2",
    year: "First cohort",
    title: "Workshops & pitch nights",
    description: "Hands-on sessions and open pitch formats introduced for all years.",
  },
  {
    id: "3",
    year: "Growth",
    title: "Mentor network expands",
    description: "Alumni and regional practitioners join as advisors and speakers.",
  },
  {
    id: "4",
    year: "Today",
    title: "Full program suite",
    description: "Ideate & Build, Startup Clinic, Venture Pitch, and Skill Workshops live.",
  },
];
