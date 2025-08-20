import React, { useState } from 'react';
import { Calculator, Zap, ArrowLeft, DollarSign } from 'lucide-react';

interface IncentiveCalculatorProps {
  onClose: () => void;
}

export default function IncentiveCalculator({ onClose }: IncentiveCalculatorProps) {
  const [deliveries, setDeliveries] = useState(20);
  const [distance, setDistance] = useState(150);
  const [rating, setRating] = useState(4.8);
  const [surgeHours, setSurgeHours] = useState(4);

  const baseRate = 45;
  const distanceRate = 3;
  const ratingBonus = rating >= 4.5 ? 200 : 0;
  const surgeMultiplier = 1.5;
  const deliveryBonus = deliveries >= 25 ? 500 : deliveries >= 20 ? 300 : 0;

  const baseEarnings = deliveries * baseRate;
  const distanceEarnings = distance * distanceRate;
  const surgeEarnings = surgeHours * baseRate * (surgeMultiplier - 1);
  const totalEarnings = baseEarnings + distanceEarnings + surgeEarnings + ratingBonus + deliveryBonus;

  const incentives = [
    { name: 'Base Delivery Fee', amount: baseEarnings, description: `${deliveries} × ₹${baseRate}` },
    { name: 'Distance Bonus', amount: distanceEarnings, description: `${distance}km × ₹${distanceRate}` },
    { name: 'Surge Hours', amount: surgeEarnings, description: `${surgeHours}hrs × 1.5x multiplier` },
    { name: 'Rating Bonus', amount: ratingBonus, description: rating >= 4.5 ? '4.5+ rating bonus' : 'Not eligible' },
    { name: 'Volume Bonus', amount: deliveryBonus, description: deliveries >= 25 ? '25+ deliveries' : deliveries >= 20 ? '20+ deliveries' : 'Not eligible' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Incentive Calculator</h2>
      </div>

      {/* Input Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calculator size={16} />
          Calculate Your Earnings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Deliveries: {deliveries}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={deliveries}
              onChange={(e) => setDeliveries(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>50</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Distance (km): {distance}
            </label>
            <input
              type="range"
              min="10"
              max="500"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10km</span>
              <span>500km</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Rating: {rating}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1.0</span>
              <span>5.0</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Surge Hours: {surgeHours}
            </label>
            <input
              type="range"
              min="0"
              max="12"
              value={surgeHours}
              onChange={(e) => setSurgeHours(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0hrs</span>
              <span>12hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign size={16} />
          Earnings Breakdown
        </h3>
        
        <div className="space-y-3">
          {incentives.map((incentive, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <div className="font-medium text-gray-800">{incentive.name}</div>
                <div className="text-xs text-gray-500">{incentive.description}</div>
              </div>
              <div className="font-semibold text-green-600">
                ₹{incentive.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Earnings */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white mb-6">
        <div className="text-center">
          <div className="text-sm opacity-90 mb-1">Estimated Daily Earnings</div>
          <div className="text-3xl font-bold">₹{totalEarnings}</div>
          <div className="text-sm opacity-90 mt-1">
            Monthly Potential: ₹{(totalEarnings * 30).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          <Zap size={16} />
          Maximize Your Earnings
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Work during surge hours (7-9 PM) for 1.5x earnings</li>
          <li>• Maintain 4.5+ rating for ₹200 daily bonus</li>
          <li>• Complete 25+ deliveries for ₹500 volume bonus</li>
          <li>• Focus on longer distance orders for better pay</li>
        </ul>
      </div>
    </div>
  );
}