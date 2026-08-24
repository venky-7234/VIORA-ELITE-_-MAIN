import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Culture.css';
import './Retreats.css'; 

// 3 elegant cards for the 3D stack
const emptyCards = Array.from({ length: 3 }).map((_, i) => ({
  id: i,
  label: `Viora ${i + 1}`
}));

const StackCard = ({ index, total, scrollYProgress }: { index: number, total: number, scrollYProgress: any }) => {
  const step = 1 / total;
  // Strictly monotonically increasing array of scroll points for this card
  const p1 = index * step - step; 
  const p2 = index * step;
  const p3 = (index + 1) * step;
  const p4 = p3 + 0.1;

  // The cards sit in the back stack, move to front, then fly away based on the scroll progress
  const scale = useTransform(
    scrollYProgress,
    [p1, p2, p3, p4],
    [0.85, 1, 1, 1.5]
  );

  const yOffset = useTransform(
    scrollYProgress,
    [p1, p2, p3, p4],
    [-40, 0, 0, -300]
  );

  const zIndex = total - index;

  const opacity = useTransform(
    scrollYProgress,
    [p1, p2, p3, p4],
    [0.4, 1, 1, 0]
  );
  
  const baseRotationZ = (index % 2 === 0 ? 1 : -1) * (index * 2);
  const rotateZ = useTransform(
    scrollYProgress,
    [p1, p2, p3, p4],
    [baseRotationZ, 0, 0, (index % 2 === 0 ? 10 : -10)]
  );

  return (
    <motion.div
      className="culture-card-stack"
      style={{
        scale,
        y: yOffset,
        opacity,
        rotateZ,
        zIndex
      }}
    >
      <span>{emptyCards[index].label}</span>
    </motion.div>
  );
};

export const Culture: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress as the container enters and leaves the viewport (no pinning)
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="culture-page">
      
      {/* Top Center Heading */}
      <motion.div style={{ 
        position: 'relative', 
        paddingTop: '6rem', 
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
          Culture
        </h2>
        <div style={{ height: '1px', width: '60px', background: 'var(--accent-color)', margin: '0.75rem 0', opacity: 0.6 }}></div>
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
          padding: '0 1rem',
          marginBottom: '4rem'
        }}>
          Experiences shaped by creativity, culture and the things that inspire conversation. From art and design to music, cinema and the culinary world, each one offers another way to discover something new.
        </p>
      </motion.div>

      {/* 3D Scroll Gallery Section (Normal scrolling, no pinning) */}
      <div className="culture-scroll-container" ref={scrollContainerRef} style={{ minHeight: '250vh', display: 'flex', alignItems: 'flex-start' }}>
        <div className="culture-stack-container" style={{ position: 'sticky', top: '25vh' }}>
          {emptyCards.map((_, index) => (
            <StackCard 
              key={index} 
              index={index} 
              total={emptyCards.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>

    </div>
  );
};
