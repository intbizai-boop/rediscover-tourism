import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion.js';
import Button from './Button.jsx';

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-[#DFD8C8]">
      {/* Premium botanical leaf print watermark on the left */}
      <div 
        className="absolute left-0 bottom-0 top-0 w-full sm:w-[500px] pointer-events-none text-[#7C6550] opacity-[0.14] overflow-hidden flex items-center justify-start" 
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-contain -translate-x-6 translate-y-12 rotate-[8deg] sm:-translate-x-12 sm:translate-y-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <g id="botanical-leaf">
              {/* Perfectly balanced organic leaf shape pointing to the right */}
              <path 
                d="M 0 0 C 4 -3.5, 11 -3.5, 15 0 C 11 3.5, 4 3.5, 0 0 Z" 
                fill="currentColor" 
                fillOpacity="0.08"
                vectorEffect="non-scaling-stroke"
              />
              {/* Mid vein */}
              <path 
                d="M 0 0 L 11 0" 
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </defs>
          
          {/* Main Stem */}
          <path d="M 22 95 C 22 80, 25 70, 32 63 C 40 55, 55 45, 68 30 C 75 20, 70 12, 65 5" vectorEffect="non-scaling-stroke" />

          {/* Leaves along Main Stem */}
          <use href="#botanical-leaf" transform="translate(22, 88) rotate(-160) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(22, 88) rotate(-20) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(24, 78) rotate(-150) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(24, 78) rotate(-30) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(36, 59) rotate(-140) scale(0.9)" />
          <use href="#botanical-leaf" transform="translate(36, 59) rotate(-20) scale(0.9)" />
          <use href="#botanical-leaf" transform="translate(52, 45) rotate(-130) scale(0.9)" />
          <use href="#botanical-leaf" transform="translate(52, 45) rotate(-10) scale(0.9)" />
          <use href="#botanical-leaf" transform="translate(66, 28) rotate(-120) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(66, 28) rotate(0) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(68, 18) rotate(-110) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(68, 18) rotate(10) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(65, 5) rotate(-80) scale(0.6)" />

          {/* Sub-Branch 1 (Bottom-most left branch) */}
          <path d="M 22 85 C 18 85, 12 87, 8 92" vectorEffect="non-scaling-stroke" />
          <use href="#botanical-leaf" transform="translate(18, 86) rotate(-170) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(12, 88) rotate(170) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(8, 92) rotate(140) scale(0.6)" />

          {/* Sub-Branch 2 (Bottom-most right branch) */}
          <path d="M 22 82 C 26 84, 34 90, 38 98" vectorEffect="non-scaling-stroke" />
          <use href="#botanical-leaf" transform="translate(28, 86) rotate(-10) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(34, 92) rotate(10) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(38, 98) rotate(50) scale(0.6)" />

          {/* Sub-Branch 3 (Mid-left branch) */}
          <path d="M 24 73 C 16 68, 10 60, 4 52" vectorEffect="non-scaling-stroke" />
          <use href="#botanical-leaf" transform="translate(18, 67) rotate(-165) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(10, 59) rotate(-180) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(4, 52) rotate(-200) scale(0.6)" />

          {/* Sub-Branch 3b (Mid-left split branch) */}
          <path d="M 14 65 C 14 58, 18 52, 25 48" vectorEffect="non-scaling-stroke" />
          <use href="#botanical-leaf" transform="translate(18, 54) rotate(-45) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(25, 48) rotate(-15) scale(0.6)" />

          {/* Sub-Branch 4 (Mid-right branch) */}
          <path d="M 32 63 C 38 65, 45 70, 52 75" vectorEffect="non-scaling-stroke" />
          <use href="#botanical-leaf" transform="translate(42, 67) rotate(-15) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(48, 72) rotate(5) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(52, 75) rotate(35) scale(0.6)" />

          {/* Sub-Branch 5 (Center-left branch) */}
          <path d="M 45 53 C 38 46, 32 38, 25 32" vectorEffect="non-scaling-stroke" />
          <use href="#botanical-leaf" transform="translate(38, 45) rotate(-150) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(31, 37) rotate(-165) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(25, 32) rotate(-190) scale(0.6)" />

          {/* Sub-Branch 6 (Center-right branch) */}
          <path d="M 55 42 C 62 48, 68 54, 75 62" vectorEffect="non-scaling-stroke" />
          <use href="#botanical-leaf" transform="translate(61, 46) rotate(-10) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(68, 53) rotate(10) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(75, 62) rotate(40) scale(0.6)" />

          {/* Sub-Branch 7 (High-left branch) */}
          <path d="M 65 33 C 58 24, 52 18, 48 10" vectorEffect="non-scaling-stroke" />
          <use href="#botanical-leaf" transform="translate(58, 22) rotate(-140) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(52, 15) rotate(-155) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(48, 10) rotate(-180) scale(0.6)" />

          {/* Sub-Branch 8 (High-right branch) */}
          <path d="M 68 30 C 78 30, 83 40, 85 50" vectorEffect="non-scaling-stroke" />
          <use href="#botanical-leaf" transform="translate(75, 30) rotate(-20) scale(0.8)" />
          <use href="#botanical-leaf" transform="translate(82, 39) rotate(0) scale(0.7)" />
          <use href="#botanical-leaf" transform="translate(85, 50) rotate(35) scale(0.6)" />
        </svg>
      </div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="section-shell relative flex flex-col items-center gap-6 text-center"
      >
        <span className="font-mono text-xs uppercase tracking-label text-forest font-semibold">Our Philosophy</span>
        <h2 className="text-balance max-w-3xl font-display text-4xl font-medium leading-tight text-charcoal md:text-5xl lg:text-6xl">
          Beyond Simple Holidays
        </h2>
        <p className="text-pretty max-w-4xl text-base font-medium leading-relaxed text-charcoal/80 md:text-lg">
          At Rediscover Tourism, we don&apos;t simply arrange holidays. We create meaningful journeys that enrich lives,
          restore wellbeing, and connect travellers with the remarkable cultures, landscapes, and people of Asia.
        </p>
        <p className="text-pretty max-w-3xl text-sm leading-relaxed text-charcoal/70 md:text-base">
          Whether your goal is relaxation, rejuvenation, exploration, or healthcare, we are committed to delivering
          a seamless, luxurious, and deeply personal travel experience from beginning to end.
        </p>
        <Button
          href="#/contact"
          variant="primary"
          className="mt-4"
        >
          Plan Your Journey
        </Button>
      </motion.div>
    </section>
  );
}
