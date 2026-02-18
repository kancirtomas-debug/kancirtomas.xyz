"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Button from "@/components/shared/Button";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-tight"
          >
            Mobilný masér
            <br />
            <span className="text-primary">Tomáš Kancír</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-heading/70 leading-relaxed max-w-lg"
          >
            Relaxujte s profesionálnymi masážami v pohodlí vášho domova. Po
            práci, po ťažkom týždni, po zápase — doprajte svojmu telu
            regeneráciu ktorú si zaslúži.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Button href="/rezervacny-system">Objednať sa</Button>
          </motion.div>
        </div>

        {/* Right - Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-72 md:w-80 lg:w-96">
            <Image
              src="/images/tomas_kancir.webp"
              alt="Tomáš Kancír - mobilný masér"
              width={400}
              height={550}
              priority
              className="rounded-3xl shadow-2xl object-cover"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-primary/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
