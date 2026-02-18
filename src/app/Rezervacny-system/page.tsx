"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { reservationMassageTypes } from "@/lib/massage-data";

const durationOptions: Record<string, { minutes: number; price: number }[]> = {
  klasicka: [
    { minutes: 60, price: 40 },
    { minutes: 90, price: 55 },
    { minutes: 120, price: 80 },
  ],
  sportova: [
    { minutes: 60, price: 45 },
    { minutes: 90, price: 60 },
    { minutes: 120, price: 90 },
  ],
  bankova: [{ minutes: 60, price: 60 }],
  "makke-techniky": [{ minutes: 60, price: 60 }],
};
export default function ReservationSystemPage() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMassageClick = (massageId: string) => {
    const options = durationOptions[massageId];
    if (options && options.length > 1) {
      setOpenDropdown(openDropdown === massageId ? null : massageId);
    } else {
      const duration = options?.[0]?.minutes || 60;
      router.push(`/rezervacny-kalendar?type=${massageId}&duration=${duration}`);
    }
  };

  const handleDurationSelect = (massageId: string, minutes: number) => {
    router.push(`/rezervacny-kalendar?type=${massageId}&duration=${minutes}`);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold text-heading text-center mb-4">
          Rezervačný systém
        </h1>
        <p className="text-center text-hover mb-12">
          Vyberte si typ masáže a rezervujte si termín.
        </p>
      </ScrollReveal>
      <div className="space-y-6">
        {reservationMassageTypes.map((massage, i) => {
          const options = durationOptions[massage.id] || [];
          const hasDurationChoice = options.length > 1;
          const isOpen = openDropdown === massage.id;

          return (
            <ScrollReveal key={massage.id} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(69,9,32,0.15)" }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl border border-accent/20 hover:border-primary/30 transition-colors duration-300 overflow-hidden"
              >
                <div onClick={() => handleMassageClick(massage.id)} className="p-8 cursor-pointer">
                  <h2 className="text-2xl font-bold text-heading mb-2">{massage.title}</h2>
                  <p className="text-primary font-semibold text-sm mb-4">{massage.prices}</p>
                  <p className="text-heading/70 leading-relaxed">{massage.description}</p>
                  <div className="mt-4 flex items-center text-primary font-medium text-sm">
                    <span>{hasDurationChoice ? "Vybrať dĺžku masáže" : "Vybrať termín"}</span>
                    <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <AnimatePresence>
                  {isOpen && hasDurationChoice && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 pt-0">
                        <div className="border-t border-accent/20 pt-4">
                          <p className="text-sm font-medium text-heading/60 mb-3">Vyberte dĺžku masáže:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {options.map((opt) => (
                              <motion.button
                                key={opt.minutes}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={(e) => { e.stopPropagation(); handleDurationSelect(massage.id, opt.minutes); }}
                                className="flex items-center justify-between sm:flex-col sm:items-center bg-accent/20 hover:bg-primary hover:text-white rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer group"
                              >
                                <span className="font-medium group-hover:text-white/80">{opt.minutes} min</span>
                                <span className="text-xl font-bold text-primary group-hover:text-white">{opt.price}€</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}