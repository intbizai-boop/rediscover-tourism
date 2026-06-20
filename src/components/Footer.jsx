import { NAV_LINKS, DESTINATIONS } from '../lib/content.js';

const SERVICES = [
  'Curated Journeys',
  'Local Coordination',
  'Wellness Travel',
  'Holistic Experiences',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-ink-soft">
      <div className="section-shell grid grid-cols-2 gap-10 py-16 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
          <a href="#main" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
            <img src="/logo.png" alt="Rediscover Tourism" width="44" height="44" loading="lazy" className="h-10 w-auto" />
            <span translate="no" className="font-display text-xl text-cream">Rediscover Tourism</span>
          </a>
          <p className="text-pretty max-w-xs font-display text-lg leading-snug text-cream/70">
            Rediscover Asia.
            <span className="block text-sunset-gold">We Take Care Of The Rest.</span>
          </p>
        </div>

        <nav aria-label="Destinations" className="flex flex-col gap-3">
          <h2 className="micro-label mb-1">Destinations</h2>
          {DESTINATIONS.map((d) => (
            <a key={d.name} href="#destinations" className="text-sm text-cream/70 transition-colors duration-300 hover:text-sunset-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              {d.name}
            </a>
          ))}
        </nav>

        <nav aria-label="Services" className="flex flex-col gap-3">
          <h2 className="micro-label mb-1">Services</h2>
          {SERVICES.map((s) => (
            <a key={s} href="#why" className="text-sm text-cream/70 transition-colors duration-300 hover:text-sunset-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              {s}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="micro-label mb-1">Contact</h2>
          <span className="text-sm text-cream font-medium">Vinesh Narayan (Travel Partner)</span>
          <a href="tel:07710461488" className="text-sm text-cream/70 transition-colors duration-300 hover:text-sunset-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">07710461488</a>
          <a href="https://wa.me/447710461488" target="_blank" rel="noopener noreferrer" className="text-sm text-cream/70 transition-colors duration-300 hover:text-sunset-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">WhatsApp: +447710461488</a>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="section-shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} Rediscover Tourism. All rights reserved.</p>
          <nav aria-label="Footer quick links" className="flex gap-5">
            {NAV_LINKS.slice(1).map((l) => (
              <a key={l.href} href={l.href} className="transition-colors duration-300 hover:text-sunset-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
