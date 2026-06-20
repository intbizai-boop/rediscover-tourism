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
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Desktop video (16:9) */}
      <video
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/desktop_hero_video_opt.webm" type="video/webm" />
      </video>

      {/* Mobile video (9:16) */}
      <video
        className="absolute inset-0 block h-full w-full object-cover md:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/mobile_hero_video_opt.webm" type="video/webm" />
      </video>

      {/* Luxury overlays: stronger on the left (desktop) and top/bottom (mobile) for readability. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent md:from-ink/85 md:via-ink/45"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/85 to-transparent md:bg-gradient-to-t md:from-ink/20 md:via-transparent md:to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="section-shell relative flex min-h-[100svh] flex-col pb-8 pt-20 md:flex-row md:items-center md:pb-0 md:pt-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-1 flex-col justify-between md:flex-none md:max-w-xl md:justify-start md:gap-6"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <motion.span variants={item} className="micro-label">
              Holistic Travel. Complete Peace of Mind.
            </motion.span>

            <motion.h1
              variants={item}
              className="text-balance font-display text-4xl font-medium leading-[1.05] text-cream sm:text-5xl lg:text-6xl"
            >
              Rediscover Asia.
              <span className="block text-sunset-gold">We Take Care Of The Rest.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-pretty max-w-md text-sm leading-relaxed text-cream/80 md:text-lg"
            >
              A new way to travel. A better way to feel. Private and carefully curated journeys
              across India, Sri&nbsp;Lanka, Thailand and beyond. From the moment you land,
              every detail is handled so you can simply relax and enjoy.
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#contact">Start Planning Your Journey</Button>
              <Button href="#destinations" variant="secondary">
                Explore Destinations
              </Button>
            </motion.div>
          </div>

          <motion.p
            variants={item}
            className="mt-8 flex items-center gap-2 text-sm text-cream/70 md:mt-0"
          >
            <span className="text-sunset-gold" aria-hidden="true">
              ★★★★★
            </span>
            Trusted Local Travel Partners
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
