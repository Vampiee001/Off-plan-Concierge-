import React, { useState } from 'react';
import { 
  Gift, 
  Lock, 
  Unlock, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Copy, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award,
  Clock,
  Tag,
  ArrowRight
} from 'lucide-react';
import { DeveloperPromotion, Property } from '../types';
import { developerPromotions } from '../data/newsAndPromotions';

interface DeveloperPromotionsProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onLeadCaptured: (lead: any) => void;
  onNotifyAdmin: (clientName: string, promoTitle: string, contactPhone: string) => void;
}

export const DeveloperPromotions: React.FC<DeveloperPromotionsProps> = ({
  properties,
  onSelectProperty,
  onLeadCaptured,
  onNotifyAdmin
}) => {
  const [unlocked, setUnlocked] = useState(false);
  const [selectedPromoForModal, setSelectedPromoForModal] = useState<DeveloperPromotion | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [investmentGoal, setInvestmentGoal] = useState('Immediate Off-Plan Booking (Next 30 Days)');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleOpenUnlockModal = (promo: DeveloperPromotion) => {
    setSelectedPromoForModal(promo);
  };

  const handleSubscribeAndUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;

    setSubmitting(true);
    const promo = selectedPromoForModal || developerPromotions[0];

    try {
      // 1. Submit lead to backend
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          country: 'Investor (Promotions Subscriber)',
          preferredLanguage: 'English',
          budgetRangeAED: '2M - 10M AED',
          status: 'Hot',
          leadScore: 96,
          qualificationSummary: `PROMO INQUIRY: Client registered to unlock "${promo.title}" by ${promo.developer}. Contact Person: Mark.`,
          chatSnippet: `Unlocked promotion voucher code for ${promo.title}. Investment goal: ${investmentGoal}.`,
          draftRecommendations: promo.applicablePropertyIds
        })
      });

      const data = await res.json();
      if (data.success) {
        onLeadCaptured(data.data);
      }

      // 2. Trigger instant notification alert to Mark
      onNotifyAdmin(clientName, promo.title, clientPhone);

      setUnlocked(true);
      const notifyAlert = `🔔 NOTIFICATION TO MARK (+971585538382): New client inquiry received from ${clientName} (${clientPhone}) for "${promo.title}"!`;
      setToastMessage(notifyAlert);
      setShowNotificationToast(true);
      setTimeout(() => setShowNotificationToast(false), 7000);

      // Close modal
      setSelectedPromoForModal(null);
    } catch (err) {
      console.error('Error submitting promo registration:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section id="developer-promotions" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Notification for Inquiries */}
      {showNotificationToast && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-md p-4 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs shadow-2xl border-2 border-yellow-200 animate-in slide-in-from-top-4 flex items-start space-x-3">
          <div className="p-2 bg-slate-950 rounded-xl text-amber-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-slate-950 font-extrabold uppercase text-[11px] tracking-wider">
              Lead Captured & Mark Notified!
            </span>
            <p className="text-slate-900 mt-0.5 leading-snug font-medium">
              {toastMessage}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Exclusive Flash Incentives & Direct Developer Perks</span>
          </div>
          <h2 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
            Exclusive Developer Promotions & Secret Vouchers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access 100% DLD registration waivers, Danube 1% monthly plans with complimentary furniture, and private superyacht passes.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center space-x-2">
          {unlocked ? (
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40 flex items-center space-x-1.5">
              <Unlock className="w-3.5 h-3.5" />
              <span>VIP Voucher Codes Unlocked</span>
            </span>
          ) : (
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Sign Up to Unlock Vouchers</span>
            </span>
          )}
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developerPromotions.map((promo) => {
          const matchedProp = properties.find(p => promo.applicablePropertyIds.includes(p.id));

          return (
            <div
              key={promo.id}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#0C1630] to-[#070D1E] border border-amber-500/30 hover:border-amber-400 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3.5">
                {/* Developer tag & badge */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">{promo.developer}</span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                    {promo.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-luxury text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-snug">
                    {promo.tagline}
                  </p>
                </div>

                {/* Discount highlight */}
                <div className="p-3.5 rounded-xl bg-[#060B18] border border-amber-500/30 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Incentive Value:</span>
                  <span className="font-luxury text-sm font-bold text-amber-300 mt-0.5 block">
                    {promo.discountDetail}
                  </span>
                </div>

                {/* Terms list */}
                <ul className="text-[11px] text-slate-300 space-y-1">
                  {promo.terms.map((term, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>

                {/* Voucher Code Reveal or Locked State */}
                <div className="pt-2">
                  {unlocked ? (
                    <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 block">Voucher Code:</span>
                        <code className="text-xs font-mono font-bold text-white tracking-widest">{promo.voucherCode}</code>
                      </div>
                      <button
                        onClick={() => handleCopyVoucher(promo.voucherCode)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[11px] font-semibold flex items-center space-x-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedCode === promo.voucherCode ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => handleOpenUnlockModal(promo)}
                      className="p-3 rounded-xl bg-slate-900/90 border border-dashed border-amber-500/40 cursor-pointer hover:bg-slate-900 transition-all flex items-center justify-between group/code"
                    >
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-slate-300 group-hover/code:text-amber-300">
                          ••••-••••-•••• (Click to Unlock)
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 underline">
                        Sign Up
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs gap-2">
                {matchedProp && (
                  <button
                    onClick={() => onSelectProperty(matchedProp)}
                    className="text-slate-300 hover:text-white font-medium flex items-center space-x-1 text-[11px]"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                  </button>
                )}

                {unlocked ? (
                  <a
                    href={`https://wa.me/971585538382?text=Hi%20Mark,%20I%20have%20unlocked%20the%20voucher%20${promo.voucherCode}%20for%20${encodeURIComponent(promo.title)}.%20Please%20assist%20me%20with%20claiming%20this%20deal.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Claim on WhatsApp</span>
                  </a>
                ) : (
                  <button
                    onClick={() => handleOpenUnlockModal(promo)}
                    className="ml-auto px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all flex items-center space-x-1.5 shadow-md"
                  >
                    <Gift className="w-3.5 h-3.5 text-slate-950" />
                    <span>Unlock Promo Voucher</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gated Unlock & Subscription Modal */}
      {selectedPromoForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg my-8 rounded-2xl bg-[#070D1E] border border-amber-500/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
            <button
              onClick={() => setSelectedPromoForModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Instant VIP Unlock</span>
            </div>
            <h3 className="font-luxury text-2xl font-bold text-white">
              Unlock Developer Voucher & Claim Pass
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Enter your details to unlock secret promotional vouchers for <strong>{selectedPromoForModal.title}</strong> by {selectedPromoForModal.developer}. Mark will receive your inquiry immediately.
            </p>

            <form onSubmit={handleSubscribeAndUnlock} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="investor@domain.com"
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+971 58 ... or international"
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Investment Timeframe
                </label>
                <select
                  value={investmentGoal}
                  onChange={(e) => setInvestmentGoal(e.target.value)}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Immediate Off-Plan Booking (Next 30 Days)">Immediate Off-Plan Booking (Next 30 Days)</option>
                  <option value="Exploring High Yields (3 - 6 Months)">Exploring High Yields (3 - 6 Months)</option>
                  <option value="UAE 10-Year Golden Visa Investment">UAE 10-Year Golden Visa Investment</option>
                  <option value="Beachfront / Branded Trophy Acquisition">Beachfront / Branded Trophy Acquisition</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Immediate dispatch: Mark will be alerted of your inquiry at +971585538382.
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Unlock className="w-4 h-4 text-slate-950" />
                <span>{submitting ? 'Registering & Notifying...' : 'Unlock VIP Promo Pass & Notify Mark'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
