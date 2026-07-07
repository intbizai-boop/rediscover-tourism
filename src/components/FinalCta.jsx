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
        <span className="font-mono text-xs uppercase tracking-label text-ink/75">Our Philosophy</span>
        <h2 className="text-balance max-w-3xl font-display text-4xl font-medium leading-tight text-ink md:text-5xl lg:text-6xl">
          Beyond Simple Holidays
        </h2>
        <p className="text-pretty max-w-4xl text-base font-medium leading-relaxed text-ink/90 md:text-lg">
          At Rediscover Tourism, we don&apos;t simply arrange holidays. We create meaningful journeys that enrich lives,
          restore wellbeing, and connect travellers with the remarkable cultures, landscapes, and people of Asia.
        </p>
        <p className="text-pretty max-w-3xl text-sm leading-relaxed text-ink/75 md:text-base">
          Whether your goal is relaxation, rejuvenation, exploration, or healthcare, we are committed to delivering
          a seamless, luxurious, and deeply personal travel experience from beginning to end.
        </p>
        <Button
          href="#/contact"
          variant="dark"
          className="mt-4"
        >
          Plan Your Journey
        </Button>
      </motion.div>
    </section>
  );
}
