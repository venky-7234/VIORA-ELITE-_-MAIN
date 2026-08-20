import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { GlassCard } from '../common/GlassCard';
import { Send, CheckCircle2, Copy } from 'lucide-react';
import './CTA.css';

const EASE_OUT: [number,number,number,number] = [0.16, 1, 0.3, 1];

export const CTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    vibe: 'party',
    note: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Generate random confirmation number
    const randNum = Math.floor(1000 + Math.random() * 9000);
    setTicketNumber(`VIORA-HYD-${randNum}`);
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="apply-section" className="cta-section">
      <div className="container cta-container">
        
        {/* Left Column: Heading text — slides from left */}
        <motion.div
          className="cta-info"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: EASE_OUT }}
        >
          <span className="section-subtitle">Request Access</span>
          <h2 className="cta-title">Apply for the <br /><span className="gradient-text">Next Cohort.</span></h2>
          <p className="cta-desc">
            We review applications weekly. Vetting focuses on personality synergy, professionalism, and community participation. Apply today to secure your invitation to VIORA.08.
          </p>
          
          <div className="cta-process-list">
            <div className="process-item">
              <span className="process-num">01</span>
              <div>
                <h4>Submit Request</h4>
                <p>Provide your details, links, and cohort preference.</p>
              </div>
            </div>
            <div className="process-item">
              <span className="process-num">02</span>
              <div>
                <h4>Personal Vetting</h4>
                <p>Our committee reviews profiles to match cohort alignment.</p>
              </div>
            </div>
            <div className="process-item">
              <span className="process-num">03</span>
              <div>
                <h4>Invite Issued</h4>
                <p>Receive your confirmation number and secure your spot.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Form Card — slides from right */}
        <motion.div
          className="cta-form-wrapper"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.15 }}
        >
          <GlassCard className="cta-form-card" glow hoverEffect={false}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="cta-form">
                <h3 className="form-title">Application Form</h3>
                
                <div className="form-group">
                  <label htmlFor="name-input">Full Name</label>
                  <input 
                    type="text" 
                    id="name-input"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email-input">Email Address</label>
                  <input 
                    type="email" 
                    id="email-input"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="linkedin-input">LinkedIn / Profile URL</label>
                  <input 
                    type="url" 
                    id="linkedin-input"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="vibe-select">Preferred Vibe</label>
                  <select 
                    id="vibe-select"
                    value={formData.vibe}
                    onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
                  >
                    <option value="party">House Parties & Mixers</option>
                    <option value="cottage">Cottage Retreats</option>
                    <option value="fitness">Fitness & Wellness Retreats</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="note-input">Why VIORA? (Optional)</label>
                  <textarea 
                    id="note-input"
                    rows={3}
                    placeholder="What value do you bring to the cohort room?"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  />
                </div>

                <Button 
                  id="form-submit-btn"
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  glow
                >
                  <Send size={16} />
                  Submit Application
                </Button>
              </form>
            ) : (
              <div className="form-success-state">
                <CheckCircle2 size={56} className="success-icon" />
                <h3 className="success-title">Application Submitted</h3>
                <p className="success-desc">
                  Thank you, <strong>{formData.name}</strong>. Our onboarding committee is reviewing your profile.
                </p>
                
                <div className="ticket-card">
                  <span className="ticket-label">Application Reference ID</span>
                  <div className="ticket-number-wrapper">
                    <span className="ticket-number">{ticketNumber}</span>
                    <button 
                      type="button" 
                      onClick={handleCopy} 
                      className="ticket-copy-btn"
                      aria-label="Copy ticket number"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  {copied && <span className="copy-confirm">Copied to clipboard</span>}
                </div>

                <p className="success-timeline">
                  Expect a personal follow-up email at <strong>{formData.email}</strong> within 3-5 business days.
                </p>

                <Button 
                  id="success-done-btn"
                  variant="secondary" 
                  fullWidth 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', linkedin: '', vibe: 'party', note: '' });
                  }}
                >
                  Submit Another Application
                </Button>
              </div>
            )}
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
};
export default CTA;
