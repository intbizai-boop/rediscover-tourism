import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion.js';
import Button from './Button.jsx';

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      {/* Sunset gradient backdrop */}
      <div className="absolute inset-0 bg-sunset-gradient opacity-90" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" aria-hidden="true" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="section-shell relative flex flex-col items-center gap-6 text-center"
      >
        <h2 className="text-balance max-w-3xl font-display text-4xl font-medium leading-tight text-ink md:text-5xl lg:text-6xl">
          Your Next Chapter Starts Here.
        </h2>
        <p className="text-pretty max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
          Rediscover Asia through carefully curated journeys designed around your pace,
          preferences, and wellbeing.
        </p>
        <Button
          href="#contact"
          variant="dark"
          className="mt-2"
        >
          Plan My Journey
        </Button>
      </motion.div>
    </section>
  );
}
