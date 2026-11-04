import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  Clock, 
  ShieldCheck, 
  Info,
  Calendar,
  Building
} from 'lucide-react';
import { CurrencyCode, formatPrice } from '../utils/formatters';

interface MortgageCalculatorProps {
  currency: CurrencyCode;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ currency }) => {
  const [propertyPriceAED, setPropertyPriceAED] = useState<number>(5500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(4.75);
  const [tenureYears, setTenureYears] = useState<number>(25);
  const [buyerType, setBuyerType] = useState<'resident' | 'non-resident'>('non-resident');
  const [includeDldFee, setIncludeDldFee] = useState<boolean>(true);

  // Calculations based on UAE Central Bank mortgage regulations
  const downPaymentAED = (propertyPriceAED * downPaymentPercent) / 100;
  const loanAmountAED = propertyPriceAED - downPaymentAED;

  // Monthly interest rate and tenure in months
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  // Monthly EMI: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyEMIAED = loanAmountAED > 0 && monthlyRate > 0
    ? (loanAmountAED * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;

  // UAE Fees
  const dldFeeAED = (propertyPriceAED * 4) / 100; // 4% DLD
  const dldAdminAED = 580;
  const mortgageRegistrationAED = (loanAmountAED * 0.25) / 100 + 290;
  const valuationFeeAED = 3000;
  const totalUpfrontAED = downPaymentAED + (includeDldFee ? dldFeeAED + dldAdminAED : 0) + mortgageRegistrationAED + valuationFeeAED;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>UAE Central Bank & DLD Compliant</span>
        </div>
        <h2 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
          UAE Mortgage & Off-Plan Cash Flow Calculator
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Calculate estimated monthly payments (EMI), initial cash outlay, 4% DLD fees, and compare resident vs non-resident terms
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Parameters (2 cols) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#091124] border border-slate-800 shadow-xl space-y-6">
          {/* Buyer Type Switcher */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Buyer Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setBuyerType('non-resident');
                  if (downPaymentPercent < 20) setDownPaymentPercent(20);
                }}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  buyerType === 'non-resident'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-[#060D1E] border-slate-800 text-slate-400'
                }`}
              >
                International / Expat Non-Resident (Min. 20% Down)
              </button>

              <button
                type="button"
                onClick={() => setBuyerType('resident')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  buyerType === 'resident'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-[#060D1E] border-slate-800 text-slate-400'
                }`}
              >
                UAE Resident / Citizen (Min. 20% Down)
              </button>
            </div>
          </div>

          {/* Property Price Slider & Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Property Purchase Price (AED)
              </label>
              <span className="font-luxury text-lg font-bold text-amber-300">
                {formatPrice(propertyPriceAED, currency)}
              </span>
            </div>
            <input
              type="range"
              min={1500000}
              max={30000000}
              step={250000}
              value={propertyPriceAED}
              onChange={(e) => setPropertyPriceAED(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>AED 1.5M (Entry Off-Plan)</span>
              <span>AED 15M (Prime Luxury)</span>
              <span>AED 30M+ (Trophy Mansions)</span>
            </div>
          </div>

          {/* Down Payment Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="font-semibold text-white text-sm">
                {formatPrice(downPaymentAED, currency)}
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Interest Rate & Tenure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Annual Interest Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="3.0"
                  max="9.0"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-semibold"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                  % p.a.
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Loan Tenure (Years)
              </label>
              <select
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years (Standard)</option>
              </select>
            </div>
          </div>

          {/* DLD Fee Waiver Toggle */}
          <div className="p-4 rounded-xl bg-[#060D1E] border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs font-bold text-white block">Include 4% Dubai Land Department (DLD) Fee</span>
                <span className="text-[11px] text-slate-400">Many off-plan developers offer 50% - 100% DLD waivers</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeDldFee}
              onChange={(e) => setIncludeDldFee(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculation Results Card (1 col) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B1530] to-[#070D1E] border border-amber-500/30 shadow-2xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              Estimated Monthly Commitment
            </span>
            <div className="font-luxury text-3xl sm:text-4xl font-bold text-amber-300 mt-1">
              {formatPrice(monthlyEMIAED, currency)}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">/ month</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Principal & interest payment over {tenureYears} years at {interestRate}% fixed/variable
            </p>
          </div>

          {/* Breakdown summary */}
          <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Loan Amount:</span>
              <span className="font-semibold text-white">{formatPrice(loanAmountAED, currency)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Down Payment ({downPaymentPercent}%):</span>
              <span className="font-semibold text-white">{formatPrice(downPaymentAED, currency)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">DLD 4% Transfer Fee:</span>
              <span className={includeDldFee ? "font-semibold text-slate-200" : "font-semibold text-emerald-400"}>
                {includeDldFee ? formatPrice(dldFeeAED, currency) : 'Waiver Applied (AED 0)'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Mortgage Registration (0.25%):</span>
              <span className="font-semibold text-slate-300">{formatPrice(mortgageRegistrationAED, currency)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Off-Plan Concierge Agency Fee:</span>
              <span className="font-bold text-emerald-400">0% Commission (AED 0)</span>
            </div>

            <div className="pt-3 border-t border-slate-700/80 flex justify-between items-baseline">
              <span className="font-bold text-amber-300 text-xs">Total Upfront Cash Required:</span>
              <span className="font-luxury text-lg font-bold text-white">
                {formatPrice(totalUpfrontAED, currency)}
              </span>
            </div>
          </div>

          {/* Golden Visa Notice */}
          {propertyPriceAED >= 2000000 && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>10-Year UAE Golden Visa Qualified:</strong> This property purchase exceeds AED 2,000,000, qualifying the buyer and immediate family.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
