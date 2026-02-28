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

export interface PreVagasFormData {
  name: string;
  phone: string;
  email: string;
  instagram: string;
  // O que falta hoje para você faturar mais?
  missingForMoreRevenue: string;
  // Se você tivesse que mirar em um foco em 2026 qual seria?
  focus2026: string;
  // Toparia passar por uma imersão de 3 dias comigo, o que gostaria de aprender?
  immersionInterest: string;
}

export interface BootcampFormData {
  name: string;
  phone: string;
  email: string;
  instagram: string;
  contentMissing: string;
  nextStep: string;
  investment: string;
}

export interface AplicacaoFormData {
  commitment: string;        // Q1
  monthlyRevenue: string;    // Q2
  experienceTime: string;    // Q3
  prospecting: string;       // Q4
  instagram: string;         // Q5
  investmentAvailable: string; // Q6
  whyJoin: string;           // Q7
  videoFile: File | null;    // Q7 – vídeo opcional
  canStart: string;          // Q8
  name: string;              // Q9
  phone: string;             // Q10
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { id?: string };
    }
  }
}
