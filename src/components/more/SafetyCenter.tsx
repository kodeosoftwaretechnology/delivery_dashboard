import React, { useState } from 'react';
import { Shield, Phone, MapPin, AlertTriangle, Users, Clock } from 'lucide-react';

export default function SafetyCenter() {
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Wife - Priya', phone: '+919876543211' },
    { name: 'Brother - Suresh', phone: '+919876543212' }
  ]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Safety Center</h1>

      {/* Emergency SOS */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
        <div className="text-center">
          <Shield className="text-red-600 mx-auto mb-3" size={48} />
          <h2 className="text-xl font-bold text-red-800 mb-2">Emergency SOS</h2>
          <p className="text-red-700 mb-4">Press and hold for 3 seconds in emergency</p>
          <button className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors">
            EMERGENCY SOS
          </button>
        </div>
      </div>

      {/* Live Location Sharing */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin className="text-blue-600" size={20} />
          Live Location Sharing
        </h3>
        <p className="text-gray-600 mb-4">Share your live location with family during deliveries</p>
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Start Sharing
          </button>
          <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            Stop Sharing
          </button>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="text-green-600" size={20} />
          Emergency Contacts
        </h3>
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                <Phone size={16} />
              </button>
            </div>
          ))}
          <button className="w-full bg-blue-100 text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
            + Add Emergency Contact
          </button>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-yellow-600" size={20} />
          Safety Tips
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <p>Always verify customer ID for liquor deliveries (21+ required)</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <p>Keep your phone charged and GPS enabled during deliveries</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <p>Avoid delivering to suspicious locations or customers</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <p>Report any safety concerns immediately to support</p>
          </div>
        </div>
      </div>
    </div>
  );
}