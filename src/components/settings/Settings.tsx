import React from 'react';
import { Globe, ChevronRight, Smartphone, Shield, Bell } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('settings')}</h1>

      {/* Language Settings */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Globe size={20} className="text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-800">{t('language')}</h2>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-4">{t('changeLanguage')}</p>
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  language === lang.code
                    ? 'bg-orange-50 border-2 border-orange-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    language === lang.code
                      ? 'bg-orange-600 border-orange-600'
                      : 'border-gray-300'
                  }`}>
                    {language === lang.code && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{lang.nativeName}</p>
                    <p className="text-sm text-gray-500">{lang.name}</p>
                  </div>
                </div>
                {language === lang.code && (
                  <div className="text-orange-600 font-semibold text-sm">Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Smartphone size={20} className="text-green-600" />
            </div>
            <h2 className="font-semibold text-gray-800">App Settings</h2>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">Battery Optimization</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">Location Permissions</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">Data Usage</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Bell size={20} className="text-orange-600" />
            </div>
            <h2 className="font-semibold text-gray-800">Notifications</h2>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Order Alerts</p>
              <p className="text-sm text-gray-500">Get notified about new orders</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Earnings Updates</p>
              <p className="text-sm text-gray-500">Daily and weekly earning summaries</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Safety Alerts</p>
              <p className="text-sm text-gray-500">Emergency and safety notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <Shield size={20} className="text-red-600" />
            </div>
            <h2 className="font-semibold text-gray-800">Privacy & Security</h2>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">Privacy Policy</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">Terms of Service</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">Data Protection</span>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* App Version */}
      <div className="text-center mt-8 text-gray-500">
        <p className="text-sm">Version 1.2.0</p>
        <p className="text-xs">Last updated: Jan 15, 2025</p>
      </div>
    </div>
  );
}