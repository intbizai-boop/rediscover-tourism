import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiscountStamp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 800ms, unless dismissed in this session
    const dismissed = sessionStorage.getItem('discount_stamp_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem('discount_stamp_dismissed', 'true');
  };

  const cx = 60;
  const cy = 60;
  const r = 50;
  const depth = 2;
  const count = 36;

  // Programmatic scallop path (alternating peaks and valleys using quadratic curves)
  let scallopPath = '';
  for (let i = 0; i < count; i++) {
    const angle = (i * 2 * Math.PI) / count;
    const nextAngle = (((i + 1) % count) * 2 * Math.PI) / count;
    const midAngle = (angle + nextAngle) / 2;

    const xStart = cx + r * Math.cos(angle);
    const yStart = cy + r * Math.sin(angle);
    const xEnd = cx + r * Math.cos(nextAngle);
    const yEnd = cy + r * Math.sin(nextAngle);

    const cpR = r + depth;
    const xCp = cx + cpR * Math.cos(midAngle);
    const yCp = cy + cpR * Math.sin(midAngle);

    if (i === 0) scallopPath += `M ${xStart.toFixed(2)} ${yStart.toFixed(2)}`;
    scallopPath += ` Q ${xCp.toFixed(2)} ${yCp.toFixed(2)} ${xEnd.toFixed(2)} ${yEnd.toFixed(2)}`;
  }
  scallopPath += ' Z';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -30, y: 50 }}
          animate={{ opacity: 1, scale: 1, rotate: -10, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: -30, y: 50 }}
          whileHover={{ scale: 1.08, rotate: -4, transition: { duration: 0.2 } }}
          className="fixed bottom-6 left-6 z-40 group cursor-pointer"
          style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-1 -right-1 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-ivory border border-ivory/20 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#800000] hover:text-white"
            aria-label="Dismiss offer"
            title="Dismiss offer"
          >
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="stroke-current" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l8 8M9 1L1 9" />
            </svg>
          </button>

          <a
            href="#/contact"
            className="block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            aria-label="10% discount for bookings till 30th September. Plan your journey now."
          >
            <svg
              width="100"
              height="100"
              viewBox="0 0 120 120"
              className="drop-shadow-lg"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Distress filter for realistic rubber stamp ink bleed */}
                <filter id="stamp-distress" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="4" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                
                {/* Curved paths for text wrapping */}
                <path id="top-text-path" d="M 22 60 A 38 38 0 0 1 98 60" fill="none" />
                <path id="bottom-text-path" d="M 22 60 A 38 38 0 0 0 98 60" fill="none" />
              </defs>

              <g filter="url(#stamp-distress)">
                {/* Ribbon tails behind */}
                <polygon points="4,60 14,48 24,48 24,72 14,72" fill="#5A0000" opacity="0.95" />
                <polygon points="116,60 106,48 96,48 96,72 106,72" fill="#5A0000" opacity="0.95" />

                {/* Scalloped circle boundary */}
                <path
                  d={scallopPath}
                  fill="none"
                  stroke="#800000"
                  strokeWidth="3.2"
                />

                {/* Outer solid thin ring */}
                <circle cx="60" cy="60" r="45" fill="none" stroke="#800000" strokeWidth="1.2" />

                {/* Inner solid thin ring */}
                <circle cx="60" cy="60" r="33" fill="none" stroke="#800000" strokeWidth="1.2" />

                {/* Circular Text (Top) */}
                <text fontFamily="Impact, Charcoal, sans-serif" fontSize="7.8" fontWeight="900" fill="#800000" letterSpacing="0.8">
                  <textPath href="#top-text-path" startOffset="50%" textAnchor="middle">
                    ★ SPECIAL DISCOUNT ★
                  </textPath>
                </text>

                {/* Circular Text (Bottom) */}
                <text fontFamily="Impact, Charcoal, sans-serif" fontSize="6.2" fontWeight="900" fill="#800000" letterSpacing="0.4">
                  <textPath href="#bottom-text-path" startOffset="50%" textAnchor="middle">
                    BOOKINGS TILL 30TH SEPT
                  </textPath>
                </text>

                {/* Middle banner rectangle */}
                <rect x="8" y="48" width="104" height="24" fill="#800000" rx="1" />
                
                {/* Inner white border on banner */}
                <rect x="10" y="50" width="100" height="20" fill="none" stroke="#F9F8F6" strokeWidth="1" rx="0.5" opacity="0.9" />

                {/* Main 10% OFF text */}
                <text
                  x="60"
                  y="65"
                  fill="#F9F8F6"
                  fontFamily="Impact, Charcoal, sans-serif"
                  fontSize="15"
                  fontWeight="900"
                  textAnchor="middle"
                  letterSpacing="0.8"
                >
                  10% OFF
                </text>
              </g>
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
