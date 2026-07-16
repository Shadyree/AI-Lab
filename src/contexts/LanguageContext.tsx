'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.knowledge': 'Knowledge',
    'nav.journey': 'Journey',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    
    // Hero
    'hero.title1': 'Code Less. Build More.',
    'hero.title2': 'Crafting with AI.',
    'hero.title3': 'Building the Future.',
    'hero.cta1': 'Explore Knowledge',
    'hero.cta2': 'View Projects →',
    
    // Featured Knowledge
    'featured.title': 'Featured Knowledge',
    'featured.subtitle': 'Core concepts and practical guides from my learning journey.',
    'featured.viewAll': 'View all knowledge →',
    
    // Recent Projects
    'projects.recent.title': 'Recent Projects',
    'projects.recent.subtitle': 'Real problems. Real solutions. Real results.',
    'projects.recent.viewAll': 'View all projects →',
    
    // Journey Preview
    'journey.preview.title': 'Growth Journey',
    'journey.preview.subtitle': '路虽远，行则将至；事虽难，做则必成。',
    'journey.preview.today': 'Future',
    'journey.preview.viewAll': 'View full journey →',
    
    // Knowledge Page
    'knowledge.title': 'Knowledge',
    'knowledge.subtitle': 'A growing collection of ideas, concepts, and practical guides.',
    'knowledge.searchPlaceholder': 'Search articles...',
    'knowledge.noResults': 'No articles found.',
    'knowledge.minRead': 'min',
    'knowledge.backToKnowledge': 'Back to Knowledge',
    'knowledge.contents': 'Contents',
    'difficulty.beginner': 'Beginner',
    'difficulty.intermediate': 'Intermediate',
    'difficulty.advanced': 'Advanced',
    'knowledge.related': 'Related',
    'knowledge.note': 'Note',
    'knowledge.noteText': 'This is a living document. I continuously update it as I learn more and gain new insights.',
    
    // Knowledge Article
    'article.whatIs': 'What is this about?',
    'article.keyConcepts': 'Key Concepts',
    'article.whyMatters': 'Why it matters',
    'article.notFound': 'Article Not Found',
    
    // Journey Page
    'journey.title': 'Journey',
    'journey.subtitle': 'The story of building, learning, and growing.',
    'journey.role': 'Role',
    'journey.challenge': 'Challenge',
    'journey.solution': 'Solution',
    'journey.outcome': 'Outcome',
    'journey.highlights': 'Highlights',
    'journey.future': 'To Be Continued...',
    
    // Projects Page
    'projects.title': 'Projects',
    'projects.subtitle': 'Real problems. Real solutions. Real results.',
    'projects.problem': 'Problem',
    'projects.challenge': 'Challenge',
    'projects.architecture': 'Architecture',
    'projects.techStack': 'Tech Stack',
    'projects.result': 'Result',
    'projects.metrics': 'Key Metrics',
    
    // About Page
    'about.title': 'About',
    'about.subtitle': 'Why I build. Why I learn. Why I share.',
    'about.bio': 'Bio',
    'about.bioText1': '5+ years of Java development experience with a track record in property SaaS platforms, internet platforms, and mini-program projects. Proficient in Spring Boot, Vue, Redis, MySQL and other mainstream tech stacks, with full-stack development capabilities.',
    'about.bioText2': 'In recent years, I have been continuously learning AI application development, familiar with Dify, RAG, vector retrieval and other technologies. Capable of building knowledge base systems based on large language models, with hands-on experience in AI Agent development.',
    'about.education': 'Education',
    'about.school': 'Beijing Normal University, Zhuhai',
    'about.major': 'Computer Science (Bachelor)',
    'about.degree': "Bachelor's Degree",
    'about.cet6': 'CET-6',
    'about.techStack': 'Tech Stack',
    'about.backend': 'Backend',
    'about.frontend': 'Frontend',
    'about.devops': 'DevOps',
    'about.ai': 'AI',
    'about.experience': 'Work Experience',
    'about.job1Title': 'IT Technical Supervisor',
    'about.job1d1': 'Lead smart parking project implementation and on-site technical support.',
    'about.job1d2': 'Responsible for Rainbow comprehensive platform and Rainbow system development and maintenance.',
    'about.job1d3': 'Handle server deployment, Linux environment configuration, and system launch.',
    'about.job1d4': 'Coordinate with suppliers for API integration and project implementation.',
    'about.job1d5': 'Responsible for production bug investigation, log analysis, and system stability.',
    'about.job2Title': 'Java Developer',
    'about.job2d1': 'Independently developed tenant on/offboarding module for SaaS platform.',
    'about.job2d2': 'Independently developed parking coupon module with cross-platform data sync.',
    'about.job2d3': 'Completed elevator control module development for owner APP.',
    'about.job2d4': 'Led most business features for Zhongtian Mall (excluding payment).',
    'about.job2d5': 'Independently developed activity booking platform with business transformation.',
    'about.job2d6': 'Participated in ICBC payment API integration.',
    'about.job2d7': 'Long-term production system maintenance via log analysis and issue resolution.',
    'about.strengths': 'Strengths',
    'about.s1': 'Full-stack Java Web development capability: requirements analysis, system design, frontend & backend development, API integration, and deployment.',
    'about.s2': 'Extensive experience in property SaaS, smart parking, mini-programs, and enterprise digital platforms with multiple successful deployments.',
    'about.s3': 'Proficient in Linux, Docker, Git environments with production debugging and system maintenance skills.',
    'about.s4': 'Hands-on AI application development: built local knowledge base with Dify, Ollama, Qwen, RAG, familiar with Embedding, vector retrieval, BM25, HyDE, Rerank, Query Rewrite.',
    'about.s5': 'Proficient in AI-assisted development (Vibe Coding) using ChatGPT, Mimo Code, Gemini, Codex, CodeBuddy for requirements analysis, code generation, refactoring, and documentation.',
    'about.s6': 'Strong Prompt Engineering skills for designing high-quality prompts across different development scenarios, enabling rapid prototyping and PoC validation.',
    
    // Footer
    'footer.copyright': '© 2026 XianRui.AI · Build. Learn. Share.',
    
    // Knowledge Categories
    'category.ai': 'AI',
    'category.python': 'Python',
    'category.java': 'Java',
    
    // Knowledge Subcategories
    'subcategory.llm': 'LLM',
    'subcategory.prompt': 'Prompt Engineering',
    'subcategory.rag': 'RAG',
    'subcategory.agent': 'Agent',
    'subcategory.mcp': 'MCP',
    'subcategory.patterns': 'Patterns',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.knowledge': '知识库',
    'nav.journey': '成长历程',
    'nav.projects': '项目实践',
    'nav.about': '关于',
    
    // Hero
    'hero.title1': 'Code Less. Build More.',
    'hero.title2': '用 AI 创造。',
    'hero.title3': '构建未来。',
    'hero.cta1': '探索知识库',
    'hero.cta2': '查看项目 →',
    
    // Featured Knowledge
    'featured.title': '精选知识',
    'featured.subtitle': '来自我学习旅程的核心概念与实践指南。',
    'featured.viewAll': '查看全部知识 →',
    
    // Recent Projects
    'projects.recent.title': '近期项目',
    'projects.recent.subtitle': '真实的问题。真实的解决方案。真实的结果。',
    'projects.recent.viewAll': '查看全部项目 →',
    
    // Journey Preview
    'journey.preview.title': '成长历程',
    'journey.preview.subtitle': '路虽远，行则将至；事虽难，做则必成。',
    'journey.preview.today': '未来',
    'journey.preview.viewAll': '查看完整历程 →',
    
    // Knowledge Page
    'knowledge.title': '知识库',
    'knowledge.subtitle': '不断增长的想法、概念和实践指南合集。',
    'knowledge.searchPlaceholder': '搜索文章...',
    'knowledge.noResults': '没有找到相关文章。',
    'knowledge.minRead': '分钟',
    'knowledge.backToKnowledge': '返回知识库',
    'knowledge.contents': '目录',
    'difficulty.beginner': '入门',
    'difficulty.intermediate': '中级',
    'difficulty.advanced': '高级',
    'knowledge.related': '相关推荐',
    'knowledge.note': '注意',
    'knowledge.noteText': '这是一份持续更新的文档。我会在学习新知识、获得新见解时不断更新它。',
    
    // Knowledge Article
    'article.whatIs': '这是什么？',
    'article.keyConcepts': '核心概念',
    'article.whyMatters': '为什么重要',
    'article.notFound': '文章未找到',
    
    // Journey Page
    'journey.title': '成长历程',
    'journey.subtitle': '构建、学习、成长的故事。',
    'journey.role': '角色',
    'journey.challenge': '挑战',
    'journey.solution': '解决方案',
    'journey.outcome': '成果',
    'journey.highlights': '工作亮点',
    'journey.future': '未完待续...',
    
    // Projects Page
    'projects.title': '项目实践',
    'projects.subtitle': '真实的问题。真实的解决方案。真实的结果。',
    'projects.problem': '问题',
    'projects.challenge': '挑战',
    'projects.architecture': '架构',
    'projects.techStack': '技术栈',
    'projects.result': '结果',
    'projects.metrics': '关键指标',
    
    // About Page
    'about.title': '关于',
    'about.subtitle': '为什么构建。为什么学习。为什么分享。',
    'about.bio': '个人简介',
    'about.bioText1': '5年以上 Java 开发经验，具备物业行业 SaaS 平台、互联网平台及小程序项目开发经验，熟悉 Spring Boot、Vue、Redis、MySQL 等主流技术栈，具备前后端独立开发能力。',
    'about.bioText2': '近年来持续学习 AI 应用开发，熟悉 Dify、RAG、向量检索等技术，能够搭建基于大模型的知识库系统，并具备一定的 AI Agent 实践能力。',
    'about.education': '教育背景',
    'about.school': '北京师范大学珠海分校',
    'about.major': '计算机科学与技术（本科）',
    'about.degree': '本科',
    'about.cet6': 'CET-6',
    'about.techStack': '技术栈',
    'about.backend': '后端技术',
    'about.frontend': '前端技术',
    'about.devops': '运维部署',
    'about.ai': 'AI 技术',
    'about.experience': '工作经历',
    'about.job1Title': 'IT 技术负责人',
    'about.job1d1': '负责智慧停车项目实施及现场技术支持。',
    'about.job1d2': '负责彩虹综合平台及 Rainbow 系统功能开发与持续维护。',
    'about.job1d3': '负责服务器部署、Linux 环境配置及系统上线。',
    'about.job1d4': '协调供应商进行接口联调及项目实施。',
    'about.job1d5': '负责线上 Bug 排查、日志分析及系统稳定性维护。',
    'about.job2Title': 'Java 开发工程师',
    'about.job2d1': '独立完成物业 SaaS 平台租户迁入迁出模块开发。',
    'about.job2d2': '独立完成停车优惠券模块开发，实现 SaaS 平台与停车平台优惠券数据互通。',
    'about.job2d3': '完成业主 APP 梯控功能开发，包括前后端接口及业务逻辑实现。',
    'about.job2d4': '负责中天商城除支付模块外的大部分业务功能开发。',
    'about.job2d5': '独立开发活动预约平台，实现商城业务改造及预约业务流程。',
    'about.job2d6': '参与工行支付接口联调，完成支付能力接入。',
    'about.job2d7': '长期负责线上系统维护，通过日志分析定位并解决生产环境问题。',
    'about.strengths': '技术亮点',
    'about.s1': '具备 Java Web 全栈开发能力，能够独立完成需求分析、系统设计、前后端开发、接口联调及项目部署。',
    'about.s2': '熟悉物业 SaaS、智慧停车、小程序及企业数字化平台开发，具有多个实际项目落地经验。',
    'about.s3': '熟悉 Linux、Docker、Git 等开发及部署环境，具备生产环境问题排查及系统维护经验。',
    'about.s4': '持续学习并实践 AI 应用开发，已完成基于 Dify、Ollama、Qwen、RAG 的本地知识库系统搭建，熟悉 Embedding、向量检索、BM25、HyDE、Rerank、Query Rewrite 等核心技术。',
    'about.s5': '具备 AI 辅助开发（Vibe Coding）实践能力，能够熟练运用 ChatGPT、Mimo Code、Gemini、Codex、CodeBuddy 等 AI 工具完成需求分析、方案设计、代码生成、重构优化、Bug 排查及文档编写。',
    'about.s6': '具备 Prompt Engineering 能力，能够针对不同开发场景设计高质量 Prompt，提升 AI 代码生成及问题解决效果，并能够结合 AI 工具完成快速原型开发与技术验证（PoC）。',
    
    // Footer
    'footer.copyright': '© 2026 XianRui.AI · 构建 · 学习 · 分享',
    
    // Knowledge Categories
    'category.ai': 'AI',
    'category.python': 'Python',
    'category.java': 'Java',
    
    // Knowledge Subcategories
    'subcategory.llm': '大语言模型',
    'subcategory.prompt': '提示词工程',
    'subcategory.rag': '检索增强生成',
    'subcategory.agent': '智能体',
    'subcategory.mcp': '模型上下文协议',
    'subcategory.patterns': '设计模式',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
