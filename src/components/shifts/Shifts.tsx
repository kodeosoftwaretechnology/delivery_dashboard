import React, { useState } from 'react';
import { Calendar, Clock, MapPin, TrendingUp, CheckCircle, Plus } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export default function Shifts() {
  const { t } = useLanguage();
  const { shifts, bookShift } = useApp();
  const [activeTab, setActiveTab] = useState<'my-shifts' | 'available'>('my-shifts');

  const myShifts = shifts.filter(shift => shift.status === 'booked' || shift.status === 'completed');
  const availableShifts = shifts.filter(shift => shift.status === 'available');

  const handleBookShift = (shiftId: string) => {
    bookShift(shiftId);
  };

  const getShiftStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const ShiftCard = ({ shift, showBookButton = false }: { shift: any; showBookButton?: boolean }) => {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} className="text-gray-500" />
              <span className="font-semibold text-gray-800">{shift.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              <span className="text-gray-600">{shift.startTime} - {shift.endTime}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getShiftStatusColor(shift.status)}`}>
            {shift.status === 'booked' ? 'Booked' : shift.status === 'completed' ? 'Completed' : 'Available'}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" />
            <span className="text-gray-700">{shift.zone}</span>
            {shift.surgeMultiplier && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                {shift.surgeMultiplier}x Surge
              </span>
            )}
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDemandColor(shift.demandLevel)}`}>
            {shift.demandLevel} Demand
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-green-500" />
            <span className="font-semibold text-green-600">₹{shift.earnings} expected</span>
          </div>
          {showBookButton && shift.status === 'available' && (
            <button
              onClick={() => handleBookShift(shift.id)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Book Shift
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('shifts')}</h1>

      {/* Tab Navigation */}
      <div className="flex mb-6 bg-white rounded-xl p-1 shadow-sm">
        <button
          onClick={() => setActiveTab('my-shifts')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
            activeTab === 'my-shifts'
              ? 'bg-orange-600 text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t('myShifts')} ({myShifts.length})
        </button>
        <button
          onClick={() => setActiveTab('available')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
            activeTab === 'available'
              ? 'bg-orange-600 text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t('availableShifts')} ({availableShifts.length})
        </button>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">This Week</p>
              <p className="font-bold text-lg">5 shifts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completion Rate</p>
              <p className="font-bold text-lg">98%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shift Recommendations */}
      {activeTab === 'available' && (
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4 mb-6 border border-orange-200">
          <h3 className="font-semibold text-orange-800 mb-2">🔥 Recommended for You</h3>
          <p className="text-orange-700 text-sm mb-3">High demand expected in MG Road area (7-10 PM)</p>
          <div className="flex items-center gap-2">
            <span className="text-orange-600 font-semibold">1.5x Surge Active</span>
            <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs">₹680 expected</span>
          </div>
        </div>
      )}

      {/* Shifts List */}
      <div>
        {activeTab === 'my-shifts' ? (
          myShifts.length > 0 ? (
            myShifts.map(shift => (
              <ShiftCard key={shift.id} shift={shift} showBookButton={false} />
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No booked shifts</p>
              <p className="text-sm text-gray-400">Book your first shift to get started</p>
            </div>
          )
        ) : (
          availableShifts.length > 0 ? (
            availableShifts.map(shift => (
              <ShiftCard key={shift.id} shift={shift} showBookButton={true} />
            ))
          ) : (
            <div className="text-center py-12">
              <Plus size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No available shifts</p>
              <p className="text-sm text-gray-400">Check back later for new opportunities</p>
            </div>
          )
        )}
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-20 right-4">
        <button className="bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-colors">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}