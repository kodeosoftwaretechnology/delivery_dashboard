import React, { useState } from 'react';
import { Star, X, MessageCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function CustomerRatingModal() {
  const { showCustomerRating, setShowCustomerRating, pendingCustomerRating, rateCustomer } = useApp();
  const { themeClasses, isDarkMode } = useTheme();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  if (!showCustomerRating || !pendingCustomerRating) return null;

  const handleSubmit = () => {
    if (rating > 0) {
      rateCustomer(pendingCustomerRating.orderId, rating, feedback);
    }
  };

  const handleSkip = () => {
    setShowCustomerRating(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${themeClasses.cardBg} rounded-xl w-full max-w-md transition-colors duration-300`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-bold ${themeClasses.text}`}>Rate Customer</h3>
            <button
              onClick={handleSkip}
              className={`p-2 rounded-full ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Customer Info */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">
                {pendingCustomerRating.customerName.charAt(0)}
              </span>
            </div>
            <h4 className={`font-semibold ${themeClasses.text} mb-1`}>
              {pendingCustomerRating.customerName}
            </h4>
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              How was your experience with this customer?
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-500 fill-current'
                      : themeClasses.textSecondary
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {/* Rating Labels */}
          <div className="text-center mb-6">
            {rating > 0 && (
              <p className={`font-medium ${themeClasses.text}`}>
                {rating === 5 && '⭐ Excellent Customer!'}
                {rating === 4 && '👍 Good Customer'}
                {rating === 3 && '👌 Average Experience'}
                {rating === 2 && '👎 Poor Experience'}
                {rating === 1 && '😞 Very Poor Experience'}
              </p>
            )}
          </div>

          {/* Quick Feedback Options */}
          {rating > 0 && (
            <div className="mb-6">
              <p className={`text-sm ${themeClasses.textSecondary} mb-2`}>Quick feedback:</p>
              <div className="flex flex-wrap gap-2">
                {rating >= 4 ? [
                  'Polite customer',
                  'On time',
                  'Easy to find',
                  'Respectful'
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFeedback(option)}
                    className={`px-3 py-1 rounded-full text-xs border ${themeClasses.border} ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
                  >
                    {option}
                  </button>
                )) : [
                  'Rude behavior',
                  'Wrong address',
                  'Late to receive',
                  'Payment issue'
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFeedback(option)}
                    className={`px-3 py-1 rounded-full text-xs border ${themeClasses.border} ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSkip}
              className={`flex-1 py-3 px-4 rounded-lg border ${themeClasses.border} ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
            >
              Skip
            </button>
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Submit Rating
            </button>
          </div>

          {/* Info */}
          <p className={`text-xs ${themeClasses.textSecondary} text-center mt-4`}>
            Your rating helps improve service quality for all delivery partners
          </p>
        </div>
      </div>
    </div>
  );
}