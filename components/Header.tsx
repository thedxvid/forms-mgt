
import React from 'react';

interface HeaderProps {
  scrolled: boolean;
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled, showNavigation = true }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {showNavigation && (
          <div className="flex items-center gap-3">
            <img src="/logo_mgt.png" alt="MGT Academy" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold tracking-tight text-white">MGT<span className="text-gray-500 font-light italic ml-1 text-lg">ACADEMY</span></span>
          </div>
        )}

        {!showNavigation && <div></div>}

        {showNavigation && (
          <>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
              <a href="#video" className="hover:text-white transition-colors">Vídeo</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Depoimentos</a>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
