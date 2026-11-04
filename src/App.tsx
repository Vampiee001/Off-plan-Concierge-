import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyList } from './components/PropertyList';
import { PropertyModal } from './components/PropertyModal';
import { TalkingAiConcierge } from './components/TalkingAiConcierge';
import { InteractiveMap } from './components/InteractiveMap';
import { DeveloperComparison } from './components/DeveloperComparison';
import { PriceTrendsAnalytics } from './components/PriceTrendsAnalytics';
import { MortgageCalculator } from './components/MortgageCalculator';
import { AgentDashboard } from './components/AgentDashboard';
import { ClientPortal } from './components/ClientPortal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ViewingModal } from './components/ViewingModal';
import { DeveloperNews } from './components/DeveloperNews';
import { DeveloperPromotions } from './components/DeveloperPromotions';
import { PropertyPdfInjectorModal } from './components/PropertyPdfInjectorModal';
import { PropertyAdminManager } from './components/PropertyAdminManager';
import { SocialBroadcastStudio } from './components/SocialBroadcastStudio';
import { Property, Viewing } from './types';
import { initialProperties } from './data/properties';
import { CurrencyCode } from './utils/formatters';
import { LanguageCode } from './utils/translations';
import { Sparkles, Phone, MessageCircle, Bell, CheckCircle2, X, UploadCloud } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('properties');
  const [currency, setCurrency] = useState<CurrencyCode>('AED');
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDeveloper, setSelectedDeveloper] = useState('All');
  const [selectedBedrooms, setSelectedBedrooms] = useState('All');

  // Properties state
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  // Saved / Bookmarked properties in Client Portal
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['bugatti-residences']);

  // Modals state
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [selectedPropertyModal, setSelectedPropertyModal] = useState<Property | null>(null);
  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [propertyForViewing, setPropertyForViewing] = useState<Property | undefined>(undefined);
  const [pdfInjectorOpen, setPdfInjectorOpen] = useState(false);
  const [selectedPropertyForInjection, setSelectedPropertyForInjection] = useState<Property | null>(null);

  // Admin Notification Toast (Direct alert for Mark +971585538382)
  const [adminNotificationToast, setAdminNotificationToast] = useState<{
    id: number;
    title: string;
    message: string;
    time: string;
    whatsappUrl?: string;
  } | null>(null);

  // AI Curated Draft Recommendations for Client Portal
  const [clientDrafts, setClientDrafts] = useState<{
    title: string;
    date: string;
    propertyIds: string[];
    aiReasoning: string;
  }[]>([
    {
      title: 'High-ROI Waterfront & Casino Growth Portfolio',
      date: '2026-10-21',
      propertyIds: ['bugatti-residences', 'wynn-al-marjan-suites'],
      aiReasoning: 'AI matched your interest in branded capital appreciation (9.4% in Business Bay) paired with highest net short-term rental yields (12.5% at Wynn Casino RAK).'
    }
  ]);

  // Fetch properties from server if available
  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setProperties(data.data);
        }
      })
      .catch(err => {
        console.warn('Using local property data fallback:', err);
      });
  }, []);

  const handleOpenPdfInjector = (property?: Property) => {
    setSelectedPropertyForInjection(property || null);
    setPdfInjectorOpen(true);
  };

  const handlePropertyUpdated = (updatedProp: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProp.id ? updatedProp : p));
    if (selectedPropertyModal?.id === updatedProp.id) {
      setSelectedPropertyModal(updatedProp);
    }
  };

  const handleNotifyAdmin = (title: string, message: string, phone: string = '+971585538382') => {
    setAdminNotificationToast({
      id: Date.now(),
      title,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      whatsappUrl: `https://wa.me/971585538382?text=${encodeURIComponent(`Client Inquiry Alert for Mark: ${message}`)}`
    });
  };

  const handleToggleSave = (id: string) => {
    setSavedPropertyIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handleOpenViewing = (property?: Property) => {
    setPropertyForViewing(property);
    setViewingModalOpen(true);
  };

  const handleAskAiAboutProperty = (property: Property) => {
    setAiConciergeOpen(true);
  };

  const handleSaveDraftRecommendation = (propertyIds: string[], notes: string) => {
    const newDraft = {
      title: `AI Portfolio Draft #${clientDrafts.length + 1} (${new Date().toLocaleDateString()})`,
      date: new Date().toISOString().split('T')[0],
      propertyIds,
      aiReasoning: notes
    };
    setClientDrafts(prev => [newDraft, ...prev]);
  };

  const handleAddProperty = (newProp: Property) => {
    setProperties(prev => [newProp, ...prev]);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    if (selectedPropertyModal?.id === id) {
      setSelectedPropertyModal(null);
    }
  };

  const handleLeadCaptured = (newLead: any) => {
    // Lead captured notification
    handleNotifyAdmin(
      `New Qualified Lead: ${newLead.name}`,
      `Phone: ${newLead.phone} • Budget: ${newLead.budgetRangeAED} • Country: ${newLead.country}`,
      newLead.phone
    );
  };

  return (
    <div className={`min-h-screen bg-[#050B17] text-slate-100 flex flex-col font-sans ${language === 'ar' ? 'dir-rtl' : ''}`}>
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        onOpenAiConcierge={() => setAiConciergeOpen(true)}
        onOpenViewingModal={() => handleOpenViewing()}
        savedCount={savedPropertyIds.length}
      />

      {/* Real-time Admin Notification Toast for Mark (+971585538382) */}
      {adminNotificationToast && (
        <div className="fixed top-24 right-4 z-50 max-w-md w-full p-4 rounded-2xl bg-[#0B1528] border-2 border-amber-500 shadow-2xl animate-in slide-in-from-top-4 flex items-start space-x-3 text-white">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Mark (WhatsApp: +971585538382) Alert
              </span>
              <span className="text-[10px] text-slate-400">{adminNotificationToast.time}</span>
            </div>
            <h4 className="text-xs font-bold text-white mt-0.5">{adminNotificationToast.title}</h4>
            <p className="text-xs text-slate-300 mt-1">{adminNotificationToast.message}</p>
            <div className="mt-2.5 flex items-center space-x-2">
              <a
                href={adminNotificationToast.whatsappUrl || "https://wa.me/971585538382"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center space-x-1.5 transition-all shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
              </a>
              <button
                onClick={() => {
                  setCurrentTab('agent-dashboard');
                  setAdminNotificationToast(null);
                }}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-semibold transition-all border border-slate-700"
              >
                View in CRM
              </button>
            </div>
          </div>
          <button
            onClick={() => setAdminNotificationToast(null)}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'properties' && (
          <>
            <Hero
              language={language}
              currency={currency}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedDeveloper={selectedDeveloper}
              setSelectedDeveloper={setSelectedDeveloper}
              selectedBedrooms={selectedBedrooms}
              setSelectedBedrooms={setSelectedBedrooms}
              onOpenAiConcierge={() => setAiConciergeOpen(true)}
              onExploreClick={() => {
                const el = document.getElementById('property-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenMap={() => setCurrentTab('map')}
            />

            {/* Gated Developer Promotions with Client Capture & Instant Notifications */}
            <DeveloperPromotions
              properties={properties}
              onSelectProperty={(p) => setSelectedPropertyModal(p)}
              onLeadCaptured={handleLeadCaptured}
              onNotifyAdmin={(clientName, promoTitle, clientPhone) => {
                handleNotifyAdmin(
                  `VIP Lead Alert for Mark (+971585538382)`,
                  `Client ${clientName} (${clientPhone}) unlocked exclusive promotion for "${promoTitle}". Qualified lead logged.`,
                  clientPhone
                );
              }}
            />

            <div id="property-grid">
              <PropertyList
                properties={properties}
                currency={currency}
                language={language}
                searchQuery={searchQuery}
                selectedLocation={selectedLocation}
                selectedDeveloper={selectedDeveloper}
                selectedBedrooms={selectedBedrooms}
                savedPropertyIds={savedPropertyIds}
                onToggleSave={handleToggleSave}
                onSelectProperty={(p) => setSelectedPropertyModal(p)}
                onOpenViewingModal={handleOpenViewing}
                onAskAiAboutProperty={handleAskAiAboutProperty}
              />
            </div>

            {/* Real-Time UAE Master Developer News & Intelligence */}
            <DeveloperNews
              properties={properties}
              onSelectProperty={(p) => setSelectedPropertyModal(p)}
              onAskAiAboutNews={(news) => {
                setAiConciergeOpen(true);
              }}
            />

            <InteractiveMap
              properties={properties}
              currency={currency}
              onSelectProperty={(p) => setSelectedPropertyModal(p)}
              onOpenViewingModal={handleOpenViewing}
            />

            <DeveloperComparison
              properties={properties}
              currency={currency}
              onSelectProperty={(p) => setSelectedPropertyModal(p)}
              onOpenViewingModal={handleOpenViewing}
            />

            <MortgageCalculator currency={currency} />

            <ContactSection
              language={language}
              currency={currency}
              onOpenAiConcierge={() => setAiConciergeOpen(true)}
              onLeadCaptured={handleLeadCaptured}
            />
          </>
        )}

        {currentTab === 'promotions' && (
          <div className="py-6">
            <DeveloperPromotions
              properties={properties}
              onSelectProperty={(p) => setSelectedPropertyModal(p)}
              onLeadCaptured={handleLeadCaptured}
              onNotifyAdmin={(clientName, promoTitle, clientPhone) => {
                handleNotifyAdmin(
                  `VIP Lead Alert for Mark (+971585538382)`,
                  `Client ${clientName} (${clientPhone}) unlocked exclusive promotion for "${promoTitle}". Qualified lead logged.`,
                  clientPhone
                );
              }}
            />
          </div>
        )}

        {currentTab === 'news' && (
          <div className="py-6">
            <DeveloperNews
              properties={properties}
              onSelectProperty={(p) => setSelectedPropertyModal(p)}
              onAskAiAboutNews={(news) => {
                setAiConciergeOpen(true);
              }}
            />
          </div>
        )}

        {currentTab === 'map' && (
          <InteractiveMap
            properties={properties}
            currency={currency}
            onSelectProperty={(p) => setSelectedPropertyModal(p)}
            onOpenViewingModal={handleOpenViewing}
          />
        )}

        {currentTab === 'developer-comparison' && (
          <DeveloperComparison
            properties={properties}
            currency={currency}
            onSelectProperty={(p) => setSelectedPropertyModal(p)}
            onOpenViewingModal={handleOpenViewing}
          />
        )}

        {currentTab === 'analytics' && (
          <PriceTrendsAnalytics currency={currency} />
        )}

        {currentTab === 'calculator' && (
          <MortgageCalculator currency={currency} />
        )}

        {currentTab === 'agent-dashboard' && (
          <AgentDashboard
            properties={properties}
            onAddProperty={handleAddProperty}
            onUpdateProperty={handlePropertyUpdated}
            onDeleteProperty={handleDeleteProperty}
            onOpenPdfInjector={handleOpenPdfInjector}
            currency={currency}
          />
        )}

        {currentTab === 'properties-admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <PropertyAdminManager
              properties={properties}
              onPropertyUpdated={handlePropertyUpdated}
              onPropertyAdded={handleAddProperty}
              onPropertyDeleted={handleDeleteProperty}
              currency={currency}
              onOpenSocialBroadcast={() => setCurrentTab('broadcast')}
            />
          </div>
        )}

        {currentTab === 'broadcast' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <SocialBroadcastStudio
              properties={properties}
              currency={currency}
            />
          </div>
        )}

        {currentTab === 'client-portal' && (
          <ClientPortal
            properties={properties}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
            currency={currency}
            onSelectProperty={(p) => setSelectedPropertyModal(p)}
            onOpenViewingModal={handleOpenViewing}
            clientDrafts={clientDrafts}
          />
        )}
      </main>

      {/* Floating Action Trigger: Talking AI Concierge */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        {/* Quick PDF Brochure & Details Injector for Agents / Admins */}
        <button
          onClick={() => handleOpenPdfInjector()}
          className="p-3 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-400 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-amber-500/40"
          title="Upload Developer PDF Brochure / Inject Property Updates"
        >
          <UploadCloud className="w-5 h-5" />
        </button>

        {/* WhatsApp VIP Hotline */}
        <a
          href="https://wa.me/971585538382"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-emerald-400/30"
          title="Direct WhatsApp with Mark (+971585538382)"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Talking AI Button with pulsing glow */}
        <button
          onClick={() => setAiConciergeOpen(true)}
          className="group relative px-4 py-3 rounded-full gold-gradient-bg text-slate-950 font-bold shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2 border border-yellow-200"
          title="Talk with AI Concierge"
        >
          <span className="absolute -inset-1 rounded-full bg-amber-400/30 blur-md group-hover:bg-amber-400/50 transition-all pointer-events-none" />
          <Sparkles className="w-5 h-5 text-slate-950 relative animate-spin-slow" />
          <span className="text-xs font-luxury tracking-wide relative hidden sm:inline">
            Talking AI Concierge
          </span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
          </span>
        </button>
      </div>

      {/* Modals */}
      <PropertyPdfInjectorModal
        isOpen={pdfInjectorOpen}
        onClose={() => setPdfInjectorOpen(false)}
        properties={properties}
        selectedProperty={selectedPropertyForInjection}
        currency={currency}
        onPropertyUpdated={handlePropertyUpdated}
        onNotifyAdmin={(title, summary) => {
          handleNotifyAdmin(`Admin Alert: Listing Updated`, `${title} — ${summary}`);
        }}
      />

      <TalkingAiConcierge
        isOpen={aiConciergeOpen}
        onClose={() => setAiConciergeOpen(false)}
        properties={properties}
        currency={currency}
        language={language}
        onSelectProperty={(p) => setSelectedPropertyModal(p)}
        onOpenViewingModal={handleOpenViewing}
        onSaveDraftRecommendation={handleSaveDraftRecommendation}
      />

      <PropertyModal
        property={selectedPropertyModal}
        onClose={() => setSelectedPropertyModal(null)}
        currency={currency}
        isSaved={selectedPropertyModal ? savedPropertyIds.includes(selectedPropertyModal.id) : false}
        onToggleSave={handleToggleSave}
        onOpenViewingModal={handleOpenViewing}
        onAskAiAboutProperty={handleAskAiAboutProperty}
        onOpenPdfInjector={handleOpenPdfInjector}
      />

      <ViewingModal
        isOpen={viewingModalOpen}
        onClose={() => setViewingModalOpen(false)}
        property={propertyForViewing}
        onBookingSuccess={(viewing) => {
          // Viewing booked
          handleNotifyAdmin(
            `Viewing Booked for Mark (+971585538382)`,
            `Client ${viewing.clientName} booked ${viewing.viewingType} for ${viewing.propertyTitle} on ${viewing.date} at ${viewing.timeSlot}.`,
            viewing.clientPhone
          );
        }}
      />

      {/* Footer */}
      <Footer
        language={language}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAiConcierge={() => setAiConciergeOpen(true)}
      />
    </div>
  );
}
