"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className={cn(
          "h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:ring-ginger focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      {label && <label htmlFor={id} className="text-sm text-espresso">{label}</label>}
    </div>
  );
}
