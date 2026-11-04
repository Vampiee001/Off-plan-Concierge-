import { DeveloperNewsItem, DeveloperPromotion } from '../types';

export const developerNewsItems: DeveloperNewsItem[] = [
  {
    id: 'news-1',
    developer: 'Azizi Developments',
    title: 'Azizi Unveils 30 Million Sq.Ft Italian Mega-Community "Azizi Florence" with 1.7M Sq.Ft Central Park',
    summary: 'Positioned on the E311 highway corridor right on the Sharjah-Dubai border, Azizi Florence introduces 10,700+ luxury residences, botanical lagoons, and open-air cultural amphitheaters with 100% foreign freehold ownership.',
    date: 'October 2026',
    source: 'Dubai Land Department & Developer Bulletin',
    category: 'Master Community',
    relatedPropertyId: 'azizi-florence',
    highlight: 'Largest master-planned Italian community in the Northern Emirates',
    impact: '+21% Forecasted Capital Appreciation'
  },
  {
    id: 'news-2',
    developer: 'Danube Properties',
    title: 'Danube’s 101-Level "Bayz 101" & "Diamondz" JLT Break Sales Records via 1% Monthly Plan',
    summary: 'Danube Properties reports rapid phase sell-outs for Bayz 101 (soaring 101 floors in Business Bay) and Diamondz in JLT. The developer’s hallmark 1% monthly payment plan continues to dominate mid-to-luxury investor inflows.',
    date: 'October 2026',
    source: 'UAE Real Estate Market Wire',
    category: 'Payment Innovation',
    relatedPropertyId: 'bayz-101-danube',
    highlight: '1% per month with zero-interest post-handover flexibility',
    impact: 'High International Expat Inflows'
  },
  {
    id: 'news-3',
    developer: 'Emaar Properties',
    title: 'Emaar Captures Record Market Share with AED 3.8B Monthly Volume as Creek Harbour Expands',
    summary: 'Blue-chip master developer Emaar Properties maintains zero-project-cancellation credentials while accelerating new canal-facing phases across Dubai Creek Harbour, Emaar South, and Rashid Yachts & Marina.',
    date: 'October 2026',
    source: 'DXB Analytics & DLD Exchange',
    category: 'Record Sales',
    relatedPropertyId: 'dubai-creek-waters',
    highlight: 'Blue-chip safe haven with 9.6% net projected yields',
    impact: 'Market Benchmark Leader'
  },
  {
    id: 'news-4',
    developer: 'Binghatti Developers',
    title: 'Binghatti Bugatti Residences & Mercedes-Benz Places Enter Superstructure Construction Tier',
    summary: 'The world-first Bugatti hyper-form skyscraper in Business Bay with vehicular sky elevators and Mercedes-Benz Places in Downtown Dubai hit major engineering milestones ahead of their 2026 delivery schedules.',
    date: 'October 2026',
    source: 'Global Luxury Architecture Review',
    category: 'Mega Project',
    relatedPropertyId: 'bugatti-residences',
    highlight: 'Automotive branded residences trading at historic premiums',
    impact: '+35% Capital Appreciation'
  },
  {
    id: 'news-5',
    developer: 'Nakheel (Dubai Holding)',
    title: 'Palm Jebel Ali Frond Releases Accelerated as Waterfront Demand Doubles Palm Jumeirah Pace',
    summary: 'Nakheel reports massive international high-net-worth investor demand for 5 to 7 bedroom beachfront mansions on Palm Jebel Ali, which offers double the coastline and zero-carbon solar master infrastructure.',
    date: 'October 2026',
    source: 'Dubai 2040 Urban Planning Authority',
    category: 'New Phase',
    relatedPropertyId: 'palm-jebel-ali-villas',
    highlight: '110km of new beachfront coastline double Palm Jumeirah size',
    impact: '+24.8% YoY Price Growth'
  },
  {
    id: 'news-6',
    developer: 'Marjan & Wynn Resorts',
    title: 'Wynn Al Marjan Island Superstructure Nears Completion Ahead of 2027 Gaming Resort Opening',
    summary: 'Ras Al Khaimah’s $3.9B integrated resort district drives massive demand for adjacent waterfront suites, with projected short-term rental yields leading the Middle East at over 12.5% net.',
    date: 'October 2026',
    source: 'MENA Hospitality & Gaming Monitor',
    category: 'Mega Project',
    relatedPropertyId: 'wynn-al-marjan-suites',
    highlight: 'First integrated casino resort in the Arab world',
    impact: '12.5% Net Short-Term Yield'
  }
];

export const developerPromotions: DeveloperPromotion[] = [
  {
    id: 'promo-azizi',
    developer: 'Azizi Developments',
    title: '100% Freehold Registration Fee Waiver + 2-Year Free Maintenance',
    tagline: 'Exclusive Launch Voucher on Azizi Florence 30M Sq.Ft Community',
    discountDetail: 'Save up to AED 120,000 on registration & municipal charges',
    validUntil: 'Limited to First 50 Direct Investors',
    applicablePropertyIds: ['azizi-florence', 'azizi-venice'],
    voucherCode: 'CONCIERGE-AZIZI-VIP',
    terms: [
      'Applicable on all 1, 2, 3 bedroom apartments & townhouses',
      'Requires 10% booking reservation through Off-plan Concierge',
      'Includes complimentary UAE 10-Year Golden Visa application fee coverage'
    ],
    badge: '100% Registration Waiver',
    claimedCount: 28
  },
  {
    id: 'promo-danube',
    developer: 'Danube Properties',
    title: 'Guaranteed 1% Per Month Plan + Free Italian Furnishing Package',
    tagline: 'Available on Bayz 101 (Business Bay) & Diamondz (JLT)',
    discountDetail: 'Full luxury designer furniture & European appliances (Value: AED 85,000)',
    validUntil: 'End of Current Month',
    applicablePropertyIds: ['bayz-101-danube', 'diamondz-danube'],
    voucherCode: 'DANUBE-1PCT-LUXE',
    terms: [
      'Structured as 10% down payment and 1% monthly installments',
      'Zero-interest direct developer post-handover financing up to 30 months',
      'Full turnkey ready for immediate short-term holiday home rental'
    ],
    badge: '1% Monthly + Free Furnishing',
    claimedCount: 42
  },
  {
    id: 'promo-binghatti',
    developer: 'Binghatti Developers',
    title: '100% DLD 4% Transfer Fee Waiver + 3-Year VIP Concierge',
    tagline: 'Branded Hyper-Tower Perk on Bugatti Residences & Mercedes-Benz Places',
    discountDetail: 'Save up to AED 760,000 on standard Dubai Land Department fees',
    validUntil: 'Exclusive Allocation',
    applicablePropertyIds: ['bugatti-residences', 'mercedes-benz-places'],
    voucherCode: 'BINGHATTI-DLD-ZERO',
    terms: [
      'Direct developer absorption of the 4% government DLD transfer charge',
      'Includes 3 years private chauffeur dispatch & Rolls-Royce airport protocol',
      'Priority delivery inspection with developer private architects'
    ],
    badge: '100% DLD Fee Waiver',
    claimedCount: 19
  },
  {
    id: 'promo-nakheel',
    developer: 'Nakheel',
    title: 'Complimentary 2-Year Superyacht Mooring Pass at Nakheel Marinas',
    tagline: 'Palm Jebel Ali Waterfront Beachfront Frond Mansions',
    discountDetail: 'Deep-water private jetty berth included (Value: AED 180,000)',
    validUntil: 'Phase 1 Fronds Allocation',
    applicablePropertyIds: ['palm-jebel-ali-villas'],
    voucherCode: 'NAKHEEL-YACHT-VIP',
    terms: [
      'Valid for vessels up to 85 feet at Nakheel Marina facilities',
      'Exclusive to purchasers of beachfront frond villas and mansions',
      'Transferable to family members with zero processing charge'
    ],
    badge: 'Superyacht Mooring Included',
    claimedCount: 14
  },
  {
    id: 'promo-damac',
    developer: 'DAMAC Properties',
    title: 'Roberto Cavalli Home Decor Package + 4% DLD Fee Absorption',
    tagline: 'Curated Maritime Haute Couture Living at DAMAC Bay',
    discountDetail: 'Save AED 180,000+ on registration + Private Milan Interior Consultation',
    validUntil: 'Strictly 15 Penthouses & Sky Suites',
    applicablePropertyIds: ['damac-bay-cavalli'],
    voucherCode: 'DAMAC-CAVALLI-GOLD',
    terms: [
      'Custom bespoke interior consultation with Roberto Cavalli Home ateliers',
      '100% 4% DLD transfer fee waived at contract signing',
      'Guaranteed 10-Year Golden Visa processing protocol for family'
    ],
    badge: 'Cavalli Decor + 4% DLD Waived',
    claimedCount: 22
  }
];
