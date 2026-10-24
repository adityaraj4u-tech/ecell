"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { stats, type Stat } from "@/data/stats";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalTrigger,
} from "@/components/ui/modal";
import { RegisterForm } from "@/components/ui/register-form";
import { useMotionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

function formatStat(stat: Stat, value: number): string {
  if (stat.isCurrency) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      notation: value >= 100000 ? "compact" : "standard",
    }).format(value);
  }
  return new Intl.NumberFormat("en-IN").format(value);
}

function StatCounter({
  stat,
  inView,
}: {
  stat: Stat;
  inView: boolean;
}) {
  const [display, setDisplay] = React.useState(0);
  const prefersReduced = useReducedMotion();
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (prefersReduced) {
      setDisplay(stat.target);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(stat.target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, prefersReduced, stat.target]);

  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <span className="font-heading text-fluid-2xl font-bold tabular-nums tracking-tight text-foreground md:text-fluid-3xl">
        {formatStat(stat, display)}
        {stat.suffix && (
          <span className="text-accent">{stat.suffix}</span>
        )}
      </span>
      <span className="mt-1 max-w-[10rem] text-fluid-xs text-muted sm:max-w-none">
        {stat.label}
      </span>
    </div>
  );
}

function AuroraBackground({ paused }: { paused: boolean }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent/5 via-transparent to-transparent"
        aria-hidden
      />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Soft grid */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.07] dark:opacity-[0.12]",
          "[background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]",
          "[background-size:48px_48px]",
          "[mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]"
        )}
      />
      {/* Aurora blobs — GPU-friendly blur + transform only */}
      <div
        className={cn(
          "absolute -left-1/4 top-0 h-[60vh] w-[70vw] rounded-full bg-accent/20 blur-[100px]",
          !paused && "animate-[aurora-drift_18s_ease-in-out_infinite]"
        )}
      />
      <div
        className={cn(
          "absolute -right-1/4 top-1/4 h-[50vh] w-[60vw] rounded-full bg-accent-indigo/20 blur-[100px]",
          !paused && "animate-[aurora-drift_22s_ease-in-out_infinite_reverse]"
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-1/3 h-[40vh] w-[50vw] rounded-full bg-accent-cyan/10 blur-[80px]",
          !paused && "animate-[aurora-drift_20s_ease-in-out_infinite]"
        )}
      />
    </div>
  );
}

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const statsRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: false });
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });
  const { fadeUp, stagger } = useMotionVariants();
  const [modalOpen, setModalOpen] = React.useState(false);

  const scrollToInitiatives = () => {
    document.getElementById("initiatives")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center pt-20 pb-16 md:pt-24 md:pb-24"
    >
      <AuroraBackground paused={!isInView} />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1
            variants={fadeUp}
            className="font-heading text-fluid-4xl font-bold tracking-tight text-foreground md:text-fluid-5xl text-balance"
          >
            Empowering Innovation,{" "}
            <span className="bg-gradient-to-r from-accent via-accent-indigo to-accent-cyan bg-clip-text text-transparent">
              Executing Ambition
            </span>{" "}
            at GEC Banka.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-fluid-base text-muted md:text-fluid-lg"
          >
            Building Bihar&apos;s next generation of student founders, innovators,
            and job creators through mentorship, funding access, and real-world
            execution.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              size="lg"
              className="min-h-[44px] w-full sm:w-auto"
              onClick={scrollToInitiatives}
            >
              Explore Initiatives
            </Button>

            <Modal open={modalOpen} onOpenChange={setModalOpen}>
              <ModalTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-h-[44px] w-full sm:w-auto"
                >
                  Pitch Your Startup
                </Button>
              </ModalTrigger>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Pitch Your Startup</ModalTitle>
                  <ModalDescription>
                    Tell us about your idea. This is a placeholder form — data is
                    not stored yet.
                  </ModalDescription>
                </ModalHeader>
                <RegisterForm onSuccess={() => setModalOpen(false)} />
              </ModalContent>
            </Modal>
          </motion.div>
        </motion.div>

        {/* Stat counters */}
        <div
          ref={statsRef}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 border-t border-border pt-10 md:mt-20 md:grid-cols-4 md:gap-6 md:pt-12"
        >
          {stats.map((stat) => (
            <StatCounter key={stat.id} stat={stat} inView={statsInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
