"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { aboutNarrative, aboutTabs, milestones } from "@/data/about";
import { useMotionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

function VisionMissionTabs() {
  const [active, setActive] = React.useState(aboutTabs[0].id);
  const tabListRef = React.useRef<HTMLDivElement>(null);
  const activeTab = aboutTabs.find((t) => t.id === active) ?? aboutTabs[0];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const ids = aboutTabs.map((t) => t.id);
    const idx = ids.indexOf(active);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive(ids[(idx + 1) % ids.length]);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive(ids[(idx - 1 + ids.length) % ids.length]);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(ids[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(ids[ids.length - 1]);
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6 sm:p-8">
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Vision, Mission, and Values"
          className="flex flex-wrap gap-2 border-b border-border pb-4"
          onKeyDown={onKeyDown}
        >
          {aboutTabs.map((tab) => {
            const isSelected = tab.id === active;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                id={`tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "relative min-h-[44px] rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isSelected
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                )}
              >
                {tab.label}
                {isSelected && (
                  <motion.span
                    layoutId="about-tab-indicator"
                    className="absolute inset-x-2 -bottom-[17px] h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="relative mt-6 min-h-[140px]">
          {aboutTabs.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              hidden={tab.id !== active}
              className={cn(tab.id === active ? "block" : "hidden")}
            >
              <motion.p
                key={tab.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-fluid-sm leading-relaxed text-muted"
              >
                {tab.body}
              </motion.p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MilestonesTimeline() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="mt-12 md:mt-16"
    >
      <h3 className="mb-6 text-center font-heading text-fluid-lg font-semibold text-foreground">
        Milestones
      </h3>
      <div className="relative">
        {/* horizontal line (desktop) */}
        <div
          className="absolute left-0 right-0 top-4 hidden h-px bg-border md:block"
          aria-hidden
        />
        <ol className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
          {milestones.map((m, i) => (
            <motion.li
              key={m.id}
              variants={fadeUp}
              className="relative flex flex-col items-start md:items-center md:text-center"
            >
              <span className="relative z-10 mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-surface text-xs font-semibold text-accent shadow-glow-sm">
                {i + 1}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-accent">
                {m.year}
              </span>
              <span className="mt-1 font-heading text-sm font-semibold text-foreground">
                {m.title}
              </span>
              <p className="mt-1 text-xs text-muted leading-relaxed max-w-[16rem]">
                {m.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <Section id="about" className="scroll-mt-20">
      <SectionHeading
        eyebrow="About Us"
        title="Bridging campus and creation"
        subtitle="How GEC Banka E-Cell turns academic energy into real ventures."
      />

      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid gap-8 lg:grid-cols-2 lg:gap-12"
      >
        <motion.div variants={fadeUp} className="flex flex-col justify-center">
          <p className="text-fluid-base leading-relaxed text-muted">
            {aboutNarrative}
          </p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <VisionMissionTabs />
        </motion.div>
      </motion.div>

      <MilestonesTimeline />
    </Section>
  );
}
