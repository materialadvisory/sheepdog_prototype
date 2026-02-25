"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "1,000+", label: "Properties Matched" },
  { value: "92%", label: "Match Accuracy" },
  { value: "< 24hrs", label: "First Leads" },
];

export function SocialProof() {
  return (
    <section className="bg-gray-50 px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="mb-1 font-headline text-3xl uppercase tracking-wide text-sheepdog-black sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
