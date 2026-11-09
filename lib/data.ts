// All site content lives here, so updating the portfolio never means touching layout code.

export const SITE = {
  url: 'https://anshu.tech',
  name: 'Anshu Prajapati',
  email: 'anshuuprajapati01@gmail.com',
  title: 'Anshu Prajapati | AI Engineer – Agentic AI, RAG & LLM Systems',
  description:
    'Anshu Prajapati is an AI Engineer in Delhi, India, building production agentic AI, RAG, voice AI agents, MCP servers and computer vision systems with LangGraph, AWS Bedrock and FastAPI.',
  tagline:
    'I build AI agents that pick up the phone, read the passport and count the passengers, then keep them running in production.',
  resumePdf: '/resume/Anshu_Prajapati_AI_Engineer_Resume.pdf',
  resumeDocx: '/resume/Anshu_Prajapati_AI_Engineer_Resume.docx',
  twitter: '@anshuuprajapati',
};

export const SOCIALS = [
  { key: 'github', label: 'GitHub', handle: 'anshuu-prajapati', href: 'https://github.com/anshuu-prajapati' },
  { key: 'linkedin', label: 'LinkedIn', handle: 'anshuu-prajapati', href: 'https://www.linkedin.com/in/anshuu-prajapati' },
  { key: 'leetcode', label: 'LeetCode', handle: 'anshuu-prajapati', href: 'https://leetcode.com/u/anshuu-prajapati/' },
  { key: 'kaggle', label: 'Kaggle', handle: 'anshuuprajapati', href: 'https://www.kaggle.com/anshuuprajapati' },
  { key: 'huggingface', label: 'Hugging Face', handle: 'anshuu-prajapati', href: 'https://huggingface.co/anshuu-prajapati' },
  { key: 'x', label: 'X', handle: '@anshuuprajapati', href: 'https://x.com/anshuuprajapati' },
] as const;

export const KEYWORDS = [
  'Anshu Prajapati',
  'Anshu Prajapati AI Engineer',
  'AI Engineer',
  'AI Engineer Delhi',
  'AI Engineer India',
  'Agentic AI Engineer',
  'Generative AI Engineer',
  'LLM Engineer',
  'RAG',
  'LangGraph',
  'LangChain',
  'AWS Bedrock',
  'MCP server',
  'Model Context Protocol',
  'Voice AI agent',
  'WhatsApp AI agent',
  'Computer Vision',
  'YOLOv8',
  'FastAPI',
  'AI Full Stack Developer',
];

export const METRICS = [
  { to: 1000, suffix: '+', text: 'conversations handled at once by my voice and WhatsApp agents', d: 'M2 34 L18 31 L30 32 L44 25 L58 26 L72 17 L86 15 L100 8 L118 4' },
  { to: 45, suffix: '%', text: 'less manual handling time after the agents went live', d: 'M2 4 L16 6 L30 5 L44 12 L58 14 L72 22 L86 24 L100 30 L118 33' },
  { to: 30, suffix: '%', text: 'lower LLM inference cost from caching and batching', d: 'M2 6 L18 7 L32 10 L46 9 L60 17 L74 19 L88 24 L104 27 L118 28' },
  { to: 96, suffix: '%', text: 'passenger-counting accuracy on live video at 30 FPS', d: 'M2 30 L16 22 L30 24 L44 14 L58 16 L72 10 L86 11 L100 6 L118 5' },
];

const GH = 'https://github.com/anshuu-prajapati';

export type Project = {
  kind: string;
  award?: string;
  title: string;
  what: string;
  pipe: string[];
  detail: string;
  code?: string;
  tech: string[];
  links: [string, string][];
};

export const PROJECTS: Project[] = [
  {
    kind: 'Computer vision and security', award: 'SIH finalist', title: 'DocuSentinel',
    what: 'Screens passports, visas and IDs and returns one explainable risk score in about two seconds.',
    pipe: ['OCR', 'MRZ checks', 'Tamper forensics', 'Face match', 'Risk score'],
    detail: 'Every scan is written to a SHA-256 hash-chained audit ledger, so no result can be quietly edited later.',
    tech: ['FastAPI', 'Tesseract', 'FaceNet', 'pytest'],
    links: [['View the code', `${GH}/DocuSentinel`]],
  },
  {
    kind: 'Voice AI agent', title: 'GPS Fleet Voice Agent',
    what: 'Phones truck drivers, understands Hindi and Hinglish, and books technician visits on its own.',
    pipe: ['Outbound call', 'Speech', 'Intent', 'Region check', 'Ticket'],
    detail: 'Pulls status, place, date and time slot from one sentence like “Gaadi Delhi me loading me hai, kal morning ko service kar do”.',
    tech: ['LangGraph', 'AWS Bedrock', 'Twilio', 'FastAPI'],
    links: [['View the code', `${GH}/gps-voice-agent`]],
  },
  {
    kind: 'Multimodal LLM pipeline', award: 'Live', title: 'ClipForge',
    what: 'Turns a long video into ranked vertical shorts with motion captions.',
    pipe: ['Whisper', 'Hook scoring', 'Dedupe', '9:16 reframe', 'Captions'],
    detail: 'With no API key set, it falls back to its own keyword-energy scorer instead of failing.',
    tech: ['Whisper', 'Claude', 'FFmpeg', 'CUDA'],
    links: [['Try it live', 'https://clip.anshu.tech'], ['View the code', `${GH}/clipforge`]],
  },
  {
    kind: 'MCP server', award: 'Live', title: 'Me, as an MCP server',
    what: 'My own MCP server that lets AI assistants manage my WhatsApp, Google account and everyday tools.',
    pipe: ['AI client', 'MCP', 'Tool router', 'WhatsApp', 'Google'],
    detail: 'One endpoint, many tools: any MCP-compatible assistant can message, schedule and look things up for me through one typed interface.',
    tech: ['Model Context Protocol', 'WhatsApp', 'Google APIs'],
    links: [['Open me.anshu.tech', 'https://me.anshu.tech']],
  },
  {
    kind: 'Real-time computer vision', title: 'TransitCount',
    what: 'Counts bus passengers getting on and off from a live camera stream.',
    pipe: ['YOLOv8', 'ByteTrack', 'Kalman smoothing', 'Door logic', 'API'],
    detail: 'Staff wearing high-visibility vests are recognised and left out of the count.',
    tech: ['YOLOv8', 'ByteTrack', 'OpenCV'],
    links: [['View the code', `${GH}/TransitCount`]],
  },
  {
    kind: 'Privacy-first analytics', title: 'Store CCTV Analytics',
    what: 'Measures footfall, queues and table turnover for a restaurant without identifying anyone.',
    pipe: ['Detect', 'Track', 'Zone counts', 'Occupancy spells', 'Metrics'],
    detail: 'Built to survive broken tracking: 463 shredded tracks still resolve into the 5 correct real-world events.',
    tech: ['YOLO', 'ByteTrack', 'OpenCV'],
    links: [['View the code', `${GH}/MOD_PIZZA`]],
  },
  {
    kind: 'Open source', award: 'On PyPI', title: 'YT ASCII Player',
    what: 'Plays any YouTube video as true-colour ASCII art right in your terminal.',
    pipe: ['Fetch', 'Decode', 'Map to glyphs', 'Sync audio'],
    detail: 'One command, nothing else to set up:', code: 'pip install ytascii-player',
    tech: ['OpenCV', 'yt-dlp', 'Python'],
    links: [['View the code', `${GH}/YT-ASCII-PLAYER`]],
  },
];

// Node text is trusted static HTML (numbers wrapped in .num, links to repos).
export const FLOW = [
  { h: 'Voice and WhatsApp agents', p: 'An autonomous Twilio calling agent and a multi-tenant WhatsApp agent on AWS Bedrock and LangGraph, scaled to <span class="num">1,000+</span> concurrent conversations.' },
  { h: 'An LLM router that picks the right brain', p: 'Intent parsing and function calling across rule engines, ML pipelines and agents lifted intent accuracy by <span class="num">28%</span>; caching and batching cut cost by <span class="num">30%</span>.' },
  { h: 'Retrieval that understands entities', p: 'Pinecone paired with multi-tenant knowledge graphs: <span class="num">20%</span> better precision and <span class="num">30%</span> lower latency.' },
  { h: 'Models that sense the road', p: 'Collision prediction fusing video with g-force data at <span class="num">92%</span>, and a 10 ms gyroscope detector at <span class="num">98%</span>.' },
  { h: 'A meeting assistant people use daily', p: 'Streaming speech-to-text that joins Teams, Meet and Zoom calls for <span class="num">150+</span> daily users.' },
  { h: 'Shipped like real software', p: 'Dockerised FastAPI services on Kubernetes with CI/CD, versioned model rollouts and A/B evaluation.' },
  { h: 'Before that: full-stack AI at DMAC', p: `Built <a href="${GH}/BizpilotAi" target="_blank" rel="noopener">BizpilotAi</a>, a Gemini-powered business assistant, and <a href="${GH}/quickGpt" target="_blank" rel="noopener">QuickGPT</a>, a chat and image-generation app with Stripe billing, on React, Express and MongoDB.` },
  { h: 'Data products from public data', p: `A <a href="${GH}/Data-Scraper" target="_blank" rel="noopener">web scraper</a> that exports to Google Sheets, and an <a href="${GH}/MGNREGA-District-Dashboard" target="_blank" rel="noopener">MGNREGA dashboard</a> that caches data.gov.in data in MongoDB.` },
];

export const BADGES = [
  { issuer: 'DS2S', tier: 'Winner', title: 'International Hackathon', icon: 'trophy', c: '#E2A814', on: '#241A00', code: 'AP-001', head: 'Winner', body: 'Won the DS2S International Hackathon in AI and software engineering.' },
  { issuer: 'SIH', tier: 'Finalist', title: 'Smart India Hackathon', icon: 'flag', c: '#FF7A1A', on: '#2A1200', code: 'AP-002', head: 'Finalist team', body: 'Built DocuSentinel for problem statement 26188 from the Ministry of Home Affairs: an AI screen for fake identity documents.', link: ['See DocuSentinel', `${GH}/DocuSentinel`] },
  { issuer: 'GDG', tier: 'Program', title: 'Google Developer Groups', icon: 'brackets', c: '#2E9D5B', on: '#FFFFFF', code: 'AP-003', head: 'Program achievement', body: 'Recognised in a Google Developer Groups community program.' },
  { issuer: 'IBM', tier: 'Certified', title: 'AI and machine learning', icon: 'chip', c: '#3046FF', on: '#FFFFFF', code: 'AP-004', head: 'AI/ML certification', body: 'AI and machine learning certification from IBM.' },
  { issuer: 'Cisco', tier: 'Certified', title: 'AI and machine learning', icon: 'network', c: '#0FA3B1', on: '#FFFFFF', code: 'AP-005', head: 'AI/ML certification', body: 'AI and machine learning certification from Cisco.' },
  { issuer: 'PyPI', tier: 'Publisher', title: 'ytascii-player package', icon: 'cube', c: '#7B5BD6', on: '#FFFFFF', code: 'AP-006', head: 'Published package', body: 'Shipped ytascii-player to PyPI. Over 100 installs in its latest month.', link: ['View on GitHub', `${GH}/YT-ASCII-PLAYER`] },
] as const;

export const ICONS: Record<string, string> = {
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4"/><path d="M12 13v4M8.5 20h7M10 17h4"/>',
  flag: '<path d="M6 21V4"/><path d="M6 4h11l-2 4 2 4H6"/><circle cx="11" cy="8" r="1.4"/>',
  brackets: '<path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/><path d="M13.5 4l-3 16"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  network: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="13" r="2"/><path d="M12 7v4M10.4 14.2l-3.8 2.6M13.6 14.2l3.8 2.6"/>',
  cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
};

export const CLUSTERS: Record<string, { k: string; name: string; x: number; y: number }> = {
  agents: { k: 'k-agents', name: 'Agents and LLMs', x: 60, y: 66 },
  ret: { k: 'k-ret', name: 'Retrieval', x: 400, y: 66 },
  vis: { k: 'k-vis', name: 'Vision', x: 725, y: 66 },
  sp: { k: 'k-sp', name: 'Speech', x: 545, y: 312 },
  be: { k: 'k-be', name: 'Backend', x: 60, y: 362 },
  data: { k: 'k-data', name: 'Data', x: 360, y: 405 },
  lang: { k: 'k-lang', name: 'Languages', x: 775, y: 395 },
};

export const SKILLS: [string, number, number, string][] = [
  ['LangGraph', 160, 130, 'agents'], ['LangChain', 250, 112, 'agents'], ['AWS Bedrock', 120, 195, 'agents'], ['Function calling', 255, 178, 'agents'],
  ['Guardrails', 190, 250, 'agents'], ['Prompt design', 300, 232, 'agents'], ['Groq', 80, 138, 'agents'], ['MCP', 80, 262, 'agents'],
  ['Pinecone', 430, 128, 'ret'], ['Qdrant', 515, 110, 'ret'], ['FAISS', 545, 172, 'ret'], ['Knowledge graphs', 430, 205, 'ret'], ['Sentence Transformers', 395, 250, 'ret'],
  ['YOLOv8', 760, 128, 'vis'], ['ByteTrack', 845, 112, 'vis'], ['BoxMOT', 905, 165, 'vis'], ['OpenCV', 725, 190, 'vis'], ['FaceNet', 800, 235, 'vis'], ['Kalman filter', 890, 225, 'vis'], ['Person Re-ID', 840, 282, 'vis'],
  ['Whisper', 590, 345, 'sp'], ['Twilio Voice', 665, 380, 'sp'], ['Streaming STT', 555, 400, 'sp'],
  ['FastAPI', 110, 405, 'be'], ['Docker', 200, 395, 'be'], ['Kubernetes', 240, 455, 'be'], ['CI/CD', 140, 475, 'be'], ['Redis', 75, 520, 'be'], ['React', 230, 525, 'be'],
  ['PostgreSQL', 400, 440, 'data'], ['MongoDB', 470, 495, 'data'], ['SQL', 380, 515, 'data'], ['ETL pipelines', 300, 555, 'data'],
  ['Python', 780, 440, 'lang'], ['TypeScript', 860, 475, 'lang'], ['JavaScript', 900, 420, 'lang'], ['Java', 790, 515, 'lang'], ['C/C++', 880, 535, 'lang'],
];
