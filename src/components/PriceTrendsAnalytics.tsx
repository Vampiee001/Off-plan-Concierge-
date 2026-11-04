import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Compass, 
  Globe2, 
  ArrowUpRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { CurrencyCode } from '../utils/formatters';

interface PriceTrendsAnalyticsProps {
  currency: CurrencyCode;
}

export const PriceTrendsAnalytics: React.FC<PriceTrendsAnalyticsProps> = ({ currency }) => {
  const [selectedMetric, setSelectedMetric] = useState<'appreciation' | 'volume' | 'demographics'>('appreciation');

  // District appreciation figures 2021-2026
  const districtTrends = [
    { district: 'Palm Jebel Ali', p2021: 1800, p2024: 2650, p2026: 3150, change: '+75%', highlight: 'Highest growth potential (Dubai 2040 Plan)' },
    { district: 'Al Marjan Island (RAK)', p2021: 1100, p2024: 2500, p2026: 2850, change: '+159%', highlight: 'Surging demand driven by $3.9B Wynn Casino' },
    { district: 'Palm Jumeirah', p2021: 3200, p2024: 5600, p2026: 6200, change: '+93%', highlight: 'Trophy waterfront luxury benchmark' },
    { district: 'Business Bay', p2021: 1950, p2024: 3400, p2026: 4350, change: '+123%', highlight: 'Branded hyper-towers on Dubai Canal' },
    { district: 'Downtown Dubai', p2021: 2200, p2024: 3400, p2026: 3850, change: '+75%', highlight: 'Burj Khalifa views, international prime demand' },
    { district: 'Dubai Creek Harbour', p2021: 1350, p2024: 2180, p2026: 2350, change: '+74%', highlight: 'High rental yields and green community living' }
  ];

  // International buyer demographic data for UAE Off-plan
  const buyerDemographics = [
    { country: 'United Kingdom & Western Europe', percentage: 24, trend: '+14% YoY', flag: '🇬🇧 🇫🇷 🇩🇪' },
    { country: 'GCC & UAE Nationals', percentage: 21, trend: '+8% YoY', flag: '🇦🇪 🇸🇦 🇰🇼' },
    { country: 'CIS & Eastern Europe', percentage: 19, trend: '+18% YoY', flag: '🇷🇺 🇨🇭 🇰🇿' },
    { country: 'India & South Asia', percentage: 18, trend: '+11% YoY', flag: '🇮🇳 🇵🇰 🇸🇬' },
    { country: 'China & East Asia', percentage: 12, trend: '+28% YoY (Rapid Growth)', flag: '🇨🇳 🇭🇰' },
    { country: 'North America & Americas', percentage: 6, trend: '+9% YoY', flag: '🇺🇸 🇨🇦' }
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Macro Market Intelligence</span>
          </div>
          <h2 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
            UAE Off-Plan Price Trends & Demographic Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track capital appreciation curves, annual transaction volumes, and international investor inflows
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedMetric('appreciation')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              selectedMetric === 'appreciation' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Price Growth
          </button>
          <button
            onClick={() => setSelectedMetric('demographics')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              selectedMetric === 'demographics' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Buyer Demographics
          </button>
        </div>
      </div>

      {/* Main Metric Section */}
      {selectedMetric === 'appreciation' ? (
        <div className="mt-8 space-y-6">
          {/* District Trends Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {districtTrends.map((d, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#091124] border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-400">District Track</span>
                    <h3 className="font-luxury text-lg font-bold text-white">{d.district}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center space-x-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{d.change} (5-Yr)</span>
                  </span>
                </div>

                <p className="text-xs text-slate-300">{d.highlight}</p>

                {/* Price Bar comparison */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">2021 Launch Baseline:</span>
                    <span className="text-slate-300 font-semibold">AED {d.p2021}/sq.ft</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">2024 Current Average:</span>
                    <span className="text-slate-200 font-semibold">AED {d.p2024}/sq.ft</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-400 font-medium">2026 Forecast / Handover:</span>
                    <span className="text-amber-300 font-bold">AED {d.p2026}/sq.ft</span>
                  </div>
                </div>

                {/* Growth progress meter */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.min(parseInt(d.change), 100)}%` }}
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Key Insights Bar */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1530] to-[#070D1E] border border-amber-500/30 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase">Dubai 2040 Urban Master Plan</span>
              <p className="text-xs text-slate-300 mt-1">
                Projected population growth from 3.7M to 5.8M by 2040 is driving sustained capital appreciation across high-end master communities.
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase">UAE Golden Visa Impact</span>
              <p className="text-xs text-slate-300 mt-1">
                Foreign direct investments into 2M+ AED luxury off-plan properties increased 34% in 2025/2026 due to the 10-year residency guarantee.
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase">Gaming & Casino Tourism Boom</span>
              <p className="text-xs text-slate-300 mt-1">
                Al Marjan Island in Ras Al Khaimah exhibits the highest forecasted net rental returns in MENA, averaging 12.5% net yields.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Buyer Demographics */
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#091124] border border-slate-800 shadow-xl space-y-5">
            <h3 className="font-luxury text-xl font-bold text-white flex items-center space-x-2">
              <Globe2 className="w-5 h-5 text-amber-400" />
              <span>International Buyer Nationality Breakdown (UAE Off-Plan)</span>
            </h3>

            <div className="space-y-4">
              {buyerDemographics.map((demo, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">
                      {demo.flag} {demo.country}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="text-emerald-400 font-bold">{demo.trend}</span>
                      <span className="text-amber-300 font-bold font-luxury text-sm">{demo.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${demo.percentage * 3.5}%` }}
                      className="h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-300 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demographic summary */}
          <div className="p-6 rounded-2xl bg-[#091124] border border-amber-500/30 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400">Investor Trends</span>
              <h4 className="font-luxury text-lg font-bold text-white mt-1">Global Wealth Migration</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Dubai ranked #1 globally for high-net-worth individual (HNWI) net inflows for the third consecutive year, attracting over 6,700 millionaires seeking tax neutrality, world-class safety, and high-yielding off-plan assets.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#060D1E] border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Off-Plan Volume (H1):</span>
                <span className="font-bold text-amber-300">AED 142 Billion</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cash vs Mortgage:</span>
                <span className="font-bold text-white">72% Cash / 28% Financed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
