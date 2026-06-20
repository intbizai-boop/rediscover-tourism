import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import { STEPS } from '../lib/content.js';
import SectionHeading from './SectionHeading.jsx';

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="section-shell flex flex-col gap-14">
        <SectionHeading label="How It Works" title="A Simpler Way To Travel">
          Four unhurried steps between your first thought and your arrival.
        </SectionHeading>

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step) => (
            <motion.li key={step.n} variants={fadeUp} className="relative flex flex-col gap-4">
              <span
                className="font-mono text-sm tracking-label text-gold"
                aria-hidden="true"
              >
                {`0${step.n}`}
              </span>
              <span
                className="h-px w-full bg-gradient-to-r from-gold/50 to-transparent"
                aria-hidden="true"
              />
              <h3 className="text-pretty font-display text-xl leading-snug text-cream">
                <span className="sr-only">{`Step ${step.n}: `}</span>
                {step.title}
              </h3>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
