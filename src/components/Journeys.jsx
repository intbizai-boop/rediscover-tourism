import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import { JOURNEY_CATEGORIES } from '../lib/content.js';
import SectionHeading from './SectionHeading.jsx';

// Premium icons matching each luxury travel category
const ICONS = {
  'Bespoke Luxury Holidays': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  'Wellness & Yoga Retreats': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a15 15 0 00-7.5 12.98C4.5 18 8 21 12 21s7.5-3 7.5-6.02A15 15 0 0012 2z" />
      <path d="M12 10a2 2 0 100-4 2 2 0 000 4z" />
      <path d="M6 14h12" />
    </svg>
  ),
  'Health & Medical Tourism': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  'Dental Tourism': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-1.2 0-2.4 1-2.4 2.5C9.6 8.5 7 9 7 12c0 3.5 2.5 5 5 5s5-1.5 5-5c0-3-2.6-3.5-2.6-6.5C14.4 4 13.2 3 12 3z" />
      <path d="M9.6 5.5c-3 1.5-4.6 4-4.6 6.5" />
      <path d="M14.4 5.5c3 1.5 4.6 4 4.6 6.5" />
    </svg>
  ),
  'Eco-Tourism Experiences': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22l10-10M12 12a5 5 0 110-10 5 5 0 010 10z" />
      <path d="M12 2a30 30 0 00-10 10 30 30 0 0010 10" />
      <path d="M12 2a30 30 0 0110 10 30 30 0 01-10 10" />
    </svg>
  ),
  'Luxury Escapes': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

export default function Journeys() {
  return (
    <section id="journeys" className="relative py-24 md:py-32 scroll-mt-16 md:scroll-mt-20">
      {/* Subtle light leak backdrop */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-sunset-gold/5 blur-[120px]" aria-hidden="true" />
      
      <div className="section-shell flex flex-col gap-14">
        <SectionHeading label="Bespoke Offerings" title="Curated Journeys">
          We create bespoke journeys across Asia for travellers seeking exceptional experiences, personalised service, and unforgettable memories. From private cultural tours and luxury escapes to wellness retreats and specialist medical travel, every itinerary is carefully designed around you.
        </SectionHeading>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {JOURNEY_CATEGORIES.map((journey) => (
            <motion.div
              key={journey.title}
              variants={fadeUp}
              className="group relative flex flex-col justify-between rounded-3xl border border-hairline bg-glass p-8 shadow-glass transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/30 hover:bg-ink-soft/40"
            >
              {/* Inner Glow Decorative Corner */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gold/5 blur-xl group-hover:bg-gold/10 transition-all duration-500" aria-hidden="true" />

              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-hairline bg-ink-soft text-sunset-gold transition-colors duration-500 group-hover:border-gold/30 group-hover:text-gold">
                  {ICONS[journey.title]}
                </div>

                <span className="micro-label mb-2 block text-[10px] text-cream/40">Exclusive Offering</span>
                <h3 className="font-display text-2xl text-cream mb-4 group-hover:text-sunset-gold transition-colors duration-300">
                  {journey.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream/70 mb-6">
                  {journey.description}
                </p>

                {/* Experience Sub Items */}
                <div className="border-t border-hairline pt-5 mb-6">
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-sunset-gold mb-3">Included Highlights</h4>
                  <ul className="space-y-2">
                    {journey.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-cream/60">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-gold/70" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sunset-gold transition-all duration-300 hover:text-gold group-hover:translate-x-1"
                >
                  Inquire About This Journey
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
