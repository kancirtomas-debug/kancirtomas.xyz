import type { Metadata } from "next";
import ReviewCarousel from "@/components/shared/ReviewCarousel";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Recenzie",
  description: "Recenzie a skúsenosti klientov - Tomáš Kancír, mobilný masér.",
};

export default function ReviewsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-heading">Recenzie</h1>
          <p className="mt-3 text-lg text-hover">Prečítajte si, čo hovoria naši spokojní klienti.</p>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <ReviewCarousel />
      </ScrollReveal>
    </section>
  );
}