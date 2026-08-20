import React from 'react';
import './GlassCard.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  onClick
}) => {
  const classes = [
    'glass-card',
    hoverEffect ? 'glass-card-hover' : '',
    glow ? 'glass-card-glow' : '',
    onClick ? 'glass-card-interactive' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      <div className="glass-card-border-glow"></div>
      <div className="glass-card-content">{children}</div>
    </div>
  );
};
