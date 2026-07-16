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
            <motion.div variants={fadeUp} className="lg:col-span-7 flex flex-col gap-6 text-base leading-relaxed text-charcoal/80">
              <p>
                At My Wellbeing Healthcare & Tourism, we don’t simply arrange holidays. We create meaningful journeys that enrich lives, restore wellbeing, and connect travellers with the remarkable cultures, landscapes, and people of Asia. Whether your goal is relaxation, rejuvenation, exploration, or healthcare, we are committed to delivering a seamless, luxurious, and deeply personal travel experience from beginning to end.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-charcoal">Vini Narayan</h3>
                    <p className="text-sm font-medium text-forest mt-0.5">Director of Rediscover Tourism Limited, UK</p>
                  </div>
                  <p>
                    My name is Vinesh and I am an NRI based in the UK. I am a doctor by background and have held a British passport for the last 20 years. During my time here, I have travelled extensively throughout the UK and Europe. I have visited major cities including London, Edinburgh, Manchester, the Scottish Highlands and Wales.
                  </p>
                  <p>
                    Of all these cities, I like London the best as it is one of the most beautiful cities in the world. It has a fantastic vibrant atmosphere and is full of historic sites dating back to William The Conqueror in the 11th century and historic buildings like the Big Ben and Buckingham Palace. It also has a very immersive cultural scene with numerous world class museums like the National Art Gallery and the Tate Museum. It has exciting zoos, aquariums and parks perfect for families. The nightlife of London is unparalleled, and it boasts a lot of live music in pubs and numerous dance clubs. For culinary lovers, it has an interesting mix of multi cuisine food from all over the world.
                  </p>
                  <p>
                    I will be more than happy to greet you at the airport and accompany and guide you on your holiday through this world famous city. I look forward to welcoming you and gifting you an unforgettable holiday.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-charcoal">Nimish Sampath</h3>
                    <p className="text-sm font-medium text-forest mt-0.5">Director of Blue Spice Travels Limited, India</p>
                  </div>
                  <p>
                    My name is Nimish, and I am Vini's business partner in India, and I will be your main point of contact in Asia. I will be handling all the ground operations at your destination including taxis, hotels, food, and local experiences. I was born and brought up in Kerala, South India, and have been running my travel agency Blue Spice Travels Limited since 2009. I currently arrange bespoke holidays covering holiday destinations across Asia including all parts of India. I have received good Google reviews and have 1,000 followers across YouTube, Instagram, and Facebook. I have a proven track record of delivering high quality holiday experiences to customers all over the world. I am passionate about my job and love travelling, especially in Asia.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button href="#/contact">
                  Contact Our Team
                </Button>
              </div>
            </motion.div>

            {/* Side highlights */}
            <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col gap-6">
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
