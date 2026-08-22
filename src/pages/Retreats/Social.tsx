import React, { useEffect, useState } from 'react';
import './Social.css';
import { motion } from 'framer-motion';

// Gallery images array
const images = [
  { id: 1, src: '/req-images/req1.jpg', size: { w: 300, h: 400 }, initial: { x: -300, y: -200, z: -100, rotateZ: -10 }, speed: 1.5 },
  { id: 2, src: '/req-images/req2.jpg', size: { w: 250, h: 350 }, initial: { x: 100, y: -250, z: -200, rotateZ: 15 }, speed: 1.2 },
  { id: 3, src: '/req-images/req3.jpg', size: { w: 350, h: 250 }, initial: { x: 300, y: -50, z: 50, rotateZ: 5 }, speed: 1.8 },
  { id: 4, src: '/req-images/req4.jpg', size: { w: 280, h: 380 }, initial: { x: -200, y: 150, z: 0, rotateZ: -5 }, speed: 1.4 },
  { id: 5, src: '/req-images/req5.jpg', size: { w: 400, h: 300 }, initial: { x: 200, y: 200, z: -50, rotateZ: -8 }, speed: 1.6 },
];

export const Social: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="social-page">
      <div className="social-gallery-container">
        {images.map((img) => {
          // Adjust position for mobile to prevent overlapping out of bounds
          const mobileScale = 0.6;
          const xPos = isMobile ? img.initial.x * mobileScale : img.initial.x;
          const yPos = isMobile ? img.initial.y * mobileScale : img.initial.y;

          return (
            <motion.div
              key={img.id}
              className="floating-card"
              initial={{
                x: `calc(50vw + ${xPos}px)`,
                y: `calc(50vh + ${yPos}px)`,
                rotateZ: img.initial.rotateZ,
                z: img.initial.z,
                opacity: 0,
                width: isMobile ? img.size.w * mobileScale : img.size.w,
                height: isMobile ? img.size.h * mobileScale : img.size.h,
              }}
              animate={{
                opacity: 1,
                y: [`calc(50vh + ${yPos}px)`, `calc(50vh + ${yPos - 40}px)`, `calc(50vh + ${yPos}px)`],
              }}
              transition={{
                opacity: { duration: 1.5, delay: img.id * 0.2 },
                y: {
                  duration: 6 * img.speed,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              style={{
                marginLeft: isMobile ? -(img.size.w * mobileScale) / 2 : -img.size.w / 2,
                marginTop: isMobile ? -(img.size.h * mobileScale) / 2 : -img.size.h / 2,
              }}
            >
              <img src={img.src} alt={`Social Gallery ${img.id}`} />
            </motion.div>
          );
        })}
      </div>

      <div className="social-text-content">
        <motion.h2 
          className="social-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span>Every frame,</span>
          <span>every story.</span>
        </motion.h2>
        
        <motion.h1 
          className="social-title-overlay"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          SOCIAL
        </motion.h1>

        <motion.p 
          className="social-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Connect, inspire, and elevate.
        </motion.p>
      </div>
    </div>
  );
};
