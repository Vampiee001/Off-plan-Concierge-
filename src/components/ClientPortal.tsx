import React, { useState } from 'react';
import { 
  UserCheck, 
  Bookmark, 
  Bell, 
  Sparkles, 
  Heart, 
  Calendar, 
  Eye, 
  Trash2, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Property, ClientProfile } from '../types';
import { CurrencyCode, formatPrice } from '../utils/formatters';

interface ClientPortalProps {
  properties: Property[];
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  currency: CurrencyCode;
  onSelectProperty: (property: Property) => void;
  onOpenViewingModal: (property?: Property) => void;
  clientDrafts: {
    title: string;
    date: string;
    propertyIds: string[];
    aiReasoning: string;
  }[];
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  properties,
  savedPropertyIds,
  onToggleSave,
  currency,
  onSelectProperty,
  onOpenViewingModal,
  clientDrafts
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'drafts' | 'alerts' | 'viewings'>('drafts');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  // Filter saved properties
  const savedProperties = properties.filter(p => savedPropertyIds.includes(p.id));

  // Trigger simulated push notification
  const handleTestPushNotification = () => {
    setTestNotificationSent(true);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Off-Plan Concierge VIP Alert', {
        body: 'New Launch: Palm Jebel Ali Frond Villa phase 2 allocation opened with 80/20 plan!',
        icon: '/favicon.ico'
      });
    }
    setTimeout(() => setTestNotificationSent(false), 4000);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Client Identity & Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0C1630] to-[#070D1E] border border-amber-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5 shadow-xl">
            <div className="w-full h-full bg-[#060B18] rounded-[14px] flex items-center justify-center">
              <span className="font-luxury text-2xl font-bold text-amber-300">VIP</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-luxury text-2xl font-bold text-white">Private Client Suite</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                Gold Tier Member
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Dedicated Advisory by <strong>Mark</strong> (WhatsApp: +971585538382) • Priority Off-Plan Allocations
            </p>
          </div>
        </div>

        {/* Push Notification Toggle & Test */}
        <div className="flex items-center space-x-3 bg-[#060B18] p-3 rounded-xl border border-slate-800">
          <Bell className="w-4 h-4 text-amber-400" />
          <div className="text-xs">
            <span className="font-bold text-white block">Off-Plan Match Alerts</span>
            <span className="text-[10px] text-slate-400">Push notifications for price shifts</span>
          </div>
          <button
            onClick={() => setPushEnabled(!pushEnabled)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              pushEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {pushEnabled ? 'Active' : 'Off'}
          </button>
          {pushEnabled && (
            <button
              onClick={handleTestPushNotification}
              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/30"
            >
              Test Alert
            </button>
          )}
        </div>
      </div>

      {testNotificationSent && (
        <div className="mt-4 p-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-xl animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-slate-950" />
          <span>Push Notification Alert Simulated: "New Palm Jebel Ali launch matched your investment criteria!"</span>
        </div>
      )}

      {/* Tabs */}
      <div className="mt-8 flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none text-xs font-semibold">
        <button
          onClick={() => setActiveTab('drafts')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeTab === 'drafts' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Curated Portfolio Drafts ({clientDrafts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeTab === 'favorites' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Saved Shortlist ({savedProperties.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeTab === 'alerts' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Saved Searches & Triggers</span>
        </button>
      </div>

      {/* TAB: AI CURATED RECOMMENDATIONS DRAFTS */}
      {activeTab === 'drafts' && (
        <div className="mt-6 space-y-6">
          <div className="p-6 rounded-2xl bg-[#091124] border border-amber-500/30 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-amber-300">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-luxury text-xl font-bold">
                AI Thought & Saved Personalized Recommendations
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              As you interact with our Talking AI Concierge, the AI autonomously analyzes your risk tolerance, liquidity, and aesthetic preferences to draft bespoke investment portfolios.
            </p>

            {clientDrafts.length > 0 ? (
              <div className="space-y-4">
                {clientDrafts.map((draft, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[#060D1E] border border-amber-500/20 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white">{draft.title}</h4>
                        <span className="text-[11px] text-slate-400">{draft.date}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                        AI Dossier Ready
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 italic bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      "{draft.aiReasoning}"
                    </p>

                    {/* Properties in this draft */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {draft.propertyIds.map((pId) => {
                        const prop = properties.find(p => p.id === pId) || properties[0];
                        return (
                          <div
                            key={prop.id}
                            className="p-3 rounded-xl bg-[#091124] border border-slate-800 hover:border-amber-400 transition-all flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <img src={prop.images[0]} alt={prop.title} className="w-14 h-12 rounded-lg object-cover" />
                              <div>
                                <h5 className="text-xs font-bold text-white line-clamp-1">{prop.title}</h5>
                                <div className="text-xs font-semibold text-amber-300">
                                  {formatPrice(prop.startingPriceAED, currency)}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => onSelectProperty(prop)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                              title="Inspect 360"
                            >
                              <Eye className="w-4 h-4 text-amber-400" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onOpenViewingModal()}
                        className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book VIP Tour for this Portfolio</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                <p>No drafts saved yet. Ask our Talking AI Concierge for recommendations and click "Save Portfolio Draft"!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: SAVED FAVORITES */}
      {activeTab === 'favorites' && (
        <div className="mt-6 space-y-4">
          {savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((prop) => (
                <div key={prop.id} className="p-4 rounded-2xl bg-[#091124] border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl space-y-3">
                  <div className="relative h-44 rounded-xl overflow-hidden">
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => onToggleSave(prop.id)}
                      className="absolute top-2 right-2 p-2 rounded-xl bg-black/60 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] text-amber-400 font-semibold">{prop.developer}</span>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{prop.title}</h4>
                    <div className="font-luxury text-base font-bold text-amber-300 mt-1">
                      {formatPrice(prop.startingPriceAED, currency)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onSelectProperty(prop)}
                      className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inspect 360°</span>
                    </button>
                    <button
                      onClick={() => onOpenViewingModal(prop)}
                      className="py-2 rounded-xl gold-gradient-bg text-slate-950 text-xs font-bold flex items-center justify-center space-x-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Tour</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-2xl bg-[#091124] border border-slate-800 text-slate-400 text-xs">
              <p>You haven't saved any off-plan properties yet. Click the heart icon on any listing to save it to your private portal!</p>
            </div>
          )}
        </div>
      )}

      {/* TAB: SAVED SEARCHES & ALERTS */}
      {activeTab === 'alerts' && (
        <div className="mt-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#091124] border border-slate-800 space-y-4">
            <h3 className="font-luxury text-xl font-bold text-white">Active Search Watchlists</h3>
            <p className="text-xs text-slate-400">
              When new off-plan towers matching your exact parameters are registered with DLD, you receive instant push notification alerts.
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#060D1E] border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white">Downtown Dubai Branded Towers</h5>
                  <p className="text-[11px] text-slate-400">Budget: 5M - 15M AED • Post-Handover 70/30 • 2-3 Bedrooms</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-semibold">Active Push</span>
              </div>

              <div className="p-4 rounded-xl bg-[#060D1E] border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white">Palm Jebel Ali Waterfront Fronds</h5>
                  <p className="text-[11px] text-slate-400">Beachfront Mansions • Budget: 20M+ AED • Handover 2027</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-semibold">Active Push</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
