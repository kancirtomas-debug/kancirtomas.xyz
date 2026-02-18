import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Domov" },
  { href: "/O-mne", label: "O mne" },
  { href: "/Cennik", label: "Cenník" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-heading text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3">Tomáš Kancír</h3>
            <p className="text-cream/70 text-sm">
              Mobilný masér - profesionálne masáže v pohodlí vášho domova.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Rýchle odkazy</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Kontakt</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <a
                  href="tel:+421908109204"
                  className="hover:text-accent transition-colors duration-200"
                >
                  0908 109 204
                </a>
              </li>
              <li>
                <a
                  href="mailto:kancir.tomas@gmail.com"
                  className="hover:text-accent transition-colors duration-200"
                >
                  kancir.tomas@gmail.com
                </a>
              </li>
              <li>Prešov a okolie</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-6 text-center text-cream/50 text-sm">
          &copy; {new Date().getFullYear()} Tomáš Kancír - Mobilný masér.
          Všetky práva vyhradené.
        </div>
      </div>
    </footer>
  );
}
