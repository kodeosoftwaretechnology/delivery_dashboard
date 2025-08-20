import React, { useState } from 'react';
import { Wifi, WifiOff, Download, Upload, MapPin, Clock, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useAppSettings } from '../../contexts/AppSettingsContext';

interface OfflineModeProps {
  onClose: () => void;
}

export default function OfflineMode({ onClose }: OfflineModeProps) {
  const { isOfflineMode: contextOffline, autoOfflineMode: contextAuto, offlineMapDownload: contextMap, connectionStatus: contextConnection, updateOfflineSettings } = useAppSettings();
  const [isOfflineMode, setIsOfflineMode] = useState(contextOffline);
  const [autoOfflineMode, setAutoOfflineMode] = useState(contextAuto);
  const [offlineMapDownload, setOfflineMapDownload] = useState(contextMap);
  const [syncWhenOnline, setSyncWhenOnline] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState(contextConnection);
  const [pendingSyncItems, setPendingSyncItems] = useState(3);

  const offlineFeatures = [
    {
      icon: MapPin,
      title: 'Offline Maps',
      description: 'Download maps for your delivery area',
      status: 'Available',
      size: '45 MB',
      enabled: offlineMapDownload,
      toggle: () => setOfflineMapDownload(!offlineMapDownload)
    },
    {
      icon: Clock,
      title: 'Order Queue',
      description: 'Store orders when connection is poor',
      status: 'Active',
      size: '2 MB',
      enabled: true,
      toggle: () => {}
    },
    {
      icon: Upload,
      title: 'Auto Sync',
      description: 'Sync data when connection returns',
      status: 'Enabled',
      size: '-',
      enabled: syncWhenOnline,
      toggle: () => setSyncWhenOnline(!syncWhenOnline)
    }
  ];

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'online':
        return <Wifi className="text-green-600" size={20} />;
      case 'offline':
        return <WifiOff className="text-red-600" size={20} />;
      case 'poor':
        return <Wifi className="text-yellow-600" size={20} />;
      default:
        return <Wifi className="text-gray-600" size={20} />;
    }
  };

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'online':
        return 'bg-green-100 border-green-200';
      case 'offline':
        return 'bg-red-100 border-red-200';
      case 'poor':
        return 'bg-yellow-100 border-yellow-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'online':
        return { status: 'Connected', detail: 'Strong internet connection' };
      case 'offline':
        return { status: 'Offline', detail: 'No internet connection' };
      case 'poor':
        return { status: 'Poor Connection', detail: 'Weak internet signal' };
      default:
        return { status: 'Unknown', detail: 'Checking connection...' };
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
          <WifiOff className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Offline Mode</h2>
        </div>
      </div>

      {/* Connection Status */}
      <div className={`${getConnectionColor()} border rounded-lg p-4 mb-6`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Connection Status</h3>
          <div className="flex items-center gap-2">
            {getConnectionIcon()}
            <span className="font-medium">{getConnectionText().status}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">{getConnectionText().detail}</p>
        
        {connectionStatus === 'offline' && (
          <div className="bg-white bg-opacity-50 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-700">
              📱 Offline mode is active. Your deliveries will sync when connection returns.
            </p>
          </div>
        )}
      </div>

      {/* Offline Mode Toggle */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <WifiOff className="text-blue-600" size={20} />
            <div>
              <h3 className="font-semibold text-gray-800">Enable Offline Mode</h3>
              <p className="text-sm text-gray-600">Work without internet connection</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isOfflineMode}
              onChange={(e) => setIsOfflineMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-orange-600" size={16} />
            <div>
              <p className="font-medium text-gray-800 text-sm">Auto Offline Mode</p>
              <p className="text-xs text-gray-600">Activate when connection is poor</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoOfflineMode}
              onChange={(e) => setAutoOfflineMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
          </label>
        </div>
      </div>

      {/* Offline Features */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Offline Features</h3>
        <div className="space-y-3">
          {offlineFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Icon className="text-blue-600" size={20} />
                    <div>
                      <h4 className="font-medium text-gray-800">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{feature.size}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feature.enabled}
                        onChange={feature.toggle}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    feature.status === 'Available' ? 'bg-green-100 text-green-700' :
                    feature.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {feature.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sync Status */}
      {pendingSyncItems > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Upload className="text-yellow-600" size={16} />
            <span className="font-semibold text-yellow-800">Pending Sync</span>
          </div>
          <p className="text-sm text-yellow-700 mb-3">
            {pendingSyncItems} items waiting to sync when connection improves
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Delivery updates</span>
              <span className="text-yellow-600">2 pending</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Location data</span>
              <span className="text-yellow-600">1 pending</span>
            </div>
          </div>
          <button className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-colors">
            Retry Sync Now
          </button>
        </div>
      )}

      {/* Offline Capabilities */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">📱 What Works Offline</h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
          <div className="flex items-center gap-2">
            <CheckCircle size={14} />
            <span>View assigned orders</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} />
            <span>Update delivery status</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} />
            <span>Access offline maps</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} />
            <span>View customer details</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} />
            <span>Record delivery photos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} />
            <span>Track earnings</span>
          </div>
        </div>
      </div>

      {/* Storage Usage */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Offline Storage Usage</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Maps data</span>
            <span>45 MB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Order cache</span>
            <span>2 MB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Media files</span>
            <span>8 MB</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>55 MB</span>
            </div>
          </div>
        </div>
        <button className="mt-3 text-red-600 text-sm font-medium hover:text-red-700">
          Clear Offline Data
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            updateOfflineSettings({
              isOfflineMode,
              autoOfflineMode,
              offlineMapDownload,
              connectionStatus
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