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
import ComingSoon from './components/ComingSoon.jsx';
import About from './components/About.jsx';

export default function App() {
  const [isPreview, setIsPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('preview') === 'true') {
      setIsPreview(true);
    }
  }, []);

  // Theme, Titles, and JSON-LD SEO/LLM Metadata Side-effects
  useEffect(() => {
    if (!isPreview) return;

    // Update Head Metadata
    const originalTitle = document.title;
    document.title = "My Wellbeing Healthcare & Tourism · Luxury Travel & Wellness";

    const metaDesc = document.querySelector('meta[name="description"]');
    let originalDesc = "";
    if (metaDesc) {
      originalDesc = metaDesc.getAttribute('content') || "";
      metaDesc.setAttribute('content', "Explore authentic, personalised journeys in India with My Wellbeing Healthcare & Tourism. Tranquil Kerala backwaters, Himalayas, medical & wellness travel, and cultural tours in partnership with Blue Spice Holidays.");
    }

    // Dynamic JSON-LD Schema for SEO and LLM GEO search optimization
    const schemaId = "mywellbeing-jsonld-schema";
    let schemaScript = document.getElementById(schemaId);
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaId;
      schemaScript.type = "application/ld+json";
      schemaScript.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "My Wellbeing Healthcare & Tourism",
        "alternateName": "My Wellbeing Healthcare",
        "description": "Bespoke luxury holidays, wellness & yoga retreats, and coordinated health & medical tourism in India, operated in partnership with Blue Spice Holidays.",
        "url": window.location.origin,
        "logo": `${window.location.origin}/logo-gray.webp`,
        "slogan": "Comfort, Confidence, and Care.",
        "partner": {
          "@type": "TravelAgency",
          "name": "Blue Spice Holidays",
          "description": "Trusted travel partner in India providing local knowledge, planned itineraries, and reliable support."
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "India" },
          { "@type": "AdministrativeArea", "name": "Kerala" },
          { "@type": "AdministrativeArea", "name": "Himalayas" }
        ],
        "offers": {
          "@type": "Offer",
          "name": "Summer 2026 Early Booking Offer",
          "description": "Book your holiday during our Summer 2026 Early Booking Promotion and receive 10% off selected tour packages.",
          "priceCurrency": "GBP",
          "price": "Varies"
        }
      });
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Revert all dynamic body properties on unmount
      document.title = originalTitle;
      if (metaDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
      const existingSchema = document.getElementById(schemaId);
      if (existingSchema) {
        existingSchema.remove();
      }
    };
  }, [isPreview]);

  // Auto-scroll utility for automated full-page screenshots (trigging Framer Motion whileInView reveals)
  useEffect(() => {
    if (!isPreview) return;
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
  }, [isPreview]);

  // Client-side Hash Router for Page Splitting
  useEffect(() => {
    if (!isPreview) return;

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages = ['home', 'about', 'destination', 'contact'];
      
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '' || hash === '/') {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        // Likely a section hash on the home page (e.g., journeys, how-it-works)
        setCurrentPage('home');
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
  }, [isPreview]);

  if (!isPreview) {
    return <ComingSoon />;
  }

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
