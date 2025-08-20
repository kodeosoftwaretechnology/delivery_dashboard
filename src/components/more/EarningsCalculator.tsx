import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Clock, MapPin, ArrowLeft, Zap, Target } from 'lucide-react';

interface EarningsCalculatorProps {
  onClose: () => void;
}

export default function EarningsCalculator({ onClose }: EarningsCalculatorProps) {
  const [deliveries, setDeliveries] = useState(5);
  const [avgDistance, setAvgDistance] = useState(3.5);
  const [workingHours, setWorkingHours] = useState(8);
  const [selectedZone, setSelectedZone] = useState('koregaon');
  const [includeBonus, setIncludeBonus] = useState(true);
  const [includeSurge, setIncludeSurge] = useState(true);
  const [calculatedEarnings, setCalculatedEarnings] = useState(0);
  const [timePeriod, setTimePeriod] = useState('daily');

  const zones = [
    { id: 'koregaon', name: 'Koregaon Park', baseFee: 45, distanceRate: 8, surgeMultiplier: 1.8 },
    { id: 'baner', name: 'Baner', baseFee: 40, distanceRate: 7, surgeMultiplier: 1.5 },
    { id: 'wakad', name: 'Wakad', baseFee: 35, distanceRate: 6, surgeMultiplier: 1.2 },
    { id: 'hadapsar', name: 'Hadapsar', baseFee: 30, distanceRate: 5, surgeMultiplier: 1.0 }
  ];

  const bonusStructure = [
    { deliveries: 5, bonus: 50 },
    { deliveries: 10, bonus: 150 },
    { deliveries: 15, bonus: 300 },
    { deliveries: 20, bonus: 500 }
  ];

  const timeSlots = [
    { time: '6-9 AM', multiplier: 1.2, label: 'Morning Rush' },
    { time: '12-2 PM', multiplier: 1.1, label: 'Lunch Time' },
    { time: '6-11 PM', multiplier: 1.5, label: 'Evening Peak' },
    { time: '11 PM-2 AM', multiplier: 1.3, label: 'Night Shift' }
  ];

  const timePeriods = [
    { id: 'daily', label: 'Daily', multiplier: 1, icon: '📅' },
    { id: 'weekly', label: 'Weekly', multiplier: 7, icon: '📊' },
    { id: 'monthly', label: 'Monthly', multiplier: 30, icon: '📈' },
    { id: 'yearly', label: 'Yearly', multiplier: 365, icon: '🎯' }
  ];

  useEffect(() => {
    calculateEarnings();
  }, [deliveries, avgDistance, workingHours, selectedZone, includeBonus, includeSurge]);

  const getCurrentPeriodMultiplier = () => {
    return timePeriods.find(p => p.id === timePeriod)?.multiplier || 1;
  };

  const getDisplayEarnings = () => {
    return Math.round(calculatedEarnings * getCurrentPeriodMultiplier());
  };

  const getPeriodLabel = () => {
    return timePeriods.find(p => p.id === timePeriod)?.label || 'Daily';
  };

  const calculateEarnings = () => {
    const zone = zones.find(z => z.id === selectedZone);
    if (!zone) return;

    // Base calculation
    let baseEarning = zone.baseFee + (avgDistance * zone.distanceRate);
    let totalEarnings = baseEarning * deliveries;

    // Add surge pricing
    if (includeSurge) {
      totalEarnings *= zone.surgeMultiplier;
    }

    // Add bonuses
    if (includeBonus) {
      const applicableBonus = bonusStructure
        .filter(b => deliveries >= b.deliveries)
        .reduce((max, current) => current.bonus > max ? current.bonus : max, 0);
      totalEarnings += applicableBonus;
    }

    // Add time-based multiplier (assuming peak hours)
    if (workingHours >= 6) {
      totalEarnings *= 1.2; // Peak hour bonus
    }

    setCalculatedEarnings(Math.round(totalEarnings));
  };

  const getNextBonus = () => {
    return bonusStructure.find(b => deliveries < b.deliveries);
  };

  const getEarningsBreakdown = () => {
    const zone = zones.find(z => z.id === selectedZone);
    if (!zone) return [];

    const baseEarning = zone.baseFee + (avgDistance * zone.distanceRate);
    const baseTotal = baseEarning * deliveries;
    
    const breakdown = [
      { label: 'Base Earnings', amount: baseTotal, color: 'text-blue-600' },
    ];

    if (includeSurge && zone.surgeMultiplier > 1) {
      const surgeAmount = baseTotal * (zone.surgeMultiplier - 1);
      breakdown.push({ label: 'Surge Bonus', amount: surgeAmount, color: 'text-orange-600' });
    }

    if (includeBonus) {
      const applicableBonus = bonusStructure
        .filter(b => deliveries >= b.deliveries)
        .reduce((max, current) => current.bonus > max ? current.bonus : max, 0);
      if (applicableBonus > 0) {
        breakdown.push({ label: 'Delivery Bonus', amount: applicableBonus, color: 'text-green-600' });
      }
    }

    if (workingHours >= 6) {
      const peakBonus = baseTotal * 0.2;
      breakdown.push({ label: 'Peak Hours Bonus', amount: peakBonus, color: 'text-purple-600' });
    }

    return breakdown;
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
          <Calculator className="text-green-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Earnings Calculator</h2>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="mb-4">
        <div className="grid grid-cols-4 gap-2">
          {timePeriods.map((period) => (
            <button
              key={period.id}
              onClick={() => setTimePeriod(period.id)}
              className={`p-3 rounded-lg border-2 transition-colors text-center ${
                timePeriod === period.id
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="text-lg mb-1">{period.icon}</div>
              <div className="text-sm font-medium">{period.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Earnings Display */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estimated {getPeriodLabel()} Earnings</h3>
          <div className="text-4xl font-bold text-green-600 mb-2">₹{getDisplayEarnings().toLocaleString()}</div>
          <p className="text-sm text-gray-600">
            Based on {deliveries} deliveries/day in {zones.find(z => z.id === selectedZone)?.name}
          </p>
          {timePeriod !== 'daily' && (
            <p className="text-xs text-gray-500 mt-1">
              Daily: ₹{calculatedEarnings} × {getCurrentPeriodMultiplier()} days
            </p>
          )}
        </div>
      </div>

      {/* Input Controls */}
      <div className="space-y-6 mb-6">
        {/* Number of Deliveries */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Deliveries: {deliveries}
          </label>
          <input
            type="range"
            min="1"
            max="25"
            value={deliveries}
            onChange={(e) => setDeliveries(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>25</span>
          </div>
        </div>

        {/* Average Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Distance per Delivery: {avgDistance} km
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={avgDistance}
            onChange={(e) => setAvgDistance(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 km</span>
            <span>10 km</span>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Working Hours: {workingHours} hours
          </label>
          <input
            type="range"
            min="2"
            max="12"
            value={workingHours}
            onChange={(e) => setWorkingHours(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2 hrs</span>
            <span>12 hrs</span>
          </div>
        </div>

        {/* Zone Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Zone</label>
          <div className="grid grid-cols-2 gap-3">
            {zones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  selectedZone === zone.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="text-left">
                  <p className="font-medium text-gray-800">{zone.name}</p>
                  <p className="text-sm text-gray-600">₹{zone.baseFee} base + ₹{zone.distanceRate}/km</p>
                  {zone.surgeMultiplier > 1 && (
                    <p className="text-xs text-orange-600 font-medium">
                      🔥 {zone.surgeMultiplier}x surge
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Include Surge Pricing</p>
              <p className="text-sm text-gray-600">Peak hour multipliers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeSurge}
                onChange={(e) => setIncludeSurge(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Include Delivery Bonuses</p>
              <p className="text-sm text-gray-600">Milestone rewards</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeBonus}
                onChange={(e) => setIncludeBonus(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">{getPeriodLabel()} Earnings Breakdown</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          {getEarningsBreakdown().map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="text-gray-700">{item.label} {timePeriod !== 'daily' ? `(${getPeriodLabel()})` : ''}</span>
              <span className={`font-semibold ${item.color}`}>₹{Math.round(item.amount * getCurrentPeriodMultiplier()).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-center font-bold text-lg">
              <span className="text-gray-800">Total {getPeriodLabel()} Earnings</span>
              <span className="text-green-600">₹{getDisplayEarnings().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Bonus Alert */}
      {getNextBonus() && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-orange-600" size={16} />
            <span className="font-semibold text-orange-800">Next Bonus Target</span>
          </div>
          <p className="text-orange-700">
            Complete {getNextBonus()!.deliveries - deliveries} more deliveries to earn ₹{getNextBonus()!.bonus} bonus!
          </p>
        </div>
      )}

      {/* Peak Hours Info */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Peak Hours Multipliers</h3>
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((slot, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-800">{slot.time}</span>
                <span className="text-sm font-bold text-blue-600">{slot.multiplier}x</span>
              </div>
              <p className="text-sm text-gray-600">{slot.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Comparison */}
      {timePeriod === 'daily' && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Quick Projections</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-600">₹{(calculatedEarnings * 7).toLocaleString()}</div>
              <div className="text-xs text-blue-700">Weekly</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-600">₹{(calculatedEarnings * 30).toLocaleString()}</div>
              <div className="text-xs text-green-700">Monthly</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-600">₹{(calculatedEarnings * 365).toLocaleString()}</div>
              <div className="text-xs text-purple-700">Yearly</div>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Maximize Your Earnings</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Work during peak hours (6-11 PM) for higher rates</li>
          <li>• Complete bonus milestones for extra rewards</li>
          <li>• Choose high-demand zones like Koregaon Park</li>
          <li>• Maintain good ratings for priority orders</li>
          <li>• Plan efficient routes to complete more deliveries</li>
        </ul>
      </div>
    </div>
  );
}