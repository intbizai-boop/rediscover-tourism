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
      aria-label="Rediscover Asia. We take care of the rest."
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
          className="absolute inset-0 hidden h-full w-full object-cover md:object-[110%_50%] md:block"
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
      )}

      {/* Mobile background video (9:16) */}
      {!reduce ? (
        <video
          className="absolute inset-0 block h-full w-full object-cover md:hidden"
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
          className="absolute inset-0 block h-full w-full object-cover md:hidden"
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
      )}


      {/* Custom overlays matching mockup: covers text solid, then fades where image subject starts */}
      {/* Desktop overlay (left to right) */}
      <div
        className="absolute inset-0 hidden md:block bg-gradient-to-r from-ivory via-ivory via-[40%] to-transparent to-[70%]"
        aria-hidden="true"
      />
      {/* Mobile overlay (top to bottom) */}
      <div
        className="absolute inset-0 block md:hidden bg-gradient-to-b from-ivory via-ivory via-[60%] to-transparent to-[80%]"
        aria-hidden="true"
      />


      {/* Content wrapper */}
      <div className="section-shell relative flex min-h-[100svh] flex-col pb-8 pt-20 md:flex-row md:items-center md:pb-0 md:pt-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col justify-start md:max-w-xl"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <motion.span variants={item} className="micro-label">
              Luxury Travel. Authentic Experiences. Asia, Rediscovered.
            </motion.span>

            <motion.h1
              variants={item}
              className="text-balance font-display text-4xl font-medium leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl"
            >
              Rediscover Asia
              <span className="block text-forest mt-2">
                in Extraordinary Ways
              </span>
            </motion.h1>

            <motion.h2
              variants={item}
              className="text-pretty font-display text-lg font-medium text-forest/90 md:text-xl"
            >
              Luxury journeys designed around your passions.
            </motion.h2>

            <motion.p
              variants={item}
              className="text-pretty max-w-xl text-sm leading-relaxed text-charcoal/80 md:text-base"
            >
              Whether you&apos;re seeking a rejuvenating wellness retreat in Sri Lanka, world-class healthcare in India,
              an exclusive beach escape in Thailand, or a cultural adventure through the hidden treasures of Asia,
              Rediscover Tourism creates bespoke experiences tailored to your individual travel aspirations.
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#journeys">Explore Our Experiences</Button>
              <Button href="#contact" variant="secondary">
                Plan Your Journey
              </Button>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-2 flex items-center gap-2 text-sm text-charcoal/70 md:mt-0"
            >
              <span className="text-forest" aria-hidden="true">
                ★★★★★
              </span>
              Trusted Local Travel Partners
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
