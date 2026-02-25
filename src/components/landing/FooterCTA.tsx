"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function FooterCTA() {
  return (
    <section className="bg-sheepdog-lime px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h3 className="mb-3 font-headline text-3xl uppercase tracking-wide text-sheepdog-black sm:text-4xl">
          Ready To Find Your Next Property?
        </h3>
        <p className="mb-8 text-gray-700">
          Set up your search in minutes. Your AI agent starts working
          immediately.
        </p>
        <Link href="/onboarding">
          <Button className="bg-sheepdog-black px-8 py-4 text-base text-white hover:bg-gray-900">
            Get Started &mdash; It&apos;s Free
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
