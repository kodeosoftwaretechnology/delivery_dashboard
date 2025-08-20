import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Paperclip, Phone, Video, MoreVertical } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';

interface ChatSupportProps {
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
  type?: 'text' | 'image' | 'system';
}

export default function ChatSupport({ onClose }: ChatSupportProps) {
  const { themeClasses, isDarkMode } = useTheme();
  const { partner } = useApp();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${partner.name}! I'm here to help you with any questions or issues. How can I assist you today?`,
      sender: 'support',
      time: '2 mins ago',
      type: 'text'
    },
    {
      id: '2',
      text: 'Welcome to Peghouse Support! Our average response time is under 2 minutes.',
      sender: 'support',
      time: '2 mins ago',
      type: 'system'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        time: 'Just now',
        type: 'text'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate support response
      setTimeout(() => {
        const supportResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. I understand your concern and will help you resolve this issue. Let me check the details for you.',
          sender: 'support',
          time: 'Just now',
          type: 'text'
        };
        setMessages(prev => [...prev, supportResponse]);
      }, 1500);
    }
  };

  const quickReplies = [
    'Order issue',
    'Payment problem',
    'App not working',
    'Account help',
    'Delivery question'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${themeClasses.cardBg} rounded-xl w-full max-w-md h-[600px] flex flex-col transition-colors duration-300`}>
        {/* Header */}
        <div className={`border-b ${themeClasses.border} p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">PS</span>
            </div>
            <div>
              <h3 className={`font-semibold ${themeClasses.text}`}>Peghouse Support</h3>
              <p className={`text-xs ${themeClasses.textSecondary}`}>
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span>
                Online • Avg response: 2 min
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-full ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}>
              <Phone size={16} />
            </button>
            <button className={`p-2 rounded-full ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}>
              <Video size={16} />
            </button>
            <button className={`p-2 rounded-full ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}>
              <MoreVertical size={16} />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-full ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'system' ? (
                <div className={`${themeClasses.textSecondary} text-xs text-center w-full py-2`}>
                  {msg.text}
                </div>
              ) : (
                <div className={`max-w-[80%] ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                } rounded-2xl px-4 py-2`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' 
                      ? 'text-blue-100' 
                      : themeClasses.textSecondary
                  }`}>
                    {msg.time}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className={`border-t ${themeClasses.border} p-3`}>
          <p className={`text-xs ${themeClasses.textSecondary} mb-2`}>Quick replies:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => setMessage(reply)}
                className={`px-3 py-1 rounded-full text-xs border ${themeClasses.border} ${themeClasses.textSecondary} hover:${themeClasses.text} hover:bg-gray-50 transition-colors`}
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className={`border-t ${themeClasses.border} p-4`}>
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-full ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}>
              <Paperclip size={16} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className={`w-full px-4 py-2 rounded-full border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}