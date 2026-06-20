import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import { WHY_CARDS } from '../lib/content.js';
import SectionHeading from './SectionHeading.jsx';

// Small, calm line icons (decorative — hidden from assistive tech).
const ICONS = {
  'Comprehensive Ground Package': (
    <path d="M3 19h18M5 19l9-3 6-8-3-1-5 5-7 1-2 2z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'Reputed Local Travel Partners': (
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0114 0" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'Holistic Experiences': (
    <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 11c0 5.5-7 10-7 10z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'Peace of Mind Guaranteed': (
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

export default function WhyRediscover() {
  return (
    <section id="why" className="relative py-24 md:py-32 scroll-mt-16 md:scroll-mt-20">
      <div className="section-shell flex flex-col gap-14">
        <SectionHeading label="Why Rediscover" title="Travel Without The Stress.">
          Everything is designed around your comfort from arrival to departure.
        </SectionHeading>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WHY_CARDS.map((card) => (
            <motion.li
              key={card.title}
              variants={fadeUp}
              className="group flex flex-col gap-4 rounded-2xl border border-hairline bg-glass p-7 shadow-glass transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-gold/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-ink-soft text-sunset-gold transition-colors duration-500 group-hover:border-gold/50">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  {ICONS[card.title]}
                </svg>
              </span>
              <h3 className="font-display text-xl text-cream">{card.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-cream/70">{card.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
