"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MapPin, Monitor, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";
import {
  events,
  eventTypeLabels,
  type Event,
  type EventType,
} from "@/data/events";
import {
  eventRegisterSchema,
  type EventRegisterValues,
} from "@/lib/validators";
import { useMotionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FilterKey = "all" | EventType | "past";

function isPast(event: Event): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(event.date + "T00:00:00");
  return d < today;
}

function formatDateBadge(iso: string): { day: string; month: string; weekday: string } {
  const d = new Date(iso + "T00:00:00");
  return {
    day: d.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: d.toLocaleDateString("en-IN", { month: "short" }),
    weekday: d.toLocaleDateString("en-IN", { weekday: "short" }),
  };
}

function googleCalendarUrl(event: Event): string {
  const start = (event.startTime || "10:00").replace(":", "");
  const end = (event.endTime || "12:00").replace(":", "");
  const dates = `${event.date.replace(/-/g, "")}T${start}00/${event.date.replace(/-/g, "")}T${end}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates,
    details: event.description,
    location: event.venue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Confetti without styled-jsx randomness — CSS variables in globals */
function ConfettiCSS() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 20 }, (_, i) => (
        <span
          key={i}
          className="confetti-piece absolute left-1/2 top-[30%] h-2 w-2 rounded-sm"
          style={
            {
              "--dx": `${((i % 5) - 2) * 36}px`,
              "--delay": `${i * 0.04}s`,
              backgroundColor: ["#3B82F6", "#6366F1", "#22D3EE", "#94A3B8"][i % 4],
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function RegisterModal({
  event,
  open,
  onOpenChange,
}: {
  event: Event | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [success, setSuccess] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EventRegisterValues>({
    resolver: zodResolver(eventRegisterSchema),
    defaultValues: {
      eventId: event?.id ?? "",
      eventTitle: event?.title ?? "",
      year: undefined,
    },
  });

  React.useEffect(() => {
    if (event) {
      reset({
        eventId: event.id,
        eventTitle: event.title,
        name: "",
        email: "",
        branch: "",
        year: undefined,
        rollNumber: "",
        phone: "",
      });
      setSuccess(false);
    }
  }, [event, reset]);

  const onSubmit = async (data: EventRegisterValues) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || "Registration failed");
    }
    setSuccess(true);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="relative max-h-[90vh] overflow-y-auto sm:max-w-md">
        {success && event ? (
          <div className="relative py-6 text-center">
            <ConfettiCSS />
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl">
              ✓
            </div>
            <ModalHeader className="text-center sm:text-center">
              <ModalTitle>You&apos;re registered</ModalTitle>
              <ModalDescription>
                We&apos;ve recorded your interest in{" "}
                <span className="font-medium text-foreground">{event.title}</span>.
                (Mock API — not stored permanently.)
              </ModalDescription>
            </ModalHeader>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild variant="outline" className="min-h-[44px]">
                <a
                  href={googleCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Add to Google Calendar
                </a>
              </Button>
              <Button
                variant="ghost"
                className="min-h-[44px]"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ModalHeader>
              <ModalTitle>Register for event</ModalTitle>
              <ModalDescription>
                {event?.title ?? "Event"} — seats are limited.
              </ModalDescription>
            </ModalHeader>
            <form
              onSubmit={handleSubmit(async (data) => {
                try {
                  await onSubmit(data);
                } catch {
                  // surface via form; keep simple for mock
                }
              })}
              className="space-y-4"
            >
              <input type="hidden" {...register("eventId")} />
              <input type="hidden" {...register("eventTitle")} />

              <div>
                <label htmlFor="ev-name" className="mb-1.5 block text-sm font-medium">
                  Full name
                </label>
                <Input id="ev-name" {...register("name")} placeholder="Your name" />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="ev-email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="ev-email"
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ev-branch" className="mb-1.5 block text-sm font-medium">
                    Branch
                  </label>
                  <Input
                    id="ev-branch"
                    {...register("branch")}
                    placeholder="e.g. CSE"
                  />
                  {errors.branch && (
                    <p className="mt-1 text-xs text-red-500">{errors.branch.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="ev-year" className="mb-1.5 block text-sm font-medium">
                    Year
                  </label>
                  <select
                    id="ev-year"
                    {...register("year")}
                    className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select year
                    </option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                  {errors.year && (
                    <p className="mt-1 text-xs text-red-500">{errors.year.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="ev-roll" className="mb-1.5 block text-sm font-medium">
                  Roll number
                </label>
                <Input
                  id="ev-roll"
                  {...register("rollNumber")}
                  placeholder="College roll no."
                />
                {errors.rollNumber && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.rollNumber.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="ev-phone" className="mb-1.5 block text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="ev-phone"
                  type="tel"
                  inputMode="numeric"
                  {...register("phone")}
                  placeholder="10-digit mobile"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full min-h-[44px]" loading={isSubmitting}>
                Confirm registration
              </Button>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function EventCard({
  event,
  onRegister,
  isLast,
}: {
  event: Event;
  onRegister: (e: Event) => void;
  isLast?: boolean;
}) {
  const badge = formatDateBadge(event.date);
  const past = isPast(event);
  const seatsLow = !past && event.seatsLeft <= 10;

  return (
    <div className="relative flex gap-4 md:gap-8">
      {/* Timeline spine (desktop) */}
      <div className="relative hidden w-16 shrink-0 flex-col items-center md:flex">
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-border bg-surface text-center shadow-glow-sm">
          <span className="text-[10px] font-medium uppercase text-muted">
            {badge.month}
          </span>
          <span className="font-heading text-xl font-bold leading-none text-foreground">
            {badge.day}
          </span>
          <span className="text-[10px] text-muted">{badge.weekday}</span>
        </div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-border" aria-hidden />
        )}
      </div>

      <div
        className={cn(
          "mb-6 flex-1 rounded-lg border border-border bg-surface/80 p-5 shadow-glow-sm backdrop-blur-sm transition-shadow hover:shadow-glow md:mb-8",
          past && "opacity-75"
        )}
      >
        {/* Mobile date */}
        <div className="mb-3 flex items-center gap-2 md:hidden">
          <Badge variant="outline">
            {badge.weekday}, {badge.day} {badge.month}
          </Badge>
          {past && <Badge variant="secondary">Past</Badge>}
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Badge variant="default">
                {eventTypeLabels[event.type]}
              </Badge>
              {seatsLow && (
                <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400">
                  Few seats left
                </Badge>
              )}
            </div>
            <h3 className="font-heading text-fluid-lg font-semibold text-foreground">
              {event.title}
            </h3>
            <p className="mt-1 text-sm text-muted line-clamp-2">
              {event.description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {event.venue}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Monitor className="h-3.5 w-3.5" />
            {event.mode}
          </span>
          {!past && (
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {event.seatsLeft} seats left
            </span>
          )}
        </div>

        {!past && (
          <Button
            size="sm"
            className="mt-4 min-h-[44px]"
            onClick={() => onRegister(event)}
            disabled={event.seatsLeft <= 0}
          >
            {event.seatsLeft <= 0 ? "Full" : "Register Now"}
          </Button>
        )}
      </div>
    </div>
  );
}

export function Events() {
  const [filter, setFilter] = React.useState<FilterKey>("all");
  const [selected, setSelected] = React.useState<Event | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.1 });
  const { fadeUp } = useMotionVariants();

  const tabs: FilterKey[] = ["all", "workshop", "speaker", "pitch", "past"];

  const filtered = React.useMemo(() => {
    if (filter === "past") return events.filter(isPast);
    if (filter === "all") return events.filter((e) => !isPast(e));
    return events.filter((e) => !isPast(e) && e.type === filter);
  }, [filter]);

  const sorted = React.useMemo(
    () =>
      [...filtered].sort((a, b) =>
        filter === "past"
          ? b.date.localeCompare(a.date)
          : a.date.localeCompare(b.date)
      ),
    [filtered, filter]
  );

  return (
    <Section id="events" className="scroll-mt-20">
      <SectionHeading
        eyebrow="Events"
        title="Upcoming events & calendar"
        subtitle="Workshops, speaker sessions, and pitch nights — register early while seats last."
      />

      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Event filters"
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        {tabs.map((key) => {
          const selectedTab = filter === key;
          return (
            <button
              key={key}
              role="tab"
              type="button"
              aria-selected={selectedTab}
              onClick={() => setFilter(key)}
              className={cn(
                "min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                selectedTab
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:text-foreground"
              )}
            >
              {eventTypeLabels[key]}
            </button>
          );
        })}
      </div>

      <motion.div
        ref={listRef}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeUp}
        className="mx-auto max-w-3xl"
      >
        {sorted.length === 0 ? (
          <p className="text-center text-muted">No events in this category.</p>
        ) : (
          sorted.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              isLast={i === sorted.length - 1}
              onRegister={(e) => {
                setSelected(e);
                setModalOpen(true);
              }}
            />
          ))
        )}
      </motion.div>

      <RegisterModal
        event={selected}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </Section>
  );
}
