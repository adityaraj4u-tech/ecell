import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as = "section", children, ...props }, ref) => {
    if (as === "div") {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn("py-16 md:py-24", className)}
          {...props}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      );
    }

    return (
      <section
        ref={ref as React.Ref<HTMLElement>}
        className={cn("py-16 md:py-24", className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section };
