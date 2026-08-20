import React from 'react';
import { Button } from '../common/Button';
import './WorkMarquee.css';

export const WorkMarquee: React.FC = () => {
  // Generate placeholder cards for two rows
  const row1Cards = Array.from({ length: 8 }, (_, i) => i);
  const row2Cards = Array.from({ length: 8 }, (_, i) => i + 8);

  return (
    <section id="work" className="work-marquee-section">
      <div className="work-marquee-container">
        {/* Row 1: Moves Left */}
        <div className="marquee-row row-left">
          <div className="marquee-track">
            {[...row1Cards, ...row1Cards].map((id, index) => (
              <div key={`row1-${id}-${index}`} className="marquee-card">
                <div className="marquee-placeholder-anim"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="marquee-row row-right">
          <div className="marquee-track">
            {[...row2Cards, ...row2Cards].map((id, index) => (
              <div key={`row2-${id}-${index}`} className="marquee-card">
                <div className="marquee-placeholder-anim"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
