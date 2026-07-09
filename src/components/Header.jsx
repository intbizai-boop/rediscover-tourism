import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { NAV_LINKS } from '../lib/content.js';
import Button from './Button.jsx';

export default function Header({ currentPage = 'home' }) {
  const getIsActive = (href) => {
    const page = href.replace('#/', '').replace('#', '');
    if (page === '') return currentPage === 'home';
    return currentPage === page;
  };
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        open
          ? 'border-b border-charcoal/10 bg-ivory'
          : scrolled
          ? 'border-b border-charcoal/10 bg-ivory/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="section-shell flex h-16 items-center justify-between md:h-20">
        <a
          href="#/"
          className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          <img
            src="/logo-gray.webp"
            alt="My Wellbeing Healthcare & Tourism"
            width="40"
            height="40"
            className="h-9 w-auto md:h-10"
            fetchpriority="high"
          />
          <span
            translate="no"
            className="font-display text-base md:text-lg tracking-wide text-charcoal"
          >
            My Wellbeing <span className="text-xs md:text-sm font-light text-forest block md:inline md:ml-1">Healthcare & Tourism</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = getIsActive(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                  active
                    ? 'text-forest font-semibold bg-forest/5'
                    : 'text-charcoal/75 hover:text-forest'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="#/contact">Plan My Journey</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 bg-sand/30 text-charcoal [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: 'easeOut' }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-ivory px-6 pb-10 pt-24 lg:hidden"
            style={{ overscrollBehavior: 'contain' }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const active = getIsActive(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-3 py-3.5 font-display text-2xl transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                      active
                        ? 'text-forest font-semibold bg-forest/5 pl-5'
                        : 'text-charcoal/90 hover:text-forest'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="mt-auto pt-8">
              <Button href="#/contact" className="w-full" onClick={() => setOpen(false)}>
                Plan My Journey
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
