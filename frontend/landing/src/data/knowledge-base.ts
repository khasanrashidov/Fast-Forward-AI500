// Knowledge base factory that uses translations.ts as single source of truth
// This module generates AI context from translations content

import { translations, Language, Translations } from './translations';

// Static configuration not derived from translations
export const knowledgeBaseConfig = {
  projectName: 'Moliyachi',

  // Core description (keep here as it's AI-specific context)
  whatIsMoliyachi: {
    en: `Moliyachi (meaning "Financial Expert" in Uzbek) is an AI-powered personal finance 
assistant that lives inside Agrobank Mobile. It's not a separate app - it's a smart layer on top of 
your existing banking app that makes your financial data actionable and understandable.`,
    uz: `Moliyachi (o'zbekchada "Moliya mutaxassisi") - bu Agrobank Mobile ichida yashaydigan 
AI asosidagi shaxsiy moliyaviy yordamchi. Bu alohida ilova emas - bu mavjud banking ilovangiz ustida 
moliyaviy ma'lumotlarni tushunarli va foydali qiladigan aqlli qatlam.`,
    ru: `Moliyachi (в переводе с узбекского "Финансовый эксперт") — это персональный финансовый 
помощник на базе ИИ, который живет внутри Agrobank Mobile. Это не отдельное приложение — это умный слой 
поверх вашего банковского приложения, который делает ваши финансовые данные понятными и полезными.`,
  },

  // Target audience description
  targetAudience: {
    en: `Moliyachi is designed for Agrobank Mobile users in Uzbekistan, including individuals and families 
who want to better understand and manage their finances. It's especially useful for those who live on 
a salary cycle, want to save money, track spending, and achieve financial goals.`,
    uz: `Moliyachi O'zbekistondagi Agrobank Mobile foydalanuvchilari uchun mo'ljallangan, jumladan 
moliyani yaxshiroq tushunish va boshqarish istagidagi shaxslar va oilalar uchun. Bu ayniqsa oylik 
tsiklida yashovchilar, pul tejash, xarajatlarni kuzatish va moliyaviy maqsadlarga erishish istaganlar uchun foydali.`,
    ru: `Moliyachi разработан для пользователей Agrobank Mobile в Узбекистане, включая людей и семьи, 
которые хотят лучше понимать и управлять своими финансами. Это особенно полезно для тех, кто живет 
по зарплатному циклу, хочет экономить деньги, отслеживать расходы и достигать финансовых целей.`,
  },

  // Important links
  links: {
    demo: 'https://moliyachi-web.vercel.app/',
    docs: 'https://fast-forward-apty.onrender.com/docs/',
    landing: 'https://moliyachi.vercel.app/',
    github: 'https://github.com/khasanrashidov/Fast-Forward-AI500',
  },

  // Sample questions for chat UI (multilingual)
  sampleQuestions: [
    { en: 'What is Moliyachi?', uz: 'Moliyachi nima?', ru: 'Что такое Moliyachi?' },
    {
      en: 'What problem does it solve?',
      uz: 'Qanday muammoni hal qiladi?',
      ru: 'Какую проблему решает?',
    },
    { en: 'Who is this for?', uz: 'Bu kim uchun?', ru: 'Для кого это?' },
    {
      en: 'What features does it have?',
      uz: 'Qanday imkoniyatlari bor?',
      ru: 'Какие функции есть?',
    },
    { en: 'How does AI work in this app?', uz: 'AI qanday ishlaydi?', ru: 'Как работает ИИ?' },
    { en: 'Who built this?', uz: 'Buni kim yaratgan?', ru: 'Кто это создал?' },
  ],
};

// Factory function to generate knowledge base from translations
function buildKnowledgeBaseFromTranslations(lang: Language): {
  tagline: string;
  problem: { title: string; description: string; points: string[] };
  solution: { title: string; description: string; features: { title: string; desc: string }[] };
  whyUs: { title: string; reasons: { title: string; desc: string }[] };
  roadmap: { title: string; phases: { date: string; title: string; items: string[] }[] };
  methodology: {
    title: string;
    subtitle: string;
    steps: { title: string; details: string[] }[];
    stack: { category: string; items: string[] }[];
  };
  team: { title: string; members: { name: string; role: string; desc: string }[] };
} {
  const t: Translations = translations[lang];

  return {
    tagline: t.hero.subtitle,
    problem: {
      title: t.problemSolution.problemTitle,
      description: t.problemSolution.problemDesc,
      points: t.problemSolution.problems,
    },
    solution: {
      title: t.problemSolution.solutionTitle,
      description: t.problemSolution.solutionDesc,
      features: t.problemSolution.solutions,
    },
    whyUs: {
      title: t.whyUs.title,
      reasons: t.whyUs.reasons,
    },
    roadmap: {
      title: t.roadmap.title,
      phases: t.roadmap.phases,
    },
    methodology: {
      title: t.methodology.title,
      subtitle: t.methodology.subtitle,
      steps: t.methodology.steps,
      stack: t.methodology.stack,
    },
    team: {
      title: t.team.title,
      members: t.team.members,
    },
  };
}

// Generate formatted knowledge base prompt for a specific language
export function getKnowledgeBasePrompt(lang: Language = 'en'): string {
  const kb = buildKnowledgeBaseFromTranslations(lang);
  const config = knowledgeBaseConfig;

  return `
PROJECT: ${config.projectName}
TAGLINE: ${kb.tagline}

WHAT IS MOLIYACHI:
${config.whatIsMoliyachi[lang]}

TARGET AUDIENCE:
${config.targetAudience[lang]}

PROBLEM - ${kb.problem.title}:
${kb.problem.description}
Key problems addressed:
${kb.problem.points.map((p) => `- ${p}`).join('\n')}

SOLUTION - ${kb.solution.title}:
${kb.solution.description}
Key features:
${kb.solution.features.map((f) => `- ${f.title}: ${f.desc}`).join('\n')}

${kb.whyUs.title.toUpperCase()}:
${kb.whyUs.reasons.map((r) => `- ${r.title}: ${r.desc}`).join('\n')}

TECHNOLOGY STACK:
${kb.methodology.stack.map((s) => `- ${s.category}: ${s.items.join(', ')}`).join('\n')}

TEAM - ${kb.team.title}:
${kb.team.members.map((m) => `- ${m.name} (${m.role}): ${m.desc}`).join('\n')}

ROADMAP - ${kb.roadmap.title}:
${kb.roadmap.phases.map((p) => `- ${p.date} | ${p.title}: ${p.items.slice(0, 3).join(', ')}`).join('\n')}

METHODOLOGY - ${kb.methodology.title}:
${kb.methodology.subtitle}
${kb.methodology.steps
  .slice(0, 5)
  .map((s, i) => `${i + 1}. ${s.title}`)
  .join('\n')}

LINKS:
- Demo App: ${config.links.demo}
- API Documentation: ${config.links.docs}
- Landing Page: ${config.links.landing}
- GitHub Repository: ${config.links.github}
`;
}

// Legacy export for backward compatibility with components
export const knowledgeBase = {
  projectName: knowledgeBaseConfig.projectName,
  tagline: translations.en.hero.subtitle,
  sampleQuestions: knowledgeBaseConfig.sampleQuestions,
  links: knowledgeBaseConfig.links,

  // Getter methods for components that need translated content
  getTagline: (lang: Language) => translations[lang].hero.subtitle,
  getSampleQuestions: () => knowledgeBaseConfig.sampleQuestions,
};
