"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface ConfirmationDialogProps {
  onReachOut: () => void;
  onSave: () => void;
  onClose: () => void;
}

export function ConfirmationDialog({ onReachOut, onSave, onClose }: ConfirmationDialogProps) {
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
        <h3 className="mb-2 font-headline text-xl uppercase tracking-wide">
          What Would You Like To Do?
        </h3>

        <p className="mb-6 text-sm text-gray-500">
          Have us reach out to the owner, or save this property for later.
        </p>

        <div className="space-y-3">
          <Button onClick={onReachOut} className="w-full">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Reach Out For Me
          </Button>
          <Button variant="secondary" onClick={onSave} className="w-full">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            Save For Later
          </Button>
          <button
            onClick={onClose}
            className="w-full pt-1 text-sm text-gray-400 transition-colors hover:text-gray-600"
          >
            Decide later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
