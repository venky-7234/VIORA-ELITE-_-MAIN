import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../common/GlassCard';
import { Parallax } from '../ui/Parallax';
import './Gallery.css';

const EASE_OUT: [number,number,number,number] = [0.16, 1, 0.3, 1];

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <motion.h2 
          className="gallery-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
        >
          <Parallax speed={0.9}>
            The Gallery
          </Parallax>
        </motion.h2>

        <div className="gallery-layout">
          
          {/* Left Column: Large Image Card */}
          <motion.div 
            className="gallery-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            <Parallax speed={0.8}>
              <GlassCard className="gallery-large-card" glow>
                <div className="gallery-image-wrapper gallery-large-wrapper">
                  <div className="gallery-placeholder-anim"></div>
                </div>
              </GlassCard>
            </Parallax>
          </motion.div>

          {/* Right Column: Content and Small Cards */}
          <div className="gallery-right">

          <motion.div 
            className="gallery-small-cards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {[1, 2, 3].map((item, index) => {
              const speeds = [1.2, 1.5, 1.8];
              return (
                <motion.div 
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } }
                  }}
                >
                  <Parallax speed={speeds[index]}>
                    <GlassCard className="gallery-small-card">
                      <div className="gallery-image-wrapper gallery-small-wrapper">
                        <div className="gallery-placeholder-anim"></div>
                      </div>
                    </GlassCard>
                  </Parallax>
                </motion.div>
              );
            })}
          </motion.div>


          
        </div>
      </div>
      </div>
    </section>
  );
};
