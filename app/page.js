'use client';

import { useEffect, useRef, useState, useId } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
  MapPin,
  ChevronDown,
  Monitor,
  Search,
  Sparkles,
  Megaphone,
  Code2,
  ThumbsUp,
  Image as ImageIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  DATA — edit copy / links here, the page is generated from these    */
/* ------------------------------------------------------------------ */

const WHATSAPP_NUMBER = '918789698369';
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const WHATSAPP = waLink(
  'Hello, COSMIC Innovation! I would like to enquire about a software development requirement. Could you please provide more details?'
);

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Results', href: '#results' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const HERO_STATS = [
  { value: 5, suffix: '+', label: 'Years in orbit' },
  { value: 50, suffix: '+', label: 'Missions shipped' },
  { value: 90, suffix: '%', label: 'Client retention' },
  { value: 99.9, suffix: '%', label: 'Uptime delivered' },
];

const WHY_US = [
  { title: 'End-to-end delivery', body: 'One team owns the build from first sketch to production deploy — no handoffs, no dropped context.' },
  { title: 'Senior engineering', body: 'Every project is led by engineers who have shipped SaaS products at scale, not a junior bench learning on your budget.' },
  { title: 'Built for your city', body: 'We design for the realities of tier-2 and tier-3 India — patchy bandwidth, mobile-first users, regional payment rails.' },
  { title: 'Secure by default', body: 'Every build ships with hardened auth, encrypted data paths, and monitoring — security is a default, not an add-on.' },
];

/* Core service line-up — this is the business now: growth &amp; visibility,
   not just websites. Each one gets a quick-glance card AND a full
   deep-dive showcase (with a slot for a real result GIF) further down. */
const CORE_SERVICES = [
  {
    id: 'websites',
    code: '01',
    category: 'Foundation',
    title: 'Custom Websites',
    tagline: 'Modern. Fast. Responsive.',
    description:
      'A site engineered to convert on the first scroll — not a template with your logo dropped on it.',
    stat: { value: 189, suffix: '%', label: 'Avg. business growth' },
    icon: Monitor,
    chrome: 'browser',
    media: 'custom-website-demo.gif',
    mediaLabel: 'Drop custom-website-demo.gif into /public',
  },
  {
    id: 'seo',
    code: '02',
    category: 'Visibility',
    title: 'Google SEO & Ranking',
    tagline: 'Rank Higher. Get Found.',
    description:
      'We move a business from page three of Google to the top of the map pack — and keep it there.',
    stat: { value: 327, suffix: '%', label: 'Organic traffic' },
    icon: Search,
    chrome: 'browser',
    media: 'seo-ranking-demo.gif',
    mediaLabel: 'Drop seo-ranking-demo.gif into /public',
  },
  {
    id: 'ai-seo',
    code: '03',
    category: 'Visibility',
    title: 'AI & LLM Search Visibility',
    tagline: 'Show up inside the answer.',
    description:
      'Search is moving from ten blue links to one AI answer. We get your business named inside it — on Gemini, ChatGPT, and Perplexity.',
    stat: { value: 98, suffix: '%', label: 'Answer match accuracy' },
    icon: Sparkles,
    chrome: 'chat',
    media: 'gemini-ai-result-demo.gif',
    mediaLabel: 'Drop gemini-ai-result-demo.gif into /public',
    badge: 'New',
  },
  {
    id: 'marketing',
    code: '04',
    category: 'Growth',
    title: 'Digital Marketing',
    tagline: 'Reach Right. Convert More.',
    description: 'Campaigns aimed at the customer already looking to buy — not everyone scrolling past.',
    stat: { value: 215, suffix: '%', label: 'Qualified leads' },
    icon: Megaphone,
    chrome: 'browser',
    media: 'digital-marketing-demo.gif',
    mediaLabel: 'Drop digital-marketing-demo.gif into /public',
  },
  {
    id: 'tech',
    code: '05',
    category: 'Infrastructure',
    title: 'Innovative Tech Solutions',
    tagline: 'Automate. Scale. Dominate.',
    description:
      'Custom software and automation that replaces spreadsheets and manual work with systems that run themselves.',
    stat: { value: 40, suffix: '%', label: 'Faster operations' },
    icon: Code2,
    chrome: 'card',
    media: 'tech-automation-demo.gif',
    mediaLabel: 'Drop tech-automation-demo.gif into /public',
  },
  {
    id: 'social',
    code: '06',
    category: 'Growth',
    title: 'Social Media Management',
    tagline: 'Engage. Grow. Succeed.',
    description: 'Consistent, on-brand content and community management that turns followers into paying customers.',
    stat: { value: 3, suffix: 'x', label: 'Engagement growth' },
    icon: ThumbsUp,
    chrome: 'phone',
    media: 'social-media-demo.gif',
    mediaLabel: 'Drop social-media-demo.gif into /public',
  },
];

const APPROACH_METRICS = [
  { value: 40, suffix: '%', label: 'Faster time to market', body: 'Lean scoping and reusable systems get you live sooner.' },
  { value: 100, suffix: '+', label: 'Technologies in rotation', body: 'We pick the right stack for the job, not the familiar one.' },
  { value: 110, suffix: '%', label: 'Client satisfaction', body: 'We build past the brief when the product calls for it.' },
  { value: 24, suffix: '/7', label: 'Support & monitoring', body: 'Uptime alerts and a real human on the other end of WhatsApp.' },
];

const TECH_DATA = [
  { id: 'uiux', title: 'UI / UX Design', tools: ['Figma', 'Sketch', 'Zeplin', 'Adobe XD', 'InVision', 'Axure RP'] },
  { id: 'backend', title: 'Backend Development', tools: ['Node.js', 'Python', 'Microservices', 'Django', 'Spring', 'FastAPI'] },
  { id: 'mobile', title: 'Mobile Development', tools: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Xamarin', 'Ionic'] },
  { id: 'database', title: 'Database Solutions', tools: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'SQLite'] },
  { id: 'cloud', title: 'Cloud Solutions', tools: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform'] },
  { id: 'devops', title: 'DevOps', tools: ['Jenkins', 'GitLab', 'Ansible', 'Prometheus', 'Grafana', 'Terraform'] },
  { id: 'ai', title: 'AI & Machine Learning', tools: ['TensorFlow', 'PyTorch', 'Keras', 'OpenCV', 'Scikit-Learn', 'NumPy'] },
  { id: 'security', title: 'Security', tools: ['OWASP', 'HashiCorp Vault', 'SonarQube', 'Burp Suite', 'Nmap', 'Metasploit'] },
];

const PROCESS = [
  { stage: '01', title: 'Discovery', body: 'We map the problem, the users, and the constraints before a line of code is written.' },
  { stage: '02', title: 'Planning', body: 'A documented roadmap and scope — so you know exactly what ships and when.' },
  { stage: '03', title: 'Design', body: 'Interfaces built around how your users actually work, not a generic template.' },
  { stage: '04', title: 'Development', body: 'Designs become working software, reviewed and tested as we build — not after.' },
  { stage: '05', title: 'Testing', body: 'Real-device QA and load checks before anything reaches production.' },
  { stage: '06', title: 'Maintenance', body: 'Monitoring, fixes, and iteration once the product is live and earning.' },
];

const PORTFOLIO = [
  { name: 'IELTSAppeal', domain: 'ieltsappeal.in', category: 'IELTS Preparation & Resources', url: 'https://ieltsappeal.in/' },
  { name: 'Samarth Clinics', domain: 'samarthclinics.com', category: 'Physiotherapy Services', url: 'https://samarthclinics.com/' },
  { name: 'RIA Institute', domain: 'riainstitute.co.in', category: 'IT Training', url: 'https://riainstitute.co.in/' },
  { name: 'YYC Flooring', domain: 'yycflooring.ca', category: 'Interior Designing', url: 'https://yycflooring.ca/' },
  { name: 'Kashi IT College', domain: 'kashiit.ac.in', category: 'Graduation & Masters Programs', url: 'https://www.kashiit.ac.in/' },
  { name: 'RSK Public School', domain: 'rskpublicschool.com', category: 'School & Education', url: 'https://rskpublicschool.com/' },
];

/* Client proof — real companies, real results. Swap the "media" gif
   whenever you have a screen-recording of that client's dashboard,
   ranking, or booking numbers. */
const TESTIMONIALS = [
  {
    name: 'IELTSAppeal',
    domain: 'ieltsappeal.in',
    url: 'https://ieltsappeal.in/',
    quote: 'Students find our appeal guides before they find our competitors — organic traffic hasn\u2019t stopped climbing since launch.',
    stat: { value: 240, suffix: '%', label: 'Organic sessions, 6 months' },
    media: 'testimonial-ieltsappeal.gif',
  },
  {
    name: 'Samarth Clinics',
    domain: 'samarthclinics.com',
    url: 'https://samarthclinics.com/',
    quote: 'Online bookings used to be an afterthought. Now they\u2019re how most new patients reach us.',
    stat: { value: 180, suffix: '%', label: 'Online appointment bookings' },
    media: 'testimonial-samarth.gif',
  },
  {
    name: 'RIA Institute',
    domain: 'riainstitute.co.in',
    url: 'https://riainstitute.co.in/',
    quote: 'We rank first for every course we teach in our city — enquiries arrive before we even run an ad.',
    stat: { value: 3, suffix: 'x', label: 'Enrollment enquiries' },
    media: 'testimonial-ria.gif',
  },
  {
    name: 'Kashi IT College',
    domain: 'kashiit.ac.in',
    url: 'https://www.kashiit.ac.in/',
    quote: 'Being the top Google result for \u201cIT college near me\u201d changed how many students walk through our door.',
    stat: { value: 1, suffix: 'st', label: 'Google ranking, local search' },
    media: 'testimonial-kashi.gif',
  },
  {
    name: 'RSK Public School',
    domain: 'rskpublicschool.com',
    url: 'https://rskpublicschool.com/',
    quote: 'Admission season used to mean a flood of phone calls. Now most parents apply directly through the site.',
    stat: { value: 90, suffix: '%', label: 'Admission forms submitted online' },
    media: 'testimonial-rsk.gif',
  },
];

const INDUSTRIES = [
  { title: 'Education', body: 'Learning platforms, school websites, and admin tools built for how Indian institutions actually operate.' },
  { title: 'Real Estate', body: 'Listing, CRM, and lead-capture systems that turn site visits into site visits.' },
  { title: 'Finance', body: 'Secure, auditable software for transactions, records, and reporting.' },
  { title: 'Healthcare', body: 'Patient-facing and clinical tools that respect both compliance and bedside reality.' },
  { title: 'E-Commerce', body: 'Storefronts and checkout flows tuned for conversion, not just aesthetics.' },
  { title: 'Logistics', body: 'Tracking, dispatch, and supply-chain software built for messy, real-world routes.' },
];

/* ------------------------------------------------------------------ */
/*  MOTION HELPERS                                                      */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

function Reveal({ children, className = '', as = 'div', ...props }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      variants={reduce ? {} : fadeUp}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, amount: 0.25 }}
      {...props}
    >
      {children}
    </Comp>
  );
}

function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.3em] uppercase text-cyan-300/90">
      <span className="h-[6px] w-[6px] rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
      {children}
    </span>
  );
}

function GlowPanel({ className = '', children }) {
  return (
    <div className={`group relative rounded-2xl p-[1px] ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 via-blue-500/0 to-fuchsia-500/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-400/60 group-hover:via-blue-500/40 group-hover:to-fuchsia-500/60 group-hover:opacity-100" />
      <div className="relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}

function GlowButton({ href, children, icon = '🚀' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex items-stretch overflow-hidden rounded-xl p-[1.5px] shadow-[0_0_25px_-6px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_40px_-4px_rgba(168,85,247,0.65)]"
      style={{ backgroundImage: 'linear-gradient(135deg,#22d3ee,#3b82f6,#a855f7)' }}
    >
      <span className="flex items-stretch divide-x divide-white/10 rounded-[10px] bg-[#040610]">
        <span className="flex items-center justify-center px-4 text-lg">{icon}</span>
        <span className="flex items-center px-6 py-3.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-white">
          {children}
        </span>
      </span>
    </a>
  );
}

function CountUp({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Animated ring gauge — used for percentage-style stats so proof reads
   as a graphic first, a number second. */
function RadialGauge({ value, label, size = 116 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `gauge-${rawId}`;
  const radius = size / 2 - 9;
  const circumference = 2 * Math.PI * radius;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradId})`}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference * (1 - (reduce ? 1 : value / 100)) } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-white">
          <CountUp value={value} suffix="%" />
        </div>
      </div>
      <span className="mt-3 max-w-[9rem] text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-white/40">
        {label}
      </span>
    </div>
  );
}

/* Ambient rising bar-chart — pure decoration that still tells the truth:
   a growth trend, revealed only once it's scrolled into view. */
function GrowthBars({ className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const points = [28, 42, 38, 58, 70, 100];
  return (
    <div ref={ref} className={`flex h-20 items-end gap-1.5 ${className}`}>
      {points.map((p, i) => (
        <motion.div
          key={i}
          className="w-2.5 rounded-t-sm bg-gradient-to-t from-cyan-400/40 to-fuchsia-400/80"
          initial={{ height: 0 }}
          animate={inView ? { height: `${p}%` } : {}}
          transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

/* A "browser / chat / phone" mockup frame with a slot for a real GIF.
   Drop a matching file into /public and it renders automatically; until
   then it shows a quiet placeholder instead of a broken-image icon. */
function MediaFrame({ src, alt = '', chrome = 'browser', label, className = '' }) {
  const [broken, setBroken] = useState(!src);
  const isPhone = chrome === 'phone';

  return (
    <div className={`relative ${isPhone ? 'mx-auto max-w-[230px]' : ''} ${className}`}>
      <div
        className={`overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_0_60px_-24px_rgba(34,211,238,0.45)] ${isPhone ? 'rounded-[2rem] border-[6px]' : ''
          }`}
      >
        {chrome === 'browser' && (
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-white/35">
              google.com/search
            </span>
          </div>
        )}
        {chrome === 'chat' && (
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
            <Sparkles size={12} className="text-cyan-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">AI Assistant</span>
          </div>
        )}

        <div className={`relative w-full bg-gradient-to-br from-white/[0.04] to-transparent ${isPhone ? 'aspect-[9/17]' : 'aspect-video'}`}>
          {!broken && src && (
            <img src={src} alt={alt} onError={() => setBroken(true)} className="h-full w-full object-cover" />
          )}
          {(broken || !src) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/30">
                <ImageIcon size={16} />
              </span>
              <p className="max-w-[15rem] font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-white/30">
                {label || 'Demo coming soon'}
              </p>
            </div>
          )}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ repeat: Infinity, duration: 3.4, ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LOGO MARK — orbit ring, matches the brand identity                 */
/* ------------------------------------------------------------------ */

function CosmicMark({ size = 44, className = '' }) {
  return (
    <img
      src="/nonacadlogo.png"
      alt="Cosmic Innovation Lab Logo"
      className={`shrink-0 object-contain ${className}`}
      style={{ height: size, width: 'auto', maxHeight: size }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  AMBIENT PARTICLE FIELD — full-page starfield background            */
/* ------------------------------------------------------------------ */

function ParticleField() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let stars = [];
    let w, h, dpr;

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        s: Math.random() * 0.4 + 0.1,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.5 ? '34,211,238' : '168,85,247',
      }));
    };

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.01;
      stars.forEach((star) => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.s * 4 + star.phase);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.hue},${0.15 + twinkle * 0.55})`;
        ctx.fill();
        if (!reduce) star.y -= star.s * 0.06;
        if (star.y < -4) star.y = h + 4;
      });
      raf = requestAnimationFrame(draw);
    };

    setup();
    draw();
    window.addEventListener('resize', setup);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setup);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />;
}

/* ------------------------------------------------------------------ */
/*  NETWORK GLOBE — hero visual, rotating point-cloud sphere            */
/* ------------------------------------------------------------------ */

function NetworkGlobe() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w, h, dpr, R;

    const N = 130;
    const points = [];
    const offset = 2 / N;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * increment;
      points.push([Math.cos(phi) * r, y, Math.sin(phi) * r]);
    }

    const edges = [];
    for (let i = 0; i < points.length; i++) {
      let best = [];
      for (let j = 0; j < points.length; j++) {
        if (i === j) continue;
        const [ax, ay, az] = points[i];
        const [bx, by, bz] = points[j];
        const d = Math.hypot(ax - bx, ay - by, az - bz);
        best.push([j, d]);
      }
      best.sort((a, b) => a[1] - b[1]);
      best.slice(0, 2).forEach(([j, d]) => {
        if (d < 0.42) edges.push([i, j]);
      });
    }

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.42;
    };

    let theta = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      if (!reduce) theta += 0.0032;

      const projected = points.map(([x, y, z]) => {
        const rx = x * Math.cos(theta) - z * Math.sin(theta);
        const rz = x * Math.sin(theta) + z * Math.cos(theta);
        const perspective = 2.6;
        const scale = perspective / (perspective + rz);
        return { sx: cx + rx * R * scale, sy: cy + y * R * scale, z: rz };
      });

      ctx.lineWidth = 1;
      edges.forEach(([i, j]) => {
        const a = projected[i];
        const b = projected[j];
        const avgZ = (a.z + b.z) / 2;
        if (avgZ < -0.15) return;
        const alpha = 0.05 + Math.max(0, avgZ) * 0.35;
        ctx.strokeStyle = `rgba(80,170,255,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      });

      projected.forEach((p) => {
        const front = (p.z + 1) / 2;
        const radius = 0.9 + front * 1.6;
        const isNode = front > 0.85;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, isNode ? radius * 1.8 : radius, 0, Math.PI * 2);
        ctx.fillStyle = isNode ? `rgba(34,211,238,${0.55 + front * 0.45})` : `rgba(168,140,255,${0.25 + front * 0.5})`;
        if (isNode) {
          ctx.shadowColor = 'rgba(34,211,238,0.9)';
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      const rimGrad = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      rimGrad.addColorStop(0, 'rgba(34,211,238,0.55)');
      rimGrad.addColorStop(0.5, 'rgba(59,130,246,0.12)');
      rimGrad.addColorStop(1, 'rgba(168,85,247,0.5)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.01, -2.4, -0.6);
      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 2;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    setup();
    draw();
    window.addEventListener('resize', setup);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setup);
    };
  }, [reduce]);

  return (
    <div className="relative aspect-square w-full max-w-lg">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 via-blue-600/10 to-fuchsia-600/25 blur-3xl" />
      <canvas ref={canvasRef} className="relative h-full w-full" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SMOKE TRAIL — a lightweight canvas particle system simulating real  */
/*  smoke physics: continuous emission along the cursor's path, rising  */
/*  buoyancy, turbulent sway, diffusion (growth + softening), and a     */
/*  smooth fade — plus a few ambient "vents" that puff on their own.    */
/* ------------------------------------------------------------------ */

function SmokeCanvas({ containerRef }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    const container = containerRef?.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');

    let w, h, dpr;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const MAX_PARTICLES = 260;
    let particles = [];
    let lastX = w / 2;
    let lastY = h / 2;
    let hasLast = false;
    let lastMoveT = performance.now();
    let hueClock = 0;

    const spawnAt = (x, y, vxBias, vyBias, count) => {
      hueClock += 1;
      const hue = 245 + Math.sin(hueClock * 0.045) * 75;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: vxBias * 0.16 + (Math.random() - 0.5) * 0.5,
          vy: vyBias * 0.16 + (Math.random() - 0.5) * 0.5 - 0.3,
          r: 4 + Math.random() * 5,
          age: 0,
          maxAge: 1700 + Math.random() * 1300,
          hue: hue + (Math.random() - 0.5) * 18,
          sway: Math.random() * Math.PI * 2,
          swaySpeed: 0.0016 + Math.random() * 0.0018,
        });
      }
      if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
    };

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!hasLast) {
        lastX = x;
        lastY = y;
        hasLast = true;
      }
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.min(8, Math.max(1, Math.floor(dist / 7)));
      for (let s = 1; s <= steps; s++) {
        spawnAt(lastX + (dx * s) / steps, lastY + (dy * s) / steps, dx / steps, dy / steps, 2);
      }
      lastX = x;
      lastY = y;
      lastMoveT = performance.now();
    };
    container.addEventListener('mousemove', onMove);

    const idleTimer = setInterval(() => {
      if (hasLast && performance.now() - lastMoveT > 200) spawnAt(lastX, lastY, 0, -1, 1);
    }, 260);

    const VENTS = [
      { x: () => w * 0.12, y: () => h * 0.85 },
      { x: () => w * 0.5, y: () => h * 0.9 },
      { x: () => w * 0.88, y: () => h * 0.82 },
    ];
    let ventTimeout;
    const scheduleVent = () => {
      ventTimeout = setTimeout(() => {
        const v = VENTS[Math.floor(Math.random() * VENTS.length)];
        spawnAt(v.x(), v.y(), (Math.random() - 0.5) * 1.2, -1, 6);
        scheduleVent();
      }, 2600 + Math.random() * 2400);
    };
    scheduleVent();

    let raf;
    let last = performance.now();
    const draw = (now) => {
      const dt = Math.min(40, now - last);
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((p) => {
        p.age += dt;
        p.sway += p.swaySpeed * dt;
        p.vy -= 0.00075 * dt;
        p.vx += Math.sin(p.sway) * 0.006 * dt;
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        const t = p.age / p.maxAge;
        const radius = p.r + Math.sqrt(p.age) * 0.9;
        const fadeIn = Math.min(1, p.age / 160);
        const fadeOut = Math.pow(Math.max(0, 1 - t), 1.4);
        const alpha = 0.5 * fadeIn * fadeOut;

        if (alpha > 0.012) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
          g.addColorStop(0, `hsla(${p.hue},90%,70%,${alpha})`);
          g.addColorStop(1, `hsla(${p.hue},90%,60%,0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      particles = particles.filter((p) => p.age < p.maxAge);
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(idleTimer);
      clearTimeout(ventTimeout);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMove);
    };
  }, [reduce, containerRef]);

  if (reduce) return null;

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" style={{ mixBlendMode: 'screen' }} />;
}

/* ------------------------------------------------------------------ */
/*  SERVICE SHOWCASE — one full-bleed deep-dive per service, alternating */
/*  sides, each with a slot for a real result GIF and a small animated  */
/*  proof graphic (ring gauge or growth bars) instead of more copy.     */
/* ------------------------------------------------------------------ */

function ServiceShowcase({ service, index }) {
  const reverse = index % 2 === 1;
  const useGauge = service.stat.suffix === '%' && service.stat.value <= 100;

  return (
    <div id={`service-${service.id}`} className="relative border-t border-white/10 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className={reverse ? 'lg:order-2' : ''}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.15em] text-fuchsia-300">
                /{service.code} — {service.category}
              </span>
              {service.badge && (
                <span className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-cyan-300">
                  {service.badge}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <service.icon size={20} />
              </span>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{service.title}</h3>
            </div>

            <p className="mt-3 font-semibold text-white/80">{service.tagline}</p>
            <p className="mt-4 max-w-md leading-relaxed text-white/55">{service.description}</p>

            <div className="mt-8 flex flex-wrap items-end gap-8">
              {useGauge ? (
                <RadialGauge value={service.stat.value} label={service.stat.label} />
              ) : (
                <div>
                  <div className="font-display text-4xl font-bold text-gradient">
                    <CountUp value={service.stat.value} suffix={service.stat.suffix} />
                  </div>
                  <div className="mt-1 max-w-[9rem] font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-white/40">
                    {service.stat.label}
                  </div>
                </div>
              )}
              <GrowthBars className="hidden sm:flex" />
            </div>

            <a
              href={waLink(`Hello, COSMIC Innovation! I'd like to talk about ${service.title}.`)}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-cyan-300 transition-colors hover:text-fuchsia-300"
            >
              Ask about this <ArrowUpRight size={14} />
            </a>
          </Reveal>

          <Reveal className={reverse ? 'lg:order-1' : ''}>
            <MediaFrame
              src={service.media ? `/${service.media}` : undefined}
              chrome={service.chrome}
              label={service.mediaLabel}
              alt={`${service.title} result demo`}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTech, setActiveTech] = useState(TECH_DATA[0].id);
  const [spot, setSpot] = useState({ x: 50, y: 30 });
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const trajectoryY = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 90,
    damping: 24,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      setSpot({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-[#040610] font-body text-white antialiased selection:bg-fuchsia-500/40 selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        html {
          scroll-behavior: smooth;
          background: #040610;
        }
        section[id],
        div[id^='service-'] {
          scroll-margin-top: 88px;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
        ::selection {
          background: #a855f7;
          color: #fff;
        }
        .font-display {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        }
        .font-brand {
          font-family: 'Playfair Display', serif;
        }
        .font-body {
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
        }
        .font-mono {
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
        }
        .text-gradient {
          background-image: linear-gradient(90deg, #22d3ee 0%, #3b82f6 45%, #a855f7 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* ambient nebula glows */}
      <div className="pointer-events-none fixed -top-56 left-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[160px]" />
      <div className="pointer-events-none fixed top-[40vh] -left-40 h-[420px] w-[420px] rounded-full bg-fuchsia-600/15 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none fixed inset-0">
        <ParticleField />
      </div>

      {/* signature trajectory scroll-line */}
      <div className="pointer-events-none fixed right-6 top-0 z-40 hidden h-full w-px lg:block">
        <div className="absolute inset-y-24 right-0 w-px bg-white/10" />
        <motion.div style={{ height: trajectoryY }} className="absolute right-0 top-24 w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-fuchsia-500" />
        <motion.div
          style={{ top: trajectoryY }}
          className="absolute right-0 -mt-24 h-2.5 w-2.5 -translate-x-1/2 translate-y-24 rounded-full bg-cyan-300 shadow-[0_0_16px_4px_rgba(34,211,238,0.8)]"
        />
      </div>

      {/* ---------------------------------------------------------- NAV */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'border-b border-white/10 bg-[#040610]/80 backdrop-blur-md' : 'bg-transparent'}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <a href="#home" className="flex items-center gap-3">
            <CosmicMark size={38} />
            <span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text font-brand text-lg italic leading-none text-transparent">
                CosmicInnovationlab
              </span>
              <span className="mt-1 hidden font-mono text-[9px] tracking-[0.3em] text-white/50 sm:block">INNOVATE &bull; BUILD &bull; GROW</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="font-mono text-xs uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-cyan-300">
                {l.label}
              </a>
            ))}
            <GlowButton href={WHATSAPP} icon="🚀">
              Dominate
            </GlowButton>
          </div>

          <button onClick={() => setMenuOpen((v) => !v)} className="text-white md:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-white/10 bg-[#040610] md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-6">
                {NAV_LINKS.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-3 font-mono text-sm uppercase tracking-[0.15em] text-white">
                    {l.label}
                  </a>
                ))}
                <div className="mt-5">
                  <GlowButton href={WHATSAPP} icon="🚀">
                    Let&rsquo;s dominate
                  </GlowButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ---------------------------------------------------------- HERO */}
      <section id="home" ref={heroRef} className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
        <SmokeCanvas containerRef={heroRef} />
        <div
          className="pointer-events-none absolute inset-0 opacity-70 transition-[background] duration-300"
          style={{ background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(59,130,246,0.14), transparent 60%)` }}
        />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <Eyebrow>Sasaram, Bihar — building for tier-2/3 India</Eyebrow>
            </Reveal>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="mt-6 font-display text-[3rem] font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-[4.4rem]"
            >
              Your business.
              <br />
              <span className="text-gradient">Everywhere.</span>
            </motion.h1>

            <Reveal as="p" className="mt-6 max-w-xl text-lg font-semibold text-white/90 sm:text-xl">
              Highly convertible websites &amp; digital solutions.
            </Reveal>

            <Reveal as="p" className="mt-4 max-w-xl leading-relaxed text-white/55">
              Expand your business to reach your perfect customer with high accuracy — engineered
              with senior talent, priced for founders outside the metros.
            </Reveal>

            <Reveal as="p" className="mt-4 font-semibold text-fuchsia-300">
              Let&rsquo;s dominate the market.
            </Reveal>

            <Reveal className="mt-8 flex flex-wrap items-center gap-4">
              <GlowButton href={WHATSAPP} icon="🚀">
                Let&rsquo;s dominate
              </GlowButton>
              <a href="#work" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-white/80 transition-colors hover:border-cyan-300/60 hover:text-cyan-300">
                View our work
              </a>
            </Reveal>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4"
            >
              {HERO_STATS.map((s) => (
                <motion.div key={s.label} variants={fadeUp}>
                  <div className="font-display text-3xl font-bold text-gradient">
                    <CountUp value={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Reveal className="relative mx-auto hidden lg:flex lg:items-center lg:justify-center">
            <NetworkGlobe />

            {/* Floating proof card — drop hero-seo-result.gif into /public.
                Shows a real client's keyword climbing to the top of Google. */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -right-6 w-64"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
                <MediaFrame
                  src="/hero-seo-result.gif"
                  chrome="browser"
                  alt="Live client Google search ranking"
                  label="Drop hero-seo-result.gif into /public"
                />
              </motion.div>
              <span className="mt-2 block text-center font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">
                Live client keyword ranking
              </span>
            </motion.div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- ABOUT */}
      <section id="about" className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>About</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            A technology partner built for how your business actually operates.
          </Reveal>
          <Reveal as="p" className="mt-5 max-w-2xl leading-relaxed text-white/55">
            We&rsquo;re a small, senior team that treats every engagement like it&rsquo;s our own
            product — from first-time founders shipping an MVP to institutions replacing paper
            processes with software they&rsquo;ll actually use.
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {WHY_US.map((item, i) => (
              <Reveal key={item.title} transition={{ duration: 0.6, delay: i * 0.06 }}>
                <GlowPanel>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                    <Check size={16} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{item.body}</p>
                </GlowPanel>
              </Reveal>
            ))}
          </div>

          <Reveal className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-transparent to-fuchsia-500/10 p-8">
            <p className="font-brand text-xl italic leading-relaxed text-white sm:text-2xl">
              &ldquo;Great software is built by people who stay accountable after the invoice is
              paid.&rdquo;
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-cyan-300/80">— CosmicInnovationlab, Flight Log</p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- SERVICES (quick glance) */}
      <section id="services" className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Reveal>
                <Eyebrow>What we do</Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                We don&rsquo;t just build websites. We build businesses that get found.
              </Reveal>
              <Reveal as="p" className="mt-4 max-w-xl leading-relaxed text-white/55">
                A website is the starting point. The real work is making sure customers, Google,
                and AI assistants all find you first.
              </Reveal>
            </div>
            <Reveal>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-cyan-300">
                Discuss your scope <ArrowUpRight size={14} />
              </a>
            </Reveal>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((s) => (
              <motion.div key={s.id} variants={fadeUp}>
                <a href={`#service-${s.id}`} className="block h-full">
                  <GlowPanel className="h-full">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                        <s.icon size={18} />
                      </span>
                      {s.badge && (
                        <span className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-cyan-300">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-fuchsia-300/90">{s.tagline}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{s.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 transition-colors group-hover:text-cyan-300">
                      See the proof <ArrowUpRight size={11} />
                    </span>
                  </GlowPanel>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- SERVICE DEEP-DIVES */}
      {CORE_SERVICES.map((service, i) => (
        <ServiceShowcase key={service.id} service={service} index={i} />
      ))}

      {/* ---------------------------------------------------------- APPROACH */}
      <section className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Approach</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Scalable, user-centric, and tuned for performance from day one.
          </Reveal>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {APPROACH_METRICS.map((m) => (
              <motion.div key={m.label} variants={fadeUp}>
                <GlowPanel>
                  <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                    <CountUp value={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white">{m.label}</div>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{m.body}</p>
                </GlowPanel>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- TECHNOLOGY */}
      <section className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Stack</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            We choose the right tool for the job, not the familiar one.
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
              {TECH_DATA.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTech(t.id)}
                  className={`rounded-lg border px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.1em] transition-colors ${activeTech === t.id ? 'border-cyan-300/60 bg-cyan-400/10 text-cyan-300' : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white'
                    }`}
                >
                  {t.title}
                </button>
              ))}
            </div>

            <div className="relative min-h-[260px] rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <AnimatePresence mode="wait">
                <motion.div key={activeTech} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                  <h3 className="font-display text-xl font-semibold text-white">{TECH_DATA.find((t) => t.id === activeTech)?.title}</h3>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {TECH_DATA.find((t) => t.id === activeTech)?.tools.map((tool) => (
                      <span key={tool} className="rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-xs text-white/60">
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- PROCESS */}
      <section id="process" className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Flight path</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Six stages from first call to launch day.
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-cyan-400/40 via-blue-500/30 to-fuchsia-500/40 sm:block" />
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-6">
              {PROCESS.map((p) => (
                <motion.div key={p.stage} variants={fadeUp} className="relative">
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/60 bg-[#040610] shadow-[0_0_14px_2px_rgba(34,211,238,0.4)]">
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  </div>
                  <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-fuchsia-300">Stage {p.stage}</div>
                  <h3 className="mt-1 font-display text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{p.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- PORTFOLIO */}
      <section id="work" className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <Reveal>
                <Eyebrow>Deployed</Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Live systems, currently in production.
              </Reveal>
            </div>
            <Reveal as="p" className="font-mono text-xs text-white/40">
              Portfolio last updated 21 Jun 2025
            </Reveal>
          </div>
        </div>

        <div className="mt-14 overflow-x-auto pb-4">
          <div className="mx-auto flex w-max max-w-7xl gap-4 px-6">
            {PORTFOLIO.map((p, i) => (
              <Reveal key={p.domain} transition={{ duration: 0.5, delay: i * 0.05 }} className="w-72 shrink-0">
                <GlowPanel className="h-full">
                  <div className="flex items-center gap-3">
                    <img src={`https://www.google.com/s2/favicons?domain=${p.domain}&sz=64`} alt="" className="h-9 w-9 rounded border border-white/10 bg-white/5 object-contain p-1" />
                    <div>
                      <h3 className="font-display text-base font-semibold text-white">{p.name}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-cyan-300/80">Live // {p.domain}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-white/50">{p.category}</p>
                  <a href={p.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/80 transition-colors hover:text-fuchsia-300">
                    Visit site <ArrowUpRight size={12} />
                  </a>
                </GlowPanel>
              </Reveal>
            ))}
            <div className="flex w-64 shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/40">
                More missions
                <br />
                in progress
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- RESULTS / TESTIMONIALS */}
      <section id="results" className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Proof, not promises</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Real businesses. Real ranking gains.
          </Reveal>
          <Reveal as="p" className="mt-4 max-w-xl leading-relaxed text-white/55">
            Every number below belongs to a client currently live — click through and see it for
            yourself.
          </Reveal>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.domain} variants={fadeUp} whileHover={{ y: -6 }}>
                <GlowPanel className="h-full">
                  <MediaFrame
                    src={t.media ? `/${t.media}` : undefined}
                    chrome="card"
                    label={`Drop ${t.media} into /public`}
                    alt={`${t.name} results snapshot`}
                    className="mb-5"
                  />
                  <p className="font-brand text-base italic leading-relaxed text-white/90">&ldquo;{t.quote}&rdquo;</p>

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-5">
                    <div>
                      <div className="font-display text-2xl font-bold text-gradient">
                        <CountUp value={t.stat.value} suffix={t.stat.suffix} />
                      </div>
                      <div className="mt-1 max-w-[8rem] font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-white/40">
                        {t.stat.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-sm font-semibold text-white">{t.name}</div>
                      <div className="font-mono text-[10px] text-cyan-300/80">{t.domain}</div>
                    </div>
                  </div>

                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/80 transition-colors hover:text-fuchsia-300"
                  >
                    Visit website <ArrowUpRight size={12} />
                  </a>
                </GlowPanel>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- INDUSTRIES */}
      <section className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Industries</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Sector-specific software, not generic templates.
          </Reveal>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <motion.div key={ind.title} variants={fadeUp}>
                <GlowPanel>
                  <h3 className="font-display text-lg font-semibold text-white">{ind.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{ind.body}</p>
                </GlowPanel>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- CTA */}
      <section className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Launch</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            Ready to <span className="text-gradient">dominate the market</span>?
          </Reveal>
          <Reveal as="p" className="mx-auto mt-5 max-w-xl leading-relaxed text-white/55">
            Tell us what you&rsquo;re building — an MVP, a school platform, a storefront — and
            we&rsquo;ll reply with next steps within one business day.
          </Reveal>
          <Reveal className="mt-9 flex justify-center">
            <GlowButton href={WHATSAPP} icon="🚀">
              Let&rsquo;s dominate
            </GlowButton>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- FOOTER */}
      <footer id="contact" className="relative border-t border-white/10 py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <CosmicMark size={36} />
            <div>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text font-brand text-lg italic text-transparent">
                CosmicInnovationlab
              </span>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/45">Software engineering for businesses across tier-2 and tier-3 India.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 font-mono text-sm">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/55 transition-colors hover:text-cyan-300">
              <MessageCircle size={15} /> +91 87896 98369
            </a>
            <a href="mailto:cosmosdigitalhelp@gmail.com" className="flex items-center gap-2 text-white/55 transition-colors hover:text-cyan-300">
              <Mail size={15} /> cosmosdigitalhelp@gmail.com
            </a>
            <span className="flex items-center gap-2 text-white/55">
              <MapPin size={15} /> Sasaram, Bihar, India
            </span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/35">© {new Date().getFullYear()} CosmicInnovationlab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}