"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const messages = [
  "Scanning thousands of properties...",
  "Matching against your search criteria...",
  "Analyzing distress signals and owner data...",
  "Finding the best opportunities for you...",
  "Scoring and ranking your top matches...",
];

interface SourcingStateProps {
  searchLabel: string;
  channel?: string;
  onManageSearches?: () => void;
}

export function SourcingState({
  searchLabel,
  channel = "Email",
  onManageSearches,
}: SourcingStateProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const channelIcon =
    channel === "WhatsApp" ? "💬" : channel === "iMessage / Text" ? "📱" : "✉️";

  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {/* Animated radar/search icon */}
      <div className="relative mb-6">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-sheepdog-lime"
          style={{ width: 96, height: 96, left: -8, top: -8 }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute inset-0 rounded-full bg-sheepdog-lime"
          style={{ width: 80, height: 80 }}
        />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-sheepdog-lime">
          <svg
            className="h-10 w-10 text-sheepdog-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </div>
      </div>

      <h3 className="mb-3 font-headline text-xl uppercase tracking-wide">
        Your AI Agent Is Working
      </h3>

      {/* Cycling messages */}
      <div className="mb-6 h-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-500"
          >
            {messages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Pulsing dots */}
      <div className="mb-8 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="h-2 w-2 rounded-full bg-sheepdog-green"
          />
        ))}
      </div>

      {/* Channel info */}
      <div className="mb-6 rounded-xl bg-gray-50 px-5 py-3">
        <p className="text-sm text-gray-500">
          We&apos;ll send your first matches to{" "}
          <span className="font-medium text-gray-700">
            {channelIcon} {channel}
          </span>
          .
          <br />
          You can also check back here anytime.
        </p>
      </div>

      {onManageSearches && (
        <Button variant="ghost" onClick={onManageSearches}>
          Manage My Searches
        </Button>
      )}
    </div>
  );
}
