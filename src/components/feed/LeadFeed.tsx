"use client";

import { useLeadFeed } from "@/hooks/useLeadFeed";
import { TopBar } from "./TopBar";
import { LeadCard } from "./LeadCard";
import { EmptyState } from "./EmptyState";
import { SourcingState } from "./SourcingState";
import { SearchManager } from "./SearchManager";
import { LeadCardExpanded } from "./LeadCardExpanded";
import { DismissReasonSheet } from "./DismissReasonSheet";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { AnimatePresence, motion } from "framer-motion";

export function LeadFeed() {
  const feed = useLeadFeed();

  // Check if we should show the sourcing state (no leads at all, not just filtered)
  const isSourcing = feed.allLeads.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        activeSearch={feed.activeSearch}
        searches={feed.searches}
        onSearchChange={feed.setActiveSearch}
        dateFilter={feed.dateFilter}
        onDateFilterChange={feed.setDateFilter}
        unreadCount={feed.unreadCount}
        onManageSearches={() => feed.setShowSearchManager(true)}
      />

      <main className="mx-auto max-w-lg px-4 pb-8 pt-4">
        {isSourcing ? (
          <SourcingState
            searchLabel={feed.activeSearch.label}
            onManageSearches={() => feed.setShowSearchManager(true)}
          />
        ) : feed.leads.length === 0 ? (
          <EmptyState
            variant="caught-up"
            searchLabel={feed.activeSearch.label}
          />
        ) : (
          <AnimatePresence mode="popLayout">
            {feed.leads.map((lead, index) => (
              <motion.div
                key={lead.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -300, transition: { duration: 0.3 } }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
              >
                <LeadCard
                  lead={lead}
                  onInterested={() => feed.markInterested(lead.id)}
                  onDismiss={() => feed.setShowDismissSheet(lead.id)}
                  onExpand={() => feed.setExpandedLeadId(lead.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </main>

      {/* Expanded card detail modal */}
      <AnimatePresence>
        {feed.expandedLeadId && (
          <LeadCardExpanded
            lead={feed.allLeads.find((l) => l.id === feed.expandedLeadId)!}
            onClose={() => feed.setExpandedLeadId(null)}
          />
        )}
      </AnimatePresence>

      {/* Dismiss reason bottom sheet */}
      <AnimatePresence>
        {feed.showDismissSheet && (
          <DismissReasonSheet
            onSelect={(reason) =>
              feed.dismissLead(feed.showDismissSheet!, reason)
            }
            onClose={() => feed.setShowDismissSheet(null)}
          />
        )}
      </AnimatePresence>

      {/* Confirmation dialog */}
      <AnimatePresence>
        {feed.showConfirmation && (
          <ConfirmationDialog
            onClose={() => feed.setShowConfirmation(null)}
          />
        )}
      </AnimatePresence>

      {/* Search manager modal */}
      <AnimatePresence>
        {feed.showSearchManager && (
          <SearchManager
            searches={feed.searches}
            onClose={() => feed.setShowSearchManager(false)}
            onAdd={feed.addSearch}
            onDelete={feed.deleteSearch}
            onUpdate={feed.updateSearch}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
