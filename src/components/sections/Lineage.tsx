import React from 'react';
import { motion } from 'framer-motion';
import './Lineage.css';

const lineageData = [
  {
    num: "01 — INVITATION",
    date: "Personal by design.",
    location: "Every invitation is extended individually. We choose the name before we choose the send button. If it reaches you, it was meant to."
  },
  {
    num: "02 — ATTIRE",
    date: "Dress accordingly.",
    location: "Every edition carries its own dress code, which is shared with your invitation. “I didn’t know” is rarely a compelling look."
  },
  {
    num: "03 — TICKETING",
    date: "There is a process.",
    location: "Request an invitation. Wait for confirmation. Secure your place once selected. Tickets are priced according to the edition - and, naturally, we’re not designed for impulse purchases. We thought we'd spare you the usual “Buy Now” button."
  },
  {
    num: "04 — ARRIVAL",
    date: "Details, when they're due.",
    location: "Location, timing, and entry instructions are shared ahead of the experience. Being fashionably late is still late."
  },
  {
    num: "05 — THE ROOM",
    date: "The room has its own rhythm.",
    location: "Every edition brings together a considered mix of people, setting and atmosphere. The guest list, quite deliberately, does the rest."
  },
  {
    num: "06 — THE ETIQUETTE",
    date: "Some things stay in the room.",
    location: "Photography, recording, and edition-specific guidelines are communicated in advance. Not everything needs to become content."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};


export const Lineage: React.FC = () => {
  return (
    <section id="lineage" className="lineage-section">
      <div className="container">

        <div className="lineage-header">
          <motion.div
            className="lineage-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            THE VIORA CODE <span className="lineage-line"></span>
          </motion.div>

          <motion.h2
            className="lineage-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Six things worth knowing<br />
            <span className="lineage-subtitle">before you arrive</span>
          </motion.h2>
        </div>

        <motion.div
          className="lineage-scrubber-container"
          style={{ width: '100%', marginBottom: '2rem' }}
        >
          {/* The Scrubber Line that moves left to right */}
          <motion.div
            className="lineage-scrubber"
            style={{ height: '2px', backgroundColor: 'var(--accent-color)', originX: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="lineage-stack"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          {lineageData.map((item, index) => (
            <motion.div
              key={index}
              className="lineage-card glow-on-hover"
              style={{
                position: 'sticky',
                top: `${130 + index * 25}px`, // creates the stacking offset
                zIndex: index,
                overflow: 'hidden',
                boxShadow: index > 0 ? '0 -20px 40px rgba(0,0,0,0.4)' : 'none' // casts shadow on card behind it
              }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15 } // Sequence the internal elements
                }
              }}
            >
              {/* The Mask that uncovers the card content */}
              <motion.div
                className="lineage-mask"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--bg-color)',
                  zIndex: 10,
                  originX: 1 // Shrinks to the right
                }}
                variants={{
                  hidden: { scaleX: 1 },
                  visible: { scaleX: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* The Icon (Roman Numeral) that pops in */}
                <motion.div
                  className="lineage-num"
                  variants={{
                    hidden: { scale: 0.5, opacity: 0 },
                    visible: { scale: 1, opacity: 0.3, transition: { duration: 0.5, ease: "backOut" } }
                  }}
                >
                  {item.num}
                </motion.div>

                {/* The Text that fades and scales in */}
                <motion.h3
                  className="lineage-date"
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                  }}
                >
                  {item.date}
                </motion.h3>

                <motion.p
                  className="lineage-location"
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                  }}
                >
                  {item.location}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
