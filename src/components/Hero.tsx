import React from 'react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Percent, 
  Compass, 
  ArrowRight,
  TrendingUp,
  KeyRound,
  Eye
} from 'lucide-react';
import { LanguageCode, translations } from '../utils/translations';
import { CurrencyCode } from '../utils/formatters';

interface HeroProps {
  language: LanguageCode;
  currency: CurrencyCode;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedLocation: string;
  setSelectedLocation: (l: string) => void;
  selectedDeveloper: string;
  setSelectedDeveloper: (d: string) => void;
  selectedBedrooms: string;
  setSelectedBedrooms: (b: string) => void;
  onOpenAiConcierge: () => void;
  onExploreClick: () => void;
  onOpenMap: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  currency,
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedDeveloper,
  setSelectedDeveloper,
  selectedBedrooms,
  setSelectedBedrooms,
  onOpenAiConcierge,
  onExploreClick,
  onOpenMap
}) => {
  const t = translations[language];

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background with luxury Dubai skyline and subtle gold radial glow */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 scale-105 transform filter brightness-75 contrast-125"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85')`
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050B17]/90 via-[#060B18]/85 to-[#050B17]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Banner */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>UAE Certified 5-USP Off-Plan Real Estate Portal</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">Dubai Land Department Sync</span>
          </div>

          <h1 className="font-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {t.heroTitle.split(' ').slice(0, 3).join(' ')}{' '}
            <span className="gold-gradient-text block sm:inline">
              {t.heroTitle.split(' ').slice(3).join(' ')}
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Quick Action Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAiConcierge}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Ask Talking AI Concierge</span>
            </button>

            <button
              onClick={onOpenMap}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 text-slate-200 font-semibold text-xs sm:text-sm flex items-center space-x-2 transition-all"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Interactive Dubai Map</span>
            </button>

            <button
              onClick={onExploreClick}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 text-slate-200 font-semibold text-xs sm:text-sm flex items-center space-x-2 transition-all"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>View 360° Virtual Tours</span>
            </button>
          </div>
        </div>

        {/* High-conversion Search & Filter Box */}
        <div className="mt-10 max-w-5xl mx-auto rounded-2xl glass-panel p-4 sm:p-5 shadow-2xl border border-amber-500/25">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Keyword search input */}
            <div className="relative">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-300/90 mb-1">
                Project or Landmark
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Bugatti, Palm Jebel Ali, Wynn..."
                  className="w-full bg-[#081024] border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* Location dropdown */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-300/90 mb-1">
                UAE Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#081024] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer transition-colors"
              >
                <option value="All">{t.allLocations}</option>
                <option value="Downtown Dubai">Downtown Dubai</option>
                <option value="Palm Jumeirah">Palm Jumeirah</option>
                <option value="Palm Jebel Ali">Palm Jebel Ali</option>
                <option value="Business Bay">Business Bay (Canal)</option>
                <option value="Dubai Harbour">Dubai Harbour (Marina)</option>
                <option value="Dubai Creek Harbour">Dubai Creek Harbour</option>
                <option value="Dubai South">Dubai South (Azizi Venice)</option>
                <option value="Sharjah">Sharjah (Azizi Florence 30M SqFt)</option>
                <option value="Jumeirah Lake Towers">JLT (Danube Diamondz)</option>
                <option value="Al Marjan Island">Al Marjan Island (RAK Casino)</option>
              </select>
            </div>

            {/* Developer dropdown */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-300/90 mb-1">
                Master Developer
              </label>
              <select
                value={selectedDeveloper}
                onChange={(e) => setSelectedDeveloper(e.target.value)}
                className="w-full bg-[#081024] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer transition-colors"
              >
                <option value="All">{t.allDevelopers}</option>
                <option value="Azizi Developments">Azizi Developments (Florence & Venice)</option>
                <option value="Danube Properties">Danube Properties (Bayz 101 & Diamondz)</option>
                <option value="Binghatti Developers">Binghatti (Bugatti & Mercedes)</option>
                <option value="Nakheel">Nakheel (Palm Jebel Ali)</option>
                <option value="Emaar Properties">Emaar Properties (Creek Waters)</option>
                <option value="DAMAC Properties">DAMAC Properties (Cavalli Bay)</option>
                <option value="Arada Developments">Arada (Armani Beach)</option>
                <option value="Sobha Realty">Sobha Realty (Seahaven)</option>
                <option value="Marjan">Marjan (Wynn Casino District)</option>
              </select>
            </div>

            {/* Bedrooms dropdown */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-300/90 mb-1">
                Bedrooms / Configuration
              </label>
              <select
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                className="w-full bg-[#081024] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer transition-colors"
              >
                <option value="All">{t.allBedrooms}</option>
                <option value="1">1 Bedroom Suite</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4+">4+ Bedrooms / Penthouses</option>
                <option value="Mansion">Beachfront Mansions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Real Estate Investor Trust Highlights */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#0B142A]/60 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">10-Yr Golden Visa</div>
              <div className="text-[11px] text-slate-400">Investment &gt; 2M AED</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#0B142A]/60 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">0% Taxes in UAE</div>
              <div className="text-[11px] text-slate-400">Zero Capital & Rental Tax</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#0B142A]/60 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">100% Escrow Law</div>
              <div className="text-[11px] text-slate-400">RERA Bank Regulated</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#0B142A]/60 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">8% - 12.5% ROI</div>
              <div className="text-[11px] text-slate-400">Projected Net Yields</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
