
import React, { useEffect } from 'react';

const HeroWithVideo: React.FC = () => {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/4000cfee-6301-49d1-a1d0-07f3a10f1621/players/6984d38a2d808f58c503b256/v4/player.js";
    s.async = true;
    document.head.appendChild(s);

    return () => {
      // Clean up script on unmount
      if (document.head.contains(s)) {
        document.head.removeChild(s);
      }
    };
  }, []);
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
      <div className="max-w-5xl w-full mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-blue-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          Acesso Confirmado
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.1]">
          Seja Bem-vindo <br />
          <span className="gradient-text">ao Próximo Nível.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          Obrigado pela sua inscrição. Assista ao vídeo abaixo para orientações imediatas sobre nossa jornada.
        </p>

        {/* Video Player in the First Fold */}
        <div className="relative group max-w-4xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

          <div className="relative glass rounded-[2rem] overflow-hidden aspect-video shadow-2xl border border-white/10">
            <vturb-smartplayer id="vid-6984d38a2d808f58c503b256" style={{ display: 'block', margin: '0 auto', width: '100%' }}></vturb-smartplayer>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="https://wa.me/"
            target="_blank"
            className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Garantir minha vaga
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="#testimonials"
            className="w-full sm:w-auto px-10 py-5 glass text-white rounded-2xl font-bold text-lg hover:bg-white/5 transition-colors"
          >
            Ver Depoimentos
          </a>
        </div>
      </div>

      {/* Decorative scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroWithVideo;
