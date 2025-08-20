import React, { useState, useEffect } from 'react';
import { Flashlight as FlashlightIcon, ArrowLeft, Zap, Sun, Moon } from 'lucide-react';

interface FlashlightProps {
  onClose: () => void;
}

export default function Flashlight({ onClose }: FlashlightProps) {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [strobeMode, setStrobeMode] = useState(false);
  const [sosMode, setSosMode] = useState(false);
  const [batteryLevel] = useState(85);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (strobeMode && isOn) {
      interval = setInterval(() => {
        setIsOn(prev => !prev);
      }, 200);
    } else if (sosMode && isOn) {
      // SOS pattern: ... --- ... (3 short, 3 long, 3 short)
      const sosPattern = [200, 200, 200, 200, 200, 200, 600, 200, 600, 200, 600, 200, 200, 200, 200, 200, 200, 1000];
      let patternIndex = 0;
      
      interval = setInterval(() => {
        setIsOn(prev => !prev);
        patternIndex = (patternIndex + 1) % sosPattern.length;
      }, sosPattern[patternIndex] || 200);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [strobeMode, sosMode, isOn]);

  const toggleFlashlight = () => {
    setIsOn(!isOn);
    setStrobeMode(false);
    setSosMode(false);
  };

  const toggleStrobe = () => {
    setStrobeMode(!strobeMode);
    setSosMode(false);
    if (!strobeMode) setIsOn(true);
  };

  const toggleSOS = () => {
    setSosMode(!sosMode);
    setStrobeMode(false);
    if (!sosMode) setIsOn(true);
  };

  const getBrightnessColor = () => {
    if (brightness > 75) return 'from-yellow-300 to-yellow-500';
    if (brightness > 50) return 'from-yellow-200 to-yellow-400';
    if (brightness > 25) return 'from-yellow-100 to-yellow-300';
    return 'from-gray-200 to-gray-300';
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: isOn ? '#1a1a1a' : '#f9fafb' }}>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onClose}
          className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
            isOn ? 'text-white hover:bg-gray-800' : 'text-gray-600'
          }`}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <FlashlightIcon className={isOn ? 'text-yellow-400' : 'text-yellow-600'} size={24} />
          <h2 className={`text-xl font-bold ${isOn ? 'text-white' : 'text-gray-800'}`}>
            Flashlight
          </h2>
        </div>
      </div>

      {/* Main Flashlight Display */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-6">
          {/* Flashlight Beam Effect */}
          {isOn && (
            <div 
              className={`absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-radial ${getBrightnessColor()} rounded-full opacity-80 animate-pulse`}
              style={{ 
                opacity: brightness / 100,
                filter: 'blur(20px)',
                transform: 'translateX(-50%) scale(2)'
              }}
            />
          )}
          
          {/* Flashlight Icon */}
          <div 
            className={`w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
              isOn 
                ? `bg-gradient-to-br ${getBrightnessColor()} border-yellow-400 shadow-2xl` 
                : 'bg-gray-200 border-gray-300'
            }`}
            style={{
              boxShadow: isOn ? `0 0 ${brightness}px rgba(255, 255, 0, 0.5)` : 'none'
            }}
          >
            <FlashlightIcon 
              size={64} 
              className={isOn ? 'text-yellow-800' : 'text-gray-600'} 
            />
          </div>
        </div>

        {/* Status */}
        <div className="text-center mb-6">
          <h3 className={`text-2xl font-bold mb-2 ${isOn ? 'text-white' : 'text-gray-800'}`}>
            {isOn ? 'ON' : 'OFF'}
          </h3>
          {sosMode && (
            <p className="text-red-400 font-semibold animate-pulse">SOS MODE ACTIVE</p>
          )}
          {strobeMode && (
            <p className="text-blue-400 font-semibold animate-pulse">STROBE MODE</p>
          )}
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={toggleFlashlight}
          className={`w-24 h-24 rounded-full font-bold text-xl transition-all duration-300 ${
            isOn
              ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg'
              : 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
          }`}
        >
          {isOn ? 'OFF' : 'ON'}
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Brightness Control */}
        <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 ${
          isOn ? 'border border-gray-600' : 'border border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <Sun className={isOn ? 'text-white' : 'text-gray-600'} size={20} />
            <span className={`font-semibold ${isOn ? 'text-white' : 'text-gray-800'}`}>
              Brightness: {brightness}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
            disabled={!isOn}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Mode Controls */}
        <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 ${
          isOn ? 'border border-gray-600' : 'border border-gray-200'
        }`}>
          <h3 className={`font-semibold mb-3 ${isOn ? 'text-white' : 'text-gray-800'}`}>
            Special Modes
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={toggleStrobe}
              className={`p-3 rounded-lg font-semibold transition-colors ${
                strobeMode
                  ? 'bg-blue-600 text-white'
                  : isOn
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <Zap size={16} className="inline mr-2" />
              Strobe
            </button>
            
            <button
              onClick={toggleSOS}
              className={`p-3 rounded-lg font-semibold transition-colors ${
                sosMode
                  ? 'bg-red-600 text-white'
                  : isOn
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              🆘 SOS
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 ${
          isOn ? 'border border-gray-600' : 'border border-gray-200'
        }`}>
          <h3 className={`font-semibold mb-3 ${isOn ? 'text-white' : 'text-gray-800'}`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setBrightness(25);
                alert('🔅 Brightness set to Low (25%)');
              }}
              className={`p-2 rounded text-sm font-medium transition-colors ${
                isOn
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Low
            </button>
            <button
              onClick={() => {
                setBrightness(50);
                alert('🔆 Brightness set to Medium (50%)');
              }}
              className={`p-2 rounded text-sm font-medium transition-colors ${
                isOn
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => {
                setBrightness(100);
                alert('🔆 Brightness set to High (100%)');
              }}
              className={`p-2 rounded text-sm font-medium transition-colors ${
                isOn
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              High
            </button>
          </div>
        </div>

        {/* Battery Status */}
        <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 ${
          isOn ? 'border border-gray-600' : 'border border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`font-semibold ${isOn ? 'text-white' : 'text-gray-800'}`}>
              Phone Battery
            </span>
            <span className={`font-bold ${
              batteryLevel > 50 ? 'text-green-500' : 
              batteryLevel > 20 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {batteryLevel}%
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                batteryLevel > 50 ? 'bg-green-500' : 
                batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${batteryLevel}%` }}
            ></div>
          </div>
          {batteryLevel < 20 && (
            <p className="text-red-400 text-sm mt-2">
              ⚠️ Low battery! Flashlight usage will drain battery faster.
            </p>
          )}
        </div>

        {/* Usage Tips */}
        <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 ${
          isOn ? 'border border-gray-600' : 'border border-gray-200'
        }`}>
          <h3 className={`font-semibold mb-2 ${isOn ? 'text-white' : 'text-gray-800'}`}>
            💡 Usage Tips
          </h3>
          <ul className={`text-sm space-y-1 ${isOn ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>• Use lower brightness to save battery</li>
            <li>• SOS mode for emergency situations</li>
            <li>• Strobe mode for visibility in traffic</li>
            <li>• Turn off when not needed to preserve battery</li>
          </ul>
        </div>

        {/* Emergency Info */}
        {sosMode && (
          <div className="bg-red-900 bg-opacity-80 border border-red-600 rounded-lg p-4">
            <h3 className="font-semibold text-red-200 mb-2">🆘 Emergency SOS Active</h3>
            <p className="text-red-300 text-sm mb-3">
              SOS signal pattern is active. This can help rescuers locate you in emergency situations.
            </p>
            <button
              onClick={() => {
                if (confirm('🆘 Call Emergency Services (112)?\nThis will make an actual emergency call.')) {
                  window.location.href = 'tel:112';
                }
              }}
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Call Emergency Services (112)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}