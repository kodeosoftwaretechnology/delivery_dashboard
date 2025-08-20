import React from 'react';
import { Gift, Star, Crown, Zap, ArrowLeft } from 'lucide-react';

interface SpecialBenefitsProps {
  onClose: () => void;
}

export default function SpecialBenefits({ onClose }: SpecialBenefitsProps) {
  const benefits = [
    {
      title: 'Premium Partner Status',
      description: 'Unlock exclusive benefits with 4.8+ rating',
      icon: Crown,
      color: 'bg-yellow-100 text-yellow-600',
      status: 'active',
      reward: '₹500 bonus monthly'
    },
    {
      title: 'Top Performer Bonus',
      description: 'Extra earnings for top 10% performers',
      icon: Star,
      color: 'bg-purple-100 text-purple-600',
      status: 'eligible',
      reward: '₹1000 bonus'
    },
    {
      title: 'Surge Hour Multiplier',
      description: '2x earnings during peak hours',
      icon: Zap,
      color: 'bg-orange-100 text-orange-600',
      status: 'active',
      reward: '2x earnings'
    },
    {
      title: 'Loyalty Rewards',
      description: 'Monthly rewards for consistent delivery',
      icon: Gift,
      color: 'bg-green-100 text-green-600',
      status: 'active',
      reward: '₹300 monthly'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Special Benefits</h2>
      </div>

      <div className="space-y-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${benefit.color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      benefit.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {benefit.status === 'active' ? 'Active' : 'Eligible'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{benefit.description}</p>
                  <div className="text-green-600 font-semibold text-sm">
                    {benefit.reward}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-blue-800 mb-2">💡 How to Unlock More Benefits</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Maintain 4.8+ rating for premium status</li>
          <li>• Complete 100+ deliveries monthly</li>
          <li>• Work during surge hours (7-9 PM)</li>
          <li>• Zero cancellations for bonus eligibility</li>
        </ul>
      </div>
    </div>
  );
}