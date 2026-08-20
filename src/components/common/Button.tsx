import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  glow = false,
  className = '',
  ...props
}) => {
  const classes = [
    'dune-btn',
    `dune-btn-${variant}`,
    `dune-btn-${size}`,
    fullWidth ? 'dune-btn-block' : '',
    glow ? 'dune-btn-glow' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      <span className="dune-btn-content">{children}</span>
    </button>
  );
};
