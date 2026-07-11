import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import { JOURNEY_CATEGORIES } from '../lib/content.js';
import SectionHeading from './SectionHeading.jsx';
import Button from './Button.jsx';

// Premium icons matching each luxury travel category
const ICONS = {
  'Customised Itineraries to Meet Your Holiday Needs': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  'Bespoke Luxury Holidays': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  'Wellness & Yoga Retreats': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <circle cx="12" cy="5" r="1.5" />
      {/* Concentric aura waves flanking the body */}
      <path d="M 6.5 9 A 6.5 6.5 0 0 0 6.5 17" />
      <path d="M 17.5 9 A 6.5 6.5 0 0 1 17.5 17" />
      {/* Praying arms */}
      <path d="M 9.5 9.5 L 12 7.5 L 14.5 9.5" />
      <path d="M 12 7.5 v 2" />
      {/* Torso */}
      <path d="M 12 9.5 v 4.5" />
      {/* Bent leg (tree pose) */}
      <path d="M 12 14 L 8.5 14 L 11 16.5" />
      {/* Standing leg */}
      <path d="M 12 14 v 6" />
    </svg>
  ),
  'Health & Medical Tourism': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  'Dental Tourism': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <mask id="dental-tooth-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <path d="M 15.5 7.5 h 2.5 v -2.5 h 2.5 v 2.5 h 2.5 v 2.5 h -2.5 v 2.5 h -2.5 v -2.5 h -2.5 Z" fill="black" />
        </mask>
      </defs>
      {/* Tooth shape, masked to prevent overlap with the medical cross */}
      <path d="M 10 5 C 7.5 5, 5.5 6.5, 5.5 9 C 5.5 12, 7 13.5, 7 15.5 C 7 18, 5.5 19.5, 7.5 19.5 C 9 19.5, 9.5 18, 10.5 18 C 11.5 18, 12 19.5, 13.5 19.5 C 15.5 19.5, 14.5 18, 14.5 15.5 C 14.5 13.5, 16 12, 16 9 C 16 6.5, 14 5, 11.5 5 C 11 5, 10.5 5, 10 5 Z" mask="url(#dental-tooth-mask)" />
      {/* Medical Cross */}
      <path d="M 15.5 7.5 h 2.5 v -2.5 h 2.5 v 2.5 h 2.5 v 2.5 h -2.5 v 2.5 h -2.5 v -2.5 h -2.5 Z" />
    </svg>
  ),
  'Eco-Tourism Experiences': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4c-3.5 0-8 2.5-11 6.5C6 14.5 4 19 4 20c1 0 5.5-2 9.5-5 4-3 6.5-7.5 6.5-11z" />
      <path d="M4 20l4-4" />
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
    <section id="journeys" className="relative py-24 md:py-32 scroll-mt-16 md:scroll-mt-20 overflow-hidden">
      {/* Subtle light leak backdrop */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-forest/5 blur-[120px]" aria-hidden="true" />

      <div className="section-shell relative flex flex-col gap-14">
        {/* Stamp Link */}
        <motion.a
          href="#/contact"
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          whileHover={{ scale: 1.08, rotate: 0 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="absolute -top-4 right-4 z-20 w-32 h-32 xs:w-[136px] xs:h-[136px] sm:w-36 sm:h-36 sm:right-6 md:-top-6 md:right-10 lg:right-16 md:w-36 md:h-36 lg:w-44 lg:h-44 cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:rounded-full"
        >
          <img
            src="/stamp.webp"
            alt="10% Discount Stamp"
            width="160"
            height="160"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </motion.a>

        <SectionHeading
          label="Bespoke Offerings"
          title="Curated Journeys"
          align="items-start text-left md:items-center md:text-center md:mx-auto"
          className="pr-[110px] xs:pr-[130px] sm:pr-[145px] md:pr-0"
        >
          <span className="hidden md:inline">
            We create bespoke journeys across Asia for travellers seeking exceptional experiences, personalised service, and unforgettable memories. From private cultural tours and luxury escapes to wellness retreats and specialist medical travel, every itinerary is carefully designed around you.
          </span>
          <span className="inline md:hidden">
            Whether you’re seeking a rejuvenating wellness retreat in Sri Lanka, world-class healthcare in India, an exclusive beach escape in Thailand, or a cultural adventure through the hidden treasures of Asia, My Wellbeing Healthcare & Tourism creates bespoke experiences tailored to your individual travel aspirations.
          </span>
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
              className="group relative flex flex-col justify-between rounded-3xl border border-charcoal/10 bg-sand/30 p-8 shadow-sm transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:shadow-md"
            >
              {/* Inner Glow Decorative Corner */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-forest/5 blur-xl group-hover:bg-forest/10 transition-all duration-500" aria-hidden="true" />

              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-forest/10 bg-forest text-white transition-colors duration-500">
                  {ICONS[journey.title]}
                </div>

                <span className="micro-label mb-2 block text-[10px] text-forest/80">Exclusive Offering</span>
                <h3 className="font-display text-2xl text-charcoal mb-4 group-hover:text-forest transition-colors duration-300">
                  {journey.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/70 mb-6">
                  {journey.description}
                </p>

                {/* Experience Sub Items */}
                <div className="border-t border-charcoal/10 pt-5 mb-6">
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-forest mb-3">Included Highlights</h4>
                  <ul className="space-y-2">
                    {journey.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal/70">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-forest/70" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition-[color,transform] duration-300 hover:text-forest/80 group-hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:rounded-md"
                >
                  Inquire About This Journey
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="#/contact">
            Plan a Bespoke Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
