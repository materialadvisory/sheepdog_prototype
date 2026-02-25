"use client";

import { cn } from "@/lib/utils";
import type { ProfileData, BuyerIntent } from "@/types/onboarding";
import { BUYER_INTENT_OPTIONS } from "@/types/onboarding";

interface StepProfileProps {
  profile: ProfileData;
  onUpdate: (field: keyof ProfileData, value: string | BuyerIntent) => void;
}

export function StepProfile({ profile, onUpdate }: StepProfileProps) {
  return (
    <div>
      <h2 className="mb-2 font-headline text-2xl uppercase tracking-wide">
        Tell Us About You
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        Just a few basics so we can personalize your experience.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            value={profile.fullName}
            onChange={(e) => onUpdate("fullName", e.target.value)}
            placeholder="John Smith"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Company Name{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={profile.companyName}
            onChange={(e) => onUpdate("companyName", e.target.value)}
            placeholder="Smith Properties LLC"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => onUpdate("phone", e.target.value)}
            placeholder="(555) 123-4567"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">
            I&apos;m looking to... *
          </label>
          <div className="space-y-2">
            {BUYER_INTENT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onUpdate("buyerIntent", option.value)}
                className={cn(
                  "w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  profile.buyerIntent === option.value
                    ? "border-sheepdog-lime bg-sheepdog-lime/20 font-medium text-sheepdog-black"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
