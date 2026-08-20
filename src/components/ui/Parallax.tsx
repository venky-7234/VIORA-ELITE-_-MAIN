import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  /** 
   * speed = 1 means normal scroll speed. 
   * speed > 1 makes the element scroll faster (parallax foreground).
   * speed < 1 makes the element scroll slower (parallax background).
   */
  speed?: number; 
  className?: string;
  id?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({ children, speed = 1, className = '', id }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track this element's position relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // If speed is 1, distance is 0 (no parallax).
  // If speed is 0.8, distance is 0.2 * 300 = 60px.
  // If speed is 1.5, distance is -0.5 * 300 = -150px.
  // 300px determines the intensity of the parallax effect.
  const distance = (1 - speed) * 300;
  
  // Map the scroll progress to the Y translation
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    // The outer div acts as the scroll tracker trigger
    <div ref={ref} className={className} id={id} style={{ overflow: 'visible', width: '100%' }}>
      {/* The inner motion.div actually moves */}
      <motion.div style={{ y, width: '100%', height: '100%' }}>
        {children}
      </motion.div>
    </div>
  );
};
