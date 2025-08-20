import React, { useState } from 'react';
import { Phone, Shield, MapPin, Clock, AlertTriangle, ArrowLeft, User, Zap } from 'lucide-react';

interface EmergencyHelplineProps {
  onClose: () => void;
}

export default function EmergencyHelpline({ onClose }: EmergencyHelplineProps) {
  const [sosActivated, setSosActivated] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [location, setLocation] = useState('Getting location...');

  const emergencyNumbers = [
    {
      type: 'Primary Support',
      number: '1800-XXX-XXXX',
      description: '24/7 Delivery Partner Support',
      icon: '🎧',
      priority: 'high'
    },
    {
      type: 'Emergency SOS',
      number: '1800-SOS-HELP',
      description: 'Immediate emergency assistance',
      icon: '🚨',
      priority: 'critical'
    },
    {
      type: 'Police',
      number: '100',
      description: 'Local police emergency',
      icon: '👮‍♂️',
      priority: 'critical'
    },
    {
      type: 'Medical Emergency',
      number: '108',
      description: 'Ambulance & medical help',
      icon: '🚑',
      priority: 'critical'
    },
    {
      type: 'Fire Emergency',
      number: '101',
      description: 'Fire department',
      icon: '🚒',
      priority: 'critical'
    }
  ];

  const emergencyTypes = [
    { id: 'accident', name: 'Road Accident', icon: '🚗', color: 'bg-red-100 text-red-700' },
    { id: 'theft', name: 'Theft/Robbery', icon: '🔒', color: 'bg-orange-100 text-orange-700' },
    { id: 'harassment', name: 'Harassment', icon: '⚠️', color: 'bg-purple-100 text-purple-700' },
    { id: 'medical', name: 'Medical Emergency', icon: '🏥', color: 'bg-blue-100 text-blue-700' },
    { id: 'vehicle', name: 'Vehicle Breakdown', icon: '🔧', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'other', name: 'Other Emergency', icon: '🆘', color: 'bg-gray-100 text-gray-700' }
  ];

  const handleCall = (number: string) => {
    if (confirm(`Call ${number}?`)) {
      window.location.href = `tel:${number}`;
    }
  };

  const activateSOS = () => {
    if (confirm('Activate Emergency SOS? This will alert emergency services and your contacts.')) {
      setSosActivated(true);
      // Simulate getting location
      setTimeout(() => {
        setLocation('Koregaon Park, Pune - 411001');
      }, 2000);
      
      // Auto-call emergency number after 5 seconds
      setTimeout(() => {
        if (confirm('Calling Emergency Services now. Continue?')) {
          handleCall('1800-SOS-HELP');
        }
      }, 5000);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      default: return 'border-blue-500 bg-blue-50';
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
          <Phone className="text-red-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">24/7 Emergency Helpline</h2>
        </div>
      </div>

      {/* SOS Alert */}
      {sosActivated ? (
        <div className="bg-red-100 border-2 border-red-500 rounded-xl p-6 mb-6 animate-pulse">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">SOS ACTIVATED</h3>
            <p className="text-red-700 mb-4">Emergency services have been notified</p>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="text-red-600" size={16} />
                <span className="font-medium text-gray-800">Your Location:</span>
              </div>
              <p className="text-gray-700">{location}</p>
            </div>
            <p className="text-sm text-red-600">Calling emergency helpline in 5 seconds...</p>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-bold text-red-800 mb-2">Emergency SOS</h3>
            <p className="text-red-700 mb-4">Press for immediate help in dangerous situations</p>
            <button
              onClick={activateSOS}
              className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg"
            >
              🆘 ACTIVATE SOS
            </button>
          </div>
        </div>
      )}

      {/* Emergency Type Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Select Emergency Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {emergencyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setEmergencyType(type.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                emergencyType === type.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{type.icon}</span>
              <span className="text-sm font-medium text-gray-800">{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Numbers */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Emergency Contact Numbers</h3>
        <div className="space-y-3">
          {emergencyNumbers.map((contact, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 ${getPriorityColor(contact.priority)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{contact.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{contact.type}</h4>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                    <p className="font-mono text-lg font-bold text-gray-800">{contact.number}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCall(contact.number)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    contact.priority === 'critical'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Phone size={16} className="inline mr-1" />
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-3">🛡️ Emergency Safety Tips</h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• Stay calm and assess the situation</li>
          <li>• Move to a safe location if possible</li>
          <li>• Share your live location with emergency contacts</li>
          <li>• Keep your phone charged and accessible</li>
          <li>• Don't hesitate to call for help</li>
          <li>• Follow local emergency protocols</li>
        </ul>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">👥 Your Emergency Contacts</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-white rounded">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-600" />
              <span className="text-sm">Rajesh Sharma (Brother)</span>
            </div>
            <button
              onClick={() => handleCall('+91-98765-43210')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Call
            </button>
          </div>
          <div className="flex items-center justify-between p-2 bg-white rounded">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-600" />
              <span className="text-sm">Priya Sharma (Wife)</span>
            </div>
            <button
              onClick={() => handleCall('+91-98765-43211')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Call
            </button>
          </div>
          <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2">
            + Add Emergency Contact
          </button>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-yellow-600" size={16} />
          <span className="font-semibold text-yellow-800">Important Notice</span>
        </div>
        <p className="text-sm text-yellow-700">
          This service is for genuine emergencies only. Misuse of emergency services may result in account suspension. 
          Your location and call details are logged for safety purposes.
        </p>
      </div>
    </div>
  );
}