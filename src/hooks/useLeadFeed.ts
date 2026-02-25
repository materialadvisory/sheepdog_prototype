"use client";

import { useState, useMemo, useCallback } from "react";
import { mockLeadsBySearch, defaultMockLeads, searches } from "@/data/mockLeads";
import type { PropertyLead, DismissReason, InterestedAction, Search } from "@/types/lead";

export type DateFilter = "today" | "yesterday" | "this-week";

export function useLeadFeed() {
  const [leadsBySearch, setLeadsBySearch] = useState<Record<string, PropertyLead[]>>(mockLeadsBySearch);
  const [allSearches, setAllSearches] = useState<Search[]>(searches);
  const [activeSearch, setActiveSearch] = useState<Search>(searches[0]);
  const [dateFilter, setDateFilter] = useState<DateFilter>("this-week");
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [showDismissSheet, setShowDismissSheet] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);
  const [showSearchManager, setShowSearchManager] = useState(false);

  // Get date strings for filtering
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  // Get leads for the active search
  const currentLeads = useMemo(() => {
    return leadsBySearch[activeSearch.id] || defaultMockLeads;
  }, [leadsBySearch, activeSearch.id]);

  // Filter leads by date and status
  const visibleLeads = useMemo(() => {
    return currentLeads.filter((lead) => {
      if (lead.status === "dismissed") return false;
      if (dateFilter === "today") return lead.dateSourced === today;
      if (dateFilter === "yesterday") return lead.dateSourced === yesterday;
      return true;
    });
  }, [currentLeads, dateFilter, today, yesterday]);

  // Count of new (unactioned) leads for active search
  const unreadCount = useMemo(() => {
    return currentLeads.filter((l) => l.status === "new").length;
  }, [currentLeads]);

  const markInterested = useCallback((leadId: string) => {
    setLeadsBySearch((prev) => ({
      ...prev,
      [activeSearch.id]: (prev[activeSearch.id] || []).map((l) =>
        l.id === leadId ? { ...l, status: "interested" as const } : l
      ),
    }));
    setShowConfirmation(leadId);
  }, [activeSearch.id]);

  const setInterestedAction = useCallback((leadId: string, action: InterestedAction) => {
    setLeadsBySearch((prev) => ({
      ...prev,
      [activeSearch.id]: (prev[activeSearch.id] || []).map((l) =>
        l.id === leadId ? { ...l, interestedAction: action } : l
      ),
    }));
    setShowConfirmation(null);
  }, [activeSearch.id]);

  const dismissLead = useCallback((leadId: string, reason: DismissReason, customText?: string) => {
    setLeadsBySearch((prev) => ({
      ...prev,
      [activeSearch.id]: (prev[activeSearch.id] || []).map((l) =>
        l.id === leadId
          ? { ...l, status: "dismissed" as const, dismissReason: reason, dismissReasonText: customText }
          : l
      ),
    }));
    setShowDismissSheet(null);
  }, [activeSearch.id]);

  // Search management
  const addSearch = useCallback((search: Search) => {
    setAllSearches((prev) => [...prev, search]);
    setLeadsBySearch((prev) => ({
      ...prev,
      [search.id]: defaultMockLeads.map((l) => ({ ...l, id: `${l.id}-${search.id}` })),
    }));
  }, []);

  const deleteSearch = useCallback(
    (searchId: string) => {
      setAllSearches((prev) => prev.filter((s) => s.id !== searchId));
      if (activeSearch.id === searchId) {
        setAllSearches((prev) => {
          if (prev.length > 0) setActiveSearch(prev[0]);
          return prev;
        });
      }
    },
    [activeSearch.id]
  );

  const updateSearch = useCallback((searchId: string, label: string) => {
    setAllSearches((prev) =>
      prev.map((s) => (s.id === searchId ? { ...s, label } : s))
    );
  }, []);

  return {
    leads: visibleLeads,
    allLeads: currentLeads,
    activeSearch,
    setActiveSearch,
    searches: allSearches,
    dateFilter,
    setDateFilter,
    unreadCount,
    expandedLeadId,
    setExpandedLeadId,
    showDismissSheet,
    setShowDismissSheet,
    showConfirmation,
    setShowConfirmation,
    showSearchManager,
    setShowSearchManager,
    markInterested,
    setInterestedAction,
    dismissLead,
    addSearch,
    deleteSearch,
    updateSearch,
  };
}
