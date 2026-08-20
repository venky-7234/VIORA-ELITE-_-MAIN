import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onApplyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onApplyClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#" className="navbar-logo" onClick={(e) => handleNavClick(e, 'hero')}>
          <span style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-primary)', fontWeight: 500 }}>VIORA ELITE</span>
        </a>

        {/* Desktop Links */}
        <div className="navbar-links">
          <a href="#philosophy" onClick={(e) => handleNavClick(e, 'philosophy')} className="nav-link">ABOUT</a>
          <a href="#retreats" onClick={(e) => handleNavClick(e, 'retreats')} className="nav-link">CHRONICLES</a>
          <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')} className="nav-link">THE EXPERIMENT</a>
        </div>

        {/* Mobile Buttons */}
        <div className="navbar-mobile-controls">
          <button 
            id="mobile-theme-toggle-btn"
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="icon" size={20} /> : <Moon className="icon" size={20} />}
          </button>
          <button 
            id="menu-toggle-btn"
            className="menu-toggle" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'mobile-drawer-open' : ''}`}>
        <div className="mobile-drawer-links">
          <a href="#philosophy" onClick={(e) => handleNavClick(e, 'philosophy')} className="mobile-nav-link">Philosophy</a>
          <a href="#retreats" onClick={(e) => handleNavClick(e, 'retreats')} className="mobile-nav-link">Retreats</a>
          <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')} className="mobile-nav-link">Gallery</a>
          <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="mobile-nav-link">Pricing</a>
          
          <div className="mobile-drawer-divider"></div>
          
          <Button 
            id="mobile-nav-apply-btn"
            variant="primary" 
            size="md" 
            fullWidth 
            onClick={() => { closeMenu(); onApplyClick(); }}
          >
            Apply for Invite
          </Button>
        </div>
      </div>
    </nav>
  );
};
