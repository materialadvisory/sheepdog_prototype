"use client";

import { Button } from "@/components/ui/Button";

interface ActionButtonsProps {
  onInterested: () => void;
  onDismiss: () => void;
}

export function ActionButtons({
  onInterested,
  onDismiss,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-3">
      <Button variant="secondary" onClick={onDismiss} className="flex-1">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 01-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5 2.5 2.5 0 0010 22a.94.94 0 00.923-.756l.244-1.219a4.5 4.5 0 011.18-2.212l.224-.223a4.5 4.5 0 00.715-5.33l-.36-.72a3 3 0 01-.3-1.306V8.5" />
        </svg>
        Not For Me
      </Button>
      <Button variant="primary" onClick={onInterested} className="flex-1">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3.2a.755.755 0 01.76-.76 2.3 2.3 0 012.3 2.3c0 1.585-.49 3.236-1.236 4.53a.5.5 0 00.434.75h3.143c1.192 0 2.156.966 2.072 2.155a13.876 13.876 0 01-.68 3.337 1.997 1.997 0 01-1.893 1.388H14.25M6.633 10.5H4.5a2.25 2.25 0 00-2.25 2.25v5.5A2.25 2.25 0 004.5 20.5h2.133M6.633 10.5v10" />
        </svg>
        Interested
      </Button>
    </div>
  );
}
