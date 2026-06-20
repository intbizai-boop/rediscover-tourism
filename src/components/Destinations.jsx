import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import { DESTINATIONS } from '../lib/content.js';
import SectionHeading from './SectionHeading.jsx';

// High-quality destination imagery.
const IMAGES = {
  India: '/india_destination.webp',
  'Sri Lanka': '/sri_lanka_destination.webp',
  Thailand: '/thailand_destination.webp',
  Vietnam: '/vietnam_destination.webp',
  Bali: '/bali_destination.webp',
  Bhutan: '/bhutan_destination.webp',
  'Middle East': '/middle_east_destination.webp',
};

export default function Destinations() {
  return (
    <section id="destinations" className="relative py-24 md:py-32 scroll-mt-16 md:scroll-mt-20">
      <div className="section-shell flex flex-col gap-14">
        <SectionHeading label="Destinations" title="Rediscover Asia">
          Carefully composed journeys, each shaped around how you want to feel when you arrive.
        </SectionHeading>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {DESTINATIONS.map((dest) => (
            <motion.li key={dest.name} variants={fadeUp}>
              <a
                href="#contact"
                className="group relative block h-72 overflow-hidden rounded-3xl border border-hairline shadow-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:h-80"
              >
                <img
                  src={IMAGES[dest.name]}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/30 transition-opacity duration-500 group-hover:bg-ink/45" aria-hidden="true" />
                <div className="absolute inset-0 cinematic-overlay" aria-hidden="true" />
                <div className="relative flex h-full flex-col justify-end p-7">
                  <span className="micro-label mb-2">Asia</span>
                  <h3 className="font-display text-3xl text-cream">{dest.name}</h3>
                  <p className="text-pretty mt-2 max-w-xs text-sm leading-relaxed text-cream/75">
                    {dest.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-sunset-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Begin your enquiry
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
