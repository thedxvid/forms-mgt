import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconCheck, IconBrandWhatsapp, IconCalendar } from '@tabler/icons-react';

const AplicacaoThankYouPage: React.FC = () => {
    const whatsappLink = 'https://wa.me/31998234943?text=Ol%C3%A1%2C%20acabei%20de%20enviar%20minha%20aplica%C3%A7%C3%A3o%20para%20a%20MGT%20Academy%20e%20tenho%20uma%20d%C3%BAvida.';

    useEffect(() => {
        // Carrega o script do Calendly dinamicamente
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup ao desmontar
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-16">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-950/20 via-transparent to-blue-950/15" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="w-full max-w-2xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-center"
                >
                    {/* Ícone de sucesso */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-8"
                    >
                        <IconCheck size={40} className="text-green-400" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Aplicação recebida
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                            Candidatura recebida com sucesso ✅
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed mb-2">
                            O próximo passo é agendar sua <strong className="text-gray-200">call de análise de perfil</strong> com o time da MGT Academy.
                        </p>
                        <p className="text-gray-500 text-base mb-10">
                            As vagas são alocadas por ordem de chegada.
                        </p>
                    </motion.div>

                    {/* Card principal */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="glass rounded-3xl p-6 sm:p-8 space-y-6"
                    >
                        {/* Cabeçalho do agendamento */}
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
                                <IconCalendar size={17} className="text-blue-400" />
                            </div>
                            <div className="text-left">
                                <p className="text-white font-semibold text-base">Agende sua call agora</p>
                                <p className="text-gray-500 text-sm">Escolha o melhor horário para você</p>
                            </div>
                        </div>

                        {/* Calendly Inline Widget */}
                        <div
                            className="calendly-inline-widget rounded-2xl overflow-hidden"
                            data-url="https://calendly.com/theodorodarosacontato/30min"
                            style={{ minWidth: '320px', height: '700px' }}
                        />

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-white/8" />
                            <span className="text-gray-600 text-sm">ou</span>
                            <div className="flex-1 h-px bg-white/8" />
                        </div>

                        {/* Botão WhatsApp */}
                        <div className="text-center">
                            <p className="text-gray-500 text-sm mb-4">
                                Tem alguma dúvida antes de agendar?
                            </p>
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-green-600 hover:bg-green-500 text-white font-semibold transition-all active:scale-95 min-h-[48px]"
                            >
                                <IconBrandWhatsapp size={22} />
                                Falar com o time no WhatsApp
                            </a>
                        </div>
                    </motion.div>

                    {/* Nota de rodapé */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-gray-700 text-xs mt-6"
                    >
                        Você receberá um e-mail de confirmação após o agendamento.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default AplicacaoThankYouPage;
