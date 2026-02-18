import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Vzdelanie",
  description: "Certifikáty a vzdelanie - Tomáš Kancír, mobilný masér.",
};

const certificates = [
  { src: "/images/certifikat1.webp", alt: "Certifikát 1" },
  { src: "/images/certifikat2.webp", alt: "Certifikát 2" },
  { src: "/images/certifikat3.webp", alt: "Certifikát 3" },
  { src: "/images/certifikat4.webp", alt: "Certifikát 4" },
  { src: "/images/certifikat5.webp", alt: "Certifikát 5" },
  { src: "/images/certifikat6.webp", alt: "Certifikát 6" },
  { src: "/images/certifikat7.webp", alt: "Certifikát 7" },
];
export default function EducationPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold text-heading text-center mb-12">Vzdelanie</h1>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl">
            <Image src={certificates[0].src} alt={certificates[0].alt} width={800} height={600} className="rounded-2xl shadow-lg w-full h-auto hover:shadow-2xl transition-shadow duration-300" />
          </div>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 max-w-4xl mx-auto">
        {certificates.slice(1, 4).map((cert, i) => (
          <ScrollReveal key={i} delay={0.1 + i * 0.1}>
            <Image src={cert.src} alt={cert.alt} width={400} height={300} className="rounded-xl shadow-md w-full h-auto hover:shadow-xl transition-shadow duration-300" />
          </ScrollReveal>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {certificates.slice(4, 7).map((cert, i) => (
          <ScrollReveal key={i} delay={0.2 + i * 0.1}>
            <Image src={cert.src} alt={cert.alt} width={400} height={300} className="rounded-xl shadow-md w-full h-auto hover:shadow-xl transition-shadow duration-300" />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}