"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Is your ELD FMCSA certified?",
    answer:
      "In compliance with the FMCSA's ELD Mandate, our ELD Compliance Solution is registered and certified by the FMCSA.",
  },
  {
    question: "Do I have to print my logs during an inspection?",
    answer:
      "With our ELD, you're not required to present physical logs. Our ELD is able to transfer data electronically, but screen displays can also be presented if needed.",
  },
  {
    question: "Will your ELD help prevent HOS violations?",
    answer:
      "Legacy ELD is designed to notify drivers, safety officials, and fleet managers of potential violations beforehand.",
  },
  {
    question: "How can drivers create driver vehicle inspection reports (DVIRs)?",
    answer:
      "Drivers can use the Legacy ELD Electronic Logbook App to create DVIRs. The reports can also be accessed by fleet managers through the dashboard.",
  },
  {
    question: "How is driving time recorded?",
    answer:
      "A driver's driving time will be automatically recorded when the driver connects their mobile device to the ELD via Bluetooth and the vehicle is in motion.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="glass-card overflow-hidden rounded-xl transition-all duration-300 hover:border-accent-primary/25">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-white sm:text-base">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-accent-primary" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-white/5 px-5 pb-4 pt-2 sm:px-6 sm:pb-5">
              <p className="text-sm leading-relaxed text-text-muted">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-3 inline-block text-xs font-semibold tracking-[0.3em] text-accent-secondary">
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
