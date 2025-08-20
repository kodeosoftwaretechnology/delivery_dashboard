import React from 'react';
import { Home, Package, DollarSign, Calendar, Bell, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const { t } = useLanguage();
  const { unreadCount } = useApp();
  const { themeClasses } = useTheme();

  const tabs = [
    { id: 'dashboard', icon: Home, label: t('dashboard') },
    { id: 'orders', icon: Package, label: t('orders') },
    { id: 'earnings', icon: DollarSign, label: t('earnings') },
    { id: 'shifts', icon: Calendar, label: t('shifts') },
    { id: 'notifications', icon: Bell, label: t('notifications'), badge: unreadCount },
    { id: 'more', icon: MoreHorizontal, label: t('more') }
  ];

  return (
    <nav className={`${themeClasses.cardBg} border-t ${themeClasses.border} px-2 py-1 transition-colors duration-300`}>
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative ${
                isActive 
                  ? 'text-orange-600 bg-orange-50' 
                  : `${themeClasses.textSecondary} hover:${themeClasses.text}`
              }`}
            >
              <div className="relative">
                <Icon size={20} />
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${
                isActive ? 'text-orange-600' : themeClasses.textSecondary
              }`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}