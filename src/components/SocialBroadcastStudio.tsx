import React, { useState } from 'react';
import { 
  MessageCircle, 
  Share2, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  Image as ImageIcon, 
  Send, 
  Sparkles, 
  Building2, 
  Smartphone,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';
import { Property } from '../types';
import { MARK_ADVISOR_CONTACT } from '../services/pdfExport';
import { formatPrice, CurrencyCode } from '../utils/formatters';

interface SocialBroadcastStudioProps {
  properties: Property[];
  currency: CurrencyCode;
}

export const SocialBroadcastStudio: React.FC<SocialBroadcastStudioProps> = ({
  properties,
  currency
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    properties[0]?.id || 'bugatti-residences'
  );
  const [templateType, setTemplateType] = useState<
    'launch' | 'one_percent' | 'waterfront' | 'golden_visa' | 'promo'
  >('launch');
  const [targetNumber, setTargetNumber] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const currentProperty = properties.find(p => p.id === selectedPropertyId) || properties[0];

  // Templates generator
  const generateBroadcastText = (): string => {
    if (!currentProperty) return '';

    const title = currentProperty.title.toUpperCase();
    const developer = currentProperty.developer;
    const location = currentProperty.location;
    const priceAED = `AED ${currentProperty.startingPriceAED.toLocaleString()}`;
    const priceUSD = `~$${Math.round(currentProperty.startingPriceAED / 3.6725).toLocaleString()} USD`;
    const handover = currentProperty.completionDate;
    const paymentPlan = currentProperty.paymentPlan;
    const usps = currentProperty.usps;

    const markName = MARK_ADVISOR_CONTACT.name;
    const markPhone = MARK_ADVISOR_CONTACT.phone;
    const markEmail = MARK_ADVISOR_CONTACT.email;
    const waLink = MARK_ADVISOR_CONTACT.whatsappLink;

    if (templateType === 'launch') {
      return `🔥 *VIP OFF-PLAN LAUNCH ALERT | DUBAI* 🔥

💎 *${title}*
📍 Location: ${location}, Dubai
🏛️ Master Developer: ${developer}
💰 Starting Price: ${priceAED} (${priceUSD})
📅 Handover: ${handover}
📊 Payment Plan: ${paymentPlan}

✨ *5 EXCLUSIVE USPs & INVESTMENT HIGHLIGHTS:*
1️⃣ ${usps[0]}
2️⃣ ${usps[1]}
3️⃣ ${usps[2]}
4️⃣ ${usps[3]}
5️⃣ ${usps[4]}

🎁 *VIP CLIENT ADVANTAGE:*
• 0% Agency Commission / Broker Fees
• Direct Priority Developer Unit Allocation
• 100% Escrow Law & DLD Protection
• Complimentary UAE 10-Year Golden Visa Processing

📲 *For Brochures, Floor Plans & Sales Lounge Booking:*
Direct Advisor: *${markName}*
WhatsApp / Call: *${markPhone}*
Email: *${markEmail}*
Direct Chat: ${waLink}`;
    }

    if (templateType === 'one_percent') {
      return `⚡ *INVESTOR ALERT: 1% MONTHLY PAYMENT PLAN* ⚡

🏢 *${title}* by ${developer}
📍 Prime Location: ${location}
💵 Starting From: ${priceAED} (${priceUSD})
🗓️ Key Terms: ${paymentPlan}

🌟 *5 REASONS TO RESERVE TODAY:*
1. ${usps[0]}
2. ${usps[1]}
3. ${usps[2]}
4. ${usps[3]}
5. ${usps[4]}

✅ Zero Interest Post-Handover
✅ Guaranteed Escrow Protected
✅ High Rental Yield Corridor (${currentProperty.projectedROI || '9.2% Net'})

📞 *Reserve your unit before allocation sells out:*
Executive Contact: *${markName}*
WhatsApp: *${markPhone}*
Email: *${markEmail}*
Chat Now: ${waLink}`;
    }

    if (templateType === 'golden_visa') {
      return `🇦🇪 *QUALIFY FOR UAE 10-YEAR GOLDEN VISA* 🇦🇪

✨ *${title}* by ${developer}
📍 ${location}, Dubai
🏆 Minimum Investment: ${priceAED} (${priceUSD})
🎯 Handover: ${handover} | ${paymentPlan}

🏅 *5 CERTIFIED INVESTMENT USPs:*
1️⃣ ${usps[0]}
2️⃣ ${usps[1]}
3️⃣ ${usps[2]}
4️⃣ ${usps[3]}
5️⃣ ${usps[4]}

🛂 *GOLDEN VISA BENEFITS:*
• 10-Year renewable residency for you, spouse, and family
• 100% company ownership & 0% personal tax
• VIP concierge processing included

💬 *Contact for Official Allocation:*
Lead Advisor: *${markName}*
WhatsApp: *${markPhone}*
Email: *${markEmail}*`;
    }

    // Default Waterfront / Luxury Promo
    return `🏖️ *DUBAI WATERFRONT TROPHY RESIDENCE* 🏖️

💎 *${title}*
Developer: ${developer} | ${location}
Prices from: ${priceAED} | Handover: ${handover}
Payment Plan: ${paymentPlan}

⚜️ *5 CERTIFIED PROJECT USPs:*
1. ${usps[0]}
2. ${usps[1]}
3. ${usps[2]}
4. ${usps[3]}
5. ${usps[4]}

Direct Developer Contact: *${markName}*
WhatsApp: *${markPhone}* | Email: *${markEmail}*
Direct Link: ${waLink}`;
  };

  const broadcastText = generateBroadcastText();

  const handleCopy = () => {
    navigator.clipboard.writeText(broadcastText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(broadcastText);
    const url = targetNumber 
      ? `https://api.whatsapp.com/send?phone=${targetNumber.replace(/[^0-9]/g, '')}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedPhotos(prev => [result, ...prev]);
        setUploadPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadImage = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `Offplan-Concierge-${currentProperty.title.replace(/\s+/g, '_')}-Photo-${index + 1}.jpg`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const allImages = [
    ...uploadedPhotos,
    ...(currentProperty?.images || [])
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#09132A] via-[#0B1530] to-[#060D1E] border border-amber-500/30 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>Mark's Broadcast Studio</span>
          </div>
          <h2 className="font-luxury text-2xl font-bold text-white mt-1">
            WhatsApp & Social Media Broadcast Generator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Instantly formulate high-converting off-plan alerts with 5 certified USPs, direct developer pricing, and your contact info.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-all border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Broadcast Text'}</span>
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Broadcast via WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configuration & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Property Selector */}
          <div className="p-5 rounded-2xl bg-[#091124] border border-slate-800 space-y-4">
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
              1. Select Off-Plan Project
            </label>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {properties.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.developer} • {p.location})
                </option>
              ))}
            </select>

            {/* Template Tone Selector */}
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider pt-2">
              2. Choose Campaign Theme / Tone
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTemplateType('launch')}
                className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  templateType === 'launch'
                    ? 'gold-gradient-bg text-slate-950 font-bold'
                    : 'bg-[#060B18] text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                🔥 VIP Launch Alert
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('one_percent')}
                className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  templateType === 'one_percent'
                    ? 'gold-gradient-bg text-slate-950 font-bold'
                    : 'bg-[#060B18] text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                ⚡ 1% Monthly Plan
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('golden_visa')}
                className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  templateType === 'golden_visa'
                    ? 'gold-gradient-bg text-slate-950 font-bold'
                    : 'bg-[#060B18] text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                🇦🇪 10-Yr Golden Visa
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('waterfront')}
                className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  templateType === 'waterfront'
                    ? 'gold-gradient-bg text-slate-950 font-bold'
                    : 'bg-[#060B18] text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                🏖️ Waterfront Trophy
              </button>
            </div>

            {/* Recipient Phone (Optional) */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Client Number (Optional):
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="+971 50 123 4567 or leave blank for WhatsApp broadcast"
                  value={targetNumber}
                  onChange={(e) => setTargetNumber(e.target.value)}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Image Asset Hub for WhatsApp Broadcasts */}
          <div className="p-5 rounded-2xl bg-[#091124] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Photos for WhatsApp Broadcast
                </h4>
                <p className="text-[11px] text-slate-400">
                  Download high-res images or upload new pics for your campaign
                </p>
              </div>

              <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center space-x-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Pic</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
              {allImages.slice(0, 6).map((img, idx) => (
                <div key={idx} className="group relative rounded-xl overflow-hidden aspect-video border border-slate-700 bg-slate-900">
                  <img
                    src={img}
                    alt={`Campaign visual ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <button
                    onClick={() => handleDownloadImage(img, idx)}
                    className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-amber-300 transition-opacity"
                    title="Download picture for WhatsApp"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Message Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-[#060C1E] border border-amber-500/30 shadow-2xl flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    WhatsApp Message Preview
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <span>Mark: +971585538382</span>
                  <span>•</span>
                  <span>offplandubai88@gmail.com</span>
                </div>
              </div>

              {/* Chat Simulation Bubble */}
              <div className="p-4 rounded-xl bg-[#0B1530] border border-slate-700/80 text-xs text-slate-100 font-mono whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto selection:bg-amber-500/30">
                {broadcastText}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80 mt-4">
              <span className="text-[11px] text-slate-400">
                Ready to send to clients via WhatsApp Web / App
              </span>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleCopy}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleSendWhatsApp}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Launch WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
