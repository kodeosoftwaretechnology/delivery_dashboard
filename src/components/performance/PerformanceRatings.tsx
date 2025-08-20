import React from 'react';
import { Star, TrendingUp, CheckCircle, Clock, Package, Award } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function PerformanceRatings() {
  const { partner, performanceMetrics } = useApp();
  const { themeClasses, isDarkMode } = useTheme();

  const performanceData = [
    {
      icon: CheckCircle,
      label: 'Acceptance Rate',
      value: `${performanceMetrics.acceptanceRate}%`,
      color: 'text-green-600',
      bgColor: isDarkMode ? 'bg-green-800' : 'bg-green-100'
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: `${performanceMetrics.completionRate}%`,
      color: 'text-blue-600',
      bgColor: isDarkMode ? 'bg-blue-800' : 'bg-blue-100'
    },
    {
      icon: Clock,
      label: 'Avg Delivery Time',
      value: '18 mins',
      color: 'text-purple-600',
      bgColor: isDarkMode ? 'bg-purple-800' : 'bg-purple-100'
    },
    {
      icon: Package,
      label: 'Total Deliveries',
      value: partner.totalDeliveries.toString(),
      color: 'text-orange-600',
      bgColor: isDarkMode ? 'bg-orange-800' : 'bg-orange-100'
    }
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 4.8) return { text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (rating >= 4.5) return { text: 'Very Good', color: 'bg-blue-100 text-blue-800' };
    if (rating >= 4.0) return { text: 'Good', color: 'bg-yellow-100 text-yellow-800' };
    if (rating >= 3.5) return { text: 'Average', color: 'bg-orange-100 text-orange-800' };
    return { text: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  const badge = getRatingBadge(partner.rating);

  return (
    <div className={`${themeClasses.cardBg} rounded-xl p-6 shadow-sm transition-colors duration-300`}>
      {/* Header with Rating */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-bold ${themeClasses.text} mb-1`}>Performance & Ratings</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>Your delivery performance overview</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1 mb-1">
            <Star className={`${getRatingColor(partner.rating)} fill-current`} size={20} />
            <span className={`text-xl font-bold ${getRatingColor(partner.rating)}`}>
              {partner.rating}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
            {badge.text}
          </span>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {performanceData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`border ${themeClasses.border} rounded-lg p-4 transition-colors duration-300`}>
              <div className="flex items-center gap-3">
                <div className={`${metric.bgColor} p-2 rounded-lg`}>
                  <Icon className={metric.color} size={16} />
                </div>
                <div>
                  <p className={`text-xs ${themeClasses.textSecondary}`}>{metric.label}</p>
                  <p className={`font-bold text-lg ${themeClasses.text}`}>{metric.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rating Breakdown */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm font-medium ${themeClasses.text}`}>Customer Rating Breakdown</span>
          <span className={`text-xs ${themeClasses.textSecondary}`}>{partner.totalReviews} reviews</span>
        </div>
        
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = partner.ratingBreakdown[stars as keyof typeof partner.ratingBreakdown];
            const percentage = Math.round((count / partner.totalReviews) * 100);
            return (
              <div key={stars} className="flex items-center gap-2">
                <span className={`text-xs ${themeClasses.textSecondary} w-6`}>{stars}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className={`text-xs ${themeClasses.textSecondary} w-8`}>{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Insights */}
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'} border transition-colors duration-300`}>
        <div className="flex items-center gap-2 mb-2">
          <Award className={`${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} size={16} />
          <span className={`font-semibold text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            Performance Insights
          </span>
        </div>
        <div className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-700'} space-y-1`}>
          <p>• Your {partner.rating} rating is above area average (4.2)</p>
          <p>• {partner.ratingBreakdown[5]} customers gave you 5-star ratings</p>
          <p>• {performanceMetrics.completionRate}% completion rate shows reliability</p>
          <p>• Rate customers to help improve service quality</p>
        </div>
      </div>
    </div>
  );
}