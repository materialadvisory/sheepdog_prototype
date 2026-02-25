"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sheepdog-lime text-sheepdog-black font-semibold hover:brightness-95",
  secondary:
    "border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50",
  ghost: "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  onClick,
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
}
