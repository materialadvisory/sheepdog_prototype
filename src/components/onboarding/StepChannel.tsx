"use client";

import { cn } from "@/lib/utils";
import type { ChannelPreference } from "@/types/onboarding";

interface StepChannelProps {
  channel: ChannelPreference;
  onSelect: (channel: ChannelPreference) => void;
}

const channels: {
  value: ChannelPreference;
  icon: string;
  label: string;
  description: string;
}[] = [
  {
    value: "email",
    icon: "\u2709\uFE0F",
    label: "Email",
    description: "Leads delivered to your inbox",
  },
  {
    value: "whatsapp",
    icon: "\uD83D\uDCAC",
    label: "WhatsApp",
    description: "Leads via WhatsApp message",
  },
  {
    value: "imessage",
    icon: "\uD83D\uDCF1",
    label: "iMessage / Text",
    description: "Leads via text message",
  },
];

export function StepChannel({ channel, onSelect }: StepChannelProps) {
  return (
    <div>
      <h2 className="mb-2 font-headline text-2xl uppercase tracking-wide">
        How Should We Reach You?
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        Your AI agent will send matched properties to your preferred channel.
        React directly from there — tap &ldquo;Interested&rdquo; or
        &ldquo;Pass&rdquo; and we learn what you like over time.
      </p>

      <div className="space-y-3">
        {channels.map((ch) => (
          <button
            key={ch.value}
            type="button"
            onClick={() => onSelect(ch.value)}
            className={cn(
              "flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors",
              channel === ch.value
                ? "border-sheepdog-lime bg-sheepdog-lime/15 ring-1 ring-sheepdog-lime"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <span className="text-2xl">{ch.icon}</span>
            <div>
              <p className="font-medium text-gray-800">{ch.label}</p>
              <p className="text-sm text-gray-500">{ch.description}</p>
            </div>
            {channel === ch.value && (
              <svg
                className="ml-auto h-5 w-5 text-sheepdog-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
