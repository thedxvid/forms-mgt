import React, { useState } from 'react';
import AplicacaoForm from './AplicacaoForm';
import AplicacaoThankYouPage from './AplicacaoThankYouPage';
import { AplicacaoFormData } from '../types';
import { supabase } from '../lib/supabase';

type PageState = 'form' | 'approved';

const AplicacaoPage: React.FC = () => {
    const [pageState, setPageState] = useState<PageState>('form');

    const handleComplete = async (data: AplicacaoFormData) => {
        // Envia para webhook e salva no Supabase em paralelo
        const webhookPromise = fetch('https://autowebhook.mgtinc.cloud/webhook/leads-ja-compradores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formType: 'aplicacao', ...data }),
        }).catch((error) => {
            console.error('Erro ao enviar para webhook:', error);
        });

        const supabasePromise = supabase.from('aplicacoes').insert({
            commitment: data.commitment,
            monthly_revenue: data.monthlyRevenue,
            experience_time: data.experienceTime,
            prospecting: data.prospecting,
            instagram: data.instagram,
            investment_available: data.investmentAvailable,
            why_join: data.whyJoin,
            can_start: data.canStart,
            name: data.name,
            phone: data.phone,
        }).then(({ error }) => {
            if (error) {
                console.error('Erro ao salvar no Supabase:', error);
            }
        });

        // Aguarda ambas operações finalizarem
        await Promise.all([webhookPromise, supabasePromise]);

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

