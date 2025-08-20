import React, { useState } from 'react';
import { Globe, Check, Volume2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSettings } from '../../contexts/AppSettingsContext';

interface LanguageSettingsProps {
  onClose: () => void;
}

export default function LanguageSettings({ onClose }: LanguageSettingsProps) {
  const { language, setLanguage } = useLanguage();
  const { selectedLanguage: contextLang, voiceEnabled: contextVoice, autoTranslate: contextTranslate, updateLanguageSettings } = useAppSettings();
  const [selectedLanguage, setSelectedLanguage] = useState(contextLang || language);
  const [voiceEnabled, setVoiceEnabled] = useState(contextVoice);
  const [autoTranslate, setAutoTranslate] = useState(contextTranslate);
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('12');

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' }
  ];

  const handleSave = () => {
    setLanguage(selectedLanguage);
    updateLanguageSettings({
      selectedLanguage,
      voiceEnabled,
      autoTranslate,
      dateFormat,
      timeFormat
    });
    onClose();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <Globe className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Language Settings</h2>
        </div>
      </div>

      {/* Current Language Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">Current Language</h3>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{languages.find(l => l.code === language)?.flag}</span>
          <div>
            <p className="font-medium text-blue-700">
              {languages.find(l => l.code === language)?.name}
            </p>
            <p className="text-sm text-blue-600">
              {languages.find(l => l.code === language)?.nativeName}
            </p>
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Select Language</h3>
        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                selectedLanguage === lang.code
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{lang.flag}</span>
                <div className="text-left">
                  <p className="font-medium text-gray-800">{lang.name}</p>
                  <p className="text-sm text-gray-600">{lang.nativeName}</p>
                </div>
              </div>
              {selectedLanguage === lang.code && (
                <Check className="text-blue-600" size={20} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Settings */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Voice & Audio</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Volume2 className="text-gray-600" size={20} />
              <div>
                <p className="font-medium text-gray-800">Voice Navigation</p>
                <p className="text-sm text-gray-600">Enable voice instructions</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={voiceEnabled}
                onChange={(e) => setVoiceEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="text-gray-600" size={20} />
              <div>
                <p className="font-medium text-gray-800">Auto Translate</p>
                <p className="text-sm text-gray-600">Translate customer messages</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoTranslate}
                onChange={(e) => setAutoTranslate(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Regional Preferences</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select 
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
            <select 
              value={timeFormat}
              onChange={(e) => setTimeFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="12">12 Hour (AM/PM)</option>
              <option value="24">24 Hour</option>
            </select>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>₹ Indian Rupee (INR)</option>
              <option>$ US Dollar (USD)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Language Support Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-green-800 mb-2">🌟 Language Support</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Real-time translation for customer messages</li>
          <li>• Voice navigation in your preferred language</li>
          <li>• Local currency and date formats</li>
          <li>• Regional delivery instructions</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}