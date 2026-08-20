import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './TheWorld.css';

// Helper component for true parallax image placeholder
const ParallaxImage = ({ className = '' }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1.05]);
  
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
      className={`story-image-placeholder-wrapper ${className}`}
      variants={maskReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div 
        className="parallax-inner"
        style={{ y, scale }}
      >
        <div className="parallax-overlay"></div>
        <div className="parallax-text">[ Image Placement ]</div>
      </motion.div>
    </motion.div>
  );
};

// Word-by-word staggering text animation
const StaggeredText = ({ text, delay = 0, className = '', style = {} }: { text: string, delay?: number, className?: string, style?: React.CSSProperties }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay }
    }
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 16, stiffness: 100 }
    },
    hidden: {
      opacity: 0,
      y: 20,
    }
  };

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.25em", justifyContent: style.margin === '0 auto' ? 'center' : 'flex-start', ...style }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} style={{ display: "inline-block" }}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

// Line reveal for Headings
const RevealHeading = ({ children, delay = 0, className = '', style = {} }: { children: React.ReactNode, delay?: number, className?: string, style?: React.CSSProperties }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const TheWorld: React.FC = () => {
  return (
    <div className="the-world-section-container">
      <div className="the-world-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <RevealHeading>
          <h2 className="story-list-title shiny-heading" style={{ fontSize: '3rem', marginBottom: '1rem', textTransform: 'uppercase' }}>The World</h2>
        </RevealHeading>
        <StaggeredText 
          delay={0.1}
          className="intro-paragraph"
          text="What Viora explores"
          style={{ margin: '0 auto', color: 'var(--accent-gold)' }}
        />
      </div>

      {/* Section 4.1: Social */}
      <section className="story-asymmetric-section reverse">
        <div className="asym-text-col">
          <div style={{ marginTop: '2rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <RevealHeading delay={0.3} className="story-list-title" style={{ fontSize: '3rem', transition: 'color 0.3s' }}>Social</RevealHeading>
            </Link>
            <RevealHeading delay={0.4} className="collage-card-highlight" style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              House Parties · Private Dinners · Curated Gatherings
            </RevealHeading>
            <StaggeredText delay={0.5} className="story-list-desc" text="Intimate occasions brought together around exceptional company, distinctive settings and a shared appreciation for spending time well. Every gathering is shaped by its people, its atmosphere and the character of the moment." />
          </div>
        </div>
        <div className="asym-image-col">
          <div className="asym-inner-img">
            <ParallaxImage />
          </div>
        </div>
      </section>

      {/* Section 4.2: Wellness */}
      <section className="story-asymmetric-section">
        <div className="asym-text-col">
          <div style={{ marginTop: '2rem' }}>
            <Link to="/retreats/wellness" style={{ textDecoration: 'none' }}>
              <RevealHeading delay={0.1} className="story-list-title" style={{ fontSize: '3rem', transition: 'color 0.3s' }}>Wellness</RevealHeading>
            </Link>
            <RevealHeading delay={0.2} className="collage-card-highlight" style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Wellness · Recovery · Mindfulness · Spa Experiences
            </RevealHeading>
            <StaggeredText delay={0.3} className="story-list-desc" text="Experiences designed to restore, reset and reconnect - from considered moments of stillness to elevated approaches to wellbeing. A space to slow down, step back and return renewed." />
          </div>
        </div>
        <div className="asym-image-col">
          <div className="asym-inner-img">
            <ParallaxImage />
          </div>
        </div>
      </section>

      {/* Section 4.3: Movement */}
      <section className="story-asymmetric-section reverse">
        <div className="asym-text-col">
          <div style={{ marginTop: '2rem' }}>
            <Link to="/retreats/movement" style={{ textDecoration: 'none' }}>
              <RevealHeading delay={0.1} className="story-list-title" style={{ fontSize: '3rem', transition: 'color 0.3s' }}>Movement</RevealHeading>
            </Link>
            <RevealHeading delay={0.2} className="collage-card-highlight" style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Fitness · Training · Sport · Active Experiences
            </RevealHeading>
            <StaggeredText delay={0.3} className="story-list-desc" text="A more elevated approach to movement, bringing together fitness, sport and active pursuits in considered settings. For experiences that challenge, energise and leave you wanting more." />
          </div>
        </div>
        <div className="asym-image-col">
          <div className="asym-inner-img">
            <ParallaxImage />
          </div>
        </div>
      </section>

      {/* Section 4.4: Escapes */}
      <section className="story-asymmetric-section">
        <div className="asym-text-col">
          <div style={{ marginTop: '2rem' }}>
            <Link to="/retreats/cottage" style={{ textDecoration: 'none' }}>
              <RevealHeading delay={0.1} className="story-list-title" style={{ fontSize: '3rem', transition: 'color 0.3s' }}>Escapes</RevealHeading>
            </Link>
            <RevealHeading delay={0.2} className="collage-card-highlight" style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Cottages · Villas · Retreats · Destinations
            </RevealHeading>
            <StaggeredText delay={0.3} className="story-list-desc" text="A collection of stays and escapes chosen for their setting, character and sense of discovery. Private spaces and distinctive destinations that offer a reason to leave the familiar behind." />
          </div>
        </div>
        <div className="asym-image-col">
          <div className="asym-inner-img">
            <ParallaxImage />
          </div>
        </div>
      </section>

      {/* Section 4.5: Culture */}
      <section className="story-asymmetric-section reverse">
        <div className="asym-text-col">
          <div style={{ marginTop: '2rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <RevealHeading delay={0.1} className="story-list-title" style={{ fontSize: '3rem', transition: 'color 0.3s' }}>Culture</RevealHeading>
            </Link>
            <RevealHeading delay={0.2} className="collage-card-highlight" style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Art · Music · Cinema · Culinary · Design
            </RevealHeading>
            <StaggeredText delay={0.3} className="story-list-desc" text="Experiences shaped by creativity, culture and the things that inspire conversation. From art and design to music, cinema and the culinary world, each one offers another way to discover something new." />
          </div>
        </div>
        <div className="asym-image-col">
          <div className="asym-inner-img">
            <ParallaxImage />
          </div>
        </div>
      </section>
    </div>
  );
};
