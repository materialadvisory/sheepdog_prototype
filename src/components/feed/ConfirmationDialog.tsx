"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface ConfirmationDialogProps {
  onClose: () => void;
}

export function ConfirmationDialog({ onClose }: ConfirmationDialogProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
      >
        {/* Checkmark circle */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sheepdog-lime">
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-8 w-8 text-sheepdog-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </motion.svg>
        </div>

        <h3 className="mb-2 font-headline text-xl uppercase tracking-wide">
          You&apos;re In
        </h3>

        <p className="mb-6 text-sm text-gray-500">
          We&apos;ll reach out to the property owner on your behalf.
          You&apos;ll be notified when they respond.
        </p>

        <Button onClick={onClose} className="w-full">
          Got It
        </Button>
      </motion.div>
    </motion.div>
  );
}
