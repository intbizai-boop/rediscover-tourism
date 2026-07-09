import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, animate, AnimatePresence } from 'framer-motion';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Interactive plane state
  const planeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  // Motion values for relative plane offset
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Rotation motion values (starts at -45 to align with default top-right pointing SVG)
  const rotateVal = useMotionValue(-45);
  const smoothRotate = useSpring(rotateVal, { stiffness: 100, damping: 15 });

  // Handle window mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Point plane towards mouse when not dragging
  useEffect(() => {
    if (isDragging || isRolling || !planeRef.current) return;

    const rect = planeRef.current.getBoundingClientRect();
    const planeCenterX = rect.left + rect.width / 2;
    const planeCenterY = rect.top + rect.height / 2;

    const dx = mousePos.x - planeCenterX;
    const dy = mousePos.y - planeCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 30) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const targetAngle = angle - 45; // default SVG points up-right

      let diff = targetAngle - rotateVal.get();
      // Normalize difference to prevent 360-degree snaps
      diff = ((diff + 180) % 360) - 180;
      rotateVal.set(rotateVal.get() + diff);
    }
  }, [mousePos, isDragging, isRolling]);

  // Periodic particle emission for trailing stardust when floating
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDragging) return;

      const px = dragX.get();
      const py = dragY.get();

      // Emit particle opposite to the heading direction
      const rad = (rotateVal.get() + 45) * (Math.PI / 180);
      const bx = px - Math.cos(rad) * 20;
      const by = py - Math.sin(rad) * 20;

      const id = Math.random();
      setParticles((prev) => [
        ...prev.slice(-40),
        {
          id,
          x: bx,
          y: by,
          scale: Math.random() * 0.4 + 0.2,
          vx: -Math.cos(rad) * 2 + (Math.random() - 0.5) * 0.8,
          vy: -Math.sin(rad) * 2 + (Math.random() - 0.5) * 0.8,
        },
      ]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 1000);
    }, 200);

    return () => clearInterval(interval);
  }, [isDragging, rotateVal]);

  // Handle plane drag event
  const handleDrag = (event, info) => {
    const dx = info.delta.x;
    const dy = info.delta.y;

    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const targetAngle = angle - 45;

      let diff = targetAngle - rotateVal.get();
      diff = ((diff + 180) % 360) - 180;
      rotateVal.set(rotateVal.get() + diff);
    }

    // Spawn drag trail particle
    const px = dragX.get();
    const py = dragY.get();
    const id = Math.random();
    setParticles((prev) => [
      ...prev.slice(-40),
      {
        id,
        x: px,
        y: py,
        scale: Math.random() * 0.6 + 0.3,
        vx: -dx * 0.5 + (Math.random() - 0.5) * 0.5,
        vy: -dy * 0.5 + (Math.random() - 0.5) * 0.5,
      },
    ]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 800);
  };

  // Trigger barrel roll / loop
  const triggerRoll = () => {
    if (isRolling) return;
    setIsRolling(true);

    const px = dragX.get();
    const py = dragY.get();

    // Spawn particle burst
    const burstParticles = Array.from({ length: 18 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      return {
        id: Math.random(),
        x: px,
        y: py,
        scale: Math.random() * 0.7 + 0.4,
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
        
        {/* Airplane Area Container */}
        <div className="relative w-full h-44 flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Render Sparkle Particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: p.x, y: p.y, scale: p.scale, opacity: 1 }}
                animate={{
                  x: p.x + (p.vx || (Math.random() - 0.5) * 50),
                  y: p.y + (p.vy || (Math.random() - 0.5) * 50) + 15,
                  opacity: 0,
                  scale: 0.1,
                }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute w-2 h-2 rounded-full pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, #E8B15B 0%, #D4AF37 100%)',
                  boxShadow: '0 0 6px rgba(212,175,55,0.8), 0 0 12px rgba(232,177,91,0.4)',
                }}
              />
            ))}
          </div>

          {/* Draggable and Clickable Airplane */}
          <motion.button
            type="button"
            ref={planeRef}
            drag
            dragConstraints={{ left: -160, right: 160, top: -100, bottom: 100 }}
            dragElastic={0.2}
            style={{
              x: dragX,
              y: dragY,
              rotate: smoothRotate,
              cursor: isDragging ? 'grabbing' : 'grab',
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
                    y: [0, -10, 0],
                  }
            }
            transition={
              isRolling
                ? { duration: 0.8, ease: 'easeInOut' }
                : { y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }
            }
            onDragStart={() => setIsDragging(true)}
            onDrag={handleDrag}
            onDragEnd={() => {
              setIsDragging(false);
              animate(dragX, 0, { type: 'spring', stiffness: 220, damping: 18 });
              animate(dragY, 0, { type: 'spring', stiffness: 220, damping: 18 });
            }}
            onClick={triggerRoll}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerRoll();
              }
            }}
            className="relative z-20 p-6 touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:rounded-full"
            aria-label="Interactive paper airplane. Drag around or press space or enter to do a loop."
            title="Drag me around or click to do a loop!"
          >
            {/* SVG Airplane */}
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#planeGradient)"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="filter drop-shadow-[0_4px_10px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform duration-200"
            >
              <defs>
                <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F7F4EF" />
                  <stop offset="60%" stopColor="#E8B15B" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              {/* Paper airplane details */}
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </motion.button>
        </div>

        {/* Brand Text Header */}
        <p className="font-mono text-xs tracking-[0.25em] text-sunset-gold uppercase mb-4 animate-fade-in">
          We are under heavy re-construction, but our page will be
        </p>
        
        <h1 className="font-display text-5xl md:text-7xl font-extralight tracking-[0.12em] text-cream mb-8">
          COMING SOON
        </h1>

        <p className="text-cream/60 max-w-md mx-auto text-sm md:text-base leading-relaxed mb-8">
          We’re crafting a brand new experience. 
          Leave your email below and be the first to know when we launch.
        </p>

        {/* Waitlist Subscription Form */}
        <div className="w-full max-w-md mx-auto relative mb-12">
          <form
            onSubmit={handleWaitlistSubmit}
            className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-2xl sm:rounded-full bg-white/5 border border-hairline focus-within:border-gold/40 focus-within:ring-1 focus-within:ring-gold/25 transition-[border-color,box-shadow] duration-300 shadow-glass backdrop-blur-md"
          >
            <input
              type="email"
              name="email"
              id="waitlist-email"
              required
              autocomplete="email"
              spellCheck={false}
              aria-label="Email address"
              placeholder="e.g. you@example.com…"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-cream placeholder-cream/35 px-5 py-3 outline-none text-sm flex-grow rounded-full focus-visible:outline-none"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-sunset-gradient text-ink font-semibold text-sm px-7 py-3 rounded-full hover:shadow-[0_0_15px_rgba(232,177,91,0.4)] active:scale-[0.98] transition-[box-shadow,transform] duration-300 shrink-0 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#08101B]"
            >
              {status === 'loading' ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-ink" fill="none" viewBox="0 0 24 24" aria-hidden="true">
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
                aria-live="polite"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Awesome! You’ve been added to the waitlist.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 mt-4 text-sm text-red-400"
                role="alert"
                aria-live="polite"
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
              className="text-cream/50 hover:text-sunset-gold transition-colors duration-300 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:rounded-md"
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
                aria-hidden="true"
              >
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
