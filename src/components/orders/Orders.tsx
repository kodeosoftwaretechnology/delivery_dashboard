import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  Package,
  Camera,
  CreditCard,
  AlertCircle,
  Wine,
  Shield
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export default function Orders() {
  const { t } = useLanguage();
  const { currentOrder, orderHistory, markPickedUp, markDelivered, reportIssue } = useApp();
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const handleNavigate = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleCallCustomer = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleMarkPickedUp = () => {
    if (currentOrder) {
      markPickedUp(currentOrder.id);
    }
  };

  const handleDeliveryComplete = async () => {
    if (currentOrder && enteredOtp) {
      const success = await markDelivered(currentOrder.id, enteredOtp);
      if (success) {
        setShowOtpModal(false);
        setEnteredOtp('');
      } else {
        alert('Invalid OTP! Please check and try again.');
      }
    }
  };

  const handleReportIssue = () => {
    if (currentOrder && issueCategory && issueDescription) {
      reportIssue(currentOrder.id, issueDescription, issueCategory);
      setShowIssueModal(false);
      setIssueCategory('');
      setIssueDescription('');
    }
  };

  const issueCategories = [
    'Customer not reachable',
    'Wrong address provided',
    'Customer refused delivery',
    'Damaged/Missing items',
    'Payment issue',
    'Vehicle breakdown',
    'Safety concern',
    'Other'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-orange-100 text-orange-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'picked_up': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'assigned': return 'Assigned';
      case 'accepted': return 'Accepted';
      case 'picked_up': return 'Picked Up';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  // OTP Modal
  const OtpModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Enter Delivery OTP</h2>
          <p className="text-gray-600 mb-4">
            Please ask the customer for the OTP and enter it below to complete the delivery.
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              4-Digit OTP
            </label>
            <input
              type="text"
              maxLength={4}
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl font-bold tracking-widest"
              placeholder="0000"
            />
            {currentOrder && (
              <p className="text-xs text-gray-500 mt-2">
                Correct OTP: {currentOrder.otp} (for demo purposes)
              </p>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowOtpModal(false);
                setEnteredOtp('');
              }}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeliveryComplete}
              disabled={enteredOtp.length !== 4}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Complete Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Issue Report Modal
  const IssueModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Report Issue</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Category
            </label>
            <div className="space-y-2">
              {issueCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setIssueCategory(category)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    issueCategory === category
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={3}
              placeholder="Please describe the issue in detail..."
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowIssueModal(false);
                setIssueCategory('');
                setIssueDescription('');
              }}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleReportIssue}
              disabled={!issueCategory || !issueDescription}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              Report Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const OrderCard = ({ order, showActions = false }: { order: any; showActions?: boolean }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Wine size={16} className="text-purple-600" />
            {order.vendorName}
          </h3>
          <p className="text-orange-600 font-semibold">₹{order.deliveryFee} delivery fee</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
          {showActions && (
            <button
              onClick={() => handleCallCustomer(order.customerPhone)}
              className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors"
            >
              <Phone size={16} className="text-green-600" />
            </button>
          )}
        </div>
      </div>

      {/* Liquor Items */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
        <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
          <Wine size={16} />
          Liquor Items (Total: ₹{order.totalAmount})
        </h4>
        {order.items.map((item: any, index: number) => (
          <div key={index} className="flex justify-between text-sm text-purple-700">
            <span>{item.name} x{item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          <Package size={16} className="text-gray-500 mt-0.5" />
          <div className="text-sm text-gray-700 flex-1">
            <p className="font-medium">Pickup Address</p>
            <p>{order.vendorAddress}</p>
          </div>
          {showActions && (
            <button
              onClick={() => handleNavigate(order.vendorAddress)}
              className="ml-auto bg-blue-100 p-1 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Navigation size={14} className="text-blue-600" />
            </button>
          )}
        </div>

        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-gray-500 mt-0.5" />
          <div className="text-sm text-gray-700 flex-1">
            <p className="font-medium">Delivery Address</p>
            <p>{order.customerAddress}</p>
          </div>
          {showActions && (
            <button
              onClick={() => handleNavigate(order.customerAddress)}
              className="ml-auto bg-blue-100 p-1 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Navigation size={14} className="text-blue-600" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">{order.estimatedTime} • {order.distance}</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">
              {order.paymentMethod === 'online' ? '💳 Online Paid' : '💵 Cash on Delivery'}
            </span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-3">
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Phone:</strong> {order.customerPhone}</p>
      </div>

      {showActions && (
        <div className="space-y-2">
          {order.status === 'accepted' && (
            <button
              onClick={handleMarkPickedUp}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Mark as Picked Up
            </button>
          )}
          
          {order.status === 'picked_up' && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowOtpModal(true)}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Complete Delivery
              </button>
              <button
                onClick={() => setShowIssueModal(true)}
                className="bg-red-100 text-red-600 py-2 px-4 rounded-lg font-semibold hover:bg-red-200 transition-colors"
              >
                <AlertCircle size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Age Verification Warning */}
      {showActions && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
          <div className="flex items-center gap-2">
            <Shield className="text-yellow-600" size={16} />
            <span className="text-sm font-semibold text-yellow-800">Age Verification Required</span>
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            Ensure customer is 21+ years old. Check valid ID before delivery.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('orders')}</h1>

      {/* Tab Navigation */}
      <div className="flex mb-6 bg-white rounded-xl p-1 shadow-sm">
        <button
          onClick={() => setActiveTab('current')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
            activeTab === 'current'
              ? 'bg-orange-600 text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Current Order {currentOrder ? '(1)' : '(0)'}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
            activeTab === 'history'
              ? 'bg-orange-600 text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Order History ({orderHistory.length})
        </button>
      </div>

      {/* Orders List */}
      <div>
        {activeTab === 'current' ? (
          currentOrder ? (
            <OrderCard order={currentOrder} showActions={true} />
          ) : (
            <div className="text-center py-12">
              <Package size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No current orders</p>
              <p className="text-sm text-gray-400">Go online to receive liquor delivery orders</p>
            </div>
          )
        ) : (
          orderHistory.length > 0 ? (
            orderHistory.map(order => (
              <OrderCard key={order.id} order={order} showActions={false} />
            ))
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No completed orders</p>
              <p className="text-sm text-gray-400">Your delivery history will appear here</p>
            </div>
          )
        )}
      </div>

      {/* Modals */}
      {showOtpModal && <OtpModal />}
      {showIssueModal && <IssueModal />}
    </div>
  );
}