import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Pre-Footer CTA */}
        <div className="footer-cta-section">
          <h2 className="footer-cta-title">
            Request an<br/>
            <span className="footer-cta-subtitle">Invitation</span>
          </h2>
          <p className="footer-cta-desc">
            Submitting signals interest only. It does not constitute an invitation.<br/>
            Those selected will be contacted directly.
          </p>
        </div>

        <div className="footer-divider"></div>

        {/* Footer Top */}
        <div className="footer-top">
          <a href="#" className="footer-logo" onClick={handleScrollToTop}>
            <div className="viora-nav-brand">
              <img src="/viora-text-only.svg" alt="Viora Elite" className="viora-nav-bird" style={{ width: '150px' }} />
            </div>
          </a>

          <span className="footer-tagline">First of its kind. Built for the elite.</span>
        </div>

        <div className="footer-divider"></div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} VIORA ELITE Curated Experiences. All rights reserved.
          </p>

          <div className="footer-links">
            <a href="#philosophy" className="footer-link">Philosophy</a>
            <a href="#retreats" className="footer-link">Retreats</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#apply-section" className="footer-link">Apply</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
