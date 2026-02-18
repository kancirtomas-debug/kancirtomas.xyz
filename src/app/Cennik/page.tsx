"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { pricingData } from "@/lib/pricing-data";

const typeToId: Record<string, string> = {
  "Klasická masáž": "klasicka",
  "Klasická masáž s prvkami Športovej masáže": "sportova",
  "Klasická masáž s použitím Bankovej terapie": "bankova",
  "Klasická masáž s prvkami Mäkkých techník": "makke-techniky",
};

export default function PricingPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold text-heading text-center mb-4">
          Cenník
        </h1>
        <p className="text-center text-hover mb-12">
          Kliknite na cenu pre rýchlu rezerváciu.
        </p>
      </ScrollReveal>

      <div className="space-y-6">
        {pricingData.map((item, i) => {
          const massageId = typeToId[item.type] || "klasicka";
          return (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-accent/20 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <h2 className="text-xl md:text-2xl font-bold text-heading mb-4">
                  {item.type}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {item.durations.map((d, j) => (
                    <Link
                      key={j}
                      href={`/rezervacny-kalendar?type=${massageId}&duration=${d.minutes}`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-between sm:flex-col sm:items-center bg-accent/20 hover:bg-primary hover:text-white rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer group"
                      >
                        <span className="text-heading/70 font-medium group-hover:text-white/80">
                          {d.minutes} min
                        </span>
                        <span className="text-2xl font-bold text-primary group-hover:text-white">
                          {d.price}€
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
