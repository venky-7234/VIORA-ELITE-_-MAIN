import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Requirements } from '../components/sections/Requirements';
import { Lineage } from '../components/sections/Lineage';
import { TheWorld } from '../components/sections/TheWorld';
import { Philosophy } from '../components/sections/Philosophy';
import { TheStory } from '../components/sections/TheStory';
import { WorkMarquee } from '../components/sections/WorkMarquee';

export const Home: React.FC = () => {
  const handleScrollToApply = () => {
    const element = document.getElementById('apply-section') || document.querySelector('.footer');
    if (element) {
      const navbarHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main>
      <Hero onApplyClick={handleScrollToApply} />
      <div className="content-wrapper">
        <Lineage />
        <TheWorld />
        <Requirements />
        <Philosophy />
        <TheStory />
        <WorkMarquee />
      </div>
    </main>
  );
};
