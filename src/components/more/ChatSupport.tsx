import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Paperclip, Phone, ArrowLeft, User, Bot, Clock, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface ChatSupportProps {
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  type?: 'text' | 'image' | 'system';
}

export default function ChatSupport({ onClose }: ChatSupportProps) {
  const { partner } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello ${partner.name}! I'm here to help you with any delivery-related questions. How can I assist you today?`,
      sender: 'support',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [supportAgent] = useState({
    name: 'Priya Sharma',
    status: 'online',
    avatar: '👩‍💼'
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    'Order not received',
    'Payment issue',
    'Customer not available',
    'App not working',
    'Emergency help'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const responses = {
        'Order not received': 'I understand you haven\'t received an order. Let me check the system for available orders in your area. Can you please share your current location?',
        'Payment issue': 'I\'m sorry to hear about the payment issue. Can you please provide more details? Is it related to daily settlement or a specific order payment?',
        'Customer not available': 'If customer is not available, please wait for 5 minutes and try calling. If still no response, you can return the order to the store. I\'ll help you with the return process.',
        'App not working': 'Let me help you troubleshoot the app issue. Can you tell me what specific problem you\'re experiencing? Is the app crashing or not loading orders?',
        'Emergency help': 'This seems urgent. For immediate emergency assistance, please call our 24/7 helpline at 1800-XXX-XXXX or press the SOS button in your app. Is this a safety emergency?'
      };

      const response = responses[text as keyof typeof responses] || 
        'Thank you for reaching out. I\'ve noted your concern and will assist you shortly. Can you provide more details about the issue you\'re facing?';

      const supportMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'support',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: Date.now(),
        text: `📎 Uploaded: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'image'
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                {supportAgent.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{supportAgent.name}</h3>
              <p className="text-sm text-green-600">● Online - Support Agent</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Phone size={20} className="text-gray-600" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div className={`flex items-center gap-1 mt-1 text-xs ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <Clock size={12} />
                  <span>{formatTime(message.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-gray-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => sendMessage(reply)}
              className="flex-shrink-0 px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(newMessage)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => sendMessage(newMessage)}
            disabled={!newMessage.trim()}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Support Info */}
      <div className="p-3 bg-blue-50 border-t border-blue-200">
        <div className="flex items-center justify-center gap-2 text-sm text-blue-700">
          <MessageCircle size={16} />
          <span>Average response time: 2-3 minutes • 24/7 Support</span>
        </div>
      </div>
    </div>
  );
}