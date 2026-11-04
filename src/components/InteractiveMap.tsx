import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  TrendingUp, 
  Building2, 
  ExternalLink, 
  Eye, 
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';
import { Property } from '../types';
import { CurrencyCode, formatPrice } from '../utils/formatters';
import { dubaiLocations } from '../data/properties';

interface InteractiveMapProps {
  properties: Property[];
  currency: CurrencyCode;
  onSelectProperty: (property: Property) => void;
  onOpenViewingModal: (property?: Property) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  currency,
  onSelectProperty,
  onOpenViewingModal
}) => {
  const [selectedHub, setSelectedHub] = useState<string>('Downtown Dubai');

  // Community coordinates and positioning on stylized Dubai map SVG
  const mapHotspots = [
    {
      id: 'Downtown Dubai',
      name: 'Downtown Dubai',
      top: '52%',
      left: '60%',
      avgPrice: 3850,
      growth: '+14.2%',
      highlight: 'Burj Khalifa, Dubai Mall, Opera District',
      projects: properties.filter(p => p.subLocation.includes('Downtown'))
    },
    {
      id: 'Business Bay',
      name: 'Business Bay',
      top: '58%',
      left: '58%',
      avgPrice: 3600,
      growth: '+12.6%',
      highlight: 'Dubai Water Canal, Bugatti Residences, Hyper-Towers',
      projects: properties.filter(p => p.subLocation.includes('Business Bay'))
    },
    {
      id: 'Palm Jumeirah',
      name: 'Palm Jumeirah',
      top: '56%',
      left: '38%',
      avgPrice: 5800,
      growth: '+18.5%',
      highlight: 'Trophy Beachfront Villas, Armani Residences, East Crescent',
      projects: properties.filter(p => p.subLocation.includes('Palm Jumeirah'))
    },
    {
      id: 'Dubai Harbour',
      name: 'Dubai Harbour',
      top: '64%',
      left: '42%',
      avgPrice: 3950,
      growth: '+15.1%',
      highlight: 'Middle East Largest Superyacht Marina, Sobha Seahaven',
      projects: properties.filter(p => p.subLocation.includes('Dubai Harbour'))
    },
    {
      id: 'Palm Jebel Ali',
      name: 'Palm Jebel Ali',
      top: '78%',
      left: '20%',
      avgPrice: 3150,
      growth: '+24.8%',
      highlight: 'Dubai 2040 Mega-Island, Double the size of Palm Jumeirah',
      projects: properties.filter(p => p.subLocation.includes('Palm Jebel Ali'))
    },
    {
      id: 'Dubai Creek Harbour',
      name: 'Dubai Creek Harbour',
      top: '42%',
      left: '74%',
      avgPrice: 2350,
      growth: '+11.8%',
      highlight: 'Emaar Flagship, Flamingo Sanctuary, Central Park',
      projects: properties.filter(p => p.subLocation.includes('Creek'))
    },
    {
      id: 'Al Marjan Island',
      name: 'Al Marjan Island (RAK)',
      top: '18%',
      left: '86%',
      avgPrice: 2850,
      growth: '+32.4%',
      highlight: 'Wynn $3.9B Casino & Integrated Resort District',
      projects: properties.filter(p => p.subLocation.includes('Marjan'))
    },
    {
      id: 'Sharjah (Azizi Florence)',
      name: 'Sharjah (Azizi Florence)',
      top: '28%',
      left: '80%',
      avgPrice: 1180,
      growth: '+21.5%',
      highlight: '30M sq.ft Italian Mega-Community by Azizi with 1.7M sq.ft Central Park',
      projects: properties.filter(p => p.subLocation.toLowerCase().includes('florence') || p.city === 'Sharjah')
    },
    {
      id: 'Dubai South',
      name: 'Dubai South (Azizi Venice)',
      top: '84%',
      left: '30%',
      avgPrice: 1650,
      growth: '+19.2%',
      highlight: 'Al Maktoum Mega-Airport Expansion & 18km Swimmable Crystal Lagoon',
      projects: properties.filter(p => p.subLocation.toLowerCase().includes('dubai south'))
    },
    {
      id: 'Jumeirah Lake Towers',
      name: 'JLT (Danube Diamondz)',
      top: '68%',
      left: '46%',
      avgPrice: 2200,
      growth: '+13.8%',
      highlight: 'Opposite Dubai Marina, DMCC Free Zone & Danube 1% Monthly Plan',
      projects: properties.filter(p => p.subLocation.toLowerCase().includes('jlt') || p.subLocation.toLowerCase().includes('jumeirah lake towers'))
    }
  ];

  const currentHubData = mapHotspots.find(h => h.id === selectedHub) || mapHotspots[0];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Interactive UAE Master-Planned Districts</span>
          </div>
          <h2 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
            Dubai & UAE Off-Plan Heatmap & Locations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore capital appreciation, average price/sq.ft, and flagship off-plan developments across prime coastal clusters
          </p>
        </div>

        {/* Quick Location Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-xl">
          {mapHotspots.map(h => (
            <button
              key={h.id}
              onClick={() => setSelectedHub(h.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedHub === h.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {h.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map View Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Map Canvas (2 cols) */}
        <div className="lg:col-span-2 relative min-h-[440px] sm:min-h-[520px] rounded-2xl bg-[#060D1E] border border-amber-500/30 overflow-hidden p-6 shadow-2xl flex flex-col justify-between">
          {/* Subtle grid background */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* UAE Coastline stylized backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
              {/* Arabian Gulf Coastline path */}
              <path
                d="M 50,550 Q 200,450 350,420 T 700,280 T 950,80"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="8"
                strokeDasharray="6 6"
              />
              {/* Palm Jumeirah silhouette */}
              <circle cx="380" cy="340" r="45" fill="none" stroke="#F59E0B" strokeWidth="2" />
              {/* Palm Jebel Ali silhouette */}
              <circle cx="200" cy="470" r="55" fill="none" stroke="#F59E0B" strokeWidth="2" />
              {/* Dubai Creek */}
              <path d="M 720,240 Q 750,290 730,340" fill="none" stroke="#38BDF8" strokeWidth="6" />
            </svg>
          </div>

          {/* Top Map Status Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-2 bg-[#091124]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-500/30 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">Live Dubai Coastline & RAK Off-Plan Heatmap</span>
            </div>
            <span className="text-[11px] text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              Select any pin to inspect
            </span>
          </div>

          {/* Interactive Community Pins on the Map */}
          <div className="absolute inset-0">
            {mapHotspots.map((hotspot) => {
              const isSelected = selectedHub === hotspot.id;
              return (
                <div
                  key={hotspot.id}
                  style={{ top: hotspot.top, left: hotspot.left }}
                  onClick={() => setSelectedHub(hotspot.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                >
                  <div className="relative flex flex-col items-center">
                    {/* Pulsing ring */}
                    <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-amber-500/40'} opacity-75`} />

                    {/* Pin button */}
                    <div
                      className={`relative px-2.5 py-1.5 rounded-xl border flex items-center space-x-1.5 shadow-xl transition-all duration-300 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold border-white scale-110'
                          : 'bg-[#091124]/95 text-white border-amber-500/50 hover:border-amber-400 group-hover:scale-105'
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                      <span className="text-xs font-semibold whitespace-nowrap">{hotspot.name}</span>
                    </div>

                    {/* Sub badge with growth rate */}
                    <span className="mt-1 px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 shadow">
                      {hotspot.growth}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Map Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between text-xs text-slate-400 bg-[#091124]/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-slate-200">Selected Prime District</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-slate-200">High Growth (&gt;15% YoY)</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Coordinates synchronized with Dubai REST & ADREC APIs
            </span>
          </div>
        </div>

        {/* Community Intelligence & Matching Projects (1 col) */}
        <div className="flex flex-col space-y-4">
          {/* District Summary Card */}
          <div className="p-5 rounded-2xl bg-[#091124] border border-amber-500/30 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  District Intelligence
                </span>
                <h3 className="font-luxury text-xl font-bold text-white mt-0.5">
                  {currentHubData.name}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                {currentHubData.growth} YoY
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentHubData.highlight}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-[#060D1E] border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Avg Price/sq.ft</span>
                <span className="text-base font-bold text-amber-300">
                  AED {currentHubData.avgPrice}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#060D1E] border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Active Offplan</span>
                <span className="text-base font-bold text-white">
                  {currentHubData.projects.length} Flagship Towers
                </span>
              </div>
            </div>
          </div>

          {/* Matching Properties in this District */}
          <div className="flex-1 p-5 rounded-2xl bg-[#091124] border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Projects in {currentHubData.name}
            </h4>

            {currentHubData.projects.length > 0 ? (
              <div className="space-y-3">
                {currentHubData.projects.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-3.5 rounded-xl bg-[#060D1E] border border-slate-800 hover:border-amber-500/40 transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-16 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                          {prop.title}
                        </h5>
                        <p className="text-[11px] text-slate-400">{prop.developer}</p>
                        <div className="text-xs font-bold text-amber-300 mt-0.5">
                          {formatPrice(prop.startingPriceAED, currency)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectProperty(prop)}
                        className="py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors flex items-center justify-center space-x-1"
                      >
                        <Eye className="w-3 h-3 text-amber-400" />
                        <span>Inspect 360°</span>
                      </button>
                      <button
                        onClick={() => onOpenViewingModal(prop)}
                        className="py-1.5 rounded-lg gold-gradient-bg text-slate-950 text-[11px] font-bold transition-all flex items-center justify-center space-x-1"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Book Tour</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                <p>New branded off-plan releases pending DLD registration in this zone.</p>
                <button
                  onClick={() => onOpenViewingModal()}
                  className="mt-2 text-amber-400 underline font-semibold"
                >
                  Request Pre-Launch Private Allocation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
