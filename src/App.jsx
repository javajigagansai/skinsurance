import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { AppRoutes } from './routes';
import { ChatWidget } from './components/ui/ChatWidget';

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Global backdrop video - hidden on Home Page to prevent duplicates */}
      {!isHomePage && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-screen h-screen object-cover -z-10 pointer-events-none opacity-30 dark:opacity-20 transition-opacity duration-500"
        >
          <source src="/hero_background.mp4" type="video/mp4" />
        </video>
      )}

      <AppRoutes />
      <ChatWidget />
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
