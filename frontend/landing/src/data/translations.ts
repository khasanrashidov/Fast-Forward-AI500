export type Language = 'en' | 'uz' | 'ru';

export interface Translations {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    viewDemo: string;
    learnMore: string;
  };
  nav: {
    demo: string;
  };
  demo: {
    title: string;
    videoPlaceholder: string;
    aboutTitle: string;
    whatIsTitle: string;
    whatIsDesc: string;
    problemConnectionTitle: string;
    problemConnectionDesc: string;
    solutionConnectionTitle: string;
    solutionConnectionDesc: string;
    techStackTitle: string;
    aiTechTitle: string;
    aiTechItems: string[];
    otherTechTitle: string;
    currentStageTitle: string;
    currentStage: string;
    currentStageDesc: string;
    nextStepsTitle: string;
    nextSteps: string[];
    hackathonSubmission: string;
    tryAppTitle: string;
    tryAppSubtitle: string;
    openFullscreen: string;
    liveAccessTitle: string;
    liveAccessDesc: string;
    openLiveApp: string;
  };
  problemSolution: {
    problemTitle: string;
    problemDesc: string;
    problems: string[];
    solutionBadge: string;
    meet: string;
    solutionTitle: string;
    solutionDesc: string;
    solutions: Array<{
      title: string;
      desc: string;
    }>;
  };
  whyUs: {
    title: string;
    subtitle: string;
    reasons: Array<{
      title: string;
      desc: string;
    }>;
  };
  roadmap: {
    badge: string;
    title: string;
    phases: Array<{
      date: string;
      title: string;
      items: string[];
    }>;
  };
  methodology: {
    title: string;
    subtitle: string;
    stepsTitle: string;
    techStackTitle: string;
    steps: Array<{
      title: string;
      details: string[];
      futurePlan?: boolean;
    }>;
    stack: Array<{
      category: string;
      items: string[];
    }>;
  };
  team: {
    title: string;
    subtitle: string;
    teamLead: string;
    members: Array<{
      name: string;
      role: string;
      desc: string;
      linkedin?: string;
      github?: string;
    }>;
  };
  footer: {
    copyright: string;
    githubLink: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      badge: 'Powered with Artificial Intelligence',
      title: 'Moliyachi',
      subtitle: 'Your AI-powered personal finance assistant inside Agrobank Mobile',
      viewDemo: 'View Demo',
      learnMore: 'Learn More',
    },
    nav: {
      demo: 'Demo',
    },
    demo: {
      title: 'Demo Recording',
      videoPlaceholder: 'Video Placeholder (1-5 mins)',
      aboutTitle: 'Description',
      whatIsTitle: 'What is Moliyachi?',
      whatIsDesc:
        'An AI-powered personal finance assistant that lives inside Agrobank Mobile. It transforms your banking app into an intelligent financial companion.',
      problemConnectionTitle: 'The Problem We Solve',
      problemConnectionDesc:
        'Many Agrobank customers live paycheck to paycheck, facing aggressive spending after salary arrival, mid-month financial stress, and no visibility into their spending behavior. Current banking apps show transactions but lack intelligence — users need to understand their financial behavior, not just view balances.',
      solutionConnectionTitle: 'Our Solution',
      solutionConnectionDesc:
        'Moliyachi transforms Agrobank Mobile from a transaction tool into a financial partner. Using AI, we provide spending insights, smart monthly planning with balance predictions, a Financial Health Score (0-100), goal planning with AI timelines, and personalized Agrobank product recommendations.',
      techStackTitle: 'Tech Stack',
      aiTechTitle: 'AI & Intelligence Layer',
      aiTechItems: [
        'LangChain — AI orchestration framework',
        'OpenAI GPT-5.1/4.1/4o — Large Language Models',
        'RAG — Retrieval-Augmented Generation',
        'Machine Learning — Behavioral modeling & predictions',
        'Open-source LLMs — On-premise deployment option',
        'LangSmith — AI observability & monitoring',
      ],
      otherTechTitle: 'Full Stack',
      currentStageTitle: 'Current Stage',
      currentStage: 'MVP',
      currentStageDesc: 'Fully functional prototype with core AI features implemented',
      nextStepsTitle: 'Next Steps',
      nextSteps: [
        'Final UI/UX polishing',
        'Performance optimization',
        'Edge case handling improvements',
      ],
      hackathonSubmission: 'AI500 Hackathon Submission',
      tryAppTitle: 'Try the App',
      tryAppSubtitle: 'Interactive preview',
      openFullscreen: 'Open fullscreen →',
      liveAccessTitle: 'Live Access',
      liveAccessDesc: 'Try out the working application. No authorization required for testing.',
      openLiveApp: 'Open Live App',
    },
    problemSolution: {
      problemTitle: 'The Problem',
      problemDesc:
        "A significant number of Agrobank's customers live on a strict salary cycle, facing stress and uncertainty every month",
      problems: [
        'Aggressive spending after salary arrival',
        'Mid-month financial stress & uncertainty',
        'No visibility into spending behavior',
        'Lack of personalized budgeting guidance',
        'Current banking apps provide transactions, not intelligence',
        'Users need a way to understand their financial behavior—not just view their balance',
      ],
      solutionBadge: 'The Solution',
      meet: 'Meet',
      solutionTitle: 'Moliyachi',
      solutionDesc:
        'A smart financial assistant fully embedded into AgrobankMobile that transforms it from a transaction tool into a financial partner',
      solutions: [
        {
          title: 'AI Spending Insights',
          desc: 'Short, actionable explanations of where your money goes',
        },
        {
          title: 'Smart Monthly Planning',
          desc: 'Warnings when spending is too fast & balance predictions',
        },
        {
          title: 'Financial Health Score',
          desc: 'One simple score (0–100) explaining your stability',
        },
        {
          title: 'Goal Planning',
          desc: 'AI calculates timelines and suggests improvements',
        },
        {
          title: 'Personalized Recommendations',
          desc: 'Based on spending patterns, habits, income, and goals',
        },
        {
          title: 'Agrobank Product Matching',
          desc: 'AI suggests Microloans, Deposits, Savings, and Installment options',
        },
        {
          title: 'AI Shop Agent',
          desc: 'Find the perfect product with AI-powered recommendations. Get installment options via Opencard by Agrobank, price comparisons, and personalized insights.',
        },
      ],
    },
    whyUs: {
      title: 'Why Our Team?',
      subtitle:
        'We are not just building features — we are building a financial intelligence layer for Agrobank',
      reasons: [
        {
          title: 'We move extremely fast',
          desc: 'All members are Lead and Senior level engineers capable of shipping an MVP within days',
        },
        {
          title: 'We know the problem',
          desc: 'Most of us live on a salary cycle and personally experience the challenges we are solving',
        },
        {
          title: 'Strong technical background',
          desc: 'We cover ML/AI, Backend, Fintech logic, and Modern UI/UX',
        },
      ],
    },
    roadmap: {
      badge: 'Roadmap',
      title: 'Development Plan',
      phases: [
        {
          date: 'Nov 26 – Nov 30',
          title: 'Stage 1: Demo Website',
          items: [
            'Landing website',
            'Problem & Solution',
            'Architecture planning',
            'Initial AI insights',
            'Everything written from scratch',
            'Frontend development of demo MVP started',
            'Currently has UI template, development in progress',
            'Basic CI/CD, environment setup, base deployments',
          ],
        },
        {
          date: 'Dec 1 – Dec 5',
          title: 'Functional MVP Shell',
          items: [
            'Next.js frontend base',
            'Visual dashboard layout',
            'Mock profile setup',
            'Frontend-Backend pipeline',
          ],
        },
        {
          date: 'Dec 5 – Dec 10',
          title: 'Core MVP Functionality',
          items: [
            'AI recommendation engine',
            'Goal calculator',
            'Financial Health Score',
            'Salary-cycle warning',
          ],
        },
        {
          date: 'Dec 10 – Dec 13',
          title: 'Polish & Submission',
          items: [
            'Supabase integration',
            'LangChain pipeline',
            'Final UI polishing',
            'Deployment (Vercel/Render)',
          ],
        },
      ],
    },
    methodology: {
      title: 'How We Plan to Solve It',
      subtitle:
        "We build a thin, intelligent AI layer on top of Agrobank's financial infrastructure",
      stepsTitle: 'Key Implementation Steps',
      techStackTitle: 'Tech Stack',
      steps: [
        {
          title: 'User Financial Profile Ingestion & Normalization',
          details: [
            'Collect structured data: salary, age, family size, occupation, financial goals, currency preferences',
            'Extract static data: income streams, spending history, recurring payments, loans, assets, liabilities (NOTE: For hackathon purposes static mock data close to real life data is used)',
            'Normalize & store in secure DB (PII-safe)',
          ],
        },
        {
          title: 'Transaction Categorization & Behavioral Modeling',
          details: [
            'Hybrid engine: Rule-based keyword detection for high-precision categories',
            'AI classifier (GPT or finetuned model) for ambiguous transactions',
            'Track monthly volatility per category',
            'Build behavioral signatures: spending cycles, salary cycles, weekend spikes, seasonality',
            'Detect anomalies: sudden overspending, large one-offs, emerging recurring charges',
          ],
        },
        {
          title: 'Financial Analytics Dashboard',
          details: [
            'Built with Next.js + Tailwind + charts (bar, pie, trend lines)',
            'Shows: Category breakdown, Month-over-month trends, Essential vs discretionary spend',
            'AI auto-highlights unusual trends (e.g., "Dining Out +32% vs last month")',
          ],
        },
        {
          title: 'AI Insight Engine (Core Intelligence Layer)',
          details: [
            'Powered by GPT-5.1/4.1/4o + LangChain',
            'Model-agnostic architecture: supports any LLM provider',
            'Can use open-source LLMs or fine-tuned models running on-premises for complete data privacy',
            'Zero user data sent to external services when using on-premises deployment',
            'Generates: Spending insights, Trend explanations, Micro-advice (short, actionable 1–2 sentence tips)',
            'Predictive alerts (e.g., "Balance may fall below safe threshold in 9 days").',
            'Uses chain-of-thought hidden reasoning + deterministic guardrails for consistency',
          ],
        },
        {
          title: 'Salary-Cycle & Cashflow Predictor',
          details: [
            'Predicts when user will run out of money using: Historical spending velocity, Upcoming bills, Category-level volatility',
            'Produces: "Days until zero", Confidence interval (AI-enhanced).',
            'Recommended interventions (cut X% in discretionary → +5 days buffer)',
          ],
        },
        {
          title: 'Advanced Goal Timeline Calculator',
          details: [
            'Mathematical computations',
            'Real contributions = income – spending – installments – taxes – volatility buffer',
            'Monte Carlo simulation (2k–10k runs) for realistic scenarios',
            'Outputs: Deterministic months to target, Monte Carlo percentiles (10th, 50th, 90th), Success probability',
          ],
        },
        {
          title: 'Financial Health Score (Composite Index)',
          details: [
            'Factors: Savings rate stability, Income consistency, Spending volatility, Debt ratio, Emergency buffer coverage',
            'AI-derived risk assessment',
            'Score recalculated monthly with clear breakdowns ("Your score improved due to reduced volatility in Utilities spending").',
          ],
        },
        {
          title: 'Agrobank Product Recommendation Engine',
          details: [
            'Uses AI reasoning + financial rules to match user to products',
            'Deposits for surplus cash, Loans when liquidity risk detected',
            'Installments for large upcoming payments, Investment products depending on risk score',
            'Personalized explanations ("This deposit helps your goal reach 2 months earlier due to higher effective return").',
          ],
        },
        {
          title: 'Predictive Scenario & Simulation Engine',
          details: [
            'User can test scenarios: "What if I increase savings by 10%?", "What if inflation rises to 7%?", "What if I take a 5,000 loan?".',
            'The engine recalculates the entire projection with new inputs using fast Monte Carlo',
          ],
        },
        {
          title: 'Adaptive Learning & Continuous Model Updating',
          details: [
            'Monthly profile recalibration: Update spending µ/σ, Relearn category weights',
            'Adjust risk score, Update inflation & return assumptions',
            'AI automatically adjusts predictions as user behavior changes',
          ],
          futurePlan: true,
        },
      ],
      stack: [
        {
          category: 'Frontend',
          items: [
            'Next.js',
            'Tailwind CSS',
            'Recharts',
            'Lucide React',
            'TypeScript',
            'Mobile First',
          ],
        },
        {
          category: 'Backend',
          items: [
            'Python (Flask, SQLAlchemy)',
            'PostgreSQL',
            'REST API',
            'Mathematical computations',
          ],
        },
        {
          category: 'AI Layer',
          items: [
            'LangChain',
            'OpenAI GPT-5.1/4.1/4o',
            'Open-source LLM models for on-premise deployment',
            'Custom Rules and Instructions',
            'Machine Learning',
            'RAG',
          ],
        },
        {
          category: 'Hosting',
          items: [
            'Vercel (Frontend)',
            'Supabase (Infrastructure)',
            'Render (Backend)',
            'LangSmith (AI)',
          ],
        },
      ],
    },
    team: {
      title: 'Our Team',
      subtitle:
        'Lead and Senior level engineers and managers capable of shipping an MVP within days',
      teamLead: 'Team Lead',
      members: [
        {
          name: 'Azizullo Temirov',
          role: 'Product Manager',
          desc: 'Product strategy, UX thinking, financial behavior, business analysis',
          linkedin: 'https://www.linkedin.com/in/azizullo',
          github: 'https://github.com/azakapro',
        },
        {
          name: 'Khasan Rashidov',
          role: 'Senior Fullstack Engineer',
          desc: 'Python, Next.js, PostgreSQL, AI Integrations, .NET, Angular, Systems Design, Cloud Computing',
          linkedin: 'https://www.linkedin.com/in/khasanr',
          github: 'https://github.com/khasanrashidov',
        },
        {
          name: 'Khusan Rashidov',
          role: 'Senior Backend Engineer',
          desc: 'Python, ML/AI, .NET, Azure/AWS, PostgreSQL',
          linkedin: 'https://www.linkedin.com/in/xkhusan',
          github: 'https://github.com/xkhusan',
        },
        {
          name: 'Burxonjon Solihjonov',
          role: 'Senior Frontend Engineer',
          desc: 'Next.js, Vue.js, Angular, Nest.js UI/UX, Data Visualization',
          linkedin: 'https://www.linkedin.com/in/burkhonjon-solihjonov',
          github: 'https://github.com/black-belt-engineer',
        },
        {
          name: 'Bakhtiyorjon Bokhodirov',
          role: 'Lead AI Systems Engineer',
          desc: 'Python, LangChain, ML, AI analytics, AI Integrations',
          linkedin: 'https://www.linkedin.com/in/bakhtiyorjon-bokhodirov',
          github: 'https://github.com/Fasttyper',
        },
      ],
    },
    footer: {
      copyright: '© 2025 Moliyachi. Built for Agrobank AI500 Hackathon.',
      githubLink: 'Check our GitHub Repository',
    },
  },
  uz: {
    hero: {
      badge: 'Powered with Artificial Intelligence',
      title: 'Moliyachi',
      subtitle: 'Agrobank Mobile ichidagi AI asosidagi shaxsiy moliyaviy yordamchingiz',
      viewDemo: 'Demo ko‘rish',
      learnMore: 'Batafsil',
    },
    nav: {
      demo: 'Demo',
    },
    demo: {
      title: 'Demo Yozuvi',
      videoPlaceholder: "Video O'rni (1-5 daqiqa)",
      aboutTitle: 'Tavsif',
      whatIsTitle: 'Moliyachi nima?',
      whatIsDesc:
        'Agrobank Mobile ichida joylashgan AI asosidagi shaxsiy moliyaviy yordamchi. U bank ilovangizni aqlli moliyaviy hamrohga aylantiradi.',
      problemConnectionTitle: 'Biz hal qilayotgan muammo',
      problemConnectionDesc:
        "Ko'plab Agrobank mijozlari oylikdan oylikkacha yashaydi, oylik kelgandan keyin agressiv sarflanish, oy o'rtasida moliyaviy stress va xarajatlar bo'yicha tushunarli ko'rinishning yo'qligi bilan duch kelishadi. Hozirgi bank ilovalari faqat tranzaksiyalarni ko'rsatadi, lekin intellekt yo'q — foydalanuvchilarga balansni ko'rish emas, moliyaviy xatti-harakatlarini tushunish kerak.",
      solutionConnectionTitle: 'Bizning yechimimiz',
      solutionConnectionDesc:
        "Moliyachi Agrobank Mobile-ni tranzaksion vositadan moliyaviy hamkorga aylantiradi. AI yordamida biz xarajatlar tahlili, balans prognozlari bilan aqlli oylik rejalashtirish, Moliyaviy Sog'lik Balli (0-100), AI muddatlari bilan maqsad rejalashtirish va shaxsiylashtirilgan Agrobank mahsulotlari tavsiyalarini taqdim etamiz.",
      techStackTitle: 'Texnologiyalar',
      aiTechTitle: 'AI va Intellekt Qatlami',
      aiTechItems: [
        'LangChain — AI orkestratsiya freymvorki',
        'OpenAI GPT-5.1/4.1/4o — Katta Til Modellari',
        'RAG — Retrieval-Augmented Generation',
        'Machine Learning — Xulq-atvor modellash va bashoratlar',
        "Open-source LLM'lar — On-premise joylashtirish imkoniyati",
        'LangSmith — AI kuzatuv va monitoring',
      ],
      otherTechTitle: "To'liq Stack",
      currentStageTitle: 'Hozirgi Bosqich',
      currentStage: 'MVP',
      currentStageDesc: "Asosiy AI funksiyalari amalga oshirilgan to'liq ishlaydigan prototip",
      nextStepsTitle: 'Keyingi Qadamlar',
      nextSteps: [
        'Yakuniy UI/UX polishing',
        'Ishlash samaradorligini optimallashtirish',
        'Chekka holatlarni qayta ishlashni yaxshilash',
      ],
      hackathonSubmission: 'AI500 Xakaton Loyihasi',
      tryAppTitle: "Ilovani Sinab Ko'ring",
      tryAppSubtitle: "Interaktiv ko'rinish",
      openFullscreen: "To'liq ekran →",
      liveAccessTitle: 'Jonli Kirish',
      liveAccessDesc:
        "Ishlayotgan ilovani sinab ko'ring. Sinov uchun ro'yxatdan o'tish shart emas.",
      openLiveApp: 'Jonli Ilovani Ochish',
    },
    problemSolution: {
      problemTitle: 'Muammo',
      problemDesc:
        'Agrobank mijozlarining katta qismi qat’iy oylik tsiklida yashaydi va har oy stress hamda noaniqlikni boshdan kechiradi',
      problems: [
        'Oylikdan keyingi agressiv sarf-xarajatlar',
        'Oy o‘rtasida moliyaviy stress va noaniqlik',
        'Xarajatlar bo‘yicha tushunarli ko‘rinishning yo‘qligi',
        'Shaxsiylashtirilgan byudjet bo‘yicha ko‘rsatmalar yetishmasligi',
        'Hozirgi banking ilovalari faqat tranzaksiyalarni ko‘rsatadi, intellektni emas',
        'Foydalanuvchilarga balansni ko‘rish emas, moliyaviy xatti-harakatlarini tushunish mexanizmi kerak',
      ],
      solutionBadge: 'Yechim',
      meet: 'Tanishining',
      solutionTitle: 'Moliyachi',
      solutionDesc:
        'AgrobankMobile ichiga to‘liq integratsiya qilingan aqlli moliyaviy yordamchi, u ilovani tranzaksion vositadan moliyaviy hamkor darajasiga ko‘taradi',
      solutions: [
        {
          title: 'AI Spending Insights',
          desc: 'Pul qayerga ketayotganini qisqa va aniq izohlar bilan tushuntiradi',
        },
        {
          title: 'Smart Monthly Planning',
          desc: 'Juda tez sarflanish haqida ogohlantirish va balans prognozlari',
        },
        {
          title: 'Financial Health Score',
          desc: 'Barqarorlikni ifodalovchi bitta oddiy ko‘rsatkich (0–100)',
        },
        {
          title: 'Goal Planning',
          desc: 'AI maqsadlar muddatini hisoblab beradi va yaxshilash bo‘yicha tavsiyalar beradi',
        },
        {
          title: 'Personalized Recommendations',
          desc: 'Xarajatlar odatlari, daromad, maqsadlar va xulq-atvor asosida',
        },
        {
          title: 'Agrobank Product Matching',
          desc: 'AI Mikroqarzlar, Depozitlar, Jamg‘arma va Bo‘lib to‘lash mahsulotlarini tavsiya qiladi',
        },
        {
          title: "AI Do'kon",
          desc: "AI tavsiyalari bilan mukammal mahsulotni toping. Bo'lib to'lash variantlarini oling Agrobank Opencard orqali, narx taqqoslashlari va shaxsiy tavsiyalar.",
        },
      ],
    },
    whyUs: {
      title: 'Nega aynan biz?',
      subtitle:
        'Biz shunchaki funksiyalar yaratmayapmiz — Agrobank uchun moliyaviy intellekt qatlamini barpo qilmoqdamiz',
      reasons: [
        {
          title: 'Biz juda tez ishlaymiz',
          desc: 'Jamoamizning barcha a’zolari Lead va Senior darajadagi muhandislar bo‘lib, bir necha kun ichida MVP yaratish qobiliyatiga ega',
        },
        {
          title: 'Biz muammoni yaxshi bilamiz',
          desc: 'Jamoa a’zolarining ko‘pchiligi ham oylik tsikli bo‘yicha yashaydi va shu muammolarni shaxsan boshdan kechiradi',
        },
        {
          title: 'Kuchli texnik baza',
          desc: 'ML/AI, Backend, Fintech logikasi va zamonaviy UI/UX bo‘yicha to‘liq kompetensiyaga egamiz',
        },
      ],
    },
    roadmap: {
      badge: 'Roadmap',
      title: 'Rivojlanish rejasi',
      phases: [
        {
          date: '26-30 Noyabr',
          title: '1-Bosqich: Demo Veb-sayt',
          items: [
            'Landing veb-sayt',
            'Muammo va Yechim',
            'Arxitektura rejalashtirish',
            'Dastlabki AI tahlillari',
            'Hamma narsa noldan yozildi',
            'Demo MVP frontend ishlab chiqish boshlandi',
            'Hozirda UI shablon mavjud, ishlab chiqish davom etmoqda',
            'Asosiy CI/CD, muhit sozlash, bazaviy joylashtirish',
          ],
        },
        {
          date: '1–5 dekabr',
          title: 'Functional MVP Shell',
          items: [
            'Next.js frontend asoslari',
            'Vizual dashboard',
            'Mock profil sozlamalari',
            'Frontend–Backend pipeline',
          ],
        },
        {
          date: '5–10 dekabr',
          title: 'MVP asosiy funksionalligi',
          items: [
            'AI recommendation engine',
            'Goal calculator',
            'Financial Health Score',
            'Salary-cycle warning',
          ],
        },
        {
          date: '10–13 dekabr',
          title: 'Polish & Submission',
          items: [
            'Supabase integratsiyasi',
            'LangChain pipeline',
            'UI yakuniy polishing',
            'Deployment (Vercel/Render)',
          ],
        },
      ],
    },
    methodology: {
      title: 'Biz buni qanday hal qilamiz',
      subtitle: 'Biz Agrobank moliyaviy infratuzilmasi ustida ingichka, aqlli AI qatlamini quramiz',
      stepsTitle: 'Asosiy implementatsiya bosqichlari',
      techStackTitle: 'Tech Stack',
      steps: [
        {
          title: 'User Financial Profile Ingestion & Normalization',
          details: [
            'Strukturaviy ma’lumotlar yig‘ish: oylik, yosh, oila hajmi, kasb, moliyaviy maqsadlar, valyuta',
            'Statik ma’lumotlar chiqarish: daromad oqimlari, xarajatlar tarixi, takroriy to‘lovlar, kreditlar, aktivlar, majburiyatlar (NOTE: For hackathon purposes static mock data close to real life data is used)',
            'Ma’lumotlarni normalizatsiya qilish va himoyalangan DB’da saqlash (PII-safe)',
          ],
        },
        {
          title: 'Transaction Categorization & Behavioral Modeling',
          details: [
            'Gibrid dvijok: rule-based keyword detection yuqori aniqlik uchun',
            'AI classifier (GPT yoki finetuned model) noaniq tranzaksiyalar uchun',
            "Har oy bo'yicha kategoriya o'zgaruvchanligi kuzatuvi",
            'Xulq-atvor imzolari: xarajat tsikllari, oylik tsikli, hafta oxiri spike’lari, mavsumiylik',
            'Anomaliyalar aniqlash: keskin ortiqcha sarflanish, katta bir martalik xarajatlar, yangi takroriy to‘lovlar',
          ],
        },
        {
          title: 'Financial Analytics Dashboard',
          details: [
            'Next.js + Tailwind + charts (bar, pie, trend lines) yordamida yaratilgan',
            'Ko‘rsatadi: Kategoriya bo‘yicha taqsimot, oylik dinamika, zaruriy vs ixtiyoriy xarajatlar',
            'AI noodatiy trendlarni avtomatik ta’kidlaydi (masalan, "Dining Out +32% last month").',
          ],
        },
        {
          title: 'AI Insight Engine (Core Intelligence Layer)',
          details: [
            'GPT-5.1/4.1/4o + LangChain asosida ishlaydi',
            "Model-agnostik arxitektura: istalgan LLM provayderini qo'llab-quvvatlaydi",
            "To'liq ma'lumotlar maxfiyligi uchun on-premises ichki serverda ochiq kodli LLM yoki sozlangan modellardan foydalanish mumkin",
            "On-premises joylashtirish ishlatilganda foydalanuvchi ma'lumotlari tashqi servisga yuborilmaydi",
            'Yaratadi: Spending insights, trend sharhlari, 1–2 jumlalik amaliy micro-advice',
            'Predictive ogohlantirishlar (masalan, "Balans 9 kun ichida xavfsiz chegaradan pastga tushishi mumkin").',
            'Barqarorlik uchun yashirin ketma-ket fikrlash + deterministik cheklovlar',
          ],
        },
        {
          title: 'Salary-Cycle & Cashflow Predictor',
          details: [
            "Foydalanuvchi mablag'ining qachon tugashini prognoz qiladi: o'tmishdagi xarajat tezligi, yaqinlashib kelayotgan to'lovlar va kategoriya bo'yicha o'zgaruvchanlik asosida",
            '"Days until zero", AI kuchaytirilgan ishonch intervalini beradi.',
            'Tavsiya etilgan choralar (ixtiyoriy xarajatlarni X%ga qisqartirish → +5 kun zaxira)',
          ],
        },
        {
          title: 'Advanced Goal Timeline Calculator',
          details: [
            'Matematik hisoblashlar',
            "Haqiqiy jamg'arma = daromad – xarajatlar – bo'lib to'lash – soliqlar – o'zgaruvchanlik buferi",
            'Monte Carlo (2k–10k runs) orqali realistik ssenariylar',
            'Natija: aniq muddatlar, percentiles (10th/50th/90th), muvaffaqiyat ehtimoli',
          ],
        },
        {
          title: 'Financial Health Score (Composite Index)',
          details: [
            "Faktorlar: jamg'arma barqarorligi, daromad doimiyligi, xarajat o'zgaruvchanligi, qarz nisbati, favqulodda zaxira",
            'AI risk bahosi',
            'Har oy qayta hisoblanadi va tushunarli sharhlar beriladi (masalan, "Utilities bo\'yicha o\'zgaruvchanlik kamaygani uchun ball oshdi").',
          ],
        },
        {
          title: 'Agrobank Product Recommendation Engine',
          details: [
            'AI reasoning + moliyaviy qoida asosida foydalanuvchiga mos mahsulotlarni tanlaydi',
            'Ortiqcha mablag‘ uchun depozitlar, likvidlik xavfi bo‘lsa kreditlar',
            'Katta to‘lovlar uchun rassrochka, risk profiliga qarab investitsiya variantlari',
            'Shaxsiy izohlar (masalan, "Bu depozit maqsadga erishishni 2 oyga tezlashtiradi").',
          ],
        },
        {
          title: 'Predictive Scenario & Simulation Engine',
          details: [
            'Foydalanuvchi ssenariylarni sinab ko‘rishi mumkin: "Agar 10% ko‘proq jamg‘arsam?", "Inflyatsiya 7% bo‘lsa?", "5,000 kredit olsam?"',
            'Dvigatel yangi parametrlar asosida butun modelni tezkor Monte Carlo yordamida qayta hisoblaydi',
          ],
        },
        {
          title: 'Adaptive Learning & Continuous Model Updating',
          details: [
            "Oylik profil qayta kalibratsiyasi: Xarajat µ/σ yangilash, kategoriya og'irliklarini qayta o'rganish",
            'Risk ballini sozlash, inflyatsiya va daromad taxminlarini yangilash',
            "AI avtomatik ravishda bashoratlarni foydalanuvchi xatti-harakati o'zgarganda sozlaydi",
          ],
          futurePlan: true,
        },
      ],
      stack: [
        {
          category: 'Frontend',
          items: [
            'Next.js',
            'Tailwind CSS',
            'Recharts',
            'Lucide React',
            'TypeScript',
            'Mobile First',
          ],
        },
        {
          category: 'Backend',
          items: [
            'Python (Flask, SQLAlchemy)',
            'PostgreSQL',
            'REST API',
            'Mathematical computations',
          ],
        },
        {
          category: 'AI Layer',
          items: [
            'LangChain',
            'OpenAI GPT-5.1/4.1/4o',
            'Open-source LLM models for on-premise deployment',
            'Custom Rules and Instructions',
            'Machine Learning',
            'RAG',
          ],
        },
        {
          category: 'Hosting',
          items: [
            'Vercel (Frontend)',
            'Supabase (Infrastructure)',
            'Render (Backend)',
            'LangSmith (AI)',
          ],
        },
      ],
    },
    team: {
      title: 'Bizning Jamoa',
      subtitle:
        'Bir necha kun ichida MVP ni ishlab chiqarishga qodir Lead va Senior darajadagi muhandislar va menejerlar',
      teamLead: 'Team Lead',
      members: [
        {
          name: 'Azizullo Temirov',
          role: 'Product Manager',
          desc: 'Product strategy, UX thinking, financial behavior, business analysis',
          linkedin: 'https://www.linkedin.com/in/azizullo',
          github: 'https://github.com/azakapro',
        },
        {
          name: 'Khasan Rashidov',
          role: 'Senior Fullstack Engineer',
          desc: 'Python, Next.js, PostgreSQL, AI Integrations, .NET, Angular, Systems Design, Cloud Computing',
          linkedin: 'https://www.linkedin.com/in/khasanr',
          github: 'https://github.com/khasanrashidov',
        },
        {
          name: 'Khusan Rashidov',
          role: 'Senior Backend Engineer',
          desc: 'Python, ML/AI, .NET, Azure/AWS, PostgreSQL',
          linkedin: 'https://www.linkedin.com/in/xkhusan',
          github: 'https://github.com/xkhusan',
        },
        {
          name: 'Burxonjon Solihjonov',
          role: 'Senior Frontend Engineer',
          desc: 'Next.js, Vue.js, Angular, Nest.js UI/UX, Data Visualization',
          linkedin: 'https://www.linkedin.com/in/burkhonjon-solihjonov',
          github: 'https://github.com/black-belt-engineer',
        },
        {
          name: 'Bakhtiyorjon Bokhodirov',
          role: 'Lead AI Systems Engineer',
          desc: 'Python, LangChain, ML, AI analytics, AI Integrations',
          linkedin: 'https://www.linkedin.com/in/bakhtiyorjon-bokhodirov',
          github: 'https://github.com/Fasttyper',
        },
      ],
    },
    footer: {
      copyright: '© 2025 Moliyachi. Agrobank AI500 Hackathon uchun yaratilgan.',
      githubLink: "GitHub Repozitoriyamizni Ko'ring",
    },
  },
  ru: {
    hero: {
      badge: 'Powered with Artificial Intelligence',
      title: 'Moliyachi',
      subtitle: 'Ваш персональный финансовый ассистент на основе AI внутри Agrobank Mobile',
      viewDemo: 'Посмотреть демо',
      learnMore: 'Узнать больше',
    },
    nav: {
      demo: 'Демо',
    },
    demo: {
      title: 'Демо Запись',
      videoPlaceholder: 'Место для видео (1-5 мин)',
      aboutTitle: 'Описание',
      whatIsTitle: 'Что такое Moliyachi?',
      whatIsDesc:
        'Персональный финансовый помощник на базе ИИ внутри Agrobank Mobile. Он превращает ваше банковское приложение в умного финансового партнера.',
      problemConnectionTitle: 'Проблема, которую мы решаем',
      problemConnectionDesc:
        'Многие клиенты Agrobank живут от зарплаты до зарплаты, сталкиваясь с агрессивными тратами после получения зарплаты, финансовым стрессом в середине месяца и отсутствием прозрачности в расходах. Текущие банковские приложения показывают транзакции, но не дают интеллекта — пользователям нужно понимать своё финансовое поведение, а не просто видеть баланс.',
      solutionConnectionTitle: 'Наше решение',
      solutionConnectionDesc:
        'Moliyachi превращает Agrobank Mobile из инструмента транзакций в финансового партнёра. С помощью ИИ мы предоставляем анализ расходов, умное месячное планирование с прогнозами баланса, Оценку Финансового Здоровья (0-100), планирование целей с ИИ-сроками и персонализированные рекомендации продуктов Agrobank.',
      techStackTitle: 'Стек Технологий',
      aiTechTitle: 'ИИ и Интеллектуальный Слой',
      aiTechItems: [
        'LangChain — фреймворк оркестрации ИИ',
        'OpenAI GPT-5.1/4.1/4o — Большие Языковые Модели',
        'RAG — Retrieval-Augmented Generation',
        'Machine Learning — Поведенческое моделирование и прогнозы',
        'Open-source LLM — Вариант on-premise развёртывания',
        'LangSmith — Наблюдаемость и мониторинг ИИ',
      ],
      otherTechTitle: 'Полный Стек',
      currentStageTitle: 'Текущая Стадия',
      currentStage: 'MVP',
      currentStageDesc: 'Полностью функциональный прототип с реализованными основными ИИ-функциями',
      nextStepsTitle: 'Следующие Шаги',
      nextSteps: [
        'Финальная полировка UI/UX',
        'Оптимизация производительности',
        'Улучшение обработки краевых случаев',
      ],
      hackathonSubmission: 'Проект AI500 Хакатон',
      tryAppTitle: 'Попробовать Приложение',
      tryAppSubtitle: 'Интерактивный предпросмотр',
      openFullscreen: 'Открыть на весь экран →',
      liveAccessTitle: 'Живой Доступ',
      liveAccessDesc: 'Попробуйте рабочее приложение. Авторизация для тестирования не требуется.',
      openLiveApp: 'Открыть Приложение',
    },
    problemSolution: {
      problemTitle: 'Проблема',
      problemDesc:
        'Значительная часть клиентов Agrobank живёт от зарплаты до зарплаты, испытывая стресс и неопределённость каждый месяц',
      problems: [
        'Агрессивные траты сразу после получения зарплаты',
        'Финансовый стресс и неопределённость в середине месяца',
        'Отсутствие прозрачности в поведении расходов',
        'Недостаток персонализированных рекомендаций по бюджету',
        'Текущие банковские приложения дают транзакции, а не интеллект',
        'Пользователям нужен способ понимать своё финансовое поведение — не просто видеть баланс',
      ],
      solutionBadge: 'Решение',
      meet: 'Представляем',
      solutionTitle: 'Moliyachi',
      solutionDesc:
        'Умный финансовый ассистент, встроенный в AgrobankMobile, который превращает его из транзакционного инструмента в финансового партнёра',
      solutions: [
        {
          title: 'AI Spending Insights',
          desc: 'Короткие и практичные объяснения того, куда уходят ваши деньги',
        },
        {
          title: 'Smart Monthly Planning',
          desc: 'Предупреждения при слишком быстрых тратах и прогнозы баланса',
        },
        {
          title: 'Financial Health Score',
          desc: 'Один простой показатель (0–100), отражающий вашу финансовую стабильность',
        },
        {
          title: 'Goal Planning',
          desc: 'AI рассчитывает сроки достижения целей и предлагает улучшения',
        },
        {
          title: 'Personalized Recommendations',
          desc: 'На основе ваших привычек, доходов, расходов и целей',
        },
        {
          title: 'Agrobank Product Matching',
          desc: 'AI подбирает Микрозаймы, Депозиты, Накопления и Рассрочки',
        },
        {
          title: 'AI Магазин',
          desc: 'Найдите идеальный товар с AI-рекомендациями. Получите варианты рассрочки через Opencard от Agrobank, сравнение цен и персональные советы.',
        },
      ],
    },
    whyUs: {
      title: 'Почему именно мы?',
      subtitle:
        'Мы создаём не просто функции — мы создаём интеллектуальный финансовый слой для Agrobank',
      reasons: [
        {
          title: 'Мы работаем невероятно быстро',
          desc: 'Все участники — инженеры уровня Lead и Senior, способные собрать MVP за несколько дней',
        },
        {
          title: 'Мы понимаем проблему',
          desc: 'Большинство из нас также живут на зарплатном цикле и лично испытывают эти трудности',
        },
        {
          title: 'Сильная техническая база',
          desc: 'Мы покрываем ML/AI, Backend, финтех-логику и современный UI/UX',
        },
      ],
    },
    roadmap: {
      badge: 'Roadmap',
      title: 'План разработки',
      phases: [
        {
          date: '26-30 Ноября',
          title: 'Этап 1: Демо Сайт',
          items: [
            'Лендинг сайт',
            'Проблема и Решение',
            'Планирование архитектуры',
            'Начальные AI инсайты',
            'Всё написано с нуля',
            'Начата фронтенд-разработка демо MVP',
            'Сейчас есть UI шаблон, разработка продолжается',
            'Базовый CI/CD, настройка окружений, начальные деплойменты',
          ],
        },
        {
          date: '1–5 декабря',
          title: 'Functional MVP Shell',
          items: [
            'База Next.js frontend',
            'Визуальный дашборд',
            'Mock-профиль',
            'Frontend–Backend pipeline',
          ],
        },
        {
          date: '5–10 декабря',
          title: 'Основной функционал MVP',
          items: [
            'AI recommendation engine',
            'Goal calculator',
            'Financial Health Score',
            'Salary-cycle warning',
          ],
        },
        {
          date: '10–13 декабря',
          title: 'Полировка и подача',
          items: [
            'Supabase интеграция',
            'LangChain pipeline',
            'Финальная UI-полировка',
            'Деплой (Vercel/Render)',
          ],
        },
      ],
    },
    methodology: {
      title: 'Как мы планируем решить задачу',
      subtitle:
        'Мы строим тонкий интеллектуальный AI-слой поверх финансовой инфраструктуры Agrobank',
      stepsTitle: 'Ключевые этапы реализации',
      techStackTitle: 'Tech Stack',
      steps: [
        {
          title: 'User Financial Profile Ingestion & Normalization',
          details: [
            'Сбор структурированных данных: зарплата, возраст, семья, профессия, финансовые цели, валюта',
            'Извлечение статических данных: источники доходов, история расходов, регулярные платежи, кредиты, активы, обязательства (NOTE: For hackathon purposes static mock data close to real life data is used)',
            'Нормализация и хранение в защищённой БД (PII-safe)',
          ],
        },
        {
          title: 'Transaction Categorization & Behavioral Modeling',
          details: [
            'Гибридный движок: rule-based keywords для точной категоризации',
            'AI classifier (GPT или fine-tuned модель) для неоднозначных транзакций',
            'Отслеживание месячной волатильности по категориям',
            'Построение поведенческих моделей: циклы расходов, зарплатный цикл, всплески в выходные, сезонность',
            'Выявление аномалий: резкие перерасходы, крупные разовые траты, новые регулярные списания',
          ],
        },
        {
          title: 'Financial Analytics Dashboard',
          details: [
            'Построен на Next.js + Tailwind + charts (bar, pie, trend lines)',
            'Показывает: Распределение по категориям, сравнение по месяцам, базовые vs необязательные расходы',
            'AI автоматически выделяет необычные тренды (например, "Dining Out +32% vs last month").',
          ],
        },
        {
          title: 'AI Insight Engine (Core Intelligence Layer)',
          details: [
            'Работает на GPT-5.1/4.1/4o + LangChain',
            'Модель-агностичная архитектура: поддерживает любого LLM-провайдера',
            'Можно использовать открытые LLM или fine-tuned модели на локальном сервере для полной конфиденциальности данных',
            'Нулевая передача пользовательских данных внешним сервисам при on-premises развертывании',
            'Формирует: Spending insights, объяснения трендов, микро-советы (1–2 коротких и практичных рекомендации)',
            'Предиктивные предупреждения (например, "Баланс может опуститься ниже безопасного уровня через 9 дней").',
            'Использует скрытое цепочное рассуждение + детерминированные ограничители для стабильности',
          ],
        },
        {
          title: 'Salary-Cycle & Cashflow Predictor',
          details: [
            'Прогнозирует, когда пользователь останется без денег, используя: скорость трат, предстоящие платежи, волатильность по категориям',
            'Формирует: "Дней до нуля", доверительный интервал (улучшенный AI).',
            'Рекомендации (например: сократить X% необязательных расходов → +5 дней запаса)',
          ],
        },
        {
          title: 'Advanced Goal Timeline Calculator',
          details: [
            'Математические вычисления',
            'Реальные накопления = доход – расходы – рассрочки – налоги – волатильность',
            'Monte Carlo симуляция (2k–10k прогонов) для реалистичных сценариев',
            'Выдаёт: детерминированные сроки, перцентили (10/50/90), вероятность успеха',
          ],
        },
        {
          title: 'Financial Health Score (Composite Index)',
          details: [
            'Факторы: стабильность накоплений, постоянство доходов, волатильность расходов, долговая нагрузка, резерв безопасности',
            'AI-оценка рисков',
            'Счёт пересчитывается ежемесячно с понятными объяснениями (например, "Ваш показатель улучшился благодаря снижению волатильности в Utilities").',
          ],
        },
        {
          title: 'Agrobank Product Recommendation Engine',
          details: [
            'Использует AI reasoning + финансовые правила для подбора продуктов',
            'Депозиты при избытке средств, кредиты при риске нехватки ликвидности',
            'Рассрочки для крупных будущих платежей, инвестиции в зависимости от вашего риска',
            'Персональные объяснения (например, "Этот депозит ускорит достижение цели на 2 месяца благодаря большей доходности").',
          ],
        },
        {
          title: 'Predictive Scenario & Simulation Engine',
          details: [
            'Пользователь может тестировать сценарии: "А если я увеличу сбережения на 10%?", "Если инфляция вырастет до 7%?", "Если взять кредит 5,000?"',
            'Движок пересчитывает всю модель с новыми параметрами с помощью быстрой Monte Carlo',
          ],
        },
        {
          title: 'Adaptive Learning & Continuous Model Updating',
          details: [
            'Ежемесячная перекалибровка профиля: обновление расходов µ/σ, переобучение весов категорий',
            'Корректировка балла риска, обновление предположений по инфляции и доходности',
            'AI автоматически корректирует прогнозы по мере изменения поведения пользователя',
          ],
          futurePlan: true,
        },
      ],
      stack: [
        {
          category: 'Frontend',
          items: [
            'Next.js',
            'Tailwind CSS',
            'Recharts',
            'Lucide React',
            'TypeScript',
            'Mobile First',
          ],
        },
        {
          category: 'Backend',
          items: [
            'Python (Flask, SQLAlchemy)',
            'PostgreSQL',
            'REST API',
            'Mathematical computations',
          ],
        },
        {
          category: 'AI Layer',
          items: [
            'LangChain',
            'OpenAI GPT-5.1/4.1/4o',
            'Open-source LLM models for on-premise deployment',
            'Custom Rules and Instructions',
            'Machine Learning',
            'RAG',
          ],
        },
        {
          category: 'Hosting',
          items: [
            'Vercel (Frontend)',
            'Supabase (Infrastructure)',
            'Render (Backend)',
            'LangSmith (AI)',
          ],
        },
      ],
    },
    team: {
      title: 'Наша Команда',
      subtitle:
        'Инженеры и менеджеры уровня Lead и Senior, способные выпустить MVP за несколько дней',
      teamLead: 'Team Lead',
      members: [
        {
          name: 'Azizullo Temirov',
          role: 'Product Manager',
          desc: 'Product strategy, UX thinking, financial behavior, business analysis',
          linkedin: 'https://www.linkedin.com/in/azizullo',
          github: 'https://github.com/azakapro',
        },
        {
          name: 'Khasan Rashidov',
          role: 'Senior Fullstack Engineer',
          desc: 'Python, Next.js, PostgreSQL, AI Integrations, .NET, Angular, Systems Design, Cloud Computing',
          linkedin: 'https://www.linkedin.com/in/khasanr',
          github: 'https://github.com/khasanrashidov',
        },
        {
          name: 'Khusan Rashidov',
          role: 'Senior Backend Engineer',
          desc: 'Python, ML/AI, .NET, Azure/AWS, PostgreSQL',
          linkedin: 'https://www.linkedin.com/in/xkhusan',
          github: 'https://github.com/xkhusan',
        },
        {
          name: 'Burxonjon Solihjonov',
          role: 'Senior Frontend Engineer',
          desc: 'Next.js, Vue.js, Angular, Nest.js UI/UX, Data Visualization',
          linkedin: 'https://www.linkedin.com/in/burkhonjon-solihjonov',
          github: 'https://github.com/black-belt-engineer',
        },
        {
          name: 'Bakhtiyorjon Bokhodirov',
          role: 'Lead AI Systems Engineer',
          desc: 'Python, LangChain, ML, AI analytics, AI Integrations',
          linkedin: 'https://www.linkedin.com/in/bakhtiyorjon-bokhodirov',
          github: 'https://github.com/Fasttyper',
        },
      ],
    },
    footer: {
      copyright: '© 2025 Moliyachi. Создано для Agrobank AI500 Hackathon.',
      githubLink: 'Посмотреть наш GitHub Репозиторий',
    },
  },
};
