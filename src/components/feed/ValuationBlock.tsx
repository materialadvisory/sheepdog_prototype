"use client";

import { formatCurrency, formatDate } from "@/lib/utils";

interface ValuationBlockProps {
  estimatedValue: number;
  lastSalePrice: number;
  lastSaleDate: string;
  taxAssessedValue: number;
}

export function ValuationBlock({
  estimatedValue,
  lastSalePrice,
  lastSaleDate,
  taxAssessedValue,
}: ValuationBlockProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-gray-500">Estimated Value</span>
        <span className="text-lg font-bold text-sheepdog-black">
          {formatCurrency(estimatedValue)}
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-gray-400">Last Sale</span>
        <span className="text-sm text-gray-600">
          {formatCurrency(lastSalePrice)}{" "}
          <span className="text-gray-400">({formatDate(lastSaleDate)})</span>
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-gray-400">Tax Assessed</span>
        <span className="text-sm text-gray-600">
          {formatCurrency(taxAssessedValue)}
        </span>
      </div>
    </div>
  );
}
