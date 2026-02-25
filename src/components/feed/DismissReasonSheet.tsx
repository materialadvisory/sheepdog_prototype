"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { DismissReason } from "@/types/lead";

const reasons: DismissReason[] = [
  "Price too high",
  "Wrong area",
  "Wrong type",
  "Bad condition",
  "Other",
];

interface DismissReasonSheetProps {
  onSelect: (reason: DismissReason, customText?: string) => void;
  onClose: () => void;
}

export function DismissReasonSheet({
  onSelect,
  onClose,
}: DismissReasonSheetProps) {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-2xl bg-white p-5 pb-8 sm:mb-4 sm:rounded-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-headline text-lg uppercase tracking-wide">
            Why not this one?
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-500">
          This helps us find better matches for you. Optional but helpful.
        </p>

        <div className="space-y-2">
          {reasons.map((reason) => (
            <motion.button
              key={reason}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (reason === "Other") {
                  setShowOtherInput(true);
                } else {
                  onSelect(reason);
                }
              }}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:border-sheepdog-pink hover:bg-sheepdog-pink/5"
            >
              {reason}
            </motion.button>
          ))}
        </div>

        {showOtherInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 space-y-3"
          >
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Tell us why this one isn't right..."
              autoFocus
              rows={2}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-pink focus:outline-none focus:ring-1 focus:ring-sheepdog-pink"
            />
            <Button
              onClick={() => onSelect("Other", otherText.trim() || undefined)}
              className="w-full"
            >
              Submit
            </Button>
          </motion.div>
        )}

        {!showOtherInput && (
          <button
            onClick={() => onSelect("Other")}
            className="mt-3 w-full text-center text-sm text-gray-400 hover:text-gray-600"
          >
            Skip — just dismiss it
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
