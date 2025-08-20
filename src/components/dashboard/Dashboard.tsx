import React, { useState, useEffect } from 'react';
import { Power, Shield, AlertTriangle, TrendingUp, MapPin, Clock, Camera, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppSettings } from '../../contexts/AppSettingsContext';
import PerformanceRatings from '../performance/PerformanceRatings';
import CustomerRatingModal from '../rating/CustomerRatingModal';

export default function Dashboard() {
  const { t } = useLanguage();
  const { 
    isOnline, 
    setIsOnline, 
    partner,
    todayEarnings, 
    pendingOrder, 
    acceptOrder, 
    rejectOrder,
    performanceMetrics,
    orderHistory
  } = useApp();
  
  const [greeting, setGreeting] = useState('');
  const [orderTimer, setOrderTimer] = useState(30);
  const [showSelfieModal, setShowSelfieModal] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();
  const { selectedLanguage, powerSaveMode, isOfflineMode, batteryLevel } = useAppSettings();

  const motivationalBanners = [
    {
      text: "जास्त ऑर्डर – जास्त कमाई – तुझं स्वप्न तुझ्या स्कूटरवर!",
      emoji: "🛵💰",
      textColor: "text-green-600"
    },
    {
      text: "घाई घाई नको रे बाबा – बाइक हळू चालव, घरचे वाट बघतायत!",
      emoji: "🏠❤️",
      textColor: "text-red-600"
    },
    {
      text: "आज 5 ऑर्डर पूर्ण कर – आणि बोनस घे थेट खात्यात!",
      emoji: "💵🎯",
      textColor: "text-orange-600"
    },
    {
      text: "ऑर्डर महत्त्वाची, पण तू त्याहूनही जास्त – सुरक्षित ड्रायव्हिंगचं वचन दे आज!",
      emoji: "🤝🛣️",
      textColor: "text-purple-600"
    },
    {
      text: "Speed म्हणजे Success – फास्ट डिलिव्हरी, फास्ट इनकम!",
      emoji: "⚡📦",
      textColor: "text-blue-600"
    },
    {
      text: "तू सुरक्षित असशील तरच कमाई टिकेल – हेल्मेट घाल आणि रस्ता पाहून चाल!",
      emoji: "🪖🛵",
      textColor: "text-teal-600"
    },
    {
      text: "Referral ला पैसे, टाइमवर डिलिव्हरीला इनाम – काय म्हणतोस?",
      emoji: "🎁🔥",
      textColor: "text-rose-600"
    },
    {
      text: "डिलिव्हरी वेळेवर येईल, पण तू घरी सुखरूप पोहोचणं जास्त गरजेचं!",
      emoji: "⏱️🚦",
      textColor: "text-amber-600"
    },
    {
      text: "Top Performer = Top Earner – तू पुढे आला तर बँक बॅलन्सही येईल पुढे!",
      emoji: "🏅💳",
      textColor: "text-violet-600"
    },
    {
      text: "डिलिव्हरी म्हणजे फक्त पॅकेज नाही – ही आहे तुला श्रीमंत बनवायची संधी!",
      emoji: "📈💼",
      textColor: "text-indigo-600"
    }
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  // Banner rotation every 7 seconds
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % motivationalBanners.length);
    }, 7000);
    return () => clearInterval(bannerTimer);
  }, [motivationalBanners.length]);

  useEffect(() => {
    if (pendingOrder && orderTimer > 0) {
      const timer = setTimeout(() => setOrderTimer(orderTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (orderTimer === 0) {
      rejectOrder();
      setOrderTimer(30);
    }
  }, [pendingOrder, orderTimer, rejectOrder]);

  const handleEmergencySOS = () => {
    alert('Emergency SOS activated! Your location has been shared with emergency contacts and support team.');
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅';
    if (hour < 17) return '☀️';
    return '🌙';
  };

  return (
    <div className={`p-4 ${themeClasses.bg} min-h-screen transition-colors duration-300`}>
      {/* Header */}
      <div className={`${themeClasses.cardBg} border-2 ${themeClasses.border} rounded-xl p-6 mb-6 shadow-sm transition-colors duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold flex items-center gap-2 ${themeClasses.text}`}>
              {getTimeGreeting()} {greeting}
            </h1>
            <p className={`${themeClasses.textSecondary} mt-1`}>{partner.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="text-right">
              <p className={`${themeClasses.textSecondary} text-sm`}>Today's Earnings</p>
              <p className="text-2xl font-bold text-green-600">₹{todayEarnings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Banner */}
      <div className={`border-2 rounded-xl p-4 mb-6 transition-all duration-1000 shadow-sm ${
        currentBannerIndex === 2 
          ? isDarkMode 
            ? 'bg-gradient-to-r from-orange-900 to-yellow-900 border-orange-600 animate-pulse' 
            : 'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300 animate-pulse'
          : `${themeClasses.cardBg} ${themeClasses.border}`
      }`}>
        <div className="text-center">
          <div className="text-3xl mb-2">{motivationalBanners[currentBannerIndex].emoji}</div>
          <p className={`font-bold text-base leading-relaxed ${
            currentBannerIndex === 2 
              ? isDarkMode ? 'text-orange-300 text-lg' : 'text-orange-700 text-lg'
              : isDarkMode ? 'text-gray-200' : motivationalBanners[currentBannerIndex].textColor
          }`}>
            {motivationalBanners[currentBannerIndex].text}
          </p>
          {currentBannerIndex === 2 && (
            <div className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-full inline-block font-bold text-sm">
              🎯 आजचं टार्गेट: 5 ऑर्डर = बोनस!
            </div>
          )}
        </div>
        <div className="flex justify-center mt-3 space-x-1">
          {motivationalBanners.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentBannerIndex ? 'bg-orange-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Online Status */}
        <div className={`${themeClasses.cardBg} rounded-xl p-4 shadow-sm transition-colors duration-300`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className={`font-semibold ${themeClasses.text}`}>
                {isOnline ? t('youAreOnline') : t('youAreOffline')}
              </span>
            </div>
            <button
              onClick={() => {
                if (!isOnline) {
                  setShowSelfieModal(true);
                } else {
                  setIsOnline(false);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                isOnline 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
            >
              <Power size={14} />
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </div>

        {/* App Settings Status */}
        <div className={`${themeClasses.cardBg} rounded-xl p-4 shadow-sm transition-colors duration-300`}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${themeClasses.textSecondary}`}>Language</span>
              <span className={`text-sm font-medium ${themeClasses.text}`}>
                {selectedLanguage === 'en' ? '🇺🇸 English' : 
                 selectedLanguage === 'hi' ? '🇮🇳 हिंदी' : 
                 selectedLanguage === 'mr' ? '🇮🇳 मराठी' : '🇺🇸 English'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${themeClasses.textSecondary}`}>Battery</span>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-3 border rounded-sm ${themeClasses.border} relative`}>
                  <div 
                    className={`h-full rounded-sm transition-all ${
                      batteryLevel > 50 ? 'bg-green-500' : 
                      batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${batteryLevel}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${themeClasses.text}`}>{batteryLevel}%</span>
                {powerSaveMode && <span className="text-xs bg-orange-100 text-orange-700 px-1 rounded">⚡</span>}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${themeClasses.textSecondary}`}>Mode</span>
              <span className={`text-sm font-medium ${themeClasses.text}`}>
                {isOfflineMode ? '📱 Offline' : '🌐 Online'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency SOS */}
      <div className={`${isDarkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'} border rounded-xl p-4 mb-6 transition-colors duration-300`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-red-600" size={24} />
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>{t('emergency')}</h3>
              <p className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} text-sm`}>Press for immediate help</p>
            </div>
          </div>
          <button
            onClick={handleEmergencySOS}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            SOS
          </button>
        </div>
      </div>

      {/* Pending Order Alert */}
      {pendingOrder && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-blue-600" size={20} />
              <h3 className="font-bold text-blue-800">{t('newOrder')}</h3>
            </div>
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {orderTimer}s
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700">{pendingOrder.pickupAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700">{pendingOrder.deliveryAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700">{pendingOrder.estimatedTime}</span>
            </div>
            <div className="font-semibold text-lg">₹{pendingOrder.orderValue}</div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => acceptOrder(pendingOrder.id)}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {t('acceptOrder')}
            </button>
            <button
              onClick={rejectOrder}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              {t('rejectOrder')}
            </button>
          </div>
        </div>
      )}

      {/* Settings Status Bar */}
      {(powerSaveMode || isOfflineMode) && (
        <div className={`${themeClasses.cardBg} rounded-xl p-3 mb-4 shadow-sm transition-colors duration-300`}>
          <div className="flex items-center justify-center gap-4 text-sm">
            {powerSaveMode && (
              <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                <span>⚡</span>
                <span>Power Save Mode Active</span>
              </div>
            )}
            {isOfflineMode && (
              <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <span>📱</span>
                <span>Offline Mode Enabled</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`${themeClasses.cardBg} rounded-xl p-4 shadow-sm transition-colors duration-300`}>
          <div className="flex items-center gap-3">
            <div className={`${isDarkMode ? 'bg-green-800' : 'bg-green-100'} p-2 rounded-lg`}>
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <div>
              <p className={`${themeClasses.textSecondary} text-sm`}>Today's Orders</p>
              <p className={`font-bold text-lg ${themeClasses.text}`}>{orderHistory.length + (pendingOrder ? 1 : 0)}</p>
            </div>
          </div>
        </div>
        
        <div className={`${themeClasses.cardBg} rounded-xl p-4 shadow-sm transition-colors duration-300`}>
          <div className="flex items-center gap-3">
            <div className={`${isDarkMode ? 'bg-blue-800' : 'bg-blue-100'} p-2 rounded-lg`}>
              <Clock className="text-blue-600" size={20} />
            </div>
            <div>
              <p className={`${themeClasses.textSecondary} text-sm`}>Total Deliveries</p>
              <p className={`font-bold text-lg ${themeClasses.text}`}>{partner.totalDeliveries}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance & Ratings */}
      <PerformanceRatings />

      {/* Selfie Verification Modal */}
      {showSelfieModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.cardBg} rounded-xl w-full max-w-md p-6 transition-colors duration-300`}>
            <h3 className={`text-lg font-bold mb-4 ${themeClasses.text}`}>Verify Your Identity</h3>
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-8 text-center mb-4 transition-colors duration-300`}>
              <Camera className={`w-16 h-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} mx-auto mb-2`} />
              <p className={themeClasses.textSecondary}>Take a selfie to verify it's you</p>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setShowSelfieModal(false);
                  setIsOnline(true);
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg"
              >
                Capture Selfie
              </button>
              <button 
                onClick={() => setShowSelfieModal(false)}
                className={`w-full ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'} py-3 rounded-lg transition-colors duration-300`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Rating Modal */}
      <CustomerRatingModal />
    </div>
  );
}