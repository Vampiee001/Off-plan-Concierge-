import React, { useState, useMemo } from 'react';
import { PropertyCard } from './PropertyCard';
import { Property } from '../types';
import { CurrencyCode } from '../utils/formatters';
import { LanguageCode, translations } from '../utils/translations';
import { SlidersHorizontal, ArrowUpDown, Building, CheckCircle2 } from 'lucide-react';

interface PropertyListProps {
  properties: Property[];
  currency: CurrencyCode;
  language: LanguageCode;
  searchQuery: string;
  selectedLocation: string;
  selectedDeveloper: string;
  selectedBedrooms: string;
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenViewingModal: (property?: Property) => void;
  onAskAiAboutProperty: (property: Property) => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  currency,
  language,
  searchQuery,
  selectedLocation,
  selectedDeveloper,
  selectedBedrooms,
  savedPropertyIds,
  onToggleSave,
  onSelectProperty,
  onOpenViewingModal,
  onAskAiAboutProperty
}) => {
  const [sortBy, setSortBy] = useState<'roi' | 'price-low' | 'price-high' | 'handover'>('roi');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>('All');
  const t = translations[language];

  // Filtering & Sorting
  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDev = item.developer.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q) || item.subLocation.toLowerCase().includes(q);
        const matchesUsp = item.usps.some(u => u.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDev && !matchesLoc && !matchesUsp) return false;
      }

      // Location filter
      if (selectedLocation !== 'All' && !item.location.toLowerCase().includes(selectedLocation.toLowerCase()) && !item.subLocation.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Developer filter
      if (selectedDeveloper !== 'All' && !item.developer.toLowerCase().includes(selectedDeveloper.toLowerCase())) {
        return false;
      }

      // Bedrooms filter
      if (selectedBedrooms !== 'All') {
        if (!item.bedrooms.includes(selectedBedrooms)) return false;
      }

      // Type filter
      if (propertyTypeFilter !== 'All' && item.propertyType !== propertyTypeFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.startingPriceAED - b.startingPriceAED;
      if (sortBy === 'price-high') return b.startingPriceAED - a.startingPriceAED;
      if (sortBy === 'handover') return a.handoverYear - b.handoverYear;
      // Default: sort by ROI (extract number)
      const roiA = parseFloat(a.projectedROI) || 0;
      const roiB = parseFloat(b.projectedROI) || 0;
      return roiB - roiA;
    });
  }, [properties, searchQuery, selectedLocation, selectedDeveloper, selectedBedrooms, propertyTypeFilter, sortBy]);

  const propertyTypes = ['All', 'Branded Residence', 'Penthouse', 'Waterfront Mansion', 'Luxury Apartment'];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header & Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Building className="w-4 h-4 text-amber-400" />
            <span>UAE Prime Off-Plan Portfolio</span>
          </div>
          <h2 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
            {t.exploreProperties}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Showing {filteredProperties.length} verified off-plan developments with 5 certified USPs & 100% Escrow security
          </p>
        </div>

        {/* Filter Pills & Sorting */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Property Type Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => setPropertyTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  propertyTypeFilter === type
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="roi" className="bg-slate-900">Highest Net ROI</option>
              <option value="price-low" className="bg-slate-900">Price: Low to High</option>
              <option value="price-high" className="bg-slate-900">Price: High to Low</option>
              <option value="handover" className="bg-slate-900">Earliest Handover</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Cards Grid */}
      {filteredProperties.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              currency={currency}
              isSaved={savedPropertyIds.includes(property.id)}
              onToggleSave={onToggleSave}
              onSelectProperty={onSelectProperty}
              onOpenViewingModal={onOpenViewingModal}
              onAskAiAboutProperty={onAskAiAboutProperty}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center py-16 px-4 rounded-2xl bg-[#091124] border border-slate-800 max-w-xl mx-auto">
          <p className="text-base font-semibold text-white">No off-plan projects matched your specific criteria.</p>
          <p className="text-xs text-slate-400 mt-2">
            Try resetting your filters or ask our Talking AI Concierge for off-market Dubai developer releases.
          </p>
        </div>
      )}
    </section>
  );
};
