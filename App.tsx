
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PreVagasPage from './components/PreVagasPage';
import BootcampPage from './components/BootcampPage';
import BootcampThankYouPage from './components/BootcampThankYouPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreVagasPage />} />
        <Route path="/bootcamp" element={<BootcampPage />} />
        <Route path="/obrigado-bootcamp" element={<BootcampThankYouPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
