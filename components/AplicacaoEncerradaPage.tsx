import React from 'react';
import { motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';

interface AplicacaoEncerradaPageProps {
    reason?: string;
}

const MESSAGES: Record<string, { title: string; body: string }> = {
    commitment: {
        title: 'Tudo bem — isso é honestidade.',
        body: 'A MGT Academy é um programa intensivo para quem quer construir um negócio real com IA. Se você mudar de ideia no futuro, estaremos por aqui.',
    },
    investment: {
        title: 'Entendemos a sua situação.',
        body: 'No momento, o programa exige um investimento mínimo compatível com o nível de entrega que oferecemos. Assim que estiver pronto, pode voltar a se candidatar.',
    },
    readiness: {
        title: 'Sem pressa — mas vagas não esperam.',
        body: 'Nosso processo de admissão é para quem está pronto para dar o próximo passo. Quando tiver certeza, você pode se candidatar novamente.',
    },
};

const AplicacaoEncerradaPage: React.FC<AplicacaoEncerradaPageProps> = ({ reason = 'commitment' }) => {
    const msg = MESSAGES[reason] || MESSAGES.commitment;

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-16">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-zinc-900/30 via-transparent to-zinc-900/20" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="w-full max-w-xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    {/* Ícone */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/15 mb-8"
                    >
                        <IconX size={28} className="text-gray-400" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="glass rounded-3xl p-8 sm:p-10 space-y-4"
                    >
                        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                            {msg.title}
                        </h1>
                        <p className="text-gray-400 text-base leading-relaxed">
                            {msg.body}
                        </p>

                        <div className="pt-4 border-t border-white/8 mt-4">
                            <p className="text-gray-600 text-sm">
                                Acompanhe nosso conteúdo gratuito sobre negócios com IA no Instagram:
                            </p>
                            <a
                                href="https://www.instagram.com/mgt.inc/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-3 text-gray-300 hover:text-white transition-colors font-medium text-sm"
                            >
                                @mgt.inc
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default AplicacaoEncerradaPage;
