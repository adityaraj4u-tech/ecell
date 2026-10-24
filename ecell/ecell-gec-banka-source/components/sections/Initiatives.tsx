"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  Lightbulb,
  Stethoscope,
  Rocket,
  Wrench,
  ArrowRight,
  Check,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";
import { initiatives, type Initiative } from "@/data/initiatives";
import { useMotionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { RegisterForm } from "@/components/ui/register-form";

const iconMap = {
  Lightbulb,
  Stethoscope,
  Rocket,
  Wrench,
} as const;

function InitiativeCard({
  item,
  onOpen,
}: {
  item: Initiative;
  onOpen: (item: Initiative) => void;
}) {
  const Icon = iconMap[item.icon];
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
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
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      className={cn(
        item.span === "wide" && "md:col-span-2",
        item.span === "tall" && "md:row-span-2"
      )}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onClick={() => onOpen(item)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(item);
          }
        }}
        role="button"
        tabIndex={0}
        className={cn(
          "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-surface/80 p-6 shadow-glow-sm backdrop-blur-sm transition-all duration-300",
          "hover:-translate-y-1.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        {/* Cursor-following border glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(99,102,241,0.14), transparent 40%)`,
          }}
          aria-hidden
        />

        <div className="relative z-10 flex flex-1 flex-col">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="h-6 w-6" aria-hidden />
          </div>

          <h3 className="font-heading text-fluid-xl font-semibold text-foreground">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted leading-relaxed">
            {item.shortDescription}
          </p>

          <ul className="mt-4 space-y-1.5">
            {item.whatYouGet.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-xs text-muted"
              >
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                  aria-hidden
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all group-hover:gap-2.5">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Initiatives() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { stagger } = useMotionVariants();
  const [selected, setSelected] = React.useState<Initiative | null>(null);
  const [applyOpen, setApplyOpen] = React.useState(false);

  const Icon = selected ? iconMap[selected.icon] : null;

  return (
    <Section id="initiatives" className="scroll-mt-20">
      <SectionHeading
        eyebrow="Core Initiatives"
        title="Programs built for builders"
        subtitle="From first idea to investor-ready pitch—four pathways designed for GEC Banka students."
      />

      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5"
      >
        {initiatives.map((item) => (
          <InitiativeCard
            key={item.id}
            item={item}
            onOpen={setSelected}
          />
        ))}
      </motion.div>

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <ModalContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {selected && Icon && (
            <>
              <ModalHeader>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <ModalTitle>{selected.title}</ModalTitle>
                <ModalDescription>{selected.shortDescription}</ModalDescription>
              </ModalHeader>

              <div className="space-y-5 text-sm">
                <div>
                  <h4 className="mb-2 font-heading font-semibold text-foreground">
                    About the program
                  </h4>
                  <p className="leading-relaxed text-muted">
                    {selected.fullDescription}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-heading font-semibold text-foreground">
                    What you get
                  </h4>
                  <ul className="space-y-1.5">
                    {selected.whatYouGet.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-heading font-semibold text-foreground">
                    Outcomes
                  </h4>
                  <ul className="space-y-1.5">
                    {selected.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className="w-full min-h-[44px]"
                  onClick={() => {
                    setSelected(null);
                    setApplyOpen(true);
                  }}
                >
                  Apply
                </Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Apply modal (reuses register form) */}
      <Modal open={applyOpen} onOpenChange={setApplyOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Apply to a program</ModalTitle>
            <ModalDescription>
              Placeholder application form — submissions are not stored yet.
            </ModalDescription>
          </ModalHeader>
          <RegisterForm onSuccess={() => setApplyOpen(false)} />
        </ModalContent>
      </Modal>
    </Section>
  );
}
