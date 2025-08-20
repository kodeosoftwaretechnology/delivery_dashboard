import React, { useState } from 'react';
import { AlertTriangle, Camera, Send, ArrowLeft, CheckCircle, Clock, User } from 'lucide-react';

interface ReportIssueProps {
  onClose: () => void;
}

interface Issue {
  id: string;
  type: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  date: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function ReportIssue({ onClose }: ReportIssueProps) {
  const [selectedIssueType, setSelectedIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const issueTypes = [
    {
      id: 'customer',
      name: 'Customer Issue',
      description: 'Problems with customer behavior or payment',
      icon: '👤',
      priority: 'medium'
    },
    {
      id: 'app',
      name: 'App Technical Issue',
      description: 'App crashes, bugs, or functionality problems',
      icon: '📱',
      priority: 'high'
    },
    {
      id: 'payment',
      name: 'Payment Issue',
      description: 'Missing payments or settlement problems',
      icon: '💰',
      priority: 'high'
    },
    {
      id: 'safety',
      name: 'Safety Concern',
      description: 'Unsafe delivery locations or situations',
      icon: '🛡️',
      priority: 'critical'
    },
    {
      id: 'vehicle',
      name: 'Vehicle Problem',
      description: 'Bike breakdown or maintenance issues',
      icon: '🛵',
      priority: 'medium'
    },
    {
      id: 'harassment',
      name: 'Harassment',
      description: 'Inappropriate behavior from customers',
      icon: '⚠️',
      priority: 'critical'
    },
    {
      id: 'order',
      name: 'Order Issue',
      description: 'Wrong orders, missing items, or delivery problems',
      icon: '📦',
      priority: 'medium'
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Any other issue not listed above',
      icon: '❓',
      priority: 'low'
    }
  ];

  const reportHistory: Issue[] = [
    {
      id: 'RPT001',
      type: 'Customer Issue',
      description: 'Customer refused to pay cash on delivery',
      status: 'resolved',
      date: new Date('2025-01-10'),
      priority: 'medium'
    },
    {
      id: 'RPT002',
      type: 'App Technical Issue',
      description: 'App not showing new orders for 2 hours',
      status: 'in-progress',
      date: new Date('2025-01-12'),
      priority: 'high'
    },
    {
      id: 'RPT003',
      type: 'Safety Concern',
      description: 'Unsafe delivery location - no proper lighting',
      status: 'pending',
      date: new Date('2025-01-14'),
      priority: 'critical'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!selectedIssueType || !description.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSelectedIssueType('');
        setDescription('');
        setAttachments([]);
        setShowSuccess(false);
      }, 3000);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle size={14} />;
      case 'in-progress': return <Clock size={14} className="animate-spin" />;
      default: return <Clock size={14} />;
    }
  };

  if (showSuccess) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Issue Reported Successfully!</h3>
          <p className="text-gray-600 mb-4">
            Your report has been submitted with ID: <span className="font-mono font-bold">RPT{Date.now().toString().slice(-3)}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Our support team will review your issue and get back to you within 24 hours.
          </p>
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

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
          <AlertTriangle className="text-orange-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Report Issue</h2>
        </div>
        <div className="ml-auto">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {showHistory ? 'Hide History' : 'View History'}
          </button>
        </div>
      </div>

      {showHistory && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Previous Reports</h3>
          <div className="space-y-3">
            {reportHistory.map((issue) => (
              <div key={issue.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm text-gray-500">#{issue.id}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(issue.status)}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(issue.status)}
                          <span>{issue.status.replace('-', ' ').toUpperCase()}</span>
                        </div>
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-800">{issue.type}</h4>
                    <p className="text-sm text-gray-600">{issue.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {issue.date.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Issue Type Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">What type of issue are you facing?</h3>
        <div className="grid grid-cols-1 gap-3">
          {issueTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedIssueType(type.id)}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-colors ${
                selectedIssueType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl">{type.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{type.name}</h4>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(type.priority)}`}>
                {type.priority.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      {selectedIssueType && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Describe the issue in detail</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide as much detail as possible about the issue you're facing..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Be specific about when, where, and what happened</span>
            <span>{description.length}/500</span>
          </div>
        </div>
      )}

      {/* Attachments */}
      {selectedIssueType && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Add Photos (Optional)</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-3">Upload photos to help us understand the issue better</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Choose Photos
            </label>
          </div>
          
          {attachments.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-2">Attached Files:</h4>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      {selectedIssueType && description.trim() && (
        <div className="mb-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting Report...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Submit Issue Report</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-yellow-600" size={16} />
          <span className="font-semibold text-yellow-800">Important</span>
        </div>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• For urgent safety issues, use Emergency SOS or call helpline directly</li>
          <li>• Provide accurate information to help us resolve your issue quickly</li>
          <li>• You'll receive updates via SMS and app notifications</li>
          <li>• False reports may result in account penalties</li>
        </ul>
      </div>
    </div>
  );
}