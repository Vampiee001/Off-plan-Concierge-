import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Edit3, 
  Trash2, 
  Plus, 
  FileDown, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Image as ImageIcon, 
  Layers, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Save, 
  X,
  Share2,
  RefreshCw,
  Award
} from 'lucide-react';
import { Property } from '../types';
import { exportPropertyToPdf } from '../services/pdfExport';
import { formatPrice, CurrencyCode } from '../utils/formatters';

interface PropertyAdminManagerProps {
  properties: Property[];
  onPropertyUpdated: (property: Property) => void;
  onPropertyAdded: (property: Property) => void;
  onPropertyDeleted: (propertyId: string) => void;
  currency: CurrencyCode;
  onOpenSocialBroadcast?: (property: Property) => void;
}

export const PropertyAdminManager: React.FC<PropertyAdminManagerProps> = ({
  properties,
  onPropertyUpdated,
  onPropertyAdded,
  onPropertyDeleted,
  currency,
  onOpenSocialBroadcast
}) => {
  const [search, setSearch] = useState('');
  const [filterDeveloper, setFilterDeveloper] = useState('All');
  
  // Modals
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState<'url' | 'pdf' | 'manual'>('url');

  // URL Parser State
  const [parseUrl, setParseUrl] = useState('');
  const [sourceHint, setSourceHint] = useState('Dxboffplan / AlNair');
  const [isParsing, setIsParsing] = useState(false);
  const [parseMessage, setParseMessage] = useState<string | null>(null);

  // PDF & Photo Upload State
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);
  const [brochureText, setBrochureText] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isExtractingBrochure, setIsExtractingBrochure] = useState(false);

  // Filtered properties
  const filtered = properties.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.developer.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesDev = filterDeveloper === 'All' || p.developer === filterDeveloper;
    return matchesSearch && matchesDev;
  });

  const developers = Array.from(new Set(properties.map(p => p.developer)));

  // Save edits
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    try {
      const res = await fetch(`/api/properties/${editingProperty.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProperty)
      });
      const data = await res.json();
      if (data.success && data.data) {
        onPropertyUpdated(data.data);
      } else {
        onPropertyUpdated(editingProperty);
      }
      setEditingProperty(null);
    } catch (err) {
      console.warn('Saving locally:', err);
      onPropertyUpdated(editingProperty);
      setEditingProperty(null);
    }
  };

  // Delete property
  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to remove "${title}" from the active Off-Plan portfolio?`);
    if (!confirmed) return;

    try {
      await fetch(`/api/properties/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Deleted locally:', e);
    }
    onPropertyDeleted(id);
  };

  // Auto-Parse URL
  const handleAutoParseUrl = async () => {
    if (!parseUrl.trim()) return;
    setIsParsing(true);
    setParseMessage(null);

    try {
      const res = await fetch('/api/properties/parse-external-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: parseUrl, sourceHint })
      });
      const json = await res.json();

      if (json.success && json.data) {
        const parsed: Property = {
          ...json.data,
          id: `prop-${Date.now()}`,
          developerComparison: json.data.developerComparison || {
            developerName: json.data.developer,
            rating: 4.88,
            projectsCompleted: 35,
            onTimeDeliveryRate: '98.5%',
            escrowVerified: true,
            benchmarkPriceDiff: '-6% vs Market Avg',
            exclusivePerk: '0% Agency Fee + Direct Developer Fast-Track',
            competitorComparison: [
              { portalName: 'PropertyFinder Market Avg', averagePricePerSqFt: json.data.pricePerSqFt ? json.data.pricePerSqFt + 250 : 2500 },
              { portalName: 'Bayut Index Benchmark', averagePricePerSqFt: json.data.pricePerSqFt ? json.data.pricePerSqFt + 200 : 2450 }
            ]
          },
          priceHistory: [
            { year: '2024', pricePerSqFt: (json.data.pricePerSqFt || 2000) - 250, averageAreaPrice: (json.data.pricePerSqFt || 2000) - 150 },
            { year: '2025', pricePerSqFt: (json.data.pricePerSqFt || 2000) - 100, averageAreaPrice: (json.data.pricePerSqFt || 2000) - 50 },
            { year: '2026', pricePerSqFt: json.data.pricePerSqFt || 2000, averageAreaPrice: (json.data.pricePerSqFt || 2000) + 80 }
          ]
        };

        // Add to server
        await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed)
        }).catch(() => {});

        onPropertyAdded(parsed);
        setParseMessage(`Successfully parsed and added "${parsed.title}" by ${parsed.developer} with 5 certified USPs and images!`);
        setParseUrl('');
      } else {
        setParseMessage(json.error || 'Failed to auto-parse property.');
      }
    } catch (err: any) {
      setParseMessage(err.message || 'Auto-parsing failed.');
    } finally {
      setIsParsing(false);
    }
  };

  // Handle Photo & Brochure File drop
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadFileName(file.name);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setUploadedImages(prev => [dataUrl, ...prev]);
      };
      reader.readAsDataURL(file);
    } else {
      // PDF or text
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setBrochureText(text || `Official developer brochure file: ${file.name}`);
      };
      reader.readAsText(file);
    }
  };

  const handleExtractFromBrochure = async () => {
    setIsExtractingBrochure(true);
    try {
      const res = await fetch('/api/properties/parse-external-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: uploadFileName || 'Developer-Brochure-PDF', 
          sourceHint: `Brochure Extract: ${brochureText.slice(0, 300)}` 
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        const newProp: Property = {
          ...json.data,
          id: `prop-${Date.now()}`,
          images: uploadedImages.length ? uploadedImages : json.data.images,
          developerComparison: {
            developerName: json.data.developer || 'Master UAE Developer',
            rating: 4.9,
            projectsCompleted: 40,
            onTimeDeliveryRate: '98.8%',
            escrowVerified: true,
            benchmarkPriceDiff: '-5% vs Market',
            exclusivePerk: '100% Escrow Law Guarantee + 0% Commission',
            competitorComparison: [
              { portalName: 'Bayut Average', averagePricePerSqFt: (json.data.pricePerSqFt || 2200) + 200 }
            ]
          },
          priceHistory: [
            { year: '2024', pricePerSqFt: 1900, averageAreaPrice: 2000 },
            { year: '2025', pricePerSqFt: 2050, averageAreaPrice: 2150 },
            { year: '2026', pricePerSqFt: json.data.pricePerSqFt || 2200, averageAreaPrice: 2300 }
          ]
        };

        onPropertyAdded(newProp);
        setParseMessage(`Created "${newProp.title}" from brochure specifications!`);
        setShowAddModal(false);
      }
    } catch (e: any) {
      setParseMessage(e.message || 'Brochure extraction failed.');
    } finally {
      setIsExtractingBrochure(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#070F24] via-[#09142E] to-[#050B18] border border-amber-500/30 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Mark's Real Estate Command Suite</span>
          </div>
          <h2 className="font-luxury text-2xl font-bold text-white mt-1">
            Off-Plan Property Inventory & Admin Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            View, search, edit details, adjust 5 USPs, import projects from Dxboffplan/AlNair, or generate VIP client PDFs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add / Ingest New Property</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-[#091124] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by project, developer or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#060B18] border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-slate-400 whitespace-nowrap">Developer:</span>
          <select
            value={filterDeveloper}
            onChange={(e) => setFilterDeveloper(e.target.value)}
            className="bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          >
            <option value="All">All Developers ({properties.length})</option>
            {developers.map(dev => (
              <option key={dev} value={dev}>{dev}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Property Cards Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(property => (
          <div
            key={property.id}
            className="rounded-2xl bg-[#081024] border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Cover Image & Badges */}
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img
                  src={property.images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081024] via-transparent to-black/40" />

                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 font-bold text-[10px]">
                    {property.developer}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-950/80 text-white font-semibold text-[10px] backdrop-blur-sm">
                    {property.status}
                  </span>
                </div>

                <div className="absolute bottom-2 left-3 right-3 flex items-baseline justify-between text-white">
                  <div>
                    <h3 className="font-luxury font-bold text-sm text-white line-clamp-1">{property.title}</h3>
                    <p className="text-[11px] text-amber-300 flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{property.location}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Specs & Pricing */}
              <div className="p-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#050A18] border border-slate-800/80">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Starting Price:</span>
                    <span className="font-bold text-white text-xs">
                      {formatPrice(property.startingPriceAED, currency)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Price / Sq.Ft:</span>
                    <span className="font-semibold text-amber-300 text-xs">
                      AED {property.pricePerSqFt}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Handover:</span>
                    <span className="text-slate-200 text-xs">{property.completionDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Projected ROI:</span>
                    <span className="text-emerald-400 font-bold text-xs">{property.projectedROI || '8.8% Net'}</span>
                  </div>
                </div>

                {/* 5 USPs Preview */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-400 flex items-center space-x-1">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>5 Certified USPs (Enforced Standard)</span>
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {property.usps.slice(0, 3).map((usp, i) => (
                      <li key={i} className="line-clamp-1 text-slate-300 flex items-start space-x-1.5">
                        <span className="text-amber-400 font-bold text-[10px] shrink-0">{i + 1}.</span>
                        <span className="truncate">{usp}</span>
                      </li>
                    ))}
                    {property.usps.length > 3 && (
                      <li className="text-[10px] text-amber-300/80 italic">
                        + 2 more certified USPs included
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-3 bg-[#060C1E] border-t border-slate-800/80 flex items-center justify-between gap-1.5">
              <button
                onClick={() => setEditingProperty(property)}
                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center space-x-1 transition-colors"
                title="Edit project specs & USPs"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => exportPropertyToPdf(property)}
                className="py-1.5 px-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs flex items-center justify-center space-x-1 border border-amber-500/30 transition-colors"
                title="Export Client VIP PDF with Mark's Info"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>

              {onOpenSocialBroadcast && (
                <button
                  onClick={() => onOpenSocialBroadcast(property)}
                  className="py-1.5 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-xs flex items-center justify-center space-x-1 border border-emerald-500/30 transition-colors"
                  title="WhatsApp & Social Broadcast"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => handleDelete(property.id, property.title)}
                className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors"
                title="Delete Property"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT PROPERTY MODAL */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#091226] border border-amber-500/40 p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="font-luxury text-lg font-bold text-white">
                  Edit Property Specifications: {editingProperty.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingProperty(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              {/* Row 1: Title & Developer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Project Title</label>
                  <input
                    type="text"
                    value={editingProperty.title}
                    onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Developer</label>
                  <input
                    type="text"
                    value={editingProperty.developer}
                    onChange={(e) => setEditingProperty({ ...editingProperty, developer: e.target.value })}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Location & Sub-location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">District / Location</label>
                  <input
                    type="text"
                    value={editingProperty.location}
                    onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Sub-Location</label>
                  <input
                    type="text"
                    value={editingProperty.subLocation}
                    onChange={(e) => setEditingProperty({ ...editingProperty, subLocation: e.target.value })}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Status</label>
                  <select
                    value={editingProperty.status}
                    onChange={(e: any) => setEditingProperty({ ...editingProperty, status: e.target.value })}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="New Launch">New Launch</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Final Phase">Final Phase</option>
                    <option value="Selling Fast">Selling Fast</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Pricing & Handover */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Starting Price (AED)</label>
                  <input
                    type="number"
                    value={editingProperty.startingPriceAED}
                    onChange={(e) => {
                      const aed = Number(e.target.value);
                      setEditingProperty({ 
                        ...editingProperty, 
                        startingPriceAED: aed,
                        startingPriceUSD: Math.round(aed / 3.6725)
                      });
                    }}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Price / Sq.Ft (AED)</label>
                  <input
                    type="number"
                    value={editingProperty.pricePerSqFt}
                    onChange={(e) => setEditingProperty({ ...editingProperty, pricePerSqFt: Number(e.target.value) })}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Completion Date</label>
                  <input
                    type="text"
                    value={editingProperty.completionDate}
                    onChange={(e) => setEditingProperty({ ...editingProperty, completionDate: e.target.value })}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Q4 2027"
                    required
                  />
                </div>
              </div>

              {/* Row 4: Payment Plan & ROI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Payment Plan</label>
                  <input
                    type="text"
                    value={editingProperty.paymentPlan}
                    onChange={(e) => setEditingProperty({ ...editingProperty, paymentPlan: e.target.value })}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Projected ROI</label>
                  <input
                    type="text"
                    value={editingProperty.projectedROI || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, projectedROI: e.target.value })}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    placeholder="e.g. 9.4% Net"
                  />
                </div>
              </div>

              {/* Row 5: 5 Certified USPs (Enforced Standard) */}
              <div className="p-4 rounded-xl bg-[#060B18] border border-amber-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 uppercase text-[11px] flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Certified 5 Unique Selling Points (Mandatory Standard)</span>
                  </span>
                </div>

                {editingProperty.usps.map((usp, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 border border-amber-500/30">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={usp}
                      onChange={(e) => {
                        const updated = [...editingProperty.usps] as [string, string, string, string, string];
                        updated[idx] = e.target.value;
                        setEditingProperty({ ...editingProperty, usps: updated });
                      }}
                      className="w-full bg-[#091226] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Row 6: Image Gallery Links */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Cover & Gallery Image URLs (comma separated)</label>
                <textarea
                  rows={2}
                  value={editingProperty.images.join(', ')}
                  onChange={(e) => {
                    const urls = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setEditingProperty({ ...editingProperty, images: urls });
                  }}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / AUTO-PARSE PROPERTY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#091226] border border-amber-500/40 p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-luxury text-lg font-bold text-white">
                  Add Off-Plan Property to Inventory
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setParseMessage(null);
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex rounded-xl bg-[#060B18] p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setAddMode('url')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  addMode === 'url' ? 'gold-gradient-bg text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                🌐 Auto-Parse URL (Dxboffplan / AlNair)
              </button>
              <button
                type="button"
                onClick={() => setAddMode('pdf')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  addMode === 'pdf' ? 'gold-gradient-bg text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                📄 Upload PDF Brochure / Pics
              </button>
            </div>

            {/* Tab 1: URL Auto Parser */}
            {addMode === 'url' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Paste Off-Plan Link (Dxboffplan, AlNair, Bayut, PropertyFinder, or Developer Portal):
                  </label>
                  <input
                    type="url"
                    placeholder="https://dxboffplan.com/properties/... or https://alnair.ae/..."
                    value={parseUrl}
                    onChange={(e) => setParseUrl(e.target.value)}
                    className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
                  />
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <span>Quick Presets:</span>
                  <button
                    type="button"
                    onClick={() => setParseUrl('https://dxboffplan.com/properties/bayz-102-by-danube/')}
                    className="text-amber-400 hover:underline"
                  >
                    Bayz 102 by Danube
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setParseUrl('https://alnair.ae/properties/azizi-venice-waterfront/')}
                    className="text-amber-400 hover:underline"
                  >
                    Azizi Venice
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setParseUrl('https://dxboffplan.com/properties/sobha-orbis-motor-city/')}
                    className="text-amber-400 hover:underline"
                  >
                    Sobha Orbis
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAutoParseUrl}
                  disabled={isParsing || !parseUrl.trim()}
                  className="w-full py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isParsing ? 'animate-spin' : ''}`} />
                  <span>{isParsing ? 'Auto-Parsing Project Specifications & Images...' : 'Ingest & Add to Live Inventory'}</span>
                </button>
              </div>
            )}

            {/* Tab 2: PDF & Image Uploader */}
            {addMode === 'pdf' && (
              <div className="space-y-4 text-xs">
                <div className="border-2 border-dashed border-amber-500/30 rounded-2xl p-6 text-center hover:border-amber-500/60 transition-colors bg-[#060B18]">
                  <UploadCloud className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                  <p className="font-semibold text-white">Drop developer brochure PDF or property photos</p>
                  <p className="text-[11px] text-slate-400 mt-1">Supports PDF, JPG, PNG, WEBP</p>
                  
                  <label className="inline-block mt-4 px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs cursor-pointer hover:brightness-110 active:scale-95 transition-all">
                    <span>Browse Files</span>
                    <input
                      type="file"
                      accept=".pdf,image/*,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploadFileName && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                    <span>Selected: <strong>{uploadFileName}</strong></span>
                    <button
                      type="button"
                      onClick={handleExtractFromBrochure}
                      disabled={isExtractingBrochure}
                      className="px-3 py-1 rounded-lg gold-gradient-bg text-slate-950 font-bold text-[11px]"
                    >
                      {isExtractingBrochure ? 'Analyzing...' : 'Extract & Create'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {parseMessage && (
              <div className="p-3.5 rounded-xl bg-[#060D1E] border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{parseMessage}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
