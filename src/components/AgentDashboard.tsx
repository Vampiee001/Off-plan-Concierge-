import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  PlusCircle, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  Mail, 
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  RefreshCw,
  Award,
  FileText,
  UploadCloud,
  FileSpreadsheet,
  Share2,
  Building2,
  FileDown
} from 'lucide-react';
import { Property, Lead, Viewing } from '../types';
import { CurrencyCode, formatPrice } from '../utils/formatters';
import { GoogleSheetsSyncCard } from './GoogleSheetsSyncCard';
import { PropertyAdminManager } from './PropertyAdminManager';
import { SocialBroadcastStudio } from './SocialBroadcastStudio';
import { exportPropertyToPdf } from '../services/pdfExport';

interface AgentDashboardProps {
  properties: Property[];
  onAddProperty: (newProp: Property) => void;
  onUpdateProperty?: (updatedProp: Property) => void;
  onDeleteProperty?: (propId: string) => void;
  onOpenPdfInjector?: (property?: Property) => void;
  currency: CurrencyCode;
  initialTab?: 'leads' | 'viewings' | 'properties-admin' | 'broadcast' | 'pdf-injector' | 'uploader' | 'mls';
}

export const AgentDashboard: React.FC<AgentDashboardProps> = ({
  properties,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty,
  onOpenPdfInjector,
  currency,
  initialTab = 'leads'
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'viewings' | 'properties-admin' | 'broadcast' | 'pdf-injector' | 'uploader' | 'mls'>(initialTab);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [viewings, setViewings] = useState<Viewing[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [mlsSyncStatus, setMlsSyncStatus] = useState<any>(null);
  const [syncingMls, setSyncingMls] = useState(false);

  // Property Uploader Form State
  const [title, setTitle] = useState('');
  const [developer, setDeveloper] = useState('');
  const [location, setLocation] = useState('Business Bay Waterfront, Dubai');
  const [subLocation, setSubLocation] = useState('Business Bay');
  const [startingPriceAED, setStartingPriceAED] = useState<number>(4500000);
  const [pricePerSqFt, setPricePerSqFt] = useState<number>(2900);
  const [completionDate, setCompletionDate] = useState('Q4 2027');
  const [handoverYear, setHandoverYear] = useState<number>(2027);
  const [paymentPlan, setPaymentPlan] = useState('70/30 (20% Down, 50% Construction, 30% on Handover)');
  const [propertyType, setPropertyType] = useState<Property['propertyType']>('Luxury Apartment');
  const [bedrooms, setBedrooms] = useState('1 to 3 Bedroom Suites');
  const [projectedROI, setProjectedROI] = useState('9.2% Net Projected');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80');
  const [usps, setUsps] = useState<[string, string, string, string, string]>([
    'Prime waterfront canal location with panoramic skyline views',
    'Guaranteed 10-Year UAE Golden Visa nomination package',
    'Blue-chip developer with 100% RERA escrow guarantee',
    'High capital appreciation outlook upon delivery',
    'Luxury wellness club, private infinity pool, and concierge'
  ]);
  const [generatingUsps, setGeneratingUsps] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Fetch leads and viewings
  const fetchDashboardData = async () => {
    setLoadingLeads(true);
    try {
      const [leadsRes, viewingsRes, mlsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/viewings'),
        fetch('/api/mls-sync')
      ]);
      const leadsData = await leadsRes.json();
      const viewingsData = await viewingsRes.json();
      const mlsData = await mlsRes.json();

      if (leadsData.success) {
        setLeads(leadsData.data);
        if (leadsData.data.length > 0 && !selectedLead) {
          setSelectedLead(leadsData.data[0]);
        }
      }
      if (viewingsData.success) {
        setViewings(viewingsData.data);
      }
      if (mlsData.success) {
        setMlsSyncStatus(mlsData);
      }
    } catch (e) {
      console.error('Error fetching dashboard data:', e);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // AI 5-USP Generator for Uploader
  const handleGenerateUspsWithAi = async () => {
    if (!title || !developer) {
      alert('Please enter a Project Title and Developer first.');
      return;
    }
    setGeneratingUsps(true);
    try {
      const res = await fetch('/api/gemini/generate-usps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          developer,
          location: subLocation,
          startingPriceAED,
          paymentPlan,
          amenities: ['Private Sky Pool', 'Valet Parking', 'Concierge', 'Gym']
        })
      });
      const data = await res.json();
      if (data.success && data.usps && data.usps.length >= 5) {
        setUsps([
          data.usps[0],
          data.usps[1],
          data.usps[2],
          data.usps[3],
          data.usps[4]
        ]);
      }
    } catch (err) {
      console.error('Failed to generate USPs:', err);
    } finally {
      setGeneratingUsps(false);
    }
  };

  // Handle Property Upload Submit
  const handleUploadProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      title,
      developer,
      location,
      city: 'Dubai',
      subLocation,
      startingPriceAED,
      startingPriceUSD: Math.round(startingPriceAED * 0.2723),
      pricePerSqFt,
      completionDate,
      handoverYear,
      paymentPlan,
      downPaymentPercent: 20,
      propertyType,
      bedrooms,
      sizeRangeSqFt: '950 - 3,400 sq.ft',
      projectedROI,
      coordinates: { lat: 25.1972, lng: 55.2744 },
      images: [imageUrl, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'],
      usps,
      virtualTourUrl: imageUrl,
      developerComparison: {
        developerName: developer,
        rating: 4.8,
        projectsCompleted: 25,
        onTimeDeliveryRate: '98%',
        escrowVerified: true,
        benchmarkPriceDiff: 'Direct Developer Off-Plan Tier',
        exclusivePerk: '100% DLD Fee Waiver + Free Service Charge for 2 Years',
        competitorComparison: [
          { portalName: 'PropertyFinder Market Avg', averagePricePerSqFt: pricePerSqFt + 300 },
          { portalName: 'Bayut Index Benchmark', averagePricePerSqFt: pricePerSqFt + 250 }
        ]
      },
      priceHistory: [
        { year: '2023', pricePerSqFt: pricePerSqFt - 600, averageAreaPrice: pricePerSqFt - 700 },
        { year: '2024', pricePerSqFt: pricePerSqFt - 350, averageAreaPrice: pricePerSqFt - 450 },
        { year: '2025', pricePerSqFt: pricePerSqFt - 150, averageAreaPrice: pricePerSqFt - 200 },
        { year: '2026', pricePerSqFt, averageAreaPrice: pricePerSqFt - 100 }
      ],
      featured: true,
      status: 'New Launch',
      mlsSynced: true,
      dldPermitNumber: `DLD-PERMIT-${Math.floor(100000 + Math.random() * 900000)}-DXB`,
      description: `${title} is a premier off-plan development by ${developer} located in ${subLocation}. Featuring certified 5 USPs and high capital returns.`,
      amenities: ['Sky Infinity Pool', 'Fitness Club', 'Concierge Service', 'Private Parking', 'Balcony Terraces']
    };

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProperty)
      });
      const data = await res.json();
      if (data.success) {
        onAddProperty(newProperty);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
        // Reset form
        setTitle('');
        setDeveloper('');
      }
    } catch (err) {
      console.error('Error adding property:', err);
    }
  };

  const handleTriggerMlsSync = async () => {
    setSyncingMls(true);
    try {
      const res = await fetch('/api/mls-sync');
      const data = await res.json();
      setMlsSyncStatus(data);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setSyncingMls(false), 1200);
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Stats Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            <span>Off-plan Concierge Private Office Command Center</span>
          </div>
          <h2 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
            Agent CRM & Automated Lead Qualification Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Oversee qualified buyer inquiries, review chat transcripts with 5-USP summaries, manage VIP tour bookings, and upload new off-plan towers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'leads' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Leads & Google Sheets ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('properties-admin')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'properties-admin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Property Manager & Editor ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'broadcast' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp & Social Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('viewings')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'viewings' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>VIP Viewings ({viewings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pdf-injector')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'pdf-injector' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF Injector</span>
          </button>

          <button
            onClick={() => setActiveTab('uploader')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'uploader' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Property</span>
          </button>

          <button
            onClick={() => setActiveTab('mls')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'mls' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MLS Exchange</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LEADS & GOOGLE SHEETS */}
      {activeTab === 'leads' && (
        <div className="mt-8 space-y-6">
          {/* Linked Google Spreadsheet Card */}
          <GoogleSheetsSyncCard leads={leads} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leads List (1 col) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#091124] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400">Prospect Roster</span>
              <span className="text-amber-400 font-semibold">{leads.length} Leads Active</span>
            </div>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {leads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400/80 shadow-md shadow-amber-500/10'
                        : 'bg-[#060D1E] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white">{lead.name}</h4>
                        <span className="text-[11px] text-slate-400">{lead.country}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.status === 'Hot' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {lead.status} • {lead.leadScore}/100
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-300 line-clamp-1">
                      Budget: <strong className="text-amber-300">{lead.budgetRangeAED}</strong>
                    </div>

                    <div className="mt-1 text-[10px] text-slate-400 line-clamp-1 italic">
                      "{lead.chatSnippet}"
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lead Details & Transcript Inspector (2 cols) */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#091124] border border-amber-500/30 shadow-xl space-y-6">
            {selectedLead ? (
              <>
                {/* Lead Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-luxury text-xl font-bold text-white">{selectedLead.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                        AI Score: {selectedLead.leadScore}/100
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {selectedLead.country} • Preferred Language: {selectedLead.preferredLanguage}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold flex items-center space-x-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedLead.phone}</span>
                    </a>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center space-x-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>

                {/* AI Executive Assessment Dossier */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#0B1530] to-[#070D1E] border border-amber-500/40 space-y-3">
                  <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Gemini AI Automated Lead Qualification Summary</span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {selectedLead.qualificationSummary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-lg bg-[#060B18] border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Target Budget Range</span>
                      <span className="font-bold text-amber-300">{selectedLead.budgetRangeAED}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#060B18] border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">AI Recommended Next Action</span>
                      <span className="font-semibold text-emerald-400">{selectedLead.aiNotes}</span>
                    </div>
                  </div>
                </div>

                {/* AI Drafted Recommendations for this Lead */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>AI Drafted Property Recommendations for Client</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedLead.draftRecommendations.map((propId) => {
                      const prop = properties.find(p => p.id === propId) || properties[0];
                      return (
                        <div key={prop.id} className="p-3 rounded-xl bg-[#060D1E] border border-slate-800 flex items-center space-x-3">
                          <img src={prop.images[0]} alt={prop.title} className="w-14 h-12 rounded-lg object-cover" />
                          <div className="min-w-0 flex-1">
                            <h5 className="text-xs font-bold text-white line-clamp-1">{prop.title}</h5>
                            <span className="text-xs font-semibold text-amber-300">
                              {formatPrice(prop.startingPriceAED, currency)}
                            </span>
                            <span className="text-[10px] text-slate-400 block">{prop.completionDate} Handover</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chat History Snippet */}
                <div className="p-4 rounded-xl bg-[#060D1E] border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Latest Talking AI Transcript Interaction</span>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    "{selectedLead.chatSnippet}"
                  </p>
                </div>
              </>
            ) : (
              <div className="py-20 text-center text-slate-400 text-xs">
                Select a lead to inspect full AI qualification and chat history.
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* TAB: PROPERTY MANAGER & EDITOR */}
      {activeTab === 'properties-admin' && (
        <div className="mt-8">
          <PropertyAdminManager
            properties={properties}
            onPropertyUpdated={(updated) => {
              onUpdateProperty?.(updated);
            }}
            onPropertyAdded={(newProp) => {
              onAddProperty(newProp);
            }}
            onPropertyDeleted={(id) => {
              onDeleteProperty?.(id);
            }}
            currency={currency}
            onOpenSocialBroadcast={() => setActiveTab('broadcast')}
          />
        </div>
      )}

      {/* TAB: WHATSAPP & SOCIAL MEDIA BROADCAST STUDIO */}
      {activeTab === 'broadcast' && (
        <div className="mt-8">
          <SocialBroadcastStudio
            properties={properties}
            currency={currency}
          />
        </div>
      )}

      {/* TAB 2: VIP VIEWINGS MANAGER */}
      {activeTab === 'viewings' && (
        <div className="mt-8 space-y-4">
          <div className="p-6 rounded-2xl bg-[#091124] border border-slate-800 shadow-xl">
            <h3 className="font-luxury text-xl font-bold text-white mb-1">Booked VIP Viewings & Chauffeur Tours</h3>
            <p className="text-xs text-slate-400 mb-6">
              Manage client appointments for in-person Rolls-Royce tours and 3D Virtual Walkthroughs
            </p>

            <div className="divide-y divide-slate-800">
              {viewings.map((viewing) => (
                <div key={viewing.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">{viewing.clientName}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                        {viewing.viewingType}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        {viewing.status}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-amber-300">
                      {viewing.propertyTitle}
                    </div>

                    <p className="text-xs text-slate-400">
                      Special Protocol: {viewing.specialRequests}
                    </p>

                    <div className="text-[11px] text-slate-400">
                      Assigned Agent: <strong className="text-slate-300">{viewing.assignedAgent}</strong>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-bold text-white flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{viewing.date}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center space-x-1 justify-end mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{viewing.timeSlot}</span>
                      </div>
                    </div>

                    <a
                      href={`tel:${viewing.clientPhone}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center space-x-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Contact Client</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: PDF BROCHURE & DATA INJECTION STUDIO */}
      {activeTab === 'pdf-injector' && (
        <div className="mt-8 space-y-6">
          <div className="p-6 rounded-2xl bg-[#091124] border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <UploadCloud className="w-4 h-4 text-amber-400" />
                  <span>Developer Document Ingestion Engine</span>
                </div>
                <h3 className="font-luxury text-xl sm:text-2xl font-bold text-white mt-1">
                  PDF Brochure Upload & Property Data Injection Studio
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Upload developer sales decks, payment plans (e.g. Danube 1% monthly or Azizi 50/50), or handover schedules to automatically correct and synchronize listings with certified 5 USPs.
                </p>
              </div>

              <button
                onClick={() => onOpenPdfInjector && onOpenPdfInjector()}
                className="px-5 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all shrink-0 cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-slate-950" />
                <span>Open PDF Injection Studio</span>
              </button>
            </div>

            {/* List of properties with quick injection triggers */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Managed Off-Plan Portfolio ({properties.length} Towers)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map(p => (
                  <div key={p.id} className="p-4 rounded-xl bg-[#060D1E] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                            {p.developer}
                          </span>
                          <h5 className="text-sm font-bold text-white">{p.title}</h5>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 shrink-0">
                          {p.status}
                        </span>
                      </div>

                      <div className="mt-2 text-xs space-y-1 text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Starting Price:</span>
                          <span className="text-amber-300 font-bold">AED {formatPrice(p.startingPriceAED, 'AED')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Completion:</span>
                          <span className="text-white font-medium">{p.completionDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Payment Plan:</span>
                          <span className="text-white font-medium truncate max-w-[140px]" title={p.paymentPlan}>{p.paymentPlan}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">5 USPs:</span>
                          <span className="text-emerald-400 font-bold">5 Certified</span>
                        </div>
                      </div>

                      {p.injectedPdfDetails && (
                        <div className="mt-2.5 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300">
                          <p className="font-semibold">✓ Synced from: {p.injectedPdfDetails.fileName}</p>
                          <p className="text-slate-400 text-[9px] mt-0.5 truncate">{p.injectedPdfDetails.changesSummary}</p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onOpenPdfInjector && onOpenPdfInjector(p)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border border-slate-700 hover:border-amber-400 cursor-pointer"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload PDF / Correct Details</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EASY PROPERTY UPLOADER (AI 5-USPs) */}
      {activeTab === 'uploader' && (
        <div className="mt-8 max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#091124] border border-amber-500/30 shadow-2xl">
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Off-Plan Inventory Portal
              </span>
              <h3 className="font-luxury text-2xl font-bold text-white mt-1">
                Upload New UAE Off-Plan Development
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                AI automatically generates 5 compelling project USPs and publishes to the live portal with DLD compliance.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              MLS Sync Ready
            </span>
          </div>

          <form onSubmit={handleUploadProperty} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Baccarat Residences Downtown"
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Master Developer *
                </label>
                <input
                  type="text"
                  required
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  placeholder="e.g. Shamal Holding / Binghatti / Emaar"
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Sub-Location / District
                </label>
                <select
                  value={subLocation}
                  onChange={(e) => {
                    setSubLocation(e.target.value);
                    setLocation(`${e.target.value}, Dubai`);
                  }}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Downtown Dubai">Downtown Dubai</option>
                  <option value="Palm Jumeirah">Palm Jumeirah</option>
                  <option value="Business Bay">Business Bay</option>
                  <option value="Dubai Harbour">Dubai Harbour</option>
                  <option value="Palm Jebel Ali">Palm Jebel Ali</option>
                  <option value="Dubai Creek Harbour">Dubai Creek Harbour</option>
                  <option value="Dubai South">Dubai South (Azizi Venice)</option>
                  <option value="Sharjah (Azizi Florence)">Sharjah (Azizi Florence)</option>
                  <option value="Jumeirah Lake Towers (JLT)">JLT (Danube Diamondz)</option>
                  <option value="Al Marjan Island">Al Marjan Island (RAK Casino)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Starting Price (AED)
                </label>
                <input
                  type="number"
                  value={startingPriceAED}
                  onChange={(e) => setStartingPriceAED(Number(e.target.value))}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Handover Timeline
                </label>
                <input
                  type="text"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  placeholder="e.g. Q4 2027"
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Payment Plan Structure
                </label>
                <input
                  type="text"
                  value={paymentPlan}
                  onChange={(e) => setPaymentPlan(e.target.value)}
                  placeholder="e.g. 70/30 (20% Down, 50% Construction, 30% on Handover)"
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  High-Resolution Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Property Classification
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Luxury Apartment">Luxury Apartment</option>
                  <option value="Branded Residence">Branded Residence</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Waterfront Mansion">Waterfront Mansion</option>
                  <option value="Sky Villa">Sky Villa</option>
                </select>
              </div>
            </div>

            {/* MANDATORY 5 USPs GENERATION BLOCK */}
            <div className="p-5 rounded-2xl bg-[#060D1E] border border-amber-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      5 Certified Project USPs (Mandatory Standard)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Every project on Off-plan Concierge must present exactly 5 high-converting selling points.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateUspsWithAi}
                  disabled={generatingUsps}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 hover:brightness-110 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{generatingUsps ? 'Generating...' : 'Auto-Generate 5 USPs with Gemini AI'}</span>
                </button>
              </div>

              {/* 5 Input rows */}
              <div className="space-y-2">
                {usps.map((usp, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/30">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={usp}
                      onChange={(e) => {
                        const updated = [...usps] as [string, string, string, string, string];
                        updated[index] = e.target.value;
                        setUsps(updated);
                      }}
                      className="w-full bg-[#091124] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {uploadSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Property successfully added to live inventory with 5 certified USPs and MLS sync!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-sm shadow-xl hover:brightness-110 active:scale-98 transition-all"
            >
              Publish Off-Plan Project to Off-plan Concierge Portal
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: MLS & DLD INTEGRATION STATUS */}
      {activeTab === 'mls' && (
        <div className="mt-8 space-y-6">
          <div className="p-6 rounded-2xl bg-[#091124] border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-luxury text-xl font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Dubai Land Department (DLD) & MLS National Integration</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Active bi-directional synchronization with DLD REST API, RERA Escrow Guarantee databases, and UAE Real Estate Exchange.
                </p>
              </div>

              <button
                onClick={handleTriggerMlsSync}
                disabled={syncingMls}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncingMls ? 'animate-spin text-amber-400' : ''}`} />
                <span>{syncingMls ? 'Synchronizing...' : 'Trigger Sync Reconciliation'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              {mlsSyncStatus?.databases?.map((db: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-[#060D1E] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      {db.status}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white leading-tight">{db.name}</h5>
                  <span className="text-[10px] text-slate-400 block">Latency: {db.latencyMs}ms</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
