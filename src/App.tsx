import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AppSettingsProvider } from './contexts/AppSettingsContext';
import Navigation from './components/navigation/Navigation';
import Dashboard from './components/dashboard/Dashboard';
import Orders from './components/orders/Orders';
import Earnings from './components/earnings/Earnings';
import Shifts from './components/shifts/Shifts';
import Notifications from './components/notifications/Notifications';
import MoreSection from './components/more/MoreSection';
import Settings from './components/settings/Settings';
import { LoginPage, RegisterPage } from './components/auth';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { themeClasses } = useTheme();

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  if (!isAuthenticated) {
    if (currentPage === 'register') {
      return (
        <ThemeProvider>
          <LanguageProvider>
            <RegisterPage onNavigateToLogin={() => setCurrentPage('login')} />
          </LanguageProvider>
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider>
        <LanguageProvider>
          <LoginPage 
            onLogin={handleLogin} 
            onNavigateToRegister={() => setCurrentPage('register')} 
          />
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'earnings':
        return <Earnings />;
      case 'shifts':
        return <Shifts />;
      case 'notifications':
        return <Notifications />;
      case 'more':
        return <MoreSection onLogout={handleLogout} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <AppProvider>
        <AppSettingsProvider>
          <div className={`min-h-screen ${themeClasses.bg} transition-colors duration-300`}>
            <main className="pb-16">
              {renderActiveComponent()}
            </main>
            <div className="fixed bottom-0 left-0 right-0 z-50">
              <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        </AppSettingsProvider>
      </AppProvider>
    </LanguageProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;