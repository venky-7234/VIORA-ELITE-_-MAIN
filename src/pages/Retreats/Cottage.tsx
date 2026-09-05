import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Cottage.css';

const COTTAGE_DATA = [
  { id: 1, title: 'The Willow', desc: 'A serene retreat by the whispering willows.', body: 'Step into a world where timeless architecture meets the raw beauty of nature. The Willow cottage offers exclusive dining and private nature walks.' },
  { id: 2, title: 'Oak Retreat', desc: 'Rustic charm with modern luxury.', body: 'Surrounded by ancient oaks, this retreat offers the perfect blend of natural rustic elements and ultra-modern amenities. Enjoy a sunken tub and fire pit.' },
  { id: 3, title: 'Pine Haven', desc: 'Ancient pines and absolute privacy.', body: 'Tucked deep in the forest, Pine Haven provides an immersive nature experience with absolute seclusion and bespoke services tailored to you.' },
  { id: 4, title: 'Cedar Lodge', desc: 'A grand estate for luxury seekers.', body: 'Expansive decks, panoramic views, and exquisite interior design define the Cedar Lodge experience. Perfect for larger groups or lavish escapes.' },
  { id: 5, title: 'The Birch', desc: 'Light, airy, and beautifully minimal.', body: 'The Birch cottage features floor-to-ceiling windows that blur the lines between the indoors and the wild outdoors, flooding the space with natural light.' },
  { id: 6, title: 'Maple Sanctuary', desc: 'Warm hues and a cozy setting.', body: 'Designed for intimacy, the Maple Sanctuary is a perfect romantic getaway nestled among vibrant seasonal foliage and peaceful winding paths.' },
];

export const Cottage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % COTTAGE_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + COTTAGE_DATA.length) % COTTAGE_DATA.length);
  };

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="cottage-page">
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
          Escapes
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
          A collection of stays and escapes chosen for their setting, character and sense of discovery. Private spaces and distinctive destinations that offer a reason to leave the familiar behind.
        </p>
      </motion.div>

      {/* 3D Coverflow Carousel */}
      <section className="cottage-coverflow-section">
        <div className="cottage-coverflow-container">
          <AnimatePresence initial={false}>
            {COTTAGE_DATA.map((item, index) => {
              const offset = index - currentIndex;
              
              let normalizedOffset = offset;
              const half = Math.floor(COTTAGE_DATA.length / 2);
              if (offset > half) normalizedOffset -= COTTAGE_DATA.length;
              if (offset < -half) normalizedOffset += COTTAGE_DATA.length;

              const isCenter = normalizedOffset === 0;
              const zIndex = 50 - Math.abs(normalizedOffset);

              return (
                <motion.div
                  key={item.id}
                  className={`cottage-coverflow-card ${isCenter ? 'active' : ''}`}
                  onClick={() => handleCardClick(index)}
                  initial={false}
                  animate={{
                    rotateY: normalizedOffset * -25,
                    scale: isCenter ? 1 : 0.8,
                    x: `calc(${normalizedOffset * 60}% + ${normalizedOffset > 0 ? 10 : normalizedOffset < 0 ? -10 : 0}px)`, 
                    z: Math.abs(normalizedOffset) * -100,
                    opacity: Math.abs(normalizedOffset) >= 3 ? 0 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 1
                  }}
                  style={{ zIndex }}
                >
                  <div className="cottage-placeholder"></div>
                  
                  {isCenter && (
                    <motion.div 
                      className="cottage-coverflow-content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        <div className="cottage-controls">
          <button className="cottage-btn" onClick={handlePrev}>&larr;</button>
          <div className="cottage-indicators">
            {COTTAGE_DATA.map((_, idx) => (
              <span 
                key={idx} 
                className={`cottage-indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => handleCardClick(idx)}
              />
            ))}
          </div>
          <button className="cottage-btn" onClick={handleNext}>&rarr;</button>
        </div>
      </section>
    </div>
  );
};
