import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-1/2 flex justify-center" aria-hidden="true">
        <div className="h-80 w-[800px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="section-shell relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-12 lg:gap-16"
        >
          {/* Main Title and Intro */}
          <div className="max-w-3xl">
            <motion.span variants={fadeUp} className="micro-label mb-3 block">
              About Us
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl lg:text-6xl"
            >
              Welcome to My Wellbeing <br />
              <span className="text-sunset-gold">Healthcare & Tourism</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 font-display text-xl italic text-sunset-gold/90"
            >
              "Travel is more than visiting new places. It's about creating meaningful experiences and lifelong memories."
            </motion.p>
          </div>

          {/* Grid Layout for Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* Primary description */}
            <motion.div variants={fadeUp} className="lg:col-span-7 flex flex-col gap-6 text-base leading-relaxed text-cream/80">
              <p>
                At My Wellbeing Healthcare & Tourism, we combine local expertise, trusted partnerships, and a passion for India to offer authentic, personalised journeys. From the tranquil backwaters of Kerala to the majestic Himalayas, cultural heritage tours, and carefully coordinated medical and wellness travel, we are dedicated to helping every traveller experience India with comfort, confidence, and care.
              </p>
              
              <div className="mt-6 border-l-2 border-gold/40 pl-6 py-2">
                <h3 className="font-display text-lg font-medium text-cream mb-2">Our India Partnership</h3>
                <p className="text-sm">
                  We are proud to work in partnership with <strong>Blue Spice Holidays</strong>, our trusted travel partner in India. Their extensive local knowledge and years of experience enable us to provide carefully planned itineraries, reliable support, and memorable travel experiences throughout India.
                </p>
              </div>
            </motion.div>

            {/* Side highlights */}
            <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col gap-6">
              {/* Summer Offer Card */}
              <div className="group relative overflow-hidden rounded-3xl border border-hairline bg-glass p-8 shadow-glass transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:bg-ink-soft/40">
                <span className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover:bg-gold/20" />
                <span className="micro-label text-gold font-mono text-[10px] tracking-widest block mb-2">Exclusive Offer</span>
                <h3 className="font-display text-xl font-semibold text-cream mb-3">Summer 2026 Early Booking</h3>
                <p className="text-sm text-cream/70 leading-relaxed mb-4">
                  Book your holiday during our Summer 2026 Early Booking Promotion and receive <strong className="text-sunset-gold text-lg">10% off</strong> selected tour packages.
                </p>
                <div className="text-xs text-cream/40 font-mono italic">
                  * Terms and conditions apply. Contact us for details and to check availability.
                </div>
              </div>

              {/* Get in Touch Callout */}
              <div className="group rounded-3xl border border-hairline bg-glass p-8 shadow-glass transition-all duration-500 hover:border-gold/30">
                <h3 className="font-display text-lg font-medium text-cream mb-3">Get in Touch</h3>
                <p className="text-sm text-cream/70 leading-relaxed mb-5">
                  If you have any questions or would like to start planning your journey, please complete the contact form or call us directly. We respond to all enquiries within 24 hours.
                </p>
                <a
                  href="#/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sunset-gold hover:text-gold transition-colors duration-300"
                >
                  Start planning your journey
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
