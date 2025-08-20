import React, { useState } from 'react';
import { 
  User, 
  Users, 
  HelpCircle, 
  Package, 
  Gift, 
  Settings, 
  LogOut, 
  Shield,
  Map,
  BookOpen,
  Star,
  MessageCircle,
  TrendingUp,
  Zap,
  ChevronRight,
  Phone,
  Mail,
  CreditCard,
  FileText,
  Award,
  Camera,
  Bell,
  Globe,
  Battery,
  Wifi,
  Navigation,
  Clock,
  Target,
  Heart,
  Coffee,
  Headphones,
  AlertTriangle,
  CheckCircle,
  Upload,
  Download,
  Share2,
  Calculator,
  Flashlight,
  Edit3,
  QrCode,
  Wine,
  Truck,
  MapPin,
  DollarSign,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import SafetyCenter from './SafetyCenter';
import AppSettings from './AppSettings';
import LanguageSettings from './LanguageSettings';
import BatteryOptimization from './BatteryOptimization';
import OfflineMode from './OfflineMode';
import AppUpdates from './AppUpdates';
import HelpCenter from './HelpCenter';
import ChatSupport from './ChatSupport';
import EmergencyHelpline from './EmergencyHelpline';
import ReportIssue from './ReportIssue';
import HeatMapDemand from './HeatMapDemand';
import TrackKitUniform from './TrackKitUniform';
import RouteOptimizer from './RouteOptimizer';
import QRScanner from './QRScanner';
import EarningsCalculator from './EarningsCalculator';
import FlashlightComponent from './Flashlight';
import SpecialBenefits from './SpecialBenefits';
import PerformanceDashboard from './PerformanceDashboard';
import IncentiveCalculator from './IncentiveCalculator';
import AchievementsBadges from './AchievementsBadges';

interface MoreSectionProps {
  onLogout?: () => void;
}

export default function MoreSection({ onLogout }: MoreSectionProps) {
  const { t } = useLanguage();
  const { partner, contactSupport, updatePartnerProfile } = useApp();
  const [showProfile, setShowProfile] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showLanguageSettings, setShowLanguageSettings] = useState(false);
  const [showBatteryOptimization, setShowBatteryOptimization] = useState(false);
  const [showOfflineMode, setShowOfflineMode] = useState(false);
  const [showAppUpdates, setShowAppUpdates] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showChatSupport, setShowChatSupport] = useState(false);
  const [showEmergencyHelpline, setShowEmergencyHelpline] = useState(false);
  const [showReportIssue, setShowReportIssue] = useState(false);
  const [showTrackKit, setShowTrackKit] = useState(false);
  const [showRouteOptimizer, setShowRouteOptimizer] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showEarningsCalc, setShowEarningsCalc] = useState(false);
  const [showFlashlight, setShowFlashlight] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showSpecialBenefits, setShowSpecialBenefits] = useState(false);
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(false);
  const [showIncentiveCalculator, setShowIncentiveCalculator] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: partner.name,
    mobile: partner.mobile,
    email: partner.email,
    bikeModel: partner.bikeModel,
    licensePlate: partner.licensePlate
  });

  const menuItems = [
    {
      category: 'Account & Profile',
      items: [
        { icon: User, label: 'My Profile', action: () => setShowProfile(true), color: 'bg-blue-100 text-blue-600' },
        { icon: FileText, label: 'Documents & KYC', action: () => setShowDocuments(true), color: 'bg-green-100 text-green-600' },
        { icon: Settings, label: 'App Settings', action: () => setShowSettings(true), color: 'bg-gray-100 text-gray-600' },
        { icon: Bell, label: 'Notification Settings', action: () => setShowNotificationSettings(true), color: 'bg-orange-100 text-orange-600' }
      ]
    },
    {
      category: 'Earnings & Benefits',
      items: [
        { icon: Users, label: 'Refer & Earn', action: () => setShowReferral(true), color: 'bg-purple-100 text-purple-600' },
        { icon: Gift, label: 'Special Benefits', action: () => setShowSpecialBenefits(true), color: 'bg-pink-100 text-pink-600' },
        { icon: TrendingUp, label: 'Performance Dashboard', action: () => setShowPerformanceDashboard(true), color: 'bg-green-100 text-green-600' },
        { icon: Zap, label: 'Incentive Calculator', action: () => setShowIncentiveCalculator(true), color: 'bg-yellow-100 text-yellow-600' },
        { icon: CreditCard, label: 'Payment & Bank Details', action: () => setShowPayment(true), color: 'bg-blue-100 text-blue-600' },
        { icon: Award, label: 'Achievements & Badges', action: () => setShowAchievements(true), color: 'bg-orange-100 text-orange-600' }
      ]
    },
    {
      category: 'Tools & Features',
      items: [
        { icon: Map, label: 'Heat Map & Demand Zones', action: () => setShowHeatMap(true), color: 'bg-red-100 text-red-600' },
        { icon: Package, label: 'Track Kit & Uniform', action: () => setShowTrackKit(true), color: 'bg-indigo-100 text-indigo-600' },
        { icon: Navigation, label: 'Route Optimizer', action: () => setShowRouteOptimizer(true), color: 'bg-blue-100 text-blue-600' },
        { icon: QrCode, label: 'QR Code Scanner', action: () => setShowQRScanner(true), color: 'bg-gray-100 text-gray-600' },
        { icon: Calculator, label: 'Earnings Calculator', action: () => setShowEarningsCalc(true), color: 'bg-green-100 text-green-600' },
        { icon: Flashlight, label: 'Flashlight', action: () => setShowFlashlight(true), color: 'bg-yellow-100 text-yellow-600' }
      ]
    },
    {
      category: 'Learning & Development',
      items: [
        { icon: BookOpen, label: 'Training Center', action: () => setShowTraining(true), color: 'bg-blue-100 text-blue-600' },
        { icon: Wine, label: 'Liquor Delivery Guidelines', action: () => setShowTraining(true), color: 'bg-purple-100 text-purple-600' },
        { icon: Shield, label: 'Safety Training', action: () => setShowTraining(true), color: 'bg-red-100 text-red-600' },
        { icon: Star, label: 'Customer Service Excellence', action: () => setShowTraining(true), color: 'bg-yellow-100 text-yellow-600' }
      ]
    },
    {
      category: 'Support & Safety',
      items: [
        { icon: Shield, label: 'Safety Center', action: () => setShowSafety(true), color: 'bg-red-100 text-red-600' },
        { icon: HelpCircle, label: 'Help Center & FAQ', action: () => setShowHelpCenter(true), color: 'bg-blue-100 text-blue-600' },
        { icon: MessageCircle, label: 'Chat with Support', action: () => setShowChatSupport(true), color: 'bg-green-100 text-green-600' },
        { icon: Phone, label: '24/7 Emergency Helpline', action: () => setShowEmergencyHelpline(true), color: 'bg-red-100 text-red-600' },
        { icon: AlertTriangle, label: 'Report Issue', action: () => setShowReportIssue(true), color: 'bg-orange-100 text-orange-600' }
      ]
    },
    {
      category: 'App Features',
      items: [
        { icon: Globe, label: 'Language Settings', action: () => setShowLanguageSettings(true), color: 'bg-blue-100 text-blue-600' },
        { icon: Battery, label: 'Battery Optimization', action: () => setShowBatteryOptimization(true), color: 'bg-green-100 text-green-600' },
        { icon: Wifi, label: 'Offline Mode', action: () => setShowOfflineMode(true), color: 'bg-gray-100 text-gray-600' },
        { icon: Download, label: 'App Updates', action: () => setShowAppUpdates(true), color: 'bg-purple-100 text-purple-600' }
      ]
    }
  ];

  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowProfile(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Delivery Partner Profile</h2>
          </div>
          
          <div className="text-center mb-6">
            <img 
              src={partner.profilePhoto} 
              alt="Profile" 
              className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-orange-200"
            />
            <h3 className="font-semibold text-lg">{partner.name}</h3>
            <p className="text-gray-600">Partner ID: {partner.id}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="text-yellow-500 fill-current" size={16} />
              <span className="font-semibold">{partner.rating}</span>
              <span className="text-gray-500">({partner.totalDeliveries} deliveries)</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                partner.verificationStatus === 'approved' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {partner.verificationStatus === 'approved' ? '✓ Verified' : 'Pending Verification'}
              </span>
            </div>
            <button
              onClick={() => {
                setIsEditingProfile(true);
                setEditedProfile({
                  name: partner.name,
                  mobile: partner.mobile,
                  email: partner.email,
                  bikeModel: partner.bikeModel,
                  licensePlate: partner.licensePlate
                });
              }}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          </div>

          {!isEditingProfile ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Phone</span>
                <span className="font-semibold">{partner.mobile}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Email</span>
                <span className="font-semibold">{partner.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Vehicle</span>
                <span className="font-semibold">{partner.bikeModel}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">License Plate</span>
                <span className="font-semibold">{partner.licensePlate}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Driving License</span>
                <span className="font-semibold">{partner.drivingLicense}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Liquor License</span>
                <span className="font-semibold text-purple-600">{partner.liquorLicense}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Total Deliveries</span>
                <span className="font-semibold text-green-600">{partner.totalDeliveries}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editedProfile.mobile}
                  onChange={(e) => setEditedProfile({...editedProfile, mobile: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model</label>
                <input
                  type="text"
                  value={editedProfile.bikeModel}
                  onChange={(e) => setEditedProfile({...editedProfile, bikeModel: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter vehicle model"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                <input
                  type="text"
                  value={editedProfile.licensePlate}
                  onChange={(e) => setEditedProfile({...editedProfile, licensePlate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter license plate number"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    if (confirm('Save profile changes?')) {
                      updatePartnerProfile(editedProfile);
                      setIsEditingProfile(false);
                      alert('Profile updated successfully! ✅');
                    }
                  }}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!isEditingProfile && (
            <button
              onClick={() => setShowProfile(false)}
              className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const DocumentsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowDocuments(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Documents & KYC Status</h2>
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText size={16} />
                  Driving License
                </h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Verified</span>
              </div>
              <p className="text-sm text-gray-600">License No: {partner.drivingLicense}</p>
              <p className="text-xs text-gray-500">Expires: Dec 2027</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Wine size={16} className="text-purple-600" />
                  Liquor Carrying License
                </h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Verified</span>
              </div>
              <p className="text-sm text-gray-600">License No: {partner.liquorLicense}</p>
              <p className="text-xs text-gray-500">Expires: Jun 2025</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Truck size={16} />
                  Vehicle Registration
                </h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Verified</span>
              </div>
              <p className="text-sm text-gray-600">Vehicle: {partner.bikeModel}</p>
              <p className="text-sm text-gray-600">Plate: {partner.licensePlate}</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield size={16} />
                  Vehicle Insurance
                </h3>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Expires Soon</span>
              </div>
              <p className="text-sm text-gray-600">Policy No: INS123456789</p>
              <p className="text-xs text-red-500">Expires: Feb 2025</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User size={16} />
                  Identity Proof (Aadhar)
                </h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Verified</span>
              </div>
              <p className="text-sm text-gray-600">Aadhar: XXXX-XXXX-1234</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-yellow-600" size={16} />
              <span className="font-semibold text-yellow-800">Action Required</span>
            </div>
            <p className="text-sm text-yellow-700">
              Your vehicle insurance expires in 1 month. Please renew to continue deliveries.
            </p>
            <button 
              onClick={() => alert('Insurance upload feature coming soon!')}
              className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-colors"
            >
              Upload New Insurance
            </button>
          </div>

          <button
            onClick={() => setShowDocuments(false)}
            className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );



  const TrainingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowTraining(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Training Center</h2>
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Wine className="text-purple-600" size={16} />
                  Liquor Delivery Guidelines
                </h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completed</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Learn legal requirements for liquor delivery</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-full"></div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="text-red-600" size={16} />
                  Age Verification Process
                </h3>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">In Progress</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">How to verify customer age (21+) properly</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Star className="text-yellow-600" size={16} />
                  Customer Service Excellence
                </h3>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">Not Started</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Professional customer interaction techniques</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-300 h-2 rounded-full w-0"></div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="text-red-600" size={16} />
                  Safety & Emergency Procedures
                </h3>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Mandatory</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Emergency protocols and safety measures</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-purple-800 mb-2">🏆 Certification Benefits</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• ₹500 bonus on course completion</li>
              <li>• Priority order assignment</li>
              <li>• Higher customer ratings</li>
              <li>• Legal compliance certification</li>
            </ul>
          </div>

          <button
            onClick={() => setShowTraining(false)}
            className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const ReferralModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowReferral(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Refer & Earn Program</h2>
          </div>
          
          <div className="text-center mb-6">
            <div className="bg-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-4">
              <Users size={48} className="text-purple-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Earn ₹1000 per Referral!</h3>
            <p className="text-gray-600 text-sm">
              Invite friends to join as delivery partners and earn rewards
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Share2 size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Share Referral Code</p>
                <p className="text-xs text-gray-600">Your code: RAJESH2025</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Friend Joins & Completes KYC</p>
                <p className="text-xs text-gray-600">They get ₹500 signup bonus</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full">
                <DollarSign size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">You Both Earn!</p>
                <p className="text-xs text-gray-600">₹1000 after their 10th delivery</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-purple-800 mb-2">Your Referral Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-xs text-purple-700">Total Referrals</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">₹3000</div>
                <div className="text-xs text-green-700">Earned</div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              navigator.clipboard.writeText('RAJESH2025');
              alert('Referral code copied! Share with friends: RAJESH2025');
            }}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-3"
          >
            Share Referral Code
          </button>

          <button
            onClick={() => setShowReferral(false)}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const ToolsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowTools(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Delivery Tools</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
              <QrCode className="text-gray-600 mx-auto mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">QR Scanner</span>
            </button>
            
            <button className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition-colors">
              <Calculator className="text-green-600 mx-auto mb-2" size={24} />
              <span className="text-sm font-medium text-green-700">Calculator</span>
            </button>
            
            <button className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center hover:bg-yellow-100 transition-colors">
              <Flashlight className="text-yellow-600 mx-auto mb-2" size={24} />
              <span className="text-sm font-medium text-yellow-700">Flashlight</span>
            </button>
            
            <button className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors">
              <Edit3 className="text-blue-600 mx-auto mb-2" size={24} />
              <span className="text-sm font-medium text-blue-700">Notepad</span>
            </button>
          </div>

          <button
            onClick={() => setShowTools(false)}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const SupportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowSupport(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Help & Support</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
              <div className="space-y-2 text-sm">
                <details className="cursor-pointer">
                  <summary className="font-medium text-gray-700">How do I verify customer age for liquor delivery?</summary>
                  <p className="text-gray-600 mt-1">Always check valid government ID. Customer must be 21+ years old.</p>
                </details>
                <details className="cursor-pointer">
                  <summary className="font-medium text-gray-700">What if customer refuses to show ID?</summary>
                  <p className="text-gray-600 mt-1">Do not deliver. Contact support immediately and report the issue.</p>
                </details>
                <details className="cursor-pointer">
                  <summary className="font-medium text-gray-700">How are earnings calculated?</summary>
                  <p className="text-gray-600 mt-1">Base fee + distance + surge pricing + bonuses = total earnings.</p>
                </details>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Contact Support</h3>
              <div className="space-y-2">
                <button className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg font-semibold hover:bg-green-200 transition-colors">
                  <MessageCircle size={16} className="inline mr-2" />
                  Live Chat
                </button>
                <button className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
                  <Phone size={16} className="inline mr-2" />
                  Call Support
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  <Mail size={16} className="inline mr-2" />
                  Email Support
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSupport(false)}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const SafetyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-2">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Safety Center</h2>
            <button
              onClick={() => setShowSafety(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <SafetyCenter />
        </div>
      </div>
    </div>
  );

  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-2">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">App Settings</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <AppSettings />
        </div>
      </div>
    </div>
  );

  const LanguageSettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <LanguageSettings onClose={() => setShowLanguageSettings(false)} />
      </div>
    </div>
  );

  const BatteryOptimizationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <BatteryOptimization onClose={() => setShowBatteryOptimization(false)} />
      </div>
    </div>
  );

  const OfflineModeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <OfflineMode onClose={() => setShowOfflineMode(false)} />
      </div>
    </div>
  );

  const AppUpdatesModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <AppUpdates onClose={() => setShowAppUpdates(false)} />
      </div>
    </div>
  );

  const HelpCenterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <HelpCenter onClose={() => setShowHelpCenter(false)} />
      </div>
    </div>
  );

  const ChatSupportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <ChatSupport onClose={() => setShowChatSupport(false)} />
      </div>
    </div>
  );

  const EmergencyHelplineModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <EmergencyHelpline onClose={() => setShowEmergencyHelpline(false)} />
      </div>
    </div>
  );

  const ReportIssueModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <ReportIssue onClose={() => setShowReportIssue(false)} />
      </div>
    </div>
  );

  const HeatMapModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <HeatMapDemand onClose={() => setShowHeatMap(false)} />
      </div>
    </div>
  );

  const TrackKitModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <TrackKitUniform onClose={() => setShowTrackKit(false)} />
      </div>
    </div>
  );

  const RouteOptimizerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <RouteOptimizer onClose={() => setShowRouteOptimizer(false)} />
      </div>
    </div>
  );

  const QRScannerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <QRScanner onClose={() => setShowQRScanner(false)} />
      </div>
    </div>
  );

  const EarningsCalcModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <EarningsCalculator onClose={() => setShowEarningsCalc(false)} />
      </div>
    </div>
  );

  const FlashlightModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full h-full">
        <FlashlightComponent onClose={() => setShowFlashlight(false)} />
      </div>
    </div>
  );

  const NotificationSettingsModal = () => {
    const [notifications, setNotifications] = useState({
      newOrders: true,
      orderUpdates: true,
      earnings: true,
      promotions: false,
      appUpdates: true,
      emergencyAlerts: true,
      sound: true,
      vibration: true,
      pushNotifications: true,
      emailNotifications: false,
      smsNotifications: true
    });

    const toggleNotification = (key: string) => {
      setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setShowNotificationSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h2 className="text-xl font-bold text-gray-800">Notification Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-800 mb-3">Order Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">New Orders</span>
                    <button
                      onClick={() => toggleNotification('newOrders')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.newOrders ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.newOrders ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Order Updates</span>
                    <button
                      onClick={() => toggleNotification('orderUpdates')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.orderUpdates ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-800 mb-3">App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Earnings Updates</span>
                    <button
                      onClick={() => toggleNotification('earnings')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.earnings ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.earnings ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Promotions & Offers</span>
                    <button
                      onClick={() => toggleNotification('promotions')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.promotions ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.promotions ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">App Updates</span>
                    <button
                      onClick={() => toggleNotification('appUpdates')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.appUpdates ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.appUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-red-600">Emergency Alerts</span>
                    <button
                      onClick={() => toggleNotification('emergencyAlerts')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.emergencyAlerts ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.emergencyAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-800 mb-3">Notification Style</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Sound</span>
                    <button
                      onClick={() => toggleNotification('sound')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.sound ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.sound ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Vibration</span>
                    <button
                      onClick={() => toggleNotification('vibration')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.vibration ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.vibration ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Delivery Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Push Notifications</span>
                    <button
                      onClick={() => toggleNotification('pushNotifications')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.pushNotifications ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email Notifications</span>
                    <button
                      onClick={() => toggleNotification('emailNotifications')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.emailNotifications ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">SMS Notifications</span>
                    <button
                      onClick={() => toggleNotification('smsNotifications')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.smsNotifications ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  alert('Notification settings saved! 🔔');
                  setShowNotificationSettings(false);
                }}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Save Settings
              </button>
              <button
                onClick={() => setShowNotificationSettings(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowPayment(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Payment & Bank Details</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Enter account holder name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Enter account number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Enter IFSC code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Enter bank name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Enter UPI ID"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                if (confirm('Save payment details?')) {
                  alert('Payment details saved successfully! 💳');
                  setShowPayment(false);
                }
              }}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setShowPayment(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('more')}</h1>

      {menuItems.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">{category.category}</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {category.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <button
                  key={itemIndex}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-medium text-gray-800">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div className="bg-white rounded-xl shadow-sm">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600"
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <LogOut size={20} className="text-red-600" />
            </div>
            <span className="font-medium">{t('logout')}</span>
          </div>
          <ChevronRight size={20} className="text-red-400" />
        </button>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-6">
        <div className="flex items-center gap-3 mb-2">
          <Phone className="text-red-600" size={20} />
          <h3 className="font-semibold text-red-800">24/7 Emergency Support</h3>
        </div>
        <p className="text-red-700 text-sm mb-3">For urgent delivery issues or safety concerns</p>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowEmergencyHelpline(true)}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Emergency Call
          </button>
          <button className="flex-1 bg-white text-red-600 border border-red-600 py-2 px-4 rounded-lg font-semibold hover:bg-red-50 transition-colors">
            SOS Alert
          </button>
        </div>
      </div>

      {/* Modals */}
      {showProfile && <ProfileModal />}
      {showDocuments && <DocumentsModal />}
      {showNotificationSettings && <NotificationSettingsModal />}
      {showHeatMap && <HeatMapModal />}
      {showTraining && <TrainingModal />}
      {showSupport && <SupportModal />}
      {showReferral && <ReferralModal />}
      {showTools && <ToolsModal />}
      {showSafety && <SafetyModal />}
      {showSettings && <SettingsModal />}
      {showPayment && <PaymentModal />}
      {showLanguageSettings && <LanguageSettingsModal />}
      {showBatteryOptimization && <BatteryOptimizationModal />}
      {showOfflineMode && <OfflineModeModal />}
      {showAppUpdates && <AppUpdatesModal />}
      {showHelpCenter && <HelpCenterModal />}
      {showChatSupport && <ChatSupportModal />}
      {showEmergencyHelpline && <EmergencyHelplineModal />}
      {showReportIssue && <ReportIssueModal />}
      {showHeatMap && <HeatMapModal />}
      {showTrackKit && <TrackKitModal />}
      {showRouteOptimizer && <RouteOptimizerModal />}
      {showQRScanner && <QRScannerModal />}
      {showEarningsCalc && <EarningsCalcModal />}
      {showFlashlight && <FlashlightModal />}
      {showSpecialBenefits && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <SpecialBenefits onClose={() => setShowSpecialBenefits(false)} />
          </div>
        </div>
      )}
      {showPerformanceDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <PerformanceDashboard onClose={() => setShowPerformanceDashboard(false)} />
          </div>
        </div>
      )}
      {showIncentiveCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <IncentiveCalculator onClose={() => setShowIncentiveCalculator(false)} />
          </div>
        </div>
      )}
      {showAchievements && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <AchievementsBadges onClose={() => setShowAchievements(false)} />
          </div>
        </div>
      )}
    </div>
  );
}