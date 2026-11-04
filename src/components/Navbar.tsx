import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Globe2, 
  DollarSign, 
  Bell, 
  Calendar, 
  UserCheck, 
  LayoutDashboard, 
  Compass, 
  Calculator, 
  Scale, 
  TrendingUp, 
  Menu, 
  X,
  Phone,
  Mail,
  Volume2,
  Gift,
  Newspaper
} from 'lucide-react';
import { CurrencyCode, currencySymbols } from '../utils/formatters';
import { LanguageCode, translations } from '../utils/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
  onOpenAiConcierge: () => void;
  onOpenViewingModal: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currency,
  setCurrency,
  language,
  setLanguage,
  onOpenAiConcierge,
  onOpenViewingModal,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const t = translations[language];

  const notifications = [
    { id: 1, title: 'New Launch Alert', text: 'Bugatti Residences Sky Penthouses phase 2 released with 70/30 plan.', time: '10m ago', unread: true },
    { id: 2, title: 'Price Trend Update', text: 'Al Marjan Island (Wynn Casino) price/sqft increased +4.8% this month.', time: '1h ago', unread: true },
    { id: 3, title: 'Golden Visa Notification', text: 'Cabinet approves streamlined real estate 10-Yr Golden Visa processing.', time: '3h ago', unread: false }
  ];

  const currencies: CurrencyCode[] = ['AED', 'USD', 'EUR', 'GBP', 'CNY', 'RUB', 'BTC'];
  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'zh', label: '中文', flag: '🇨🇳' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-[#060B18]/90 backdrop-blur-md transition-all">
      {/* Top micro bar for VIP contact & MLS badge */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-xs border-b border-slate-800/80 bg-[#030712]/60 text-slate-300">
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-1.5 text-amber-400/90 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.mlsSyncStatus}</span>
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Escrow Protected • 0% Income & Capital Tax</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-300/80">UAE 10-Year Golden Visa Certified</span>
        </div>

        <div className="flex items-center space-x-5">
          <a href="mailto:offplandubai88@gmail.com" className="hover:text-amber-300 transition-colors flex items-center space-x-1">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>offplandubai88@gmail.com</span>
          </a>
          <span className="text-slate-500">|</span>
          <a href="https://wa.me/971585538382" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors flex items-center space-x-1">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>WhatsApp: +971585538382 (Mark)</span>
          </a>
          <span className="text-slate-500">|</span>
          <a 
            href="https://docs.google.com/spreadsheets/d/1exbJQclk8lF6A07avOWzuVwm_LQG-dCvxZu6d25zytQ/edit" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-amber-300 transition-colors flex items-center space-x-1 text-emerald-400 font-semibold"
          >
            <span>Linked Google Sheet</span>
          </a>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('properties')}
          className="cursor-pointer flex items-center space-x-3 group"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-400/40 transition-all duration-300">
            <div className="w-full h-full bg-[#060B18] rounded-[10px] flex items-center justify-center">
              <span className="font-luxury text-base font-bold text-amber-300 tracking-wider">OC</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-luxury text-xl sm:text-2xl font-bold tracking-wider text-white group-hover:text-amber-300 transition-colors">
                OFF-PLAN CONCIERGE
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                UAE
              </span>
            </div>
            <p className="text-[10px] tracking-wider uppercase text-slate-400 -mt-0.5">
              UAE Luxury Real Estate Portal
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          <button
            onClick={() => setCurrentTab('properties')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              currentTab === 'properties'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Properties
          </button>

          <button
            onClick={() => setCurrentTab('promotions')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              currentTab === 'promotions'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                : 'text-amber-400/90 hover:text-amber-300 hover:bg-slate-800/50'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Promotions</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              VIP
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('news')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              currentTab === 'news'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Newspaper className="w-4 h-4 text-amber-400" />
            <span>Dev News</span>
          </button>

          <button
            onClick={() => setCurrentTab('map')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              currentTab === 'map'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Dubai Map</span>
          </button>

          <button
            onClick={() => setCurrentTab('developer-comparison')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              currentTab === 'developer-comparison'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Developer Matrix</span>
          </button>

          <button
            onClick={() => setCurrentTab('analytics')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              currentTab === 'analytics'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Price Trends</span>
          </button>

          <button
            onClick={() => setCurrentTab('calculator')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              currentTab === 'calculator'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Mortgage Calc</span>
          </button>

          <button
            onClick={() => setCurrentTab('client-portal')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              currentTab === 'client-portal'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>Client Portal</span>
            {savedCount > 0 && (
              <span className="bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full px-1.5 py-0.2">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('agent-dashboard')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              currentTab === 'agent-dashboard'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-400" />
            <span>Agent CRM</span>
          </button>
        </nav>

        {/* Right side controls (Currency, Language, AI button, Viewing CTA) */}
        <div className="flex items-center space-x-3">
          {/* Currency Selector */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="appearance-none bg-slate-900/90 border border-slate-700 text-amber-300 text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-6 cursor-pointer focus:outline-none focus:border-amber-400 transition-colors"
            >
              {currencies.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c} ({currencySymbols[c]})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400 text-xs">
              ▼
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="appearance-none bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg px-2.5 py-1.5 pr-6 cursor-pointer focus:outline-none focus:border-amber-400 transition-colors"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400 text-xs">
              ▼
            </div>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-slate-800/60 border border-slate-800 transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#0B142A] border border-amber-500/20 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-sm font-semibold text-white">UAE Market Alerts</h4>
                  <span className="text-[10px] text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded">Live MLS Feed</span>
                </div>
                <div className="divide-y divide-slate-800/60 mt-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 text-xs hover:bg-slate-800/40 rounded px-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-300">{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-slate-300 mt-1">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Talking AI Concierge Trigger Button */}
          <button
            onClick={onOpenAiConcierge}
            className="relative group overflow-hidden px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 border border-amber-400/40 hover:border-amber-400 text-amber-200 text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30 transition-all duration-300"
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </div>
            <span className="hidden sm:inline font-medium tracking-wide">Talking AI Concierge</span>
            <Volume2 className="w-3.5 h-3.5 text-amber-400 hidden sm:inline" />
          </button>

          {/* Schedule Viewing CTA */}
          <button
            onClick={onOpenViewingModal}
            className="hidden md:flex items-center space-x-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book VIP Tour</span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-[#060B18]/95 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => { setCurrentTab('properties'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'properties' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 bg-slate-900/60'}`}
            >
              🏢 Properties
            </button>
            <button
              onClick={() => { setCurrentTab('promotions'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'promotions' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 bg-slate-900/60'}`}
            >
              🎁 VIP Promotions
            </button>
            <button
              onClick={() => { setCurrentTab('news'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'news' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 bg-slate-900/60'}`}
            >
              📰 Developer News
            </button>
            <button
              onClick={() => { setCurrentTab('map'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'map' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 bg-slate-900/60'}`}
            >
              🗺️ Dubai Map
            </button>
            <button
              onClick={() => { setCurrentTab('developer-comparison'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'developer-comparison' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 bg-slate-900/60'}`}
            >
              ⚖️ Developer Matrix
            </button>
            <button
              onClick={() => { setCurrentTab('analytics'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'analytics' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 bg-slate-900/60'}`}
            >
              📈 Price Trends
            </button>
            <button
              onClick={() => { setCurrentTab('calculator'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'calculator' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 bg-slate-900/60'}`}
            >
              🧮 Mortgage Calc
            </button>
            <button
              onClick={() => { setCurrentTab('client-portal'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left ${currentTab === 'client-portal' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 bg-slate-900/60'}`}
            >
              👤 Client Portal ({savedCount})
            </button>
            <button
              onClick={() => { setCurrentTab('agent-dashboard'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left col-span-2 ${currentTab === 'agent-dashboard' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 bg-slate-900/60'}`}
            >
              💼 Agent CRM & Leads Dashboard
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { onOpenAiConcierge(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500/30 to-yellow-500/30 border border-amber-400 text-amber-200 font-semibold flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Open Talking AI Concierge</span>
            </button>
            <button
              onClick={() => { onOpenViewingModal(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-sm flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book VIP Chauffeur Tour</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
