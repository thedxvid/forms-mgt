
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PreVagasPage from './components/PreVagasPage';
import BootcampPage from './components/BootcampPage';
import BootcampThankYouPage from './components/BootcampThankYouPage';
import AplicacaoPage from './components/AplicacaoPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreVagasPage />} />
        <Route path="/bootcamp" element={<BootcampPage />} />
        <Route path="/obrigado-bootcamp" element={<BootcampThankYouPage />} />
        <Route path="/aplicacao" element={<AplicacaoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
