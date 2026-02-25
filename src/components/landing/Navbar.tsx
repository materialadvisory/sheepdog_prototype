"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <h1 className="font-headline text-2xl uppercase tracking-wider">
          Sheepdog
        </h1>
        <Link href="/onboarding">
          <Button>Get Started</Button>
        </Link>
      </div>
    </nav>
  );
}
