import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import Button from './Button.jsx';

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
              className="font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl lg:text-6xl"
            >
              Welcome to My Wellbeing <br />
              <span className="text-forest">Healthcare & Tourism</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 font-display text-xl italic text-forest/95"
            >
              "Travel is more than visiting new places. It's about creating meaningful experiences and lifelong memories."
            </motion.p>
          </div>

          {/* Grid Layout for Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* Primary description */}
            <motion.div variants={fadeUp} className="lg:col-span-7 flex flex-col gap-6 text-base leading-relaxed text-charcoal/80">
              <p>
                I am a doctor living in Devon. I have been working for the NHS for the last 20 years. I love travelling and I have been fortunate enough to visit different parts of Asia during my holidays. I also enjoy Mindfulness and Meditation, having practiced this in an ashram in South India. I also enjoy tennis and badminton in my spare time. I am also an avid dog lover.
              </p>
              
              <p>
                My name is Nimish and I am Vinnie's business partner in Asia. I was born and brought up in Kerala, South India and have been running my travel agency Blue Spice travels ltd since 2009. I currently arrange luxury, bespoke holidays covering all holiday destination in Asia including health tourism in India. I have received good Google reviews and have 1,000 followers on YouTube, Instagram and Facebook. I have a proven track record of delivering high quality holidays. I am passionate about my job and travelling, especially in Asia.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button href="#/destination">Explore Specialised Destinations</Button>
                <Button href="#/contact" variant="secondary">
                  Contact Our Team
                </Button>
              </div>
            </motion.div>

            {/* Side highlights */}
            <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col gap-6">
              {/* Summer Offer Card */}
              <div className="group relative overflow-hidden rounded-3xl border border-charcoal/10 bg-sand p-8 shadow-sm transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-forest/30">
                <span className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-forest/5 blur-2xl transition-colors duration-500 group-hover:bg-forest/10" />
                <span className="micro-label text-forest font-mono text-[10px] tracking-widest block mb-2">Exclusive Offer</span>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">Summer 2026 Early Booking</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
                  Book your holiday during our Summer 2026 Early Booking Promotion and receive <strong className="text-forest text-lg">10% off</strong> selected tour packages.
                </p>
                <div className="text-xs text-charcoal/50 font-mono italic">
                  * Terms and conditions apply. Contact us for details and to check availability.
                </div>
              </div>

              {/* Get in Touch Callout */}
              <div className="group rounded-3xl border border-charcoal/10 bg-sand p-8 shadow-sm transition-[border-color] duration-500 hover:border-forest/30">
                <h3 className="font-display text-lg font-medium text-charcoal mb-3">Get in Touch</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed mb-5">
                  If you have any questions or would like to start planning your journey, please complete the contact form or call us directly. We respond to all enquiries within 24 hours.
                </p>
                <a
                  href="#/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest/80 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:rounded-md"
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
