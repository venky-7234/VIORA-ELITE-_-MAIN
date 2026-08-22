import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const GlobalSpinIcon: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1440]);
  
  // Use pure vw and vh for x and y transforms so framer-motion interpolates correctly
  const x = useTransform(scrollYProgress, [0, 0.1], ["0vw", "35vw"]);
  const y = useTransform(scrollYProgress, [0, 0.1], ["0vh", "30vh"]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  
  // Slowly fade out starting from the moment you scroll, vanishing completely after Hero
  // Explicitly mapping all the way to 1.0 (bottom of page) to 0 so it never reappears.
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [1, 0, 0], { clamp: true });
  
  // Bulletproof guarantee: if scroll is past 15%, remove it from the display entirely
  const display = useTransform(scrollYProgress, (pos) => pos > 0.15 ? "none" : "flex");

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', pointerEvents: 'none', zIndex: 50 }}>
      {/* 
        This invisible Hero layout ensures the bird starts perfectly aligned with the real text logo
        regardless of screen height, width, or aspect ratio.
      */}
      <div className="hero-section" style={{ position: 'relative', zIndex: 'auto', background: 'transparent' }}>
        <div className="container hero-container-centered">
          
          <div className="hero-logo-hero" style={{ opacity: 1, position: 'relative', display: 'inline-block' }}>
            {/* Invisible exact match of the text logo to establish layout bounds */}
            <img
              src="/viora-text-only.svg"
              alt=""
              className="hero-logo-bird"
              style={{ visibility: 'hidden' }}
            />
            
            {/* The Spinning Bird absolutely positioned relative to the text logo bounds! */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-20%', // Adjust this percentage to move the bird up or down relative to the text
                left: '37%', // Nudged further left to hit the exact center of the "O"
                transform: 'translateX(-50%)', // Static horizontal center above the text
                x,
                y,
                rotate,
                scale,
                opacity,
                display, // dynamically switches to 'none' to guarantee it is hidden
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src="/media/icons/spin-icon.svg"
                alt="Spinning Bird"
                style={{
                  width: 'clamp(70px, 10vw, 120px)', // Small size like the original logo
                  height: 'auto',
                  filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.2))'
                }}
              />
            </motion.div>
          </div>

          {/* Invisible elements to maintain exact flexbox spacing as Hero.tsx */}
          <p className="hero-tagline-chosen" style={{ visibility: 'hidden' }}>The Choosen</p>
          
          <div className="hero-centered-buttons" style={{ visibility: 'hidden' }}>
            <button className="btn btn-primary btn-lg">Request Invitation</button>
            <button className="btn btn-outline btn-lg">Explore Retreats</button>
          </div>

          <div className="hero-bottom-tagline" style={{ visibility: 'hidden' }}>
            First of its kind. Built for the elite
          </div>

          <div className="hero-scroll-indicator" style={{ visibility: 'hidden' }}>
            <div className="hero-scroll-dot" />
          </div>

        </div>
      </div>
    </div>
  );
};
