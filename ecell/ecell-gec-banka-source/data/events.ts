// PLACEHOLDER: replace with verified data
// Use ISO date strings (YYYY-MM-DD). Past vs upcoming is derived at runtime.

export type EventType = "workshop" | "speaker" | "pitch";

export type Event = {
  id: string;
  title: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  /** Optional start time HH:mm for calendar links */
  startTime?: string;
  endTime?: string;
  venue: string;
  mode: "In-person" | "Online" | "Hybrid";
  type: EventType;
  description: string;
  /** Total capacity; seats left = capacity - registered (placeholder uses fixed seatsLeft) */
  capacity: number;
  seatsLeft: number;
};

export const events: Event[] = [
  {
    id: "evt-1",
    title: "AI for Founders Workshop",
    date: "2026-11-15",
    startTime: "10:00",
    endTime: "13:00",
    venue: "Seminar Hall, GEC Banka",
    mode: "In-person",
    type: "workshop",
    description:
      "Hands-on session on applying AI tools to idea validation, research, and early product workflows.",
    capacity: 60,
    seatsLeft: 18,
  },
  {
    id: "evt-2",
    title: "Founder Fireside: Building from Bihar",
    date: "2026-11-22",
    startTime: "16:00",
    endTime: "17:30",
    venue: "Auditorium / Livestream",
    mode: "Hybrid",
    type: "speaker",
    description:
      "A candid conversation with practitioners on starting up from regional campuses.",
    capacity: 120,
    seatsLeft: 42,
  },
  {
    id: "evt-3",
    title: "Venture Pitch Night — Winter Edition",
    date: "2026-12-05",
    startTime: "14:00",
    endTime: "18:00",
    venue: "Main Auditorium, GEC Banka",
    mode: "In-person",
    type: "pitch",
    description:
      "Student teams pitch to mentors and ecosystem partners. Coaching slots available before the day.",
    capacity: 40,
    seatsLeft: 8,
  },
  {
    id: "evt-4",
    title: "Product Management Basics",
    date: "2026-10-10",
    startTime: "11:00",
    endTime: "13:00",
    venue: "Lab Block A",
    mode: "In-person",
    type: "workshop",
    description:
      "Past workshop: discovery, prioritization, and writing a crisp PRD. (Archived for reference.)",
    capacity: 50,
    seatsLeft: 0,
  },
  {
    id: "evt-5",
    title: "Investor AMA Online",
    date: "2026-09-20",
    startTime: "18:00",
    endTime: "19:00",
    venue: "Google Meet",
    mode: "Online",
    type: "speaker",
    description: "Past online AMA with early-stage investors. Recording available on request.",
    capacity: 100,
    seatsLeft: 0,
  },
];

export const eventTypeLabels: Record<EventType | "all" | "past", string> = {
  all: "All",
  workshop: "Workshops",
  speaker: "Speaker Sessions",
  pitch: "Pitch Competitions",
  past: "Past",
};
