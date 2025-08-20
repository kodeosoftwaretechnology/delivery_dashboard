import React, { useState } from 'react';
import { Download, Smartphone, CheckCircle, Clock, AlertTriangle, ArrowLeft, RefreshCw, Zap } from 'lucide-react';
import { useAppSettings } from '../../contexts/AppSettingsContext';

interface AppUpdatesProps {
  onClose: () => void;
}

export default function AppUpdates({ onClose }: AppUpdatesProps) {
  const { autoUpdate: contextAuto, wifiOnlyUpdate: contextWifi, betaUpdates: contextBeta, currentVersion, updateAppSettings } = useAppSettings();
  const [autoUpdate, setAutoUpdate] = useState(contextAuto);
  const [wifiOnlyUpdate, setWifiOnlyUpdate] = useState(contextWifi);
  const [betaUpdates, setBetaUpdates] = useState(contextBeta);
  const [latestVersion] = useState('2.5.0');
  const [updateAvailable] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const updateHistory = [
    {
      version: '2.5.0',
      date: '2025-01-15',
      status: 'available',
      size: '25 MB',
      features: [
        'Enhanced battery optimization',
        'Improved offline mode',
        'New language support',
        'Bug fixes and performance improvements'
      ],
      critical: false
    },
    {
      version: '2.4.1',
      date: '2025-01-01',
      status: 'installed',
      size: '18 MB',
      features: [
        'Fixed GPS accuracy issues',
        'Improved order sync',
        'Security updates'
      ],
      critical: true
    },
    {
      version: '2.4.0',
      date: '2024-12-15',
      status: 'installed',
      size: '32 MB',
      features: [
        'New heat map feature',
        'Enhanced safety center',
        'Performance improvements'
      ],
      critical: false
    }
  ];

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Download className="text-blue-600" size={16} />;
      case 'installed':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'downloading':
        return <RefreshCw className="text-orange-600 animate-spin" size={16} />;
      default:
        return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-blue-100 text-blue-700';
      case 'installed':
        return 'bg-green-100 text-green-700';
      case 'downloading':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
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
          <Download className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">App Updates</h2>
        </div>
      </div>

      {/* Current Version Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Current Version</h3>
          <div className="flex items-center gap-2">
            <Smartphone className="text-gray-600" size={16} />
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">v{currentVersion}</span>
          </div>
        </div>
        
        {updateAvailable ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Download className="text-blue-600" size={16} />
              <span className="font-semibold text-blue-800">Update Available!</span>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              Version {latestVersion} is ready to download with new features and improvements.
            </p>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isDownloading ? 'Downloading...' : 'Download Update'}
            </button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={16} />
              <span className="font-semibold text-green-800">You're up to date!</span>
            </div>
            <p className="text-sm text-green-700">
              You have the latest version of the app.
            </p>
          </div>
        )}

        {isDownloading && (
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Downloading update...</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Update Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Update Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="text-green-600" size={20} />
              <div>
                <p className="font-medium text-gray-800">Auto Update</p>
                <p className="text-sm text-gray-600">Download updates automatically</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-gray-800">WiFi Only Updates</p>
                <p className="text-sm text-gray-600">Download only on WiFi to save data</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={wifiOnlyUpdate}
                onChange={(e) => setWifiOnlyUpdate(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="text-orange-600" size={20} />
              <div>
                <p className="font-medium text-gray-800">Beta Updates</p>
                <p className="text-sm text-gray-600">Get early access to new features</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={betaUpdates}
                onChange={(e) => setBetaUpdates(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Update History */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Update History</h3>
        <div className="space-y-3">
          {updateHistory.map((update, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(update.status)}
                  <div>
                    <h4 className="font-medium text-gray-800">Version {update.version}</h4>
                    <p className="text-sm text-gray-600">{update.date} • {update.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {update.critical && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                      Critical
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(update.status)}`}>
                    {update.status === 'available' ? 'Available' : 
                     update.status === 'installed' ? 'Installed' : 'Downloading'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">What's New:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {update.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {update.status === 'available' && (
                <button
                  onClick={handleDownload}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Download Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Update Benefits */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-green-800 mb-2">🚀 Why Keep Your App Updated?</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Get the latest features and improvements</li>
          <li>• Enhanced security and bug fixes</li>
          <li>• Better battery optimization</li>
          <li>• Improved delivery experience</li>
          <li>• Access to new earning opportunities</li>
        </ul>
      </div>

      {/* Critical Update Warning */}
      {updateAvailable && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-orange-600" size={16} />
            <span className="font-semibold text-orange-800">Important Update</span>
          </div>
          <p className="text-sm text-orange-700 mb-3">
            This update includes important security fixes and performance improvements for delivery partners.
          </p>
          <button
            onClick={handleDownload}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors"
          >
            Update Now
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            updateAppSettings({
              autoUpdate,
              wifiOnlyUpdate,
              betaUpdates
            });
            onClose();
          }}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Save Settings
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