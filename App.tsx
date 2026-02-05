
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroWithVideo from './components/HeroWithVideo';
import { AnimatedTestimonials } from './components/AnimatedTestimonials';
import Footer from './components/Footer';
import MultiStepForm from './components/MultiStepForm';
import { Testimonial, FormData } from './types';

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Jean',
    designation: 'Mentorado',
    quote: 'O nivel de conexões que eu adquiri estando junto com o Marcelo já fez a mentoria se pagar antes mesmo de começar',
    src: 'https://www.youtube.com/embed/DTOfGEgXki4'
  },
  {
    name: 'Alisson',
    designation: 'Cliente Arsenal de Vendas',
    quote: 'O mercado está carente de pessoas boas e de tudo que eu vi o seu conteúdo é o melhor',
    src: 'https://www.youtube.com/embed/wsF5iiJR58c'
  },
  {
    name: 'Yuri',
    designation: 'Mentorado',
    quote: 'Entrei na comunidade e foi um divisor de águas, abriu completamente os meus olhos. Muito mão na massa, é uma coisa muito próxima.',
    src: 'https://www.youtube.com/embed/FdWLnpq0PEo'
  },
  {
    name: 'Guilherme',
    designation: 'Mentorado',
    quote: 'A comunidade e a mentoria do Marcelo mudou a minha vida, só tenho que agradecer, não conseguia passar confiança nas propostas e depois de 1 mês deu 10 mil reais',
    src: 'https://www.youtube.com/embed/vZ9JApgf2FM'
  },
  {
    name: 'Lucas',
    designation: 'Mentorado',
    quote: 'A mentoria já estava paga porque o projeto estava vendido e ainda sobrou dinheiro. Depois que eu peguei a mentoria minha confiança aumentou e minha vida mudou.',
    src: 'https://www.youtube.com/embed/YFQ7g9cTFJQ'
  },
  {
    name: 'Mentorado',
    designation: 'Aluno da Comunidade',
    quote: 'Apesar do conteúdo dos concorrentes serem bons, nada se compara a experiência e o acompanhamento que vocês entregam',
    src: 'https://www.youtube.com/embed/FjPu6mSPNgg'
  }
];

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormComplete = async (data: FormData) => {
    setSubmittedData(data);

    // Enviar dados para o webhook
    try {
      const response = await fetch('https://autowebhook.mgtinc.cloud/webhook/formsmentoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso para o webhook');
      } else {
        console.error('Erro ao enviar dados para o webhook:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o webhook:', error);
    }

    setFormCompleted(true);
  };

  // Se o formulário não foi completado, mostra o formulário
  if (!formCompleted) {
    return (
      <>
        <Header scrolled={false} showNavigation={false} />
        <MultiStepForm onComplete={handleFormComplete} />
      </>
    );
  }

  // Depois que o formulário é completado, mostra a página de obrigado
  return (
    <div className="min-h-screen bg-black selection:bg-white/20 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full"></div>
      </div>

      <Header scrolled={scrolled} />

      <main className="relative z-10">
        <HeroWithVideo />

        <div id="testimonials" className="py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-black/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Depoimento de Alunos</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Estes são os resultados de quem decidiu não aceitar o comum e buscou a excelência técnica e visual.
              </p>
            </div>
            <AnimatedTestimonials testimonials={MOCK_TESTIMONIALS} autoplay={true} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
