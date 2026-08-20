import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './Cottage.css';

const COTTAGE_DATA = [
  { id: 1, title: 'The Willow', desc: 'A serene retreat by the whispering willows.', body: 'Step into a world where timeless architecture meets the raw beauty of nature. The Willow cottage offers exclusive dining and private nature walks.' },
  { id: 2, title: 'Oak Retreat', desc: 'Rustic charm with modern luxury.', body: 'Surrounded by ancient oaks, this retreat offers the perfect blend of natural rustic elements and ultra-modern amenities. Enjoy a sunken tub and fire pit.' },
  { id: 3, title: 'Pine Haven', desc: 'Ancient pines and absolute privacy.', body: 'Tucked deep in the forest, Pine Haven provides an immersive nature experience with absolute seclusion and bespoke services tailored to you.' },
  { id: 4, title: 'Cedar Lodge', desc: 'A grand estate for luxury seekers.', body: 'Expansive decks, panoramic views, and exquisite interior design define the Cedar Lodge experience. Perfect for larger groups or lavish escapes.' },
  { id: 5, title: 'The Birch', desc: 'Light, airy, and beautifully minimal.', body: 'The Birch cottage features floor-to-ceiling windows that blur the lines between the indoors and the wild outdoors, flooding the space with natural light.' },
  { id: 6, title: 'Maple Sanctuary', desc: 'Warm hues and a cozy setting.', body: 'Designed for intimacy, the Maple Sanctuary is a perfect romantic getaway nestled among vibrant seasonal foliage and peaceful winding paths.' },
];

const CottageCard = ({ data, index, scroll100, onClick }: any) => {
  // Calculate keyframes based on index on a 0-100 scale
  const peak = index * 15; 
  const p1 = peak - 20; // Start at bottom
  const p2 = peak - 10; // Mid-way up
  const p3 = peak;      // Center / Peak
  const p4 = peak + 10; // Mid-way down
  const p5 = peak + 20; // End at top

  // 5-point interpolation to create a smooth, curved arc along the giant black arch
  const x = useTransform(scroll100, [p1, p2, p3, p4, p5], ['60vw', '15vw', '0vw', '15vw', '60vw']);
  const y = useTransform(scroll100, [p1, p2, p3, p4, p5], ['100vh', '55vh', '15vh', '-25vh', '-70vh']);
  const rotate = useTransform(scroll100, [p1, p2, p3, p4, p5], [-40, -20, 0, 20, 40]);
  const opacity = useTransform(scroll100, [p1, p1 + 5, p3, p5 - 5, p5], [0, 1, 1, 1, 0]);
  const scale = useTransform(scroll100, [p1, p3, p5], [0.8, 1, 0.8]);

  return (
    <motion.div 
      className="cottage-card"
      style={{ x, y, rotate, opacity, scale }}
      onClick={() => onClick(data)}
      layoutId={`card-${data.id}`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="cottage-card-inner">
        <h4>{data.title}</h4>
        <p>{data.desc}</p>
        <span className="card-number">0{data.id} / 06</span>
      </div>
    </motion.div>
  );
};

export const Cottage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scroll100 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="cottage-page" ref={containerRef} style={{ height: '400vh', background: 'var(--bg-color)' }}>
      {/* Sticky Container for Animation */}
      <div className="cottage-sticky-container">
        
        {/* Giant Archway */}
        <div className="giant-arch" />

        {/* Global Heading */}
        <div className="cottage-global-heading">
          <h2>Cottage Retreats</h2>
          <div className="heading-line"></div>
        </div>

        {/* --- CARDS --- */}
        {COTTAGE_DATA.map((card, idx) => (
          <CottageCard 
            key={card.id} 
            data={card} 
            index={idx} 
            scroll100={scroll100} 
            onClick={setSelectedCard} 
          />
        ))}
      </div>

      {/* --- MODAL / POP-OUT --- */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div 
            className="cottage-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div 
              className="cottage-modal-card"
              layoutId={`card-${selectedCard.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cottage-modal-inner">
                <button className="cottage-modal-close" onClick={() => setSelectedCard(null)}>
                  ✕
                </button>
                <h5 className="article-eyebrow">Article</h5>
                <h2 className="article-title">{selectedCard.title}</h2>
                <div className="article-divider"></div>
                <p className="article-body">{selectedCard.body}</p>
                <button className="article-btn">Reserve Now</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
