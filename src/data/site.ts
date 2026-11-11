// Everything about Jay that appears in more than one place lives here.

export const site = {
  name: 'Jay Malhotra',
  role: 'AI/ML engineer',
  line: 'I build AI products end to end, from the model to the app people use.',
  status: 'Open to internships and full-time roles in Toronto or remote in Canada.',
  description:
    'Jay Malhotra is an AI/ML engineer who builds AI products end to end. Open to internships and full-time roles in Toronto or remote in Canada.',
  email: 'jaymalhotra106@gmail.com',
  github: 'https://github.com/JustJay7',
  linkedin: 'https://www.linkedin.com/in/jay-malhotraa/',
  repo: 'https://github.com/JustJay7/JustJay7.github.io',
};

export const experience = [
  { org: 'Ayebot', role: 'Founding engineer', when: 'Jan 2026 to present', href: '/work/ayebot/' },
  { org: 'Trench Group', role: 'Data engineer, McGill MMA capstone project', when: 'Sep 2026 to present' },
  { org: 'Perpex', role: 'Software development intern', when: 'Aug to Nov 2025' },
  { org: 'SmartInternz', role: 'Google Cloud generative AI intern', when: 'Jul to Aug 2025' },
];

export const education = [
  { org: 'McGill University, Desautels', role: 'Master of Management in Analytics', when: 'In progress' },
  { org: 'Bennett University', role: 'BCA with AI specialization, CGPA 9.28/10', when: '2023 to 2026' },
];

export const moreWork = [
  {
    title: 'LLM Evaluation Pipeline',
    text: 'Scores chatbot responses for relevance, hallucination and completeness, with latency and cost tracked per stage.',
    href: 'https://github.com/JustJay7/llm-evaluation-pipeline',
  },
  {
    title: 'Risk-factor disclosure research',
    text: 'Tests whether year-over-year changes in the Item 1A risk-factor text of SEC filings forecast volatility and crash risk. In progress, with a co-author from finance.',
  },
];

export const stack = [
  { group: 'Languages', items: ['Python', 'SQL', 'JavaScript', 'C#'] },
  { group: 'ML and AI', items: ['LangGraph', 'LangChain', 'RAG', 'scikit-learn', 'pandas', 'YOLO', 'U-Net'] },
  { group: 'Apps', items: ['FastAPI', 'Django', 'Flask', 'Next.js', 'Flutter'] },
  { group: 'Data', items: ['IBM Db2', 'PostgreSQL', 'SQL Server', 'MySQL', 'SQLite'] },
  { group: 'Cloud and tools', items: ['AWS Bedrock', 'Google Cloud', 'Docker', 'Git'] },
];
