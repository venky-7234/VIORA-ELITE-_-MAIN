import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Culture.css';
import './Retreats.css';

const cultureItems = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Culture Experience ${i + 1}`,
  description: `Discover the details of our exclusive culture experience number ${i + 1}.`,
  image: "" // No images for now
}));

export const Culture: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cultureItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cultureItems.length) % cultureItems.length);
  };

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
  };

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
          marginBottom: '2rem'
        }}>
          Experiences shaped by creativity, culture and the things that inspire conversation. From art and design to music, cinema and the culinary world, each one offers another way to discover something new.
        </p>
      </motion.div>

      {/* 3D Coverflow Carousel */}
      <section className="culture-coverflow-section">
        <div className="culture-coverflow-container">
          <AnimatePresence initial={false}>
            {cultureItems.map((item, index) => {
              const offset = index - currentIndex;
              
              // Handle wrap-around math for smooth infinite loop feeling
              let normalizedOffset = offset;
              const half = Math.floor(cultureItems.length / 2);
              if (offset > half) normalizedOffset -= cultureItems.length;
              if (offset < -half) normalizedOffset += cultureItems.length;

              const isCenter = normalizedOffset === 0;
              const zIndex = 50 - Math.abs(normalizedOffset);

              return (
                <motion.div
                  key={item.id}
                  className={`culture-coverflow-card ${isCenter ? 'active' : ''}`}
                  onClick={() => handleCardClick(index)}
                  initial={false}
                  animate={{
                    rotateY: normalizedOffset * -25, // tilt opposite to side
                    scale: isCenter ? 1 : 0.8,
                    x: `calc(${normalizedOffset * 60}% + ${normalizedOffset > 0 ? 10 : normalizedOffset < 0 ? -10 : 0}px)`, 
                    z: Math.abs(normalizedOffset) * -100, // push back
                    opacity: Math.abs(normalizedOffset) >= 3 ? 0 : 1, // show more cards
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 1
                  }}
                  style={{
                    zIndex
                  }}
                >
                  {/* <img src={item.image} alt={item.title} className="coverflow-image" /> */}
                  <div className="coverflow-placeholder"></div>
                  
                  {isCenter && (
                    <motion.div 
                      className="coverflow-content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        <div className="coverflow-controls">
          <button className="coverflow-btn" onClick={handlePrev}>&larr;</button>
          <div className="coverflow-indicators">
            {cultureItems.map((_, idx) => (
              <span 
                key={idx} 
                className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => handleCardClick(idx)}
              />
            ))}
          </div>
          <button className="coverflow-btn" onClick={handleNext}>&rarr;</button>
        </div>
      </section>
    </div>
  );
};
