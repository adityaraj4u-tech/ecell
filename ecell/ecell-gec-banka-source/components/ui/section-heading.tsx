import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <Badge className="mb-4" variant="default">
          {eyebrow}
        </Badge>
      )}
      <h2 className="font-heading text-fluid-3xl font-bold tracking-tight text-foreground md:text-fluid-4xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-fluid-base text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
