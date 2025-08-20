import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DeliveryPartner {
  id: string;
  name: string;
  mobile: string;
  email: string;
  profilePhoto: string;
  drivingLicense: string;
  liquorLicense: string;
  bikeModel: string;
  licensePlate: string;
  verificationStatus: 'pending' | 'under_review' | 'approved' | 'rejected';
  rating: number;
  totalDeliveries: number;
  acceptanceRate: number;
  completionRate: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  totalReviews: number;
}

interface Order {
  id: string;
  vendorName: string;
  vendorAddress: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  deliveryFee: number;
  status: 'assigned' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled';
  otp: string;
  estimatedTime: string;
  distance: string;
  paymentMethod: 'cash' | 'online';
  assignedAt: string;
  acceptedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
}

interface Earning {
  id: string;
  orderId: string;
  date: string;
  deliveryFee: number;
  bonus: number;
  total: number;
  type: 'delivery' | 'bonus' | 'incentive';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'earning' | 'system' | 'safety' | 'bonus';
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  zone: string;
  earnings: number;
  status: 'available' | 'booked' | 'completed' | 'cancelled';
  demandLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  surgeMultiplier?: number;
}

interface AppContextType {
  // Partner Status
  isOnline: boolean;
  setIsOnline: (status: boolean) => void;
  partner: DeliveryPartner;
  updatePartnerProfile: (updates: Partial<DeliveryPartner>) => void;
  
  // Selfie Verification
  requiresSelfie: boolean;
  setRequiresSelfie: (required: boolean) => void;
  takeSelfie: () => Promise<boolean>;
  
  // Orders
  currentOrder: Order | null;
  orderHistory: Order[];
  acceptOrder: (orderId: string) => void;
  rejectOrder: (orderId: string, reason: string) => void;
  markPickedUp: (orderId: string) => void;
  markDelivered: (orderId: string, otp: string) => Promise<boolean>;
  
  // Ratings
  rateCustomer: (orderId: string, rating: number, feedback?: string) => void;
  showCustomerRating: boolean;
  setShowCustomerRating: (show: boolean) => void;
  pendingCustomerRating: { orderId: string; customerName: string } | null;
  
  // Earnings
  todayEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  earnings: Earning[];
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  
  // Performance
  performanceMetrics: {
    acceptanceRate: number;
    completionRate: number;
    averageRating: number;
    totalDeliveries: number;
    onTimeDeliveries: number;
  };
  
  // Shifts
  shifts: Shift[];
  bookShift: (shiftId: string) => void;
  
  // Support & Help
  reportIssue: (orderId: string, issue: string, category: string) => void;
  contactSupport: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock Data
const mockPartner: DeliveryPartner = {
  id: 'DP001',
  name: 'राजेश कुमार',
  mobile: '+919876543210',
  email: 'rajesh@example.com',
  profilePhoto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  drivingLicense: 'MH12AB1234567',
  liquorLicense: 'LQ2024001',
  bikeModel: 'Honda Activa 6G',
  licensePlate: 'MH12AB1234',
  verificationStatus: 'approved',
  rating: 4.8,
  totalDeliveries: 247,
  acceptanceRate: 92,
  completionRate: 98,
  ratingBreakdown: {
    5: 185,
    4: 49,
    3: 10,
    2: 2,
    1: 1
  },
  totalReviews: 247
};

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    vendorName: 'Wine & Spirits Store',
    vendorAddress: 'Shop 15, FC Road, Pune - 411005',
    customerName: 'अमित शर्मा',
    customerAddress: 'Flat 302, Sunrise Apartments, Koregaon Park, Pune - 411001',
    customerPhone: '+919876543211',
    items: [
      { name: 'Royal Challenge Whisky 750ml', quantity: 1, price: 1200 },
      { name: 'Kingfisher Beer 650ml', quantity: 6, price: 150 }
    ],
    totalAmount: 2100,
    deliveryFee: 80,
    status: 'assigned',
    otp: '4567',
    estimatedTime: '25 mins',
    distance: '3.2 km',
    paymentMethod: 'online',
    assignedAt: new Date().toISOString()
  }
];

const mockEarnings: Earning[] = [
  { id: 'E001', orderId: 'ORD001', date: '2025-01-15', deliveryFee: 80, bonus: 20, total: 100, type: 'delivery' },
  { id: 'E002', orderId: 'ORD002', date: '2025-01-15', deliveryFee: 60, bonus: 0, total: 60, type: 'delivery' },
  { id: 'E003', orderId: 'ORD003', date: '2025-01-15', deliveryFee: 0, bonus: 200, total: 200, type: 'bonus' }
];

const mockNotifications: Notification[] = [
  {
    id: 'N001',
    title: 'नया ऑर्डर मिला!',
    message: 'Wine & Spirits Store से ₹2100 का ऑर्डर',
    type: 'order',
    time: '2 mins ago',
    read: false,
    priority: 'high'
  },
  {
    id: 'N002',
    title: 'बोनस अर्जित किया!',
    message: 'आपको ₹200 का performance bonus मिला',
    type: 'bonus',
    time: '1 hour ago',
    read: false,
    priority: 'medium'
  }
];

const mockShifts: Shift[] = [
  {
    id: 'S001',
    date: 'Today, Jan 15',
    startTime: '6:00 PM',
    endTime: '11:00 PM',
    zone: 'Koregaon Park',
    earnings: 450,
    status: 'booked',
    demandLevel: 'High'
  },
  {
    id: 'S002',
    date: 'Tomorrow, Jan 16',
    startTime: '7:00 PM',
    endTime: '12:00 AM',
    zone: 'MG Road',
    earnings: 680,
    status: 'available',
    demandLevel: 'Very High',
    surgeMultiplier: 1.5
  },
  {
    id: 'S003',
    date: 'Jan 17',
    startTime: '5:00 PM',
    endTime: '10:00 PM',
    zone: 'Baner',
    earnings: 320,
    status: 'available',
    demandLevel: 'Medium'
  },
  {
    id: 'S004',
    date: 'Jan 14',
    startTime: '6:00 PM',
    endTime: '11:00 PM',
    zone: 'FC Road',
    earnings: 520,
    status: 'completed',
    demandLevel: 'High'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(false);
  const [requiresSelfie, setRequiresSelfie] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(mockOrders[0]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [showCustomerRating, setShowCustomerRating] = useState(false);
  const [pendingCustomerRating, setPendingCustomerRating] = useState<{ orderId: string; customerName: string } | null>(null);
  const [partner, setPartner] = useState<DeliveryPartner>(mockPartner);
  const earnings = mockEarnings;
  const todayEarnings = 1250;
  const weeklyEarnings = 8500;
  const monthlyEarnings = 32000;
  const unreadCount = notifications.filter(n => !n.read).length;

  const performanceMetrics = {
    acceptanceRate: 92,
    completionRate: 98,
    averageRating: 4.8,
    totalDeliveries: 247,
    onTimeDeliveries: 95
  };

  const takeSelfie = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate camera access
      setTimeout(() => {
        setRequiresSelfie(false);
        addNotification({
          title: 'Selfie Verified',
          message: 'आपका selfie verification successful है',
          type: 'system',
          time: 'Just now',
          read: false,
          priority: 'low'
        });
        resolve(true);
      }, 2000);
    });
  };

  const acceptOrder = (orderId: string) => {
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder({
        ...currentOrder,
        status: 'accepted',
        acceptedAt: new Date().toISOString()
      });
      
      addNotification({
        title: 'ऑर्डर स्वीकार किया',
        message: `Order #${orderId} को accept किया गया`,
        type: 'order',
        time: 'Just now',
        read: false,
        priority: 'medium'
      });
    }
  };

  const rejectOrder = (orderId: string, reason: string) => {
    setCurrentOrder(null);
    addNotification({
      title: 'ऑर्डर रिजेक्ट किया',
      message: `Reason: ${reason}`,
      type: 'order',
      time: 'Just now',
      read: false,
      priority: 'low'
    });
  };

  const markPickedUp = (orderId: string) => {
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder({
        ...currentOrder,
        status: 'picked_up',
        pickedUpAt: new Date().toISOString()
      });
    }
  };

  const markDelivered = async (orderId: string, otp: string): Promise<boolean> => {
    if (currentOrder && currentOrder.id === orderId && currentOrder.otp === otp) {
      const completedOrder = {
        ...currentOrder,
        status: 'delivered' as const,
        deliveredAt: new Date().toISOString()
      };
      
      setOrderHistory(prev => [completedOrder, ...prev]);
      setCurrentOrder(null);
      
      // Show customer rating prompt
      setPendingCustomerRating({
        orderId: completedOrder.id,
        customerName: completedOrder.customerName
      });
      setShowCustomerRating(true);
      
      addNotification({
        title: 'डिलीवरी पूर्ण!',
        message: `₹${currentOrder.deliveryFee} earned from delivery`,
        type: 'earning',
        time: 'Just now',
        read: false,
        priority: 'medium'
      });
      
      return true;
    }
    return false;
  };

  const rateCustomer = (orderId: string, rating: number, feedback?: string) => {
    addNotification({
      title: 'Customer Rated',
      message: `You rated ${pendingCustomerRating?.customerName} ${rating} stars`,
      type: 'system',
      time: 'Just now',
      read: false,
      priority: 'low'
    });
    
    setShowCustomerRating(false);
    setPendingCustomerRating(null);
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const reportIssue = (orderId: string, issue: string, category: string) => {
    addNotification({
      title: 'Issue Reported',
      message: `Your issue has been reported: ${category}`,
      type: 'system',
      time: 'Just now',
      read: false,
      priority: 'medium'
    });
  };

  const contactSupport = (message: string) => {
    addNotification({
      title: 'Support Contacted',
      message: 'Support team will contact you soon',
      type: 'system',
      time: 'Just now',
      read: false,
      priority: 'medium'
    });
  };

  const bookShift = (shiftId: string) => {
    setShifts(prev => prev.map(shift => 
      shift.id === shiftId 
        ? { ...shift, status: 'booked' as const }
        : shift
    ));
    
    const bookedShift = shifts.find(s => s.id === shiftId);
    if (bookedShift) {
      addNotification({
        title: 'Shift Booked Successfully!',
        message: `${bookedShift.zone} shift for ${bookedShift.date} (${bookedShift.startTime}-${bookedShift.endTime})`,
        type: 'system',
        time: 'Just now',
        read: false,
        priority: 'medium'
      });
    }
  };

  const updatePartnerProfile = (updates: Partial<DeliveryPartner>) => {
    setPartner(prev => ({ ...prev, ...updates }));
    addNotification({
      title: 'Profile Updated',
      message: 'आपकी profile successfully update हो गई',
      type: 'system',
      time: 'Just now',
      read: false,
      priority: 'medium'
    });
  };

  return (
    <AppContext.Provider value={{
      isOnline,
      setIsOnline,
      partner,
      requiresSelfie,
      setRequiresSelfie,
      takeSelfie,
      currentOrder,
      orderHistory,
      acceptOrder,
      rejectOrder,
      markPickedUp,
      markDelivered,
      todayEarnings,
      weeklyEarnings,
      monthlyEarnings,
      earnings,
      notifications,
      unreadCount,
      markNotificationRead,
      performanceMetrics,
      shifts,
      bookShift,
      rateCustomer,
      showCustomerRating,
      setShowCustomerRating,
      pendingCustomerRating,
      reportIssue,
      contactSupport,
      updatePartnerProfile
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}