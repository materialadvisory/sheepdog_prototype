"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { PropertySpecs } from "./PropertySpecs";
import { ValuationBlock } from "./ValuationBlock";
import { DistressIndicators } from "./DistressIndicators";
import { MatchScore } from "./MatchScore";
import { ActionButtons } from "./ActionButtons";
import { formatAddress } from "@/lib/utils";
import type { PropertyLead } from "@/types/lead";

interface LeadCardProps {
  lead: PropertyLead;
  onInterested: () => void;
  onDismiss: () => void;
  onExpand: () => void;
}

export function LeadCard({
  lead,
  onInterested,
  onDismiss,
  onExpand,
}: LeadCardProps) {
  const isActioned = lead.status === "interested" || lead.status === "saved";

  return (
    <div className="mb-4 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
      {/* Image + Score overlay */}
      <div
        className="relative aspect-video cursor-pointer"
        onClick={onExpand}
      >
        <Image
          src={lead.imageUrl}
          alt={formatAddress(lead.address)}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 448px"
          unoptimized
        />
        {/* Gradient overlay at bottom of image for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Match score ring - top right */}
        <div className="absolute right-3 top-3">
          <ProgressRing score={lead.matchScore} />
        </div>

        {/* Property type badge - bottom left */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="property">{lead.propertyType}</Badge>
        </div>
      </div>

      {/* Card content */}
      <div className="space-y-3 p-4">
        {/* Address */}
        <div className="cursor-pointer" onClick={onExpand}>
          <h3 className="font-headline text-xl uppercase tracking-wide text-sheepdog-black">
            {lead.address.street}
          </h3>
          <p className="text-sm text-gray-500">
            {lead.address.city}, {lead.address.state} {lead.address.zip}
          </p>
        </div>

        {/* Property specs */}
        <PropertySpecs
          bedrooms={lead.bedrooms}
          bathrooms={lead.bathrooms}
          sqft={lead.sqft}
          yearBuilt={lead.yearBuilt}
        />

        {/* Valuation */}
        <ValuationBlock
          estimatedValue={lead.estimatedValue}
          lastSalePrice={lead.lastSalePrice}
          lastSaleDate={lead.lastSaleDate}
          taxAssessedValue={lead.taxAssessedValue}
        />

        {/* Match factors */}
        <MatchScore factors={lead.matchFactors} />

        {/* Distress indicators */}
        <DistressIndicators indicators={lead.distressIndicators} />

        {/* Owner info */}
        <div className="flex items-center gap-2">
          <Badge variant="owner">{lead.ownerType}</Badge>
          <span className="text-xs text-gray-400">{lead.ownerName}</span>
        </div>

        {/* Action buttons or status */}
        {isActioned ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-3",
              lead.interestedAction === "save"
                ? "bg-sheepdog-blue/20"
                : "bg-sheepdog-lime/20"
            )}
          >
            {lead.interestedAction === "save" ? (
              <>
                <svg className="h-5 w-5 text-sheepdog-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                <span className="text-sm font-semibold text-sheepdog-blue">
                  Saved for later
                </span>
              </>
            ) : (
              <>
                <svg className="h-5 w-5 text-sheepdog-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm font-semibold text-sheepdog-green">
                  Reaching out to the owner
                </span>
              </>
            )}
          </motion.div>
        ) : (
          <ActionButtons
            onInterested={onInterested}
            onDismiss={onDismiss}
          />
        )}
      </div>
    </div>
  );
}
