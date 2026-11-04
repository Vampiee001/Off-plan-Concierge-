import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Sparkles,
  ArrowUp
} from 'lucide-react';
import { LanguageCode, translations } from '../utils/translations';

interface FooterProps {
  language: LanguageCode;
  onNavigateTab: (tab: string) => void;
  onOpenAiConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigateTab,
  onOpenAiConcierge
}) => {
  const t = translations[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#040813] text-slate-400 text-xs mt-20 transition-all">
      {/* Top Banner with trust certifications */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">100% Escrow Law Compliant</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">RERA regulated developer escrow bank accounts</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">5-USP Quality Standard</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">Every presented project verified with 5 unique selling points</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Talking AI Concierge</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">Real-time voice & natural language advisory</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">10-Year UAE Golden Visa</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">Investor residency assistance for properties &ge; 2M AED</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5">
              <div className="w-full h-full bg-[#060B18] rounded-[10px] flex items-center justify-center">
                <span className="font-luxury text-xs font-bold text-amber-300">OC</span>
              </div>
            </div>
            <span className="font-luxury text-lg font-bold tracking-wider text-white">
              OFF-PLAN CONCIERGE
            </span>
          </div>

          <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
            The premier UAE off-plan real estate portal. Empowering global investors with talking AI intelligence, certified 5 USPs per project, developer benchmark comparisons, and private chauffeur viewings.
          </p>

          <div className="space-y-1.5 text-xs text-slate-300">
            <p><strong>Contact Person:</strong> Mark</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/971585538382" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">+971585538382</a></p>
            <p><strong>Email:</strong> <a href="mailto:offplandubai88@gmail.com" className="text-amber-400 hover:underline">offplandubai88@gmail.com</a></p>
          </div>
        </div>

        {/* Quick Portals */}
        <div className="space-y-3">
          <h4 className="font-luxury text-sm font-bold text-white uppercase tracking-wider">
            Explore Portal
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigateTab('properties')} className="hover:text-amber-300 transition-colors">
                Off-Plan Properties
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('map')} className="hover:text-amber-300 transition-colors">
                Interactive Dubai Map
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('developer-comparison')} className="hover:text-amber-300 transition-colors">
                Developer Comparison
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('analytics')} className="hover:text-amber-300 transition-colors">
                Price Trends & Analytics
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('calculator')} className="hover:text-amber-300 transition-colors">
                UAE Mortgage Calculator
              </button>
            </li>
          </ul>
        </div>

        {/* Prime Districts */}
        <div className="space-y-3">
          <h4 className="font-luxury text-sm font-bold text-white uppercase tracking-wider">
            Prime Districts
          </h4>
          <ul className="space-y-2 text-xs">
            <li><span className="text-slate-300">Downtown Dubai (Burj Khalifa)</span></li>
            <li><span className="text-slate-300">Palm Jebel Ali Fronds</span></li>
            <li><span className="text-slate-300">Palm Jumeirah East Crescent</span></li>
            <li><span className="text-slate-300">Business Bay Waterfront Canal</span></li>
            <li><span className="text-slate-300">Dubai Harbour Superyacht Marina</span></li>
            <li><span className="text-slate-300">Al Marjan Island (Wynn Casino)</span></li>
          </ul>
        </div>

        {/* VIP Services */}
        <div className="space-y-3">
          <h4 className="font-luxury text-sm font-bold text-white uppercase tracking-wider">
            Client Services
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={onOpenAiConcierge} className="text-amber-400 font-semibold hover:underline">
                Launch Talking AI Concierge
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('client-portal')} className="hover:text-amber-300 transition-colors">
                Client VIP Portal & Drafts
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('agent-dashboard')} className="hover:text-amber-300 transition-colors">
                Agent CRM & Uploader
              </button>
            </li>
            <li><span className="text-slate-400">100% Escrow Law Guarantee</span></li>
            <li><span className="text-slate-400">0% Agency Commission</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
        <p>© 2026 Off-plan Concierge Luxury UAE Real Estate Portal. All Rights Reserved. Regulated under RERA & Dubai Land Department licenses.</p>
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 transition-colors"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
