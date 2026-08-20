import React from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Philosophy } from './components/sections/Philosophy';
import { Experiences } from './components/sections/Experiences';
import { Gallery } from './components/sections/Gallery';
import { Testimonials } from './components/sections/Testimonials';
import { CTA } from './components/sections/CTA';
import { Footer } from './components/layout/Footer';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { CustomCursor } from './components/common/CustomCursor';

const App: React.FC = () => {
  const handleScrollToApply = () => {
    const element = document.getElementById('apply-section');
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ReactLenis root options={{ 
      lerp: 0.02, // Maximum buttery smoothness
      wheelMultiplier: 1,
      smoothWheel: true,
      respectReducedMotion: false 
    }}>
      <CustomCursor />
      <ScrollProgressBar />
      {/* Dynamic Backgrounds */}
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="viewport-frame"><div className="viewport-frame-inner"></div></div>

      {/* Page Sections */}
      <Navbar onApplyClick={handleScrollToApply} />
      <Hero onApplyClick={handleScrollToApply} />
      <Philosophy />
      <Experiences onApplyClick={handleScrollToApply} />
      <Gallery />
      <Testimonials />
      <CTA />
      <Footer />
    </ReactLenis>
  );
};

export default App;
