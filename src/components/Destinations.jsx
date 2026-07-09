import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import { DESTINATIONS } from '../lib/content.js';
import SectionHeading from './SectionHeading.jsx';
import Button from './Button.jsx';

// High-quality destination imagery.
const IMAGES = {
  'India': '/india_destination.png',
  'Sri Lanka': '/sri_lanka_destination.png',
  'Thailand': '/thailand_destination.png',
  'Nepal': '/nepal_destination.png',
  'Bhutan': '/bhutan_destination.png',
  'Vietnam': '/vietnam_destination.png',
  'Cambodia': '/cambodia_destination.png',
  'Malaysia': '/malaysia_destination.png',
  'Indonesia (Bali)': '/bali_destination.jpg',
  'Myanmar (Burma)': '/myanmar_destination.png',
};

export default function Destinations() {
  return (
    <section id="destinations" className="relative py-24 md:py-32 scroll-mt-16 md:scroll-mt-20">
      <div className="section-shell flex flex-col gap-14">
        <SectionHeading label="Destinations We Specialise In" title="Expertise Across Asia">
          Rather than offering generic global travel, we focus on destinations we know intimately.
        </SectionHeading>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {DESTINATIONS.map((dest) => {
            const isWide = dest.name === 'India' || dest.name === 'Indonesia (Bali)';
            return (
              <motion.li key={dest.name} variants={fadeUp} className={isWide ? 'lg:col-span-2' : ''}>
                <a
                  href="#/contact"
                  className="group relative block h-72 overflow-hidden rounded-3xl border border-charcoal/10 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory md:h-80"
                >
                  <img
                    src={IMAGES[dest.name]}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 transition-opacity duration-500 group-hover:bg-black/50" aria-hidden="true" />
                  <div className="absolute inset-0 cinematic-overlay" aria-hidden="true" />
                  <div className="relative flex h-full flex-col justify-end p-7">
                    <span className="micro-label mb-2 text-white/95">Asia Speciality</span>
                    <h3 className="font-display text-3xl text-white">{dest.name}</h3>
                    <p className="text-pretty mt-2 max-w-xl text-sm leading-relaxed text-white/80">
                      {dest.body}
                    </p>
                    {dest.notice && (
                      <p className="text-xs text-[#b4d2b7] mt-1.5 italic font-mono uppercase tracking-wide">
                        {dest.notice}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-[#b4d2b7] opacity-100 lg:opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100">
                      Begin your enquiry
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Bottom CTA block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 text-center bg-sand/30 rounded-3xl border border-charcoal/10 p-8 md:p-12 max-w-4xl mx-auto shadow-sm relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-forest/5 blur-xl" aria-hidden="true" />
          <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-4">Have a Destination in Mind?</h3>
          <p className="text-sm md:text-base leading-relaxed text-charcoal/70 max-w-2xl mx-auto mb-8">
            Our travel specialists are ready to design a bespoke itinerary tailored precisely to your budget, style, and travel dreams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="#/contact">Plan Your Journey</Button>
            <Button href="tel:07710461488" variant="secondary">Call a Specialist</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
