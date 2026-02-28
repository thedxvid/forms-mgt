import React, { useState } from 'react';
import AplicacaoForm from './AplicacaoForm';
import AplicacaoThankYouPage from './AplicacaoThankYouPage';
import { AplicacaoFormData } from '../types';
import { supabase } from '../lib/supabase';

type PageState = 'form' | 'approved';

const STORAGE_BUCKET = 'aplicacao-videos';

const AplicacaoPage: React.FC = () => {
    const [pageState, setPageState] = useState<PageState>('form');

    const uploadVideo = async (file: File): Promise<string | null> => {
        try {
            const ext = file.name.split('.').pop() ?? 'mp4';
            const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

            const { error: uploadError } = await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(fileName, file, { cacheControl: '3600', upsert: false });

            if (uploadError) {
                console.error('Erro no upload do vídeo:', uploadError);
                return null;
            }

            const { data } = supabase.storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(fileName);

            return data.publicUrl ?? null;
        } catch (err) {
            console.error('Erro inesperado no upload:', err);
            return null;
        }
    };

    const handleComplete = async (data: AplicacaoFormData) => {
        // Faz upload do vídeo (se houver) antes de salvar tudo
        let videoUrl: string | null = null;
        if (data.videoFile) {
            videoUrl = await uploadVideo(data.videoFile);
        }

        // Envia para webhook e salva no Supabase em paralelo
        const webhookPromise = fetch('https://autowebhook.mgtinc.cloud/webhook/leads-ja-compradores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                formType: 'aplicacao',
                commitment: data.commitment,
                monthlyRevenue: data.monthlyRevenue,
                experienceTime: data.experienceTime,
                prospecting: data.prospecting,
                instagram: data.instagram,
                investmentAvailable: data.investmentAvailable,
                whyJoin: data.whyJoin,
                canStart: data.canStart,
                name: data.name,
                phone: data.phone,
                videoUrl,
            }),
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
            video_url: videoUrl,
        }).then(({ error }) => {
            if (error) {
                console.error('Erro ao salvar no Supabase:', error);
            }
        });

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

