import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import { DIFFERENCE } from '../lib/content.js';
import SectionHeading from './SectionHeading.jsx';

export default function Difference() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        aria-hidden="true"
      />
      <div className="section-shell flex flex-col gap-14">
        <SectionHeading label="The Rediscover Difference" title="From First Thought To Lasting Memory.">
          A quiet transformation in how travel feels, at every stage of the journey.
        </SectionHeading>

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {DIFFERENCE.map((col) => (
            <motion.li
              key={col.stage}
              variants={fadeUp}
              className="flex flex-col gap-5 rounded-2xl border border-hairline bg-glass p-8 shadow-glass"
            >
              <h3 className="font-display text-2xl text-sunset-gold">{col.stage}</h3>
              <ul className="flex flex-col gap-3">
                {col.lines.map((line) => (
                  <li key={line} className="text-pretty text-base leading-relaxed text-cream/75">
                    {line}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
