"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "Tell Us What You Want",
    description:
      "Set up a search with your criteria — location, price range, property type, and more.",
  },
  {
    number: "2",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "Get Daily AI-Matched Leads",
    description:
      "Our AI scans thousands of properties and delivers your best matches every day.",
  },
  {
    number: "3",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    title: "We Reach Out For You",
    description:
      "Tap \"Interested\" and our AI agent contacts the owner on your behalf. You just show up.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-10 text-center font-headline text-3xl uppercase tracking-wide">
          How It Works
        </h3>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-sheepdog-lime text-sheepdog-black">
                {step.icon}
              </div>
              <div className="mb-1 font-headline text-sm uppercase tracking-wide text-gray-400">
                Step {step.number}
              </div>
              <h4 className="mb-2 font-headline text-lg uppercase tracking-wide">
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
