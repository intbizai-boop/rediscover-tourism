import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import { STEPS } from '../lib/content.js';
import SectionHeading from './SectionHeading.jsx';

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32">
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
          label="How It Works"
          title="A Simpler Way To Travel"
          align="items-start text-left md:items-center md:text-center md:mx-auto"
          className="pr-[110px] xs:pr-[130px] sm:pr-[145px] md:pr-0"
        />

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5"
        >
          {STEPS.map((step) => (
            <motion.li key={step.n} variants={fadeUp} className="relative flex flex-col gap-4">
              <span
                className="font-mono text-sm tracking-label text-forest"
                aria-hidden="true"
              >
                {`0${step.n}`}
              </span>
              <span
                className="h-px w-full bg-gradient-to-r from-forest/30 to-transparent"
                aria-hidden="true"
              />
              <h3 className="text-pretty font-display text-xl leading-snug text-charcoal">
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
