import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Requirements.css';

const requirementsData = [
  {
    num: "01",
    title: "SELECTION",
    text: "Participation is extended by invitation only. Every name at this table is chosen deliberately. Our criteria are not disclosed.",
    image: "/media/images/req1.jpg"
  },
  {
    num: "02",
    title: "DRESS",
    text: "Men: a suit. Women: cocktail attire. No exceptions. The room has an aesthetic. You are part of it the moment you walk in.",
    image: "/media/images/req2.jpg"
  },
  {
    num: "03",
    title: "RSVP",
    text: "Confirm or decline. Ghosting is a choice, and it will be treated as one. Silence results in permanent removal from all cities.",
    image: "/media/images/req3.jpg"
  },
  {
    num: "04",
    title: "PARTICIPATION FEE",
    text: "A participation fee applies. It is the filter that separates those who understand the value of a room from those who do not.",
    image: "/media/images/req4.jpg"
  },
  {
    num: "05",
    title: "THE EVENING",
    text: "Food and beverages are settled individually with the venue. You are among equals. The conversation is the hospitality.",
    image: "/media/images/req5.jpg"
  },
  {
    num: "06",
    title: "CONDUCT",
    text: "The quality of the evening is only ever as good as the people in the room. This is how we protect that."
  }
];

const FlipBookPage = ({ index, total, scrollYProgress, req }: { index: number, total: number, scrollYProgress: any, req: any }) => {
  // activeIndex ranges from 0 to total (when at total, all pages are on the left)
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, total]);

  // offset is the relative position of this page to the active index.
  // offset > 0: deep in right stack
  // offset = 0: top of right stack
  // offset between 0 and -1: currently flipping
  // offset = -1: top of left stack
  // offset < -1: deep in left stack
  const offset = useTransform(activeIndex, v => index - v);

  const rotateY = useTransform(offset, (v) => {
    if (v > 0) return v * -4; // fan right: slight negative rotation pushes right edge back
    if (v < -1) {
      const leftDepth = -v - 1;
      return -180 + (leftDepth * 4); // fan left: slight positive rotation brings left edge forward (since it's at -180)
    }
    // Flipping (v is between 0 and -1)
    // Add a non-linear ease to the rotation to make it feel like paper falling
    const progress = -v; // 0 to 1
    // easeInOutSine like curve
    const easeProgress = -(Math.cos(Math.PI * progress) - 1) / 2;
    return -180 * easeProgress;
  });

  const x = useTransform(offset, (v) => {
    if (v > 0) return v * 2; // Very tight spine binding
    if (v < -1) {
      const leftDepth = -v - 1;
      return leftDepth * 2;
    }
    return 0; // flipping
  });

  const z = useTransform(offset, (v) => {
    if (v > 0) return v * -5; // tight depth
    if (v < -1) {
      const leftDepth = -v - 1;
      return leftDepth * -5; // tight depth
    }
    // pop up dramatically during flip to simulate page lifting
    const progress = -v; // 0 to 1
    return Math.sin(progress * Math.PI) * 120;
  });

  const zIndex = useTransform(offset, (v) => {
    if (v > 0) return 100 - Math.round(v); // right stack depth
    if (v < -1) return 100 - Math.round(-v - 1); // left stack depth
    // Flipping page is always on top
    return 200;
  });

  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageWidth = isMobile ? 140 : 280;
  const pageHeight = isMobile ? 200 : 360;

  return (
    <motion.div 
      className="requirement-card-container"
      style={{
        rotateY,
        x,
        z,
        zIndex,
        transformOrigin: "left center",
        position: "absolute",
        top: 0,
        // Anchor pages exactly in the horizontal center of the screen
        left: "50%",
        width: `${pageWidth}px`,
        height: `${pageHeight}px`
      }}
    >
      {/* Front Face (Right Page) */}
      <div className="requirement-card requirement-card-front" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transform: 'translateZ(1px)' }}>
        <img src="/media/icons/spin-icon.svg" alt="Viora" style={{ width: '180px', height: '180px', opacity: 0.8 }} />
      </div>

      {/* Back Face (Left Page, visible after flip) */}
      <div className="requirement-card requirement-card-back" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)', padding: 0, overflow: 'hidden', border: 'none', background: 'transparent' }}>
        {req.image ? (
          <img 
            src={req.image} 
            alt={req.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px 0 0 15px' }} 
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f0e6', borderRadius: '15px 0 0 15px' }}>
            <img src="/media/icons/spin-icon.svg" alt="Viora" style={{ width: '180px', height: '180px', opacity: 0.8 }} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const Requirements: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Add extra scroll distance so flips feel slower and smoother
    offset: ["start start", "end end"]
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const containerHeight = isMobile ? '240px' : '450px';

  return (
    <section id="requirements" ref={targetRef} className="requirements-section" style={{ height: "400vh" }}>
      <div className="requirements-sticky-container">
        
        <div className="requirements-header">
            <motion.h2 
              className="requirements-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              The Viora<br/>
              <span className="requirements-subtitle">Way</span>
            </motion.h2>

            <motion.div
              className="requirements-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <p className="req-desc-text">
                Viora is defined by a distinct way of seeing experiences — bringing together people, places and moments with a sense of curiosity, character and quiet refinement. No two experiences are quite alike, yet each carries the same unmistakable Viora perspective.
              </p>
            </motion.div>
          </div>

        <div className="requirements-track-wrapper">
          {/* Centered container for the book spine */}
          <div className="requirements-book" style={{ width: '0px', height: containerHeight, position: 'relative' }}>
            {requirementsData.map((req, index) => (
              <FlipBookPage 
                key={index} 
                index={index} 
                total={requirementsData.length} 
                scrollYProgress={scrollYProgress} 
                req={req}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
