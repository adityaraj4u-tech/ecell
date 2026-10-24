// PLACEHOLDER: replace with verified data

export type Initiative = {
  id: string;
  title: string;
  shortDescription: string;
  icon: "Lightbulb" | "Stethoscope" | "Rocket" | "Wrench";
  whatYouGet: string[];
  fullDescription: string;
  outcomes: string[];
  /** Optional bento span: "wide" | "tall" | "default" */
  span?: "wide" | "tall" | "default";
};

export const initiatives: Initiative[] = [
  {
    id: "ideate-build",
    title: "Ideate & Build",
    shortDescription:
      "Turn raw engineering ideas into viable business models through structured blueprints and intensive hackathons.",
    icon: "Lightbulb",
    whatYouGet: [
      "Idea validation frameworks",
      "Cross-branch team formation",
      "Prototype sprints & demos",
    ],
    fullDescription:
      "Ideate & Build is our flagship pathway from spark to structure. Students join facilitated ideation labs, then compete in blueprint-style challenges and multi-day hackathons. Facilitators guide problem framing, customer discovery, and lean canvases so technical talent is paired with business clarity. Teams leave with a documented concept, early prototype, and a clear next experiment—not just a slide deck.",
    outcomes: [
      "Validated problem–solution fit sketches",
      "Working prototypes ready for feedback",
      "Peer and mentor networks for the next stage",
    ],
    span: "wide",
  },
  {
    id: "startup-clinic",
    title: "Startup Clinic",
    shortDescription:
      "Direct mentorship, legal orientation, and product–market fit troubleshooting for student founders.",
    icon: "Stethoscope",
    whatYouGet: [
      "1:1 mentor office hours",
      "Legal & compliance primers",
      "PMF diagnostics",
    ],
    fullDescription:
      "Startup Clinic is office hours for builders. Book focused sessions with mentors on product, go-to-market, and early operations. We also run short clinics on entity basics, IP awareness, and founder agreements—so you know what questions to ask professionals. Bring your metrics, your stuck points, and leave with prioritized next actions.",
    outcomes: [
      "Actionable mentor feedback loops",
      "Clearer legal and structure roadmap",
      "Sharper product–market experiments",
    ],
    span: "default",
  },
  {
    id: "venture-pitch",
    title: "Venture Pitch",
    shortDescription:
      "Moonshot-style pitch stages connecting early-stage startups with regional investors, incubators, and mentors.",
    icon: "Rocket",
    whatYouGet: [
      "Pitch coaching & dry runs",
      "Investor & incubator intros",
      "Demo-day stage time",
    ],
    fullDescription:
      "Venture Pitch is our high-visibility stage—Eureka- and Moonshot-inspired formats where student teams present to practitioners and partners. We prepare founders with narrative coaching, financial storytelling, and Q&A drills. Selected teams gain introductions to regional incubators, angel networks, and mentors who can open doors beyond campus.",
    outcomes: [
      "Polished investor-ready narratives",
      "Warm introductions to ecosystem partners",
      "Visibility among peers and alumni",
    ],
    span: "default",
  },
  {
    id: "skill-workshops",
    title: "Skill Workshops",
    shortDescription:
      "Hands-on sessions in AI, product management, design, and fundraising—skills founders actually use.",
    icon: "Wrench",
    whatYouGet: [
      "Tool-focused labs (AI, design)",
      "Product & roadmap clinics",
      "Fundraising fundamentals",
    ],
    fullDescription:
      "Skill Workshops close capability gaps. Short, intense modules cover applied AI for builders, product discovery and prioritization, UI/UX fundamentals, and the basics of raising capital. Sessions are project-based: you leave with artifacts you can use on your own venture the same week.",
    outcomes: [
      "Practical tools in your founder toolkit",
      "Portfolio pieces from real exercises",
      "Shared vocabulary across teams",
    ],
    span: "wide",
  },
];
