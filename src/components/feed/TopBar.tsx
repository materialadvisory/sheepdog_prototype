"use client";

import { cn } from "@/lib/utils";
import type { Search } from "@/types/lead";
import type { DateFilter, FeedView } from "@/hooks/useLeadFeed";

interface TopBarProps {
  activeSearch: Search;
  searches: Search[];
  onSearchChange: (search: Search) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  feedView: FeedView;
  onFeedViewChange: (view: FeedView) => void;
  unreadCount: number;
  reachingOutCount: number;
  savedCount: number;
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
  feedView,
  onFeedViewChange,
  unreadCount,
  reachingOutCount,
  savedCount,
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
            {/* Search selector with label */}
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Searches
              </span>
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
            </div>

            {/* Unread count */}
            {unreadCount > 0 && (
              <span className="rounded-full bg-sheepdog-lime/30 px-3 py-1 text-xs font-semibold text-sheepdog-green">
                {unreadCount} new {unreadCount === 1 ? "lead" : "leads"}
              </span>
            )}
          </div>
        </div>

        {/* Feed / Reaching Out / Saved tabs — underline style */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => onFeedViewChange("feed")}
            className={cn(
              "relative px-4 py-2.5 text-sm font-semibold transition-colors",
              feedView === "feed"
                ? "text-sheepdog-black"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            Feed
            {feedView === "feed" && (
              <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-sheepdog-lime" />
            )}
          </button>
          <button
            onClick={() => onFeedViewChange("reaching-out")}
            className={cn(
              "relative px-4 py-2.5 text-sm font-semibold transition-colors",
              feedView === "reaching-out"
                ? "text-sheepdog-black"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            Reaching Out
            {reachingOutCount > 0 && (
              <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sheepdog-green/15 px-1.5 text-xs font-semibold text-sheepdog-green">
                {reachingOutCount}
              </span>
            )}
            {feedView === "reaching-out" && (
              <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-sheepdog-green" />
            )}
          </button>
          <button
            onClick={() => onFeedViewChange("saved")}
            className={cn(
              "relative px-4 py-2.5 text-sm font-semibold transition-colors",
              feedView === "saved"
                ? "text-sheepdog-black"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            Saved
            {savedCount > 0 && (
              <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sheepdog-blue/15 px-1.5 text-xs font-semibold text-sheepdog-blue">
                {savedCount}
              </span>
            )}
            {feedView === "saved" && (
              <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-sheepdog-blue" />
            )}
          </button>
        </div>

        {/* Date filter pills — only in feed view */}
        {feedView === "feed" && (
          <div className="flex gap-2 pt-2.5 pb-3">
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
        )}
      </div>
    </div>
  );
}
