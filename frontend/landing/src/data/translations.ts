export type Language = 'en' | 'uz' | 'ru';

export interface Translations {
    hero: {
        badge: string;
        title: string;
        subtitle: string;
        viewDemo: string;
        learnMore: string;
        demoTooltip: string;
    };
    problemSolution: {
        problemTitle: string;
        problemDesc: string;
        problems: string[];
        solutionBadge: string;
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
            subtitle: 'Your AI-powered personal finance assistant inside Agrobank Mobile.',
            viewDemo: 'View Demo',
            learnMore: 'Learn More',
            demoTooltip: 'Development in progress',
        },
        problemSolution: {
            problemTitle: 'The Problem',
            problemDesc: "A significant number of Agrobank's customers live on a strict salary cycle, facing stress and uncertainty every month.",
            problems: [
                'Aggressive spending after salary arrival',
                'Mid-month financial stress & uncertainty',
                'No visibility into spending behavior',
                'Lack of personalized budgeting guidance',
                'Current banking apps provide transactions, not intelligence',
                'Users need a way to understand their financial behavior—not just view their balance',
            ],
            solutionBadge: 'The Solution',
            solutionTitle: 'Moliyachi',
            solutionDesc: 'A smart financial assistant fully embedded into AgrobankMobile that transforms it from a transaction tool into a financial partner.',
            solutions: [
                {
                    title: 'AI Spending Insights',
                    desc: 'Short, actionable explanations of where your money goes.',
                },
                {
                    title: 'Smart Monthly Planning',
                    desc: 'Warnings when spending is too fast & balance predictions.',
                },
                {
                    title: 'Financial Health Score',
                    desc: 'One simple score (0–100) explaining your stability.',
                },
                {
                    title: 'Goal Planning',
                    desc: 'AI calculates timelines and suggests improvements.',
                },
                {
                    title: 'Personalized Recommendations',
                    desc: 'Based on spending patterns, habits, income, and goals.',
                },
                {
                    title: 'Agrobank Product Matching',
                    desc: 'AI suggests Microloans, Deposits, Savings, and Installment options.',
                },
            ],
        },
        whyUs: {
            title: 'Why Our Team?',
            subtitle: 'We are not just building features — we are building a financial intelligence layer for Agrobank.',
            reasons: [
                {
                    title: 'We move extremely fast',
                    desc: 'All members are Lead and Senior level engineers capable of shipping an MVP within days.',
                },
                {
                    title: 'We know the problem',
                    desc: 'Most of us live on a salary cycle and personally experience the challenges we are solving.',
                },
                {
                    title: 'Strong technical background',
                    desc: 'We cover ML/AI, Backend, Fintech logic, and Modern UI/UX.',
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
                    items: ['Landing website', 'Problem & Solution', 'Architecture planning', 'Initial AI insights'],
                },
                {
                    date: 'Dec 1 – Dec 5',
                    title: 'Functional MVP Shell',
                    items: ['Next.js frontend base', 'Visual dashboard layout', 'Mock profile setup', 'Frontend-Backend pipeline'],
                },
                {
                    date: 'Dec 5 – Dec 10',
                    title: 'Core MVP Functionality',
                    items: ['AI recommendation engine', 'Goal calculator', 'Financial Health Score', 'Salary-cycle warning'],
                },
                {
                    date: 'Dec 10 – Dec 13',
                    title: 'Polish & Submission',
                    items: ['Supabase integration', 'LangChain pipeline', 'Final UI polishing', 'Deployment (Vercel/Render)'],
                },
            ],
        },
        methodology: {
            title: 'How We Plan to Solve It',
            subtitle: 'We build a thin, intelligent AI layer on top of Agrobank\'s financial infrastructure.',
            stepsTitle: 'Key Implementation Steps',
            techStackTitle: 'Tech Stack',
            steps: [
                {
                    title: 'User Financial Profile Ingestion & Normalization',
                    details: [
                        'Collect structured data: salary, age, family size, occupation, financial goals, currency preferences.',
                        'Extract dynamic data: income streams, spending history, recurring payments, loans, assets, liabilities.',
                        'Normalize & store in secure DB (PII-safe).',
                        'Build continuous profile updates using transaction streams + AI-based document parsing (e.g., salary slips).',
                    ],
                },
                {
                    title: 'Transaction Categorization & Behavioral Modeling',
                    details: [
                        'Hybrid engine: Rule-based keyword detection for high-precision categories.',
                        'AI classifier (GPT or finetuned model) for ambiguous transactions.',
                        'Track monthly volatility per category (µ, σ).',
                        'Build behavioral signatures: spending cycles, salary cycles, weekend spikes, seasonality.',
                        'Detect anomalies: sudden overspending, large one-offs, emerging recurring charges.',
                    ],
                },
                {
                    title: 'Financial Analytics Dashboard',
                    details: [
                        'Built with Next.js + Tailwind + charts (bar, pie, trend lines).',
                        'Shows: Category breakdown, Month-over-month trends, Essential vs discretionary spend.',
                        'Income stability index & Cashflow heatmap.',
                        'AI auto-highlights unusual trends (e.g., "Dining Out +32% vs last month").',
                    ],
                },
                {
                    title: 'AI Insight Engine (Core Intelligence Layer)',
                    details: [
                        'Powered by GPT-5/4.1/4o + LangChain.',
                        'Generates: Spending insights, Trend explanations, Micro-advice (short, actionable 1–2 sentence tips).',
                        'Predictive alerts (e.g., "Balance may fall below safe threshold in 9 days").',
                        'Uses chain-of-thought hidden reasoning + deterministic guardrails for consistency.',
                    ],
                },
                {
                    title: 'Salary-Cycle & Cashflow Predictor',
                    details: [
                        'Predicts when user will run out of money using: Historical spending velocity, Upcoming bills, Category-level volatility.',
                        'Produces: "Days until zero", Confidence interval (AI-enhanced).',
                        'Recommended interventions (cut X% in discretionary → +5 days buffer).',
                    ],
                },
                {
                    title: 'Advanced Goal Timeline Calculator',
                    details: [
                        'Replaces the old formula with full financial modeling.',
                        'Real contributions = income – spending – installments – taxes – volatility buffer.',
                        'Monte Carlo simulation (2k–10k runs) for realistic scenarios.',
                        'Outputs: Deterministic months to target, Monte Carlo percentiles (10th, 50th, 90th), Success probability.',
                    ],
                },
                {
                    title: 'Financial Health Score (Composite Index)',
                    details: [
                        'Factors: Savings rate stability, Income consistency, Spending volatility, Debt ratio, Emergency buffer coverage.',
                        'AI-derived risk assessment.',
                        'Score recalculated monthly with clear breakdowns ("Your score improved due to reduced volatility in Utilities spending").',
                    ],
                },
                {
                    title: 'Agrobank Product Recommendation Engine',
                    details: [
                        'Uses AI reasoning + financial rules to match user to products.',
                        'Deposits for surplus cash, Loans when liquidity risk detected.',
                        'Installments for large upcoming payments, Investment products depending on risk score.',
                        'Personalized explanations ("This deposit helps your goal reach 2 months earlier due to higher effective return").',
                    ],
                },
                {
                    title: 'Predictive Scenario & Simulation Engine',
                    details: [
                        'User can test scenarios: "What if I increase savings by 10%?", "What if inflation rises to 7%?", "What if I take a 5,000 loan?".',
                        'The engine recalculates the entire projection with new inputs using fast Monte Carlo.',
                    ],
                },
                {
                    title: 'Adaptive Learning & Continuous Model Updating',
                    details: [
                        'Monthly profile recalibration: Update spending µ/σ, Relearn category weights.',
                        'Adjust risk score, Update inflation & return assumptions.',
                        'AI automatically adjusts predictions as user behavior changes.',
                    ],
                },
            ],
            stack: [
                {
                    category: 'Frontend',
                    items: ['Next.js', 'Tailwind CSS', 'Recharts', 'Lucide React', 'TypeScript', 'Mobile First'],
                },
                {
                    category: 'Backend',
                    items: ['Python (Flask, SQLAlchemy)', 'PostgreSQL', 'REST API', 'Mathematical computations'],
                },
                {
                    category: 'AI Layer',
                    items: ['LangChain', 'OpenAI GPT-5.1/4.1/4o', 'Custom Rules and Instructions', 'Machine Learning'],
                },
                {
                    category: 'Hosting',
                    items: ['Vercel (Frontend)', 'Supabase (Infrastructure)', 'Render (Backend)', 'LangSmith (AI)'],
                },
            ],
        },
        team: {
            title: 'Our Team',
            subtitle: 'Lead and Senior level engineers and managers capable of shipping an MVP within days.',
            teamLead: 'Team Lead',
            members: [
                {
                    name: 'Azizullo Temirov',
                    role: 'Product Manager',
                    desc: 'Product strategy, UX thinking, financial behavior, business analysis',
                },
                {
                    name: 'Khasan Rashidov',
                    role: 'Senior Fullstack Engineer',
                    desc: 'Python, Next.js, PostgreSQL, AI Integrations, .NET, Angular, Systems Design, Cloud Computing',
                },
                {
                    name: 'Khusan Rashidov',
                    role: 'Senior Backend Engineer',
                    desc: 'Python, ML/AI, .NET, Azure/AWS, PostgreSQL',
                },
                {
                    name: 'Burxonjon Solihjonov',
                    role: 'Senior Frontend Engineer',
                    desc: 'Next.js, Vue.js, UI/UX, Data Visualization',
                },
                {
                    name: 'Bakhtiyorjon Bokhodirov',
                    role: 'Lead AI Systems Engineer',
                    desc: 'Python, LangChain, ML, AI analytics, AI Integrations',
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
            badge: 'Sun\'iy Intellekt Bilan Quvvatlantirilgan',
            title: 'Moliyachi',
            subtitle: 'Agrobank Mobile ilovasidagi sun\'iy intellekt asosidagi shaxsiy moliyaviy yordamchingiz.',
            viewDemo: 'Demoni Ko\'rish',
            learnMore: 'Batafsil',
            demoTooltip: 'Ishlab chiqilmoqda',
        },
        problemSolution: {
            problemTitle: 'Muammo',
            problemDesc: 'Agrobank mijozlarining katta qismi qat\'iy oylik maosh tsiklida yashaydi va har oy stress va noaniqlikka duch keladi.',
            problems: [
                'Maosh kelganidan keyin agressiv xarajatlar',
                'Oy o\'rtasida moliyaviy stress va noaniqlik',
                'Xarajatlar xatti-harakatlarini ko\'rish imkoni yo\'q',
                'Shaxsiylashtirilgan byudjet bo\'yicha yo\'l-yo\'riq yo\'qligi',
                'Hozirgi bank ilovalari tranzaksiyalarni taqdim etadi, intellektni emas',
                'Foydalanuvchilar moliyaviy xatti-harakatlarini tushunish usulini talab qiladi — faqat balansni ko\'rish emas',
            ],
            solutionBadge: 'Yechim',
            solutionTitle: 'Moliyachi',
            solutionDesc: 'AgrobankMobile ilovasiga to\'liq integratsiyalashgan aqlli moliyaviy yordamchi, uni tranzaksiya vositasidan moliyaviy hamkorga aylantiradi.',
            solutions: [
                {
                    title: 'AI Xarajat Tahlili',
                    desc: 'Pulingiz qayerga ketayotgani haqida qisqa, amaliy tushuntirishlar.',
                },
                {
                    title: 'Aqlli Oylik Rejalashtirish',
                    desc: 'Xarajatlar juda tez bo\'lganda ogohlantirishlar va balans prognozlari.',
                },
                {
                    title: 'Moliyaviy Salomatlik Balli',
                    desc: 'Barqarorligingizni tushuntiradigan bitta oddiy ball (0–100).',
                },
                {
                    title: 'Maqsad Rejalashtirish',
                    desc: 'AI vaqt jadvallarini hisoblaydi va yaxshilashlarni taklif qiladi.',
                },
                {
                    title: 'Shaxsiylashtirilgan Tavsiyalar',
                    desc: 'Xarajat naqshlari, odatlar, daromad va maqsadlarga asoslangan.',
                },
                {
                    title: 'Agrobank Mahsulotlari Moslashtirish',
                    desc: 'AI Mikrokreditlar, Depozitlar, Jamg\'armalar va To\'lov rejalarini taklif qiladi.',
                },
            ],
        },
        whyUs: {
            title: 'Nega Bizning Jamoa?',
            subtitle: 'Biz shunchaki funksiyalar yaratmayapmiz — biz Agrobank uchun moliyaviy intellekt qatlamini yaratyapmiz.',
            reasons: [
                {
                    title: 'Biz juda tez harakatlanamiz',
                    desc: 'Barcha a\'zolar bir necha kun ichida MVP ni ishlab chiqarishga qodir Lead va Senior darajadagi muhandislar.',
                },
                {
                    title: 'Biz muammoni bilamiz',
                    desc: 'Ko\'pchiligimiz oylik maosh tsiklida yashaymiz va hal qilayotgan muammolarni shaxsan boshdan kechiramiz.',
                },
                {
                    title: 'Kuchli texnik bilim',
                    desc: 'Biz ML/AI, Backend, Fintech mantiq va Zamonaviy UI/UX ni qamrab olamiz.',
                },
            ],
        },
        roadmap: {
            badge: 'Yo\'l Xaritasi',
            title: 'Rivojlanish Rejasi',
            phases: [
                {
                    date: '26-30 Noyabr',
                    title: '1-Bosqich: Demo Veb-sayt',
                    items: ['Landing veb-sayt', 'Muammo va Yechim', 'Arxitektura rejalashtirish', 'Dastlabki AI tahlillari'],
                },
                {
                    date: '1-5 Dekabr',
                    title: 'Funktsional MVP Asosi',
                    items: ['Next.js frontend asosi', 'Vizual dashboard joylashuvi', 'Mock profil sozlash', 'Frontend-Backend quvuri'],
                },
                {
                    date: '5-10 Dekabr',
                    title: 'Asosiy MVP Funksiyalari',
                    items: ['AI tavsiya mexanizmi', 'Maqsad kalkulyatori', 'Moliyaviy Salomatlik Balli', 'Maosh tsikli ogohlantirishi'],
                },
                {
                    date: '10-13 Dekabr',
                    title: 'Jilolash va Topshirish',
                    items: ['Supabase integratsiyasi', 'LangChain quvuri', 'Yakuniy UI jilolash', 'Joylashtirish (Vercel/Render)'],
                },
            ],
        },
        methodology: {
            title: 'Biz Buni Qanday Hal Qilamiz',
            subtitle: 'Biz Agrobank moliyaviy infratuzilmasi ustiga yupqa, aqlli AI qatlamini quramiz.',
            stepsTitle: 'Asosiy Amalga Oshirish Bosqichlari',
            techStackTitle: 'Texnologiya To\'plami',
            steps: [
                {
                    title: 'Foydalanuvchi Moliyaviy Profili Kiritish va Normalizatsiya',
                    details: [
                        'Tuzilgan ma\'lumotlarni to\'plash: maosh, yosh, oila hajmi, kasb, moliyaviy maqsadlar, valyuta afzalliklari.',
                        'Dinamik ma\'lumotlarni chiqarish: daromad oqimlari, xarajatlar tarixi, takroriy to\'lovlar, kreditlar, aktivlar, majburiyatlar.',
                        'Xavfsiz DB da normalizatsiya va saqlash (PII-xavfsiz).',
                        'Tranzaksiya oqimlari + AI asosidagi hujjat tahlili yordamida doimiy profil yangilanishlarini yaratish.',
                    ],
                },
                {
                    title: 'Tranzaksiya Kategoriyalash va Xulq-atvor Modellashtirish',
                    details: [
                        'Gibrid mexanizm: Yuqori aniqlikdagi kategoriyalar uchun qoidaga asoslangan kalit so\'z aniqlash.',
                        'Noaniq tranzaksiyalar uchun AI klassifikatori (GPT yoki sozlangan model).',
                        'Har bir kategoriya bo\'yicha oylik o\'zgaruvchanlikni kuzatish (µ, σ).',
                        'Xulq-atvor imzolarini yaratish: xarajat tsikllari, maosh tsikllari, dam olish kunlari ko\'tarilishlari, mavsumiylik.',
                        'Anomaliyalarni aniqlash: to\'satdan ortiqcha xarajatlar, katta bir martalik to\'lovlar, paydo bo\'layotgan takroriy to\'lovlar.',
                    ],
                },
                {
                    title: 'Moliyaviy Tahlil Paneli',
                    details: [
                        'Next.js + Tailwind + diagrammalar (bar, doira, trend chiziqlari) bilan qurilgan.',
                        'Ko\'rsatadi: Kategoriya bo\'yicha taqsimot, Oyma-oy tendentsiyalar, Muhim va ixtiyoriy xarajatlar.',
                        'Daromad barqarorligi indeksi va Pul oqimi issiqlik xaritasi.',
                        'AI g\'ayritabiiy tendentsiyalarni avtomatik ta\'kidlaydi (masalan, "Ovqatlanish +32% o\'tgan oyga nisbatan").',
                    ],
                },
                {
                    title: 'AI Tushuncha Mexanizmi (Asosiy Intellekt Qatlami)',
                    details: [
                        'GPT-5/4.1/4o + LangChain tomonidan quvvatlantirilgan.',
                        'Yaratadi: Xarajat tushunchalari, Trend tushuntirishlari, Mikro-maslahatlar (qisqa, amaliy 1-2 jumlali maslahatlar).',
                        'Bashoratli ogohlantirishlar (masalan, "Balans 9 kun ichida xavfsiz chegaradan pastga tushishi mumkin").',
                        'Izchillik uchun zanjir-fikrlash yashirin mantiq + deterministik himoya choralaridan foydalanadi.',
                    ],
                },
                {
                    title: 'Maosh Tsikli va Pul Oqimi Prognozchisi',
                    details: [
                        'Foydalanuvchi qachon puldan qolishini bashorat qiladi: Tarixiy xarajat tezligi, Kelayotgan to\'lovlar, Kategoriya darajasidagi o\'zgaruvchanlik.',
                        'Ishlab chiqaradi: "Nolga qadar kunlar", Ishonch oralig\'i (AI bilan kuchaytirilgan).',
                        'Tavsiya etilgan aralashuvlar (ixtiyoriy xarajatlarda X% qisqartirish → +5 kun zaxira).',
                    ],
                },
                {
                    title: 'Ilg\'or Maqsad Vaqt Jadvali Kalkulyatori',
                    details: [
                        'Eski formulani to\'liq moliyaviy modellashtirish bilan almashtiradi.',
                        'Haqiqiy hissalar = daromad – xarajatlar – to\'lovlar – soliqlar – o\'zgaruvchanlik zaxirasi.',
                        'Realistik stsenariylar uchun Monte Karlo simulyatsiyasi (2k–10k ishga tushirish).',
                        'Chiqishlar: Maqsadga deterministik oylar, Monte Karlo foizlari (10-chi, 50-chi, 90-chi), Muvaffaqiyat ehtimoli.',
                    ],
                },
                {
                    title: 'Moliyaviy Salomatlik Balli (Kompozit Indeks)',
                    details: [
                        'Omillar: Jamg\'arma stavkasi barqarorligi, Daromad izchilligi, Xarajat o\'zgaruvchanligi, Qarz nisbati, Favqulodda zaxira qamrovi.',
                        'AI tomonidan olingan xavf baholash.',
                        'Ball har oy aniq taqsimotlar bilan qayta hisoblanadi ("Sizning ballingiz Kommunal xizmatlar xarajatlaridagi o\'zgaruvchanlikning kamayishi tufayli yaxshilandi").',
                    ],
                },
                {
                    title: 'Agrobank Mahsulot Tavsiya Mexanizmi',
                    details: [
                        'Foydalanuvchini mahsulotlarga moslashtirish uchun AI mantiq + moliyaviy qoidalardan foydalanadi.',
                        'Ortiqcha naqd pul uchun depozitlar, Likvidlik xavfi aniqlanganda kreditlar.',
                        'Katta kelayotgan to\'lovlar uchun to\'lov rejalari, Xavf balliga qarab investitsiya mahsulotlari.',
                        'Shaxsiylashtirilgan tushuntirishlar ("Bu depozit sizning maqsadingizga yuqori samarali daromad tufayli 2 oy oldinroq erishishga yordam beradi").',
                    ],
                },
                {
                    title: 'Bashoratli Stsenariy va Simulyatsiya Mexanizmi',
                    details: [
                        'Foydalanuvchi stsenariylarni sinab ko\'rishi mumkin: "Jamg\'armani 10% ga oshirsam nima bo\'ladi?", "Inflyatsiya 7% ga ko\'tarilsa nima bo\'ladi?", "5,000 kredit olsam nima bo\'ladi?".',
                        'Mexanizm tez Monte Karlo yordamida yangi kirishlar bilan butun prognozni qayta hisoblaydi.',
                    ],
                },
                {
                    title: 'Moslashuvchan O\'rganish va Doimiy Model Yangilash',
                    details: [
                        'Oylik profil qayta kalibrlash: Xarajat µ/σ ni yangilash, Kategoriya og\'irliklarini qayta o\'rganish.',
                        'Xavf ballini sozlash, Inflyatsiya va daromad taxminlarini yangilash.',
                        'AI foydalanuvchi xatti-harakati o\'zgarganda prognozlarni avtomatik ravishda sozlaydi.',
                    ],
                },
            ],
            stack: [
                {
                    category: 'Frontend',
                    items: ['Next.js', 'Tailwind CSS', 'Recharts', 'Lucide React', 'TypeScript', 'Mobile First'],
                },
                {
                    category: 'Backend',
                    items: ['Python (Flask, SQLAlchemy)', 'PostgreSQL', 'REST API', 'Mathematical computations'],
                },
                {
                    category: 'AI Layer',
                    items: ['LangChain', 'OpenAI GPT-5.1/4.1/4o', 'Custom Rules and Instructions', 'Machine Learning'],
                },
                {
                    category: 'Hosting',
                    items: ['Vercel (Frontend)', 'Supabase (Infrastructure)', 'Render (Backend)', 'LangSmith (AI)'],
                },
            ],
        },
        team: {
            title: 'Bizning Jamoa',
            subtitle: 'Bir necha kun ichida MVP ni ishlab chiqarishga qodir Lead va Senior darajadagi muhandislar va menejerlar.',
            teamLead: 'Team Lead',
            members: [
                {
                    name: 'Azizullo Temirov',
                    role: 'Product Manager',
                    desc: 'Product strategy, UX thinking, financial behavior, business analysis',
                },
                {
                    name: 'Khasan Rashidov',
                    role: 'Senior Fullstack Engineer',
                    desc: 'Python, Next.js, PostgreSQL, AI Integrations, .NET, Angular, Systems Design, Cloud Computing',
                },
                {
                    name: 'Khusan Rashidov',
                    role: 'Senior Backend Engineer',
                    desc: 'Python, ML/AI, .NET, Azure/AWS, PostgreSQL',
                },
                {
                    name: 'Burxonjon Solihjonov',
                    role: 'Senior Frontend Engineer',
                    desc: 'Next.js, Vue.js, UI/UX, Data Visualization',
                },
                {
                    name: 'Bakhtiyorjon Bokhodirov',
                    role: 'Lead AI Systems Engineer',
                    desc: 'Python, LangChain, ML, AI analytics, AI Integrations',
                },
            ],
        },
        footer: {
            copyright: '© 2025 Moliyachi. Agrobank AI500 Hackathon uchun yaratilgan.',
            githubLink: 'GitHub Repozitoriyamizni Ko\'ring',
        },
    },
    ru: {
        hero: {
            badge: 'Работает на Искусственном Интеллекте',
            title: 'Moliyachi',
            subtitle: 'Ваш персональный финансовый помощник на базе ИИ в Agrobank Mobile.',
            viewDemo: 'Посмотреть Демо',
            learnMore: 'Узнать Больше',
            demoTooltip: 'В разработке',
        },
        problemSolution: {
            problemTitle: 'Проблема',
            problemDesc: 'Значительное число клиентов Агробанка живет в строгом зарплатном цикле, сталкиваясь со стрессом и неопределенностью каждый месяц.',
            problems: [
                'Агрессивные траты после получения зарплаты',
                'Финансовый стресс и неопределенность в середине месяца',
                'Отсутствие видимости поведения расходов',
                'Отсутствие персонализированных рекомендаций по бюджету',
                'Текущие банковские приложения предоставляют транзакции, а не интеллект',
                'Пользователям нужен способ понять свое финансовое поведение — не просто посмотреть баланс',
            ],
            solutionBadge: 'Решение',
            solutionTitle: 'Moliyachi',
            solutionDesc: 'Умный финансовый помощник, полностью встроенный в AgrobankMobile, который превращает его из инструмента транзакций в финансового партнера.',
            solutions: [
                {
                    title: 'AI Анализ Расходов',
                    desc: 'Короткие, практичные объяснения того, куда уходят ваши деньги.',
                },
                {
                    title: 'Умное Месячное Планирование',
                    desc: 'Предупреждения при слишком быстрых тратах и прогнозы баланса.',
                },
                {
                    title: 'Оценка Финансового Здоровья',
                    desc: 'Один простой балл (0–100), объясняющий вашу стабильность.',
                },
                {
                    title: 'Планирование Целей',
                    desc: 'ИИ рассчитывает сроки и предлагает улучшения.',
                },
                {
                    title: 'Персонализированные Рекомендации',
                    desc: 'На основе паттернов расходов, привычек, дохода и целей.',
                },
                {
                    title: 'Подбор Продуктов Агробанка',
                    desc: 'ИИ предлагает Микрокредиты, Депозиты, Сбережения и Рассрочки.',
                },
            ],
        },
        whyUs: {
            title: 'Почему Наша Команда?',
            subtitle: 'Мы не просто создаем функции — мы создаем слой финансового интеллекта для Агробанка.',
            reasons: [
                {
                    title: 'Мы работаем очень быстро',
                    desc: 'Все члены команды — инженеры уровня Lead и Senior, способные выпустить MVP за несколько дней.',
                },
                {
                    title: 'Мы знаем проблему',
                    desc: 'Большинство из нас живет в зарплатном цикле и лично сталкивается с проблемами, которые мы решаем.',
                },
                {
                    title: 'Сильный технический бэкграунд',
                    desc: 'Мы охватываем ML/AI, Backend, Fintech логику и Современный UI/UX.',
                },
            ],
        },
        roadmap: {
            badge: 'Дорожная Карта',
            title: 'План Разработки',
            phases: [
                {
                    date: '26-30 Ноября',
                    title: 'Этап 1: Демо Сайт',
                    items: ['Лендинг сайт', 'Проблема и Решение', 'Планирование архитектуры', 'Начальные AI инсайты'],
                },
                {
                    date: '1-5 Декабря',
                    title: 'Функциональная Оболочка MVP',
                    items: ['Основа Next.js frontend', 'Визуальная компоновка дашборда', 'Настройка Mock профиля', 'Конвейер Frontend-Backend'],
                },
                {
                    date: '5-10 Декабря',
                    title: 'Основная Функциональность MVP',
                    items: ['AI движок рекомендаций', 'Калькулятор целей', 'Оценка Финансового Здоровья', 'Предупреждение о зарплатном цикле'],
                },
                {
                    date: '10-13 Декабря',
                    title: 'Полировка и Отправка',
                    items: ['Интеграция Supabase', 'Конвейер LangChain', 'Финальная полировка UI', 'Развертывание (Vercel/Render)'],
                },
            ],
        },
        methodology: {
            title: 'Как Мы Планируем Это Решить',
            subtitle: 'Мы строим тонкий, интеллектуальный AI слой поверх финансовой инфраструктуры Агробанка.',
            stepsTitle: 'Ключевые Этапы Реализации',
            techStackTitle: 'Технологический Стек',
            steps: [
                {
                    title: 'Ввод и Нормализация Финансового Профиля Пользователя',
                    details: [
                        'Сбор структурированных данных: зарплата, возраст, размер семьи, профессия, финансовые цели, валютные предпочтения.',
                        'Извлечение динамических данных: потоки доходов, история расходов, регулярные платежи, кредиты, активы, обязательства.',
                        'Нормализация и хранение в защищенной БД (PII-безопасно).',
                        'Создание непрерывных обновлений профиля с использованием потоков транзакций + AI-анализа документов (например, зарплатных ведомостей).',
                    ],
                },
                {
                    title: 'Категоризация Транзакций и Моделирование Поведения',
                    details: [
                        'Гибридный движок: Обнаружение ключевых слов на основе правил для высокоточных категорий.',
                        'AI классификатор (GPT или настроенная модель) для неоднозначных транзакций.',
                        'Отслеживание месячной волатильности по категориям (µ, σ).',
                        'Создание поведенческих сигнатур: циклы расходов, зарплатные циклы, всплески выходных, сезонность.',
                        'Обнаружение аномалий: внезапные перерасходы, крупные разовые платежи, появляющиеся регулярные платежи.',
                    ],
                },
                {
                    title: 'Панель Финансовой Аналитики',
                    details: [
                        'Построена с Next.js + Tailwind + графиками (столбчатые, круговые, линии трендов).',
                        'Показывает: Разбивка по категориям, Тренды месяц к месяцу, Основные vs дискреционные расходы.',
                        'Индекс стабильности дохода и Тепловая карта денежного потока.',
                        'AI автоматически выделяет необычные тренды (например, "Питание вне дома +32% по сравнению с прошлым месяцем").',
                    ],
                },
                {
                    title: 'AI Движок Инсайтов (Основной Интеллектуальный Слой)',
                    details: [
                        'Работает на GPT-5/4.1/4o + LangChain.',
                        'Генерирует: Инсайты расходов, Объяснения трендов, Микро-советы (короткие, практичные советы из 1-2 предложений).',
                        'Прогнозные предупреждения (например, "Баланс может упасть ниже безопасного порога через 9 дней").',
                        'Использует скрытое рассуждение цепочки мыслей + детерминированные ограничения для согласованности.',
                    ],
                },
                {
                    title: 'Предсказатель Зарплатного Цикла и Денежного Потока',
                    details: [
                        'Предсказывает, когда у пользователя закончатся деньги, используя: Историческую скорость расходов, Предстоящие счета, Волатильность на уровне категорий.',
                        'Производит: "Дни до нуля", Доверительный интервал (усиленный AI).',
                        'Рекомендуемые вмешательства (сократить X% в дискреционных → +5 дней буфера).',
                    ],
                },
                {
                    title: 'Продвинутый Калькулятор Временной Шкалы Целей',
                    details: [
                        'Заменяет старую формулу полным финансовым моделированием.',
                        'Реальные взносы = доход – расходы – рассрочки – налоги – буфер волатильности.',
                        'Симуляция Монте-Карло (2k–10k прогонов) для реалистичных сценариев.',
                        'Выходы: Детерминированные месяцы до цели, Процентили Монте-Карло (10-й, 50-й, 90-й), Вероятность успеха.',
                    ],
                },
                {
                    title: 'Оценка Финансового Здоровья (Композитный Индекс)',
                    details: [
                        'Факторы: Стабильность нормы сбережений, Постоянство дохода, Волатильность расходов, Долговой коэффициент, Покрытие аварийного буфера.',
                        'AI-оценка рисков.',
                        'Балл пересчитывается ежемесячно с четкими разбивками ("Ваш балл улучшился из-за снижения волатильности в расходах на Коммунальные услуги").',
                    ],
                },
                {
                    title: 'Движок Рекомендаций Продуктов Агробанка',
                    details: [
                        'Использует AI рассуждения + финансовые правила для подбора продуктов пользователю.',
                        'Депозиты для избыточной наличности, Кредиты при обнаружении риска ликвидности.',
                        'Рассрочки для крупных предстоящих платежей, Инвестиционные продукты в зависимости от балла риска.',
                        'Персонализированные объяснения ("Этот депозит помогает вашей цели достичь на 2 месяца раньше благодаря более высокой эффективной доходности").',
                    ],
                },
                {
                    title: 'Движок Прогнозных Сценариев и Симуляции',
                    details: [
                        'Пользователь может тестировать сценарии: "Что если я увеличу сбережения на 10%?", "Что если инфляция вырастет до 7%?", "Что если я возьму кредит на 5,000?".',
                        'Движок пересчитывает весь прогноз с новыми входными данными, используя быстрый Монте-Карло.',
                    ],
                },
                {
                    title: 'Адаптивное Обучение и Непрерывное Обновление Модели',
                    details: [
                        'Ежемесячная перекалибровка профиля: Обновление расходов µ/σ, Переобучение весов категорий.',
                        'Корректировка балла риска, Обновление предположений об инфляции и доходности.',
                        'AI автоматически корректирует прогнозы по мере изменения поведения пользователя.',
                    ],
                },
            ],
            stack: [
                {
                    category: 'Frontend',
                    items: ['Next.js', 'Tailwind CSS', 'Recharts', 'Lucide React', 'TypeScript', 'Mobile First'],
                },
                {
                    category: 'Backend',
                    items: ['Python (Flask, SQLAlchemy)', 'PostgreSQL', 'REST API', 'Mathematical computations'],
                },
                {
                    category: 'AI Layer',
                    items: ['LangChain', 'OpenAI GPT-5.1/4.1/4o', 'Custom Rules and Instructions', 'Machine Learning'],
                },
                {
                    category: 'Hosting',
                    items: ['Vercel (Frontend)', 'Supabase (Infrastructure)', 'Render (Backend)', 'LangSmith (AI)'],
                },
            ],
        },
        team: {
            title: 'Наша Команда',
            subtitle: 'Инженеры и менеджеры уровня Lead и Senior, способные выпустить MVP за несколько дней.',
            teamLead: 'Team Lead',
            members: [
                {
                    name: 'Azizullo Temirov',
                    role: 'Product Manager',
                    desc: 'Product strategy, UX thinking, financial behavior, business analysis',
                },
                {
                    name: 'Khasan Rashidov',
                    role: 'Senior Fullstack Engineer',
                    desc: 'Python, Next.js, PostgreSQL, AI Integrations, .NET, Angular, Systems Design, Cloud Computing',
                },
                {
                    name: 'Khusan Rashidov',
                    role: 'Senior Backend Engineer',
                    desc: 'Python, ML/AI, .NET, Azure/AWS, PostgreSQL',
                },
                {
                    name: 'Burxonjon Solihjonov',
                    role: 'Senior Frontend Engineer',
                    desc: 'Next.js, Vue.js, UI/UX, Data Visualization',
                },
                {
                    name: 'Bakhtiyorjon Bokhodirov',
                    role: 'Lead AI Systems Engineer',
                    desc: 'Python, LangChain, ML, AI analytics, AI Integrations',
                },
            ],
        },
        footer: {
            copyright: '© 2025 Moliyachi. Создано для Agrobank AI500 Hackathon.',
            githubLink: 'Посмотреть наш GitHub Репозиторий',
        },
    },
};
