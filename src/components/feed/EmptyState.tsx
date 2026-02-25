"use client";

interface EmptyStateProps {
  variant: "sourcing" | "caught-up" | "no-saved" | "no-reaching-out";
  searchLabel: string;
}

export function EmptyState({ variant, searchLabel }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      {variant === "sourcing" ? (
        <>
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
      ) : variant === "caught-up" ? (
        <>
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
      ) : variant === "no-reaching-out" ? (
        <>
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sheepdog-lime/30">
            <svg className="h-8 w-8 text-sheepdog-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h3 className="mb-2 font-headline text-xl uppercase tracking-wide">
            No Outreach Yet
          </h3>
          <p className="max-w-xs text-sm text-gray-500">
            When you ask us to reach out to property owners, they&apos;ll show
            up here so you can track progress.
          </p>
        </>
      ) : (
        <>
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sheepdog-blue/30">
            <svg className="h-8 w-8 text-sheepdog-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </div>
          <h3 className="mb-2 font-headline text-xl uppercase tracking-wide">
            No Saved Leads
          </h3>
          <p className="max-w-xs text-sm text-gray-500">
            Save properties from your feed to review them later. They&apos;ll
            appear here.
          </p>
        </>
      )}
    </div>
  );
}
