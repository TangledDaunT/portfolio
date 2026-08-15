export const portfolioStats = [
  {
    value: 5.4,
    suffix: 'M+',
    label: 'Legal Documents Indexed',
    description: 'Judgments processed in LegalLawAdvisor RAG pipeline',
  },
  {
    value: 400,
    suffix: 'ms',
    label: 'Average Retrieval Time',
    description: 'Semantic search with Qdrant vector database',
  },
  {
    value: 132,
    suffix: 'ms',
    label: 'Motion Detection Latency',
    description: 'Real-time OpenCV + TensorFlow inference',
  },
  {
    value: 26,
    suffix: '',
    label: 'GitHub Repositories',
    description: 'Active open-source contributions and projects',
  },
  {
    value: 5,
    suffix: '+',
    label: 'Years Coding',
    description: 'Building production systems since 2019',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Uptime Target',
    description: 'Reliability-first approach to all deployments',
  },
];

export const timelineEvents = [
  {
    year: '2019',
    title: 'Started Coding Journey',
    description: 'Began with Java fundamentals, quickly moving to Python for AI/ML applications.',
    icon: 'rocket',
  },
  {
    year: '2020',
    title: 'First IoT Project',
    description: 'Built ESP32-based home automation system, sparking interest in hardware-software integration.',
    icon: 'cpu',
  },
  {
    year: '2021',
    title: 'Deep Learning Focus',
    description: 'Implemented computer vision systems, motion detection with OpenCV and TensorFlow.',
    icon: 'brain',
  },
  {
    year: '2022',
    title: 'Production AI Systems',
    description: 'Deployed RAG pipelines serving 5.4M+ legal documents with sub-400ms retrieval.',
    icon: 'database',
  },
  {
    year: '2023',
    title: 'LLM Architecture',
    description: 'Designed multi-agent systems and prompt orchestration layers using LangChain and LangGraph.',
    icon: 'network',
  },
  {
    year: '2024',
    title: 'Full-Stack Expertise',
    description: 'Mastered React, TypeScript, FastAPI, and cloud deployment for production-ready applications.',
    icon: 'code',
  },
];

export const skills = {
  ai: [
    { name: 'RAG Pipelines', level: 95 },
    { name: 'Vector Search (Qdrant)', level: 90 },
    { name: 'LLM Prompt Engineering', level: 92 },
    { name: 'LangChain / LangGraph', level: 88 },
    { name: 'TensorFlow / PyTorch', level: 85 },
  ],
  development: [
    { name: 'TypeScript / JavaScript', level: 92 },
    { name: 'React / Next.js', level: 90 },
    { name: 'Python / FastAPI', level: 94 },
    { name: 'Node.js', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
  ],
  devops: [
    { name: 'Docker', level: 85 },
    { name: 'AWS / Cloud Services', level: 82 },
    { name: 'CI/CD Pipelines', level: 80 },
    { name: 'Linux System Admin', level: 85 },
    { name: 'Git / GitHub', level: 95 },
  ],
  hardware: [
    { name: 'ESP32 / Arduino', level: 90 },
    { name: 'IoT Sensors', level: 88 },
    { name: 'Computer Vision', level: 85 },
    { name: 'Serial Communication', level: 82 },
    { name: 'n8n Automation', level: 80 },
  ],
};
