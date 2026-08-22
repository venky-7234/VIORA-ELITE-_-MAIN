import React, { useEffect, useRef, useState } from 'react';
import './Social.css';
import { motion, useScroll, useTransform } from 'framer-motion';

// Generate 20 scattered empty cards along a horizontal path
const cards = Array.from({ length: 20 }).map((_, i) => {
  // Spread them horizontally starting from right of the screen (50vw) up to 350vw
  const xOffset = 50 + (i * 15) + (Math.random() * 10); // in vw
  // Scatter them vertically between 15% and 75% height
  const yOffset = 15 + Math.random() * 60; // in vh
  
  // Random dimensions
  const width = 200 + Math.random() * 150;
  const height = width * (1.1 + Math.random() * 0.4);
  
  return { id: i, x: xOffset, y: yOffset, w: width, h: height };
});

export const Social: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Translate the entire track horizontally to the left
  const trackX = useTransform(scrollYProgress, [0, 1], ["0vw", "-350vw"]);

  return (
    <div className="social-page" ref={containerRef}>
      <div className="social-sticky-container">
        
        {/* Stationary Text Block */}
        <div className="social-text-content">
          <div className="social-sub-label">
            SELECTED WORK - 2014 - 2026
          </div>
          <h2 className="social-headline">
            <span>Every frame,</span>
            <span>every story.</span>
          </h2>
          <p className="social-paragraph">
            Twelve years of editorial, commercial, and personal projects, presented as an infinite reel. Hover to feel it; click to see a full gallery.
          </p>
        </div>

        {/* Moving Track */}
        <motion.div className="social-track" style={{ x: trackX }}>
          
          {cards.map((card) => {
            const scale = isMobile ? 0.6 : 1;
            return (
              <div
                key={card.id}
                className="social-empty-card"
                style={{
                  width: card.w * scale,
                  height: card.h * scale,
                  left: `${card.x}vw`,
                  top: `${card.y}vh`,
                }}
              >
                {/* Empty card placeholder */}
              </div>
            );
          })}
        </motion.div>
        
      </div>
    </div>
  );
};
