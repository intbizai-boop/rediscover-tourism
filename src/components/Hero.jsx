import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion.js';
import Button from './Button.jsx';

/**
 * Hero section.
 * - Desktop (md+): 16:9 video fills the band, content sits LEFT over a luxury overlay.
 * - Mobile (<md): 9:16 full-screen video with content overlaid directly, cinematic.
 * Both videos autoplay, muted, looping, playsInline and respect reduced motion.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const container = reduce ? {} : stagger;
  const item = reduce ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : fadeUp;

  return (
    <section
      aria-label="Rediscover Thyself. We take care of the rest."
      className="relative min-h-[100svh] w-full overflow-hidden bg-ivory"
    >
      {/* Desktop background video (16:9) */}
      {!reduce ? (
        <video
          className="absolute inset-0 hidden h-full w-full object-cover md:object-[110%_50%] md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/desktop_hero_fallback.webp"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/desktop_hero_video.webm" type="video/webm" />
          <source src="/desktop_hero_video.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/desktop_hero_fallback.webp"
          alt=""
          width="1920"
          height="1080"
          className="absolute inset-0 hidden h-full w-full object-cover md:object-[110%_50%] md:block"
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
      )}

      {/* Mobile background video (9:16) */}
      {!reduce ? (
        <video
          className="absolute inset-0 block h-full w-full object-cover object-bottom md:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/mobile_hero_fallback.webp"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/mobile_hero_video.webm" type="video/webm" />
          <source src="/mobile_hero_video.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/mobile_hero_fallback.webp"
          alt=""
          width="1080"
          height="1920"
          className="absolute inset-0 block h-full w-full object-cover object-bottom md:hidden"
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
      )}


      {/* Custom overlays matching mockup: covers text solid, then fades where image subject starts */}
      {/* Desktop overlay (circling around the subject) */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: 'radial-gradient(circle at 85% 70%, transparent 20%, rgba(249, 248, 246, 0.15) 32%, rgba(249, 248, 246, 0.8) 42%, #F9F8F6 48%)'
        }}
        aria-hidden="true"
      />
      {/* Mobile overlay (top to bottom) */}
      <div
        className="absolute inset-0 block md:hidden bg-gradient-to-b from-ivory via-ivory via-[60%] to-transparent to-[80%]"
        aria-hidden="true"
      />


      {/* Content wrapper */}
      <div className="section-shell relative flex min-h-[100svh] flex-col pb-[32svh] pt-20 md:flex-row md:items-center md:pb-0 md:pt-0">
        {/* Stamp Link */}
        <motion.a
          href="#/contact"
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          whileHover={{ scale: 1.08, rotate: 0 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="absolute top-[72px] right-4 z-20 w-32 h-32 xs:w-[136px] xs:h-[136px] sm:w-36 sm:h-36 sm:right-6 md:top-24 md:right-10 lg:right-16 md:w-36 md:h-36 lg:w-44 lg:h-44 cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:rounded-full"
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
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col justify-start md:max-w-xl"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex flex-col gap-5 md:gap-6">
            <motion.span
              variants={item}
              className="micro-label flex flex-col gap-1 text-[10px] sm:text-[11px] md:text-xs md:flex-row md:items-center md:gap-2 pr-[110px] xs:pr-[130px] sm:pr-[145px] md:pr-0"
            >
              <span>Luxury Travel</span>
              <span className="hidden md:inline text-forest/40">•</span>
              <span>Authentic Experiences</span>
              <span className="hidden md:inline text-forest/40">•</span>
              <span>Rediscover Thyself</span>
            </motion.span>

            <motion.h1
              variants={item}
              className="text-balance font-display text-3xl font-medium leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl pr-[100px] xs:pr-[120px] sm:pr-[135px] md:pr-0"
            >
              Rediscover Thyself
              <span className="block text-forest mt-2">
                <span className="whitespace-nowrap">in Extraordinary</span> Ways
              </span>
            </motion.h1>

            <motion.h2
              variants={item}
              className="text-pretty font-display text-lg font-medium text-forest/90 md:text-xl pr-[100px] xs:pr-[120px] sm:pr-[135px] md:pr-0"
            >
              Luxury journeys designed around your passions.
            </motion.h2>

            <motion.p
              variants={item}
              className="hidden md:block text-pretty max-w-xl text-xs leading-relaxed text-charcoal/80 md:text-base"
            >
              Whether you’re seeking a rejuvenating wellness retreat in Sri Lanka, world-class healthcare in India,
              an exclusive beach escape in Thailand, or a cultural adventure through the hidden treasures of Asia,
              My Wellbeing Healthcare & Tourism creates bespoke experiences tailored to your individual travel aspirations.
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#/destinations">Explore Destinations</Button>
              <Button href="#/contact" variant="secondary">
                Plan Your Journey
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
