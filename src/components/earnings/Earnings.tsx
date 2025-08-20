import React, { useState } from 'react';
import { TrendingUp, DollarSign, Gift, CreditCard, Calendar, Target, Calculator } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import EarningsCalculator from '../more/EarningsCalculator';

export default function Earnings() {
  const { t } = useLanguage();
  const { todayEarnings, weeklyEarnings, totalEarnings } = useApp();
  const [viewType, setViewType] = useState<'daily' | 'weekly'>('weekly');
  const [showEarningsCalculator, setShowEarningsCalculator] = useState(false);

  const dailyEarnings = [
    { day: 'Mon', amount: 1200, orders: 8 },
    { day: 'Tue', amount: 1450, orders: 10 },
    { day: 'Wed', amount: 1100, orders: 7 },
    { day: 'Thu', amount: 1350, orders: 9 },
    { day: 'Fri', amount: 1600, orders: 12 },
    { day: 'Sat', amount: 1800, orders: 14 },
    { day: 'Sun', amount: 1250, orders: 8 }
  ];

  const incentives = [
    { title: 'Weekend Bonus', amount: 500, status: 'earned', description: 'Complete 20+ orders' },
    { title: 'Peak Hour Bonus', amount: 300, status: 'earned', description: '6 PM - 10 PM deliveries' },
    { title: 'Distance Bonus', amount: 200, status: 'pending', description: 'Long distance deliveries' },
    { title: 'Rating Bonus', amount: 150, status: 'pending', description: 'Maintain 4.8+ rating' }
  ];

  const payoutHistory = [
    { date: '2025-01-10', amount: 8500, status: 'completed', method: 'Bank Transfer' },
    { date: '2025-01-03', amount: 7200, status: 'completed', method: 'Bank Transfer' },
    { date: '2024-12-27', amount: 6800, status: 'completed', method: 'Bank Transfer' },
    { date: '2024-12-20', amount: 7500, status: 'completed', method: 'Bank Transfer' }
  ];

  const getMaxEarning = () => Math.max(...dailyEarnings.map(d => d.amount));

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('earnings')}</h1>
        <button
          onClick={() => setShowEarningsCalculator(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          <Calculator size={20} />
          Earnings Calculator
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Today</p>
              <p className="text-2xl font-bold">₹{todayEarnings}</p>
            </div>
            <div className="bg-green-400 p-3 rounded-full">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">This Week</p>
              <p className="text-2xl font-bold">₹{weeklyEarnings}</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-full">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total</p>
              <p className="text-2xl font-bold">₹{totalEarnings}</p>
            </div>
            <div className="bg-purple-400 p-3 rounded-full">
              <Target size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex mb-6 bg-white rounded-xl p-1 shadow-sm">
        <button
          onClick={() => setViewType('daily')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
            viewType === 'daily'
              ? 'bg-orange-600 text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t('dailyView')}
        </button>
        <button
          onClick={() => setViewType('weekly')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
            viewType === 'weekly'
              ? 'bg-orange-600 text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t('weeklyView')}
        </button>
      </div>

      {/* Earnings Chart */}
      {viewType === 'daily' && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Daily Earnings</h3>
          <div className="space-y-3">
            {dailyEarnings.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-10 text-sm font-medium text-gray-600">{day.day}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${(day.amount / getMaxEarning()) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{day.amount}</p>
                  <p className="text-xs text-gray-500">{day.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Incentives & Rate Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="text-orange-600" size={20} />
            <h3 className="font-semibold text-gray-800">{t('incentives')}</h3>
          </div>
          <div className="space-y-3">
            {incentives.map((incentive, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800">{incentive.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    incentive.status === 'earned' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {incentive.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{incentive.description}</p>
                <p className="font-semibold text-orange-600">₹{incentive.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="text-blue-600" size={20} />
            <h3 className="font-semibold text-gray-800">{t('rateCard')}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Base Fare</span>
              <span className="font-semibold">₹25</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Per KM</span>
              <span className="font-semibold">₹8</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Waiting Charge</span>
              <span className="font-semibold">₹2/min</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Peak Hour (1.5x)</span>
              <span className="font-semibold text-orange-600">7-10 PM</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Night Charge</span>
              <span className="font-semibold">₹15 extra</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-green-600" size={20} />
          <h3 className="font-semibold text-gray-800">{t('payoutHistory')}</h3>
        </div>
        <div className="space-y-3">
          {payoutHistory.map((payout, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">₹{payout.amount}</p>
                <p className="text-sm text-gray-500">{payout.date}</p>
                <p className="text-xs text-gray-400">{payout.method}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                {payout.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings Calculator Modal */}
      {showEarningsCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <EarningsCalculator onClose={() => setShowEarningsCalculator(false)} />
          </div>
        </div>
      )}
    </div>
  );
}