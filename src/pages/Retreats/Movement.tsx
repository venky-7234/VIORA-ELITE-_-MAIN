import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Retreats.css';

// 8 placeholder cards
const cards = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: `Retreat ${i + 1}`
}));

// Y-offsets for the scattered look (pixels)
const scatterY = [0, 80, -60, 120, -100, 40, -140, 60];

const CylinderCard = ({ index, total, scrollYProgress }: { index: number, total: number, scrollYProgress: any }) => {
  // Angle for this card in the cylinder
  const angle = (index / total) * 360;

  // Animate the rotation so it starts at 0 (stacked), fans out to `angle`, holds, and folds back to 0
  const cardRotateY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, angle, angle, 0]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radius = isMobile ? 200 : 400;
  const mobileScatter = [0, 40, -30, 60, -50, 20, -70, 30];
  const scatterArray = isMobile ? mobileScatter : scatterY;

  // Animate the push outward (Z) from 0 to radius and back
  const zRadius = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, radius, radius, 0]);

  // Animate the scatter (Y)
  const yOffset = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, scatterArray[index], scatterArray[index], 0]);

  const cardWidth = isMobile ? 160 : 240;
  const cardHeight = isMobile ? 240 : 340;

  return (
    <motion.div
      className="movement-cylinder-arm"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        marginLeft: `-${cardWidth / 2}px`,
        marginTop: `-${cardHeight / 2}px`,
        transformStyle: 'preserve-3d',
        // Rotate the arm dynamically
        rotateY: cardRotateY
      }}
    >
      <motion.div
        className="movement-card-face"
        style={{
          width: '100%',
          height: '100%',
          background: '#fdfbf7',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '15px',
          boxShadow: '5px 5px 15px rgba(0,0,0,0.15)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--text-primary)',
          fontSize: '1.2rem',
          fontFamily: 'var(--font-sans)',
          // Push out along Z to form the cylinder radius, and scatter along Y
          z: zRadius,
          y: yOffset
        }}
      >
        <span style={{ opacity: 0.8 }}>{cards[index].title}</span>
      </motion.div>
    </motion.div>
  );
};

export const Movement: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Rotate the entire cylinder from 0 to 360 degrees (1 full rotation) as user scrolls
  const cylinderRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Heading flies away quickly at the start of the scroll
  const headingOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  return (
    // Make the page tall enough to allow scrolling
    <div className="retreat-page" ref={containerRef} style={{ height: '250vh', background: 'var(--bg-color)', backgroundImage: 'url("/media/icons/Pattern-01.svg")', backgroundSize: '800px', backgroundPosition: 'center', backgroundRepeat: 'repeat', position: 'relative' }}>
      
      {/* Sticky container holds the 3D scene in place */}
      <div style={{ position: 'sticky', top: '110px', height: 'calc(100vh - 110px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Center Heading */}
        <motion.div style={{ 
          position: 'relative', 
          paddingTop: '4rem', 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 100
        }}>
          <h2 style={{ 
            fontFamily: 'var(--font-sans)', 
            fontWeight: 400,
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.4em', 
            margin: 0,
            textAlign: 'center',
            background: 'linear-gradient(160deg, #b8860b 0%, #d4af37 40%, #8b6508 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}>
            Movement
          </h2>
          <div style={{ height: '1px', width: '60px', background: 'var(--accent-color)', marginTop: '0.75rem', opacity: 0.6 }}></div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '1.5rem auto 0 auto',
            opacity: 1,
            fontWeight: 400,
            textAlign: 'center',
            padding: '0 1rem'
          }}>
            A more elevated approach to movement, bringing together fitness, sport and active pursuits in considered settings. For experiences that challenge, energise and leave you wanting more
          </p>
        </motion.div>

        {/* The 3D Cylinder Container */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1500px', transformStyle: 'preserve-3d' }}>
          
          <motion.div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              height: '100%',
              transformStyle: 'preserve-3d',
              rotateY: cylinderRotation 
            }}
          >
            {cards.map((_, index) => (
              <CylinderCard 
                key={index} 
                index={index} 
                total={cards.length} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};
