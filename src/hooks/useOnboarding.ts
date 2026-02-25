"use client";

import { useState, useCallback } from "react";
import type {
  ProfileData,
  SearchFormData,
  ChannelPreference,
  OnboardingData,
  BuyerIntent,
  PropertyTypeOption,
} from "@/types/onboarding";
import { createEmptySearch } from "@/types/onboarding";

export function useOnboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Step 1: Profile
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "",
    companyName: "",
    phone: "",
    buyerIntent: [],
  });

  // Step 2: Searches
  const [searches, setSearches] = useState<SearchFormData[]>([
    createEmptySearch(),
  ]);

  // Step 3: Channel
  const [channel, setChannel] = useState<ChannelPreference>("email");

  // Navigation
  const goNext = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  }, []);

  const goBack = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Profile updates
  const updateProfile = useCallback(
    (field: keyof ProfileData, value: string) => {
      setProfile((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleBuyerIntent = useCallback((intent: BuyerIntent) => {
    setProfile((prev) => {
      const intents = prev.buyerIntent.includes(intent)
        ? prev.buyerIntent.filter((i) => i !== intent)
        : [...prev.buyerIntent, intent];
      return { ...prev, buyerIntent: intents };
    });
  }, []);

  // Search updates
  const updateSearch = useCallback(
    (index: number, field: keyof SearchFormData, value: string | string[] | boolean | PropertyTypeOption[]) => {
      setSearches((prev) =>
        prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
      );
    },
    []
  );

  const addSearch = useCallback(() => {
    setSearches((prev) => [...prev, createEmptySearch()]);
  }, []);

  const removeSearch = useCallback((index: number) => {
    setSearches((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Zip code helpers
  const addZipCode = useCallback((searchIndex: number, zip: string) => {
    setSearches((prev) =>
      prev.map((s, i) =>
        i === searchIndex
          ? { ...s, zipCodes: [...s.zipCodes, zip] }
          : s
      )
    );
  }, []);

  const removeZipCode = useCallback((searchIndex: number, zip: string) => {
    setSearches((prev) =>
      prev.map((s, i) =>
        i === searchIndex
          ? { ...s, zipCodes: s.zipCodes.filter((z) => z !== zip) }
          : s
      )
    );
  }, []);

  // Area helpers
  const addArea = useCallback((searchIndex: number, area: string) => {
    setSearches((prev) =>
      prev.map((s, i) =>
        i === searchIndex
          ? { ...s, areas: [...s.areas, area] }
          : s
      )
    );
  }, []);

  const removeArea = useCallback((searchIndex: number, area: string) => {
    setSearches((prev) =>
      prev.map((s, i) =>
        i === searchIndex
          ? { ...s, areas: s.areas.filter((a) => a !== area) }
          : s
      )
    );
  }, []);

  // Property type toggle
  const togglePropertyType = useCallback(
    (searchIndex: number, type: PropertyTypeOption) => {
      setSearches((prev) =>
        prev.map((s, i) => {
          if (i !== searchIndex) return s;
          const types = s.propertyTypes.includes(type)
            ? s.propertyTypes.filter((t) => t !== type)
            : [...s.propertyTypes, type];
          return { ...s, propertyTypes: types };
        })
      );
    },
    []
  );

  // Validation
  const isStep1Valid = profile.fullName.trim() !== "" && profile.buyerIntent.length > 0;

  const isStep2Valid = searches.length > 0 && searches.every(
    (s) => s.label.trim() !== "" && s.state !== "" && s.propertyTypes.length > 0
  );

  // Get final data
  const getOnboardingData = useCallback((): OnboardingData => {
    return { profile, searches, channel };
  }, [profile, searches, channel]);

  return {
    step,
    totalSteps,
    goNext,
    goBack,
    profile,
    updateProfile,
    toggleBuyerIntent,
    searches,
    updateSearch,
    addSearch,
    removeSearch,
    addZipCode,
    removeZipCode,
    addArea,
    removeArea,
    togglePropertyType,
    channel,
    setChannel,
    isStep1Valid,
    isStep2Valid,
    getOnboardingData,
  };
}
