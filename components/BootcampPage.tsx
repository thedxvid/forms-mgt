import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import BootcampForm from './BootcampForm';
import { BootcampFormData } from '../types';
import { useNavigate } from 'react-router-dom';

const BootcampPage: React.FC = () => {
    const navigate = useNavigate();

    const handleFormComplete = async (data: BootcampFormData) => {
        // Enviar dados para o webhook (mesmo utilizado em PreVagasPage)
        try {
            const response = await fetch('https://autowebhook.mgtinc.cloud/webhook/Forms-grupo-whatsApp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formType: 'bootcamp', ...data })
            });

            if (response.ok) {
                console.log('Dados do bootcamp enviados com sucesso para o webhook');
            } else {
                console.error('Erro ao enviar dados para o webhook:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar dados para o webhook:', error);
        }

        // Redireciona para a página de obrigado do bootcamp
        navigate('/obrigado-bootcamp');
    };

    return (
        <div className="min-h-screen bg-black selection:bg-white/20 overflow-x-hidden flex flex-col">
            <Header scrolled={false} showNavigation={false} />
            <main className="flex-grow">
                <BootcampForm onComplete={handleFormComplete} />
            </main>
            <Footer />
        </div>
    );
};

export default BootcampPage;
