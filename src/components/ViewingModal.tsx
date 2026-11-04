import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Car, 
  Video, 
  Building, 
  CheckCircle2, 
  ShieldCheck,
  User,
  Mail,
  Phone,
  Sparkles
} from 'lucide-react';
import { Property, Viewing } from '../types';

interface ViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
  onBookingSuccess: (viewing: Viewing) => void;
}

export const ViewingModal: React.FC<ViewingModalProps> = ({
  isOpen,
  onClose,
  property,
  onBookingSuccess
}) => {
  if (!isOpen) return null;

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [viewingType, setViewingType] = useState<Viewing['viewingType']>('VIP Chauffeur Tour');
  const [date, setDate] = useState('2026-10-25');
  const [timeSlot, setTimeSlot] = useState('02:00 PM (Dubai Time)');
  const [specialRequests, setSpecialRequests] = useState('Chauffeur pickup requested from hotel in Downtown Dubai');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/viewings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property?.id || 'general-consult',
          propertyTitle: property?.title || 'UAE Off-Plan VIP Portfolio Tour',
          clientName,
          clientEmail,
          clientPhone,
          viewingType,
          date,
          timeSlot,
          specialRequests
        })
      });

      const data = await res.json();
      if (data.success) {
        onBookingSuccess(data.data);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-2xl bg-[#070D1E] border border-amber-500/30 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-luxury text-2xl font-bold text-white">VIP Viewing Confirmed</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your appointment for <strong>{property?.title || 'UAE Off-Plan Portfolio'}</strong> has been registered with <strong>Mark</strong>. Our Private Concierge will confirm your tour via WhatsApp at +971585538382.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Direct Platform Scheduling</span>
            </div>
            <h3 className="font-luxury text-2xl font-bold text-white">
              Schedule Private VIP Viewing
            </h3>
            {property && (
              <p className="text-xs text-amber-300 mt-0.5 font-semibold">
                Project: {property.title} ({property.developer})
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Viewing Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Tour Protocol
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setViewingType('VIP Chauffeur Tour')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      viewingType === 'VIP Chauffeur Tour'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-[#060D1E] border-slate-800 text-slate-400'
                    }`}
                  >
                    <Car className="w-4 h-4 mb-1 text-amber-400" />
                    <div className="text-white font-semibold">VIP Chauffeur</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Rolls-Royce / Maybach</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewingType('Interactive 3D Virtual Walkthrough')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      viewingType === 'Interactive 3D Virtual Walkthrough'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-[#060D1E] border-slate-800 text-slate-400'
                    }`}
                  >
                    <Video className="w-4 h-4 mb-1 text-amber-400" />
                    <div className="text-white font-semibold">Virtual 3D VR</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Zoom & VR Headset</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewingType('On-Site Sales Lounge')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      viewingType === 'On-Site Sales Lounge'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-[#060D1E] border-slate-800 text-slate-400'
                    }`}
                  >
                    <Building className="w-4 h-4 mb-1 text-amber-400" />
                    <div className="text-white font-semibold">Developer Lounge</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Private Sales Gallery</div>
                  </button>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="11:00 AM (Dubai Time)">11:00 AM (Morning Tour)</option>
                    <option value="02:00 PM (Dubai Time)">02:00 PM (Afternoon Tour)</option>
                    <option value="05:30 PM (Dubai Time)">05:30 PM (Sunset Golden Hour)</option>
                    <option value="08:00 PM (Dubai Time)">08:00 PM (Evening Skyline View)</option>
                  </select>
                </div>
              </div>

              {/* Client Info */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Alexander Romanov"
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@investment.com"
                      className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+971 50 ... or international"
                      className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Special Requests & Preferences
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Airport transfer, Mandarin translator, family tour..."
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  All chauffeured tours are fully complimentary for qualified investors with 0% agency fees.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-xl hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Securing Viewing Allocation...' : 'Confirm VIP Viewing Appointment'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
