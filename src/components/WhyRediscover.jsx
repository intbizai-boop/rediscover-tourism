import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import { WHY_CARDS } from '../lib/content.js';
import SectionHeading from './SectionHeading.jsx';
import Button from './Button.jsx';

// Small, calm line icons (decorative, hidden from assistive tech).
const ICONS = {
  'Personal Concierge Service': (
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'Tailor-Made Itineraries': (
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'Trusted Regional Expertise': (
    <>
      <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'Luxury with Purpose': (
    <path d="M6 3h12l4 6-10 13L2 9z M12 3v19 M2 9h20 M12 22L6 9 M12 22l6-13" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'Secure Online Booking': (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export default function WhyRediscover() {
  return (
    <section id="why" className="relative py-24 md:py-32 scroll-mt-16 md:scroll-mt-20">
      <div className="section-shell flex flex-col gap-14">
        <SectionHeading label="Why Us" title="Why Choose My Wellbeing Healthcare & Tourism?">
          Everything is designed around your comfort, peace of mind, and bespoke travel aspirations.
        </SectionHeading>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {WHY_CARDS.map((card) => (
            <motion.li
              key={card.title}
              variants={fadeUp}
              className="group flex flex-col gap-4 rounded-2xl border border-charcoal/10 bg-sand/30 p-7 shadow-sm transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-forest/30"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-forest/10 bg-ivory text-forest transition-colors duration-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  {ICONS[card.title]}
                </svg>
              </span>
              <h3 className="font-display text-lg text-charcoal">{card.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-charcoal/70">{card.body}</p>
            </motion.li>
          ))}
        </motion.ul>


      </div>
    </section>
  );
}
