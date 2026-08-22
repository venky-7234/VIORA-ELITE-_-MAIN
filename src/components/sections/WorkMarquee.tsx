import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
import './WorkMarquee.css';

interface ParallaxRowProps {
  baseVelocity: number;
  items: number[];
  rowId: string;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ParallaxRow: React.FC<ParallaxRowProps> = ({ baseVelocity = 100, items, rowId }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Optional: Reverse direction when scrolling up
    // if (velocityFactor.get() < 0) {
    //   directionFactor.current = -1;
    // } else if (velocityFactor.get() > 0) {
    //   directionFactor.current = 1;
    // }

    // Add scroll velocity to the movement
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // The track is composed of two identical sets of items.
  // By shifting from 0% to -50% of the track's own width, 
  // we seamlessly loop the content.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div className="marquee-row">
      <motion.div className="marquee-track" style={{ x }}>
        {[...items, ...items].map((id, index) => (
          <div key={`${rowId}-${id}-${index}`} className="marquee-card">
            <div className="marquee-placeholder-anim"></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const WorkMarquee: React.FC = () => {
  // Generate placeholder cards for two rows
  const row1Cards = Array.from({ length: 8 }, (_, i) => i);
  const row2Cards = Array.from({ length: 8 }, (_, i) => i + 8);

  return (
    <section id="work" className="work-marquee-section">
      <div className="work-marquee-container">
        {/* Row 1: Moves Left (- velocity) */}
        <ParallaxRow baseVelocity={-3} items={row1Cards} rowId="row1" />
        {/* Row 2: Moves Right (+ velocity) */}
        <ParallaxRow baseVelocity={3} items={row2Cards} rowId="row2" />
      </div>
    </section>
  );
};
