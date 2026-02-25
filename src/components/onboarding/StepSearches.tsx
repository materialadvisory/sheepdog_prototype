"use client";

import { SearchForm } from "./SearchForm";
import type { SearchFormData, PropertyTypeOption } from "@/types/onboarding";

interface StepSearchesProps {
  searches: SearchFormData[];
  onUpdate: (index: number, field: keyof SearchFormData, value: string | string[] | boolean | PropertyTypeOption[]) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onAddZip: (searchIndex: number, zip: string) => void;
  onRemoveZip: (searchIndex: number, zip: string) => void;
  onAddArea: (searchIndex: number, area: string) => void;
  onRemoveArea: (searchIndex: number, area: string) => void;
  onTogglePropertyType: (searchIndex: number, type: PropertyTypeOption) => void;
}

export function StepSearches({
  searches,
  onUpdate,
  onAdd,
  onRemove,
  onAddZip,
  onRemoveZip,
  onAddArea,
  onRemoveArea,
  onTogglePropertyType,
}: StepSearchesProps) {
  return (
    <div>
      <h2 className="mb-2 font-headline text-2xl uppercase tracking-wide">
        What Are You Looking For?
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        Set up your first search. You can always add more later.
      </p>

      <div className="space-y-4">
        {searches.map((search, index) => (
          <SearchForm
            key={search.id}
            search={search}
            index={index}
            canRemove={searches.length > 1}
            onUpdate={(field, value) => onUpdate(index, field, value)}
            onAddZip={(zip) => onAddZip(index, zip)}
            onRemoveZip={(zip) => onRemoveZip(index, zip)}
            onAddArea={(area) => onAddArea(index, area)}
            onRemoveArea={(area) => onRemoveArea(index, area)}
            onTogglePropertyType={(type) => onTogglePropertyType(index, type)}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>

      <button
        onClick={onAdd}
        className="mt-4 w-full rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-medium text-gray-400 transition-colors hover:border-sheepdog-lime hover:text-sheepdog-green"
      >
        + Add Another Search
      </button>
    </div>
  );
}
