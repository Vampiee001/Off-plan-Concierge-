import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Award, 
  CheckCircle2,
  Clock,
  Globe2
} from 'lucide-react';
import { LanguageCode, translations } from '../utils/translations';
import { CurrencyCode } from '../utils/formatters';

interface ContactSectionProps {
  language: LanguageCode;
  currency: CurrencyCode;
  onOpenAiConcierge: () => void;
  onLeadCaptured: (lead: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  currency,
  onOpenAiConcierge,
  onLeadCaptured
}) => {
  const t = translations[language];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budgetRangeAED, setBudgetRangeAED] = useState('5M - 15M AED');
  const [interestArea, setInterestArea] = useState('Downtown Dubai & Palm Jumeirah');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          budgetRangeAED,
          country: 'International Investor',
          preferredLanguage: language === 'ar' ? 'Arabic' : language === 'ru' ? 'Russian' : language === 'fr' ? 'French' : language === 'zh' ? 'Chinese' : 'English',
          chatSnippet: `Interested in ${interestArea} with budget ${budgetRangeAED}. Note: ${notes}`,
          qualificationSummary: `Automated Lead Capture: High-intent buyer interested in ${interestArea}. Target budget: ${budgetRangeAED}.`
        })
      });
      const data = await res.json();
      if (data.success) {
        onLeadCaptured(data.data);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setName('');
        setEmail('');
        setPhone('');
        setNotes('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Contact Info & Credentials */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Direct Private Office Advisory</span>
            </div>
            <h2 className="font-luxury text-3xl sm:text-4xl font-bold text-white mt-1">
              Connect Directly with Mark
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Contact person: <strong>Mark</strong>. Providing end-to-end off-plan portfolio structuring, UAE Golden Visa facilitation, developer negotiation, and private chauffeur viewings.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#091124] border border-slate-800 flex items-start space-x-3.5">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">WhatsApp & Direct Line</span>
                <a 
                  href="https://wa.me/971585538382" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-bold text-amber-300 hover:text-amber-200 transition-colors flex items-center space-x-1"
                >
                  <span>+971585538382</span>
                  <span className="text-xs text-emerald-400 font-semibold">(Chat on WhatsApp)</span>
                </a>
                <p className="text-[11px] text-slate-400 mt-0.5">Contact Person: Mark • Instant response for property inquiries</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#091124] border border-slate-800 flex items-start space-x-3.5">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Executive Email</span>
                <a href="mailto:offplandubai88@gmail.com" className="text-sm font-bold text-white hover:text-amber-300 transition-colors">
                  offplandubai88@gmail.com
                </a>
                <p className="text-[11px] text-slate-400 mt-0.5">Direct VIP email monitored by Mark (cc: markstephenyucada@gmail.com)</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#091124] border border-slate-800 flex items-start space-x-3.5">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Private VIP Advisory Schedule</span>
                <span className="text-xs font-bold text-white">
                  Available 7 Days a Week • 24/7 International Client Support
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">In-person chauffeured Rolls-Royce / Maybach viewings & global Zoom consults</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={onOpenAiConcierge}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 text-amber-300 text-xs font-semibold flex items-center space-x-2 hover:bg-amber-500/30 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask Talking AI Concierge Now</span>
            </button>
          </div>
        </div>

        {/* Right: Automated Lead Capture Form with AI-Driven Recommendations */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B1530] to-[#070D1E] border border-amber-500/30 shadow-2xl space-y-5">
          <div className="pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>AI-Driven Property Matching Inquiry</span>
            </div>
            <h3 className="font-luxury text-xl font-bold text-white mt-1">
              Request Curated 5-USP Off-Plan Dossier
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Submit your criteria for instant automated AI matching and direct private consultation.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-base">Inquiry Successfully Registered</h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Thank you! Our AI engine has formulated a preliminary off-plan matching portfolio with 5 USPs. Director Mark Yucada’s team will contact you via WhatsApp / email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t.name} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="investor@domain.com"
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 ... or international"
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.budget}
                  </label>
                  <select
                    value={budgetRangeAED}
                    onChange={(e) => setBudgetRangeAED(e.target.value)}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="2M - 5M AED">AED 2M - 5M (Golden Visa Tier)</option>
                    <option value="5M - 15M AED">AED 5M - 15M (Prime Luxury)</option>
                    <option value="15M - 30M AED">AED 15M - 30M (Ultra-Luxury)</option>
                    <option value="30M+ AED">AED 30M+ (Beachfront Trophy Mansions)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Target District
                  </label>
                  <select
                    value={interestArea}
                    onChange={(e) => setInterestArea(e.target.value)}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Downtown Dubai & Palm Jumeirah">Downtown & Palm Jumeirah</option>
                    <option value="Palm Jebel Ali Frond Mansions">Palm Jebel Ali Fronds</option>
                    <option value="Business Bay Canal Hyper-Towers">Business Bay Canal</option>
                    <option value="Wynn Al Marjan Island (RAK Casino)">Wynn Al Marjan Casino</option>
                    <option value="Dubai Harbour Superyacht Marina">Dubai Harbour Marina</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Specific Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Interested in 70/30 payment plan, car-lift penthouse, or Golden Visa eligibility..."
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>{submitting ? 'Formulating AI Match...' : t.submitInquiry}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
