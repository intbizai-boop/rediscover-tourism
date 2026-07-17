import { NAV_LINKS, DESTINATIONS } from '../lib/content.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#1A1F1D]">
      <div className="section-shell grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
          <a href="#/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
            <img src="/logo-gray.webp" alt="Rediscover Tourism" width="44" height="44" loading="lazy" className="h-10 w-auto" />
            <span translate="no" className="font-display text-xl text-cream">Rediscover Tourism</span>
          </a>
          <p className="text-pretty max-w-xs font-display text-base leading-snug text-cream/70">
            Comfort, Confidence, and Care.
          </p>
        </div>

        <nav aria-label="Destinations" className="flex flex-col gap-3">
          <h2 className="micro-label mb-1 text-[#8fa892]">Destinations</h2>
          {DESTINATIONS.map((d) => (
            <a key={d.name} href="#/destinations" className="text-sm text-cream/70 transition-colors duration-300 hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
              {d.name}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="micro-label mb-1 text-[#8fa892]">Contact Us</h2>
          <span className="text-sm text-cream font-medium">Vini</span>
          <a href="tel:+447541452673" className="text-sm text-cream/70 transition-colors duration-300 hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">+44 7541 452673</a>
          <a href="https://wa.me/447541452673" target="_blank" rel="noopener noreferrer" className="text-sm text-cream/70 transition-colors duration-300 hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">WhatsApp: +44 7541 452673</a>
          <a href="mailto:Rediscovertourism@gmail.com" className="text-sm text-cream/70 transition-colors duration-300 hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest break-all">Rediscovertourism@gmail.com</a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} Rediscover Tourism. All rights reserved.</p>
          <nav aria-label="Footer quick links" className="flex gap-5">
            {NAV_LINKS.slice(1).map((l) => (
              <a key={l.href} href={l.href} className="transition-colors duration-300 hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
