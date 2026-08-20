import React from 'react';
import './HeroBackgroundGrid.css';

export const HeroBackgroundGrid: React.FC = () => {
  // We'll create 8 columns to make the cards smaller.
  // Each column will have 8 cards, duplicated once (16 total).
  const cols = [
    { direction: 'up', cards: 8 },
    { direction: 'down', cards: 8 },
    { direction: 'up', cards: 8 },
    { direction: 'down', cards: 8 },
    { direction: 'up', cards: 8 },
    { direction: 'down', cards: 8 },
    { direction: 'up', cards: 8 },
    { direction: 'down', cards: 8 },
  ];

  return (
    <div className="hero-bg-grid-container">
      {/* The vignette overlay keeps the center and edges dark for legibility */}
      <div className="hero-bg-grid-overlay" />
      
      <div className="hero-bg-grid">
        {cols.map((col, i) => (
          <div key={i} className={`hero-bg-col ${col.direction}`}>
            {/* Original set of cards */}
            {Array.from({ length: col.cards }).map((_, j) => (
              <div key={`orig-${j}`} className="hero-bg-card" />
            ))}
            {/* Duplicated set of cards for seamless infinite loop */}
            {Array.from({ length: col.cards }).map((_, j) => (
              <div key={`dup-${j}`} className="hero-bg-card" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
