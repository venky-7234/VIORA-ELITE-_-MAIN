import React, { useState } from 'react';
import { Button } from '../common/Button';
import { GlassCard } from '../common/GlassCard';
import { Check, Sparkles } from 'lucide-react';
import './Pricing.css';

interface PricingProps {
  onApplyClick: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onApplyClick }) => {
  const [billingCycle, setBillingCycle] = useState<'single' | 'annual'>('single');

  const plans = [
    {
      name: 'Edition Pass',
      price: billingCycle === 'single' ? '₹14,990' : '₹12,490',
      period: billingCycle === 'single' ? '/ event' : '/ event (billed annually)',
      desc: 'Access to a single selected local edition party or sundowner, ideal for first-timers.',
      features: [
        'Entry to 1 Chosen Event (Villa Party/Sundowner)',
        'Vetted Cohort Matching Access',
        'Signature Craft Mixology Cocktails',
        'Chef-curated Buffet & Tapas Plates',
        'Viora Cohort Slack Community'
      ],
      popular: false
    },
    {
      name: 'Elite Annual Pass',
      price: billingCycle === 'single' ? '₹49,990' : '₹42,990',
      period: billingCycle === 'single' ? '/ year' : '/ year (billed annually)',
      desc: 'Complete access to all club takeovers, sundowners, and our global cohort database.',
      features: [
        'Access to 4 Annual Takeovers & Sundowners',
        'Vetted Guest Directory access',
        'VIP Lounges & Private Table allocations',
        'Custom Melodic DJ set pre-show access',
        'Premium Slack & Local City Chapters',
        '1 Companion Guest Invite per year'
      ],
      popular: true
    },
    {
      name: 'Founders Table',
      price: billingCycle === 'single' ? '₹99,990' : '₹84,990',
      period: billingCycle === 'single' ? '/ year' : '/ year (billed annually)',
      desc: 'Bespoke fine-dining networking events and private table placements at takeovers.',
      features: [
        'All Elite Annual Pass Access',
        '2 Private Advisory Board Dinners (12 pax max)',
        'VIP Backstage pass & DJ Deck access',
        '1-on-1 VC & Founder Matchmaking',
        'Concierge Bottle Service & Booking Support',
        'Permanent Lifetime Chapter Seat'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">Membership</span>
          <h2 className="section-title">Value-Driven Contribution.</h2>
          <p className="section-desc">
            We operate on a shared-contribution model to sustain private estate bookings, premium sound and light productions, and world-class culinary curations. Select your membership format.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="billing-toggle-wrapper">
          <span className={`toggle-label ${billingCycle === 'single' ? 'toggle-label-active' : ''}`}>Single Pass</span>
          <button 
            id="pricing-billing-toggle-btn"
            className="billing-toggle-btn"
            onClick={() => setBillingCycle(billingCycle === 'single' ? 'annual' : 'single')}
            aria-label="Toggle billing cycle"
          >
            <div className={`toggle-slider ${billingCycle === 'annual' ? 'toggle-slider-active' : ''}`}></div>
          </button>
          <span className={`toggle-label ${billingCycle === 'annual' ? 'toggle-label-active' : ''}`}>
            Annual Plan <span className="toggle-discount">Save 15%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {plans.map((plan) => (
            <GlassCard 
              key={plan.name} 
              className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
              glow={plan.popular}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <Sparkles size={12} fill="#121215" />
                  <span>RECOMMENDED</span>
                </div>
              )}

              <div className="plan-header">
                <span className="plan-name">{plan.name}</span>
                <div className="plan-price-block">
                  <span className="plan-price">{plan.price}</span>
                  <span className="plan-period">{plan.period}</span>
                </div>
                <p className="plan-desc">{plan.desc}</p>
              </div>

              <div className="plan-divider"></div>

              <div className="plan-features">
                {plan.features.map((feature, i) => (
                  <div key={i} className="plan-feature-item">
                    <Check size={16} className="feature-check" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="plan-cta">
                <Button 
                  id={`pricing-${plan.name.toLowerCase().replace(/\s+/g, '-')}-btn`}
                  variant={plan.popular ? 'primary' : 'secondary'}
                  size="md"
                  fullWidth
                  onClick={onApplyClick}
                >
                  Apply for Pass
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
};
