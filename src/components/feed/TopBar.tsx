"use client";

import { cn } from "@/lib/utils";
import type { Search } from "@/types/lead";
import type { DateFilter } from "@/hooks/useLeadFeed";

interface TopBarProps {
  activeSearch: Search;
  searches: Search[];
  onSearchChange: (search: Search) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  unreadCount: number;
  onManageSearches: () => void;
}

const dateFilters: { label: string; value: DateFilter }[] = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "this-week" },
];

export function TopBar({
  activeSearch,
  searches,
  onSearchChange,
  dateFilter,
  onDateFilterChange,
  unreadCount,
  onManageSearches,
}: TopBarProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-lg px-4">
        {/* Top row: Logo + Search selector + Unread */}
        <div className="flex items-center justify-between py-3">
          <h1 className="font-headline text-2xl uppercase tracking-wider">
            Sheepdog
          </h1>

          <div className="flex items-center gap-3">
            {/* Search selector */}
            <select
              value={activeSearch.id}
              onChange={(e) => {
                if (e.target.value === "__manage__") {
                  onManageSearches();
                  e.target.value = activeSearch.id;
                  return;
                }
                const s = searches.find((s) => s.id === e.target.value);
                if (s) onSearchChange(s);
              }}
              className="max-w-[180px] rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
            >
              {searches.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
              <option value="__manage__">Manage Searches...</option>
            </select>

            {/* Unread count */}
            {unreadCount > 0 && (
              <span className="rounded-full bg-sheepdog-lime/30 px-3 py-1 text-xs font-semibold text-sheepdog-green">
                {unreadCount} new {unreadCount === 1 ? "lead" : "leads"}
              </span>
            )}
          </div>
        </div>

        {/* Date filter pills */}
        <div className="flex gap-2 pb-3">
          {dateFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onDateFilterChange(filter.value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                dateFilter === filter.value
                  ? "bg-sheepdog-lime text-sheepdog-black"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
