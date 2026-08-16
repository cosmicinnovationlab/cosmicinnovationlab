import {
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
  Globe,
} from 'lucide-react';
import GlowButton from './components/GlowButton';

/* ------------------------------------------------------------------ */
/*  DATA — edit copy / links here, the page is generated from these    */
/* ------------------------------------------------------------------ */

const SITE_URL = 'https://cosmicinnovationlab.com';
const WHATSAPP_NUMBER = '918789698369';
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const WHATSAPP = waLink(
  'Hello, Cosmicinnovation Lab! I would like to enquire about your services. Could you please provide more details?'
);

// Last updated date — update this whenever the page content changes
const LAST_UPDATED = '2025-08-16';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Results', href: '#results' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const HERO_STATS = [
  { value: 100, suffix: '+', label: 'Projects Delivered' },
  { value: 60, suffix: '%+', label: 'Clients via Referral' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 24, suffix: '/7', label: 'Support & Monitoring' },
];

const WHY_US = [
  { title: 'End-to-end delivery', body: 'One team owns the build from first sketch to production deploy — no handoffs, no dropped context.' },
  { title: 'Senior engineering', body: 'Every project is led by engineers who have shipped SaaS products at scale, not a junior bench learning on your budget.' },
  { title: 'Built for your city', body: 'We design for the realities of tier-2 and tier-3 India — patchy bandwidth, mobile-first users, regional payment rails.' },
  { title: 'Secure by default', body: 'Every build ships with hardened auth, encrypted data paths, and monitoring — security is a default, not an add-on.' },
];

const CORE_SERVICES = [
  {
    id: 'websites',
    code: '01',
    category: 'Foundation',
    title: 'Custom Website Design & Development',
    tagline: 'Modern. Fast. Responsive.',
    description:
      'A site engineered to convert on the first scroll — not a template with your logo dropped on it. Built mobile-first with Core Web Vitals optimisation.',
    stat: { value: 189, suffix: '%', label: 'Avg. business growth' },
    icon: Monitor,
    chrome: 'browser',
    media: 'websitegif.gif',
    mediaLabel: 'Drop websitegif.gif into /public',
    schemaDesc: 'Custom website design and development services for businesses in tier-2 and tier-3 India, including mobile-first responsive websites, landing pages, and web applications.',
  },
  {
    id: 'seo',
    code: '02',
    category: 'Visibility',
    title: 'Google SEO & Ranking',
    tagline: 'Rank Higher. Get Found.',
    description:
      'We move a business from page three of Google to the top of the map pack — and keep it there with monthly reporting.',
    stat: { value: 327, suffix: '%', label: 'Organic traffic increase' },
    icon: Search,
    chrome: 'browser',
    media: 'google seo ranking.png',
    mediaLabel: 'Drop google seo ranking.png into /public',
    schemaDesc: 'Google SEO ranking services including local SEO, Google Business Profile optimisation, technical SEO audits, and content strategy for businesses across India.',
  },
  {
    id: 'ai-seo',
    code: '03',
    category: 'Visibility',
    title: 'AI & LLM Search Visibility',
    tagline: 'Show up inside the answer.',
    description:
      'Search is moving from ten blue links to one AI answer. We get your business named inside it — on Google Gemini, ChatGPT, and Perplexity.',
    stat: { value: 98, suffix: '%', label: 'Answer match accuracy' },
    icon: Sparkles,
    chrome: 'chat',
    media: 'ai llm visibility seo.png',
    mediaLabel: 'Drop ai llm visibility seo.png into /public',
    badge: 'New',
    schemaDesc: 'AI search visibility and Generative Engine Optimisation (GEO/AEO) services — helping businesses get cited in Google AI Overviews, ChatGPT, Gemini, and Perplexity answers.',
  },
  {
    id: 'marketing',
    code: '04',
    category: 'Growth',
    title: 'Digital Marketing',
    tagline: 'Reach Right. Convert More.',
    description: 'Meta Ads and Google Ads campaigns aimed at the customer already looking to buy — not everyone scrolling past.',
    stat: { value: 80, suffix: '%+', label: 'Qualified leads' },
    icon: Megaphone,
    chrome: 'browser',
    media: 'digital marketing ads.png',
    mediaLabel: 'Drop digital marketing ads.png into /public',
    schemaDesc: 'Digital marketing services including Meta Ads (Facebook and Instagram), Google Ads, and performance marketing campaigns targeting high-intent buyers.',
  },
  {
    id: 'tech',
    code: '05',
    category: 'Infrastructure',
    title: 'WhatsApp Chatbot & Automation',
    tagline: 'Automate. Scale. Save Time.',
    description:
      'Custom WhatsApp bots and automation workflows that replace manual spreadsheets entirely and scale your operations without adding headcount.',
    stat: { value: 1000, suffix: '%', label: 'Faster operations' },
    icon: Code2,
    chrome: 'phone',
    media: 'whatsapp automation.jpeg',
    mediaLabel: 'Drop whatsapp automation.jpeg into /public',
    schemaDesc: 'WhatsApp chatbot development and business automation services including custom bots, automated workflows, and CRM integrations.',
  },
  {
    id: 'social',
    code: '06',
    category: 'Growth',
    title: 'Social Media Management',
    tagline: 'Engage. Grow. Succeed.',
    description: 'Consistent, on-brand content and community management that turns followers into paying customers.',
    stat: { value: 10, suffix: 'x', label: 'Engagement growth' },
    icon: ThumbsUp,
    chrome: 'phone',
    media: 'social media management.jpg',
    mediaLabel: 'Drop social media management.jpg into /public',
    schemaDesc: 'Social media management services for Instagram, Facebook, and LinkedIn — including content creation, scheduling, community management, and analytics.',
  },
];

const APPROACH_METRICS = [
  { value: 200, suffix: '%', label: 'Faster time to market', body: 'Lean scoping and reusable systems get you live sooner.' },
  { value: 100, suffix: '+', label: 'Technologies in rotation', body: 'We pick the right stack for the job, not the familiar one.' },
  { value: 100, suffix: '%', label: 'Client satisfaction', body: 'We build past the brief when the product calls for it.' },
  { value: 24, suffix: '/7', label: 'Support & monitoring', body: 'Uptime alerts and a real human on the other end of WhatsApp.' },
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
  { name: 'Samarth Clinic', domain: 'samarthclinic.life', category: 'Physiotherapy & Rehabilitation', url: 'https://samarthclinic.life/' },
  { name: 'Sone Valley International School', domain: 'sonevalley.in', category: 'CBSE School & Education', url: 'https://sonevalley.in/' },
  { name: 'Modern Global School', domain: 'modernglobalschooldalmianagar.in', category: 'CBSE School & Education', url: 'https://modernglobalschooldalmianagar.in/' },
  { name: 'RSK Public School', domain: 'rskpublicschool.com', category: 'School & Education', url: 'https://rskpublicschool.com/' },
  { name: 'Visual Connect Network (VCNPL)', domain: 'vcnpl.net', category: 'IT & Technology Integration', url: 'https://vcnpl.net/' },
  { name: 'SOT Samarth Clinic', domain: 'sotsamarthclinic.vercel.app', category: 'Speech & Occupational Therapy', url: 'https://sotsamarthclinic.vercel.app/' },
  { name: 'Ranjot Singh & Associates', domain: 'rsallp.com', category: 'Chartered Accountants & Tax Firm', url: 'https://www.rsallp.com/' },
  { name: 'Singh & Partners LLP (SNP Legal)', domain: 'snp-legal.com', category: 'Advocates & Legal Practice', url: 'https://snp-legal.com' },
  { name: 'Nonacad', domain: 'nonacad.com', category: 'EdTech & Skill Platform', url: 'https://www.nonacad.com/' },
];

const TESTIMONIALS = [
  {
    name: 'Samarth Clinic',
    role: 'Physiotherapy & Rehabilitation Centre',
    domain: 'samarthclinic.life',
    url: 'https://samarthclinic.life/',
    quote: 'We rank at the top of Google SEO in our region, bringing in 5 to 10 direct calls a day from new patients.',
    stat: { value: 10, suffix: '+', label: 'Daily direct calls via Google' },
    media: 'samarth clinic.png',
  },
  {
    name: 'RSK Public School',
    role: 'CBSE School, Bihar',
    domain: 'rskpublicschool.com',
    url: 'https://rskpublicschool.com/',
    quote: 'Admission season was a major success this session, with our online admission enquiries increasing by 200%.',
    stat: { value: 200, suffix: '%', label: 'Online enquiry growth' },
    media: 'rsk website.png',
  },
  {
    name: 'Nonacad',
    role: 'EdTech & Skill Platform',
    domain: 'nonacad.com',
    url: 'https://www.nonacad.com/',
    quote: 'Our digital platform has significantly increased our conversion rate with schools and parents alike.',
    stat: { value: 3, suffix: 'x', label: 'Higher conversion rate' },
    media: 'nonacad.png',
  },
];

const INDUSTRIES = [
  { title: 'Education', body: 'Learning platforms, school websites, and admin tools built for how Indian institutions actually operate.' },
  { title: 'Real Estate', body: 'Listing, CRM, and lead-capture systems that turn site visits into signed agreements.' },
  { title: 'Finance', body: 'Secure, auditable software for transactions, records, and reporting.' },
  { title: 'Healthcare', body: 'Patient-facing and clinical tools that respect both compliance and bedside reality.' },
  { title: 'E-Commerce', body: 'Storefronts and checkout flows tuned for conversion, not just aesthetics.' },
  { title: 'Logistics', body: 'Tracking, dispatch, and supply-chain software built for messy, real-world routes.' },
];

// ── FAQ Data — written as direct, quotable answers for AI citation ──────────
// Google AI Overviews and other LLMs extract these Q&A pairs as citable snippets.
// Each answer is written as a complete, self-contained sentence (no "it depends" hedging).
const FAQS = [
  {
    q: 'What does Cosmicinnovation Lab do?',
    a: 'Cosmicinnovation Lab is a digital growth innovation lab for businesess that builds custom websites, runs Google SEO campaigns, manages Meta and Google Ads, develops WhatsApp chatbots, and helps businesses appear inside AI answers on ChatGPT, Gemini, and Perplexity.',
  },
  {
    q: 'How much does a website cost with Cosmicinnovation Lab?',
    a: 'Website pricing at Cosmicinnovation Lab varies by project scope — from a single-page landing site for small businesses to full-scale web applications. Contact us via WhatsApp (+91 87896 98369) or email (cosmicinnovationlab@gmail.com) for a free, no-obligation quote.',
  },
  {
    q: 'How long does Google SEO take to show results?',
    a: 'Most clients begin seeing meaningful SEO movement within 1 to 2 months, with Google Map Pack visibility for local searches often appearing within 2 to 5 weeks. Cosmicinnovation Lab provides monthly ranking reports so you can track progress from day one.',
  },
  {
    q: 'Can Cosmicinnovation Lab help a business appear in ChatGPT or Google Gemini answers?',
    a: 'Yes. This is called Generative Engine Optimisation (GEO) or Answer Engine Optimisation (AEO). Cosmicinnovation Lab implements structured data, entity signals, and content strategies specifically designed to increase the probability of your business being cited inside AI answer systems.',
  },
  {
    q: 'Does Cosmicinnovation Lab serve businesses Pan India?',
    a: 'Yes. Cosmicinnovation Lab serves clients across all of India with fully remote project delivery. Our portfolio includes businesses in Bihar, Jharkhand, Madhya Pradesh, Uttar Pradesh, and multiple other states.',
  },
  {
    q: 'What industries does Cosmicinnovation Lab specialise in?',
    a: 'Cosmicinnovation Lab has active projects in education (schools, EdTech), healthcare (clinics, therapy centres), legal (law firms, CA firms), real estate, e-commerce, logistics, and IT services — with particular depth in education and healthcare sectors.',
  },
  {
    q: 'What is the typical project timeline from start to launch?',
    a: 'A standard business website with Cosmicinnovation Lab typically launches within 1 to 2 weeks from project kickoff. Complex web applications or platforms with custom backend systems take 4 to 10 weeks depending on scope.',
  },
  {
    q: 'Why should a tier-2 or tier-3 city business choose Cosmicinnovation Lab?',
    a: 'Cosmicinnovation Lab is purpose-built for the tier-2 and tier-3 India market — meaning our websites are fully customized and siteoptimised for low-bandwidth connections, mobile-first usage patterns, regional payment rails (UPI, COD), and local language search intent, unlike generic agencies that apply metropolitan templates to small-city businesses.',
  },
];

/* ------------------------------------------------------------------ */
/*  STRUCTURED DATA — JSON-LD for page-level schemas                   */
/* ------------------------------------------------------------------ */

// Service schema for all 6 core offerings
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Cosmicinnovation Lab Services',
  description: 'Complete list of digital growth services offered by Cosmicinnovation Lab',
  itemListElement: CORE_SERVICES.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      '@id': `${SITE_URL}/#service-${s.id}`,
      name: s.title,
      description: s.schemaDesc,
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Cosmicinnovation Lab',
      },
      areaServed: { '@type': 'Country', name: 'India' },
      serviceType: s.category,
    },
  })),
};

// FAQPage schema — the most direct way to get cited in AI Overviews
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

// BreadcrumbList schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/#services` },
    { '@type': 'ListItem', position: 3, name: 'Portfolio', item: `${SITE_URL}/#work` },
    { '@type': 'ListItem', position: 4, name: 'Results', item: `${SITE_URL}/#results` },
    { '@type': 'ListItem', position: 5, name: 'Contact', item: `${SITE_URL}/#contact` },
  ],
};

/* ------------------------------------------------------------------ */
/*  CLIENT COMPONENTS                                                 */
/* ------------------------------------------------------------------ */

import Header from './components/Header';
import TrajectoryLine from './components/TrajectoryLine';
import Reveal from './components/Reveal';
import MediaFrame from './components/MediaFrame';
import { CountUp, RadialGauge, GrowthBars } from './components/Stats';

/* ------------------------------------------------------------------ */
/*  STATIC SUB-COMPONENTS                                              */
/* ------------------------------------------------------------------ */

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

// Explicit width/height on logo prevent CLS — browser reserves space before image loads
function CosmicMark({ size = 44, className = '' }) {
  return (
    <img
      src="/nonacadlogo.png"
      alt="Cosmicinnovation Lab Logo"
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      style={{ maxHeight: size, width: 'auto' }}
    />
  );
}

// ── Globe icon replaces external Google Favicon API calls ─────────────────
// The original code made 9 external requests to google.com/s2/favicons — one per
// portfolio item. Each request adds DNS lookup + TCP handshake latency and can delay
// rendering. Replaced with a single inline SVG globe icon (zero network cost).
function FaviconPlaceholder() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded border border-white/10 bg-white/5 text-white/40">
      <Globe size={16} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  SEA WAVE BACKGROUND — reduced from 6 to 3 layers                  */
/* ------------------------------------------------------------------ */
// Original: 6 simultaneous SVG wave animations → ~60% GPU utilization on mid-range devices.
// Reduced: 3 layers → visual effect preserved, GPU load roughly halved.
// All use translateX() only — compositor-thread property, no layout reflow.

function SeaWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
      {/* Gradient base */}
      <div className="absolute inset-0 sea-gradient-flow opacity-35" />

      {/* Wave 1: Cyan to Indigo fill */}
      <div className="absolute inset-x-0 bottom-0 top-0 w-[200%] animate-sea-wave-1 opacity-55">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="seaGrad1" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#4facfe" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#0072ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7f00ff" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M0,300 C150,200 350,450 600,320 C850,190 1050,420 1200,300 L1200,800 L0,800 Z M1200,300 C1350,200 1550,450 1800,320 C2050,190 2250,420 2400,300 L2400,800 L1200,800 Z"
            fill="url(#seaGrad1)"
          />
        </svg>
      </div>

      {/* Wave 2: Coral/Pink fill */}
      <div className="absolute inset-x-0 bottom-0 top-0 w-[200%] animate-sea-wave-2 opacity-50">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="seaGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff758c" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#ffb199" stopOpacity="0.75" />
              <stop offset="75%" stopColor="#f107a3" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7f00ff" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M0,420 C200,540 400,280 600,400 C800,520 1000,260 1200,420 L1200,800 L0,800 Z M1200,420 C1400,540 1600,280 1800,400 C2000,520 2200,260 2400,420 L2400,800 L1200,800 Z"
            fill="url(#seaGrad2)"
          />
        </svg>
      </div>

      {/* Wave 3: Amber/Emerald glowing line */}
      <div className="absolute inset-x-0 bottom-0 top-0 w-[200%] animate-sea-wave-3 opacity-75">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="thinGrad1" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffbd39" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38ef7d" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M0,250 C180,140 380,380 600,220 C820,60 1020,340 1200,250 M1200,250 C1380,140 1580,380 1800,220 C2020,60 2220,340 2400,250"
            stroke="url(#thinGrad1)"
            strokeWidth="3.5"
          />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICE SHOWCASE                                                    */
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
              {/* H3 used for service titles — H1 is the hero, H2s are section headings */}
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
              href={waLink(`Hello, Cosmicinnovation Lab! I'd like to talk about ${service.title}.`)}
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
              alt={`${service.title} result — Cosmicinnovation Lab`}
              lazy={true}
              fetchPriority="low"
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ ACCORDION — visible to crawlers, citable by AI systems         */
/* ------------------------------------------------------------------ */

function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative border-t border-white/10 py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <Eyebrow>Common questions</Eyebrow>
        </Reveal>
        <Reveal as="h2" id="faq-heading" className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          Answers you can quote
        </Reveal>
        <Reveal as="p" className="mt-4 max-w-2xl leading-relaxed text-white/55">
          Straight answers to the questions we hear most often. Last updated{' '}
          <time dateTime={LAST_UPDATED}>August 2025</time>.
        </Reveal>

        <div className="mt-12 divide-y divide-white/10">
          {FAQS.map((faq, i) => (
            <Reveal key={i} className="py-6" transition={{ duration: 0.5, delay: i * 0.04 }}>
              <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                {faq.q}
              </h3>
              <p className="mt-3 leading-relaxed text-white/60">{faq.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <div className="relative overflow-hidden bg-[#040610] font-body text-white antialiased selection:bg-fuchsia-500/40 selection:text-white">
      {/* ── Structured Data — JSON-LD ──────────────────────────────────── */}
      {/* Service schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* FAQPage schema — directly feeds AI Overview Q&A extraction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Ambient nebula glows ───────────────────────────────────────── */}
      {/* Reduced blur from 140-160px to 100px — less GPU-expensive CSS filter */}
      <div className="pointer-events-none fixed -top-56 left-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[100px]" />
      <div className="pointer-events-none fixed top-[40vh] -left-40 h-[420px] w-[420px] rounded-full bg-fuchsia-600/15 blur-[100px]" />

      {/* Scroll trajectory line */}
      <TrajectoryLine />

      {/* ── NAVIGATION ────────────────────────────────────────────────── */}
      <Header />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
        <SeaWaveBackground />
        <div className="pointer-events-none absolute inset-0 bg-[#040610]/55 backdrop-blur-[2px]" />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <Eyebrow>Sasaram, Bihar — Premium solutions for tier-2/3 India</Eyebrow>
            </Reveal>

            {/* H1 — one per page, keyword-rich, includes brand name implicitly via context */}
            <Reveal as="h1" className="mt-6 font-display text-[3rem] font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-[4.4rem]">
              Your business.
              <br />
              <span className="text-gradient">Everywhere.</span>
            </Reveal>

            {/* Direct answer sentence — AI systems extract the first 1-2 sentences after H1.
                This sentence contains: who we are, what we do, and who we serve. */}
            <Reveal as="p" className="mt-6 max-w-xl text-lg font-semibold text-white/90 sm:text-xl">
              Cosmicinnovation Lab builds fast, conversion-ready websites, ranks businesses on Google, and gets you named inside AI answers — serving tier-2 and tier-3 India.
            </Reveal>

            <Reveal as="p" className="mt-4 max-w-xl leading-relaxed text-white/55">
              Reach your perfect customer with high accuracy — engineered with Expert Consultation.{' '}
              <span className="text-yellow-400 font-semibold animate-shake-custom">
                Get Found before your competitors!
              </span>
            </Reveal>

            <Reveal as="p" className="mt-4 font-semibold text-fuchsia-300">
              Let&rsquo;s dominate the market.
            </Reveal>

            <Reveal className="mt-8 flex flex-wrap items-center gap-4 max-w-xl">
              <GlowButton href={WHATSAPP} icon="🚀" className="w-full sm:w-auto">
                Let&rsquo;s dominate
              </GlowButton>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 px-6 py-3 text-center font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/80 transition-colors hover:border-cyan-300/60 hover:text-cyan-300 w-full sm:w-auto"
              >
                View our work
              </a>
            </Reveal>

            <Reveal className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-gradient">
                    <CountUp value={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">{s.label}</div>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Hero video frame — lazy=false, fetchPriority="high" because this is the LCP element */}
          <Reveal className="relative mx-auto w-full max-w-md lg:flex lg:flex-col lg:items-center lg:justify-center">
            <div className="w-full">
              <div className="animate-float">
                <MediaFrame
                  src="/cosmicinnovationlab.mp4"
                  chrome="browser"
                  alt="Live Google search ranking result for Cosmicinnovation Lab client"
                  label="Drop cosmicinnovationlab.mp4 into /public"
                  lazy={false}
                  fetchPriority="high"
                />
              </div>
              <span className="mt-2 block text-center font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.12em] text-white/40">
                Live client keyword ranking
              </span>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="animate-bounce-slow">
            <ChevronDown size={16} />
          </div>
        </div>
      </section>

      {/* ── SERVICES (quick glance) ────────────────────────────────────── */}
      <section id="services" aria-labelledby="services-heading" className="relative overflow-hidden border-t border-white/10 py-28">
        <div className="pointer-events-none absolute inset-0 emerge-bg opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-[#040610]/55 backdrop-blur-[2px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Reveal>
                <Eyebrow>What we do</Eyebrow>
              </Reveal>
              <Reveal as="h2" id="services-heading" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
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

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((s) => (
              <Reveal key={s.id}>
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section id="about" aria-labelledby="about-heading" className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>About Cosmicinnovation Lab</Eyebrow>
          </Reveal>
          <Reveal as="h2" id="about-heading" className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            A technology partner built for your maximum growth.
          </Reveal>
          <Reveal as="p" className="mt-5 max-w-2xl leading-relaxed text-white/55">
            Founded in Sasaram, Bihar, Cosmicinnovation Lab is a dedicated team of senior engineers,
            SEO strategists, and digital marketers who treat every client engagement like it&rsquo;s our
            own product. We serve founders launching their first website and established businesses
            ready to scale their online presence across India.
          </Reveal>

          {/* E-E-A-T signal: expertise, methodology, credentials */}
          <Reveal className="mt-8 max-w-2xl rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/80">Our methodology</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Every project begins with a discovery audit — we map your competitive landscape,
              current search visibility, and conversion gaps before writing a single line of code
              or publishing a single piece of content. Our SEO campaigns are fully transparent:
              monthly ranking reports, keyword-by-keyword tracking, and a direct WhatsApp line
              to the team managing your account.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
              Last updated: <time dateTime={LAST_UPDATED}>August 2025</time>
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              &ldquo;Great software is built by people who stay accountable after the invoice is paid.&rdquo;
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-cyan-300/80">— Team Cosmicinnovation Lab</p>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICE DEEP-DIVES ─────────────────────────────────────────── */}
      {CORE_SERVICES.map((service, i) => (
        <ServiceShowcase key={service.id} service={service} index={i} />
      ))}

      {/* ── APPROACH ──────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/10 py-28" aria-label="Our approach metrics">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Approach</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Scalable, user-centric, and tuned for performance from day one.
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {APPROACH_METRICS.map((m) => (
              <Reveal key={m.label}>
                <GlowPanel>
                  <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                    <CountUp value={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white">{m.label}</div>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{m.body}</p>
                </GlowPanel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────── */}
      <section id="process" aria-labelledby="process-heading" className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Flight path</Eyebrow>
          </Reveal>
          <Reveal as="h2" id="process-heading" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Six stages from first call to launch day.
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-cyan-400/40 via-blue-500/30 to-fuchsia-500/40 sm:block" />
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-6">
              {PROCESS.map((p) => (
                <Reveal key={p.stage} className="relative">
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/60 bg-[#040610] shadow-[0_0_14px_2px_rgba(34,211,238,0.4)]">
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  </div>
                  <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-fuchsia-300">Stage {p.stage}</div>
                  <h3 className="mt-1 font-display text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────────────────────── */}
      <section id="work" aria-labelledby="work-heading" className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <Reveal>
                <Eyebrow>Deployed</Eyebrow>
              </Reveal>
              <Reveal as="h2" id="work-heading" className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Live systems, currently in production.
              </Reveal>
            </div>
            <Reveal as="p" className="font-mono text-xs text-white/40">
              Portfolio last updated{' '}
              <time dateTime="2025-06-21">21 Jun 2025</time>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 overflow-x-auto pb-4">
          <div className="mx-auto flex w-max max-w-7xl gap-4 px-6">
            {PORTFOLIO.map((p, i) => (
              <Reveal key={p.domain} transition={{ duration: 0.5, delay: i * 0.05 }} className="w-72 shrink-0">
                <GlowPanel className="h-full">
                  <div className="flex items-center gap-3">
                    {/* Replaced external google.com/s2/favicons API call with local icon.
                        Original: 9 external DNS/TCP requests per page load.
                        Now: zero external requests for this section. */}
                    <FaviconPlaceholder />
                    <div>
                      <h3 className="font-display text-base font-semibold text-white">{p.name}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-cyan-300/80">Live // {p.domain}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-white/50">{p.category}</p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/80 transition-colors hover:text-fuchsia-300"
                  >
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

      {/* ── RESULTS / TESTIMONIALS ────────────────────────────────────── */}
      <section id="results" aria-labelledby="results-heading" className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Proof, not promises</Eyebrow>
          </Reveal>
          <Reveal as="h2" id="results-heading" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Real businesses. Real ranking gains.
          </Reveal>
          <Reveal as="p" className="mt-4 max-w-xl leading-relaxed text-white/55">
            Every number below belongs to a client currently live — click through and verify it yourself.
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Reveal key={t.domain} className="transition-transform duration-300 hover:-translate-y-1.5">
                <GlowPanel className="h-full">
                  <MediaFrame
                    src={t.media ? `/${t.media}` : undefined}
                    chrome="card"
                    label={`Drop ${t.media} into /public`}
                    alt={`${t.name} — Cosmicinnovation Lab results`}
                    className="mb-5"
                    lazy={true}
                    fetchPriority="low"
                  />
                  {/* Use <blockquote> and <cite> for semantic testimonial markup —
                      helps Google identify these as genuine reviews */}
                  <blockquote>
                    <p className="font-brand text-base italic leading-relaxed text-white/90">&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>

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
                      <div className="font-mono text-[10px] text-cyan-300/80">{t.role}</div>
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────────── */}
      <section aria-labelledby="industries-heading" className="relative border-t border-white/10 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Eyebrow>Industries</Eyebrow>
          </Reveal>
          <Reveal as="h2" id="industries-heading" className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Sector-specific software, not generic templates.
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <Reveal key={ind.title}>
                <GlowPanel>
                  <h3 className="font-display text-lg font-semibold text-white">{ind.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{ind.body}</p>
                </GlowPanel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── CTA ───────────────────────────────────────────────────────── */}
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

      {/* ── FOOTER / CONTACT ──────────────────────────────────────────── */}
      <footer id="contact" className="relative border-t border-white/10 py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="flex items-start gap-3">
            <CosmicMark size={36} />
            <div>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text font-brand text-lg italic text-transparent">
                Cosmicinnovation Lab
              </span>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/45">
                Website design, Google SEO, AI visibility & digital marketing for businesses across tier-2 and tier-3 India.
              </p>
              {/* Last-updated signal — visible to users and crawlers for E-E-A-T freshness */}
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                Updated: <time dateTime={LAST_UPDATED}>August 2025</time>
              </p>
            </div>
          </div>

          {/* NAP — Name, Address, Phone in <address> tag for semantic markup.
              Must match the LocalBusiness schema in layout.js exactly. */}
          <address className="not-italic flex flex-col gap-3 font-mono text-sm">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/55 transition-colors hover:text-cyan-300"
              aria-label="WhatsApp Cosmicinnovation Lab"
            >
              <MessageCircle size={15} /> +91 87896 98369
            </a>
            <a
              href="mailto:cosmicinnovationlab@gmail.com"
              className="flex items-center gap-2 text-white/55 transition-colors hover:text-cyan-300"
            >
              <Mail size={15} /> cosmicinnovationlab@gmail.com
            </a>
            <span className="flex items-center gap-2 text-white/55">
              <MapPin size={15} /> Sasaram, Bihar, India — 821115
            </span>
          </address>

          {/* Social links — sameAs entity signals */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Follow us</p>
            <div className="flex flex-col gap-2 font-mono text-sm">
              <a
                href="https://www.instagram.com/cosmicinnovationlab"
                target="_blank"
                rel="noreferrer"
                className="text-white/55 transition-colors hover:text-cyan-300"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/cosmicinnovationlab"
                target="_blank"
                rel="noreferrer"
                className="text-white/55 transition-colors hover:text-cyan-300"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/company/cosmicinnovationlab"
                target="_blank"
                rel="noreferrer"
                className="text-white/55 transition-colors hover:text-cyan-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/35">
            © {new Date().getFullYear()} Cosmicinnovation Lab. All rights reserved. &nbsp;·&nbsp; Sasaram, Bihar, India
          </p>
        </div>
      </footer>
    </div>
  );
}