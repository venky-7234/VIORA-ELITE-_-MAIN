import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { GlassCard } from '../common/GlassCard';
import { CheckCircle, Music, Zap, Utensils, Sparkles, MapPin } from 'lucide-react';
import './Experiences.css';

interface ExperiencesProps {
  onApplyClick: () => void;
}

type TabType = 'sundowner' | 'takeover' | 'dinner';

export const Experiences: React.FC<ExperiencesProps> = ({ onApplyClick }) => {
  const [activeTab, setActiveTab] = useState<TabType>('sundowner');

  const tabData = {
    sundowner: {
      title: 'Wellness Retreats',
      subtitle: 'Curated private house parties that hit different.',
      image: '/house_party_toast.jpg',
      desc: 'We plan and host premium house parties at exclusive private estates — from intimate 30-person gatherings to full villa takeovers. Every detail is handled: DJ bookings, bar setup, catering, and guest experience.',
      highlights: [
        'Venue Scouting: premium private villas, penthouses & bungalows sourced for you.',
        'Custom DJ & Live Acts: curated house music lineups matching your vibe perfectly.',
        'Premium Bar Service: artisan cocktails, curated wines & premium spirits on-tap.',
        'End-to-End Production: lighting rigs, sound systems, decor & photobooth included.'
      ],
      location: 'Hyderabad Estates & Goa Villas',
      frequency: 'Monthly Editions',
      icon: <Music size={18} />
    },
    takeover: {
      title: 'Cottage Retreats',
      subtitle: 'Secluded stays in handpicked private cottages & bungalows.',
      image: '/cottage_retreat.jpg',
      desc: 'Step away from the city and into a curated world of calm. Viora sources exclusive cottage estates and garden bungalows for intimate weekend escapes — restoring energy, forging real bonds, and inspiring deep conversations.',
      highlights: [
        'Handpicked Properties: architect-designed cottages, garden homes & private bungalows.',
        'Curated Guest Circle: intimate groups of 15–30 vetted founders, creators & thinkers.',
        'Artisan Dining: private chef-hosted meals using locally-sourced, seasonal ingredients.',
        'Rejuvenation Programming: sunrise yoga, nature walks, bonfire evenings & mindful sessions.'
      ],
      location: 'Weekend Getaways, South India',
      frequency: 'Bi-Monthly Editions',
      icon: <Zap size={18} />
    },
    dinner: {
      title: 'Movement',
      subtitle: 'Recharge your body, reset your mind, reconnect with your tribe.',
      image: '/fitness_retreat.jpg',
      desc: 'Viora curates exclusive outdoor movement retreats — combining group yoga, guided meditation, and high-performance training sessions in stunning open-air settings. Designed for peak performers who value wellness as much as ambition.',
      highlights: [
        'Guided Yoga & Meditation: certified instructors leading sunrise & sunset sessions outdoors.',
        'High-Performance Training: HIIT, functional fitness & strength sessions for all levels.',
        'Holistic Nutrition: chef-prepared clean-eating meals & recovery smoothie stations.',
        'Mindset Workshops: breathwork, journaling circles & expert-led mental wellness sessions.'
      ],
      location: 'Private Estates & Nature Retreats',
      frequency: 'Monthly Editions',
      icon: <Utensils size={18} />
    }
  };

  const tabKeys = Object.keys(tabData) as TabType[];
  const activeContent = tabData[activeTab];

  return (
    <section id="retreats" className="experiences-section">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">Experiences</h2>
          <div className="section-line"></div>
        </div>

        <div className="split-screen-container">
          
          {/* Left Column: List of Experiences */}
          <div className="split-left-column">
            {tabKeys.map((key) => {
               const item = tabData[key];
               const isActive = activeTab === key;
               return (
                 <div 
                   key={key} 
                   className={`experience-list-item ${isActive ? 'active' : ''}`}
                   onClick={() => setActiveTab(key)}
                 >
                   <div className="item-icon-wrapper">
                     {item.icon}
                   </div>
                   <div className="item-text">
                     <h3>{item.title}</h3>
                     <p>{item.subtitle}</p>
                   </div>
                   {isActive && (
                     <motion.div 
                       layoutId="active-indicator" 
                       className="active-indicator" 
                       transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                     />
                   )}
                 </div>
               )
            })}
          </div>

          {/* Right Column: Active Experience Details & Image */}
          <div className="split-right-column">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="experience-detail-card"
              >
                <GlassCard className="panel-card" hoverEffect={false} glow>
                  {/* Image Header */}
                  <div className="panel-image-wrapper">
                    <div className="panel-image-badge">
                      <MapPin size={14} />
                      <span>{activeContent.location}</span>
                    </div>
                    <img src={activeContent.image} alt={activeContent.title} className="panel-img" />
                    <div className="panel-image-overlay"></div>
                  </div>

                  {/* Details Body */}
                  <div className="panel-details">
                    <div className="panel-meta">
                      <span className="meta-icon">{activeContent.icon}</span>
                      <span className="meta-text">{activeContent.frequency}</span>
                    </div>
                    
                    <h3 className="panel-title">{activeContent.title}</h3>
                    <p className="panel-desc">{activeContent.desc}</p>
                    
                    <div className="panel-highlights">
                      {activeContent.highlights.map((highlight, index) => {
                        const [boldText, normalText] = highlight.split(':');
                        return (
                          <div key={index} className="highlight-item">
                            <CheckCircle size={18} className="highlight-check" />
                            <span className="highlight-text">
                              <strong>{boldText}</strong>{normalText && `:${normalText}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="panel-cta">
                      <Button 
                        id="retreat-inquire-btn"
                        variant="primary" 
                        size="md" 
                        onClick={onApplyClick}
                      >
                        <Sparkles size={16} />
                        Inquire About This Vibe
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
