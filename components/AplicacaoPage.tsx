import React, { useState } from 'react';
import AplicacaoForm from './AplicacaoForm';
import AplicacaoThankYouPage from './AplicacaoThankYouPage';
import AplicacaoEncerradaPage from './AplicacaoEncerradaPage';
import { AplicacaoFormData } from '../types';

type PageState = 'form' | 'approved' | 'disqualified';

const AplicacaoPage: React.FC = () => {
    const [pageState, setPageState] = useState<PageState>('form');
    const [disqualifyReason, setDisqualifyReason] = useState<string>('commitment');

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

    const handleDisqualify = (reason: string) => {
        setDisqualifyReason(reason);
        setPageState('disqualified');
    };

    if (pageState === 'approved') {
        return <AplicacaoThankYouPage />;
    }

    if (pageState === 'disqualified') {
        return <AplicacaoEncerradaPage reason={disqualifyReason} />;
    }

    return (
        <AplicacaoForm
            onComplete={handleComplete}
            onDisqualify={handleDisqualify}
        />
    );
};

export default AplicacaoPage;
