import React, { useState, useRef } from 'react';
import { QrCode, Camera, Upload, History, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

interface QRScannerProps {
  onClose: () => void;
}

export default function QRScanner({ onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState([
    {
      id: 1,
      data: 'ORDER-12345',
      type: 'Order ID',
      timestamp: new Date('2025-01-15 14:30'),
      action: 'Order Verified'
    },
    {
      id: 2,
      data: 'https://liquordelivery.com/verify/ABC123',
      type: 'Verification Link',
      timestamp: new Date('2025-01-15 12:15'),
      action: 'Customer Verified'
    },
    {
      id: 3,
      data: 'PAYMENT-QR-789',
      type: 'Payment QR',
      timestamp: new Date('2025-01-15 10:45'),
      action: 'Payment Received'
    }
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startScanning = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      const mockData = 'ORDER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setScannedData(mockData);
      setIsScanning(false);
      
      // Add to history
      const newScan = {
        id: scanHistory.length + 1,
        data: mockData,
        type: 'Order ID',
        timestamp: new Date(),
        action: 'Order Scanned'
      };
      setScanHistory(prev => [newScan, ...prev]);
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate QR code reading from image
      setTimeout(() => {
        const mockData = 'IMG-QR-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        setScannedData(mockData);
        
        const newScan = {
          id: scanHistory.length + 1,
          data: mockData,
          type: 'Image QR',
          timestamp: new Date(),
          action: 'QR from Image'
        };
        setScanHistory(prev => [newScan, ...prev]);
      }, 1500);
    }
  };

  const getQRType = (data: string) => {
    if (data.startsWith('ORDER-')) return { type: 'Order', color: 'bg-blue-100 text-blue-700', icon: '📦' };
    if (data.startsWith('PAYMENT-')) return { type: 'Payment', color: 'bg-green-100 text-green-700', icon: '💳' };
    if (data.startsWith('http')) return { type: 'Link', color: 'bg-purple-100 text-purple-700', icon: '🔗' };
    if (data.startsWith('IMG-')) return { type: 'Image', color: 'bg-orange-100 text-orange-700', icon: '🖼️' };
    return { type: 'Text', color: 'bg-gray-100 text-gray-700', icon: '📄' };
  };

  const handleQRAction = (data: string) => {
    const qrType = getQRType(data);
    
    if (qrType.type === 'Order') {
      alert(`Order ${data} verified successfully!`);
    } else if (qrType.type === 'Payment') {
      alert(`Payment QR processed: ${data}`);
    } else if (qrType.type === 'Link') {
      window.open(data, '_blank');
    } else {
      alert(`QR Data: ${data}`);
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
          <QrCode className="text-gray-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">QR Code Scanner</h2>
        </div>
        <div className="ml-auto">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <History size={16} />
            {showHistory ? 'Hide History' : 'View History'}
          </button>
        </div>
      </div>

      {/* Scanner Interface */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-xl p-6 text-center relative overflow-hidden">
          {isScanning ? (
            <div className="relative">
              <div className="w-64 h-64 mx-auto border-4 border-white rounded-lg relative">
                <div className="absolute inset-0 border-4 border-blue-500 rounded-lg animate-pulse"></div>
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-red-500 animate-pulse"></div>
                <Camera className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" size={48} />
              </div>
              <p className="text-white mt-4 font-medium">Scanning QR Code...</p>
              <p className="text-gray-300 text-sm">Hold steady and align QR code in the frame</p>
              <button
                onClick={() => setIsScanning(false)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Stop Scanning
              </button>
            </div>
          ) : (
            <div>
              <div className="w-64 h-64 mx-auto border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                <QrCode className="text-gray-400" size={64} />
              </div>
              <p className="text-white mt-4 font-medium">Ready to Scan</p>
              <p className="text-gray-300 text-sm mb-6">Position QR code within the frame</p>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={startScanning}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Camera size={20} />
                  Start Scanning
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Upload size={20} />
                  Upload Image
                </button>
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>

      {/* Scanned Result */}
      {scannedData && (
        <div className="mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="text-green-600" size={20} />
              <h3 className="font-semibold text-green-800">QR Code Scanned Successfully!</h3>
            </div>
            
            <div className="bg-white border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{getQRType(scannedData).icon}</span>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQRType(scannedData).color}`}>
                    {getQRType(scannedData).type}
                  </span>
                  <p className="font-mono text-sm text-gray-800 mt-1">{scannedData}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleQRAction(scannedData);
                  alert('✅ QR Code processed successfully!');
                }}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Process QR
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(scannedData);
                  alert('📋 QR data copied to clipboard!');
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Copy Data
              </button>
              <button
                onClick={() => setScannedData(null)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scan History */}
      {showHistory && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Recent Scans</h3>
          <div className="space-y-3">
            {scanHistory.map((scan) => (
              <div key={scan.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getQRType(scan.data).icon}</span>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQRType(scan.data).color}`}>
                        {scan.type}
                      </span>
                      <p className="font-mono text-sm text-gray-800 mt-1">{scan.data}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{scan.action}</p>
                    <p className="text-xs text-gray-500">
                      {scan.timestamp.toLocaleDateString()} {scan.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleQRAction(scan.data);
                      alert('✅ QR processed from history!');
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Process Again
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(scan.data);
                      alert('📋 Copied!');
                    }}
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => {
              setScannedData('ORDER-' + Math.random().toString(36).substr(2, 6).toUpperCase());
              alert('📦 Order QR scanned! Verifying order details...');
            }}
            className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span className="text-2xl">📦</span>
            <div className="text-left">
              <p className="font-medium text-blue-800">Verify Order</p>
              <p className="text-sm text-blue-600">Scan order QR code</p>
            </div>
          </button>
          
          <button 
            onClick={() => {
              setScannedData('PAYMENT-' + Math.random().toString(36).substr(2, 6).toUpperCase());
              alert('💳 Payment QR scanned! Processing payment...');
            }}
            className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <span className="text-2xl">💳</span>
            <div className="text-left">
              <p className="font-medium text-green-800">Payment QR</p>
              <p className="text-sm text-green-600">Process payment</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
            <span className="text-2xl">👤</span>
            <div className="text-left">
              <p className="font-medium text-purple-800">Customer ID</p>
              <p className="text-sm text-purple-600">Verify customer</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
            <span className="text-2xl">🏪</span>
            <div className="text-left">
              <p className="font-medium text-orange-800">Store Code</p>
              <p className="text-sm text-orange-600">Check-in at store</p>
            </div>
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-yellow-600" size={16} />
          <span className="font-semibold text-yellow-800">Scanner Tips</span>
        </div>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Ensure good lighting for better scanning</li>
          <li>• Hold phone steady and align QR code properly</li>
          <li>• Clean camera lens if scanning fails</li>
          <li>• Use upload option for damaged QR codes</li>
          <li>• Verify scanned data before processing</li>
        </ul>
      </div>
    </div>
  );
}