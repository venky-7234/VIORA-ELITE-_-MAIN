import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Wellness.css';

const wellnessRetreats = [
  {
    id: 1,
    title: 'Yoga & Movement',
    desc: 'Align your body and mind with our expert-led yoga flows. Suitable for all levels, these sessions promote flexibility, strength, and inner peace.',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Mindfulness',
    desc: 'Disconnect from the noise and reconnect with yourself. Guided meditation and sound healing therapies in absolute tranquility.',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Spa & Therapy',
    desc: 'Rejuvenate with world-class spa treatments. From deep tissue massage to holistic therapies designed to cleanse your physical being.',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Detox & Nutrition',
    desc: 'Nourish your body from the inside out with organic, chef-curated meals and detoxifying regimens tailored to your metabolic needs.',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Nature Immersion',
    desc: 'Embrace the healing power of nature through guided forest bathing, scenic hikes, and outdoor grounding exercises.',
    img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1000&auto=format&fit=crop'
  }
];

export const Wellness: React.FC = () => {
  const [activeCard, setActiveCard] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wellness-page">
      <div className="wellness-header">
        <motion.h2 
          className="wellness-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Wellness Retreats
        </motion.h2>
        <motion.div 
          className="wellness-line"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.6, width: 60 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>
      </div>

      <div className="flex-gallery-container">
        {wellnessRetreats.map((retreat) => (
          <div 
            key={retreat.id}
            className={`flex-card ${activeCard === retreat.id ? 'active' : ''}`}
            onClick={() => setActiveCard(retreat.id)}
            onMouseEnter={() => setActiveCard(retreat.id)}
          >
            <div className="flex-card-bg" style={{ backgroundImage: `url(${retreat.img})` }}></div>
            <div className="flex-card-content">
              {/* Text removed as requested */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
