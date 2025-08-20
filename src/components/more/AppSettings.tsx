import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Globe, Bell, Battery, Wifi, Volume2, Moon, Eye, Download, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AppSettings() {
  const { language, setLanguage } = useLanguage();
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    vibration: true,
    darkMode: false,
    batteryOptimization: true,
    offlineMode: false,
    autoAcceptOrders: false,
    locationSharing: true
  });
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isOffline, setIsOffline] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(true);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleSetting = (key: string) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key as keyof typeof prev] };
      
      // Handle specific setting changes
      if (key === 'batteryOptimization') {
        handleBatteryOptimization(newSettings.batteryOptimization);
      } else if (key === 'offlineMode') {
        handleOfflineMode(newSettings.offlineMode);
      }
      
      return newSettings;
    });
  };

  const handleBatteryOptimization = (enabled: boolean) => {
    if (enabled) {
      // Simulate battery optimization
      alert('🔋 Battery Optimization Enabled!\n\n• Background app refresh disabled\n• Location accuracy reduced\n• Screen brightness optimized\n• Push notifications minimized');
    } else {
      alert('⚡ Full Performance Mode\n\n• All features enabled\n• Maximum location accuracy\n• Real-time notifications');
    }
  };

  const handleOfflineMode = (enabled: boolean) => {
    setIsOffline(enabled);
    if (enabled) {
      alert('📱 Offline Mode Activated!\n\n• Orders cached locally\n• Maps downloaded for offline use\n• Sync when connection restored\n• Limited features available');
    } else {
      alert('🌐 Online Mode\n\n• Real-time order updates\n• Live navigation\n• All features available');
    }
  };

  const handleAppUpdate = () => {
    setIsUpdating(true);
    setUpdateProgress(0);
    
    const interval = setInterval(() => {
      setUpdateProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          setUpdateAvailable(false);
          alert('✅ App Updated Successfully!\n\nVersion 1.12.7 installed\n\n• New liquor delivery features\n• Improved battery optimization\n• Enhanced offline mode\n• Bug fixes and performance improvements');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  useEffect(() => {
    // Simulate battery level monitoring
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(10, Math.min(100, prev + change));
      });
    }, 5000);

    return () => clearInterval(batteryInterval);
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">App Settings</h1>

      {/* Language Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Globe className="text-blue-600" size={20} />
          Language Settings / भाषा सेटिंग्स
        </h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-800 font-medium">Current Language</p>
          <p className="text-blue-700">
            {language === 'en' && '🇺🇸 English'}
            {language === 'hi' && '🇮🇳 हिंदी (Hindi)'}
            {language === 'mr' && '🇮🇳 मराठी (Marathi)'}
          </p>
        </div>
        
        <div className="space-y-3">
          {[
            { code: 'en', name: 'English', native: 'English', flag: '🇺🇸', desc: 'Default language' },
            { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳', desc: 'राष्ट्रीय भाषा' },
            { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', desc: 'महाराष्ट्राची भाषा' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                alert(`✅ Language changed to ${lang.native}!\n\nApp interface will now display in ${lang.name}.`);
              }}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                language === lang.code
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="text-left">
                    <p className="font-medium">{lang.name}</p>
                    <p className="text-sm opacity-75">{lang.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{lang.native}</p>
                  {language === lang.code && (
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span className="text-xs">Active</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            💡 Tip: Language changes apply immediately to all app screens and notifications.
          </p>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="text-orange-600" size={20} />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive order and app notifications</p>
            </div>
            <button
              onClick={() => toggleSetting('notifications')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.notifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sound</p>
              <p className="text-sm text-gray-600">Play notification sounds</p>
            </div>
            <button
              onClick={() => toggleSetting('sound')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.sound ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.sound ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Vibration</p>
              <p className="text-sm text-gray-600">Vibrate for notifications</p>
            </div>
            <button
              onClick={() => toggleSetting('vibration')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.vibration ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.vibration ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Battery Optimization */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Battery className="text-green-600" size={20} />
          Battery Optimization
        </h3>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Current Battery Level</span>
            <span className="text-sm font-bold">{batteryLevel}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                batteryLevel > 50 ? 'bg-green-500' : batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${batteryLevel}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium">Battery Optimization</p>
            <p className="text-sm text-gray-600">
              {settings.batteryOptimization ? 'Saving battery power' : 'Full performance mode'}
            </p>
          </div>
          <button
            onClick={() => toggleSetting('batteryOptimization')}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.batteryOptimization ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              settings.batteryOptimization ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        {settings.batteryOptimization && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800 font-medium mb-1">Battery Saver Active</p>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Background refresh limited</li>
              <li>• Location accuracy reduced</li>
              <li>• Screen brightness optimized</li>
              <li>• Push notifications minimized</li>
            </ul>
          </div>
        )}
      </div>

      {/* Offline Mode */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Wifi className={isOffline ? 'text-gray-600' : 'text-blue-600'} size={20} />
          Offline Mode
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium">Work Offline</p>
            <p className="text-sm text-gray-600">
              {settings.offlineMode ? 'Orders cached locally' : 'Real-time updates'}
            </p>
          </div>
          <button
            onClick={() => toggleSetting('offlineMode')}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.offlineMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              settings.offlineMode ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        {settings.offlineMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 font-medium mb-1">Offline Mode Active</p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Orders cached for offline access</li>
              <li>• Maps downloaded for navigation</li>
              <li>• Data syncs when online</li>
              <li>• Limited real-time features</li>
            </ul>
          </div>
        )}
      </div>

      {/* App Updates */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Download className="text-purple-600" size={20} />
          App Updates
        </h3>
        
        {updateAvailable && !isUpdating ? (
          <div className="border border-orange-200 bg-orange-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="text-orange-600" size={20} />
              <div>
                <p className="font-medium text-orange-800">Update Available</p>
                <p className="text-sm text-orange-700">Version 1.12.7 is ready to install</p>
              </div>
            </div>
            <div className="text-sm text-orange-700 mb-3">
              <p className="font-medium mb-1">What's New:</p>
              <ul className="space-y-1 text-xs">
                <li>• Enhanced liquor delivery features</li>
                <li>• Improved battery optimization</li>
                <li>• Better offline mode support</li>
                <li>• Bug fixes and performance improvements</li>
              </ul>
            </div>
            <button
              onClick={handleAppUpdate}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Update Now (25.4 MB)
            </button>
          </div>
        ) : isUpdating ? (
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Download className="text-blue-600 animate-bounce" size={20} />
              <div>
                <p className="font-medium text-blue-800">Updating App...</p>
                <p className="text-sm text-blue-700">Please don't close the app</p>
              </div>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${updateProgress}%` }}
              />
            </div>
            <p className="text-sm text-blue-700 text-center">{updateProgress}% Complete</p>
          </div>
        ) : (
          <div className="border border-green-200 bg-green-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              <div>
                <p className="font-medium text-green-800">App is Up to Date</p>
                <p className="text-sm text-green-700">Version 1.12.7 - Latest</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>• Auto-updates: Enabled</p>
          <p>• Last checked: Just now</p>
          <p>• Update over WiFi only: Enabled</p>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="text-gray-600" size={20} />
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-600">Use dark theme</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('darkMode')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.darkMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}