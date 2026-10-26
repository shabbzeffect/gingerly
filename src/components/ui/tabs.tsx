"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}
interface TabsTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
}
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <div
      className="w-full"
      role="tablist"
      aria-orientation="horizontal"
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        if (child.type === TabsList) {
          return React.cloneElement(child as React.ReactElement<TabsListProps>, {
            value,
            onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ className, children, ...props }: TabsListProps & { value?: string; onValueChange?: (v: string) => void }) {
  return (
    <div
      className={cn("inline-flex flex-1 gap-1", className)}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ className, value, children, ...props }: TabsTriggerProps & { onValueChange?: (v: string) => void }) {
  const isActive = value === undefined ? false : true;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
        "flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger focus-visible:ring-offset-2",
        isActive ? "bg-espresso text-ivory" : "text-muted-foreground hover:bg-champagne",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ className, value, children, ...props }: TabsContentProps) {
  return (
    <div
      role="tabpanel"
      className={cn("mt-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
TabsContent.displayName = "TabsContent";
