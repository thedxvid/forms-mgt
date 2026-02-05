import React from 'react';

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface FormData {
  name: string;
  phone: string;
  email: string;
  instagram: string;
  currentMoment: string[];
  mainActivity: string;
  mainActivityOther: string;
  recentRevenue: string;
  mainGoal: string;
  mainGoalOther: string;
  availableCash: string;
  hasPartner: string;
  willingToInvest: string;
  whyChooseYou: string;
  commitment: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { id?: string };
    }
  }
}
