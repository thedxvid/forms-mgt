import React from 'react';
import { motion } from 'framer-motion';
import { IconCheck, IconClockHour4 } from '@tabler/icons-react';

const AplicacaoThankYouPage: React.FC = () => {
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
                        <p className="text-gray-400 text-lg leading-relaxed mb-10">
                            Agradecemos o seu interesse na <strong className="text-gray-200">MGT Academy</strong>.
                        </p>
                    </motion.div>

                    {/* Card de análise */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="glass rounded-3xl p-8 sm:p-10"
                    >
                        <div className="flex flex-col items-center gap-5">
                            <div className="w-14 h-14 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
                                <IconClockHour4 size={26} className="text-blue-400" />
                            </div>
                            <div className="text-center">
                                <p className="text-white font-semibold text-xl mb-3">
                                    Seu perfil está em análise
                                </p>
                                <p className="text-gray-400 text-base leading-relaxed">
                                    Analisaremos o seu perfil com atenção e, caso seja aprovado,{' '}
                                    <strong className="text-gray-200">entraremos em contato</strong> com os próximos passos.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Nota de rodapé */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-gray-700 text-xs mt-6"
                    >
                        Fique atento ao seu e-mail e WhatsApp para nossa resposta.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default AplicacaoThankYouPage;
