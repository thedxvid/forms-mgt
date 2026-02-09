
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowRight, IconArrowLeft, IconCheck } from '@tabler/icons-react';
import { PreVagasFormData } from '../types';

interface PreVagasFormProps {
    onComplete: (data: PreVagasFormData) => void;
}

const PreVagasForm: React.FC<PreVagasFormProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<PreVagasFormData>({
        missingForMoreRevenue: '',
        focus2026: '',
        immersionInterest: '',
        name: '',
        phone: '',
        email: '',
        instagram: ''
    });

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        }
        return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        updateFormData('phone', formatted);
    };

    const updateFormData = (field: keyof PreVagasFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const canProceed = () => {
        switch (currentStep) {
            case 0: return true;
            case 1: return formData.missingForMoreRevenue.trim().length > 0;
            case 2: return formData.focus2026.trim().length > 0;
            case 3: return formData.immersionInterest.trim().length > 0;
            case 4:
                return formData.name.trim().length > 0 &&
                    formData.email.includes('@') && formData.email.includes('.') &&
                    formData.phone.replace(/\D/g, '').length >= 10 &&
                    formData.instagram.trim().length > 0;
            default: return false;
        }
    };

    const handleNext = () => {
        if (canProceed()) {
            if (currentStep === 4) {
                onComplete(formData);
            } else {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const steps = [
        {
            title: 'Call gratuita e revelacao de meu modelo de negocio para 2026',
            content: (
                <div className="space-y-6 text-center max-w-2xl mx-auto">
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Data: 09/02 às 20:00
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Responda com sinceridade para garantir sua vaga.
                    </p>
                    <p className="text-white text-xl font-semibold mt-8">
                        Vamos lá?
                    </p>
                </div>
            )
        },
        {
            title: 'O que falta hoje para você faturar mais?',
            content: (
                <div className="max-w-2xl mx-auto">
                    <textarea
                        value={formData.missingForMoreRevenue}
                        onChange={(e) => updateFormData('missingForMoreRevenue', e.target.value)}
                        placeholder="Digite sua resposta aqui..."
                        rows={6}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all resize-none"
                        autoFocus
                    />
                </div>
            )
        },
        {
            title: 'Se você tivesse que mirar em um foco em 2026 qual seria?',
            content: (
                <div className="max-w-2xl mx-auto">
                    <textarea
                        value={formData.focus2026}
                        onChange={(e) => updateFormData('focus2026', e.target.value)}
                        placeholder="Digite sua resposta aqui..."
                        rows={6}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all resize-none"
                        autoFocus
                    />
                </div>
            )
        },
        {
            title: 'Toparia passar por uma imersão de 3 dias comigo, o que gostaria de aprender?',
            content: (
                <div className="max-w-2xl mx-auto">
                    <textarea
                        value={formData.immersionInterest}
                        onChange={(e) => updateFormData('immersionInterest', e.target.value)}
                        placeholder="Digite sua resposta aqui..."
                        rows={6}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all resize-none"
                        autoFocus
                    />
                </div>
            )
        },
        {
            title: 'Para finalizar, preencha seus dados:',
            content: (
                <div className="space-y-4 max-w-md mx-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Nome Completo</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateFormData('name', e.target.value)}
                            placeholder="Digite seu nome completo"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all block"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">E-mail</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all block"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">WhatsApp</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="(00) 00000-0000"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all block"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Instagram</label>
                        <input
                            type="text"
                            value={formData.instagram}
                            onChange={(e) => updateFormData('instagram', e.target.value)}
                            placeholder="@seuinstagram"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all block"
                        />
                    </div>
                </div>
            )
        }
    ];

    const currentStepData = steps[currentStep];
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full"></div>
            </div>

            {/* Logo Centralizada */}
            <div className="flex items-center gap-3 mb-12 relative z-10">
                <img src="/logo_mgt.png" alt="MGT Academy" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    MGT<span className="text-gray-500 font-light italic ml-1 text-xl sm:text-2xl">ACADEMY</span>
                </span>
            </div>

            <div className="w-full max-w-4xl relative z-10">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <p className="text-gray-400 text-sm mt-2 text-center">
                        Etapa {currentStep + 1} de {steps.length}
                    </p>
                </div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="glass rounded-2xl p-6 sm:p-8 md:p-12"
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 text-center leading-tight">
                            {currentStepData.title}
                        </h2>
                        <div className="mt-8">
                            {currentStepData.content}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-12 justify-center">
                            {currentStep > 0 && (
                                <button
                                    onClick={handleBack}
                                    className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 order-2 sm:order-1"
                                >
                                    <IconArrowLeft size={20} />
                                    Voltar
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className={`px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all order-1 sm:order-2 ${canProceed()
                                    ? 'bg-white text-black hover:bg-gray-200'
                                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {currentStep === 0 ? 'Começar Agora' : currentStep === 4 ? 'Enviar Resposta' : 'Próximo'}
                                <IconArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PreVagasForm;
