import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../common/GlassCard';
import { Star, Quote } from 'lucide-react';
import './Testimonials.css';

const EASE_OUT: [number,number,number,number] = [0.16, 1, 0.3, 1];

const reviews = [
  {
    id: 1,
    quote: "The Viora house party was unlike anything I've experienced — a stunning private villa, hand-picked crowd, world-class DJ, and cocktails that were genuinely crafted. Zero randoms, only real ones. I left with three business relationships and memories that last a lifetime.",
    author: "Aditya V.",
    role: "SaaS Founder",
    cohort: "VIORA.03 — House Party, Goa Villa",
    tag: "🏠 House Party"
  },
  {
    id: 2,
    quote: "The cottage retreat was pure magic. Woke up to misty hills, did sunrise yoga with founders I admire, ate the most incredible farm-to-table breakfast, and had bonfire conversations that genuinely shifted my perspective. This is what real networking looks like.",
    author: "Sneha R.",
    role: "Creative Director",
    cohort: "VIORA.05 — Cottage Retreat, Coorg",
    tag: "🌿 Cottage Retreat"
  },
  {
    id: 3,
    quote: "Viora's fitness retreat completely reset me. Three days of HIIT at sunrise, breathwork sessions, clean eating, and being surrounded by high-performers who actually walk the talk. I came back sharper, fitter, and with a tribe that holds me accountable.",
    author: "Rohan M.",
    role: "Fintech VC",
    cohort: "VIORA.07 — Fitness Retreat, Lonavala",
    tag: "💪 Fitness Retreat"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section">
      <div className="container">

        {/* Header */}
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            Testimonials
          </motion.h2>
          <motion.div
            className="section-line"
            initial={{ scaleX: 0, opacity: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
          ></motion.div>
        </div>

        {/* Testimonials Grid — staggered */}
        <motion.div
          className="testimonials-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={{
                hidden: { opacity: 0, y: 48 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
              }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
            >
              <GlassCard className="testimonial-card" glow>
                <div className="testimonial-header">
                  <Quote size={32} className="quote-icon" />
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--accent-color)" color="var(--accent-color)" />
                    ))}
                  </div>
                </div>
                <span className="testimonial-tag">{review.tag}</span>
                <p className="testimonial-text">"{review.quote}"</p>
                <div className="testimonial-divider"></div>
                <div className="testimonial-author-details">
                  <span className="author-name">{review.author}</span>
                  <span className="author-role">{review.role} • <span className="author-cohort">{review.cohort}</span></span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
