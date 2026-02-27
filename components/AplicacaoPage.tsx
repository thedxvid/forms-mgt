import React, { useState } from 'react';
import AplicacaoForm from './AplicacaoForm';
import AplicacaoThankYouPage from './AplicacaoThankYouPage';
import { AplicacaoFormData } from '../types';

type PageState = 'form' | 'approved';

const AplicacaoPage: React.FC = () => {
    const [pageState, setPageState] = useState<PageState>('form');

    const handleComplete = async (data: AplicacaoFormData) => {
        // Envia dados para o webhook
        try {
            await fetch('https://autowebhook.mgtinc.cloud/webhook/leads-ja-compradores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formType: 'aplicacao', ...data }),
            });
        } catch (error) {
            console.error('Erro ao enviar para webhook:', error);
        }
        setPageState('approved');
    };

    if (pageState === 'approved') {
        return <AplicacaoThankYouPage />;
    }

    return (
        <AplicacaoForm onComplete={handleComplete} />
    );
};

export default AplicacaoPage;

