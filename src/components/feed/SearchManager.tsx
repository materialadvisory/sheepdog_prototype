"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SearchFormStandalone } from "@/components/shared/SearchFormStandalone";
import type { Search } from "@/types/lead";
import type { SearchFormData } from "@/types/onboarding";

interface SearchManagerProps {
  searches: Search[];
  onClose: () => void;
  onAdd: (search: Search) => void;
  onDelete: (searchId: string) => void;
  onUpdate: (searchId: string, updatedSearch: Search) => void;
}

export function SearchManager({
  searches,
  onClose,
  onAdd,
  onDelete,
  onUpdate,
}: SearchManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleAddSearch = (formData: SearchFormData) => {
    onAdd(formData);
    setShowAddForm(false);
  };

  const handleEditSearch = (searchId: string, formData: SearchFormData) => {
    onUpdate(searchId, { ...formData, id: searchId });
    setEditingId(null);
  };

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
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 pb-8 sm:rounded-2xl"
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

        {/* Existing searches */}
        <div className="space-y-3">
          {searches.map((search) => (
            <div key={search.id}>
              {editingId === search.id ? (
                <div className="rounded-2xl border border-sheepdog-lime/50 bg-gray-50 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-600">
                    Editing: {search.label}
                  </h4>
                  <SearchFormStandalone
                    initialData={search}
                    onSubmit={(updated) => handleEditSearch(search.id, updated)}
                    onCancel={() => setEditingId(null)}
                    submitLabel="Save Changes"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                  <span className="text-sm font-medium text-gray-700">
                    {search.label}
                  </span>

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
                          setShowAddForm(false);
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
              )}
            </div>
          ))}
        </div>

        {/* Add new search — full form */}
        {showAddForm ? (
          <div className="mt-4">
            <h4 className="mb-3 font-headline text-base uppercase tracking-wide">
              New Search
            </h4>
            <SearchFormStandalone
              onSubmit={handleAddSearch}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId(null);
            }}
            className="mt-3 w-full rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-medium text-gray-400 transition-colors hover:border-sheepdog-lime hover:text-sheepdog-green"
          >
            + Add New Search
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
