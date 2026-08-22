import React, { useEffect, useRef, useState } from 'react';
import './Social.css';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// Generate 30 scattered empty cards along the Z-axis for a 3D tunnel effect
const cards = Array.from({ length: 30 }).map((_, i) => {
  // Z-offset determines how far away it starts. Negative is far away.
  const zOffset = -(i * 300) - (Math.random() * 500); 
  
  // X and Y scattered radially from the center so they don't block the camera
  // Spread wider as they get further back
  const spread = 40 + (i * 2);
  const angle = Math.random() * Math.PI * 2;
  const distanceX = (Math.random() * 0.5 + 0.5) * spread; // Push outwards
  const distanceY = (Math.random() * 0.5 + 0.5) * (spread * 0.7); 
  
  const xOffset = Math.cos(angle) * distanceX; // in vw
  const yOffset = Math.sin(angle) * distanceY; // in vh
  
  // Random dimensions
  const width = 150 + Math.random() * 150;
  const height = width * (1.2 + Math.random() * 0.3);
  
  // Parallax speed modifier (some fly slightly faster)
  const speed = 0.8 + Math.random() * 0.5;

  // Initial rotations
  const rotX = (Math.random() - 0.5) * 40;
  const rotY = (Math.random() - 0.5) * 40;
  const rotZ = (Math.random() - 0.5) * 20;

  return { id: i, x: xOffset, y: yOffset, z: zOffset, w: width, h: height, speed, rotX, rotY, rotZ };
});

const FlyThroughCard = ({ card, zMove, isMobile }: { card: any, zMove: MotionValue<number>, isMobile: boolean }) => {
  // Mobile scales down the spread and dimensions so it fits
  const scale = isMobile ? 0.5 : 1;
  const spreadScale = isMobile ? 0.7 : 1;
  
  // Calculate this card's current Z position based on the global zMove and its own speed
  const zCurrent = useTransform(zMove, (val: number) => card.z + (val * card.speed));
  
  // Fade out as it passes the camera (Perspective is 1000px, so Z > 800 is right in your face)
  // Fade in from distance (Z < -4000)
  const opacity = useTransform(zCurrent, [-4500, -3000, 600, 1000], [0, 1, 1, 0]);

  // Dynamic rotation to make it feel like floating
  const rotateX = useTransform(zCurrent, [-4000, 1000], [card.rotX, card.rotX * -1.5]);
  const rotateY = useTransform(zCurrent, [-4000, 1000], [card.rotY, card.rotY * -1.5]);
  const rotateZ = useTransform(zCurrent, [-4000, 1000], [card.rotZ, card.rotZ + 15]);

  return (
    <motion.div
      className="social-empty-card"
      style={{
        width: card.w * scale,
        height: card.h * scale,
        // Centered base, then offset
        left: '50%',
        top: '50%',
        x: `calc(-50% + ${card.x * spreadScale}vw)`,
        y: `calc(-50% + ${card.y * spreadScale}vh)`,
        z: zCurrent,
        rotateX: rotateX,
        rotateY: rotateY,
        rotateZ: rotateZ,
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

  // Global Z movement: travels 12,000px deep through the tunnel
  const zMove = useTransform(scrollYProgress, [0, 1], [0, 12000]);

  return (
    <div className="social-page" ref={containerRef}>
      <div className="social-sticky-container">
        
        {/* Stationary Text Block - Fades in at the end of scroll */}
        <motion.div 
          className="social-text-content"
          style={{ opacity: useTransform(scrollYProgress, [0.8, 0.95], [0, 1]) }}
        >
          <h1 className="social-headline">
            FRAMING MEMORIES
          </h1>
        </motion.div>

        {/* 3D Fly-through Scene */}
        <div className="social-3d-scene">
          {cards.map((card) => (
            <FlyThroughCard key={card.id} card={card} zMove={zMove} isMobile={isMobile} />
          ))}
        </div>
        
      </div>
    </div>
  );
};
