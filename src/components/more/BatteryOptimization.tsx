import React, { useState, useEffect } from 'react';
import { Battery, Zap, Smartphone, Wifi, MapPin, ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAppSettings } from '../../contexts/AppSettingsContext';

interface BatteryOptimizationProps {
  onClose: () => void;
}

export default function BatteryOptimization({ onClose }: BatteryOptimizationProps) {
  const { batteryLevel, powerSaveMode: contextPowerSave, locationOptimization: contextLocation, backgroundSync: contextSync, screenBrightness: contextBrightness, updateBatterySettings } = useAppSettings();
  const [powerSaveMode, setPowerSaveMode] = useState(contextPowerSave);
  const [locationOptimization, setLocationOptimization] = useState(contextLocation);
  const [backgroundSync, setBackgroundSync] = useState(contextSync);
  const [screenBrightness, setScreenBrightness] = useState(contextBrightness);
  const [autoSleep, setAutoSleep] = useState(30);

  const batteryTips = [
    {
      icon: MapPin,
      title: 'Location Services',
      description: 'Use GPS only when needed for deliveries',
      enabled: locationOptimization,
      toggle: () => setLocationOptimization(!locationOptimization),
      impact: 'High'
    },
    {
      icon: Wifi,
      title: 'Background Data',
      description: 'Limit background app refresh',
      enabled: backgroundSync,
      toggle: () => setBackgroundSync(!backgroundSync),
      impact: 'Medium'
    },
    {
      icon: Smartphone,
      title: 'Screen Brightness',
      description: 'Auto-adjust based on ambient light',
      enabled: screenBrightness < 80,
      toggle: () => setScreenBrightness(screenBrightness < 80 ? 90 : 60),
      impact: 'Medium'
    }
  ];

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBatteryBgColor = (level: number) => {
    if (level > 50) return 'bg-green-100';
    if (level > 20) return 'bg-yellow-100';
    return 'bg-red-100';
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
          <Battery className="text-green-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Battery Optimization</h2>
        </div>
      </div>

      {/* Current Battery Status */}
      <div className={`${getBatteryBgColor(batteryLevel)} border border-gray-200 rounded-lg p-4 mb-6`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Current Battery Status</h3>
          <div className="flex items-center gap-2">
            <Battery className={`${getBatteryColor(batteryLevel)}`} size={20} />
            <span className={`font-bold ${getBatteryColor(batteryLevel)}`}>{batteryLevel}%</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              batteryLevel > 50 ? 'bg-green-500' : 
              batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${batteryLevel}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Estimated time: {Math.floor(batteryLevel / 10)} hours</span>
          <span>Charging: {batteryLevel < 100 ? 'Not connected' : 'Full'}</span>
        </div>
      </div>

      {/* Power Save Mode */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Zap className="text-orange-600" size={20} />
            <div>
              <h3 className="font-semibold text-gray-800">Power Save Mode</h3>
              <p className="text-sm text-gray-600">Extends battery life during deliveries</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={powerSaveMode}
              onChange={(e) => setPowerSaveMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
          </label>
        </div>
        
        {powerSaveMode && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-700">
              ⚡ Power save mode active: Reduced background activity, dimmed screen, limited location updates
            </p>
          </div>
        )}
      </div>

      {/* Battery Optimization Tips */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Optimization Settings</h3>
        <div className="space-y-3">
          {batteryTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Icon className="text-blue-600" size={20} />
                    <div>
                      <h4 className="font-medium text-gray-800">{tip.title}</h4>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tip.impact === 'High' ? 'bg-red-100 text-red-700' :
                      tip.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {tip.impact} Impact
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tip.enabled}
                        onChange={tip.toggle}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Advanced Settings</h3>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Screen Brightness: {screenBrightness}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={screenBrightness}
              onChange={(e) => setScreenBrightness(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Dim</span>
              <span>Bright</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto Sleep Timer: {autoSleep} seconds
            </label>
            <select
              value={autoSleep}
              onChange={(e) => setAutoSleep(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={15}>15 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={120}>2 minutes</option>
              <option value={300}>5 minutes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Battery Health Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">🔋 Battery Health Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Keep battery between 20-80% for optimal health</li>
          <li>• Avoid extreme temperatures while charging</li>
          <li>• Use original charger when possible</li>
          <li>• Close unused apps running in background</li>
          <li>• Enable power save mode during long shifts</li>
        </ul>
      </div>

      {/* Battery Warning */}
      {batteryLevel < 20 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-red-600" size={16} />
            <span className="font-semibold text-red-800">Low Battery Warning</span>
          </div>
          <p className="text-sm text-red-700 mb-3">
            Your battery is running low. Consider enabling power save mode or finding a charging point.
          </p>
          <button
            onClick={() => setPowerSaveMode(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Enable Power Save Mode
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            updateBatterySettings({
              powerSaveMode,
              locationOptimization,
              backgroundSync,
              screenBrightness
            });
            onClose();
          }}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Apply Settings
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