import React, { useState } from 'react';
import { Navigation, MapPin, Clock, Fuel, TrendingUp, ArrowLeft, Route, Zap } from 'lucide-react';

interface RouteOptimizerProps {
  onClose: () => void;
}

export default function RouteOptimizer({ onClose }: RouteOptimizerProps) {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [optimizationMode, setOptimizationMode] = useState('fastest');

  const currentDeliveries = [
    {
      id: 'DEL001',
      address: 'Koregaon Park, Pune',
      customerName: 'Rajesh Sharma',
      orderValue: 1200,
      priority: 'high',
      estimatedTime: 15,
      distance: 2.3
    },
    {
      id: 'DEL002',
      address: 'Baner, Pune',
      customerName: 'Priya Patel',
      orderValue: 800,
      priority: 'medium',
      estimatedTime: 25,
      distance: 4.1
    },
    {
      id: 'DEL003',
      address: 'Wakad, Pune',
      customerName: 'Amit Kumar',
      orderValue: 1500,
      priority: 'high',
      estimatedTime: 35,
      distance: 6.2
    }
  ];

  const optimizedRoutes = [
    {
      id: 'route1',
      name: 'Fastest Route',
      totalTime: 45,
      totalDistance: 8.5,
      fuelCost: 85,
      earnings: 320,
      sequence: ['Current Location', 'Koregaon Park', 'Baner', 'Wakad'],
      savings: { time: 0, fuel: 0, earnings: 0 },
      traffic: 'moderate'
    },
    {
      id: 'route2',
      name: 'Shortest Distance',
      totalTime: 52,
      totalDistance: 7.2,
      fuelCost: 72,
      earnings: 320,
      sequence: ['Current Location', 'Baner', 'Koregaon Park', 'Wakad'],
      savings: { time: -7, fuel: 13, earnings: 0 },
      traffic: 'light'
    },
    {
      id: 'route3',
      name: 'Maximum Earnings',
      totalTime: 48,
      totalDistance: 9.1,
      fuelCost: 91,
      earnings: 350,
      sequence: ['Current Location', 'Wakad', 'Koregaon Park', 'Baner'],
      savings: { time: -3, fuel: -6, earnings: 30 },
      traffic: 'heavy'
    }
  ];

  const trafficConditions = [
    { area: 'Koregaon Park', status: 'moderate', delay: '+5 min', color: 'text-yellow-600' },
    { area: 'Baner', status: 'light', delay: '+2 min', color: 'text-green-600' },
    { area: 'Wakad', status: 'heavy', delay: '+12 min', color: 'text-red-600' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'light': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'heavy': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getBestRoute = () => {
    switch (optimizationMode) {
      case 'fastest': return optimizedRoutes[0];
      case 'shortest': return optimizedRoutes[1];
      case 'earnings': return optimizedRoutes[2];
      default: return optimizedRoutes[0];
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
          <Navigation className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Route Optimizer</h2>
        </div>
      </div>

      {/* Current Deliveries */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Pending Deliveries ({currentDeliveries.length})</h3>
        <div className="space-y-3">
          {currentDeliveries.map((delivery, index) => (
            <div key={delivery.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{delivery.customerName}</h4>
                    <p className="text-sm text-gray-600">{delivery.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(delivery.priority)}`}>
                    {delivery.priority.toUpperCase()}
                  </span>
                  <p className="text-sm font-bold text-gray-800 mt-1">₹{delivery.orderValue}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{delivery.estimatedTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{delivery.distance} km</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Mode */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Optimization Mode</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'fastest', name: 'Fastest', icon: '⚡', desc: 'Minimize time' },
            { id: 'shortest', name: 'Shortest', icon: '📏', desc: 'Minimize distance' },
            { id: 'earnings', name: 'Max Earnings', icon: '💰', desc: 'Maximize profit' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setOptimizationMode(mode.id)}
              className={`p-3 rounded-lg border-2 transition-colors ${
                optimizationMode === mode.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{mode.icon}</div>
                <div className="font-medium text-gray-800">{mode.name}</div>
                <div className="text-xs text-gray-600">{mode.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Route */}
      <div className="mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-green-600" size={20} />
            <h3 className="font-semibold text-green-800">🎯 Recommended Route</h3>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getBestRoute().totalTime}m</div>
              <div className="text-sm text-green-700">Total Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getBestRoute().totalDistance}km</div>
              <div className="text-sm text-green-700">Distance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹{getBestRoute().fuelCost}</div>
              <div className="text-sm text-green-700">Fuel Cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹{getBestRoute().earnings}</div>
              <div className="text-sm text-green-700">Earnings</div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-green-800 mb-2">Route Sequence:</h4>
            <div className="flex items-center gap-2 overflow-x-auto">
              {getBestRoute().sequence.map((location, index) => (
                <React.Fragment key={index}>
                  <div className="flex-shrink-0 bg-white border border-green-200 rounded-lg px-3 py-2">
                    <div className="text-sm font-medium text-gray-800">{location}</div>
                  </div>
                  {index < getBestRoute().sequence.length - 1 && (
                    <div className="text-green-600">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              const route = getBestRoute();
              alert(`🧭 Starting optimized route!\n⏱️ Total time: ${route.totalTime} minutes\n📍 Distance: ${route.totalDistance}km\n💰 Fuel cost: ₹${route.fuelCost}`);
              window.open('https://maps.google.com/?q=Koregaon+Park,+Pune', '_blank');
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <Route size={20} className="inline mr-2" />
            Start Navigation
          </button>
        </div>
      </div>

      {/* All Route Options */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">All Route Options</h3>
        <div className="space-y-3">
          {optimizedRoutes.map((route) => (
            <div
              key={route.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedRoute === route.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:shadow-md'
              }`}
              onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{route.name}</h4>
                <span className={`text-sm font-medium ${getTrafficColor(route.traffic)}`}>
                  {route.traffic} traffic
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-3">
                <div>
                  <div className="text-lg font-bold text-gray-800">{route.totalTime}m</div>
                  <div className="text-xs text-gray-600">Time</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">{route.totalDistance}km</div>
                  <div className="text-xs text-gray-600">Distance</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">₹{route.fuelCost}</div>
                  <div className="text-xs text-gray-600">Fuel</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">₹{route.earnings}</div>
                  <div className="text-xs text-gray-600">Earnings</div>
                </div>
              </div>

              {/* Savings/Costs */}
              <div className="flex gap-4 text-sm">
                {route.savings.time !== 0 && (
                  <span className={route.savings.time > 0 ? 'text-green-600' : 'text-red-600'}>
                    {route.savings.time > 0 ? '+' : ''}{route.savings.time}m time
                  </span>
                )}
                {route.savings.fuel !== 0 && (
                  <span className={route.savings.fuel > 0 ? 'text-green-600' : 'text-red-600'}>
                    {route.savings.fuel > 0 ? '+' : ''}₹{route.savings.fuel} fuel
                  </span>
                )}
                {route.savings.earnings !== 0 && (
                  <span className={route.savings.earnings > 0 ? 'text-green-600' : 'text-red-600'}>
                    {route.savings.earnings > 0 ? '+' : ''}₹{route.savings.earnings} earnings
                  </span>
                )}
              </div>

              {selectedRoute === route.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="mb-3">
                    <h5 className="font-medium text-gray-800 mb-2">Detailed Route:</h5>
                    <div className="space-y-2">
                      {route.sequence.map((location, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      alert(`✅ Route selected: ${route.name}\n⏱️ Time: ${route.totalTime} min\n📍 Distance: ${route.totalDistance}km`);
                      setSelectedRoute(null);
                    }}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Select This Route
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Conditions */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Live Traffic Conditions</h3>
        <div className="space-y-2">
          {trafficConditions.map((condition, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-gray-600" />
                <span className="font-medium text-gray-800">{condition.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${condition.color}`}>{condition.status}</span>
                <span className="text-sm text-gray-600">{condition.delay}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Route Optimization Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Plan routes during off-peak hours to save time</li>
          <li>• Group nearby deliveries together</li>
          <li>• Check traffic conditions before starting</li>
          <li>• Consider fuel costs vs time savings</li>
          <li>• Update route if new orders come in</li>
        </ul>
      </div>
    </div>
  );
}