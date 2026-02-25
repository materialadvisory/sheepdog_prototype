"use client";

import { useState, useCallback } from "react";
import { SearchForm } from "@/components/onboarding/SearchForm";
import { createEmptySearch } from "@/types/onboarding";
import type { SearchFormData, PropertyTypeOption } from "@/types/onboarding";
import { Button } from "@/components/ui/Button";

interface SearchFormStandaloneProps {
  onSubmit: (search: SearchFormData) => void;
  onCancel: () => void;
}

export function SearchFormStandalone({ onSubmit, onCancel }: SearchFormStandaloneProps) {
  const [search, setSearch] = useState<SearchFormData>(createEmptySearch());

  const updateField = useCallback(
    (field: keyof SearchFormData, value: string | string[] | boolean | PropertyTypeOption[]) => {
      setSearch((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addZip = useCallback((zip: string) => {
    setSearch((prev) => ({ ...prev, zipCodes: [...prev.zipCodes, zip] }));
  }, []);

  const removeZip = useCallback((zip: string) => {
    setSearch((prev) => ({
      ...prev,
      zipCodes: prev.zipCodes.filter((z) => z !== zip),
    }));
  }, []);

  const addArea = useCallback((area: string) => {
    setSearch((prev) => ({ ...prev, areas: [...prev.areas, area] }));
  }, []);

  const removeArea = useCallback((area: string) => {
    setSearch((prev) => ({
      ...prev,
      areas: prev.areas.filter((a) => a !== area),
    }));
  }, []);

  const togglePropertyType = useCallback((type: PropertyTypeOption) => {
    setSearch((prev) => {
      const types = prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type];
      return { ...prev, propertyTypes: types };
    });
  }, []);

  const isValid =
    search.label.trim() !== "" &&
    search.state !== "" &&
    search.propertyTypes.length > 0;

  return (
    <div>
      <SearchForm
        search={search}
        index={0}
        canRemove={false}
        onUpdate={updateField}
        onAddZip={addZip}
        onRemoveZip={removeZip}
        onAddArea={addArea}
        onRemoveArea={removeArea}
        onTogglePropertyType={togglePropertyType}
        onRemove={() => {}}
        hideHeader
      />
      <div className="mt-4 flex gap-2">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={() => isValid && onSubmit(search)}
          disabled={!isValid}
          className="flex-1"
        >
          Create Search
        </Button>
      </div>
    </div>
  );
}
