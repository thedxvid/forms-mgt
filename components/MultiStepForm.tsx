
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowRight, IconArrowLeft, IconCheck } from '@tabler/icons-react';
import { FormData } from '../types';

interface MultiStepFormProps {
    onComplete: (data: FormData) => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        instagram: '',
        currentMoment: [],
        mainActivity: '',
        mainActivityOther: '',
        recentRevenue: '',
        mainGoal: '',
        mainGoalOther: '',
        availableCash: '',
        hasPartner: '',
        willingToInvest: '',
        whyChooseYou: '',
        commitment: ''
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

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleMultipleChoice = (field: keyof FormData, value: string) => {
        const current = formData[field] as string[];
        if (current.includes(value)) {
            updateFormData(field, current.filter(item => item !== value));
        } else {
            updateFormData(field, [...current, value]);
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 0: return true;
            case 1: return formData.currentMoment.length > 0;
            case 2: return formData.mainActivity !== '' || formData.mainActivityOther.trim() !== '';
            case 3: return formData.recentRevenue !== '';
            case 4: return formData.mainGoal !== '' || formData.mainGoalOther.trim() !== '';
            case 5: return formData.availableCash !== '';
            case 6: return formData.hasPartner !== '';
            case 7: return formData.willingToInvest !== '';
            case 8: return formData.whyChooseYou.trim().length >= 50;
            case 9: return formData.commitment !== '';
            case 10: return formData.name.trim().length > 0;
            case 11: return formData.email.includes('@') && formData.email.includes('.');
            case 12: return formData.phone.replace(/\D/g, '').length >= 10;
            case 13: return formData.instagram.trim().length > 0;
            default: return false;
        }
    };

    const handleNext = () => {
        if (canProceed()) {
            if (currentStep === 13) {
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
            title: 'Olá, seja muito bem-vindo(a)!',
            content: (
                <div className="space-y-6 text-center max-w-2xl mx-auto">
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Esta consultoria gratuita é para você que quer começar ou já
                        trabalha com IA, automação e N8N, e quer escalar seu negócio
                        faturando múltiplos 5 ou 6 dígitos por mês.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        O primeiro passo é responder algumas perguntas rápidas.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Nós da MGT Academy vamos analisar suas respostas para verificar
                        se você está pronto(a) para participar dessa consultoria
                        estratégica!
                    </p>
                    <p className="text-white text-xl font-semibold mt-8">
                        Vamos lá?
                    </p>
                </div>
            )
        },
        {
            title: 'Qual opção descreve melhor o seu momento atual?',
            subtitle: '(Pode marcar mais de uma)',
            content: (
                <div className="space-y-3 max-w-2xl mx-auto">
                    {[
                        'Sei mexer com N8N, mas não sei vender projetos',
                        'Não sei me posicionar como autoridade no mercado de IA',
                        'Já vendi alguns projetos, mas não consigo escalar',
                        'Não sei como criar previsibilidade de receita',
                        'Tenho uma agência tradicional e quero incorporar IA/Automação',
                        'Quero aprender a monetizar o mercado de IA, mas não sei por onde começar',
                        'Quero me posicionar e vender mentoria sobre IA'
                    ].map((option) => (
                        <button
                            key={option}
                            onClick={() => toggleMultipleChoice('currentMoment', option)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${formData.currentMoment.includes(option)
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center ${formData.currentMoment.includes(option) ? 'bg-white border-white' : 'border-white/30'
                                    }`}>
                                    {formData.currentMoment.includes(option) && <IconCheck size={14} className="text-black" />}
                                </div>
                                <span>{option}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: 'O que você faz hoje? Qual é sua principal fonte de renda?',
            content: (
                <div className="space-y-3 max-w-2xl mx-auto">
                    {[
                        'Trabalho CLT',
                        'Freelancer de IA/Automação/Tech',
                        'Dono de agência tradicional (Marketing, Design, Dev)',
                        'Dono de agência de IA/Automação',
                        'Infoprodutor/Creator',
                        'Estudante/Sem renda fixa no momento'
                    ].map((option) => (
                        <button
                            key={option}
                            onClick={() => updateFormData('mainActivity', option)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${formData.mainActivity === option
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${formData.mainActivity === option ? 'border-white' : 'border-white/30'
                                    }`}>
                                    {formData.mainActivity === option && <div className="w-3 h-3 rounded-full bg-white"></div>}
                                </div>
                                <span>{option}</span>
                            </div>
                        </button>
                    ))}
                    <div className="pt-2">
                        <input
                            type="text"
                            value={formData.mainActivityOther}
                            onChange={(e) => {
                                updateFormData('mainActivityOther', e.target.value);
                                updateFormData('mainActivity', '');
                            }}
                            placeholder="Outro (especifique)"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                </div>
            )
        },
        {
            title: 'Quanto você faturou com IA/Automação/N8N nos últimos 30 dias?',
            content: (
                <div className="space-y-3 max-w-2xl mx-auto">
                    {[
                        'R$0 — Ainda não faturei nada',
                        'R$1 - R$3.000',
                        'R$3.001 - R$10.000',
                        'R$10.001 - R$20.000',
                        'R$20.001 - R$50.000',
                        'Acima de R$50.000'
                    ].map((option) => (
                        <button
                            key={option}
                            onClick={() => updateFormData('recentRevenue', option)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${formData.recentRevenue === option
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${formData.recentRevenue === option ? 'border-white' : 'border-white/30'
                                    }`}>
                                    {formData.recentRevenue === option && <div className="w-3 h-3 rounded-full bg-white"></div>}
                                </div>
                                <span>{option}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: 'Qual é o seu principal objetivo com IA/Automação nos próximos 6 meses?',
            content: (
                <div className="space-y-3 max-w-2xl mx-auto">
                    {[
                        'Vender meus primeiros projetos e validar que consigo monetizar isso',
                        'Escalar de R$5k-10k/mês para R$20k-30k/mês de forma previsível',
                        'Escalar de R$10k-20k/mês para R$50k-100k/mês',
                        'Construir um modelo de recorrência (SaaS/Agência sob demanda)',
                        'Criar infosaas para influenciadores e alcançar 15k mensal',
                        'Estruturar e vender minha própria mentoria/curso sobre IA'
                    ].map((option) => (
                        <button
                            key={option}
                            onClick={() => updateFormData('mainGoal', option)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${formData.mainGoal === option
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${formData.mainGoal === option ? 'border-white' : 'border-white/30'
                                    }`}>
                                    {formData.mainGoal === option && <div className="w-3 h-3 rounded-full bg-white"></div>}
                                </div>
                                <span>{option}</span>
                            </div>
                        </button>
                    ))}
                    <div className="pt-2">
                        <input
                            type="text"
                            value={formData.mainGoalOther}
                            onChange={(e) => {
                                updateFormData('mainGoalOther', e.target.value);
                                updateFormData('mainGoal', '');
                            }}
                            placeholder="Outro (especifique)"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                </div>
            )
        },
        {
            title: 'Quanto você ou sua empresa tem de caixa disponível para investir em estratégia, mídias pagas e aceleração de resultados?',
            content: (
                <div className="space-y-3 max-w-2xl mx-auto">
                    {[
                        'R$0 - R$2.000',
                        'R$2.001 - R$5.000',
                        'R$5.001 - R$10.000',
                        'R$10.001 - R$20.000',
                        'R$20.001 - R$50.000',
                        'Acima de R$50.000'
                    ].map((option) => (
                        <button
                            key={option}
                            onClick={() => updateFormData('availableCash', option)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${formData.availableCash === option
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${formData.availableCash === option ? 'border-white' : 'border-white/30'
                                    }`}>
                                    {formData.availableCash === option && <div className="w-3 h-3 rounded-full bg-white"></div>}
                                </div>
                                <span>{option}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: 'Você tem algum sócio ou parceiro que participa de decisões estratégicas e financeiras com você?',
            content: (
                <div className="space-y-3 max-w-2xl mx-auto">
                    {[
                        'Sim, tenho sócio(s) e decisões são compartilhadas',
                        'Não, decido sozinho(a)',
                        'Tenho sócio(s), mas a decisão final é minha'
                    ].map((option) => (
                        <button
                            key={option}
                            onClick={() => updateFormData('hasPartner', option)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${formData.hasPartner === option
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${formData.hasPartner === option ? 'border-white' : 'border-white/30'
                                    }`}>
                                    {formData.hasPartner === option && <div className="w-3 h-3 rounded-full bg-white"></div>}
                                </div>
                                <span>{option}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: 'Se você passasse por um acompanhamento estratégico intensivo de 3 a 6 meses comigo e minha equipe, focado em te ensinar a vender, se posicionar e escalar seu negócio de IA/Automação, você estaria disposto(a) a investir para ter esse resultado?',
            content: (
                <div className="space-y-3 max-w-2xl mx-auto">
                    {[
                        'Sim, se fizer sentido estratégico e eu ver que vai funcionar pra mim',
                        'Sim, mas preciso entender melhor o modelo',
                        'Depende do valor',
                        'Não tenho condições de investir agora'
                    ].map((option) => (
                        <button
                            key={option}
                            onClick={() => updateFormData('willingToInvest', option)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${formData.willingToInvest === option
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${formData.willingToInvest === option ? 'border-white' : 'border-white/30'
                                    }`}>
                                    {formData.willingToInvest === option && <div className="w-3 h-3 rounded-full bg-white"></div>}
                                </div>
                                <span>{option}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: 'Poucas pessoas serão selecionadas para essa consultoria estratégica. Por que eu deveria escolher você?',
            subtitle: '(Mínimo 50 caracteres)',
            content: (
                <div className="max-w-2xl mx-auto">
                    <textarea
                        value={formData.whyChooseYou}
                        onChange={(e) => updateFormData('whyChooseYou', e.target.value)}
                        placeholder="Digite sua resposta aqui..."
                        rows={6}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all resize-none"
                        autoFocus
                    />
                    <p className={`text-sm mt-2 ${formData.whyChooseYou.length >= 50 ? 'text-green-400' : 'text-gray-500'}`}>
                        {formData.whyChooseYou.length}/50 caracteres
                    </p>
                </div>
            )
        },
        {
            title: 'Você se compromete a aparecer no horário agendado caso seja selecionado(a) para essa consultoria?',
            content: (
                <div className="space-y-3 max-w-2xl mx-auto">
                    {[
                        'Sim, com certeza',
                        'Sim, mas pode ser que eu precise reagendar',
                        'Não tenho certeza'
                    ].map((option) => (
                        <button
                            key={option}
                            onClick={() => updateFormData('commitment', option)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${formData.commitment === option
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${formData.commitment === option ? 'border-white' : 'border-white/30'
                                    }`}>
                                    {formData.commitment === option && <div className="w-3 h-3 rounded-full bg-white"></div>}
                                </div>
                                <span>{option}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: 'Qual é o seu nome?',
            content: (
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="w-full max-w-md mx-auto px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all block"
                    autoFocus
                />
            )
        },
        {
            title: 'Qual é o seu melhor e-mail?',
            content: (
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full max-w-md mx-auto px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all block"
                    autoFocus
                />
            )
        },
        {
            title: 'Qual é o seu telefone (WhatsApp)?',
            content: (
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(00) 00000-0000"
                    className="w-full max-w-md mx-auto px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all block"
                    autoFocus
                />
            )
        },
        {
            title: 'Qual é o seu @ do Instagram?',
            content: (
                <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => updateFormData('instagram', e.target.value)}
                    placeholder="@seuinstagram"
                    className="w-full max-w-md mx-auto px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all block"
                    autoFocus
                />
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
                        {currentStepData.subtitle && (
                            <p className="text-gray-400 text-center mb-8 text-sm sm:text-base">{currentStepData.subtitle}</p>
                        )}
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
                                {currentStep === 0 ? 'Começar Agora' : currentStep === 13 ? 'Finalizar' : 'Próximo'}
                                <IconArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MultiStepForm;
