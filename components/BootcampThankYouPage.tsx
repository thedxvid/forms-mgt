import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { IconCircleCheckFilled, IconLoader2, IconCalendarPlus } from '@tabler/icons-react';

const BootcampThankYouPage: React.FC = () => {
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        // Simula o tempo de validação do ingresso (2.5 segundos)
        const timer = setTimeout(() => {
            setIsValidating(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black selection:bg-white/20 overflow-x-hidden flex flex-col">
            <Header scrolled={false} showNavigation={false} />

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full"></div>
            </div>

            <main className="flex-grow flex items-center justify-center relative z-10 px-6 py-24">
                {isValidating ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-xl w-full mx-auto text-center flex flex-col items-center"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        >
                            <IconLoader2 size={64} className="text-blue-500 mb-8" />
                        </motion.div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Validando seu ingresso...
                        </h2>
                        <p className="text-gray-400">
                            Por favor, aguarde enquanto confirmamos seus dados.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl w-full mx-auto text-center"
                    >
                        <IconCircleCheckFilled size={80} className="text-green-500 mx-auto mb-8" />

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Ingresso <span className="text-green-500">Validado!</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
                            Sua presença no Bootcamp está confirmada de forma oficial.
                        </p>

                        <div className="glass p-8 rounded-2xl max-w-xl mx-auto border border-blue-500/20 bg-blue-500/5 mb-12 flex flex-col items-center">
                            <p className="text-lg text-white font-semibold mb-6">
                                Último Passo Obrigatório:
                            </p>
                            <p className="text-gray-400 mb-8">
                                Adicione o evento à sua agenda para não perder nada do que vai rolar.
                            </p>
                            <a
                                href="https://calendar.app.google/uH8k8uZUM6hQ7fSX7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                            >
                                <IconCalendarPlus size={24} />
                                Confirmar Presença no Calendar
                            </a>
                        </div>
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default BootcampThankYouPage;
