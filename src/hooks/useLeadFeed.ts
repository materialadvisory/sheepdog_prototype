"use client";

import { useState, useMemo, useCallback } from "react";
import { mockLeads, searches } from "@/data/mockLeads";
import type { PropertyLead, DismissReason, Search } from "@/types/lead";

export type DateFilter = "today" | "yesterday" | "this-week";

export function useLeadFeed() {
  const [leads, setLeads] = useState<PropertyLead[]>(mockLeads);
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

  // Filter leads by date and status
  const visibleLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (lead.status === "dismissed") return false;
      if (dateFilter === "today") return lead.dateSourced === today;
      if (dateFilter === "yesterday") return lead.dateSourced === yesterday;
      return true;
    });
  }, [leads, dateFilter, today, yesterday]);

  // Count of new (unactioned) leads
  const unreadCount = useMemo(() => {
    return leads.filter((l) => l.status === "new").length;
  }, [leads]);

  const markInterested = useCallback((leadId: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId ? { ...l, status: "interested" as const } : l
      )
    );
    setShowConfirmation(leadId);
  }, []);

  const dismissLead = useCallback((leadId: string, reason: DismissReason) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, status: "dismissed" as const, dismissReason: reason }
          : l
      )
    );
    setShowDismissSheet(null);
  }, []);

  // Search management
  const addSearch = useCallback((search: Search) => {
    setAllSearches((prev) => [...prev, search]);
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
    allLeads: leads,
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
    dismissLead,
    addSearch,
    deleteSearch,
    updateSearch,
  };
}
