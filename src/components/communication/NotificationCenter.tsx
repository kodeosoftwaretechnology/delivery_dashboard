import React, { useState } from 'react';
import { Bell, Gift, AlertTriangle, Info, DollarSign, Settings, X, MessageCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import ChatSupport from './ChatSupport';

export default function NotificationCenter() {
  const { notifications, markNotificationRead } = useApp();
  const { themeClasses, isDarkMode } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return AlertTriangle;
      case 'earning': return DollarSign;
      case 'bonus': return Gift;
      case 'system': return Settings;
      case 'safety': return AlertTriangle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'border-red-500 bg-red-50';
    switch (type) {
      case 'order': return isDarkMode ? 'border-blue-600 bg-blue-900' : 'border-blue-500 bg-blue-50';
      case 'earning': return isDarkMode ? 'border-green-600 bg-green-900' : 'border-green-500 bg-green-50';
      case 'bonus': return isDarkMode ? 'border-purple-600 bg-purple-900' : 'border-purple-500 bg-purple-50';
      case 'system': return isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-500 bg-gray-50';
      default: return isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50';
    }
  };

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' || n.type === filter
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`p-4 ${themeClasses.bg} min-h-screen transition-colors duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${themeClasses.text}`}>Notifications</h1>
          <p className={`${themeClasses.textSecondary} text-sm`}>
            {unreadCount} unread notifications
          </p>
        </div>
        <button
          onClick={() => setShowChat(true)}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          <MessageCircle size={20} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className={`${themeClasses.cardBg} rounded-xl p-1 mb-6 shadow-sm transition-colors duration-300`}>
        <div className="flex">
          {[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
            { id: 'bonus', label: 'Bonuses', count: notifications.filter(n => n.type === 'bonus').length },
            { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                filter === tab.id
                  ? 'bg-orange-600 text-white'
                  : `${themeClasses.textSecondary} hover:${themeClasses.text}`
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Push Notification Banner */}
      <div className={`${isDarkMode ? 'bg-orange-900 border-orange-700' : 'bg-orange-50 border-orange-200'} border rounded-xl p-4 mb-6 transition-colors duration-300`}>
        <div className="flex items-center gap-3">
          <Bell className={`${isDarkMode ? 'text-orange-300' : 'text-orange-600'}`} size={20} />
          <div>
            <h3 className={`font-semibold ${isDarkMode ? 'text-orange-300' : 'text-orange-800'}`}>
              Push Notifications Active
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>
              You'll receive alerts for new orders, bonuses, and urgent messages
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className={`${themeClasses.cardBg} rounded-xl p-8 text-center transition-colors duration-300`}>
            <Bell className={`${themeClasses.textSecondary} mx-auto mb-3`} size={48} />
            <p className={`${themeClasses.textSecondary}`}>No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`${themeClasses.cardBg} border-l-4 ${getNotificationColor(notification.type, notification.priority)} rounded-xl p-4 shadow-sm transition-colors duration-300 ${
                  !notification.read ? 'ring-2 ring-orange-200' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                      notification.type === 'earning' ? 'bg-green-100 text-green-600' :
                      notification.type === 'bonus' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${themeClasses.text}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                        {notification.priority === 'high' && (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className={`${themeClasses.textSecondary} text-sm mb-2`}>
                        {notification.message}
                      </p>
                      <p className={`${themeClasses.textSecondary} text-xs`}>
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markNotificationRead(notification.id)}
                      className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Chat Support Modal */}
      {showChat && (
        <ChatSupport onClose={() => setShowChat(false)} />
      )}
    </div>
  );
}