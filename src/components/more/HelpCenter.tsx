import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Phone, MessageCircle, Mail, ArrowLeft } from 'lucide-react';

interface HelpCenterProps {
  onClose: () => void;
}

export default function HelpCenter({ onClose }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    { id: 'all', name: 'All Topics', icon: '📋' },
    { id: 'orders', name: 'Orders & Delivery', icon: '📦' },
    { id: 'earnings', name: 'Earnings & Payment', icon: '💰' },
    { id: 'app', name: 'App Issues', icon: '📱' },
    { id: 'safety', name: 'Safety & Security', icon: '🛡️' },
    { id: 'account', name: 'Account & Profile', icon: '👤' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How do I verify customer age for liquor delivery?',
      answer: 'Always check valid government ID (Aadhar, Driving License, Passport). Customer must be 21+ years old. If customer refuses to show ID or appears underage, do not deliver and contact support immediately.',
      priority: 'high'
    },
    {
      id: 2,
      category: 'orders',
      question: 'What if customer is not available at delivery location?',
      answer: 'Wait for 5 minutes and call customer. If no response, contact support. Do not leave liquor unattended. Return to store if customer unavailable after 10 minutes.',
      priority: 'high'
    },
    {
      id: 3,
      category: 'earnings',
      question: 'How are my earnings calculated?',
      answer: 'Earnings = Base delivery fee + Distance charges + Surge pricing + Tips + Bonuses. Base fee varies by city. Distance calculated from pickup to drop location.',
      priority: 'medium'
    },
    {
      id: 4,
      category: 'earnings',
      question: 'When will I receive my payment?',
      answer: 'Daily earnings are settled next working day. Weekly settlements happen every Tuesday. Instant withdrawal available for premium partners.',
      priority: 'medium'
    },
    {
      id: 5,
      category: 'app',
      question: 'App is not showing new orders',
      answer: 'Check internet connection, ensure location services are enabled, restart app. If issue persists, contact support immediately.',
      priority: 'high'
    },
    {
      id: 6,
      category: 'safety',
      question: 'What to do in emergency situation?',
      answer: 'Press SOS button in app immediately. Call emergency helpline 1800-XXX-XXXX. Share live location with emergency contacts. Stay calm and follow safety protocols.',
      priority: 'critical'
    },
    {
      id: 7,
      category: 'account',
      question: 'How to update my bank details?',
      answer: 'Go to More > Payment & Bank Details. Update information and submit. Changes take 24-48 hours to reflect. Contact support if issues persist.',
      priority: 'medium'
    },
    {
      id: 8,
      category: 'orders',
      question: 'Customer wants to change delivery address',
      answer: 'Contact support immediately. Do not change address without approval. Additional charges may apply for address changes.',
      priority: 'medium'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
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
          <HelpCircle className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Help Center & FAQ</h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Browse by Category</h3>
        <div className="grid grid-cols-2 gap-2">
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">
            Frequently Asked Questions ({filteredFAQs.length})
          </h3>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear search
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(faq.priority)}`}>
                      {faq.priority.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-800">{faq.question}</h4>
                </div>
                {expandedFAQ === faq.id ? (
                  <ChevronUp className="text-gray-400" size={20} />
                ) : (
                  <ChevronDown className="text-gray-400" size={20} />
                )}
              </button>
              
              {expandedFAQ === faq.id && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No FAQs found matching your search.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View all FAQs
            </button>
          </div>
        )}
      </div>

      {/* Quick Contact */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-3">Still need help?</h3>
        <div className="grid grid-cols-1 gap-3">
          <button className="flex items-center gap-3 p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <MessageCircle className="text-blue-600" size={20} />
            <div className="text-left">
              <p className="font-medium text-blue-800">Live Chat Support</p>
              <p className="text-sm text-blue-600">Get instant help from our team</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <Phone className="text-blue-600" size={20} />
            <div className="text-left">
              <p className="font-medium text-blue-800">Call Support</p>
              <p className="text-sm text-blue-600">1800-XXX-XXXX (24/7)</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <Mail className="text-blue-600" size={20} />
            <div className="text-left">
              <p className="font-medium text-blue-800">Email Support</p>
              <p className="text-sm text-blue-600">support@liquordelivery.com</p>
            </div>
          </button>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">🔥 Popular Topics</h3>
        <div className="space-y-2">
          <button className="w-full text-left p-2 hover:bg-white rounded transition-colors">
            <span className="text-sm text-gray-700">Age verification process</span>
          </button>
          <button className="w-full text-left p-2 hover:bg-white rounded transition-colors">
            <span className="text-sm text-gray-700">Payment settlement timing</span>
          </button>
          <button className="w-full text-left p-2 hover:bg-white rounded transition-colors">
            <span className="text-sm text-gray-700">App not receiving orders</span>
          </button>
          <button className="w-full text-left p-2 hover:bg-white rounded transition-colors">
            <span className="text-sm text-gray-700">Emergency procedures</span>
          </button>
        </div>
      </div>
    </div>
  );
}