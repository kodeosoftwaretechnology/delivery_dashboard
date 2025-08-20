import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface RegisterPageProps {
  onNavigateToLogin: () => void;
}

export default function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: '',
    profilePhoto: null as File | null,
    drivingLicenseFront: null as File | null,
    drivingLicenseBack: null as File | null,
    liquorLicense: null as File | null,
    proofOfAddress: null as File | null,
    bikeModel: '',
    licensePlate: '',
    bikeRegistration: null as File | null,
    bikeInsurance: null as File | null,
    acceptTerms: false
  });

  const handleFileChange = (field: string, file: File | null) => {
    setFormData({...formData, [field]: file});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log('Registration:', formData);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
        <input
          type="tel"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.mobile}
          onChange={(e) => setFormData({...formData, mobile: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email ID *</label>
        <input
          type="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
        <input
          type="password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
        <input
          type="date"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address *</label>
        <textarea
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          rows={3}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Documents Upload</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo *</label>
        <input
          type="file"
          accept="image/*"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleFileChange('profilePhoto', e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Driving License (Front) *</label>
        <input
          type="file"
          accept="image/*"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleFileChange('drivingLicenseFront', e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Driving License (Back) *</label>
        <input
          type="file"
          accept="image/*"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleFileChange('drivingLicenseBack', e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Liquor Carrying License *</label>
        <input
          type="file"
          accept="image/*"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleFileChange('liquorLicense', e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Proof of Address *</label>
        <input
          type="file"
          accept="image/*"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleFileChange('proofOfAddress', e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Bike Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bike Model *</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.bikeModel}
          onChange={(e) => setFormData({...formData, bikeModel: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">License Plate Number *</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.licensePlate}
          onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bike Registration Certificate *</label>
        <input
          type="file"
          accept="image/*"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleFileChange('bikeRegistration', e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bike Insurance Details *</label>
        <input
          type="file"
          accept="image/*"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleFileChange('bikeInsurance', e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
      
      <div className="bg-gray-50 p-4 rounded-md max-h-40 overflow-y-auto">
        <p className="text-sm text-gray-700">
          By registering as a delivery partner with Peghouse.in, you agree to:
          1. Comply with all local laws and regulations
          2. Maintain valid licenses and insurance
          3. Provide safe and timely delivery services
          4. Handle liquor deliveries responsibly
          5. Maintain professional conduct
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="acceptTerms"
          required
          className="mr-2"
          checked={formData.acceptTerms}
          onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
        />
        <label htmlFor="acceptTerms" className="text-sm text-gray-700">
          I accept the Terms & Conditions *
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Delivery Partner Registration</h1>
          <div className="flex justify-center mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center mx-1 ${
                i <= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {i}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-auto"
            >
              {step < 4 ? 'Next' : 'Register'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={onNavigateToLogin}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}