import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import WhyRediscover from './components/WhyRediscover.jsx';
import Journeys from './components/Journeys.jsx';
import Destinations from './components/Destinations.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import FinalCta from './components/FinalCta.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import AmbientMusic from './components/AmbientMusic.jsx';
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
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages = ['home', 'about', 'destination', 'contact'];
      
      let pageKey = 'home';
      if (validPages.includes(hash)) {
        pageKey = hash;
      } else if (hash === '' || hash === '/') {
        pageKey = 'home';
      }

      setCurrentPage(pageKey);

      // Dynamic document title update based on current page
      if (pageKey === 'home') {
        document.title = "My Wellbeing Healthcare & Tourism · Luxury Travel & Wellness";
      } else if (pageKey === 'about') {
        document.title = "About Us · My Wellbeing Healthcare & Tourism";
      } else if (pageKey === 'destination') {
        document.title = "Specialised Destinations · My Wellbeing Healthcare & Tourism";
      } else if (pageKey === 'contact') {
        document.title = "Contact Us · My Wellbeing Healthcare & Tourism";
      }

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

  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-gold focus-visible:px-5 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-ink"
      >
        Skip to main content
      </a>
      <Header currentPage={currentPage} />
      <main id="main" className="min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {currentPage === 'home' && (
              <>
                <Hero />
                <Journeys />
                <WhyRediscover />
                <HowItWorks />
                <FinalCta />
              </>
            )}
            {currentPage === 'about' && <About />}
            {currentPage === 'destination' && <Destinations />}
            {currentPage === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloat />
      <AmbientMusic />
    </>
  );
}
