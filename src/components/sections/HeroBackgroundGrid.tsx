import React from 'react';
import './HeroBackgroundGrid.css';

const heroImages = [
  "https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/DSC01489_1_11zon_1_11zon.webp",
  "https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/DSC01493_2_11zon_2_11zon.webp",
  "https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/DSC01505-2_3_11zon_3_11zon.webp",
  "https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/DSC01562_4_11zon_4_11zon.webp",
  "https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/DSC01568-2_5_11zon_5_11zon.webp",
  "https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/DSC01604-2_6_11zon_6_11zon.webp",
  "https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/DSC01616_7_11zon_7_11zon.webp",
  "https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/DSC01618-2_8_11zon_8_11zon.webp",
  "https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/DSC01666-2_9_11zon_9_11zon.webp"
];

export const HeroBackgroundGrid: React.FC = () => {
  // We'll create 8 columns to make the cards smaller.
  // Each column will have 10 cards, duplicated once (20 total).
  // This drastically reduces DOM elements to prevent freezing.
  const cols = [
    { direction: 'up', cards: 12 },
    { direction: 'down', cards: 12 },
    { direction: 'up', cards: 12 },
    { direction: 'down', cards: 12 },
    { direction: 'up', cards: 12 },
    { direction: 'down', cards: 12 },
    { direction: 'up', cards: 12 },
    { direction: 'down', cards: 12 },
  ];

  return (
    <div className="hero-bg-grid-container">
      {/* The vignette overlay keeps the center and edges dark for legibility */}
      <div className="hero-bg-grid-overlay" />
      
      <div className="hero-bg-grid">
        {cols.map((col, i) => (
          <div key={i} className={`hero-bg-col ${col.direction}`}>
            {/* Original set of cards */}
            {Array.from({ length: col.cards }).map((_, j) => {
              const imageIndex = (i * col.cards + j) % heroImages.length;
              return (
                <div key={`orig-${j}`} className="hero-bg-card">
                  <img 
                    src={heroImages[imageIndex]} 
                    alt="" 
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              );
            })}
            {/* Duplicated set of cards for seamless infinite loop */}
            {Array.from({ length: col.cards }).map((_, j) => {
              const imageIndex = (i * col.cards + j) % heroImages.length;
              return (
                <div key={`dup-${j}`} className="hero-bg-card">
                  <img 
                    src={heroImages[imageIndex]} 
                    alt="" 
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
