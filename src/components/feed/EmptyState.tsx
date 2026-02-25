"use client";

interface EmptyStateProps {
  variant: "sourcing" | "caught-up";
  searchLabel: string;
}

export function EmptyState({ variant, searchLabel }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      {variant === "sourcing" ? (
        <>
          {/* Searching icon */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sheepdog-lime/30">
            <svg className="h-8 w-8 text-sheepdog-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="mb-2 font-headline text-xl uppercase tracking-wide">
            Sourcing Your Leads
          </h3>
          <p className="max-w-xs text-sm text-gray-500">
            We&apos;re sourcing leads for &ldquo;{searchLabel}&rdquo;. Your
            first matches should arrive within 24 hours.
          </p>
        </>
      ) : (
        <>
          {/* Checkmark icon */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sheepdog-lime/30">
            <svg className="h-8 w-8 text-sheepdog-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-2 font-headline text-xl uppercase tracking-wide">
            You&apos;re All Caught Up
          </h3>
          <p className="max-w-xs text-sm text-gray-500">
            You&apos;ve reviewed all your leads. New matches arrive tomorrow
            morning.
          </p>
        </>
      )}
    </div>
  );
}
