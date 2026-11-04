export type LanguageCode = 'en' | 'ar' | 'ru' | 'fr' | 'zh';

export interface TranslationStrings {
  brandTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  allLocations: string;
  allDevelopers: string;
  allBedrooms: string;
  searchButton: string;
  talkingAiTitle: string;
  talkingAiSubtitle: string;
  exploreProperties: string;
  fiveUspsTitle: string;
  startingFrom: string;
  handover: string;
  paymentPlan: string;
  bookViewing: string;
  virtualTour: string;
  priceHistory: string;
  developerComparison: string;
  mortgageCalculator: string;
  agentDashboard: string;
  clientPortal: string;
  goldenVisaBadge: string;
  escrowBadge: string;
  mlsSyncStatus: string;
  contactTitle: string;
  contactSubtitle: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  submitInquiry: string;
  voiceActive: string;
  voiceMute: string;
  listening: string;
  speakToAi: string;
}

export const translations: Record<LanguageCode, TranslationStrings> = {
  en: {
    brandTagline: "UAE Premier Off-Plan Real Estate Portal",
    heroTitle: "The Pinnacle of Dubai & UAE Off-Plan Living",
    heroSubtitle: "Explore iconic branded residences, guaranteed high ROI off-plan projects, and UAE Golden Visa investments. Hand-picked with 5 certified USPs per project.",
    searchPlaceholder: "Search by project, developer or location (e.g. Bugatti, Downtown, Palm)...",
    allLocations: "All UAE Locations",
    allDevelopers: "All Developers",
    allBedrooms: "All Bedrooms",
    searchButton: "Find Properties",
    talkingAiTitle: "Off-plan Concierge AI",
    talkingAiSubtitle: "Real-time voice & natural language advisory for UAE off-plan investments",
    exploreProperties: "Featured Off-Plan Masterpieces",
    fiveUspsTitle: "5 Unique Selling Points (USPs)",
    startingFrom: "Starting From",
    handover: "Handover",
    paymentPlan: "Payment Plan",
    bookViewing: "Schedule VIP Viewing",
    virtualTour: "360° Virtual Tour",
    priceHistory: "Price History & Trends",
    developerComparison: "Developer Comparison",
    mortgageCalculator: "Mortgage & Payment Calculator",
    agentDashboard: "Agent CRM & Leads",
    clientPortal: "Client VIP Portal",
    goldenVisaBadge: "UAE 10-Yr Golden Visa",
    escrowBadge: "100% Escrow Protected",
    mlsSyncStatus: "Live DLD / MLS Synced",
    contactTitle: "Connect With Our Private Office",
    contactSubtitle: "Direct advisory with Mark (WhatsApp: +971585538382). In-person chauffeured tours & global consultations.",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone / WhatsApp",
    budget: "Target Investment Budget",
    submitInquiry: "Submit VIP Inquiry & AI Match",
    voiceActive: "Voice Mode Active",
    voiceMute: "Mute AI Voice",
    listening: "Listening...",
    speakToAi: "Speak with AI Concierge"
  },
  ar: {
    brandTagline: "البوابة الرائدة للعقارات على المخطط في الإمارات",
    heroTitle: "قمة الفخامة والاستثمار العقاري في دبي والإمارات",
    heroSubtitle: "استكشف أفخم المشاريع السكنية ذات العلامات التجارية العالمية، بعائد استثماري مضمون وتأشيرة الإقامة الذهبية. مع 5 نقاط قوة فريدة لكل مشروع.",
    searchPlaceholder: "ابحث بالاسم أو المطور أو المنطقة (مثل بوغاتي، داون تاون)...",
    allLocations: "جميع مناطق الإمارات",
    allDevelopers: "جميع المطورين",
    allBedrooms: "جميع الغرف",
    searchButton: "بحث عن عقارات",
    talkingAiTitle: "مساعد Off-plan Concierge الصوتي الذكي",
    talkingAiSubtitle: "استشارات عقارية ذكية وفورية بصوت طبيعي",
    exploreProperties: "أبرز مشاريع قيد الإنشاء",
    fiveUspsTitle: "5 مميزات رئيسية فريدة (USPs)",
    startingFrom: "الأسعار تبدأ من",
    handover: "تاريخ التسليم",
    paymentPlan: "خطة الدفع",
    bookViewing: "حجز جولة خاصة كبار الشخصيات",
    virtualTour: "جولة افتراضية 360°",
    priceHistory: "سجل واتجاهات الأسعار",
    developerComparison: "مقارنة المطورين",
    mortgageCalculator: "حاسبة التمويل والدفعات",
    agentDashboard: "لوحة تحكم الوكلاء والمبيعات",
    clientPortal: "بوابة العميل الخاصة",
    goldenVisaBadge: "الإقامة الذهبية 10 سنوات",
    escrowBadge: "حساب ضمان مضمون 100%",
    mlsSyncStatus: "محدث مباشرة مع دائرة الأراضي DLD",
    contactTitle: "تواصل مع مكتبنا الخاص",
    contactSubtitle: "استشارات مباشرة مع مارك (واتساب: 971585538382+). جولات بسيارات خاصة واستشارات مرئية.",
    name: "الاسم بالكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف / واتساب",
    budget: "الميزانية الاستثمارية",
    submitInquiry: "إرسال طلب كبار الشخصيات ومطابقة الذكاء الاصطناعي",
    voiceActive: "الصوت التفاعلي مفعل",
    voiceMute: "كتم الصوت",
    listening: "جارٍ الاستماع...",
    speakToAi: "تحدث مع المساعد الصوتي"
  },
  ru: {
    brandTagline: "Премиальный портал строящейся недвижимости в ОАЭ",
    heroTitle: "Вершина роскошной недвижимости Дубая на этапе off-plan",
    heroSubtitle: "Брендовые резиденции, высокая доходность до 12% и оформление Золотой визы ОАЭ на 10 лет. 5 ключевых преимуществ (USP) по каждому проекту.",
    searchPlaceholder: "Поиск проекта, девелопера или района (Bugatti, Palm, Downtown)...",
    allLocations: "Все локации ОАЭ",
    allDevelopers: "Все застройщики",
    allBedrooms: "Все спальни",
    searchButton: "Найти объекты",
    talkingAiTitle: "Голосовой ИИ-консьерж Off-plan Concierge",
    talkingAiSubtitle: "Мгновенные консультации по инвестициям в ОАЭ в реальном времени",
    exploreProperties: "Флагманские Off-Plan проекты",
    fiveUspsTitle: "5 уникальных преимуществ (USP)",
    startingFrom: "Цена от",
    handover: "Срок сдачи",
    paymentPlan: "План платежей",
    bookViewing: "Забронировать VIP просмотр",
    virtualTour: "360° Виртуальный тур",
    priceHistory: "История и динамика цен",
    developerComparison: "Сравнение застройщиков",
    mortgageCalculator: "Калькулятор ипотеки и рассрочки",
    agentDashboard: "CRM панель агентов",
    clientPortal: "VIP кабинет клиента",
    goldenVisaBadge: "Золотая виза ОАЭ 10 лет",
    escrowBadge: "100% Защита эскроу RERA",
    mlsSyncStatus: "Синхронизация с Земельным департаментом DLD",
    contactTitle: "Связаться с Private Office",
    contactSubtitle: "Прямые консультации с Марком (WhatsApp: +971585538382). VIP-трансфер на Rolls-Royce и онлайн-презентации.",
    name: "Ваше имя",
    email: "Email адрес",
    phone: "Телефон / WhatsApp",
    budget: "Планируемый бюджет",
    submitInquiry: "Отправить запрос и получить подборку",
    voiceActive: "Голосовой режим включен",
    voiceMute: "Выключить звук",
    listening: "Слушаю вас...",
    speakToAi: "Голосовой диалог с ИИ"
  },
  fr: {
    brandTagline: "Portail Immobilier de Prestige Off-Plan aux Émirats",
    heroTitle: "Le Sommet de l'Immobilier Neuf et Off-Plan à Dubaï",
    heroSubtitle: "Résidences signées par de grands créateurs, rendements locatifs élevés et éligibilité au Golden Visa des Émirats. 5 arguments uniques (USP) certifiés par projet.",
    searchPlaceholder: "Rechercher par projet, promoteur ou quartier...",
    allLocations: "Toutes les localisations",
    allDevelopers: "Tous les promoteurs",
    allBedrooms: "Toutes chambres",
    searchButton: "Explorer les biens",
    talkingAiTitle: "Concierge Vocal IA Off-plan Concierge",
    talkingAiSubtitle: "Conseils en direct pour vos investissements off-plan aux Émirats",
    exploreProperties: "Chefs-d'œuvre Off-Plan",
    fiveUspsTitle: "5 Points Forts Uniques (USPs)",
    startingFrom: "À partir de",
    handover: "Livraison",
    paymentPlan: "Plan de Paiement",
    bookViewing: "Réserver une Visite VIP",
    virtualTour: "Visite Virtuelle 360°",
    priceHistory: "Historique & Évolution des Prix",
    developerComparison: "Comparateur de Promoteurs",
    mortgageCalculator: "Calculateur de Crédit & Échéances",
    agentDashboard: "Tableau de Bord Agents & Leads",
    clientPortal: "Espace Client Privé",
    goldenVisaBadge: "Golden Visa Émirats 10 Ans",
    escrowBadge: "100% Compte Escrow Sécurisé",
    mlsSyncStatus: "Synchronisé DLD / MLS en Direct",
    contactTitle: "Contacter Notre Private Office",
    contactSubtitle: "Conseil direct avec Mark (WhatsApp : +971585538382). Visites privées en chauffeur et visioconférences.",
    name: "Nom complet",
    email: "Adresse e-mail",
    phone: "Téléphone / WhatsApp",
    budget: "Budget d'investissement",
    submitInquiry: "Envoyer ma demande VIP",
    voiceActive: "Mode vocal activé",
    voiceMute: "Couper la voix",
    listening: "À l'écoute...",
    speakToAi: "Parler avec le concierge IA"
  },
  zh: {
    brandTagline: "阿联酋顶级期房与奢华置业门户",
    heroTitle: "迪拜与阿联酋顶级期房豪宅巅峰之作",
    heroSubtitle: "精选全球知名品牌联名公寓与滨海庄园，享有高达12%净投资回报率及阿联酋10年黄金签证。每个项目严格提供5大核心竞争优势 (USPs)。",
    searchPlaceholder: "搜索项目、开发商或地段（如布加迪、市中心、棕榈岛）...",
    allLocations: "所有阿联酋区域",
    allDevelopers: "所有主流开发商",
    allBedrooms: "所有户型",
    searchButton: "检索精选房源",
    talkingAiTitle: "Off-plan Concierge 语音智能置业顾问",
    talkingAiSubtitle: "阿联酋期房房产实时语音对话与投资方案分析",
    exploreProperties: "精选旗舰期房项目",
    fiveUspsTitle: "5大独特卖点 (5 USPs)",
    startingFrom: "起售价",
    handover: "交房时间",
    paymentPlan: "付款计划",
    bookViewing: "预约贵宾专车看房",
    virtualTour: "360° 全景沉浸式看房",
    priceHistory: "历史价格走势与涨幅",
    developerComparison: "开发商实力与全网比价",
    mortgageCalculator: "房贷与分期付款计算器",
    agentDashboard: "经纪人客户线索中枢",
    clientPortal: "尊贵客户私享专区",
    goldenVisaBadge: "阿联酋10年黄金签证",
    escrowBadge: "100% 政府信托监管账户 (Escrow)",
    mlsSyncStatus: "迪拜土地局 DLD / MLS 实时直连",
    contactTitle: "联系尊享私享办公室",
    contactSubtitle: "由置业负责人 Mark 直接对接（WhatsApp: +971585538382）。劳斯莱斯专车接送看房与全球视频签约。",
    name: "客户姓名",
    email: "电子邮箱",
    phone: "手机号 / 微信 / WhatsApp",
    budget: "意向投资预算",
    submitInquiry: "提交贵宾咨询与AI精准匹配",
    voiceActive: "语音模式已开启",
    voiceMute: "静音语音",
    listening: "正在倾听...",
    speakToAi: "与AI语音顾问实时对话"
  }
};
