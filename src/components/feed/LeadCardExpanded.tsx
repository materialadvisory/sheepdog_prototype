"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { PropertySpecs } from "./PropertySpecs";
import { ValuationBlock } from "./ValuationBlock";
import { DistressIndicators } from "./DistressIndicators";
import { MatchScore } from "./MatchScore";
import { formatAddress } from "@/lib/utils";
import type { PropertyLead } from "@/types/lead";

interface LeadCardExpandedProps {
  lead: PropertyLead;
  onClose: () => void;
}

export function LeadCardExpanded({ lead, onClose }: LeadCardExpandedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative aspect-video">
          <Image
            src={lead.imageUrl}
            alt={formatAddress(lead.address)}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 448px"
            unoptimized
          />
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

          <div className="absolute right-3 top-14">
            <ProgressRing score={lead.matchScore} size={64} strokeWidth={5} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 p-5">
          {/* Address */}
          <div>
            <h2 className="font-headline text-2xl uppercase tracking-wide text-sheepdog-black">
              {lead.address.street}
            </h2>
            <p className="text-sm text-gray-500">
              {lead.address.city}, {lead.address.state} {lead.address.zip}
            </p>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="property">{lead.propertyType}</Badge>
            <Badge variant="owner">{lead.ownerType}</Badge>
            {lead.isOffMarket && (
              <span className="rounded-full bg-sheepdog-orange/15 px-2.5 py-0.5 text-xs font-semibold text-sheepdog-orange">
                Off Market
              </span>
            )}
            {lead.isSellerInterested && (
              <span className="rounded-full bg-sheepdog-green/15 px-2.5 py-0.5 text-xs font-semibold text-sheepdog-green">
                Seller Interested
              </span>
            )}
          </div>

          {/* Specs */}
          <PropertySpecs
            bedrooms={lead.bedrooms}
            bathrooms={lead.bathrooms}
            sqft={lead.sqft}
            yearBuilt={lead.yearBuilt}
          />

          {/* Valuation */}
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Valuation
            </h4>
            <ValuationBlock
              estimatedValue={lead.estimatedValue}
              lastSalePrice={lead.lastSalePrice}
              lastSaleDate={lead.lastSaleDate}
              taxAssessedValue={lead.taxAssessedValue}
            />
          </div>

          {/* Additional details */}
          <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3">
            {lead.neighborhood && (
              <div>
                <span className="text-xs text-gray-400">Neighborhood</span>
                <p className="text-sm font-medium">{lead.neighborhood}</p>
              </div>
            )}
            {lead.lotSize && (
              <div>
                <span className="text-xs text-gray-400">Lot Size</span>
                <p className="text-sm font-medium">{lead.lotSize}</p>
              </div>
            )}
            <div>
              <span className="text-xs text-gray-400">Owner</span>
              <p className="text-sm font-medium">{lead.ownerName}</p>
            </div>
            <div>
              <span className="text-xs text-gray-400">Owner Type</span>
              <p className="text-sm font-medium">{lead.ownerType}</p>
            </div>
          </div>

          {/* Distress indicators */}
          {lead.distressIndicators.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Distress Signals
              </h4>
              <DistressIndicators indicators={lead.distressIndicators} />
            </div>
          )}

          {/* Match factors */}
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Match Analysis
            </h4>
            <MatchScore factors={lead.matchFactors} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
