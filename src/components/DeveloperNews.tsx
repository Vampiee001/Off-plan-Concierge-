import React, { useState } from 'react';
import { 
  Newspaper, 
  ExternalLink, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  ArrowRight, 
  Building2, 
  ShieldCheck,
  Award,
  Globe2
} from 'lucide-react';
import { DeveloperNewsItem, Property } from '../types';
import { developerNewsItems } from '../data/newsAndPromotions';

interface DeveloperNewsProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onAskAiAboutNews: (news: DeveloperNewsItem) => void;
}

export const DeveloperNews: React.FC<DeveloperNewsProps> = ({
  properties,
  onSelectProperty,
  onAskAiAboutNews
}) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('All');
  const developers = ['All', 'Azizi Developments', 'Danube Properties', 'Emaar Properties', 'Binghatti Developers', 'Nakheel (Dubai Holding)', 'Marjan & Wynn Resorts'];

  const filteredNews = developerNewsItems.filter(item => {
    if (selectedDeveloper === 'All') return true;
    return item.developer.toLowerCase().includes(selectedDeveloper.split(' ')[0].toLowerCase());
  });

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Newspaper className="w-4 h-4 text-amber-400" />
            <span>Real-Time Developer News & Intelligence</span>
          </div>
          <h2 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
            UAE Master Developer News & Market Bulletins
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time verified headlines, launch announcements, construction milestones, and payment plan innovations across major UAE developers.
          </p>
        </div>

        {/* Developer Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-xl scrollbar-none">
          {developers.map(dev => (
            <button
              key={dev}
              onClick={() => setSelectedDeveloper(dev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDeveloper === dev
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {dev}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map(item => {
          const matchedProperty = properties.find(p => p.id === item.relatedPropertyId);
          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#091124] border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30 text-[10px]">
                    {item.developer}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold text-[10px] border border-emerald-500/30">
                    {item.category}
                  </span>
                </div>

                {/* News Title */}
                <h3 className="font-luxury text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* News Summary */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.summary}
                </p>

                {/* Market Impact Badge */}
                <div className="p-3 rounded-xl bg-[#060D1E] border border-slate-800/80 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Market Highlight:</span>
                    <span className="text-amber-400 font-semibold">{item.highlight}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Financial Impact:</span>
                    <span className="text-emerald-400 font-bold">{item.impact}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => onAskAiAboutNews(item)}
                  className="inline-flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze with AI</span>
                </button>

                {matchedProperty ? (
                  <button
                    onClick={() => onSelectProperty(matchedProperty)}
                    className="inline-flex items-center space-x-1 text-slate-300 hover:text-white font-medium transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-500">{item.source}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
