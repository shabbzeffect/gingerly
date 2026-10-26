"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: string;
}

export function Avatar({ className, fallback, ...props }: AvatarProps) {
  return (
    <span className={cn("inline-flex items-center justify-center overflow-hidden rounded-full bg-champagne text-espresso font-semibold", className)}>
      <img {...props} alt="" />
      {props.src ? null : <span className="text-sm">{fallback ?? "?"}</span>}
    </span>
  );
}
