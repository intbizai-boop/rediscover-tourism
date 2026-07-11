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
import AmbientMusic from './components/AmbientMusic.jsx';
import About from './components/About.jsx';
import DiscountStamp from './components/DiscountStamp.jsx';

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
        document.title = "My Wellbeing Healthcare & Tourism · Luxury Travel & Wellness";
      } else if (pageKey === 'about') {
        document.title = "About Us · My Wellbeing Healthcare & Tourism";
      } else if (pageKey === 'destinations' || pageKey === 'destination') {
        document.title = "Specialised Destinations · My Wellbeing Healthcare & Tourism";
      } else if (pageKey === 'bespoke-offerings') {
        document.title = "Bespoke Offerings · My Wellbeing Healthcare & Tourism";
      } else if (pageKey === 'why-choose-us') {
        document.title = "Why Choose Us · My Wellbeing Healthcare & Tourism";
      } else if (pageKey === 'how-it-works') {
        document.title = "How It Works · My Wellbeing Healthcare & Tourism";
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
      <main id="main" className="relative min-h-[70vh]">
        {/* Vintage Discount Stamp - positioned at the top-right of the content container */}
        <div className="absolute top-0 inset-x-0 pointer-events-none z-30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative w-full h-0">
            <DiscountStamp className="pointer-events-auto absolute top-24 right-6 lg:right-12 -rotate-6 origin-top-right transform scale-75 md:scale-100" />
          </div>
        </div>
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
      <AmbientMusic />
    </>
  );
}
