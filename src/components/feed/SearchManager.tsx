"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { Search } from "@/types/lead";

interface SearchManagerProps {
  searches: Search[];
  onClose: () => void;
  onAdd: (search: Search) => void;
  onDelete: (searchId: string) => void;
  onUpdate: (searchId: string, label: string) => void;
}

export function SearchManager({
  searches,
  onClose,
  onAdd,
  onDelete,
  onUpdate,
}: SearchManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-2xl bg-white p-5 pb-8 sm:rounded-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-headline text-lg uppercase tracking-wide">
            Manage Searches
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          {searches.map((search) => (
            <div
              key={search.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3"
            >
              {editingId === search.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => {
                    if (editValue.trim()) onUpdate(search.id, editValue.trim());
                    setEditingId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (editValue.trim())
                        onUpdate(search.id, editValue.trim());
                      setEditingId(null);
                    }
                  }}
                  autoFocus
                  className="flex-1 rounded-lg border border-sheepdog-lime px-2 py-1 text-sm focus:outline-none"
                />
              ) : (
                <span className="text-sm font-medium text-gray-700">
                  {search.label}
                </span>
              )}

              {confirmDelete === search.id ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onDelete(search.id);
                      setConfirmDelete(null);
                    }}
                    className="text-xs font-medium text-red-500 hover:text-red-700"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingId(search.id);
                      setEditValue(search.label);
                    }}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Edit
                  </button>
                  {searches.length > 1 && (
                    <button
                      onClick={() => setConfirmDelete(search.id)}
                      className="text-xs text-gray-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add new search */}
        {showAddForm ? (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Search name..."
              autoFocus
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-sheepdog-lime focus:outline-none focus:ring-1 focus:ring-sheepdog-lime"
            />
            <Button
              onClick={() => {
                if (newLabel.trim()) {
                  onAdd({
                    id: `search-${Date.now()}`,
                    label: newLabel.trim(),
                  });
                  setNewLabel("");
                  setShowAddForm(false);
                }
              }}
            >
              Add
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-3 w-full rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-medium text-gray-400 transition-colors hover:border-sheepdog-lime hover:text-sheepdog-green"
          >
            + Add New Search
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
