import type { Metadata } from "next";
import ContactSection from "@/components/shared/ContactSection";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktujte ma - Tomáš Kancír, mobilný masér v Prešove.",
};

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-heading">Kontakt</h1>
          <p className="mt-3 text-lg text-hover">Napíšte mi a spoločne nájdeme vhodný termín pre vašu masáž.</p>
        </div>
      </ScrollReveal>
      <ContactSection />
    </section>
  );
}