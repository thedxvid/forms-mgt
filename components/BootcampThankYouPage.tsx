import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { IconCircleCheckFilled } from '@tabler/icons-react';

const BootcampThankYouPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-black selection:bg-white/20 overflow-x-hidden flex flex-col">
            <Header scrolled={false} showNavigation={false} />

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full"></div>
            </div>

            <main className="flex-grow flex items-center justify-center relative z-10 px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl w-full mx-auto text-center"
                >
                    <IconCircleCheckFilled size={80} className="text-green-500 mx-auto mb-8" />

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        Parabéns! Sua presença está <span className="gradient-text">confirmada</span>.
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
                        O próximo passo é aguardar o bootcamp começar, a partir das 18h.
                    </p>

                    <div className="glass p-8 rounded-2xl max-w-xl mx-auto border border-green-500/20 bg-green-500/5">
                        <p className="text-lg text-gray-400">
                            Fique atento(a) ao seu WhatsApp e E-mail, enviaremos os links e materiais complementares por lá.
                        </p>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default BootcampThankYouPage;
