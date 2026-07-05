import { useState, useEffect } from 'react';
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

export default function App() {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('preview') === 'true') {
      setIsPreview(true);
    }
  }, []);

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
      <Header />
      <main id="main">
        <Hero />
        <Journeys />
        <Destinations />
        <WhyRediscover />
        <HowItWorks />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <AmbientMusic />
    </>
  );
}
