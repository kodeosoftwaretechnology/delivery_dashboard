import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Star } from 'lucide-react';

export default function DeliveryPartnerProfile() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'राजेश कुमार',
    phone: '+919876543210',
    email: 'rajesh@example.com',
  });

  const nameRef = useRef<HTMLInputElement>(null);

  // Focus only once when editing starts
  useEffect(() => {
    if (editing && nameRef.current) {
      nameRef.current.focus();
    }
  }, [editing]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSave = () => {
    setEditing(false);
    console.log('Saved Data:', formData);
    // Optionally call API here to update backend
  };

  const handleCancel = () => {
    setEditing(false);
    // Optionally reset to original data
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6 text-center relative">
        {/* Back Arrow */}
        <button className="absolute top-4 left-4 text-gray-500 text-lg">&larr;</button>

        {/* Profile Photo */}
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-orange-300"
        />

        {/* Name and ID */}
        <h2 className="text-xl font-bold mt-3">{formData.name}</h2>
        <p className="text-sm text-gray-600 mb-1">Partner ID: DP001</p>

        {/* Rating */}
        <div className="flex justify-center items-center gap-1 text-yellow-600 mb-2">
          <Star size={16} fill="currentColor" />
          <span className="font-semibold text-gray-800">4.8</span>
          <span className="text-gray-500">(247 deliveries)</span>
        </div>

        {/* Verified Badge */}
        <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full inline-block mb-3">✔ Verified</span>

        {/* Edit Button or Form */}
        {!editing ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <div key="edit-form" className="mt-4 text-left space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  name="name"
                  ref={nameRef}
                  value={formData.name}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                  autoComplete="name"
                  className="w-full border border-gray-300 mt-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                  autoComplete="tel"
                  className="w-full border border-gray-300 mt-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                  autoComplete="email"
                  className="w-full border border-gray-300 mt-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mt-5">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
