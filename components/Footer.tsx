
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Acompanhe a Jornada</h2>
            <p className="text-gray-400 max-w-md">
              Conteúdos diários sobre tecnologia, design e carreira nas minhas redes sociais. Não perca os bastidores.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a 
              href="https://instagram.com/cello.anders" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass p-4 rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058-1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.435.066-2.416.294-3.275.632-.888.344-1.642.805-2.392 1.555s-1.211 1.504-1.555 2.392c-.338.859-.566 1.84-.632 3.275-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.066 1.435.294 2.416.632 3.275.344.888.805 1.642 1.555 2.392s1.504 1.211 2.392 1.555c.859.338 1.84.566 3.275.632 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.435-.066 2.416-.294 3.275-.632.888-.344 1.642-.805 2.392-1.555s1.211-1.504 1.555-2.392c.338-.859.566-1.84.632-3.275.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.066-1.435-.294-2.416-.632-3.275-.344-.888-.805-1.642-1.555-2.392s-1.504-1.211-2.392-1.555c-.859-.338-1.84-.566-3.275-.632-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <span className="font-semibold text-white group-hover:translate-x-1 transition-transform">Instagram</span>
            </a>
            
            <a 
              href="https://www.instagram.com/mgt.inc/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass p-4 rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white border border-white/10">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058-1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.435.066-2.416.294-3.275.632-.888.344-1.642.805-2.392 1.555s-1.211 1.504-1.555 2.392c-.338.859-.566 1.84-.632 3.275-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.066 1.435.294 2.416.632 3.275.344.888.805 1.642 1.555 2.392s1.504 1.211 2.392 1.555c.859.338 1.84.566 3.275.632 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.435-.066 2.416-.294 3.275-.632.888-.344 1.642-.805 2.392-1.555s1.211-1.504 1.555-2.392c.338-.859.566-1.84.632-3.275.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.066-1.435-.294-2.416-.632-3.275-.344-.888-.805-1.642-1.555-2.392s-1.504-1.211-2.392-1.555c-.859-.338-1.84-.566-3.275-.632-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <span className="font-semibold text-white group-hover:translate-x-1 transition-transform">MGT Inc</span>
            </a>

            <a 
              href="https://youtube.com/@mgtacademy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass p-4 rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <span className="font-semibold text-white group-hover:translate-x-1 transition-transform">YouTube</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-gray-500 text-sm">
          <p>© 2024 MGT Academy. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
