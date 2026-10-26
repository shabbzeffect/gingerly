"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "sm" | "default" | "lg";
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-full font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
      {
        primary: "bg-espresso text-ivory hover:bg-ginger transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger focus-visible:ring-offset-2",
        secondary: "bg-champagne text-espresso hover:bg-ginger-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger focus-visible:ring-offset-2",
        ghost: "text-espresso hover:bg-champagne transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger focus-visible:ring-offset-2",
        destructive: "bg-terracotta text-ivory hover:bg-terracotta-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2",
        outline: "border border-espresso text-espresso hover:bg-espresso hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger focus-visible:ring-offset-2",
      }[variant],
      {
        sm: "px-3 py-1.5 text-sm",
        default: "px-5 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      }[size],
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes} {...(props as any)}>
          {props.children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as any}
        className={classes}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
