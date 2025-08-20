import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    orders: 'Orders',
    earnings: 'Earnings',
    shifts: 'Shifts',
    notifications: 'Notifications',
    more: 'More',
    
    // Dashboard
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    youAreOnline: 'You are Online',
    youAreOffline: 'You are Offline',
    goOnline: 'Go Online',
    goOffline: 'Go Offline',
    todayEarnings: "Today's Earnings",
    newOrder: 'New Order Available!',
    acceptOrder: 'Accept Order',
    rejectOrder: 'Reject Order',
    emergency: 'Emergency SOS',
    
    // Orders
    activeOrders: 'Active Orders',
    orderHistory: 'Order History',
    pickupAddress: 'Pickup Address',
    deliveryAddress: 'Delivery Address',
    customerName: 'Customer',
    orderValue: 'Order Value',
    navigate: 'Navigate',
    callCustomer: 'Call Customer',
    markPickedUp: 'Mark Picked Up',
    markDelivered: 'Mark Delivered',
    
    // Earnings
    weeklyEarnings: 'Weekly Earnings',
    dailyView: 'Daily View',
    weeklyView: 'Weekly View',
    totalEarnings: 'Total Earnings',
    incentives: 'Incentives',
    rateCard: 'Rate Card',
    payoutHistory: 'Payout History',
    
    // Shifts
    myShifts: 'My Shifts',
    availableShifts: 'Available Shifts',
    bookShift: 'Book Shift',
    shiftBooked: 'Shift Booked',
    performance: 'Performance',
    
    // More
    profile: 'Profile',
    referEarn: 'Refer & Earn',
    helpCenter: 'Help Center',
    trackKit: 'Track Kit',
    specialBenefits: 'Special Benefits',
    settings: 'Settings',
    logout: 'Logout',
    
    // Additional Features
    takeSelfie: 'Take Selfie',
    selfieVerification: 'Selfie Verification',
    documentsKyc: 'Documents & KYC',
    liquorDelivery: 'Liquor Delivery',
    ageVerification: 'Age Verification',
    reportIssue: 'Report Issue',
    contactSupport: 'Contact Support',
    heatMapDemand: 'Heat Map & Demand',
    trainingCenter: 'Training Center',
    referralProgram: 'Referral Program',
    deliveryTools: 'Delivery Tools',
    emergencySupport: 'Emergency Support',
    performanceMetrics: 'Performance Metrics',
    incentiveCalculator: 'Incentive Calculator',
    routeOptimizer: 'Route Optimizer',
    batteryOptimization: 'Battery Optimization',
    offlineMode: 'Offline Mode',
    appUpdates: 'App Updates',
    
    // Settings
    language: 'Language',
    changeLanguage: 'Change Language',
    
    // Safety
    safetyCenter: 'Safety Center',
    shareLocation: 'Share Live Location',
    emergencyContacts: 'Emergency Contacts',
    
    // Heat Map
    heatMap: 'Heat Map',
    highDemand: 'High Demand',
    mediumDemand: 'Medium Demand',
    lowDemand: 'Low Demand',
    surgeActive: 'Surge Active'
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    orders: 'ऑर्डर',
    earnings: 'कमाई',
    shifts: 'शिफ्ट',
    notifications: 'नोटिफिकेशन',
    more: 'और',
    
    // Dashboard
    goodMorning: 'सुप्रभात',
    goodAfternoon: 'नमस्कार',
    goodEvening: 'शुभ संध्या',
    youAreOnline: 'आप ऑनलाइन हैं',
    youAreOffline: 'आप ऑफलाइन हैं',
    goOnline: 'ऑनलाइन जाएं',
    goOffline: 'ऑफलाइन जाएं',
    todayEarnings: 'आज की कमाई',
    newOrder: 'नया ऑर्डर उपलब्ध!',
    acceptOrder: 'ऑर्डर स्वीकार करें',
    rejectOrder: 'ऑर्डर अस्वीकार करें',
    emergency: 'आपातकालीन SOS',
    
    // Orders
    activeOrders: 'सक्रिय ऑर्डर',
    orderHistory: 'ऑर्डर इतिहास',
    pickupAddress: 'पिकअप पता',
    deliveryAddress: 'डिलीवरी पता',
    customerName: 'ग्राहक',
    orderValue: 'ऑर्डर मूल्य',
    navigate: 'नेविगेट करें',
    callCustomer: 'ग्राहक को कॉल करें',
    markPickedUp: 'पिक अप मार्क करें',
    markDelivered: 'डिलीवर मार्क करें',
    
    // Earnings
    weeklyEarnings: 'साप्ताहिक कमाई',
    dailyView: 'दैनिक दृश्य',
    weeklyView: 'साप्ताहिक दृश्य',
    totalEarnings: 'कुल कमाई',
    incentives: 'प्रोत्साहन',
    rateCard: 'दर कार्ड',
    payoutHistory: 'भुगतान इतिहास',
    
    // Shifts
    myShifts: 'मेरी शिफ्ट',
    availableShifts: 'उपलब्ध शिफ्ट',
    bookShift: 'शिफ्ट बुक करें',
    shiftBooked: 'शिफ्ट बुक हो गई',
    performance: 'प्रदर्शन',
    
    // More
    profile: 'प्रोफाइल',
    referEarn: 'रेफर करें और कमाएं',
    helpCenter: 'सहायता केंद्र',
    trackKit: 'किट ट्रैक करें',
    specialBenefits: 'विशेष लाभ',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
    
    // Additional Features
    takeSelfie: 'सेल्फी लें',
    selfieVerification: 'सेल्फी सत्यापन',
    documentsKyc: 'दस्तावेज और केवाईसी',
    liquorDelivery: 'शराब डिलीवरी',
    ageVerification: 'आयु सत्यापन',
    reportIssue: 'समस्या रिपोर्ट करें',
    contactSupport: 'सहायता से संपर्क करें',
    heatMapDemand: 'हीट मैप और मांग',
    trainingCenter: 'प्रशिक्षण केंद्र',
    referralProgram: 'रेफरल प्रोग्राम',
    deliveryTools: 'डिलीवरी टूल्स',
    emergencySupport: 'आपातकालीन सहायता',
    performanceMetrics: 'प्रदर्शन मेट्रिक्स',
    incentiveCalculator: 'प्रोत्साहन कैलकुलेटर',
    routeOptimizer: 'रूट ऑप्टिमाइज़र',
    batteryOptimization: 'बैटरी अनुकूलन',
    offlineMode: 'ऑफलाइन मोड',
    appUpdates: 'ऐप अपडेट',
    
    // Settings
    language: 'भाषा',
    changeLanguage: 'भाषा बदलें',
    
    // Safety
    safetyCenter: 'सुरक्षा केंद्र',
    shareLocation: 'लाइव लोकेशन साझा करें',
    emergencyContacts: 'आपातकालीन संपर्क',
    
    // Heat Map
    heatMap: 'हीट मैप',
    highDemand: 'उच्च मांग',
    mediumDemand: 'मध्यम मांग',
    lowDemand: 'कम मांग',
    surgeActive: 'सर्ज सक्रिय'
  },
  mr: {
    // Navigation
    dashboard: 'डॅशबोर्ड',
    orders: 'ऑर्डर',
    earnings: 'कमाई',
    shifts: 'शिफ्ट',
    notifications: 'सूचना',
    more: 'अधिक',
    
    // Dashboard
    goodMorning: 'सुप्रभात',
    goodAfternoon: 'नमस्कार',
    goodEvening: 'शुभ संध्या',
    youAreOnline: 'तुम्ही ऑनलाइन आहात',
    youAreOffline: 'तुम्ही ऑफलाइन आहात',
    goOnline: 'ऑनलाइन जा',
    goOffline: 'ऑफलाइन जा',
    todayEarnings: 'आजची कमाई',
    newOrder: 'नवीन ऑर्डर उपलब्ध!',
    acceptOrder: 'ऑर्डर स्वीकार करा',
    rejectOrder: 'ऑर्डर नाकारा',
    emergency: 'आपत्कालीन SOS',
    
    // Orders
    activeOrders: 'सक्रिय ऑर्डर',
    orderHistory: 'ऑर्डर इतिहास',
    pickupAddress: 'पिकअप पत्ता',
    deliveryAddress: 'डिलिव्हरी पत्ता',
    customerName: 'ग्राहक',
    orderValue: 'ऑर्डर मूल्य',
    navigate: 'नेव्हिगेट करा',
    callCustomer: 'ग्राहकाला कॉल करा',
    markPickedUp: 'पिक अप मार्क करा',
    markDelivered: 'डिलिव्हर मार्क करा',
    
    // Earnings
    weeklyEarnings: 'साप्ताहिक कमाई',
    dailyView: 'दैनिक दृश्य',
    weeklyView: 'साप्ताहिक दृश्य',
    totalEarnings: 'एकूण कमाई',
    incentives: 'प्रोत्साहन',
    rateCard: 'दर कार्ड',
    payoutHistory: 'पेआउट इतिहास',
    
    // Shifts
    myShifts: 'माझी शिफ्ट',
    availableShifts: 'उपलब्ध शिफ्ट',
    bookShift: 'शिफ्ट बुक करा',
    shiftBooked: 'शिफ्ट बुक झाली',
    performance: 'कामगिरी',
    
    // More
    profile: 'प्रोफाइल',
    referEarn: 'रेफर करा आणि कमवा',
    helpCenter: 'मदत केंद्र',
    trackKit: 'किट ट्रॅक करा',
    specialBenefits: 'विशेष फायदे',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
    
    // Additional Features
    takeSelfie: 'सेल्फी घ्या',
    selfieVerification: 'सेल्फी पडताळणी',
    documentsKyc: 'कागदपत्रे आणि केवायसी',
    liquorDelivery: 'दारू डिलिव्हरी',
    ageVerification: 'वय पडताळणी',
    reportIssue: 'समस्या नोंदवा',
    contactSupport: 'सहाय्याशी संपर्क साधा',
    heatMapDemand: 'हीट मॅप आणि मागणी',
    trainingCenter: 'प्रशिक्षण केंद्र',
    referralProgram: 'रेफरल प्रोग्राम',
    deliveryTools: 'डिलिव्हरी टूल्स',
    emergencySupport: 'आपत्कालीन सहाय्य',
    performanceMetrics: 'कामगिरी मेट्रिक्स',
    incentiveCalculator: 'प्रोत्साहन कॅल्क्युलेटर',
    routeOptimizer: 'रूट ऑप्टिमायझर',
    batteryOptimization: 'बॅटरी ऑप्टिमायझेशन',
    offlineMode: 'ऑफलाइन मोड',
    appUpdates: 'अॅप अपडेट्स',
    
    // Settings
    language: 'भाषा',
    changeLanguage: 'भाषा बदला',
    
    // Safety
    safetyCenter: 'सुरक्षा केंद्र',
    shareLocation: 'लाइव्ह लोकेशन शेअर करा',
    emergencyContacts: 'आपत्कालीन संपर्क',
    
    // Heat Map
    heatMap: 'हीट मॅप',
    highDemand: 'उच्च मागणी',
    mediumDemand: 'मध्यम मागणी',
    lowDemand: 'कमी मागणी',
    surgeActive: 'सर्ज सक्रिय'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}