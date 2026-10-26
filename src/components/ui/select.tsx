"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "@/components/icons";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ className, label, id, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-espresso mb-1.5 block">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {props.children}
      </select>
      <ChevronDown className="absolute right-3 top-10 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}
