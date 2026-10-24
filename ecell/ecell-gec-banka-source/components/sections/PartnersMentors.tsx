"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { partners, partnersRowB, type Partner } from "@/data/partners";
import { mentors } from "@/data/mentors";
import { useMotionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const accentStyles: Record<NonNullable<Partner["accent"]>, string> = {
  blue: "from-accent/20 to-accent/5 text-accent border-accent/30",
  indigo: "from-accent-indigo/20 to-accent-indigo/5 text-accent-indigo border-accent-indigo/30",
  cyan: "from-accent-cyan/20 to-accent-cyan/5 text-accent-cyan border-accent-cyan/30",
  slate: "from-muted/20 to-muted/5 text-muted border-border",
};

function PartnerWordmark({ partner }: { partner: Partner }) {
  const accent = partner.accent ?? "slate";
  return (
    <a
      href={partner.url || "#"}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-lg border bg-gradient-to-br px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        accentStyles[accent]
      )}
      onClick={(e) => {
        if (!partner.url || partner.url === "#") e.preventDefault();
      }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface/80 text-xs font-bold font-heading">
        {partner.shortName?.slice(0, 3) ?? partner.name.slice(0, 2)}
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-foreground">
        {partner.name}
      </span>
    </a>
  );
}

function MarqueeRow({
  items,
  direction,
  paused,
}: {
  items: Partner[];
  direction: "left" | "right";
  paused: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const doubled = [...items, ...items];

  if (prefersReduced) {
    return (
      <div className="flex flex-wrap justify-center gap-3 py-2">
        {items.map((p) => (
          <PartnerWordmark key={p.id} partner={p} />
        ))}
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden py-2">
      <div
        className={cn(
          "flex w-max gap-4",
          direction === "left"
            ? "animate-[marquee-left_40s_linear_infinite]"
            : "animate-[marquee-right_40s_linear_infinite]",
          (paused || undefined) && "[animation-play-state:paused]",
          "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        )}
      >
        {doubled.map((p, i) => (
          <PartnerWordmark key={`${p.id}-${i}`} partner={p} />
        ))}
      </div>
    </div>
  );
}

function MentorCard({
  mentor,
}: {
  mentor: (typeof mentors)[number];
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = React.useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        className="group relative overflow-hidden rounded-lg border border-border bg-surface/80 p-5 shadow-glow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-glow"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(99,102,241,0.12), transparent 40%)`,
          }}
          aria-hidden
        />
        <div className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-indigo text-sm font-bold text-white shadow-glow-sm">
            {mentor.initials}
          </div>
          <h3 className="font-heading text-base font-semibold text-foreground">
            {mentor.name}
          </h3>
          <p className="mt-0.5 text-sm text-accent">{mentor.role}</p>
          {mentor.company && (
            <p className="text-xs text-muted">{mentor.company}</p>
          )}
          {mentor.linkedin && (
            <a
              href={mentor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] min-w-[44px] items-center gap-1.5 rounded-md text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`${mentor.name} on LinkedIn`}
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function PartnersMentors() {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.15 });
  const { stagger } = useMotionVariants();
  const [marqueePaused, setMarqueePaused] = React.useState(false);

  return (
    <Section id="mentors" className="scroll-mt-20">
      <SectionHeading
        eyebrow="Ecosystem"
        title="Partners & mentors"
        subtitle="Institutional partners and practitioners who support student founders at GEC Banka."
      />

      {/* Marquee — partners */}
      <div
        className="mb-14 space-y-3"
        role="region"
        aria-label="Ecosystem partners, scrolling list. Focus or hover to pause."
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
        onFocusCapture={() => setMarqueePaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setMarqueePaused(false);
          }
        }}
      >
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-muted">
          Ecosystem partners
        </p>
        <MarqueeRow items={partners} direction="left" paused={marqueePaused} />
        <MarqueeRow
          items={partnersRowB}
          direction="right"
          paused={marqueePaused}
        />
      </div>

      {/* Mentors grid */}
      <h3 className="mb-6 text-center font-heading text-fluid-lg font-semibold text-foreground">
        Mentors & speakers
      </h3>
      <motion.div
        ref={gridRef}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {mentors.map((m) => (
          <MentorCard key={m.id} mentor={m} />
        ))}
      </motion.div>
    </Section>
  );
}
