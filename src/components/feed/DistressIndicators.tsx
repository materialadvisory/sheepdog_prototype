"use client";

import { Badge } from "@/components/ui/Badge";
import type { DistressIndicator } from "@/types/lead";

interface DistressIndicatorsProps {
  indicators: DistressIndicator[];
}

export function DistressIndicators({ indicators }: DistressIndicatorsProps) {
  if (indicators.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {indicators.map((indicator) => (
        <Badge key={indicator} variant="distress">
          {indicator}
        </Badge>
      ))}
    </div>
  );
}
