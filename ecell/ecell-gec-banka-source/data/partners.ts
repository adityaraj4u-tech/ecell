// PLACEHOLDER: replace with verified data

export type Partner = {
  id: string;
  name: string;
  /** Short label shown in wordmark */
  shortName?: string;
  url?: string;
  /** Visual accent for the wordmark chip */
  accent?: "blue" | "indigo" | "cyan" | "slate";
};

export const partners: Partner[] = [
  { id: "1", name: "Bihar Startup Hub", shortName: "BSH", accent: "blue", url: "#" },
  { id: "2", name: "MSME Bihar", shortName: "MSME", accent: "indigo", url: "#" },
  { id: "3", name: "NASSCOM Regional", shortName: "NASSCOM", accent: "cyan", url: "#" },
  { id: "4", name: "GEC Banka Alumni Network", shortName: "Alumni", accent: "slate", url: "#" },
  { id: "5", name: "State Incubation Centre", shortName: "SIC", accent: "blue", url: "#" },
  { id: "6", name: "Local Industry Association", shortName: "LIA", accent: "indigo", url: "#" },
  { id: "7", name: "Campus Innovation Lab", shortName: "CIL", accent: "cyan", url: "#" },
  { id: "8", name: "Regional Angel Circle", shortName: "RAC", accent: "slate", url: "#" },
];

/** Second row can reuse or subset — keeps marquee visually dense */
export const partnersRowB = [
  partners[4],
  partners[5],
  partners[6],
  partners[7],
  partners[0],
  partners[1],
  partners[2],
  partners[3],
];
