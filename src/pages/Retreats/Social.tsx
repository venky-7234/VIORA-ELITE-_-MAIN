import React, { useEffect, useRef, useState } from 'react';
import './Social.css';
import { motion, useScroll, useTransform } from 'framer-motion';

// Generate a long path of 25 empty cards
const cards = Array.from({ length: 25 }).map((_, i) => {
  // Creating a winding path using sin/cos for X/Y, and linear depth for Z
  // Z goes from very far away (-4000) to close up (0)
  const zPosition = -(i * 200); 
  const xOffset = Math.sin(i * 0.5) * 400; // Winding X path
  const yOffset = Math.cos(i * 0.4) * 300; // Winding Y path
  
  // Random sizes between 150px and 350px
  const width = 150 + Math.random() * 200;
  const height = width * (1.2 + Math.random() * 0.3);
  
  const rotateZ = (Math.random() - 0.5) * 30; // Random tilt
  
  return { id: i, x: xOffset, y: yOffset, z: zPosition, w: width, h: height, rotateZ };
});

const ScrollCard = ({ card, scrollYProgress, isMobile }: { card: any, scrollYProgress: any, isMobile: boolean }) => {
  // Scale down positions and sizes for mobile
  const scale = isMobile ? 0.6 : 1;
  
  // As the user scrolls from 0 to 1, we push the entire Z-axis forward by 6000px
  // This makes the cards travel towards the camera and past it
  const zMove = useTransform(scrollYProgress, [0, 1], [0, 5000]);
  
  // Combine initial Z with the movement
  const zCurrent = useTransform(zMove, (val: number) => card.z + val);
  
  // Fade out cards as they get too close (Z > 300) or too far (Z < -3000)
  const opacity = useTransform(zCurrent, [-3000, -2000, 200, 500], [0, 1, 1, 0]);

  return (
    <motion.div
      className="empty-card"
      style={{
        width: card.w * scale,
        height: card.h * scale,
        x: `calc(${card.x * scale}px - 50%)`,
        y: `calc(${card.y * scale}px - 50%)`,
        z: zCurrent,
        rotateZ: card.rotateZ,
        opacity: opacity
      }}
    />
  );
};

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

  return (
    <div className="social-page" ref={containerRef}>
      <div className="social-sticky-scene">
        <div className="social-3d-container">
          {cards.map((card) => (
            <ScrollCard 
              key={card.id} 
              card={card} 
              scrollYProgress={scrollYProgress} 
              isMobile={isMobile} 
            />
          ))}
        </div>
        
        <div className="social-text-content">
          <motion.h2 
            className="social-headline"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          >
            <span>Every frame,</span>
            <span>every story.</span>
          </motion.h2>
          
          <motion.h1 
            className="social-title-overlay"
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0]),
              scale: useTransform(scrollYProgress, [0, 1], [0.9, 1.1])
            }}
          >
            SOCIAL
          </motion.h1>

          <motion.p 
            className="social-subtitle"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          >
            Connect, inspire, and elevate.
          </motion.p>
        </div>
      </div>
    </div>
  );
};
