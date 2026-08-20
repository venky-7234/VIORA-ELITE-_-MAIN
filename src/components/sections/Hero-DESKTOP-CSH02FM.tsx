import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const EASE_OUT: [number,number,number,number] = [0.16, 1, 0.3, 1];

interface HeroProps {
  onApplyClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
  return (
    <header id="hero" className="hero-section">
      <div className="container hero-container-centered">
        
        {/* Main Heading */}
        <motion.h1
          className="hero-main-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.2 }}
        >
          VIORA<br />ELITE
        </motion.h1>

        {/* Tagline with decorative dots */}
        <motion.div
          className="hero-tagline-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.8 }}
        >
          <span className="hero-tagline-dot"></span>
          <p className="hero-tagline">It is a bet on people.</p>
          <span className="hero-tagline-dot"></span>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="hero-cta-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 1.2 }}
        >
          <button className="hero-cta-button" onClick={onApplyClick}>
            REQUEST AN INVITATION
          </button>
        </motion.div>

      </div>
    </header>
  );
};
