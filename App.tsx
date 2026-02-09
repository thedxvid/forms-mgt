
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PreVagasPage from './components/PreVagasPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreVagasPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
