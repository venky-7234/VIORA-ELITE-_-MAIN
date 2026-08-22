import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './Philosophy.css';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.85, ease: EASE_OUT, delay },
});

/* ── Particle config ──────────────────────────────────────── */
const PARTICLES = [
  { top: '18%',  left: '8%',   size: 3, dur: 22, delay: 0   },
  { top: '72%',  left: '14%',  size: 2, dur: 28, delay: 3   },
  { top: '35%',  left: '25%',  size: 4, dur: 25, delay: 7   },
  { top: '55%',  left: '42%',  size: 2, dur: 30, delay: 1   },
  { top: '12%',  left: '60%',  size: 3, dur: 24, delay: 5   },
  { top: '80%',  left: '55%',  size: 4, dur: 27, delay: 9   },
  { top: '45%',  left: '78%',  size: 2, dur: 20, delay: 2   },
  { top: '22%',  left: '88%',  size: 3, dur: 26, delay: 6   },
  { top: '65%',  left: '90%',  size: 2, dur: 23, delay: 4   },
  { top: '88%',  left: '32%',  size: 3, dur: 29, delay: 8   },
];

export const Philosophy: React.FC = () => {
  const particles = useMemo(() => PARTICLES, []);

  return (
    <section id="philosophy" className="philosophy-section">

      {/* ── Ambient Layer (purely decorative, behind everything) ── */}
      <div className="phil-ambient" aria-hidden="true">
        <motion.div
          className="phil-glow phil-glow-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <motion.div
          className="phil-glow phil-glow-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
        />
        <motion.div
          className="phil-glow phil-glow-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.6 }}
        />
        <div className="phil-particles">
          {particles.map((p, i) => (
            <span
              key={i}
              className="phil-particle"
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container phil-content" style={{ position: 'relative', zIndex: 1 }}>
        <div className="phil-text-col">
          <motion.div className="phil-subtitle-wrapper" {...fadeUp(0)}>
            <span className="phil-subtitle">THE PHILOSOPHY</span>
            <div className="phil-line"></div>
          </motion.div>
          
          <motion.h2 className="phil-title" {...fadeUp(0.1)}>
            Curating the<br/>
            <span className="phil-title-cursive">exceptional.</span>
          </motion.h2>
          
          <motion.div className="phil-paragraphs" {...fadeUp(0.2)}>
            <p>
              Viora Elite is a closed table. Convened privately, highly curated, and 
              designed exclusively for the upper echelon of founders, builders, and creatives. 
              Every guest is chosen with intention — for the texture of their thinking, the 
              weight of their experience, and the quality of their presence.
            </p>
            <p>
              No pitches. No elevator lines. No business cards. What happens instead is 
              rarer: conversation that moves, ideas that collide, and friendships that do 
              not require a transaction to begin.
            </p>
            <p>
              This is how we used to do it. Before the world taught us to be useful 
              before we were real.
            </p>
          </motion.div>
        </div>

        <div className="phil-graphic-col">
          <motion.div 
            className="phil-new-visual"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.3 }}
          >
            {/* Floating Glass Element */}
            <div className="visual-glass-panel">
              <div className="visual-glass-content">
                <div className="phil-card-logo-svg">
                  <img src="/media/icons/logo-01.svg" alt="Viora Elite" className="phil-full-svg" />
                </div>
                <div className="visual-divider"></div>
                <span className="visual-tagline">CURATED EXPERIENCES</span>
              </div>
              
              {/* Decorative corners */}
              <div className="visual-corner top-left"></div>
              <div className="visual-corner top-right"></div>
              <div className="visual-corner bottom-left"></div>
              <div className="visual-corner bottom-right"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
