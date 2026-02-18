import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/shared/ScrollReveal";
import Button from "@/components/shared/Button";

export const metadata: Metadata = {
  title: "O mne",
  description: "Tomáš Kancír - certifikovaný mobilný masér z Prešova.",
};

export default function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-heading mb-6">
              O mne
            </h1>
            <div className="space-y-4 text-heading/80 leading-relaxed text-lg">
              <p>
                Volám sa Tomáš Kancír, som certifikovaný masér s cieľom
                starostlivosť o ľudí — uvoľnením po práci alebo pravidelná
                športová masáž s cieľom zvýšenia športového výkonu.
              </p>
              <p>
                Venujem sa masážam už 2 roky a neustále sa vzdelávam v
                najnovších technikách a trendoch. Pre mňa je každý klient
                jedinečný a potrebuje individuálny prístup — bez toho masáž
                nemá význam.
              </p>
              <p>
                Ako mobilný masér prinášam pohodlie domáceho prostredia do
                masáže. Nemusíte nikam chodiť, ja prídem k vám a postarám sa
                o váš relax.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right - Photo */}
        <ScrollReveal direction="right">
          <div className="flex justify-center">
            <div className="relative w-72 md:w-80">
              <Image
                src="/images/tomas_kancir.webp"
                alt="Tomáš Kancír - mobilný masér"
                width={400}
                height={550}
                className="rounded-3xl shadow-2xl object-cover"
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-primary/10" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* CTA Button */}
      <ScrollReveal>
        <div className="text-center mt-12">
          <Button href="/kontakt">Kontaktujte ma</Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
