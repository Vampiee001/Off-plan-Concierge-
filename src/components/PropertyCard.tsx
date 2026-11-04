import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  Eye, 
  Heart, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { Property } from '../types';
import { CurrencyCode, formatPrice, formatCompactPrice } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  currency: CurrencyCode;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenViewingModal: (property: Property) => void;
  onAskAiAboutProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  isSaved,
  onToggleSave,
  onSelectProperty,
  onOpenViewingModal,
  onAskAiAboutProperty
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllUsps, setShowAllUsps] = useState(false);

  // Calculate 5-year appreciation if history exists
  const latestPrice = property.priceHistory[property.priceHistory.length - 1]?.pricePerSqFt || property.pricePerSqFt;
  const initialPrice = property.priceHistory[0]?.pricePerSqFt || property.pricePerSqFt;
  const appreciationPercent = Math.round(((latestPrice - initialPrice) / initialPrice) * 100);

  return (
    <div className="group rounded-2xl bg-[#091124] border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col overflow-hidden">
      {/* Image Gallery Header */}
      <div className="relative h-64 overflow-hidden bg-slate-900">
        <img
          src={property.images[activeImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-md">
            {property.status}
          </span>
          <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-[#0B142A]/90 backdrop-blur-md text-amber-300 border border-amber-500/30">
            {property.projectedROI}
          </span>
        </div>

        {/* Favorite & 360 Tour Quick Button */}
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
          <button
            onClick={() => onSelectProperty(property)}
            className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 transition-all"
            title="Open 360° Virtual Walkthrough"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => onToggleSave(property.id)}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-black/60 hover:bg-black/80 text-white'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save to Client Portal'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Thumbnail switcher bar */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-3 right-3 flex justify-center space-x-1.5 z-10">
            {property.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  activeImageIndex === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Developer & Location Row */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-amber-400/90">{property.developer}</span>
            <div className="flex items-center space-x-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{property.subLocation}</span>
            </div>
          </div>

          {/* Project Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="font-luxury text-lg font-bold text-white hover:text-amber-300 cursor-pointer transition-colors leading-snug line-clamp-1"
          >
            {property.title}
          </h3>

          {/* Property Spec Pills */}
          <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] text-slate-300">
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
              {property.bedrooms}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
              {property.sizeRangeSqFt}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+{appreciationPercent}% 5-Yr Growth</span>
            </span>
          </div>

          {/* Pricing & Handover */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400">Starting Price</span>
              <div className="font-luxury text-xl font-bold text-amber-300">
                {formatPrice(property.startingPriceAED, currency)}
              </div>
              <span className="text-[11px] text-slate-400">
                ~{formatCompactPrice(property.pricePerSqFt, currency)}/sq.ft
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Handover</span>
              <div className="text-xs font-bold text-slate-200">{property.completionDate}</div>
              <span className="text-[10px] text-emerald-400 font-medium block">
                {property.paymentPlan.split(' ')[0]} Plan
              </span>
            </div>
          </div>

          {/* Enforced 5 Unique Selling Points (USPs) Section */}
          <div className="mt-4 rounded-xl bg-[#060D1E] border border-amber-500/20 p-3">
            <div 
              onClick={() => setShowAllUsps(!showAllUsps)}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>5 Certified Project USPs</span>
              </div>
              <div className="flex items-center space-x-1 text-[11px] text-amber-400 font-semibold group-hover:text-amber-300">
                <span>{showAllUsps ? 'Less' : 'View All 5'}</span>
                {showAllUsps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* USPs List */}
            <ul className="mt-2 text-xs text-slate-300 space-y-1.5">
              {(showAllUsps ? property.usps : property.usps.slice(0, 2)).map((usp, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-bold text-amber-400 text-[11px] mt-0.5">{idx + 1}.</span>
                  <span className="leading-tight text-slate-200">{usp}</span>
                </li>
              ))}
              {!showAllUsps && (
                <li className="text-[11px] text-amber-400/80 italic font-medium">
                  + 3 more exclusive project USPs...
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProperty(property)}
              className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>360° & Trends</span>
            </button>

            <button
              onClick={() => onAskAiAboutProperty(property)}
              className="py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask Talking AI</span>
            </button>
          </div>

          <button
            onClick={() => onOpenViewingModal(property)}
            className="w-full py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center space-x-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-950" />
            <span>Book Private VIP Chauffeur Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
};
