"use client";

import type { MatchFactor } from "@/types/lead";

interface MatchScoreProps {
  factors: MatchFactor[];
}

export function MatchScore({ factors }: MatchScoreProps) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {factors.map((factor) => (
        <span
          key={factor.label}
          className="inline-flex items-center gap-1 text-xs"
        >
          {factor.matched ? (
            <svg className="h-3.5 w-3.5 text-sheepdog-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5 text-sheepdog-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          )}
          <span className={factor.matched ? "text-gray-600" : "text-sheepdog-orange"}>
            {factor.label}
          </span>
        </span>
      ))}
    </div>
  );
}
