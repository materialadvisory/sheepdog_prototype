"use client";

interface PropertySpecsProps {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
}

export function PropertySpecs({
  bedrooms,
  bathrooms,
  sqft,
  yearBuilt,
}: PropertySpecsProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
      <span className="flex items-center gap-1">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        {bedrooms} BD
      </span>
      <span className="text-gray-300">|</span>
      <span>{bathrooms} BA</span>
      <span className="text-gray-300">|</span>
      <span>{sqft.toLocaleString()} sqft</span>
      <span className="text-gray-300">|</span>
      <span>Built {yearBuilt}</span>
    </div>
  );
}
