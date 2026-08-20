import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/common/Button';
import './InvitationPage.css';

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export const InvitationPage: React.FC = () => {
  return (
    <div className="invitation-page">
      <div className="container invitation-container">
        <FadeUp>
          <h1 className="invitation-title shiny-heading">INVITATION</h1>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <p className="invitation-subtitle">
            SOME EXPERIENCES BEGIN WITH AN INVITATION.
          </p>
        </FadeUp>
        
        <FadeUp delay={0.3}>
          <h2 className="invitation-heading-2">REQUEST AN INVITATION</h2>
        </FadeUp>
        
        <FadeUp delay={0.4}>
          <p className="invitation-body">
            Choose an upcoming edition or experience and tell us a little about yourself. Each request is reviewed individually, with invitations extended where the experience feels like the right fit.
          </p>
        </FadeUp>
        
        <FadeUp delay={0.5}>
          <div className="invitation-button-container">
            <Button variant="outline" size="lg" onClick={() => {
              window.location.href = "mailto:invitations@vioraelite.com?subject=Invitation Request";
            }}>
              REQUEST INVITATION →
            </Button>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};
