"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "@/components/icons";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {
  if (!open) return null;

  return (
    <React.Fragment>
      <div
        className="fixed inset-0 z-50 bg-black/[45] backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        aria-describedby={description ? "dialog-description" : undefined}
      >
        <div className="w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl">
          {title && (
            <h2 id="dialog-title" className="serif text-2xl font-semibold text-espresso p-6">
              {title}
            </h2>
          )}
          {description && (
            <p id="dialog-description" className="text-sm text-muted-foreground px-6 pb-4">
              {description}
            </p>
          )}
          <div className="p-6">{children}</div>
          <button
            type="button"
            className="absolute right-3 top-3 rounded-full p-1.5 text-espresso hover:bg-champagne transition-colors"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

interface DialogTriggerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogTrigger({ children, open, onOpenChange }: DialogTriggerProps) {
  return (
    <>
      {React.cloneElement(React.Children.only(children) as React.ReactElement, {
        onClick: () => onOpenChange(true),
        "aria-expanded": open,
      } as unknown as React.ReactElement)}
      {open && <Dialog open={open} onOpenChange={onOpenChange}>{children}</Dialog>}
    </>
  );
}
