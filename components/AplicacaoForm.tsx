import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowRight, IconArrowLeft, IconCheck, IconX, IconVideo, IconUpload } from '@tabler/icons-react';
import { AplicacaoFormData } from '../types';

interface AplicacaoFormProps {
    onComplete: (data: AplicacaoFormData) => void;
}

type Step =
    | 'intro'
    | 'q1' | 'q2' | 'q3' | 'q4' | 'q5'
    | 'q6' | 'q7' | 'q8' | 'q9' | 'q10';

const STEPS_ORDER: Step[] = ['intro', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];

const TOTAL_QUESTIONS = 10;

const AplicacaoForm: React.FC<AplicacaoFormProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState<Step>('intro');
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState<AplicacaoFormData>({
        commitment: '',
        monthlyRevenue: '',
        experienceTime: '',
        prospecting: '',
        instagram: '',
        investmentAvailable: '',
        whyJoin: '',
        videoFile: null,
        canStart: '',
        name: '',
        phone: '',
    });

    const update = (field: keyof AplicacaoFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        }
        return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    };

    const getStepIndex = (step: Step) => STEPS_ORDER.indexOf(step);
    const currentIndex = getStepIndex(currentStep);

    // Qual número de questão estamos (1-based) — intro não conta
    const questionNumber = currentStep === 'intro' ? 0 : getStepIndex(currentStep);

    const goTo = (step: Step) => {
        setDirection(getStepIndex(step) > currentIndex ? 1 : -1);
        setCurrentStep(step);
    };

    const goNext = () => {
        const next = STEPS_ORDER[currentIndex + 1] as Step;
        if (next) goTo(next);
    };

    const goBack = () => {
        const prev = STEPS_ORDER[currentIndex - 1] as Step;
        if (prev) goTo(prev);
    };

    const selectOption = (field: keyof AplicacaoFormData, value: string) => {
        update(field, value);
        setTimeout(() => goNext(), 350);
    };

    const [videoDragging, setVideoDragging] = useState(false);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const ACCEPTED_VIDEO_TYPES = [
        'video/mp4', 'video/quicktime', 'video/avi', 'video/x-msvideo',
        'video/webm', 'video/x-matroska', 'video/3gpp', 'video/3gpp2',
        'video/hevc', 'video/x-m4v',
    ];
    const ACCEPTED_VIDEO_EXTS = '.mp4,.mov,.avi,.webm,.mkv,.3gp,.3g2,.m4v,.hevc';

    const handleVideoFile = (file: File) => {
        if (ACCEPTED_VIDEO_TYPES.includes(file.type) || /\.(mp4|mov|avi|webm|mkv|3gp|3g2|m4v|hevc)$/i.test(file.name)) {
            setFormData(prev => ({ ...prev, videoFile: file }));
        }
    };

    const canProceed = (): boolean => {
        switch (currentStep) {
            case 'intro': return true;
            case 'q5': return formData.instagram.trim().length >= 2;
            case 'q7': return formData.whyJoin.trim().length >= 10;
            case 'q9': return formData.name.trim().length >= 2;
            case 'q10': return formData.phone.replace(/\D/g, '').length >= 10;
            default: return false;
        }
    };

    const handleSubmit = () => {
        if (formData.phone.replace(/\D/g, '').length >= 10) {
            onComplete(formData);
        }
    };

    const variants = {
        enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
        center: { opacity: 1, x: 0 },
        exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
    };

    const OptionButton = ({
        label,
        sublabel,
        selected,
        onClick,
        variant = 'default',
    }: {
        label: string;
        sublabel?: string;
        selected?: boolean;
        onClick: () => void;
        variant?: 'default' | 'danger';
    }) => (
        <button
            onClick={onClick}
            className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-200 group relative overflow-hidden
                ${selected
                    ? 'bg-white/10 border-white/50 text-white'
                    : variant === 'danger'
                        ? 'bg-white/3 border-white/10 text-gray-300 hover:border-red-500/40 hover:bg-red-500/5'
                        : 'bg-white/3 border-white/10 text-gray-300 hover:bg-white/8 hover:border-white/25'
                }`}
        >
            <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
                    ${selected ? 'border-white bg-white' : 'border-white/30 group-hover:border-white/50'}`}>
                    {selected && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>
                <div className="flex-1 min-w-0">
                    <span className="text-base font-medium leading-snug">{label}</span>
                    {sublabel && <p className="text-sm text-gray-500 mt-0.5">{sublabel}</p>}
                </div>
            </div>
        </button>
    );

    const renderStep = () => {
        switch (currentStep) {
            case 'intro':
                return (
                    <div className="text-center space-y-6 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Vagas abertas · Processo seletivo ativo
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                            Nós só trabalhamos com pessoas que querem construir um{' '}
                            <span className="gradient-text">negócio real com IA</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Gerando receita previsível e escalável. Se isso faz sentido para você,{' '}
                            <strong className="text-gray-200">responda com sinceridade.</strong>{' '}
                            Leva menos de 3 minutos.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <IconCheck size={16} className="text-green-400" />
                                <span>10 perguntas</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <IconCheck size={16} className="text-green-400" />
                                <span>Menos de 3 minutos</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <IconCheck size={16} className="text-green-400" />
                                <span>100% confidencial</span>
                            </div>
                        </div>
                    </div>
                );

            case 'q1':
                return (
                    <div className="max-w-2xl mx-auto space-y-3">
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            A MGT Academy é para quem quer construir um negócio sólido com IA — com estrutura comercial, clientes recorrentes e escala real.
                        </p>
                        <OptionButton
                            label="Sim, é exatamente o que estou buscando"
                            selected={formData.commitment === 'sim'}
                            onClick={() => selectOption('commitment', 'sim')}
                        />
                        <OptionButton
                            label="Não é bem isso que procuro"
                            selected={formData.commitment === 'nao'}
                            onClick={() => selectOption('commitment', 'nao')}
                        />
                    </div>
                );

            case 'q2':
                return (
                    <div className="max-w-2xl mx-auto space-y-3">
                        {[
                            { label: 'R$0 (ainda não faturei nada)', value: 'zero' },
                            { label: 'Até R$5 mil/mês', value: 'ate5k' },
                            { label: 'R$5 mil a R$20 mil/mês', value: '5k-20k' },
                            { label: 'R$20 mil a R$50 mil/mês', value: '20k-50k' },
                            { label: 'Acima de R$50 mil/mês', value: 'acima50k' },
                        ].map(opt => (
                            <OptionButton
                                key={opt.value}
                                label={opt.label}
                                selected={formData.monthlyRevenue === opt.value}
                                onClick={() => selectOption('monthlyRevenue', opt.value)}
                            />
                        ))}
                    </div>
                );

            case 'q3':
                return (
                    <div className="max-w-2xl mx-auto space-y-3">
                        {[
                            { label: 'Ainda não comecei', value: 'nao-comecei' },
                            { label: 'Menos de 6 meses', value: 'menos-6m' },
                            { label: 'Entre 6 meses e 1 ano', value: '6m-1a' },
                            { label: 'De 1 a 3 anos', value: '1a-3a' },
                            { label: 'Mais de 3 anos', value: 'mais-3a' },
                        ].map(opt => (
                            <OptionButton
                                key={opt.value}
                                label={opt.label}
                                selected={formData.experienceTime === opt.value}
                                onClick={() => selectOption('experienceTime', opt.value)}
                            />
                        ))}
                    </div>
                );

            case 'q4':
                return (
                    <div className="max-w-2xl mx-auto space-y-3">
                        {[
                            { label: 'Ainda não prospecto, não sei por onde começar', value: 'nao-prospecta' },
                            { label: 'Faço prospecção manual mas sem consistência', value: 'manual-inconsistente' },
                            { label: 'Tenho alguns clientes mas sem processo definido', value: 'clientes-sem-processo' },
                            { label: 'Tenho processo funcionando e quero escalar', value: 'processo-escalando' },
                        ].map(opt => (
                            <OptionButton
                                key={opt.value}
                                label={opt.label}
                                selected={formData.prospecting === opt.value}
                                onClick={() => selectOption('prospecting', opt.value)}
                            />
                        ))}
                    </div>
                );

            case 'q5':
                return (
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-medium select-none">@</span>
                            <input
                                type="text"
                                value={formData.instagram}
                                onChange={e => update('instagram', e.target.value.replace(/^@/, '').replace(/\s/g, ''))}
                                onKeyDown={e => { if (e.key === 'Enter' && canProceed()) goNext(); }}
                                placeholder="seuusuario"
                                autoFocus
                                autoCapitalize="none"
                                autoCorrect="off"
                                className="w-full pl-10 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all text-lg"
                            />
                        </div>
                        <p className="text-gray-600 text-sm mt-3 text-center">Digite apenas o usuário, sem @</p>
                    </div>
                );

            case 'q6':
                return (
                    <div className="max-w-2xl mx-auto space-y-3">
                        <OptionButton
                            label="Acima de R$10 mil"
                            sublabel="À vista ou parcelado"
                            selected={formData.investmentAvailable === 'acima10k'}
                            onClick={() => selectOption('investmentAvailable', 'acima10k')}
                        />
                        <OptionButton
                            label="Entre R$5 mil e R$10 mil"
                            selected={formData.investmentAvailable === '5k-10k'}
                            onClick={() => selectOption('investmentAvailable', '5k-10k')}
                        />
                        <OptionButton
                            label="Abaixo de R$5 mil"
                            selected={formData.investmentAvailable === 'abaixo5k'}
                            onClick={() => selectOption('investmentAvailable', 'abaixo5k')}
                        />
                    </div>
                );

            case 'q7':
                return (
                    <div className="max-w-2xl mx-auto space-y-4">
                        <textarea
                            value={formData.whyJoin}
                            onChange={e => update('whyJoin', e.target.value)}
                            placeholder="Compartilhe o que te motivou a se candidatar, onde está hoje e onde quer chegar..."
                            rows={5}
                            autoFocus
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all resize-none leading-relaxed"
                        />
                        <p className="text-gray-600 text-xs text-right">{formData.whyJoin.length} caracteres</p>

                        {/* Upload de vídeo */}
                        <div className="space-y-2">
                            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
                                <IconVideo size={16} className="text-blue-400" />
                                Envie um vídeo se apresentando <span className="text-gray-600 font-normal">(opcional)</span>
                            </p>
                            <p className="text-gray-600 text-xs">
                                Formatos aceitos: MP4, MOV, AVI, WebM, MKV, 3GP — iPhone e Android são bem-vindos.
                            </p>

                            {formData.videoFile ? (
                                <div className="flex items-center gap-3 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                                    <IconVideo size={20} className="text-blue-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium truncate">{formData.videoFile.name}</p>
                                        <p className="text-gray-500 text-xs">
                                            {(formData.videoFile.size / (1024 * 1024)).toFixed(1)} MB
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, videoFile: null }))}
                                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all flex-shrink-0"
                                    >
                                        <IconX size={14} className="text-gray-400" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => videoInputRef.current?.click()}
                                    onDragOver={e => { e.preventDefault(); setVideoDragging(true); }}
                                    onDragLeave={() => setVideoDragging(false)}
                                    onDrop={e => {
                                        e.preventDefault();
                                        setVideoDragging(false);
                                        const file = e.dataTransfer.files[0];
                                        if (file) handleVideoFile(file);
                                    }}
                                    className={`cursor-pointer flex flex-col items-center justify-center gap-3 px-5 py-8 rounded-2xl border-2 border-dashed transition-all ${videoDragging
                                            ? 'border-blue-400/60 bg-blue-500/10'
                                            : 'border-white/10 bg-white/3 hover:border-white/25 hover:bg-white/5'
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center">
                                        <IconUpload size={20} className="text-gray-400" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-300 text-sm font-medium">Clique ou arraste o vídeo aqui</p>
                                        <p className="text-gray-600 text-xs mt-1">MP4 · MOV · AVI · WebM · MKV · 3GP</p>
                                    </div>
                                </div>
                            )}

                            <input
                                ref={videoInputRef}
                                type="file"
                                accept={ACCEPTED_VIDEO_EXTS}
                                className="hidden"
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) handleVideoFile(file);
                                    e.target.value = '';
                                }}
                            />
                        </div>
                    </div>
                );

            case 'q8':
                return (
                    <div className="max-w-2xl mx-auto space-y-3">
                        <OptionButton
                            label="Sim, estou pronto agora"
                            selected={formData.canStart === 'sim-agora'}
                            onClick={() => selectOption('canStart', 'sim-agora')}
                        />
                        <OptionButton
                            label="Preciso de alguns dias"
                            selected={formData.canStart === 'alguns-dias'}
                            onClick={() => selectOption('canStart', 'alguns-dias')}
                        />
                        <OptionButton
                            label="Ainda não tenho certeza"
                            selected={formData.canStart === 'incerto'}
                            onClick={() => selectOption('canStart', 'incerto')}
                        />
                    </div>
                );

            case 'q9':
                return (
                    <div className="max-w-md mx-auto">
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => update('name', e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && canProceed()) goNext(); }}
                            placeholder="Seu nome completo"
                            autoFocus
                            autoComplete="name"
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all text-lg"
                        />
                    </div>
                );

            case 'q10':
                return (
                    <div className="max-w-md mx-auto">
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={e => update('phone', formatPhone(e.target.value))}
                            onKeyDown={e => { if (e.key === 'Enter' && canProceed()) handleSubmit(); }}
                            placeholder="(00) 00000-0000"
                            autoFocus
                            autoComplete="tel"
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all text-lg"
                        />
                        <p className="text-gray-600 text-sm mt-3 text-center">Usaremos apenas para entrar em contato sobre sua candidatura</p>
                    </div>
                );

            default:
                return null;
        }
    };

    const getStepTitle = (): string => {
        switch (currentStep) {
            case 'intro': return '';
            case 'q1': return 'Isso faz sentido para você?';
            case 'q2': return 'Qual é o seu faturamento mensal atual?';
            case 'q3': return 'Há quanto tempo você atua com IA, automações ou tecnologia?';
            case 'q4': return 'Como você está buscando clientes hoje?';
            case 'q5': return 'Qual é o seu perfil no Instagram?';
            case 'q6': return 'Qual é a sua disponibilidade atual de investimento?';
            case 'q7': return 'Por que você quer entrar na MGT Academy?';
            case 'q8': return 'Se aprovado, você consegue começar ainda essa semana?';
            case 'q9': return 'Qual é o seu nome completo?';
            case 'q10': return 'Qual é o seu WhatsApp?';
            default: return '';
        }
    };

    const isSelectionStep = ['q1', 'q2', 'q3', 'q4', 'q6', 'q8'].includes(currentStep);
    const progress = currentStep === 'intro' ? 0 : (questionNumber / TOTAL_QUESTIONS) * 100;

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/15" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 sm:mb-10 relative z-10">
                <img src="/logo_mgt.png" alt="MGT Academy" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    MGT<span className="text-gray-500 font-light italic ml-1 text-lg sm:text-xl">ACADEMY</span>
                </span>
            </div>

            <div className="w-full max-w-3xl relative z-10">
                {/* Progress bar — só mostra após intro */}
                {currentStep !== 'intro' && (
                    <div className="mb-6 sm:mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-600 font-medium tracking-wider uppercase">
                                Pergunta {questionNumber} de {TOTAL_QUESTIONS}
                            </span>
                            <span className="text-xs text-gray-600 font-medium">
                                {Math.round(progress)}% concluído
                            </span>
                        </div>
                        <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                                initial={false}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                )}

                {/* Card */}
                <div className="glass rounded-3xl p-6 sm:p-8 md:p-12 overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentStep}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                        >
                            {/* Título da pergunta */}
                            {currentStep !== 'intro' && (
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                                    {getStepTitle()}
                                </h2>
                            )}

                            {/* Conteúdo do step */}
                            {renderStep()}

                            {/* Botões de navegação — para steps que não são seleção automática */}
                            {!isSelectionStep && (
                                <div className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-10 justify-center">
                                    {currentStep !== 'intro' && (
                                        <button
                                            onClick={goBack}
                                            className="px-6 py-4 sm:py-3 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2 min-h-[48px] order-2 sm:order-1"
                                        >
                                            <IconArrowLeft size={18} />
                                            Voltar
                                        </button>
                                    )}
                                    <button
                                        onClick={currentStep === 'q10' ? handleSubmit : currentStep === 'intro' ? goNext : goNext}
                                        disabled={!canProceed()}
                                        className={`px-8 py-4 sm:py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all min-h-[48px] order-1 sm:order-2 ${canProceed()
                                            ? 'bg-white text-black hover:bg-gray-100 active:scale-[0.98]'
                                            : 'bg-white/8 text-gray-600 cursor-not-allowed'
                                            }`}
                                    >
                                        {currentStep === 'intro'
                                            ? 'Iniciar aplicação'
                                            : currentStep === 'q10'
                                                ? 'Enviar candidatura'
                                                : 'Continuar'}
                                        <IconArrowRight size={18} />
                                    </button>
                                </div>
                            )}

                            {/* Back button para selection steps (exceto q1) */}
                            {isSelectionStep && currentStep !== 'q1' && (
                                <div className="flex justify-center mt-6">
                                    <button
                                        onClick={goBack}
                                        className="px-5 py-2.5 text-gray-600 hover:text-gray-400 transition-colors text-sm flex items-center gap-1.5"
                                    >
                                        <IconArrowLeft size={16} />
                                        Voltar
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Rodapé de segurança */}
                <p className="text-center text-gray-700 text-xs mt-5">
                    🔒 Suas respostas são confidenciais e usadas apenas para análise de perfil
                </p>
            </div>
        </div>
    );
};

export default AplicacaoForm;
