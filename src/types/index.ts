export interface PriceHistoryPoint {
  year: string;
  pricePerSqFt: number;
  averageAreaPrice: number;
}

export interface DeveloperComparison {
  developerName: string;
  rating: number; // e.g. 4.9
  projectsCompleted: number;
  onTimeDeliveryRate: string; // e.g. "98.4%"
  escrowVerified: boolean;
  benchmarkPriceDiff: string; // e.g. "-8% vs Downtown Avg"
  exclusivePerk: string; // e.g. "100% DLD Waiver + 3-Yr Service Free"
  competitorComparison: {
    portalName: string; // e.g. "Bayut Benchmark", "PropertyFinder Avg"
    averagePricePerSqFt: number;
  }[];
}

export interface Property {
  id: string;
  title: string;
  developer: string;
  location: string;
  city: string;
  subLocation: string;
  startingPriceAED: number;
  startingPriceUSD: number;
  pricePerSqFt: number;
  completionDate: string; // e.g. "Q4 2027"
  handoverYear: number;
  paymentPlan: string; // e.g. "60/40 (20% Down, 40% Construction, 40% Handover)"
  downPaymentPercent: number;
  propertyType: 'Penthouse' | 'Luxury Apartment' | 'Sky Villa' | 'Waterfront Mansion' | 'Branded Residence';
  bedrooms: string;
  sizeRangeSqFt: string;
  projectedROI: string;
  coordinates: { lat: number; lng: number };
  images: string[];
  usps: [string, string, string, string, string]; // Exactly 5 USPs required by user prompt!
  virtualTourUrl: string;
  developerComparison: DeveloperComparison;
  priceHistory: PriceHistoryPoint[];
  featured: boolean;
  status: 'New Launch' | 'Under Construction' | 'Final Phase' | 'Selling Fast';
  mlsSynced: boolean;
  dldPermitNumber: string;
  description: string;
  amenities: string[];
  brochurePdfUrl?: string;
  injectedPdfDetails?: {
    fileName: string;
    injectedAt: string;
    changesSummary: string;
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  preferredLanguage: string;
  budgetRangeAED: string;
  propertyInterestId?: string;
  status: 'Hot' | 'Warm' | 'Contacted' | 'Viewing Booked' | 'Qualified';
  leadScore: number; // 0 - 100
  qualificationSummary: string;
  draftRecommendations: string[]; // Property IDs
  aiNotes: string;
  createdAt: string;
  chatSnippet?: string;
}

export interface Viewing {
  id: string;
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  viewingType: 'VIP Chauffeur Tour' | 'Interactive 3D Virtual Walkthrough' | 'On-Site Sales Lounge';
  date: string;
  timeSlot: string;
  status: 'Confirmed' | 'Pending Agent Review' | 'Completed';
  specialRequests?: string;
  assignedAgent: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedProperties?: Property[];
  audioBase64?: string;
  isVoiceInput?: boolean;
  viewingPrompt?: boolean;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  savedPropertyIds: string[];
  savedSearches: {
    location?: string;
    budgetMax?: number;
    bedrooms?: string;
  }[];
  notificationsEnabled: boolean;
  drafts: {
    title: string;
    date: string;
    propertyIds: string[];
    aiReasoning: string;
  }[];
}

export interface DeveloperNewsItem {
  id: string;
  developer: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  category: 'Mega Project' | 'Payment Innovation' | 'New Phase' | 'Record Sales' | 'Master Community';
  relatedPropertyId?: string;
  highlight: string;
  impact: string;
}

export interface DeveloperPromotion {
  id: string;
  developer: string;
  title: string;
  tagline: string;
  discountDetail: string;
  validUntil: string;
  applicablePropertyIds: string[];
  voucherCode: string;
  terms: string[];
  badge: string;
  claimedCount: number;
}
