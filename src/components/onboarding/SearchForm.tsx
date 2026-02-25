"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SearchFormData, PropertyTypeOption } from "@/types/onboarding";
import { PROPERTY_TYPE_OPTIONS, US_STATES } from "@/types/onboarding";

interface SearchFormProps {
  search: SearchFormData;
  index: number;
  canRemove: boolean;
  onUpdate: (field: keyof SearchFormData, value: string | string[] | boolean | PropertyTypeOption[]) => void;
  onAddZip: (zip: string) => void;
  onRemoveZip: (zip: string) => void;
  onTogglePropertyType: (type: PropertyTypeOption) => void;
  onRemove: () => void;
}

export function SearchForm({
  search,
  index,
  canRemove,
  onUpdate,
  onAddZip,
  onRemoveZip,
  onTogglePropertyType,
  onRemove,
}: SearchFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [zipInput, setZipInput] = useState("");

  const handleAddZip = () => {
    const zip = zipInput.trim();
    if (zip && /^\d{5}$/.test(zip) && !search.zipCodes.includes(zip)) {
      onAddZip(zip);
      setZipInput("");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-headline text-base uppercase tracking-wide">
          Search {index + 1}
        </h4>
        {canRemove && (
          <button
            onClick={onRemove}
            className="text-xs text-gray-400 hover:text-red-500"
          >
            Remove
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Search Name *
          </label>
          <input
            type="text"
            value={search.label}
            onChange={(e) => onUpdate("label", e.target.value)}
            placeholder="e.g., South Florida homes under $500K"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
          />
        </div>

        {/* State + Zip codes */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              State *
            </label>
            <select
              value={search.state}
              onChange={(e) => onUpdate("state", e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
            >
              <option value="">Select...</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Zip Codes
            </label>
            <div className="flex gap-1">
              <input
                type="text"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddZip()}
                placeholder="33020"
                maxLength={5}
                className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
              />
              <button
                onClick={handleAddZip}
                className="shrink-0 rounded-xl bg-gray-100 px-3 py-3 text-sm font-medium text-gray-600 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Zip code tags */}
        {search.zipCodes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {search.zipCodes.map((zip) => (
              <span
                key={zip}
                className="inline-flex items-center gap-1 rounded-full bg-sheepdog-lime/30 px-3 py-1 text-xs font-medium text-sheepdog-black"
              >
                {zip}
                <button
                  onClick={() => onRemoveZip(zip)}
                  className="ml-0.5 text-gray-500 hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Property types */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Property Types *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PROPERTY_TYPE_OPTIONS.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onTogglePropertyType(type)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm transition-colors",
                  search.propertyTypes.includes(type)
                    ? "border-sheepdog-lime bg-sheepdog-lime/20 font-medium text-sheepdog-black"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Price range */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search.priceMin}
              onChange={(e) => onUpdate("priceMin", e.target.value)}
              placeholder="$200,000"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
            />
            <span className="text-gray-400">&mdash;</span>
            <input
              type="text"
              value={search.priceMax}
              onChange={(e) => onUpdate("priceMax", e.target.value)}
              placeholder="$500,000"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
            />
          </div>
        </div>

        {/* Beds & Baths */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Beds Min
            </label>
            <select
              value={search.bedroomsMin}
              onChange={(e) => onUpdate("bedroomsMin", e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
            >
              {["Any", "1+", "2+", "3+", "4+", "5+"].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Baths Min
            </label>
            <select
              value={search.bathroomsMin}
              onChange={(e) => onUpdate("bathroomsMin", e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
            >
              {["Any", "1+", "2+", "3+"].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex w-full items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <svg
            className={cn(
              "h-4 w-4 transition-transform",
              showAdvanced && "rotate-90"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          Advanced Filters
        </button>

        {/* Advanced Filters content */}
        {showAdvanced && (
          <div className="space-y-4 rounded-xl bg-gray-50 p-4">
            {/* Sqft range */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Square Footage
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={search.sqftMin}
                  onChange={(e) => onUpdate("sqftMin", e.target.value)}
                  placeholder="Min sqft"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
                />
                <span className="text-gray-400">&mdash;</span>
                <input
                  type="text"
                  value={search.sqftMax}
                  onChange={(e) => onUpdate("sqftMax", e.target.value)}
                  placeholder="Max sqft"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
                />
              </div>
            </div>

            {/* Year built */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Year Built After
              </label>
              <input
                type="text"
                value={search.yearBuiltMin}
                onChange={(e) => onUpdate("yearBuiltMin", e.target.value)}
                placeholder="1960"
                maxLength={4}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
              />
            </div>

            {/* Max reno budget */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Max Renovation Budget
              </label>
              <input
                type="text"
                value={search.maxRenoBudget}
                onChange={(e) => onUpdate("maxRenoBudget", e.target.value)}
                placeholder="$50,000"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Include distressed properties
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onUpdate("includeDistressed", !search.includeDistressed)
                  }
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    search.includeDistressed
                      ? "bg-sheepdog-green"
                      : "bg-gray-300"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm",
                      search.includeDistressed && "translate-x-5"
                    )}
                  />
                </button>
              </label>

              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Include vacant properties
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onUpdate("includeVacant", !search.includeVacant)
                  }
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    search.includeVacant
                      ? "bg-sheepdog-green"
                      : "bg-gray-300"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm",
                      search.includeVacant && "translate-x-5"
                    )}
                  />
                </button>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
