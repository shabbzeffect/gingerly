"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

function Sheet({ open, onOpenChange, title, children }: SheetProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/[40] backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-md flex-col bg-card border-l border-border shadow-2xl sm:max-w-sm">
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="serif text-xl font-semibold text-espresso">{title}</h2>
            <button
              type="button"
              className="rounded-full p-1.5 text-espresso hover:bg-champagne transition-colors"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}

export { Sheet };
