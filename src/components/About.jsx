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

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-12 lg:gap-16"
        >
          {/* Main Title and Intro */}
          <div className="max-w-3xl pr-[110px] xs:pr-[130px] sm:pr-[145px] md:pr-0">
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
            <motion.div variants={fadeUp} className="lg:col-span-12 flex flex-col gap-8 text-base leading-relaxed text-charcoal/80">
              <p className="max-w-4xl text-lg">
                At My Wellbeing Healthcare & Tourism, we don’t simply arrange holidays. We create meaningful journeys that enrich lives, restore wellbeing, and connect travellers with the remarkable cultures, landscapes, and people of Asia. Whether your goal is relaxation, rejuvenation, exploration, or healthcare, we are committed to delivering a seamless, luxurious, and deeply personal travel experience from beginning to end.
              </p>

              <div className="max-w-3xl mt-6">
                <h2 className="font-display text-2xl font-semibold text-charcoal mb-8 pb-3 border-b border-charcoal/10">
                  Meet the Team
                </h2>
                
                <div className="flex flex-col gap-10">
                  {/* Vini Narayan */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-charcoal">Vini Narayan</h3>
                      <p className="text-sm font-semibold text-forest mt-0.5">Director, Rediscover Tourism Limited (UK)</p>
                    </div>
                    <div className="flex flex-col gap-4 text-charcoal/70">
                      <p>
                        Hello, I'm Vini, Director of Rediscover Tourism Limited. As the UK customer acquisition partner for Blue Spice Travels Limited, I am your first point of contact throughout your holiday planning journey.
                      </p>
                      <p>
                        Based in the UK, I work closely with Nimish, Director of Blue Spice Travels, to help create bespoke travel experiences across Asia. I will guide you with travel advice, itinerary planning, destination recommendations, and answer any questions you may have before your trip.
                      </p>
                      <p>
                        Travelling has always been one of my greatest passions, and I have been fortunate to explore many regions of India. I also have a keen interest in mindfulness and meditation, having spent time learning these practices at an ashram in South India. Outside work, I enjoy playing tennis and badminton, and I'm an enthusiastic dog lover.
                      </p>
                      <p>
                        My aim is to make your travel planning simple, enjoyable, and completely stress free from your very first enquiry.
                      </p>
                    </div>
                  </div>

                  {/* Nimish */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-charcoal">Nimish</h3>
                      <p className="text-sm font-semibold text-forest mt-0.5">Director, Blue Spice Travels Limited (India)</p>
                    </div>
                    <div className="flex flex-col gap-4 text-charcoal/70">
                      <p>
                        Hello, I'm Nimish, Director of Blue Spice Travels Limited and Vini's business partner in India. I will be your main point of contact once you arrive in Asia.
                      </p>
                      <p>
                        I oversee all ground operations, ensuring every part of your holiday runs smoothly. From airport transfers, hotels, transport and dining to authentic local experiences, my team and I take care of every detail so that you can simply relax and enjoy your journey.
                      </p>
                      <p>
                        Born and raised in Kerala, South India, I founded Blue Spice Travels Limited in 2009. Since then, we have specialised in creating bespoke holidays across Asia, with extensive expertise throughout India and neighbouring destinations.
                      </p>
                      <p>
                        Over the years, we have built a strong reputation for delivering exceptional travel experiences to guests from around the world. We are proud of our excellent Google reviews and our growing community of more than 1,000 followers across YouTube, Instagram, and Facebook.
                      </p>
                      <p>
                        Travel is more than my profession. It is my passion. I look forward to welcoming you to Asia and helping you discover unforgettable destinations, authentic cultures, and experiences that will stay with you for a lifetime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button href="#/contact">
                  Contact Our Team
                </Button>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
