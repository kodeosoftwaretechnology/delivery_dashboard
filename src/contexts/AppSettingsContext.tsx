import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppSettingsContextType {
  // Language Settings
  selectedLanguage: string;
  voiceEnabled: boolean;
  autoTranslate: boolean;
  dateFormat: string;
  timeFormat: string;
  
  // Battery Settings
  batteryLevel: number;
  powerSaveMode: boolean;
  locationOptimization: boolean;
  backgroundSync: boolean;
  screenBrightness: number;
  
  // Offline Settings
  isOfflineMode: boolean;
  autoOfflineMode: boolean;
  offlineMapDownload: boolean;
  connectionStatus: string;
  
  // Update Settings
  autoUpdate: boolean;
  wifiOnlyUpdate: boolean;
  betaUpdates: boolean;
  currentVersion: string;
  
  // Update functions
  updateLanguageSettings: (settings: any) => void;
  updateBatterySettings: (settings: any) => void;
  updateOfflineSettings: (settings: any) => void;
  updateAppSettings: (settings: any) => void;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  // Language Settings
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('12');
  
  // Battery Settings
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [powerSaveMode, setPowerSaveMode] = useState(false);
  const [locationOptimization, setLocationOptimization] = useState(true);
  const [backgroundSync, setBackgroundSync] = useState(true);
  const [screenBrightness, setScreenBrightness] = useState(70);
  
  // Offline Settings
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [autoOfflineMode, setAutoOfflineMode] = useState(true);
  const [offlineMapDownload, setOfflineMapDownload] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('online');
  
  // Update Settings
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [wifiOnlyUpdate, setWifiOnlyUpdate] = useState(true);
  const [betaUpdates, setBetaUpdates] = useState(false);
  const [currentVersion] = useState('2.4.1');

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSelectedLanguage(settings.selectedLanguage || 'en');
      setVoiceEnabled(settings.voiceEnabled ?? true);
      setAutoTranslate(settings.autoTranslate ?? false);
      setPowerSaveMode(settings.powerSaveMode ?? false);
      setLocationOptimization(settings.locationOptimization ?? true);
      setIsOfflineMode(settings.isOfflineMode ?? false);
      setAutoUpdate(settings.autoUpdate ?? true);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: any) => {
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  const updateLanguageSettings = (settings: any) => {
    setSelectedLanguage(settings.selectedLanguage);
    setVoiceEnabled(settings.voiceEnabled);
    setAutoTranslate(settings.autoTranslate);
    setDateFormat(settings.dateFormat);
    setTimeFormat(settings.timeFormat);
    
    const allSettings = {
      selectedLanguage: settings.selectedLanguage,
      voiceEnabled: settings.voiceEnabled,
      autoTranslate: settings.autoTranslate,
      dateFormat: settings.dateFormat,
      timeFormat: settings.timeFormat,
      powerSaveMode,
      locationOptimization,
      isOfflineMode,
      autoUpdate
    };
    saveSettings(allSettings);
  };

  const updateBatterySettings = (settings: any) => {
    setPowerSaveMode(settings.powerSaveMode);
    setLocationOptimization(settings.locationOptimization);
    setBackgroundSync(settings.backgroundSync);
    setScreenBrightness(settings.screenBrightness);
    
    const allSettings = {
      selectedLanguage,
      voiceEnabled,
      autoTranslate,
      powerSaveMode: settings.powerSaveMode,
      locationOptimization: settings.locationOptimization,
      backgroundSync: settings.backgroundSync,
      screenBrightness: settings.screenBrightness,
      isOfflineMode,
      autoUpdate
    };
    saveSettings(allSettings);
  };

  const updateOfflineSettings = (settings: any) => {
    setIsOfflineMode(settings.isOfflineMode);
    setAutoOfflineMode(settings.autoOfflineMode);
    setOfflineMapDownload(settings.offlineMapDownload);
    setConnectionStatus(settings.connectionStatus);
    
    const allSettings = {
      selectedLanguage,
      voiceEnabled,
      autoTranslate,
      powerSaveMode,
      locationOptimization,
      isOfflineMode: settings.isOfflineMode,
      autoOfflineMode: settings.autoOfflineMode,
      offlineMapDownload: settings.offlineMapDownload,
      autoUpdate
    };
    saveSettings(allSettings);
  };

  const updateAppSettings = (settings: any) => {
    setAutoUpdate(settings.autoUpdate);
    setWifiOnlyUpdate(settings.wifiOnlyUpdate);
    setBetaUpdates(settings.betaUpdates);
    
    const allSettings = {
      selectedLanguage,
      voiceEnabled,
      autoTranslate,
      powerSaveMode,
      locationOptimization,
      isOfflineMode,
      autoUpdate: settings.autoUpdate,
      wifiOnlyUpdate: settings.wifiOnlyUpdate,
      betaUpdates: settings.betaUpdates
    };
    saveSettings(allSettings);
  };

  return (
    <AppSettingsContext.Provider value={{
      selectedLanguage,
      voiceEnabled,
      autoTranslate,
      dateFormat,
      timeFormat,
      batteryLevel,
      powerSaveMode,
      locationOptimization,
      backgroundSync,
      screenBrightness,
      isOfflineMode,
      autoOfflineMode,
      offlineMapDownload,
      connectionStatus,
      autoUpdate,
      wifiOnlyUpdate,
      betaUpdates,
      currentVersion,
      updateLanguageSettings,
      updateBatterySettings,
      updateOfflineSettings,
      updateAppSettings
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
}