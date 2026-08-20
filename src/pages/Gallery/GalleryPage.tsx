import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../components/common/GlassCard';
import './GalleryPage.css';

const generateCards = () => {
  const aspects = ['landscape', 'portrait', 'square', 'portrait', 'landscape', 'square', 'landscape'];
  
  const cards = [];
  for (let i = 0; i < 49; i++) {
    // This creates a staggered, non-uniform pattern for CSS columns
    const aspect = aspects[(i * 3 + (i % 5)) % aspects.length]; 
    cards.push({
      id: i + 1,
      aspect: aspect
    });
  }
  return cards;
};

const galleryImages = generateCards();

export const GalleryPage: React.FC = () => {
  return (
    <div className="gallery-page-container">
      {/* Header */}
      <section className="gallery-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="gallery-page-title">Experiences,</h1>
            <p className="gallery-page-subtitle" style={{ fontFamily: 'var(--font-cursive)', color: 'var(--accent-color)', fontSize: '2.5rem', textTransform: 'lowercase', marginTop: '-0.5rem', letterSpacing: '0.05em' }}>thoughtfully brought together</p>
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="gallery-masonry-section">
        <div className="container-fluid">
          <div className="masonry-grid">
            {galleryImages.map((img, index) => {
              // Create a chaotic 3D starting state based on index
              const rotateZ = index % 2 === 0 ? 25 : -25;
              const rotateY = index % 3 === 0 ? 30 : (index % 3 === 1 ? -30 : 0);
              const rotateX = -70; // tilted heavily backward
              const yOffset = 250; // comes from much lower
              const zOffset = 200;

              return (
                <div key={img.id} className="masonry-item" style={{ perspective: '2000px' }}>
                  <motion.div
                    className="masonry-card-wrapper"
                    // Start fully opaque so they are visible sitting at the bottom of the screen!
                    initial={{ opacity: 1, rotateX, rotateY, rotateZ, y: yOffset, z: zOffset, scale: 0.8 }}
                    whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, rotateZ: 0, y: 0, z: 0, scale: 1 }}
                    // Trigger the animation when 15% of the card is in the viewport, run only once to avoid jiggling loop
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ 
                      duration: 1.2, 
                      ease: [0.22, 1, 0.36, 1],
                      delay: (index % 4) * 0.1 
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <GlassCard className="masonry-card" glow={false} hoverEffect={true}>
                      <div className={`masonry-image-wrapper aspect-${img.aspect}`}>
                        {/* Placeholder for future images */}
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
