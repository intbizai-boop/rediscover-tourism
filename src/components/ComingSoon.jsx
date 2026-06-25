import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, animate, AnimatePresence } from 'framer-motion';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Interactive plane state
  const planeRef = useRef(null);
  const [isRolling, setIsRolling] = useState(false);
  const [particles, setParticles] = useState([]);

  // Motion values for actual absolute coordinate position (relative to viewport)
  const planeX = useMotionValue(0);
  const planeY = useMotionValue(0);
  
  // Smooth spring physics for plane movement following cursor
  const smoothX = useSpring(planeX, { stiffness: 50, damping: 15 });
  const smoothY = useSpring(planeY, { stiffness: 50, damping: 15 });

  // Rotation motion values (starts at -45 to align with default top-right pointing SVG)
  const rotateVal = useMotionValue(-45);
  const smoothRotate = useSpring(rotateVal, { stiffness: 85, damping: 14 });

  const prevXRef = useRef(0);
  const prevYRef = useRef(0);

  // Initialize target position to center-top on mount
  useEffect(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 3;
    planeX.set(cx);
    planeY.set(cy);
    prevXRef.current = cx;
    prevYRef.current = cy;
  }, []);

  // Update target coordinates to follow the cursor (PC) or touch (mobile)
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset slightly (+25px) so the plane floats near the cursor rather than directly under it,
      // preventing it from blocking normal hover/click interactions on links and inputs
      planeX.set(e.clientX + 25);
      planeY.set(e.clientY + 25);
    };

    const handleTouchStart = (e) => {
      if (e.target.closest('form') || e.target.closest('a') || e.target.closest('button')) return;
      if (e.touches && e.touches[0]) {
        planeX.set(e.touches[0].clientX);
        planeY.set(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.target.closest('form') || e.target.closest('a') || e.target.closest('button')) return;
      if (e.touches && e.touches[0]) {
        planeX.set(e.touches[0].clientX);
        planeY.set(e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [planeX, planeY]);

  // Point plane in direction of travel path
  useEffect(() => {
    const unsubscribeX = smoothX.on("change", (latestX) => {
      const latestY = smoothY.get();
      const dx = latestX - prevXRef.current;
      const dy = latestY - prevYRef.current;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1.2) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const targetAngle = angle - 45; // default up-right SVG offset

        let diff = targetAngle - rotateVal.get();
        diff = ((diff + 180) % 360) - 180;
        rotateVal.set(rotateVal.get() + diff);
      }
      prevXRef.current = latestX;
    });

    const unsubscribeY = smoothY.on("change", (latestY) => {
      const latestX = smoothX.get();
      const dx = latestX - prevXRef.current;
      const dy = latestY - prevYRef.current;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1.2) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const targetAngle = angle - 45;

        let diff = targetAngle - rotateVal.get();
        diff = ((diff + 180) % 360) - 180;
        rotateVal.set(rotateVal.get() + diff);
      }
      prevYRef.current = latestY;
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [smoothX, smoothY, rotateVal]);

  // Continuous trail particle emission
  useEffect(() => {
    const interval = setInterval(() => {
      const px = smoothX.get();
      const py = smoothY.get();

      const dx = px - prevXRef.current;
      const dy = py - prevYRef.current;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Only emit if moving or randomly when stationary to keep the trailing puff alive
      if (speed > 1.5 || Math.random() < 0.25) {
        const rad = (rotateVal.get() + 45) * (Math.PI / 180);
        // Spawn slightly behind plane heading
        const bx = px - Math.cos(rad) * 20;
        const by = py - Math.sin(rad) * 20;

        const id = Math.random();
        setParticles((prev) => [
          ...prev.slice(-35),
          {
            id,
            x: bx,
            y: by,
            scale: Math.random() * 0.45 + 0.15,
            vx: -Math.cos(rad) * 1.5 + (Math.random() - 0.5) * 0.6,
            vy: -Math.sin(rad) * 1.5 + (Math.random() - 0.5) * 0.6,
          },
        ]);

        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id));
        }, 800);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [smoothX, smoothY, rotateVal]);

  // Handle global click to trigger loop-de-loop (barrel roll)
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // If clicked on input fields, buttons, links, or inside forms, ignore
      if (
        e.target.closest('form') ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('input')
      ) {
        return;
      }
      triggerRoll();
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isRolling, smoothX, smoothY]);

  // Trigger barrel roll / loop
  const triggerRoll = () => {
    if (isRolling) return;
    setIsRolling(true);

    const px = smoothX.get();
    const py = smoothY.get();

    // Spawn particle burst
    const burstParticles = Array.from({ length: 18 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 3;
      return {
        id: Math.random(),
        x: px,
        y: py,
        scale: Math.random() * 0.75 + 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    });

    setParticles((prev) => [...prev.slice(-30), ...burstParticles]);

    // Cleanup burst particles
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !burstParticles.find((bp) => bp.id === p.id)));
    }, 800);

    setTimeout(() => {
      setIsRolling(false);
    }, 800);
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '79714c94-d222-41c0-8b5c-ffa6bc0abfdd',
          subject: 'New Waitlist Sign Up',
          from_name: 'mywellbeinghealthcare.co.uk Waitlist',
          email: email,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#08101B] text-cream overflow-hidden select-none font-body">
      {/* ── Background & Ambient Lighting ── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#08101B] via-[#0C1626] to-[#122238]" />
      
      {/* Golden/Sunset Radial Light Glare */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(232,177,91,0.08)_0%,rgba(169,93,39,0.04)_40%,transparent_75%)] blur-2xl pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[100vw] h-[60vh] rounded-full bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />

      {/* Floating Background Stars */}
      <div className="absolute inset-0 opacity-40 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-gold rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[60%] left-[8%] w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-[45%] left-[90%] w-1 h-1 bg-sunset-gold rounded-full animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-[75%] left-[75%] w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDuration: '3.5s' }} />
      </div>

      {/* Subtle Background Drifting Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-[2%] -left-[10%] w-[120%] h-[300px] bg-gradient-to-t from-[#08101B]/90 via-[#0C1626]/50 to-transparent blur-md opacity-90" />
        <div className="absolute bottom-[5%] left-[5%] w-[400px] h-[150px] bg-cream/5 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[180px] bg-gold/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* ── Header ── */}
      <header className="relative z-10 w-full px-6 py-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg tracking-wide text-cream">
            mywellbeinghealthcare.co.uk
          </span>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-12 text-center max-w-4xl mx-auto w-full">
        
        {/* Spacer where the airplane element used to reside */}
        <div className="h-28 w-full" aria-hidden="true" />

        {/* Brand Text Header */}
        <p className="font-mono text-xs tracking-[0.25em] text-sunset-gold uppercase mb-4 animate-fade-in">
          We are under heavy re-construction, but our page will be
        </p>
        
        <h1 className="font-display text-5xl md:text-7xl font-extralight tracking-[0.12em] text-cream mb-8">
          COMING SOON
        </h1>

        <p className="text-cream/60 max-w-md mx-auto text-sm md:text-base leading-relaxed mb-8">
          We&apos;re crafting a brand new healthcare experience. 
          Leave your email below and be the first to know when we launch.
        </p>

        {/* Waitlist Subscription Form */}
        <div className="w-full max-w-md mx-auto relative mb-12">
          <form
            onSubmit={handleWaitlistSubmit}
            className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-2xl sm:rounded-full bg-white/5 border border-hairline focus-within:border-gold/40 focus-within:ring-1 focus-within:ring-gold/25 transition-all duration-300 shadow-glass backdrop-blur-md"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-cream placeholder-cream/35 px-5 py-3 outline-none text-sm flex-grow rounded-full"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-sunset-gradient text-ink font-semibold text-sm px-7 py-3 rounded-full hover:shadow-[0_0_15px_rgba(232,177,91,0.4)] active:scale-[0.98] transition-all duration-300 shrink-0 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-ink" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Subscribing…
                </>
              ) : (
                'Notify Me'
              )}
            </button>
          </form>

          {/* Form Status Messaging */}
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 mt-4 text-sm text-emerald-400 flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Awesome! You&apos;ve been added to the waitlist.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 mt-4 text-sm text-red-400"
              >
                ⚠ {errorMsg || 'Failed to join waitlist. Please try again.'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 w-full px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-hairline/40 bg-ink/30 backdrop-blur-sm">
        <p className="text-cream/40 text-xs font-mono">
          &copy; {new Date().getFullYear()} mywellbeinghealthcare.co.uk. All rights reserved.
        </p>

        {/* Social Icons with Elegant Animation */}
        <div className="flex gap-5">
          {[
            { href: '#', label: 'Twitter', icon: (
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
            )},
            { href: '#', label: 'Instagram', icon: (
              <>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </>
            )},
            { href: '#', label: 'LinkedIn', icon: (
              <>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </>
            )},
            { href: '#', label: 'Facebook', icon: (
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            )}
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="text-cream/50 hover:text-sunset-gold transition-colors duration-300 transform hover:-translate-y-1"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </footer>

      {/* ── Viewport Particles (Fading trail of sparkles) ── */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, scale: p.scale, opacity: 1 }}
            animate={{
              x: p.x + (p.vx || (Math.random() - 0.5) * 50),
              y: p.y + (p.vy || (Math.random() - 0.5) * 50) + 15,
              opacity: 0,
              scale: 0.05,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: 0,
              top: 0,
              translateX: '-50%',
              translateY: '-50%',
              background: 'radial-gradient(circle, #E8B15B 0%, #D4AF37 100%)',
              boxShadow: '0 0 6px rgba(212,175,55,0.8), 0 0 12px rgba(232,177,91,0.4)',
            }}
          />
        ))}
      </div>

      {/* ── Viewport Floating Airplane (Continuously follows cursor / clicks) ── */}
      <motion.div
        ref={planeRef}
        className="fixed pointer-events-none z-50 select-none touch-none"
        style={{
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          rotate: smoothRotate,
          translateX: '-50%',
          translateY: '-50%',
          transformStyle: 'preserve-3d',
        }}
        animate={
          isRolling
            ? {
                rotateY: [0, 360],
                rotateZ: [rotateVal.get(), rotateVal.get() - 360],
                scale: [1, 1.4, 1],
              }
            : {
                y: [0, -6, 0],
              }
        }
        transition={
          isRolling
            ? { duration: 0.8, ease: 'easeInOut' }
            : { y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }
        }
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#planeGradient)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
        >
          <defs>
            <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7F4EF" />
              <stop offset="60%" stopColor="#E8B15B" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </motion.div>
    </div>
  );
}
