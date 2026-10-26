"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  title?: string;
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = false, title, ...props }, ref) => (
    <hr
      ref={ref}
      aria-orientation={orientation}
      aria-valuenow={decorative ? undefined : 0}
      aria-valuetext={title}
      className={cn(
        "relative flex w-full shrink-0 [border-top-color:var(--border)] border-t [--separator-gap:0.75rem]",
        orientation === "horizontal" ? "h-[1px]" : "w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
