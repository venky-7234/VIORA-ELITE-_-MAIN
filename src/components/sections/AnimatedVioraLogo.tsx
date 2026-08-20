import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface AnimatedVioraLogoProps {
  scrollY: MotionValue<number>;
  className?: string;
}

export const AnimatedVioraLogo: React.FC<AnimatedVioraLogoProps> = ({ scrollY, className }) => {
  const vY = useTransform(scrollY, [0, 250], [0, -350]);
  const vOpacity = useTransform(scrollY, [0, 150, 250], [1, 1, 0]);

  const iY = useTransform(scrollY, [40, 290], [0, -350]);
  const iOpacity = useTransform(scrollY, [40, 190, 290], [1, 1, 0]);

  const oY = useTransform(scrollY, [80, 330], [0, -350]);
  const oOpacity = useTransform(scrollY, [80, 230, 330], [1, 1, 0]);

  const rY = useTransform(scrollY, [120, 370], [0, -350]);
  const rOpacity = useTransform(scrollY, [120, 270, 370], [1, 1, 0]);

  const aY = useTransform(scrollY, [160, 410], [0, -350]);
  const aOpacity = useTransform(scrollY, [160, 310, 410], [1, 1, 0]);

  // Left Line (flies before ELITE)
  const line1Y = useTransform(scrollY, [200, 450], [0, -350]);
  const line1Opacity = useTransform(scrollY, [200, 350, 450], [1, 1, 0]);

  // ELITE letters
  const e1Y = useTransform(scrollY, [240, 490], [0, -350]);
  const e1Opacity = useTransform(scrollY, [240, 390, 490], [1, 1, 0]);

  const lY = useTransform(scrollY, [280, 530], [0, -350]);
  const lOpacity = useTransform(scrollY, [280, 430, 530], [1, 1, 0]);

  const i2Y = useTransform(scrollY, [320, 570], [0, -350]);
  const i2Opacity = useTransform(scrollY, [320, 470, 570], [1, 1, 0]);

  const tY = useTransform(scrollY, [360, 610], [0, -350]);
  const tOpacity = useTransform(scrollY, [360, 510, 610], [1, 1, 0]);

  const e2Y = useTransform(scrollY, [400, 650], [0, -350]);
  const e2Opacity = useTransform(scrollY, [400, 550, 650], [1, 1, 0]);

  // Right Line (flies after ELITE)
  const line2Y = useTransform(scrollY, [440, 690], [0, -350]);
  const line2Opacity = useTransform(scrollY, [440, 590, 690], [1, 1, 0]);

  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1920 1080"
    >
      <defs>
        <linearGradient id="New_Gradient_Swatch" data-name="New Gradient Swatch" x1="69.12" y1="543.89" x2="1504.43" y2="-308.18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8e5923"/>
          <stop offset=".5" stopColor="#dfb458"/>
          <stop offset="1" stopColor="#b9872c"/>
        </linearGradient>
        <linearGradient id="New_Gradient_Swatch1" data-name="New Gradient Swatch" x1="160.33" y1="697.53" x2="1595.64" y2="-154.54" href="#New_Gradient_Swatch"/>
        <linearGradient id="New_Gradient_Swatch2" data-name="New Gradient Swatch" x1="246.21" y1="842.2" x2="1681.52" y2="-9.87" href="#New_Gradient_Swatch"/>
        <linearGradient id="New_Gradient_Swatch3" data-name="New Gradient Swatch" x1="357.3" y1="1029.32" x2="1792.6" y2="177.24" href="#New_Gradient_Swatch"/>
        <linearGradient id="New_Gradient_Swatch4" data-name="New Gradient Swatch" x1="462.7" y1="1206.86" x2="1898.01" y2="354.79" href="#New_Gradient_Swatch"/>
        <linearGradient id="New_Gradient_Swatch5" data-name="New Gradient Swatch" x1="287.49" y1="1040.98" x2="1722.8" y2="188.9" href="#New_Gradient_Swatch"/>
        <linearGradient id="New_Gradient_Swatch6" data-name="New Gradient Swatch" x1="306.05" y1="1072.25" x2="1741.36" y2="220.18" href="#New_Gradient_Swatch"/>
        <linearGradient id="New_Gradient_Swatch7" data-name="New Gradient Swatch" x1="320.8" y1="1097.08" x2="1756.11" y2="245.01" href="#New_Gradient_Swatch"/>
        <linearGradient id="New_Gradient_Swatch8" data-name="New Gradient Swatch" x1="334.47" y1="1120.12" x2="1769.78" y2="268.04" href="#New_Gradient_Swatch"/>
        <linearGradient id="New_Gradient_Swatch9" data-name="New Gradient Swatch" x1="356.11" y1="1156.56" x2="1791.42" y2="304.49" href="#New_Gradient_Swatch"/>
        <linearGradient id="New_Gradient_Swatch10" data-name="New Gradient Swatch" x1="175.77" y1="872.35" x2="1477.46" y2="99.6" href="#New_Gradient_Swatch"/>
        <linearGradient id="New_Gradient_Swatch11" data-name="New Gradient Swatch" x1="-8979.04" y1="884.92" x2="-7543.73" y2="32.85" gradientTransform="translate(-7242.0886) scale(-1 1)" href="#New_Gradient_Swatch"/>
      </defs>

      <motion.path fill="url(#New_Gradient_Swatch)" style={{ y: vY, opacity: vOpacity }} d="M411.12,317.26l-121.06,268.01-129.82-268.01h35.79l106.59,220.81,61.67-138.19c12.56-28.17,19.03-53.68,3.81-82.61h43.02Z"/>
      <motion.path fill="url(#New_Gradient_Swatch1)" style={{ y: iY, opacity: iOpacity }} d="M561.48,582.98v-265.73h31.22v265.73h-31.22Z"/>
      <motion.path fill="url(#New_Gradient_Swatch2)" style={{ y: oY, opacity: oOpacity }} d="M1059.43,449.92c0,82.94-67.77,141.62-152.66,141.62s-152.66-58.68-152.66-141.62,67.77-141.22,152.66-141.22,152.66,58.29,152.66,141.22ZM1024.78,449.92c0-69.24-46.83-134.18-118.01-134.18s-118.02,64.94-118.02,134.18,46.83,134.19,118.02,134.19,118.01-64.94,118.01-134.19Z"/>
      <motion.path fill="url(#New_Gradient_Swatch3)" style={{ y: rY, opacity: rOpacity }} d="M1445.06,582.98h-36.93l-51.39-55.2c-17.51-19.03-47.97-47.97-72.71-54.82h32.36c63.96,0,82.99-40.35,83.37-74.24.38-34.26-17.13-74.24-83.37-74.24h-64.34v258.49h-31.22v-265.73h95.56c75.38,0,116.49,36.93,116.87,81.47.38,38.83-31.6,71.95-90.23,79.57l102.03,104.69Z"/>
      <motion.path fill="url(#New_Gradient_Swatch4)" style={{ y: aY, opacity: aOpacity }} d="M1815.47,582.98h-35.78l-39.21-86.8h-118.78l-1.9,4.19c-12.56,28.17-15.61,53.68-.38,82.61h-43.02l100.12-228.04-17.13-37.69h33.5l122.58,265.73ZM1737.05,488.95l-56.34-124.87-55.58,124.87h111.93Z"/>
      
      <g>
        <motion.path fill="url(#New_Gradient_Swatch5)" style={{ y: e1Y, opacity: e1Opacity }} d="M771.06,771.3v-54.61h32.96v5.87h-26.35v18.45h24.64v5.87h-24.64v18.56h26.77v5.87h-33.39Z"/>
        <motion.path fill="url(#New_Gradient_Swatch6)" style={{ y: lY, opacity: lOpacity }} d="M842.99,771.3v-54.61h6.61v48.74h25.39v5.87h-32Z"/>
        <motion.path fill="url(#New_Gradient_Swatch7)" style={{ y: i2Y, opacity: i2Opacity }} d="M918.88,716.69v54.61h-6.61v-54.61h6.61Z"/>
        <motion.path fill="url(#New_Gradient_Swatch8)" style={{ y: tY, opacity: tOpacity }} d="M956.15,722.56v-5.87h40.96v5.87h-17.18v48.74h-6.61v-48.74h-17.17Z"/>
        <motion.path fill="url(#New_Gradient_Swatch9)" style={{ y: e2Y, opacity: e2Opacity }} d="M1034.38,771.3v-54.61h32.96v5.87h-26.35v18.45h24.64v5.87h-24.64v18.56h26.77v5.87h-33.39Z"/>
      </g>
      <motion.polygon fill="url(#New_Gradient_Swatch10)" style={{ y: line1Y, opacity: line1Opacity }} points="657.63 751.58 104.53 749.35 657.63 747.12 657.63 751.58 657.63 751.58"/>
      <motion.polygon fill="url(#New_Gradient_Swatch11)" style={{ y: line2Y, opacity: line2Opacity }} points="1205.46 751.58 1815.47 749.35 1205.46 747.12 1205.46 751.58 1205.46 751.58"/>
    </svg>
  );
};
