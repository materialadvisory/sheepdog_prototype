"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-sheepdog-black px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 font-headline text-5xl uppercase leading-tight tracking-wide text-sheepdog-lime sm:text-7xl"
        >
          Stop Hunting
          <br />
          For Deals.
          <br />
          <span className="text-white">Let Deals</span>
          <br />
          <span className="text-white">Find You.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 max-w-md text-lg text-gray-400"
        >
          AI-matched properties delivered daily. Tell us what you want. We find
          it and reach out to owners for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/onboarding">
            <Button className="px-8 py-4 text-base">
              Get Started &mdash; It&apos;s Free
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
