import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, AlertTriangle, ArrowLeft, MapPin, Phone } from 'lucide-react';

interface TrackKitUniformProps {
  onClose: () => void;
}

export default function TrackKitUniform({ onClose }: TrackKitUniformProps) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const kitOrders = [
    {
      id: 'KIT001',
      type: 'Delivery Kit',
      items: ['Insulated Bag', 'Phone Holder', 'Charger', 'ID Card'],
      status: 'delivered',
      orderDate: '2025-01-10',
      deliveryDate: '2025-01-12',
      trackingId: 'TRK123456789',
      courierPartner: 'BlueDart',
      estimatedDelivery: '2025-01-12',
      currentLocation: 'Delivered to Partner',
      cost: 0,
      refundable: true
    },
    {
      id: 'UNI001',
      type: 'Uniform Set',
      items: ['T-Shirt (L)', 'Cap', 'Jacket', 'Reflective Vest'],
      status: 'in-transit',
      orderDate: '2025-01-14',
      deliveryDate: null,
      trackingId: 'TRK987654321',
      courierPartner: 'DTDC',
      estimatedDelivery: '2025-01-16',
      currentLocation: 'Pune Sorting Facility',
      cost: 500,
      refundable: false
    },
    {
      id: 'KIT002',
      type: 'Replacement Kit',
      items: ['New Insulated Bag', 'Backup Charger'],
      status: 'processing',
      orderDate: '2025-01-15',
      deliveryDate: null,
      trackingId: 'TRK456789123',
      courierPartner: 'Delhivery',
      estimatedDelivery: '2025-01-18',
      currentLocation: 'Order Processing',
      cost: 200,
      refundable: true
    }
  ];

  const availableItems = [
    {
      category: 'Delivery Kit',
      items: [
        { name: 'Insulated Delivery Bag', price: 800, image: '🎒', inStock: true },
        { name: 'Phone Holder', price: 300, image: '📱', inStock: true },
        { name: 'Portable Charger', price: 1200, image: '🔋', inStock: false },
        { name: 'LED Flashlight', price: 400, image: '🔦', inStock: true }
      ]
    },
    {
      category: 'Uniform',
      items: [
        { name: 'Company T-Shirt', price: 400, image: '👕', inStock: true },
        { name: 'Delivery Cap', price: 200, image: '🧢', inStock: true },
        { name: 'Rain Jacket', price: 800, image: '🧥', inStock: true },
        { name: 'Reflective Vest', price: 600, image: '🦺', inStock: false }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'in-transit': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={16} />;
      case 'in-transit': return <Truck size={16} />;
      case 'processing': return <Clock size={16} />;
      case 'cancelled': return <AlertTriangle size={16} />;
      default: return <Package size={16} />;
    }
  };

  const trackingSteps = [
    { step: 'Order Placed', completed: true, date: '2025-01-14 10:30 AM' },
    { step: 'Order Confirmed', completed: true, date: '2025-01-14 11:15 AM' },
    { step: 'Packed & Shipped', completed: true, date: '2025-01-14 6:20 PM' },
    { step: 'In Transit', completed: true, date: '2025-01-15 8:45 AM' },
    { step: 'Out for Delivery', completed: false, date: 'Expected: 2025-01-16 9:00 AM' },
    { step: 'Delivered', completed: false, date: 'Expected: 2025-01-16 6:00 PM' }
  ];

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
          <Package className="text-indigo-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Track Kit & Uniform</h2>
        </div>
      </div>

      {/* Active Orders */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Your Orders</h3>
        <div className="space-y-3">
          {kitOrders.map((order) => (
            <div
              key={order.id}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                selectedOrder === order.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:shadow-md'
              }`}
              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Package className="text-indigo-600" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">{order.type}</h4>
                    <p className="text-sm text-gray-600">Order #{order.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      <span>{order.status.replace('-', ' ').toUpperCase()}</span>
                    </div>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-600">Items</p>
                  <p className="font-medium">{order.items.join(', ')}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tracking ID</p>
                  <p className="font-mono font-medium">{order.trackingId}</p>
                </div>
              </div>

              {selectedOrder === order.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600">Courier Partner</p>
                      <p className="font-medium">{order.courierPartner}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Current Location</p>
                      <p className="font-medium">{order.currentLocation}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Order Date</p>
                      <p className="font-medium">{order.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Expected Delivery</p>
                      <p className="font-medium">{order.estimatedDelivery}</p>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-800 mb-2">Tracking Timeline</h5>
                    <div className="space-y-2">
                      {trackingSteps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            step.completed 
                              ? 'bg-green-500 border-green-500' 
                              : 'bg-white border-gray-300'
                          }`}>
                            {step.completed && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${step.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                              {step.step}
                            </p>
                            <p className="text-xs text-gray-500">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        alert(`📦 Tracking ${order.trackingId}...\n📍 Current location: ${order.currentLocation}\n🚚 Courier: ${order.courierPartner}`);
                        window.open(`https://www.google.com/search?q=track+${order.trackingId}+${order.courierPartner}`, '_blank');
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <MapPin size={16} className="inline mr-1" />
                      Track Live
                    </button>
                    <button 
                      onClick={() => {
                        const courierNumbers = {
                          'BlueDart': '1860-233-1234',
                          'DTDC': '1860-208-6400',
                          'Delhivery': '011-4747-4747'
                        };
                        const number = courierNumbers[order.courierPartner as keyof typeof courierNumbers] || '1800-XXX-XXXX';
                        if (confirm(`Call ${order.courierPartner} at ${number}?`)) {
                          window.location.href = `tel:${number}`;
                        }
                      }}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      <Phone size={16} className="inline mr-1" />
                      Contact Courier
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Items */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Order New Items</h3>
        {availableItems.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">{category.category}</h4>
            <div className="grid grid-cols-2 gap-3">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`border rounded-lg p-3 ${
                    item.inStock 
                      ? 'border-gray-200 hover:shadow-md cursor-pointer' 
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.image}</span>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800 text-sm">{item.name}</h5>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                  </div>
                  <button
                    disabled={!item.inStock}
                    onClick={() => {
                      if (item.inStock) {
                        if (confirm(`Order ${item.name} for ₹${item.price}?`)) {
                          alert(`✅ Order placed for ${item.name}!\n💰 Amount: ₹${item.price}\n🚚 Delivery in 3-5 days`);
                        }
                      }
                    }}
                    className={`w-full py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      item.inStock
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {item.inStock ? 'Order Now' : 'Out of Stock'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Important Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-yellow-600" size={16} />
          <span className="font-semibold text-yellow-800">Important Information</span>
        </div>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Delivery kit is mandatory for all partners</li>
          <li>• Uniform helps customers identify you easily</li>
          <li>• Damaged items can be replaced within 30 days</li>
          <li>• Free delivery for orders above ₹1000</li>
          <li>• Contact support for size exchanges</li>
        </ul>
      </div>

      {/* Support Contact */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
        <p className="text-sm text-blue-700 mb-3">
          For kit/uniform related queries, contact our support team
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => alert('💬 Opening chat support...')}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Chat Support
          </button>
          <button 
            onClick={() => {
              if (confirm('Call support at 1800-KIT-HELP?')) {
                window.location.href = 'tel:1800-548-4357';
              }
            }}
            className="flex-1 bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Call Support
          </button>
        </div>
      </div>
    </div>
  );
}