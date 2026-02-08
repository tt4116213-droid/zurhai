
import React, { useState, useEffect } from 'react';
import { ZODIAC_SIGNS, QUOTES } from './constants';
import { ZodiacSign, MoodType } from './types';
import { getDailyHoroscope } from './services/geminiService';

// Components
import ZodiacGrid from './components/ZodiacGrid';
import ZodiacDetail from './components/ZodiacDetail';
import Quiz from './components/Quiz';
import Compatibility from './components/Compatibility';
import MoodAdvice from './components/MoodAdvice';

type Page = 'home' | 'detail' | 'quiz' | 'compatibility' | 'mood';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dailyQuote, setDailyQuote] = useState('');

  useEffect(() => {
    setDailyQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  const handleSignSelect = (sign: ZodiacSign) => {
    setSelectedSign(sign);
    setActivePage('detail');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0b0e14] text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Background Decor */}
      <div className={`fixed inset-0 pointer-events-none opacity-20 ${isDarkMode ? 'star-bg' : ''}`}></div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-opacity-70 border-b border-white/10 p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div 
            className="text-2xl font-bold cursor-pointer flex items-center gap-2 group"
            onClick={() => setActivePage('home')}
          >
            <span className="text-yellow-400 group-hover:rotate-12 transition-transform">✨</span>
            <span className="tracking-widest uppercase">Zodiacly</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <button onClick={() => setActivePage('home')} className="hover:text-yellow-400 transition-colors">Нүүр</button>
            <button onClick={() => setActivePage('quiz')} className="hover:text-yellow-400 transition-colors">Сорил</button>
            <button onClick={() => setActivePage('compatibility')} className="hover:text-yellow-400 transition-colors">Тохироо</button>
            <button onClick={() => setActivePage('mood')} className="hover:text-yellow-400 transition-colors">Сэтгэл санаа</button>
          </nav>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 relative z-10">
        {activePage === 'home' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-float">Өөрийн ордоо сонгоно уу</h1>
              <p className="text-white/60 text-lg italic">"{dailyQuote}"</p>
            </div>
            <ZodiacGrid signs={ZODIAC_SIGNS} onSelect={handleSignSelect} />
            
            {/* Quick Links for Mobile */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div 
                onClick={() => setActivePage('quiz')}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-400 transition-all cursor-pointer text-center group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🧠</div>
                <h3 className="text-xl font-bold">Ордны сорил</h3>
                <p className="text-sm opacity-60">Та ордныхоо хэдэн хувь бэ?</p>
              </div>
              <div 
                onClick={() => setActivePage('compatibility')}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-400 transition-all cursor-pointer text-center group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">❤️</div>
                <h3 className="text-xl font-bold">Тохироо шалгах</h3>
                <p className="text-sm opacity-60">Хэн тантай хамгийн сайн тохирох вэ?</p>
              </div>
              <div 
                onClick={() => setActivePage('mood')}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-400 transition-all cursor-pointer text-center group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🎭</div>
                <h3 className="text-xl font-bold">Зөвлөгөө</h3>
                <p className="text-sm opacity-60">Сэтгэл санааны зөвлөгөө аваарай.</p>
              </div>
            </div>
          </div>
        )}

        {activePage === 'detail' && selectedSign && (
          <ZodiacDetail sign={selectedSign} onBack={() => setActivePage('home')} />
        )}

        {activePage === 'quiz' && (
          <Quiz onBack={() => setActivePage('home')} signs={ZODIAC_SIGNS} />
        )}

        {activePage === 'compatibility' && (
          <Compatibility onBack={() => setActivePage('home')} signs={ZODIAC_SIGNS} />
        )}

        {activePage === 'mood' && (
          <MoodAdvice onBack={() => setActivePage('home')} />
        )}
      </main>

      <footer className="p-8 border-t border-white/5 text-center text-white/40 text-sm">
        <p>© 2024 Zodiacly - Оддын толи. Бүх эрх хуулиар хамгаалагдсан.</p>
      </footer>
    </div>
  );
};

export default App;
