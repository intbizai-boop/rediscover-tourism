import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import { DESTINATIONS } from '../lib/content.js';
import SectionHeading from './SectionHeading.jsx';
import Button from './Button.jsx';

const IMAGES = {
  'India': '/india_destination.webp',
  'Sri Lanka': '/sri_lanka_destination.webp',
  'Thailand': '/thailand_destination.webp',
  'Nepal': '/nepal_destination.png',
  'Bhutan': '/bhutan_destination.webp',
  'Vietnam': '/vietnam_destination.webp',
  'Cambodia': '/cambodia_destination.png',
  'Malaysia': '/malaysia_destination.png',
  'Indonesia (Bali)': '/bali_destination.webp',
  'Myanmar (Burma)': '/myanmar_destination.png',
};

// Curate the 6 featured destinations for the homepage preview
const FEATURED_DESTINATIONS = DESTINATIONS.filter((dest) =>
  ['Sri Lanka', 'India', 'Thailand', 'Indonesia (Bali)', 'Nepal', 'Vietnam'].includes(dest.name)
).sort((a, b) => {
  const order = ['Sri Lanka', 'India', 'Thailand', 'Indonesia (Bali)', 'Nepal', 'Vietnam'];
  return order.indexOf(a.name) - order.indexOf(b.name);
});

export default function DestinationsPreview() {
  return (
    <section id="destinations-preview" className="relative py-24 md:py-32 scroll-mt-16 md:scroll-mt-20 bg-sand/20 border-b border-charcoal/5">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -translate-y-1/2 flex justify-center"
        aria-hidden="true"
      >
        <div className="h-72 w-[600px] rounded-full bg-forest/5 blur-[100px]" />
      </div>

      <div className="section-shell flex flex-col gap-14">
        <SectionHeading label="Specialised Destinations" title="Expertise Across Asia" align="center">
          Rather than offering generic global travel, we focus on destinations we know intimately.
        </SectionHeading>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto w-full"
        >
          {FEATURED_DESTINATIONS.map((dest) => (
            <motion.li key={dest.name} variants={fadeUp}>
              <a
                href="#/destination"
                className="group relative block h-56 sm:h-72 md:h-80 overflow-hidden rounded-3xl border border-charcoal/10 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={IMAGES[dest.name]}
                  alt=""
                  width="600"
                  height="400"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/55" aria-hidden="true" />
                <div className="absolute inset-0 cinematic-overlay" aria-hidden="true" />
                
                <div className="relative flex h-full flex-col justify-end p-4 sm:p-7 md:p-8">
                  <span className="micro-label mb-1 sm:mb-2 text-[8px] sm:text-[10px] text-white/90">Speciality Destination</span>
                  <h3 className="font-display text-lg sm:text-2xl md:text-3xl text-white leading-tight">{dest.name}</h3>
                  <p className="hidden sm:block text-pretty mt-2 max-w-xl text-sm leading-relaxed text-white/80">
                    {dest.body}
                  </p>
                  <span className="mt-2 sm:mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#b4d2b7] opacity-100 lg:opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100 font-medium">
                    <span className="hidden sm:inline">Explore destination</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mt-6"
        >
          <Button href="#/destination" variant="primary">
            View All Destinations
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
