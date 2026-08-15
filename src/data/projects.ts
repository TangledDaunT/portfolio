export interface Project {
  name: string;
  description: string;
  tech: string[];
  stars: number;
  url: string;
  liveUrl?: string;
  category: 'featured' | 'production' | 'iot' | 'automation' | 'experiment' | 'coursework';
  highlights?: string[];
  longDescription?: string;
}

export const projects: Project[] = [
  // Featured Projects - Production AI Systems
  {
    name: 'MindBridge',
    description: 'Mental Health SaaS app tracking emotional patterns and preparing session briefs for therapists',
    tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    stars: 1,
    url: 'https://github.com/TangledDaunT/mindbridge',
    category: 'featured',
    highlights: ['Session Analytics', 'Pattern Recognition', 'Therapist Dashboard'],
    longDescription: 'A comprehensive mental health platform that helps therapists track client progress through advanced emotional pattern recognition. Provides session briefs and analytics.',
  },
  {
    name: 'LegalLawAdvisor',
    description: 'RAG-based legal research tool with 5.4M+ indexed judgments, powered by Qdrant vector search and LLaMA 80B',
    tech: ['Python', 'FastAPI', 'Qdrant', 'LLaMA', 'React'],
    stars: 0,
    url: 'https://github.com/TangledDaunT',
    liveUrl: 'https://legallawadvisor.app',
    category: 'featured',
    highlights: ['5.4M+ Judgments', '400ms Retrieval', 'RAG Pipeline'],
    longDescription: 'Flagship AI system processing millions of legal documents with sub-400ms semantic search retrieval. Built with production-grade RAG architecture using Qdrant for vector indexing.',
  },

  // IOT & Hardware Systems
  {
    name: 'IoT Home Security System',
    description: 'Comprehensive home security with motion detection, camera feeds, and real-time alerts',
    tech: ['JavaScript', 'ESP32', 'OpenCV', 'WebSockets', 'n8n'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/IOT',
    category: 'iot',
    highlights: ['Real-time Alerts', 'Motion Detection', 'Camera Integration'],
    longDescription: 'Complete IoT security system integrating ESP32 microcontrollers with computer vision for intelligent monitoring and real-time notifications.',
  },
  {
    name: 'Custom CCTV System',
    description: 'Advanced surveillance system with intelligent motion tracking and alerting',
    tech: ['Python', 'OpenCV', 'Flask', 'Computer Vision'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/custom_CCTV',
    category: 'iot',
    highlights: ['Motion Tracking', 'Night Vision', 'Cloud Storage'],
  },
  {
    name: 'IOT-CAM',
    description: 'ESP32 camera application with real-time streaming and controls',
    tech: ['TypeScript', 'ESP32', 'React Native', 'WebSockets'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/IOT-CAM',
    category: 'iot',
    highlights: ['Live Streaming', 'Remote Control', 'Mobile App'],
  },
  {
    name: 'ESP32 Room Automation',
    description: 'Intelligent room automation with IR control and sensor integration',
    tech: ['Python', 'ESP32', 'IR Remote', 'MQTT'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/ESP32-INFRA-Room-Automation',
    category: 'iot',
    highlights: ['IR Control', 'Sensor Network', 'Voice Commands'],
  },
  {
    name: 'GestureLight',
    description: 'Gesture-controlled lighting system using motion sensors',
    tech: ['JavaScript', 'ESP32', 'Motion Sensors', 'LEDs'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/GestureLight',
    category: 'iot',
    highlights: ['Hand Gestures', 'Color Control', 'Ambient Mode'],
  },
  {
    name: 'Wifi-Deauth (Security Lab)',
    description: 'Educational ESP32 WiFi security research tool for authorized penetration testing',
    tech: ['C++', 'ESP32', 'Bluetooth', 'WiFi'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/wifi-deauth',
    category: 'iot',
    highlights: ['Security Research', 'Bluetooth Control', 'Educational'],
    longDescription: 'Educational security research tool for authorized penetration testing. Demonstrates WiFi protocol vulnerabilities in controlled environments.',
  },
  {
    name: 'ESP32-Deauther',
    description: 'Hydra32 Wi-Fi Penetration firmware for ESP32',
    tech: ['C', 'ESP32', 'WiFi Protocols'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/ESP32-Deauther',
    category: 'iot',
    highlights: ['Custom Firmware', 'Security Testing', 'WiFi Analysis'],
  },

  // AI & Automation
  {
    name: 'AI Motion Detector',
    description: 'Real-time motion detection system with 132ms latency using OpenCV and TensorFlow',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'NumPy'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/Ai-motion-detector',
    category: 'automation',
    highlights: ['132ms Latency', 'TensorFlow Models', 'Real-time Processing'],
    longDescription: 'High-performance motion detection achieving 132ms end-to-end latency using optimized TensorFlow models and OpenCV frame processing.',
  },
  {
    name: 'Mousepad Drawing',
    description: 'Creative project using webcam and trackpad gestures for digital drawing',
    tech: ['TypeScript', 'Computer Vision', 'Canvas API'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/mousepad_drawing',
    category: 'automation',
    highlights: ['Gesture Recognition', 'Creative Tool', 'Real-time Drawing'],
  },
  {
    name: 'AgentDesk',
    description: 'AI agent desk management and orchestration system',
    tech: ['Python', 'AI Agents', 'FastAPI'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/AgentDesk',
    category: 'automation',
    highlights: ['Agent Orchestration', 'Task Management', 'API Integration'],
  },
  {
    name: 'Dad File Bot',
    description: 'WhatsApp bot for automated file requests and delivery',
    tech: ['Python', 'WhatsApp API', 'File Management'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/dad-file-bot',
    category: 'automation',
    highlights: ['WhatsApp Integration', 'File Automation', 'Voice Commands'],
  },

  // Experiments & Tools
  {
    name: 'OpenClaw Vision',
    description: 'Computer vision module for the OpenClaw assistive platform',
    tech: ['Python', 'OpenCV', 'TensorFlow Lite'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/openclaw-vision',
    category: 'experiment',
    highlights: ['Object Detection', 'Assistive Tech', 'Real-time CV'],
  },
  {
    name: 'Kokoro FastAPI',
    description: 'FastAPI backend for Kokoro application framework',
    tech: ['Python', 'FastAPI', 'PostgreSQL'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/kokoro-fastapi',
    category: 'experiment',
    highlights: ['REST API', 'Async Processing', 'Authentication'],
  },
  {
    name: 'Expense Tracker',
    description: 'Web application for tracking and analyzing personal expenses',
    tech: ['JavaScript', 'React', 'Chart.js'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/Expense-Tracker',
    category: 'experiment',
    highlights: ['Data Visualization', 'Budget Analysis', 'Transaction History'],
  },
  {
    name: 'OpenClaw Skills',
    description: 'Collection of skills for OpenClaw assistant (wake-up alarm, daily content, video editing)',
    tech: ['Python', 'FFmpeg', 'Task Automation'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/openclaw-skill-wake-up-alarm',
    category: 'experiment',
    highlights: ['Voice Interfaces', 'Task Automation', 'FFmpeg Integration'],
  },

  // Coursework & Learning
  {
    name: 'JavaProject',
    description: 'Core Java coursework demonstrating fundamental programming concepts',
    tech: ['Java', 'OOP', 'Data Structures'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/JavaProject',
    category: 'coursework',
  },
  {
    name: 'JavaSem3Project',
    description: 'Semester 3 Java project focusing on GUI applications and database connectivity',
    tech: ['Java', 'Swing', 'JDBC'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/JavaSem3Project',
    category: 'coursework',
  },
  {
    name: 'Javapro',
    description: 'Advanced Java concepts including multithreading and collections',
    tech: ['Java', 'Multithreading', 'Collections'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/javapro',
    category: 'coursework',
  },
  {
    name: 'Banking-Bridge',
    description: 'Banking system simulation demonstrating secure transactions and account management',
    tech: ['Java', 'Security', 'Database'],
    stars: 0,
    url: 'https://github.com/TangledDaunT/Banking-Bridge',
    category: 'coursework',
    highlights: ['Transaction Security', 'Account Management', 'Audit Trail'],
  },

  // Portfolio
  {
    name: 'Portfolio Website',
    description: 'AI Systems Engineer portfolio showcasing projects and skills',
    tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    stars: 1,
    url: 'https://github.com/TangledDaunT/portfolio',
    liveUrl: 'https://shreyansh.com',
    category: 'featured',
    highlights: ['Interactive Animations', 'Modern Design', 'Responsive'],
  },
];

export const categoryLabels: Record<Project['category'], string> = {
  featured: 'Featured/Production',
  production: 'Production Systems',
  iot: 'IoT & Hardware',
  automation: 'AI & Automation',
  experiment: 'Experiments',
  coursework: 'Coursework',
};

export const categoryColors: Record<Project['category'], string> = {
  featured: '#B600A8',
  production: '#1E40AF',
  iot: '#059669',
  automation: '#DC2626',
  experiment: '#F59E0B',
  coursework: '#6B7280',
};
