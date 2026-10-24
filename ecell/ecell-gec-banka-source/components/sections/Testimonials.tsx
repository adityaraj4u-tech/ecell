"use client";

import * as React from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { testimonials, type TestimonialCategory } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const categoryLabel: Record<TestimonialCategory, string> = {
  faculty: "Faculty",
  founder: "Student founder",
  mentor: "Mentor",
};

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const prefersReduced = useReducedMotion();
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const dragStartX = React.useRef(0);

  const len = testimonials.length;
  const current = testimonials[index];

  const go = React.useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + len) % len);
    },
    [len]
  );

  // Autoplay — only when in view, not paused, not reduced motion
  React.useEffect(() => {
    if (prefersReduced || paused || !inView) return;
    const id = window.setInterval(() => go(1), 5500);
    return () => window.clearInterval(id);
  }, [prefersReduced, paused, inView, go]);

  return (
    <Section className="overflow-hidden">
      <SectionHeading
        eyebrow="Stories"
        title="Voices from the ecosystem"
        subtitle="Faculty, student founders, and mentors — placeholder quotes until verified stories are collected."
      />

      <div
        ref={sectionRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        aria-live={paused || prefersReduced ? "polite" : "off"}
        className="relative mx-auto max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setPaused(false);
          }
        }}
      >
        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={current.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={(_, info) => {
                dragStartX.current = info.point.x;
              }}
              onDragEnd={(_, info) => {
                const dx = info.point.x - dragStartX.current;
                if (dx > 50) go(-1);
                else if (dx < -50) go(1);
              }}
              className="cursor-grab rounded-xl border border-border bg-surface/80 p-6 shadow-glow-sm backdrop-blur-sm active:cursor-grabbing sm:p-8"
            >
              <Quote className="mb-4 h-8 w-8 text-accent/40" aria-hidden />
              <Badge variant="default" className="mb-3">
                {categoryLabel[current.category]}
              </Badge>
              <blockquote className="text-fluid-base leading-relaxed text-foreground">
                &ldquo;{current.content}&rdquo;
              </blockquote>
              <footer className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-indigo text-xs font-bold text-white">
                  {current.initials}
                </div>
                <div>
                  <cite className="not-italic font-heading text-sm font-semibold text-foreground">
                    {current.name}
                  </cite>
                  <p className="text-xs text-muted">
                    {current.role}
                    {current.startup ? ` · ${current.startup}` : ""}
                  </p>
                </div>
              </footer>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Slide dots">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  i === index
                    ? "w-6 bg-accent"
                    : "w-2.5 bg-border hover:bg-muted"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}
