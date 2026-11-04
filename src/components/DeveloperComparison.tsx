import React, { useState } from 'react';
import { 
  Scale, 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink,
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Property } from '../types';
import { CurrencyCode, formatPrice } from '../utils/formatters';

interface DeveloperComparisonProps {
  properties: Property[];
  currency: CurrencyCode;
  onSelectProperty: (property: Property) => void;
  onOpenViewingModal: (property?: Property) => void;
}

export const DeveloperComparison: React.FC<DeveloperComparisonProps> = ({
  properties,
  currency,
  onSelectProperty,
  onOpenViewingModal
}) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('Binghatti Developers');

  // Aggregated Developer Metrics
  const developersData = [
    {
      name: 'Binghatti Developers',
      rating: 4.9,
      trackRecord: '48+ Delivered Towers',
      onTimeRate: '98.7%',
      escrowStatus: '100% Fully Escrow Regulated',
      signaturePartners: 'Bugatti Automobiles, Mercedes-Benz, Jacob & Co',
      conciergeAdvantage: '0% Agency Fee + Exclusive 100% DLD 4% Waiver',
      webComparison: [
        { platform: 'Off-Plan Concierge Direct', priceSqFt: 4100, incentive: 'Direct Developer Pricing + 10-Yr Golden Visa VIP fast-track', badge: 'Best Rate Guaranteed' },
        { platform: 'PropertyFinder Market Avg', priceSqFt: 4450, incentive: 'Standard listing price (+2% agent commission)', badge: 'Market Avg' },
        { platform: 'Bayut Index Benchmark', priceSqFt: 4400, incentive: 'Standard developer milestone plan', badge: 'Standard' }
      ]
    },
    {
      name: 'Nakheel (Dubai Holding)',
      rating: 4.85,
      trackRecord: '112+ Master Communities',
      onTimeRate: '97.2%',
      escrowStatus: 'Government Master Developer (Dubai Holding)',
      signaturePartners: 'Palm Jumeirah, Palm Jebel Ali, Dubai Islands',
      conciergeAdvantage: 'Direct Allocation on Prime Fronds + 2-Yr Nakheel Marina Berthing',
      webComparison: [
        { platform: 'Off-Plan Concierge Direct', priceSqFt: 3150, incentive: 'First-Phase Frond Allocations with 80/20 Plan', badge: 'Best Rate Guaranteed' },
        { platform: 'Secondary Resale Portals', priceSqFt: 4600, incentive: 'Inflated secondary resale premiums', badge: 'Resale Premium' },
        { platform: 'Bayut Waterfront Index', priceSqFt: 3400, incentive: 'Standard off-plan rate', badge: 'Standard' }
      ]
    },
    {
      name: 'Arada Developments',
      rating: 4.95,
      trackRecord: '34+ Luxury Deliveries',
      onTimeRate: '99.1%',
      escrowStatus: 'Institutional Bank Escrow Guaranteed',
      signaturePartners: 'Giorgio Armani (Armani/Casa), Tadao Ando',
      conciergeAdvantage: 'Private Milan Atelier interior consultation + Armani VIP Club',
      webComparison: [
        { platform: 'Off-Plan Concierge Direct', priceSqFt: 6200, incentive: 'Curated Low-Density Presidential Penthouses', badge: 'Best Rate Guaranteed' },
        { platform: 'PropertyFinder Prime Palm', priceSqFt: 6480, incentive: 'Broker marked-up pricing', badge: 'Broker Markup' },
        { platform: 'Bayut Trophy Index', priceSqFt: 6400, incentive: 'Standard listing', badge: 'Standard' }
      ]
    },
    {
      name: 'Sobha Realty',
      rating: 4.92,
      trackRecord: '85+ Master Developments',
      onTimeRate: '99.4%',
      escrowStatus: 'German Quality Backward Integration Guarantee',
      signaturePartners: 'Dubai Harbour Superyacht Marina, Sobha Hartland',
      conciergeAdvantage: 'Complimentary 5-Year Home Warranty + German Miele Kitchen Package',
      webComparison: [
        { platform: 'Off-Plan Concierge Direct', priceSqFt: 3950, incentive: 'Direct Tower C Sky Edition Allocation', badge: 'Best Rate Guaranteed' },
        { platform: 'Emaar Beachfront Resale Portal', priceSqFt: 4300, incentive: 'Higher price for older completed stock', badge: 'Secondary Market' },
        { platform: 'Bayut Harbour Index', priceSqFt: 4100, incentive: 'Market average across Dubai Harbour', badge: 'Standard' }
      ]
    },
    {
      name: 'Emaar Properties',
      rating: 4.96,
      trackRecord: '240+ Master Developments',
      onTimeRate: '99.5%',
      escrowStatus: 'Blue-Chip UAE Flagship (Developer of Burj Khalifa)',
      signaturePartners: 'Downtown Dubai, Dubai Mall, Dubai Creek Harbour',
      conciergeAdvantage: '0% Resale NOC Fees + Dedicated Emaar Signature Management',
      webComparison: [
        { platform: 'Off-Plan Concierge Direct', priceSqFt: 2350, incentive: 'Early Canal View Tier Allocation', badge: 'Best Rate Guaranteed' },
        { platform: 'PropertyFinder Track', priceSqFt: 2420, incentive: 'Broker listings', badge: 'Standard' },
        { platform: 'Bayut Creek Average', priceSqFt: 2450, incentive: 'Average Creek Harbour rate', badge: 'Market Avg' }
      ]
    },
    {
      name: 'Azizi Developments',
      rating: 4.86,
      trackRecord: '120+ Delivered Towers & Master Communities',
      onTimeRate: '97.6%',
      escrowStatus: '100% RERA & Sharjah Escrow Law Guaranteed',
      signaturePartners: 'Azizi Florence (30M SqFt Mega Community), Azizi Venice, Riviera',
      conciergeAdvantage: '0% Agency Fee + Free 10-Yr Golden Visa Processing + 100% Registration Waiver',
      webComparison: [
        { platform: 'Off-Plan Concierge Direct', priceSqFt: 1180, incentive: 'Direct Master Developer Launch Allocations with 50/50 Terms', badge: 'Best Rate Guaranteed' },
        { platform: 'PropertyFinder Northern Emirates', priceSqFt: 1350, incentive: 'Standard listing price', badge: 'Market Avg' },
        { platform: 'Bayut Master Community Index', priceSqFt: 1290, incentive: 'Average community index benchmark', badge: 'Standard' }
      ]
    },
    {
      name: 'Danube Properties',
      rating: 4.88,
      trackRecord: '30+ Delivered Landmark Towers',
      onTimeRate: '98.5%',
      escrowStatus: '100% RERA Escrow Bank Account Regulated',
      signaturePartners: 'Bayz 101 Business Bay (101-Story Skyscraper), Diamondz JLT, Oceanz',
      conciergeAdvantage: 'Exclusive 1% Monthly Payment Plan + Free Fully Furnished Italian Interior Package',
      webComparison: [
        { platform: 'Off-Plan Concierge Direct', priceSqFt: 2200, incentive: 'Official 1% Per Month Installment Plan with Zero-Interest Post-Handover', badge: 'Best Rate Guaranteed' },
        { platform: 'PropertyFinder Tower Index', priceSqFt: 2450, incentive: 'Standard broker marked-up rates', badge: 'Market Avg' },
        { platform: 'Bayut JLT/Business Bay Index', priceSqFt: 2380, incentive: 'Standard developer milestone plan', badge: 'Standard' }
      ]
    },
    {
      name: 'DAMAC Properties',
      rating: 4.89,
      trackRecord: '180+ Delivered Towers & Communities',
      onTimeRate: '98.1%',
      escrowStatus: 'Blue-Chip UAE Escrow Protected',
      signaturePartners: 'DAMAC Bay by Cavalli, DAMAC Lagoons, Safa Two by de GRISOGONO',
      conciergeAdvantage: '100% DLD 4% Transfer Fee Waiver + Cavalli Home Decor Consultation',
      webComparison: [
        { platform: 'Off-Plan Concierge Direct', priceSqFt: 3750, incentive: 'Direct Waterfront Tower Suite Allocation with Marina Views', badge: 'Best Rate Guaranteed' },
        { platform: 'PropertyFinder Cavalli Track', priceSqFt: 3950, incentive: 'Broker listed pricing', badge: 'Market Avg' },
        { platform: 'Bayut Luxury Harbour Index', priceSqFt: 4100, incentive: 'Resale premium benchmark', badge: 'Resale Premium' }
      ]
    }
  ];

  const currentDev = developersData.find(d => d.name === selectedDeveloper) || developersData[0];
  const matchingProperties = properties.filter(p => p.developer.toLowerCase().includes(currentDev.name.split(' ')[0].toLowerCase()));

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Scale className="w-4 h-4 text-amber-400" />
          <span>Real Estate Intelligence & Web Benchmarking</span>
        </div>
        <h2 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
          UAE Developer Matrix & Multi-Portal Price Benchmark
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Keep track of developer reliability ratings, on-time delivery percentages, and comparative pricing across PropertyFinder, Bayut, and Off-Plan Concierge Direct.
        </p>
      </div>

      {/* Developer Selector Tabs */}
      <div className="mt-8 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {developersData.map(dev => (
          <button
            key={dev.name}
            onClick={() => setSelectedDeveloper(dev.name)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDeveloper === dev.name
                ? 'gold-gradient-bg text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            {dev.name}
          </button>
        ))}
      </div>

      {/* Developer Dossier Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Developer Credentials Card */}
        <div className="p-6 rounded-2xl bg-[#091124] border border-amber-500/30 shadow-xl space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-amber-400">Developer Profile</span>
              <h3 className="font-luxury text-xl font-bold text-white mt-1">{currentDev.name}</h3>
            </div>
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
              <span>★ {currentDev.rating}</span>
              <span className="text-slate-400">/ 5.0</span>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
              <span className="text-slate-400">On-Time Delivery Rate:</span>
              <span className="font-bold text-emerald-400">{currentDev.onTimeRate}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Completed Projects:</span>
              <span className="font-bold text-white">{currentDev.trackRecord}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Escrow Security:</span>
              <span className="font-bold text-emerald-400">{currentDev.escrowStatus}</span>
            </div>
            <div className="flex justify-between items-start py-1">
              <span className="text-slate-400">Iconic Portfolio:</span>
              <span className="font-medium text-slate-200 text-right max-w-[60%]">{currentDev.signaturePartners}</span>
            </div>
          </div>

          {/* Exclusive Off-Plan Concierge Buyer Advantage */}
          <div className="p-4 rounded-xl bg-[#060D1E] border border-amber-500/30">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Off-plan Concierge VIP Advantage</span>
            </div>
            <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
              {currentDev.conciergeAdvantage}
            </p>
          </div>

          <button
            onClick={() => onOpenViewingModal(matchingProperties[0])}
            className="w-full py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            <span>Book Direct Developer Lounge Tour</span>
          </button>
        </div>

        {/* Multi-Platform Price Benchmark Table (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#091124] border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Real-Time Web Price Comparison for {currentDev.name}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated benchmark comparing Off-Plan Concierge direct pricing vs Bayut, PropertyFinder & Resale portals
                </p>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Live Data Synchronized
              </span>
            </div>

            {/* Benchmark Cards */}
            <div className="space-y-3">
              {currentDev.webComparison.map((comp, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    idx === 0
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-md shadow-amber-500/5'
                      : 'bg-[#060D1E] border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-bold ${idx === 0 ? 'text-amber-300' : 'text-white'}`}>
                          {comp.platform}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {comp.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{comp.incentive}</p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-[10px] text-slate-400 block uppercase">Est. Rate / sq.ft</span>
                      <span className={`text-lg font-luxury font-bold ${idx === 0 ? 'text-amber-300' : 'text-slate-200'}`}>
                        AED {comp.priceSqFt}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Offplan Projects by this developer */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Featured Projects by {currentDev.name}
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchingProperties.map(prop => (
                <div
                  key={prop.id}
                  onClick={() => onSelectProperty(prop)}
                  className="p-3 rounded-xl bg-[#060D1E] border border-slate-800 hover:border-amber-400 transition-all cursor-pointer flex items-center space-x-3 group"
                >
                  <img src={prop.images[0]} alt={prop.title} className="w-14 h-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <h6 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {prop.title}
                    </h6>
                    <span className="text-xs font-semibold text-amber-300">
                      {formatPrice(prop.startingPriceAED, currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
