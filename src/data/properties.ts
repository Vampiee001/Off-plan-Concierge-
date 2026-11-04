import { Property } from '../types';

export const initialProperties: Property[] = [
  {
    id: 'bugatti-residences',
    title: 'Bugatti Residences by Binghatti',
    developer: 'Binghatti Developers',
    location: 'Business Bay Waterfront, Dubai',
    city: 'Dubai',
    subLocation: 'Business Bay',
    startingPriceAED: 19080000,
    startingPriceUSD: 5195000,
    pricePerSqFt: 4350,
    completionDate: 'Q4 2026',
    handoverYear: 2026,
    paymentPlan: '70/30 (25% Down, 45% Construction, 30% on Handover)',
    downPaymentPercent: 25,
    propertyType: 'Branded Residence',
    bedrooms: '2 to 5 Bedroom Mansions',
    sizeRangeSqFt: '2,036 - 14,813 sq.ft',
    projectedROI: '9.4% Net Projected',
    coordinates: { lat: 25.1872, lng: 55.2744 },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'World-first Bugatti-branded hyper-form residential skyscraper with aerodynamic French Riviera curves',
      'Private vehicular elevators delivering luxury supercars directly to sky penthouse salons',
      'Riviera-inspired private artificial beach with imported sand and VIP cabanas in Business Bay',
      'Guaranteed 10-Year UAE Golden Visa nomination package for primary buyer and family',
      'Projected 9.4% net ROI and 35% capital appreciation by Q4 2026 delivery'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Binghatti Developers',
      rating: 4.9,
      projectsCompleted: 48,
      onTimeDeliveryRate: '98.7%',
      escrowVerified: true,
      benchmarkPriceDiff: '-6% vs Downtown Branded Average',
      exclusivePerk: '100% DLD 4% Transfer Fee Waiver + Private Concierge for 3 Years',
      competitorComparison: [
        { portalName: 'PropertyFinder Market Avg', averagePricePerSqFt: 4620 },
        { portalName: 'Bayut Index Benchmark', averagePricePerSqFt: 4580 },
        { portalName: 'DXB Offplan Direct Portal', averagePricePerSqFt: 4400 }
      ]
    },
    priceHistory: [
      { year: '2021', pricePerSqFt: 2150, averageAreaPrice: 2050 },
      { year: '2022', pricePerSqFt: 2600, averageAreaPrice: 2400 },
      { year: '2023', pricePerSqFt: 3100, averageAreaPrice: 2850 },
      { year: '2024', pricePerSqFt: 3750, averageAreaPrice: 3400 },
      { year: '2025', pricePerSqFt: 4100, averageAreaPrice: 3800 },
      { year: '2026', pricePerSqFt: 4350, averageAreaPrice: 4050 }
    ],
    featured: true,
    status: 'Selling Fast',
    mlsSynced: true,
    dldPermitNumber: 'DLD-PERMIT-849204-BB',
    description: 'Bugatti Residences by Binghatti stands as an architectural tribute to the iconic Bugatti spirit. Located directly on the Dubai Water Canal in Business Bay, this landmark combines aerodynamic sculpted balconies, private sky pools, and car-lift access.',
    amenities: ['Private Car Lift', 'Riviera Beach Lagoon', 'VIP Chauffeur Concierge', 'Private Chef Dining', 'Infinity Sky Pool', 'Valet Parking', '24/7 Butler Service']
  },
  {
    id: 'palm-jebel-ali-villas',
    title: 'Palm Jebel Ali Frond Mansions',
    developer: 'Nakheel',
    location: 'Palm Jebel Ali Island, Dubai',
    city: 'Dubai',
    subLocation: 'Palm Jebel Ali',
    startingPriceAED: 22500000,
    startingPriceUSD: 6126000,
    pricePerSqFt: 3150,
    completionDate: 'Q4 2027',
    handoverYear: 2027,
    paymentPlan: '80/20 (20% Down, 60% During Construction, 20% on Handover)',
    downPaymentPercent: 20,
    propertyType: 'Waterfront Mansion',
    bedrooms: '5 to 7 Bedroom Beach Mansions',
    sizeRangeSqFt: '7,316 - 12,200 sq.ft',
    projectedROI: '10.2% Net Projected',
    coordinates: { lat: 24.9984, lng: 54.9876 },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Over 110 kilometers of private pristine white sand beach frontage double the size of Palm Jumeirah',
      'Zero-carbon master-planned visionary island powered by 30% renewable solar energy',
      'Direct private deep-water superyacht marina access and private jetty berths for every frond',
      'Unprecedented capital growth upside anticipated as the premier mega-island of Dubai 2040 Plan',
      'Exclusive bespoke interior layouts by world-renowned Milanese and Parisian architecture ateliers'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Nakheel (Dubai Holding)',
      rating: 4.8,
      projectsCompleted: 112,
      onTimeDeliveryRate: '97.2%',
      escrowVerified: true,
      benchmarkPriceDiff: '-38% vs Palm Jumeirah Secondary Resale',
      exclusivePerk: 'Complimentary Nakheel Marinas 2-Year Yacht Mooring Pass',
      competitorComparison: [
        { portalName: 'Palm Jumeirah Resale Avg', averagePricePerSqFt: 5100 },
        { portalName: 'Bayut Waterfront Index', averagePricePerSqFt: 3600 },
        { portalName: 'PropertyFinder Offplan Avg', averagePricePerSqFt: 3380 }
      ]
    },
    priceHistory: [
      { year: '2023', pricePerSqFt: 2200, averageAreaPrice: 2100 },
      { year: '2024', pricePerSqFt: 2650, averageAreaPrice: 2500 },
      { year: '2025', pricePerSqFt: 2950, averageAreaPrice: 2750 },
      { year: '2026', pricePerSqFt: 3150, averageAreaPrice: 2950 }
    ],
    featured: true,
    status: 'New Launch',
    mlsSynced: true,
    dldPermitNumber: 'DLD-PERMIT-910283-PJA',
    description: 'The renaissance of Dubai luxury waterfront living. Palm Jebel Ali offers double the land area of Palm Jumeirah, with tranquil crystal lagoons, bespoke ultra-luxury beachfront mansions, and supreme privacy.',
    amenities: ['Private Beach', 'Superyacht Marina', 'Infinity Horizon Pool', 'Private Boat Slipway', 'Zen Garden', 'Smart Security Biometrics', 'Private Wellness Pavilion']
  },
  {
    id: 'armani-beach-residences',
    title: 'Armani Beach Residences by Arada',
    developer: 'Arada Developments',
    location: 'Palm Jumeirah East Crescent, Dubai',
    city: 'Dubai',
    subLocation: 'Palm Jumeirah',
    startingPriceAED: 21500000,
    startingPriceUSD: 5854000,
    pricePerSqFt: 6200,
    completionDate: 'Q4 2026',
    handoverYear: 2026,
    paymentPlan: '60/40 (20% Booking, 40% Construction, 40% on Handover)',
    downPaymentPercent: 20,
    propertyType: 'Penthouse',
    bedrooms: '2 to 5 Bedroom Penthouses & Presidential Suites',
    sizeRangeSqFt: '2,657 - 9,500 sq.ft',
    projectedROI: '8.7% Net Projected',
    coordinates: { lat: 25.1288, lng: 55.1388 },
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Architectural masterwork designed in collaboration with Tadao Ando (Pritzker Prize winner) and Giorgio Armani',
      'Spectacular uninterrupted panoramic vistas across the Arabian Gulf, Dubai Marina, and Burj Al Arab',
      'Exclusive 90,000 sq.ft private resident spa, cigar lounge, and bespoke Japanese water pavilion',
      'Fully fitted with custom Armani/Casa furniture, Japanese acoustic paneling, and Italian marble',
      'Ultra-exclusive low-density development with only 53 bespoke residences ensuring supreme privacy'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Arada',
      rating: 4.95,
      projectsCompleted: 34,
      onTimeDeliveryRate: '99.1%',
      escrowVerified: true,
      benchmarkPriceDiff: 'Prime Ultra-Luxury Benchmark',
      exclusivePerk: 'Armani VIP Global Membership + Private Interior Consultation in Milan',
      competitorComparison: [
        { portalName: 'Palm Jumeirah Ultra-Luxury Avg', averagePricePerSqFt: 6500 },
        { portalName: 'Bayut Trophy Assets Index', averagePricePerSqFt: 6400 },
        { portalName: 'PropertyFinder Prime Palm', averagePricePerSqFt: 6280 }
      ]
    },
    priceHistory: [
      { year: '2022', pricePerSqFt: 4200, averageAreaPrice: 3900 },
      { year: '2023', pricePerSqFt: 4950, averageAreaPrice: 4600 },
      { year: '2024', pricePerSqFt: 5600, averageAreaPrice: 5100 },
      { year: '2025', pricePerSqFt: 5950, averageAreaPrice: 5500 },
      { year: '2026', pricePerSqFt: 6200, averageAreaPrice: 5800 }
    ],
    featured: true,
    status: 'Final Phase',
    mlsSynced: true,
    dldPermitNumber: 'DLD-PERMIT-401923-ARM',
    description: 'Armani Beach Residences on Palm Jumeirah is a collaboration between master architect Tadao Ando and Giorgio Armani. Characterized by poetic geometries, water reflections, and refined Italian minimalism.',
    amenities: ['Private Beach Access', 'Tadao Ando Water Pavilion', 'Armani Spa', 'Cigar Lounge', 'Private Cinema', 'Temperature-Controlled Pools', 'Bespoke Sommelier Cellar']
  },
  {
    id: 'mercedes-benz-places',
    title: 'Mercedes-Benz Places by Binghatti',
    developer: 'Binghatti Developers',
    location: 'Downtown Dubai (Facing Burj Khalifa)',
    city: 'Dubai',
    subLocation: 'Downtown Dubai',
    startingPriceAED: 8888000,
    startingPriceUSD: 2420000,
    pricePerSqFt: 3850,
    completionDate: 'Q4 2026',
    handoverYear: 2026,
    paymentPlan: '70/30 (20% Down, 50% During Construction, 30% on Handover)',
    downPaymentPercent: 20,
    propertyType: 'Luxury Apartment',
    bedrooms: '2 to 4 Bedroom Suites & Triplexes',
    sizeRangeSqFt: '1,846 - 6,140 sq.ft',
    projectedROI: '9.1% Net Projected',
    coordinates: { lat: 25.1950, lng: 55.2790 },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Soaring 341-meter hyper-tower crowned with the iconic Mercedes-Benz three-pointed star in Downtown Dubai',
      'Unobstructed front-row view of the Burj Khalifa and Dubai Fountain from private wrap-around terraces',
      'Integrated Mercedes-Benz smart home ecosystem with ambient Sensual Purity LED lighting profiles',
      'Photovoltaic solar cladding generating energy to power electric vehicle charging hubs throughout the tower',
      'Top-tier payment plan: 70/30 with guaranteed high short-term holiday home rental yields in Downtown'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Binghatti Developers',
      rating: 4.9,
      projectsCompleted: 48,
      onTimeDeliveryRate: '98.7%',
      escrowVerified: true,
      benchmarkPriceDiff: '-10% vs Emaar Downtown towers',
      exclusivePerk: '2-Year Free Maintenance + Complimentary EV Wallbox Charger',
      competitorComparison: [
        { portalName: 'Downtown Dubai Avg', averagePricePerSqFt: 4200 },
        { portalName: 'PropertyFinder Prime', averagePricePerSqFt: 4100 },
        { portalName: 'Bayut Downtown Offplan', averagePricePerSqFt: 3950 }
      ]
    },
    priceHistory: [
      { year: '2022', pricePerSqFt: 2500, averageAreaPrice: 2400 },
      { year: '2023', pricePerSqFt: 2950, averageAreaPrice: 2800 },
      { year: '2024', pricePerSqFt: 3400, averageAreaPrice: 3200 },
      { year: '2025', pricePerSqFt: 3700, averageAreaPrice: 3500 },
      { year: '2026', pricePerSqFt: 3850, averageAreaPrice: 3650 }
    ],
    featured: true,
    status: 'Selling Fast',
    mlsSynced: true,
    dldPermitNumber: 'DLD-PERMIT-771920-MB',
    description: 'Mercedes-Benz Places brings the automotive marque’s design philosophy of "Sensual Purity" to life in the sky of Downtown Dubai, directly facing the Burj Khalifa.',
    amenities: ['Burj Khalifa View Deck', 'EV Charging Station Hub', 'Private Sky Pool', 'Holistic Wellness Spa', 'Mercedes-Benz Concierge', 'Smart Home Automation', 'Valet Parking']
  },
  {
    id: 'wynn-al-marjan-suites',
    title: 'Wynn Al Marjan Island Suites & Residences',
    developer: 'RAK Hospitality & Marjan',
    location: 'Al Marjan Island, Ras Al Khaimah',
    city: 'Ras Al Khaimah',
    subLocation: 'Al Marjan Island',
    startingPriceAED: 3450000,
    startingPriceUSD: 939000,
    pricePerSqFt: 2850,
    completionDate: 'Q1 2027',
    handoverYear: 2027,
    paymentPlan: '50/50 (15% Down, 35% During Construction, 50% on Handover)',
    downPaymentPercent: 15,
    propertyType: 'Branded Residence',
    bedrooms: '1 to 3 Bedroom Waterfront Suites',
    sizeRangeSqFt: '920 - 2,850 sq.ft',
    projectedROI: '12.5% Net Projected',
    coordinates: { lat: 25.6698, lng: 55.7482 },
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Located directly adjacent to the $3.9 Billion Wynn Resort & Integrated Casino — the first in the MENA region',
      'Highest projected short-term rental yields in the UAE (12.5%+ net) driven by 5M+ annual gaming tourists',
      'Pristine Arabian Gulf coral beach frontage with private resident yacht slipways',
      'Zero income tax, zero capital gains tax, and streamlined UAE Golden Visa processing',
      'Low entry point with rapid capital appreciation (+48% recorded since Wynn ground-breaking)'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Marjan & RAK Properties',
      rating: 4.85,
      projectsCompleted: 29,
      onTimeDeliveryRate: '96.8%',
      escrowVerified: true,
      benchmarkPriceDiff: 'High Growth Frontier Benchmark',
      exclusivePerk: 'VIP Access to Wynn Al Marjan Beach Club & Casino Lounge',
      competitorComparison: [
        { portalName: 'Al Marjan Island Index', averagePricePerSqFt: 2950 },
        { portalName: 'PropertyFinder RAK Luxury', averagePricePerSqFt: 2890 },
        { portalName: 'DXB Offplan Coastal', averagePricePerSqFt: 2800 }
      ]
    },
    priceHistory: [
      { year: '2021', pricePerSqFt: 1100, averageAreaPrice: 1050 },
      { year: '2022', pricePerSqFt: 1450, averageAreaPrice: 1350 },
      { year: '2023', pricePerSqFt: 2100, averageAreaPrice: 1950 },
      { year: '2024', pricePerSqFt: 2500, averageAreaPrice: 2350 },
      { year: '2025', pricePerSqFt: 2700, averageAreaPrice: 2550 },
      { year: '2026', pricePerSqFt: 2850, averageAreaPrice: 2700 }
    ],
    featured: true,
    status: 'Selling Fast',
    mlsSynced: true,
    dldPermitNumber: 'RAK-MUNI-66102-WYNN',
    description: 'Capitalizing on the global phenomenon of Wynn Al Marjan Island, these luxury residences offer unparalleled investment yields fueled by the Middle East’s inaugural gaming and entertainment district.',
    amenities: ['Direct Coral Beach Access', 'Casino VIP Shuttle', 'Infinity Oceanfront Pool', 'Helipad Access', 'Michelin Star Dining Concierge', 'Yacht Marina', 'Spa & Wellness Suite']
  },
  {
    id: 'sobha-seahaven',
    title: 'Sobha Seahaven Tower C (Sky Edition)',
    developer: 'Sobha Realty',
    location: 'Dubai Harbour (Between Palm & Marina)',
    city: 'Dubai',
    subLocation: 'Dubai Harbour',
    startingPriceAED: 5900000,
    startingPriceUSD: 1606000,
    pricePerSqFt: 3950,
    completionDate: 'Q4 2026',
    handoverYear: 2026,
    paymentPlan: '80/20 (20% Down, 60% During Construction, 20% on Handover)',
    downPaymentPercent: 20,
    propertyType: 'Luxury Apartment',
    bedrooms: '1 to 4 Bedroom Sky Mansions',
    sizeRangeSqFt: '950 - 4,800 sq.ft',
    projectedROI: '8.9% Net Projected',
    coordinates: { lat: 25.0934, lng: 55.1432 },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Panoramic 270-degree maritime views encompassing Palm Jumeirah, Ain Dubai, and Dubai Marina skyline',
      'Sobha’s renowned backward integration guarantee ensuring German-engineered quality and zero defects',
      'Located in Dubai Harbour — the largest superyacht marina in the Middle East with 700 berths',
      'Direct cruise terminal connectivity and minutes from Sheikh Zayed Road and JBR Beach',
      'Luxury Sky Lounge on Level 65 with an elevated cantilevered glass-bottom infinity pool'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Sobha Realty',
      rating: 4.92,
      projectsCompleted: 85,
      onTimeDeliveryRate: '99.4%',
      escrowVerified: true,
      benchmarkPriceDiff: '-5% vs Emaar Beachfront Resale',
      exclusivePerk: 'Complimentary 5-Year Home Warranty + Fully Fitted German Miele Kitchens',
      competitorComparison: [
        { portalName: 'Emaar Beachfront Resale', averagePricePerSqFt: 4300 },
        { portalName: 'Dubai Harbour Average', averagePricePerSqFt: 4100 },
        { portalName: 'PropertyFinder Marina', averagePricePerSqFt: 3890 }
      ]
    },
    priceHistory: [
      { year: '2021', pricePerSqFt: 2400, averageAreaPrice: 2300 },
      { year: '2022', pricePerSqFt: 2900, averageAreaPrice: 2750 },
      { year: '2023', pricePerSqFt: 3350, averageAreaPrice: 3100 },
      { year: '2024', pricePerSqFt: 3650, averageAreaPrice: 3450 },
      { year: '2025', pricePerSqFt: 3850, averageAreaPrice: 3600 },
      { year: '2026', pricePerSqFt: 3950, averageAreaPrice: 3750 }
    ],
    featured: false,
    status: 'Under Construction',
    mlsSynced: true,
    dldPermitNumber: 'DLD-PERMIT-551092-SEAH',
    description: 'Sobha Seahaven Tower C is the pinnacle of maritime luxury in Dubai Harbour. Offering German engineering perfection and unobstructed vistas over Palm Jumeirah.',
    amenities: ['Sky Infinity Pool', 'Superyacht Berthing Concierge', 'German Miele Fitted Kitchens', 'Valet & Chauffeur Services', 'Private Cinema Lounge', 'Yoga & Pilates Pavilion']
  },
  {
    id: 'dubai-creek-waters',
    title: 'Creek Waters 2 by Emaar',
    developer: 'Emaar Properties',
    location: 'Dubai Creek Harbour, Dubai',
    city: 'Dubai',
    subLocation: 'Dubai Creek Harbour',
    startingPriceAED: 2450000,
    startingPriceUSD: 667000,
    pricePerSqFt: 2350,
    completionDate: 'Q3 2027',
    handoverYear: 2027,
    paymentPlan: '90/10 (10% Down, 80% During Construction, 10% on Handover)',
    downPaymentPercent: 10,
    propertyType: 'Luxury Apartment',
    bedrooms: '1 to 4 Bedroom Residences & Townhouses',
    sizeRangeSqFt: '755 - 2,900 sq.ft',
    projectedROI: '9.6% Net Projected',
    coordinates: { lat: 25.1972, lng: 55.3582 },
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Master-developed by Emaar Properties — the world-renowned developer of Burj Khalifa and Dubai Mall',
      'Front-row position on the Creek Island canal promenade overlooking the Ras Al Khor Flamingo Sanctuary',
      'Direct pedestrian bridge to Central Park and Creek Marina with waterfront fine dining restaurants',
      'Only 10-15 minutes drive to Downtown Dubai and Dubai International Airport (DXB)',
      'High historical capital appreciation with 9.6% net projected yields for long-term rental investors'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Emaar Properties',
      rating: 4.96,
      projectsCompleted: 240,
      onTimeDeliveryRate: '99.5%',
      escrowVerified: true,
      benchmarkPriceDiff: 'Blue-Chip Master Developer Gold Standard',
      exclusivePerk: 'Emaar Signature Property Management + Zero Resale NOC Fees',
      competitorComparison: [
        { portalName: 'Dubai Creek Average', averagePricePerSqFt: 2450 },
        { portalName: 'Bayut Waterfront Index', averagePricePerSqFt: 2500 },
        { portalName: 'PropertyFinder Emaar Track', averagePricePerSqFt: 2400 }
      ]
    },
    priceHistory: [
      { year: '2021', pricePerSqFt: 1450, averageAreaPrice: 1400 },
      { year: '2022', pricePerSqFt: 1750, averageAreaPrice: 1650 },
      { year: '2023', pricePerSqFt: 2000, averageAreaPrice: 1900 },
      { year: '2024', pricePerSqFt: 2180, averageAreaPrice: 2050 },
      { year: '2025', pricePerSqFt: 2280, averageAreaPrice: 2150 },
      { year: '2026', pricePerSqFt: 2350, averageAreaPrice: 2220 }
    ],
    featured: false,
    status: 'New Launch',
    mlsSynced: true,
    dldPermitNumber: 'DLD-PERMIT-110948-EMAAR',
    description: 'Creek Waters 2 presents modern architecture elevated by Emaar’s signature craftsmanship. Set against the serene backdrop of Dubai Creek and the historic waterway.',
    amenities: ['Canal-facing Infinity Pool', 'State-of-the-art Health Club', 'Kids Adventure Playground', 'Creek Promenade Dining', 'Pet-friendly Parks', 'Concierge & 24/7 Security']
  },
  {
    id: 'azizi-florence',
    title: 'Azizi Florence Master Community',
    developer: 'Azizi Developments',
    location: 'Um Fanain, E311 Sheikh Mohammed Bin Zayed Road, UAE',
    city: 'Sharjah',
    subLocation: 'Azizi Florence (Sharjah / Dubai Border)',
    startingPriceAED: 850000,
    startingPriceUSD: 231500,
    pricePerSqFt: 1180,
    completionDate: 'Q4 2027',
    handoverYear: 2027,
    paymentPlan: '50/50 (10% Down, 40% Construction, 50% on Handover)',
    downPaymentPercent: 10,
    propertyType: 'Luxury Apartment',
    bedrooms: 'Studio, 1, 2, 3 Bedrooms & 4-Bed Townhouses',
    sizeRangeSqFt: '480 - 3,250 sq.ft',
    projectedROI: '10.8% Net Projected',
    coordinates: { lat: 25.3280, lng: 55.4950 },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Sharjah’s largest 30-million-sq-ft Italian-inspired master-planned residential mega-community',
      'Massive 1.7-million-sq-ft Signature Central Park with crystal lagoons, botanical gardens, and amphitheatre',
      'Direct connectivity on E311 highway: only 25 minutes to DXB Airport and 30 mins to Downtown Dubai',
      '100% Freehold ownership for all international nationalities with UAE 10-Year Golden Visa eligibility',
      'High capital appreciation trajectory with projected 10.8% net rental yield and flexible 50/50 payment plan'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Azizi Developments',
      rating: 4.86,
      projectsCompleted: 120,
      onTimeDeliveryRate: '97.6%',
      escrowVerified: true,
      benchmarkPriceDiff: '-18% vs Dubai Perimeter Off-Plan',
      exclusivePerk: '100% Registration Fee Waiver + 2-Year Free Maintenance Voucher',
      competitorComparison: [
        { portalName: 'Sharjah Sustainable City Resale', averagePricePerSqFt: 1380 },
        { portalName: 'PropertyFinder Northern Emirates', averagePricePerSqFt: 1350 },
        { portalName: 'Bayut Master Community Index', averagePricePerSqFt: 1290 }
      ]
    },
    priceHistory: [
      { year: '2023', pricePerSqFt: 880, averageAreaPrice: 850 },
      { year: '2024', pricePerSqFt: 990, averageAreaPrice: 940 },
      { year: '2025', pricePerSqFt: 1090, averageAreaPrice: 1020 },
      { year: '2026', pricePerSqFt: 1180, averageAreaPrice: 1100 }
    ],
    featured: true,
    status: 'New Launch',
    mlsSynced: true,
    dldPermitNumber: 'SHJ-MUNI-982103-FLOR',
    description: 'Azizi Florence stands as Sharjah’s most ambitious master-planned residential destination. Spanning 30 million square feet with Renaissance Italian architectural grace, it features a 1.7 million sq.ft central park, crystal water bodies, and direct E311 highway access.',
    amenities: ['1.7M Sq.Ft Central Park', 'Crystal Lagoon', 'Open-Air Amphitheatre', 'Community Retail Mall', 'International Schools', 'Healthcare Pavilion', 'Cycling & Jogging Tracks']
  },
  {
    id: 'azizi-venice',
    title: 'Azizi Venice Crystal Lagoons',
    developer: 'Azizi Developments',
    location: 'Dubai South (Next to Al Maktoum Intl Airport), Dubai',
    city: 'Dubai',
    subLocation: 'Dubai South',
    startingPriceAED: 760000,
    startingPriceUSD: 207000,
    pricePerSqFt: 1650,
    completionDate: 'Q4 2026',
    handoverYear: 2026,
    paymentPlan: '50/50 (20% Down, 30% Construction, 50% on Handover)',
    downPaymentPercent: 20,
    propertyType: 'Branded Residence',
    bedrooms: 'Studio, 1 to 3 Bedroom Waterfront Suites',
    sizeRangeSqFt: '380 - 1,850 sq.ft',
    projectedROI: '11.2% Net Projected',
    coordinates: { lat: 24.9080, lng: 55.1320 },
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Spectacular 18-kilometer swimmable crystal lagoon with artificial waves and pristine white sandy beaches',
      'Home to Dubai South’s first 1,500-seat Opera House, climate-controlled pedestrian boulevard, and fine dining avenue',
      'Strategically positioned 5 minutes from Al Maktoum International Airport (world’s largest mega-airport expansion)',
      'Freehold Mediterranean resort lifestyle with streamlined UAE 10-Year Golden Visa processing',
      'Accelerating capital growth (+26% recorded since ground-breaking) with up to 11.2% net short-term rental yields'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Azizi Developments',
      rating: 4.86,
      projectsCompleted: 120,
      onTimeDeliveryRate: '97.6%',
      escrowVerified: true,
      benchmarkPriceDiff: '-12% vs Dubai South Average',
      exclusivePerk: 'Complimentary VIP Opera House Season Passes for 2 Years',
      competitorComparison: [
        { portalName: 'Dubai South Waterfront Index', averagePricePerSqFt: 1820 },
        { portalName: 'PropertyFinder Expo City Area', averagePricePerSqFt: 1780 },
        { portalName: 'Bayut Offplan Index', averagePricePerSqFt: 1710 }
      ]
    },
    priceHistory: [
      { year: '2022', pricePerSqFt: 1150, averageAreaPrice: 1100 },
      { year: '2023', pricePerSqFt: 1320, averageAreaPrice: 1250 },
      { year: '2024', pricePerSqFt: 1480, averageAreaPrice: 1400 },
      { year: '2025', pricePerSqFt: 1580, averageAreaPrice: 1500 },
      { year: '2026', pricePerSqFt: 1650, averageAreaPrice: 1560 }
    ],
    featured: true,
    status: 'Selling Fast',
    mlsSynced: true,
    dldPermitNumber: 'DLD-PERMIT-661902-VEN',
    description: 'Azizi Venice is a Venetian-inspired waterfront wonderland in Dubai South. Surrounding an 18km crystal lagoon, it merges European cultural architecture with a 1,500-seat Opera House, climate-controlled retail boulevards, and rapid airport connectivity.',
    amenities: ['18km Swimmable Crystal Lagoon', '1,500-Seat Opera House', 'Air-Conditioned Boulevard', 'Cable Car Transit', 'Private Water Taxis', 'Luxury Boutique Hotel', 'Beach Club & Wave Pools']
  },
  {
    id: 'bayz-101-danube',
    title: 'Bayz 101 by Danube (101 Levels)',
    developer: 'Danube Properties',
    location: 'Business Bay (Direct Burj Khalifa View), Dubai',
    city: 'Dubai',
    subLocation: 'Business Bay',
    startingPriceAED: 1175000,
    startingPriceUSD: 319800,
    pricePerSqFt: 2450,
    completionDate: 'Q2 2028',
    handoverYear: 2028,
    paymentPlan: '74/26 (10% Down, 1% Monthly Installments, 26% Post-Handover)',
    downPaymentPercent: 10,
    propertyType: 'Luxury Apartment',
    bedrooms: 'Studio, 1 to 4 Bedroom Sky Suites with Private Pools',
    sizeRangeSqFt: '410 - 2,200 sq.ft',
    projectedROI: '9.8% Net Projected',
    coordinates: { lat: 25.1865, lng: 55.2680 },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Soaring 101-level architectural masterpiece standing as one of the tallest residential towers in the world',
      'Danube’s world-famous 1% per month payment plan with zero-interest post-handover financing',
      'Over 40+ resort-style luxury amenities including private cantilevered sky pools and Burj Khalifa sky observatory',
      'Prime Business Bay address within 2 minutes walk to the Dubai Canal promenade and Sheikh Zayed Road',
      'Fully furnished designer residences with Italian convertible space-saving furniture layouts included'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Danube Properties',
      rating: 4.88,
      projectsCompleted: 30,
      onTimeDeliveryRate: '98.5%',
      escrowVerified: true,
      benchmarkPriceDiff: '-15% vs Downtown & Business Bay Skyscraper Average',
      exclusivePerk: 'Danube 1% Monthly Plan + Fully Fitted Italian Kitchen & Appliances',
      competitorComparison: [
        { portalName: 'Business Bay High-Rise Avg', averagePricePerSqFt: 2900 },
        { portalName: 'PropertyFinder Tower Index', averagePricePerSqFt: 2850 },
        { portalName: 'Bayut Business Bay Offplan', averagePricePerSqFt: 2780 }
      ]
    },
    priceHistory: [
      { year: '2023', pricePerSqFt: 1850, averageAreaPrice: 2100 },
      { year: '2024', pricePerSqFt: 2150, averageAreaPrice: 2350 },
      { year: '2025', pricePerSqFt: 2320, averageAreaPrice: 2500 },
      { year: '2026', pricePerSqFt: 2450, averageAreaPrice: 2650 }
    ],
    featured: true,
    status: 'Selling Fast',
    mlsSynced: true,
    dldPermitNumber: 'DLD-PERMIT-991204-BAYZ',
    description: 'Bayz 101 by Danube represents the pinnacle of high-rise living in Business Bay. Rising 101 floors with unhindered views of the Burj Khalifa and Arabian Sea, this hyper-tower offers Danube’s iconic 1% per month payment plan and private infinity sky plunge pools.',
    amenities: ['Private Balcony Pools', '101st Floor Sky Observation Deck', 'Infinity Sky Pool', 'Cricket Simulator', 'Health & Wellness Spa', 'Aquatic Gym', 'Valet Parking & Executive Business Lounge']
  },
  {
    id: 'diamondz-danube',
    title: 'Diamondz by Danube (Uptown / JLT)',
    developer: 'Danube Properties',
    location: 'Jumeirah Lake Towers (JLT), Opposite Dubai Marina, Dubai',
    city: 'Dubai',
    subLocation: 'Jumeirah Lake Towers (JLT)',
    startingPriceAED: 1100000,
    startingPriceUSD: 299400,
    pricePerSqFt: 2200,
    completionDate: 'Q4 2027',
    handoverYear: 2027,
    paymentPlan: '70/30 (10% Down, 1% Monthly Installments, 30% Post-Handover)',
    downPaymentPercent: 10,
    propertyType: 'Luxury Apartment',
    bedrooms: 'Studio, 1 to 4 Bedroom Suites with Private Plunge Pools',
    sizeRangeSqFt: '430 - 2,150 sq.ft',
    projectedROI: '10.4% Net Projected',
    coordinates: { lat: 25.0750, lng: 55.1450 },
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Soaring 65-story diamond-faceted luxury tower in JLT directly facing the landmark DMCC Uptown Tower',
      'Iconic 1% monthly payment plan spread across 70 months with 30 months post-handover ease',
      'First residential tower in JLT featuring private plunge pools built into private residential balconies',
      'Over 40+ resort amenities including rooftop bowling alley, padel tennis courts, and sky hammock cabanas',
      'Tremendous rental demand from DMCC Free Zone multinational executives yielding 10.4% net projected returns'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'Danube Properties',
      rating: 4.88,
      projectsCompleted: 30,
      onTimeDeliveryRate: '98.5%',
      escrowVerified: true,
      benchmarkPriceDiff: '-10% vs JLT Uptown Area Benchmark',
      exclusivePerk: 'Danube 1% Plan + Fully Furnished Luxury Interiors with Spanish Porcelain',
      competitorComparison: [
        { portalName: 'JLT Uptown Average', averagePricePerSqFt: 2420 },
        { portalName: 'PropertyFinder JLT Prime', averagePricePerSqFt: 2390 },
        { portalName: 'Bayut Marina/JLT Index', averagePricePerSqFt: 2350 }
      ]
    },
    priceHistory: [
      { year: '2023', pricePerSqFt: 1650, averageAreaPrice: 1750 },
      { year: '2024', pricePerSqFt: 1900, averageAreaPrice: 1980 },
      { year: '2025', pricePerSqFt: 2080, averageAreaPrice: 2150 },
      { year: '2026', pricePerSqFt: 2200, averageAreaPrice: 2280 }
    ],
    featured: false,
    status: 'New Launch',
    mlsSynced: true,
    dldPermitNumber: 'DLD-PERMIT-441802-DIAM',
    description: 'Diamondz by Danube redefines luxury living in Jumeirah Lake Towers. Featuring fully furnished luxury apartments with private pools, state-of-the-art wellness centers, and Danube’s hallmark 1% monthly installment plan.',
    amenities: ['Private Balcony Plunge Pools', 'Rooftop Bowling Alley', 'Padel Tennis Courts', 'Sky Hammock Lounge', 'Doctor-on-Call Service', 'Infinity Pool', 'Children Splash Park']
  },
  {
    id: 'damac-bay-cavalli',
    title: 'DAMAC Bay by Cavalli',
    developer: 'DAMAC Properties',
    location: 'Dubai Harbour (Between Palm Jumeirah & Marina), Dubai',
    city: 'Dubai',
    subLocation: 'Dubai Harbour',
    startingPriceAED: 4500000,
    startingPriceUSD: 1225000,
    pricePerSqFt: 3750,
    completionDate: 'Q1 2027',
    handoverYear: 2027,
    paymentPlan: '80/20 (20% Down, 60% During Construction, 20% on Handover)',
    downPaymentPercent: 20,
    propertyType: 'Branded Residence',
    bedrooms: '1 to 5 Bedroom Ultra-Luxury Suites & Sky Mansions',
    sizeRangeSqFt: '880 - 4,600 sq.ft',
    projectedROI: '9.1% Net Projected',
    coordinates: { lat: 25.0945, lng: 55.1460 },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80'
    ],
    usps: [
      'Exclusive fashion-branded residences curated by Roberto Cavalli with maritime haute couture interiors',
      'Unobstructed 360-degree vistas of Palm Jumeirah, Ain Dubai, and the Arabian Gulf superyacht marina',
      'Private rooftop beach with infinity horizon pools and submerged cabanas connecting three soaring towers',
      'Prime position in Dubai Harbour with direct private beach access and cruise terminal promenade',
      'UAE 10-Year Golden Visa investor nomination package backed by blue-chip DAMAC delivery track record'
    ],
    virtualTourUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
    developerComparison: {
      developerName: 'DAMAC Properties',
      rating: 4.89,
      projectsCompleted: 180,
      onTimeDeliveryRate: '98.1%',
      escrowVerified: true,
      benchmarkPriceDiff: '-8% vs Emaar Beachfront Resale',
      exclusivePerk: 'Complimentary 4% DLD Transfer Fee Waiver + Cavalli Home Decor Package',
      competitorComparison: [
        { portalName: 'Dubai Harbour Waterfront Avg', averagePricePerSqFt: 4100 },
        { portalName: 'PropertyFinder Cavalli Track', averagePricePerSqFt: 3950 },
        { portalName: 'Bayut Luxury Index', averagePricePerSqFt: 3880 }
      ]
    },
    priceHistory: [
      { year: '2023', pricePerSqFt: 2950, averageAreaPrice: 3100 },
      { year: '2024', pricePerSqFt: 3350, averageAreaPrice: 3450 },
      { year: '2025', pricePerSqFt: 3600, averageAreaPrice: 3650 },
      { year: '2026', pricePerSqFt: 3750, averageAreaPrice: 3800 }
    ],
    featured: true,
    status: 'Selling Fast',
    mlsSynced: true,
    dldPermitNumber: 'DLD-PERMIT-773821-DAM',
    description: 'DAMAC Bay by Cavalli is a three-tower luxury maritime monument in Dubai Harbour. Featuring Roberto Cavalli interiors, sky gardens connecting all three towers, and uninterrupted ocean vistas across Palm Jumeirah.',
    amenities: ['Cavalli Fashion Lounge', 'Connecting Rooftop Beach', 'Submerged Pool Pods', 'Direct Yacht Berthing', 'Private Water Treatment Spa', 'Opera Dining Deck', 'Valet & Chauffeur Protocol']
  }
];

export const dubaiLocations = [
  { name: 'Downtown Dubai', avgPriceSqFt: 3850, growthYear: '+14.2%', description: 'Heart of the city, Burj Khalifa, high luxury demand' },
  { name: 'Palm Jumeirah', avgPriceSqFt: 5800, growthYear: '+18.5%', description: 'World-famous archipelago, trophy beachfront residences' },
  { name: 'Palm Jebel Ali', avgPriceSqFt: 3150, growthYear: '+24.8%', description: 'Dubai 2040 mega-island, maximum future appreciation' },
  { name: 'Business Bay', avgPriceSqFt: 3600, growthYear: '+12.6%', description: 'Dubai Canal, branded residences & hyper-towers' },
  { name: 'Dubai Harbour', avgPriceSqFt: 3950, growthYear: '+15.1%', description: 'Middle East largest superyacht marina' },
  { name: 'Dubai Creek Harbour', avgPriceSqFt: 2350, growthYear: '+11.8%', description: 'The future downtown with flamingo sanctuary & parks' },
  { name: 'Al Marjan Island (RAK)', avgPriceSqFt: 2850, growthYear: '+32.4%', description: 'Home to the $3.9B Wynn Casino, explosive ROI' },
  { name: 'Dubai South (Expo City)', avgPriceSqFt: 1850, growthYear: '+19.2%', description: 'Expansion around Al Maktoum International Airport' },
  { name: 'Sharjah (Azizi Florence)', avgPriceSqFt: 1180, growthYear: '+21.5%', description: '30M sq.ft Italian mega-community with 1.7M sq.ft Central Park' },
  { name: 'Jumeirah Lake Towers (JLT)', avgPriceSqFt: 2200, growthYear: '+13.8%', description: 'Opposite Dubai Marina, home to DMCC & Uptown Tower' }
];
