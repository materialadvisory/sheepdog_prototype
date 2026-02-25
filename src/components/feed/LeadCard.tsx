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
  onReopenChoice?: () => void;
}

export function LeadCard({
  lead,
  onInterested,
  onDismiss,
  onExpand,
  onReopenChoice,
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

        {/* Property tag badges - top left */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {lead.isOffMarket && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sheepdog-orange px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Off Market
            </span>
          )}
          {lead.isSellerInterested && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sheepdog-green px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              </svg>
              Seller Interested
            </span>
          )}
        </div>

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
                : lead.interestedAction === "reach-out"
                ? "bg-sheepdog-lime/20"
                : "bg-gray-100"
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
            ) : lead.interestedAction === "reach-out" ? (
              <>
                <svg className="h-5 w-5 text-sheepdog-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm font-semibold text-sheepdog-green">
                  Reaching out to the owner
                </span>
              </>
            ) : (
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">
                    Marked as interested
                  </span>
                </div>
                {onReopenChoice && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReopenChoice();
                    }}
                    className="text-sm font-medium text-sheepdog-green hover:underline"
                  >
                    Decide &rarr;
                  </button>
                )}
              </div>
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
