import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Calendar, 
  MapPin, 
  Building2, 
  TrendingUp, 
  Scale, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Share2, 
  Heart,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Maximize2,
  FileText,
  UploadCloud,
  FileDown,
  MessageCircle
} from 'lucide-react';
import { Property } from '../types';
import { CurrencyCode, formatPrice, formatCompactPrice } from '../utils/formatters';
import { exportPropertyToPdf } from '../services/pdfExport';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  currency: CurrencyCode;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenViewingModal: (property: Property) => void;
  onAskAiAboutProperty: (property: Property) => void;
  onOpenPdfInjector?: (property: Property) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  currency,
  isSaved,
  onToggleSave,
  onOpenViewingModal,
  onAskAiAboutProperty,
  onOpenPdfInjector
}) => {
  if (!property) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'virtual-tour' | 'price-history' | 'developer-compare' | 'payment-plan'>('overview');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [virtualRoom, setVirtualRoom] = useState<'living' | 'master' | 'terrace'>('living');
  const [tourRotation, setTourRotation] = useState(0);

  // Virtual room panoramas
  const virtualRooms = {
    living: {
      name: 'Grand Sky Living & Dining',
      url: property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      hotspots: [
        { label: 'Unobstructed Panoramic Skyline View', x: '45%', y: '40%' },
        { label: 'Italian Statuario Marble Flooring', x: '60%', y: '75%' }
      ]
    },
    master: {
      name: 'Presidential Master Suite',
      url: property.images[1] || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80',
      hotspots: [
        { label: 'Custom Dressing Salon & Safe Room', x: '25%', y: '50%' },
        { label: 'Acoustic Soundproofing Glass', x: '70%', y: '35%' }
      ]
    },
    terrace: {
      name: 'Private Cantilevered Sky Pool',
      url: property.images[2] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
      hotspots: [
        { label: 'Temperature Controlled Horizon Pool', x: '50%', y: '60%' },
        { label: 'Burj Khalifa Front-Row Line of Sight', x: '80%', y: '30%' }
      ]
    }
  };

  const handleRotate = (deg: number) => {
    setTourRotation(prev => (prev + deg) % 360);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl my-8 rounded-2xl bg-[#070D1E] border border-amber-500/30 shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#0A1227] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-xs font-bold">
              {property.status}
            </span>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DLD Permit: {property.dldPermitNumber}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400">100% Escrow Secured</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {onOpenPdfInjector && (
              <button
                onClick={() => onOpenPdfInjector(property)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-semibold border border-slate-700 hover:border-amber-400 transition-all flex items-center space-x-1.5 cursor-pointer"
                title="Upload developer brochure or inject corrections into this listing"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Inject PDF / Correct</span>
              </button>
            )}

            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Save to Client Portal"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 bg-[#081024] border-b border-slate-800 flex items-center space-x-1 sm:space-x-4 overflow-x-auto scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & 5 USPs
          </button>

          <button
            onClick={() => setActiveTab('virtual-tour')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'virtual-tour'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>360° Virtual Walkthrough</span>
          </button>

          <button
            onClick={() => setActiveTab('price-history')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'price-history'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Price History & Capital Growth</span>
          </button>

          <button
            onClick={() => setActiveTab('developer-compare')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'developer-compare'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Developer & Web Benchmark</span>
          </button>

          <button
            onClick={() => setActiveTab('payment-plan')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'payment-plan'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Payment Plan & Milestones</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW & 5 USPs */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Hero Image & Gallery */}
              <div className="space-y-3">
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src={property.images[activeGalleryIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>{property.location}</span>
                    </div>
                    <span className="font-semibold text-amber-300">{property.bedrooms}</span>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveGalleryIndex(i)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeGalleryIndex === i ? 'border-amber-400 scale-95' : 'border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Key Pricing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#091124] border border-amber-500/20">
                <div className="md:col-span-2">
                  <div className="text-xs font-semibold text-amber-400">{property.developer}</div>
                  <h1 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
                    {property.title}
                  </h1>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#060B18] border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Starting Price</span>
                    <div className="font-luxury text-2xl font-bold text-amber-300 mt-1">
                      {formatPrice(property.startingPriceAED, currency)}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      ~{formatCompactPrice(property.pricePerSqFt, currency)} / sq.ft
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Handover</span>
                      <span className="font-bold text-white">{property.completionDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Projected Net ROI</span>
                      <span className="font-bold text-emerald-400">{property.projectedROI}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MANDATORY 5 UNIQUE SELLING POINTS (USPs) */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0C1630] to-[#081024] border border-amber-500/40 shadow-xl">
                <div className="flex items-center space-x-2 text-amber-300 mb-4">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h3 className="font-luxury text-lg font-bold">5 Certified Project USPs (Unique Selling Points)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.usps.map((usp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#070D1E]/80 border border-amber-500/20 hover:border-amber-400/50 transition-colors flex items-start space-x-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {usp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Signature Lifestyle Amenities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE 360° VIRTUAL WALKTHROUGH */}
          {activeTab === 'virtual-tour' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>360° Panoramic Virtual Tour & Walkthrough</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Drag or use rotation controls to explore rooms in ultra-high resolution
                  </p>
                </div>

                {/* Room selector tabs */}
                <div className="flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setVirtualRoom('living')}
                    className={`px-3 py-1 rounded-lg ${virtualRoom === 'living' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'}`}
                  >
                    Living & Terrace
                  </button>
                  <button
                    onClick={() => setVirtualRoom('master')}
                    className={`px-3 py-1 rounded-lg ${virtualRoom === 'master' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'}`}
                  >
                    Master Suite
                  </button>
                  <button
                    onClick={() => setVirtualRoom('terrace')}
                    className={`px-3 py-1 rounded-lg ${virtualRoom === 'terrace' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'}`}
                  >
                    Sky Pool Deck
                  </button>
                </div>
              </div>

              {/* Simulated 360 viewer canvas */}
              <div className="relative h-[420px] rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-950 select-none">
                <div 
                  className="w-full h-full bg-cover bg-center transition-all duration-300"
                  style={{
                    backgroundImage: `url('${virtualRooms[virtualRoom].url}')`,
                    transform: `scale(1.15) rotate(${tourRotation * 0.05}deg) translateX(${tourRotation * 0.5}px)`
                  }}
                />
                
                {/* 360 Overlay watermark and compass */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-xs font-semibold text-amber-300 border border-amber-500/30 flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>360° Interactive Mode • {virtualRooms[virtualRoom].name}</span>
                </div>

                {/* Interactive Hotspots */}
                {virtualRooms[virtualRoom].hotspots.map((spot, i) => (
                  <div
                    key={i}
                    style={{ left: spot.x, top: spot.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-amber-400 opacity-75" />
                      <div className="w-5 h-5 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center shadow-lg">
                        <span className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div className="hidden group-hover:block absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#060B18]/95 text-white text-[11px] font-semibold border border-amber-500/40 shadow-xl z-30">
                      {spot.label}
                    </div>
                  </div>
                ))}

                {/* Interactive 360 Navigation controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-3 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 z-20">
                  <button
                    onClick={() => handleRotate(-45)}
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
                    title="Pan Left"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setTourRotation(0)}
                    className="p-1.5 rounded-lg hover:bg-white/20 text-amber-300 transition-colors flex items-center space-x-1 text-xs"
                    title="Reset Angle"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => handleRotate(45)}
                    className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
                    title="Pan Right"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#091124] border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>Want to experience this via Apple Vision Pro or Meta Quest VR headset?</span>
                <button
                  onClick={() => onOpenViewingModal(property)}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold hover:bg-amber-500/30"
                >
                  Request VR Session Link
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PRICE HISTORY & APPRECIATION CHART */}
          {activeTab === 'price-history' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>Historical Price Evolution & District Benchmark (AED / sq.ft)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Verified transaction data tracked across {property.subLocation} (2021 - 2026)
                </p>
              </div>

              {/* Bar Chart Visualization */}
              <div className="p-6 rounded-2xl bg-[#091124] border border-slate-800 space-y-5">
                <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-slate-800">
                  {property.priceHistory.map((pt, i) => {
                    const maxVal = 7000;
                    const propHeight = Math.round((pt.pricePerSqFt / maxVal) * 100);
                    const avgHeight = Math.round((pt.averageAreaPrice / maxVal) * 100);

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full flex items-end justify-center gap-1.5 h-48">
                          {/* Project bar (Gold) */}
                          <div
                            style={{ height: `${propHeight}%` }}
                            className="w-5 sm:w-8 rounded-t-lg bg-gradient-to-t from-amber-600 to-yellow-400 transition-all group-hover:brightness-120 relative"
                          >
                            <span className="hidden group-hover:block absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-slate-900 px-1.5 py-0.5 rounded border border-amber-500/40 text-amber-300 font-bold whitespace-nowrap">
                              AED {pt.pricePerSqFt}
                            </span>
                          </div>

                          {/* Area average bar (Navy/Slate) */}
                          <div
                            style={{ height: `${avgHeight}%` }}
                            className="w-3 sm:w-5 rounded-t-lg bg-slate-700/80 transition-all relative"
                          >
                            <span className="hidden group-hover:block absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 text-slate-300 whitespace-nowrap">
                              Area: {pt.averageAreaPrice}
                            </span>
                          </div>
                        </div>

                        {/* Year label */}
                        <span className="text-xs font-semibold text-slate-400">{pt.year}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center space-x-6 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-amber-400" />
                    <span className="text-slate-200 font-medium">{property.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-slate-700" />
                    <span className="text-slate-400">{property.subLocation} Average</span>
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#091124] border border-slate-800">
                  <span className="text-[10px] font-semibold uppercase text-slate-400">Total Capital Growth</span>
                  <div className="text-lg font-bold text-emerald-400 mt-1">
                    +{Math.round(((property.pricePerSqFt - property.priceHistory[0].pricePerSqFt) / property.priceHistory[0].pricePerSqFt) * 100)}%
                  </div>
                  <span className="text-[10px] text-slate-400">Since Initial Launch</span>
                </div>

                <div className="p-4 rounded-xl bg-[#091124] border border-slate-800">
                  <span className="text-[10px] font-semibold uppercase text-slate-400">Projected Delivery Yield</span>
                  <div className="text-lg font-bold text-amber-300 mt-1">{property.projectedROI}</div>
                  <span className="text-[10px] text-slate-400">Annual Short/Long Term Net</span>
                </div>

                <div className="p-4 rounded-xl bg-[#091124] border border-slate-800">
                  <span className="text-[10px] font-semibold uppercase text-slate-400">Secondary Market Premium</span>
                  <div className="text-lg font-bold text-white mt-1">
                    +{Math.round(((property.pricePerSqFt - property.priceHistory[property.priceHistory.length - 1].averageAreaPrice) / property.priceHistory[property.priceHistory.length - 1].averageAreaPrice) * 100)}%
                  </div>
                  <span className="text-[10px] text-slate-400">Above District Average</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DEVELOPER & WEB BENCHMARK */}
          {activeTab === 'developer-compare' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Developer Track Record & Web Portal Benchmark</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Comparing developer credentials and prices against major real estate databases
                </p>
              </div>

              {/* Developer Credentials Card */}
              <div className="p-5 rounded-2xl bg-[#091124] border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Developer</span>
                  <div className="text-sm font-bold text-amber-300 mt-0.5">{property.developerComparison.developerName}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Delivery Track Record</span>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">{property.developerComparison.onTimeDeliveryRate} On-Time</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Completed Projects</span>
                  <div className="text-sm font-bold text-white mt-0.5">{property.developerComparison.projectsCompleted} Towers</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Exclusive Buyer Perk</span>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">{property.developerComparison.exclusivePerk}</div>
                </div>
              </div>

              {/* Benchmark comparison table */}
              <div className="rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A1227] text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Market Source / Portal</th>
                      <th className="py-3 px-4">Benchmark Price / sq.ft</th>
                      <th className="py-3 px-4">Variance vs Concierge Direct</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#070D1E]">
                    <tr className="bg-amber-500/10 font-bold text-amber-200">
                      <td className="py-3 px-4 flex items-center space-x-1.5">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>Off-plan Concierge Direct Price</span>
                      </td>
                      <td className="py-3 px-4 text-amber-300">AED {property.pricePerSqFt}</td>
                      <td className="py-3 px-4 text-emerald-400">Guaranteed Lowest Tier</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">Active Direct</span>
                      </td>
                    </tr>
                    {property.developerComparison.competitorComparison.map((comp, i) => (
                      <tr key={i} className="text-slate-300 hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-medium">{comp.portalName}</td>
                        <td className="py-3 px-4 text-slate-200">AED {comp.averagePricePerSqFt}</td>
                        <td className="py-3 px-4 text-rose-300 font-medium">
                          +{Math.round(((comp.averagePricePerSqFt - property.pricePerSqFt) / property.pricePerSqFt) * 100)}% Higher
                        </td>
                        <td className="py-3 px-4 text-slate-400">Indexed</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: PAYMENT PLAN & MILESTONES */}
          {activeTab === 'payment-plan' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Developer Payment Plan & Construction Milestones</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {property.paymentPlan} • 0% Interest direct developer installments
                </p>
              </div>

              {/* Visual Timeline Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#091124] border border-amber-500/30">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center mb-2">
                    1
                  </div>
                  <h4 className="text-sm font-bold text-white">Down Payment</h4>
                  <div className="font-luxury text-lg font-bold text-amber-300 mt-1">
                    {property.downPaymentPercent}%
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Upon reservation + 4% DLD registration (Ask for waiver)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#091124] border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center mb-2">
                    2
                  </div>
                  <h4 className="text-sm font-bold text-white">During Construction</h4>
                  <div className="font-luxury text-lg font-bold text-white mt-1">
                    {100 - property.downPaymentPercent - 30}%
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Split across foundation, structure, and glazing milestones
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#091124] border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center mb-2">
                    3
                  </div>
                  <h4 className="text-sm font-bold text-white">Upon Handover</h4>
                  <div className="font-luxury text-lg font-bold text-emerald-400 mt-1">
                    30%
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    On key handover in {property.completionDate} (Eligible for UAE mortgage)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#0A1227] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs">
            <span className="text-slate-400 block">Starting Investment:</span>
            <span className="font-luxury text-lg font-bold text-amber-300">
              {formatPrice(property.startingPriceAED, currency)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => exportPropertyToPdf(property)}
              className="px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs flex items-center space-x-1.5 border border-amber-500/30 transition-all shadow-md"
              title="Download Client VIP PDF Brochure with Mark's Info"
            >
              <FileDown className="w-4 h-4 text-amber-400" />
              <span>Download Client PDF</span>
            </button>

            <a
              href={`https://wa.me/971585538382?text=${encodeURIComponent(`Hi Mark, I would like to inquire about ${property.title} in ${property.location} (Starting from AED ${property.startingPriceAED.toLocaleString()}). Please share available layouts & VIP allocations.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-xs flex items-center space-x-1.5 border border-emerald-500/30 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Mark</span>
            </a>

            <button
              onClick={() => {
                onAskAiAboutProperty(property);
                onClose();
              }}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Discuss with AI</span>
            </button>

            <button
              onClick={() => {
                onOpenViewingModal(property);
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center space-x-1.5"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book VIP Viewing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
