import React from 'react';
import { Award, Star, Trophy, Crown, ArrowLeft, Lock } from 'lucide-react';

interface AchievementsBadgesProps {
  onClose: () => void;
}

export default function AchievementsBadges({ onClose }: AchievementsBadgesProps) {
  const achievements = [
    {
      id: 1,
      title: 'First Delivery',
      description: 'Complete your first successful delivery',
      icon: Star,
      color: 'bg-blue-100 text-blue-600',
      earned: true,
      earnedDate: '2024-01-15',
      reward: '₹100 bonus'
    },
    {
      id: 2,
      title: 'Speed Demon',
      description: 'Complete 10 deliveries in under 30 minutes each',
      icon: Trophy,
      color: 'bg-yellow-100 text-yellow-600',
      earned: true,
      earnedDate: '2024-02-03',
      reward: '₹300 bonus'
    },
    {
      id: 3,
      title: 'Customer Favorite',
      description: 'Maintain 4.8+ rating for 30 days',
      icon: Crown,
      color: 'bg-purple-100 text-purple-600',
      earned: true,
      earnedDate: '2024-02-20',
      reward: '₹500 bonus'
    },
    {
      id: 4,
      title: 'Century Club',
      description: 'Complete 100 successful deliveries',
      icon: Award,
      color: 'bg-green-100 text-green-600',
      earned: true,
      earnedDate: '2024-03-10',
      reward: '₹1000 bonus'
    },
    {
      id: 5,
      title: 'Night Owl',
      description: 'Complete 50 deliveries after 10 PM',
      icon: Star,
      color: 'bg-indigo-100 text-indigo-600',
      earned: false,
      progress: 32,
      total: 50,
      reward: '₹400 bonus'
    },
    {
      id: 6,
      title: 'Perfect Week',
      description: 'Zero cancellations for 7 consecutive days',
      icon: Trophy,
      color: 'bg-orange-100 text-orange-600',
      earned: false,
      progress: 5,
      total: 7,
      reward: '₹600 bonus'
    },
    {
      id: 7,
      title: 'Distance Master',
      description: 'Travel 1000km in deliveries',
      icon: Award,
      color: 'bg-red-100 text-red-600',
      earned: false,
      progress: 847,
      total: 1000,
      reward: '₹800 bonus'
    },
    {
      id: 8,
      title: 'Elite Partner',
      description: 'Complete 500 deliveries with 4.9+ rating',
      icon: Crown,
      color: 'bg-pink-100 text-pink-600',
      earned: false,
      progress: 247,
      total: 500,
      reward: '₹2000 bonus'
    }
  ];

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalRewards = achievements
    .filter(a => a.earned)
    .reduce((sum, a) => sum + parseInt(a.reward.replace('₹', '').replace(' bonus', '')), 0);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Achievements & Badges</h2>
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">{earnedCount}/8</div>
          <div className="text-sm opacity-90 mb-4">Achievements Unlocked</div>
          <div className="flex justify-center gap-6">
            <div>
              <div className="text-lg font-semibold">₹{totalRewards}</div>
              <div className="text-xs opacity-90">Total Rewards</div>
            </div>
            <div>
              <div className="text-lg font-semibold">{Math.round((earnedCount/8)*100)}%</div>
              <div className="text-xs opacity-90">Completion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="space-y-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div 
              key={achievement.id} 
              className={`bg-white border rounded-lg p-4 ${
                achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-3 rounded-lg ${achievement.color} ${!achievement.earned && 'opacity-50'}`}>
                  {achievement.earned ? (
                    <Icon size={24} />
                  ) : (
                    <Lock size={24} className="text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                      {achievement.title}
                    </h3>
                    {achievement.earned && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        Earned
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-2 ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                      {achievement.reward}
                    </span>
                    
                    {achievement.earned ? (
                      <span className="text-xs text-gray-500">
                        Earned on {new Date(achievement.earnedDate!).toLocaleDateString()}
                      </span>
                    ) : (
                      <div className="text-xs text-gray-500">
                        {achievement.progress}/{achievement.total}
                      </div>
                    )}
                  </div>
                  
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Achievement */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-blue-800 mb-2">🎯 Next Achievement</h3>
        <p className="text-sm text-blue-700 mb-2">
          You're closest to earning "Perfect Week" - just 2 more days without cancellations!
        </p>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full w-5/7" />
        </div>
        <div className="text-xs text-blue-600 mt-1">5/7 days completed</div>
      </div>
    </div>
  );
}