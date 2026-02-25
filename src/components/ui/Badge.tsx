"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "distress" | "owner" | "property" | "success";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  distress: "bg-sheepdog-pink/15 text-sheepdog-pink",
  owner: "bg-sheepdog-purple/15 text-sheepdog-purple",
  property: "bg-sheepdog-blue/15 text-sheepdog-blue",
  success: "bg-sheepdog-green/15 text-sheepdog-green",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
