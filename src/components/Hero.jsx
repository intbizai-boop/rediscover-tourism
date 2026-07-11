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
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col justify-start md:max-w-xl"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex flex-col gap-3.5 md:gap-6">
            <motion.span variants={item} className="micro-label">
              Luxury Travel. Authentic Experiences. Rediscover Thyself.
            </motion.span>

            <motion.h1
              variants={item}
              className="text-balance font-display text-3xl font-medium leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl"
            >
              Rediscover Thyself
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
