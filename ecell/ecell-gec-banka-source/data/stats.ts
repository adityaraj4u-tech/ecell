// PLACEHOLDER: replace with verified data
// To change counter values: update the `target` numbers below.
// Labels and formatting (₹ for funding) are handled in Hero.

export type Stat = {
  id: string;
  label: string;
  target: number;
  /** If true, value is formatted as Indian Rupees */
  isCurrency?: boolean;
  suffix?: string;
};

export const stats: Stat[] = [
  {
    id: "startups",
    label: "Startups Supported",
    target: 12,
    suffix: "+",
  },
  {
    id: "innovators",
    label: "Student Innovators Engaged",
    target: 350,
    suffix: "+",
  },
  {
    id: "events",
    label: "Workshops & Events",
    target: 28,
    suffix: "+",
  },
  {
    id: "funding",
    label: "Seed Funding / Grants Enabled",
    target: 500000,
    isCurrency: true,
    suffix: "+",
  },
];
