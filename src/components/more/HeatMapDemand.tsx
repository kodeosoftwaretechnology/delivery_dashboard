import React, { useState, useEffect } from 'react';
import { Map, MapPin, TrendingUp, Clock, Zap, ArrowLeft, Navigation, Target } from 'lucide-react';

interface HeatMapDemandProps {
  onClose: () => void;
}

export default function HeatMapDemand({ onClose }: HeatMapDemandProps) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [currentTime] = useState(new Date());
  const [liveUpdates, setLiveUpdates] = useState(true);

  const demandZones = [
    {
      id: 'koregaon',
      name: 'Koregaon Park',
      demand: 'very-high',
      avgEarning: 120,
      surge: 2.0,
      orders: 45,
      distance: 2.3,
      coordinates: { lat: 18.5362, lng: 73.8958 },
      peakHours: '7-11 PM',
      tips: 'High-end customers, good tips expected'
    },
    {
      id: 'baner',
      name: 'Baner',
      demand: 'high',
      avgEarning: 95,
      surge: 1.5,
      orders: 32,
      distance: 4.1,
      coordinates: { lat: 18.5679, lng: 73.7797 },
      peakHours: '6-10 PM',
      tips: 'IT professionals, weekend demand high'
    },
    {
      id: 'wakad',
      name: 'Wakad',
      demand: 'medium',
      avgEarning: 80,
      surge: 1.2,
      orders: 18,
      distance: 6.2,
      coordinates: { lat: 18.5975, lng: 73.7898 },
      peakHours: '8-10 PM',
      tips: 'Residential area, consistent orders'
    },
    {
      id: 'hadapsar',
      name: 'Hadapsar',
      demand: 'low',
      avgEarning: 65,
      surge: 1.0,
      orders: 12,
      distance: 8.5,
      coordinates: { lat: 18.5089, lng: 73.9260 },
      peakHours: '7-9 PM',
      tips: 'Lower demand but less competition'
    },
    {
      id: 'viman-nagar',
      name: 'Viman Nagar',
      demand: 'high',
      avgEarning: 110,
      surge: 1.8,
      orders: 28,
      distance: 3.7,
      coordinates: { lat: 18.5679, lng: 73.9143 },
      peakHours: '6-11 PM',
      tips: 'Airport proximity, premium orders'
    }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'very-high': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDemandText = (demand: string) => {
    switch (demand) {
      case 'very-high': return 'Very High';
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Unknown';
    }
  };

  const getDemandBg = (demand: string) => {
    switch (demand) {
      case 'very-high': return 'bg-red-50 border-red-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const bestZone = demandZones.reduce((best, zone) => 
    zone.avgEarning > best.avgEarning ? zone : best
  );

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
          <Map className="text-red-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Heat Map & Demand Zones</h2>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${liveUpdates ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-600">Live Updates</span>
        </div>
      </div>

      {/* Heat Map Visualization */}
      <div className="bg-gray-100 rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Pune Delivery Heat Map</h3>
          <p className="text-sm text-gray-600">Real-time demand visualization</p>
        </div>
        
        {/* Simulated Map */}
        <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-gray-200">
          {demandZones.map((zone, index) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
              className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all hover:scale-110 ${getDemandColor(zone.demand)}`}
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 20}%`
              }}
            >
              <div className="w-full h-full rounded-full animate-ping opacity-75"></div>
            </button>
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-white rounded-lg p-2 shadow-sm">
            <div className="text-xs font-medium text-gray-700 mb-1">Demand Level</div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs">Very High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs">High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs">Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs">Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Opportunity Alert */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Target className="text-green-600" size={16} />
          <span className="font-semibold text-green-800">🎯 Best Opportunity Right Now</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-green-800">{bestZone.name}</p>
            <p className="text-sm text-green-700">₹{bestZone.avgEarning} avg/delivery • {bestZone.distance}km away</p>
          </div>
          <button 
            onClick={() => {
              alert(`🧭 Navigating to ${bestZone.name}...\n📍 Distance: ${bestZone.distance}km\n💰 Expected earnings: ₹${bestZone.avgEarning}`);
              window.open(`https://maps.google.com/?q=${bestZone.name}, Pune`, '_blank');
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Navigate
          </button>
        </div>
      </div>

      {/* Demand Zones List */}
      <div className="space-y-3 mb-6">
        {demandZones.map((zone) => (
          <div
            key={zone.id}
            className={`border rounded-lg p-4 transition-all cursor-pointer ${
              selectedZone === zone.id 
                ? 'border-blue-500 bg-blue-50' 
                : `${getDemandBg(zone.demand)} hover:shadow-md`
            }`}
            onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${getDemandColor(zone.demand)}`}></div>
                <h4 className="font-semibold text-gray-800">{zone.name}</h4>
                {zone.surge > 1.0 && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                    🔥 {zone.surge}x Surge
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-800">₹{zone.avgEarning}</p>
                <p className="text-sm text-gray-600">avg/delivery</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Demand</p>
                <p className="font-medium">{getDemandText(zone.demand)}</p>
              </div>
              <div>
                <p className="text-gray-600">Active Orders</p>
                <p className="font-medium">{zone.orders}</p>
              </div>
              <div>
                <p className="text-gray-600">Distance</p>
                <p className="font-medium">{zone.distance}km</p>
              </div>
            </div>

            {selectedZone === zone.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-600">Peak Hours</p>
                    <p className="font-medium">{zone.peakHours}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pro Tip</p>
                    <p className="font-medium text-blue-700">{zone.tips}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      alert(`🧭 Starting navigation to ${zone.name}...`);
                      window.open(`https://maps.google.com/?q=${zone.name}, Pune`, '_blank');
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Navigation size={16} className="inline mr-1" />
                    Navigate Here
                  </button>
                  <button 
                    onClick={() => {
                      alert(`🔔 Alert set for ${zone.name}!\nYou'll be notified when demand increases.`);
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Set Alert
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Smart Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-3">💡 Smart Recommendations</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} />
            <span>Move to {bestZone.name} for 25% higher earnings</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>Peak demand starts in 2 hours (7 PM)</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={14} />
            <span>Weekend surge expected in Baner area</span>
          </div>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{demandZones.reduce((sum, zone) => sum + zone.orders, 0)}</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-600">₹{Math.round(demandZones.reduce((sum, zone) => sum + zone.avgEarning, 0) / demandZones.length)}</div>
          <div className="text-sm text-gray-600">Avg Earning</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-600">{demandZones.filter(z => z.surge > 1.0).length}</div>
          <div className="text-sm text-gray-600">Surge Zones</div>
        </div>
      </div>
    </div>
  );
}