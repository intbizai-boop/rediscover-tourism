import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 scroll-mt-16 md:scroll-mt-20">
      <div className="section-shell grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading label="Contact" title="Start Your Journey" align="left">
          Skip the forms. Connect directly with Vin, your dedicated travel partner, to start crafting your bespoke experience across Asia.
        </SectionHeading>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-hairline bg-glass p-8 shadow-glass backdrop-blur-md md:p-10"
        >
          {/* Subtle luxury ambient gold glow in the card corner */}
          <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-hairline bg-ink-soft text-sunset-gold">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div>
                <span className="micro-label font-mono text-[10px] tracking-widest text-sunset-gold">Your Personal Travel Partner</span>
                <h3 className="font-display text-3xl font-medium text-cream leading-tight mt-0.5">Vin</h3>
              </div>
            </div>

            <div className="h-px bg-hairline" />

            <div className="flex flex-col gap-6">
              <p className="text-pretty text-base leading-relaxed text-cream/80">
                Whether you have a fully formed itinerary or just a desire to explore, get in touch directly to discuss your pace, preferences, and wellbeing.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="tel:07710461488"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-7 py-4 text-center text-base font-semibold text-ink transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-sunset-gold [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.122-4.1-6.924-6.924l1.293-.97a1.248 1.248 0 0 0 .417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  Call Vin Now: 07710461488
                </a>

                <a
                  href="mailto:binesh.narayan76@gmail.com"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-hairline bg-glass px-7 py-4 text-center text-base font-semibold text-cream backdrop-blur-sm transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:text-sunset-gold [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  Email: binesh.narayan76@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
