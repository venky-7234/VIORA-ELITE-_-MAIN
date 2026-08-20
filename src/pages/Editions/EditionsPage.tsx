import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './EditionsPage.css';

// Parallax image placeholder component
const ParallaxImage = ({ className = '' }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  
  const maskReveal: any = {
    hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    visible: { 
      clipPath: "inset(0% 0 0 0)", 
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div 
      ref={ref} 
      className={`edition-image-container ${className}`}
      variants={maskReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div 
        className="edition-parallax-inner"
        style={{ y, scale }}
      >
        <div className="edition-parallax-text">[ Edition Image ]</div>
      </motion.div>
    </motion.div>
  );
};

// Fade up animation for text elements
const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const EditionsPage: React.FC = () => {
  const editions = [
    {
      num: "01",
      title: "THE HOUR OF GOLD",
      subtitle: "An experience suspended in golden light.",
      desc: "A fleeting gathering shaped around the quiet magic of sunset, where the atmosphere changes with the light and the moment is allowed to unfold naturally."
    },
    {
      num: "02",
      title: "THE COLLECTOR'S EVENING",
      subtitle: "Art · Culture · Conversation",
      desc: "An intimate meeting of creative minds, curious perspectives, and collected works — where conversation becomes part of the experience."
    },
    {
      num: "03",
      title: "BLACK OBSIDIAN",
      subtitle: "The no-menu dinner.",
      desc: "A dining experience built around surprise, where the evening is revealed one course at a time, and the unexpected becomes part of the table."
    },
    {
      num: "04",
      title: "THE UNPLUG",
      subtitle: "A dinner without the distraction.",
      desc: "A slower kind of gathering, designed to put the outside world aside and make room for conversation, connection and being fully present."
    },
    {
      num: "05",
      title: "THE PERFUMER'S BALL",
      subtitle: "Scent as the evening's signature.",
      desc: "An immersive exploration of fragrance, crafted through layers of scent, atmosphere and discovery — with a signature to carry beyond."
    }
  ];

  return (
    <div className="editions-page">
      <div className="container">
        
        <div className="editions-header">
          <FadeUp>
            <h1 className="editions-title shiny-heading">EDITIONS</h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="editions-intro">
              Every Viora edition begins with an idea.<br/>
              A mood, a setting, a sense of curiosity — brought together into an experience with a character of its own.<br/><br/>
              These are a few of the worlds Viora is preparing to bring to life.
            </p>
          </FadeUp>
        </div>

        <div className="editions-list">
          {editions.map((edition, index) => (
            <div key={index} className="edition-item">
              <div className="edition-heading">
                <FadeUp>
                  <h2 className="edition-number-title">
                    <span style={{ color: 'var(--accent-color)', marginRight: '1rem' }}>{edition.num} —</span> 
                    {edition.title}
                  </h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <p className="edition-subtitle">{edition.subtitle}</p>
                </FadeUp>
              </div>

              <ParallaxImage />

              <FadeUp delay={0.2}>
                <p className="edition-description">{edition.desc}</p>
              </FadeUp>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};
