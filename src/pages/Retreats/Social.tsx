import React, { useEffect } from 'react';
import './Social.css';
import { motion } from 'framer-motion';

export const Social: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="social-page">
      <motion.div 
        className="social-video-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <video 
          className="social-video-element"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/social-animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="social-overlay-text">
          <motion.h1 
            className="social-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Social
          </motion.h1>
          <motion.p 
            className="social-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Connect, inspire, and elevate.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
