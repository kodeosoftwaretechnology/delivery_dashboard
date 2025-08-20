import React from 'react';
import { TrendingUp, Star, Clock, Target, ArrowLeft, Calendar } from 'lucide-react';

interface PerformanceDashboardProps {
  onClose: () => void;
}

export default function PerformanceDashboard({ onClose }: PerformanceDashboardProps) {
  const stats = [
    { label: 'Total Deliveries', value: '1,247', change: '+12%', color: 'text-green-600' },
    { label: 'Success Rate', value: '98.5%', change: '+2.1%', color: 'text-green-600' },
    { label: 'Avg Rating', value: '4.8', change: '+0.2', color: 'text-green-600' },
    { label: 'On-Time Rate', value: '94%', change: '-1%', color: 'text-red-600' }
  ];

  const weeklyData = [
    { day: 'Mon', deliveries: 18, earnings: 1250 },
    { day: 'Tue', deliveries: 22, earnings: 1580 },
    { day: 'Wed', deliveries: 15, earnings: 980 },
    { day: 'Thu', deliveries: 25, earnings: 1750 },
    { day: 'Fri', deliveries: 28, earnings: 2100 },
    { day: 'Sat', deliveries: 32, earnings: 2400 },
    { day: 'Sun', deliveries: 20, earnings: 1400 }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Performance Dashboard</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
            <div className={`text-xs font-semibold ${stat.color}`}>
              {stat.change} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Performance */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar size={16} />
          This Week's Performance
        </h3>
        <div className="space-y-3">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600 w-8">{day.day}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-800">{day.deliveries} deliveries</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-green-600">₹{day.earnings}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={16} />
          Performance Insights
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Star className="text-green-600" size={16} />
            <div>
              <p className="text-sm font-medium text-green-800">Excellent Rating!</p>
              <p className="text-xs text-green-600">Your 4.8 rating is above average</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
            <Clock className="text-orange-600" size={16} />
            <div>
              <p className="text-sm font-medium text-orange-800">Improve Timing</p>
              <p className="text-xs text-orange-600">6% of deliveries were late this week</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Target className="text-blue-600" size={16} />
            <div>
              <p className="text-sm font-medium text-blue-800">Goal Progress</p>
              <p className="text-xs text-blue-600">87% towards monthly target of 200 deliveries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Your Rankings</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">City Ranking</span>
            <span className="font-semibold text-blue-600">#23 of 1,247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Zone Ranking</span>
            <span className="font-semibold text-green-600">#5 of 156</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Rating Rank</span>
            <span className="font-semibold text-yellow-600">#12 of 1,247</span>
          </div>
        </div>
      </div>
    </div>
  );
}