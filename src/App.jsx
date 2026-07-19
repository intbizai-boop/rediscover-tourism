import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import DestinationsPreview from './components/DestinationsPreview.jsx';
import WhyRediscover from './components/WhyRediscover.jsx';
import Journeys from './components/Journeys.jsx';
import Destinations from './components/Destinations.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import About from './components/About.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Auto-scroll utility for automated full-page screenshots (trigging Framer Motion whileInView reveals)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('scroll') === 'true') {
      const triggerAnimations = async () => {
        // Wait 1 second for react load
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const totalHeight = document.documentElement.scrollHeight;
        const scrollStep = 120;
        const delayMs = 30;
        
        for (let y = 0; y <= totalHeight; y += scrollStep) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
        window.scrollTo(0, 0); // scroll back to top for final screenshot capture
      };
      triggerAnimations();
    }
  }, []);

  // Client-side Hash Router for Page Splitting & Dynamic Document Titles
  useEffect(() => {
    let isInitial = true;

    const handleHashChange = () => {
      let hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages = ['home', 'about', 'destinations', 'destination', 'bespoke-offerings', 'why-choose-us', 'how-it-works', 'contact'];
      
      let pageKey = 'home';
      if (hash === 'destination') {
        pageKey = 'destinations';
      } else if (validPages.includes(hash)) {
        pageKey = hash;
      } else if (hash === '' || hash === '/') {
        pageKey = 'home';
      }

      setCurrentPage(pageKey);

      // Dynamic document title update based on current page
      if (pageKey === 'home') {
        document.title = "Rediscover Tourism · Luxury Travel & Wellness";
      } else if (pageKey === 'about') {
        document.title = "About Us · Rediscover Tourism";
      } else if (pageKey === 'destinations' || pageKey === 'destination') {
        document.title = "Specialised Destinations · Rediscover Tourism";
      } else if (pageKey === 'bespoke-offerings') {
        document.title = "Bespoke Offerings · Rediscover Tourism";
      } else if (pageKey === 'why-choose-us') {
        document.title = "Why Choose Us · Rediscover Tourism";
      } else if (pageKey === 'how-it-works') {
        document.title = "How It Works · Rediscover Tourism";
      } else if (pageKey === 'contact') {
        document.title = "Contact Us · Rediscover Tourism";
      }

      // Track pageview manually on subsequent hash navigations (Umami does not track SPA custom hash changes as pageviews by default)
      if (!isInitial) {
        if (window.umami && typeof window.umami.track === 'function') {
          window.umami.track();
        }
      }
      isInitial = false;

      if (validPages.includes(hash) || hash === '' || hash === '/') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        // Likely a section hash on the home page (e.g., journeys, how-it-works)
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial render

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Umami Analytics Event & Heartbeat Tracking
  useEffect(() => {
    // 1. Global click tracking for CTA buttons and links
    const handleGlobalClick = (event) => {
      const target = event.target.closest('button, a, [role="button"], [data-umami-event]');
      if (!target) return;

      // Extract descriptive name for the event
      const eventName = target.getAttribute('data-umami-event') || 
                        target.innerText?.trim().slice(0, 50) || 
                        target.getAttribute('aria-label') ||
                        target.id || 
                        target.href || 
                        'Click';

      if (window.umami && typeof window.umami.track === 'function') {
        window.umami.track(eventName, {
          type: target.tagName.toLowerCase(),
          text: target.innerText?.trim().slice(0, 100) || undefined,
          id: target.id || undefined,
          href: target.href || undefined,
          path: window.location.pathname + window.location.hash
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // 2. Heartbeat Ping to update page visit duration and prevent inaccurate bounces
    let intervalId;
    let lastActivityTime = Date.now();

    const handleActivity = () => {
      lastActivityTime = Date.now();
    };

    // Track activity markers
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    // Trigger heartbeat ping every 15 seconds if tab is active and visible
    intervalId = setInterval(() => {
      const isVisible = document.visibilityState === 'visible';
      const wasActiveRecently = Date.now() - lastActivityTime < 60000; // Active within the last minute

      if (isVisible && wasActiveRecently) {
        if (window.umami && typeof window.umami.track === 'function') {
          window.umami.track('heartbeat', {
            url: window.location.href,
            path: window.location.pathname + window.location.hash
          });
        }
      }
    }, 15000);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      clearInterval(intervalId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);


  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-gold focus-visible:px-5 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-ink"
      >
        Skip to main content
      </a>
      
      <Header currentPage={currentPage} />
      <main id="main" className="min-h-[70vh] pt-0">
        <div>
          {currentPage === 'home' && (
            <>
              <Hero />
              <DestinationsPreview />
            </>
          )}
          {currentPage === 'about' && <About />}
          {(currentPage === 'destinations' || currentPage === 'destination') && <Destinations />}
          {currentPage === 'bespoke-offerings' && <Journeys />}
          {currentPage === 'why-choose-us' && <WhyRediscover />}
          {currentPage === 'how-it-works' && <HowItWorks />}
          {currentPage === 'contact' && <Contact />}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
