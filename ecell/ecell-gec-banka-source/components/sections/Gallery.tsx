"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { gallery, blurDataURL } from "@/data/gallery";
import { useMotionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), {
  ssr: false,
});

const aspectClass = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
} as const;

export function Gallery() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const { stagger } = useMotionVariants();
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  return (
    <Section id="gallery" className="scroll-mt-20">
      <SectionHeading
        eyebrow="Gallery"
        title="Moments from campus"
        subtitle="Workshops, pitch nights, and community — replace these placeholders with verified event photos."
      />

      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="columns-1 gap-4 sm:columns-2 lg:columns-3"
      >
        {gallery.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            onClick={() => setLightboxIndex(index)}
            className={cn(
              "mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg border border-border bg-surface text-left shadow-glow-sm transition-shadow hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            )}
          >
            <div
              className={cn(
                "relative w-full overflow-hidden",
                aspectClass[item.aspect ?? "landscape"]
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={blurDataURL}
                loading="lazy"
              />
            </div>
            {item.caption && (
              <p className="px-3 py-2 text-xs text-muted">{item.caption}</p>
            )}
          </motion.button>
        ))}
      </motion.div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={gallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </Section>
  );
}
