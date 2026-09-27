'use client';

import { useEffect, useRef, useState } from 'react';
import { Bricolage_Grotesque, Nunito } from 'next/font/google';
import Image from 'next/image';
import {
  ArrowUpRight, Check, Mail, MessageCircle, MapPin, Menu, X,
  Monitor, Search, Sparkles, Megaphone, Code2, ThumbsUp, Globe,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  FONTS — self-hosted via next/font, zero extra network request      */
/* ------------------------------------------------------------------ */
const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '800'], variable: '--font-display' });
const body = Nunito({ subsets: ['latin'], weight: ['400', '600', '800'], variable: '--font-body' });
const F_DISPLAY = 'font-[family-name:var(--font-display)]';

/* ------------------------------------------------------------------ */
/*  DATA — copy is untouched, only the presentation layer changed      */
/* ------------------------------------------------------------------ */

const SITE_URL = 'https://cosmicinnovationlab.in';
const WHATSAPP_NUMBER = '918789698369';
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const WHATSAPP = waLink(
  'Hello, Cosmicinnovation Lab! I would like to enquire about your services. Could you please provide more details?'
);

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
    id: 'websites', code: '01', category: 'Foundation', title: 'Custom Website Design & Development',
    tagline: 'Modern. Fast. Responsive.',
    description: 'A site engineered to convert on the first scroll — not a template with your logo dropped on it. Built mobile-first with Core Web Vitals optimisation.',
    stat: { value: 189, suffix: '%', label: 'Avg. business growth' }, icon: Monitor,
    media: 'websitegif.gif', mediaLabel: 'Drop websitegif.gif into /public',
    schemaDesc: 'Custom website design and development services for businesses in tier-2 and tier-3 India, including mobile-first responsive websites, landing pages, and web applications.',
  },
  {
    id: 'seo', code: '02', category: 'Visibility', title: 'Google SEO & Ranking',
    tagline: 'Rank Higher. Get Found.',
    description: 'We move a business from page three of Google to the top of the map pack — and keep it there with monthly reporting.',
    stat: { value: 327, suffix: '%', label: 'Organic traffic increase' }, icon: Search,
    media: 'google seo ranking.png', mediaLabel: 'Drop google seo ranking.png into /public',
    schemaDesc: 'Google SEO ranking services including local SEO, Google Business Profile optimisation, technical SEO audits, and content strategy for businesses across India.',
  },
  {
    id: 'ai-seo', code: '03', category: 'Visibility', title: 'AI & LLM Search Visibility',
    tagline: 'Show up inside the answer.',
    description: 'Search is moving from ten blue links to one AI answer. We get your business named inside it — on Google Gemini, ChatGPT, and Perplexity.',
    stat: { value: 98, suffix: '%', label: 'Answer match accuracy' }, icon: Sparkles,
    media: 'ai llm visibility seo.png', mediaLabel: 'Drop ai llm visibility seo.png into /public', badge: 'New',
    schemaDesc: 'AI search visibility and Generative Engine Optimisation (GEO/AEO) services — helping businesses get cited in Google AI Overviews, ChatGPT, Gemini, and Perplexity answers.',
  },
  {
    id: 'marketing', code: '04', category: 'Growth', title: 'Digital Marketing',
    tagline: 'Reach Right. Convert More.',
    description: 'Meta Ads and Google Ads campaigns aimed at the customer already looking to buy — not everyone scrolling past.',
    stat: { value: 80, suffix: '%+', label: 'Qualified leads' }, icon: Megaphone,
    media: 'digital marketing ads.png', mediaLabel: 'Drop digital marketing ads.png into /public',
    schemaDesc: 'Digital marketing services including Meta Ads (Facebook and Instagram), Google Ads, and performance marketing campaigns targeting high-intent buyers.',
  },
  {
    id: 'tech', code: '05', category: 'Infrastructure', title: 'WhatsApp Chatbot & Automation',
    tagline: 'Automate. Scale. Save Time.',
    description: 'Custom WhatsApp bots and automation workflows that replace manual spreadsheets entirely and scale your operations without adding headcount.',
    stat: { value: 1000, suffix: '%', label: 'Faster operations' }, icon: Code2,
    media: 'whatsapp automation.jpeg', mediaLabel: 'Drop whatsapp automation.jpeg into /public',
    format: 'mobile',
    phoneBadge: '💬 WhatsApp Bot',
    schemaDesc: 'WhatsApp chatbot development and business automation services including custom bots, automated workflows, and CRM integrations.',
  },
  {
    id: 'social', code: '06', category: 'Growth', title: 'Social Media Management',
    tagline: 'Engage. Grow. Succeed.',
    description: 'Consistent, on-brand content and community management that turns followers into paying customers.',
    stat: { value: 10, suffix: 'x', label: 'Engagement growth' }, icon: ThumbsUp,
    media: 'social media management.jpg', mediaLabel: 'Drop social media management.jpg into /public',
    format: 'mobile',
    phoneBadge: '📱 Social Media',
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
    name: 'Samarth Clinic', role: 'Physiotherapy & Rehabilitation Centre', domain: 'samarthclinic.life',
    url: 'https://samarthclinic.life/', quote: 'We rank at the top of Google SEO in our region, bringing in 5 to 10 direct calls a day from new patients.',
    stat: { value: 10, suffix: '+', label: 'Daily direct calls via Google' }, media: 'samarth clinic.png',
  },
  {
    name: 'RSK Public School', role: 'CBSE School, Bihar', domain: 'rskpublicschool.com',
    url: 'https://rskpublicschool.com/', quote: 'Admission season was a major success this session, with our online admission enquiries increasing by 200%.',
    stat: { value: 200, suffix: '%', label: 'Online enquiry growth' }, media: 'rsk website.png',
  },
  {
    name: 'Nonacad', role: 'EdTech & Skill Platform', domain: 'nonacad.com',
    url: 'https://www.nonacad.com/', quote: 'Our digital platform has significantly increased our conversion rate with schools and parents alike.',
    stat: { value: 3, suffix: 'x', label: 'Higher conversion rate' }, media: 'nonacad.png',
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

const FAQS = [
  { q: 'What does Cosmicinnovation Lab do?', a: 'Cosmicinnovation Lab is a digital growth innovation lab for businesess that builds custom websites, runs Google SEO campaigns, manages Meta and Google Ads, develops WhatsApp chatbots, and helps businesses appear inside AI answers on ChatGPT, Gemini, and Perplexity.' },
  { q: 'How much does a website cost with Cosmicinnovation Lab?', a: 'Website pricing at Cosmicinnovation Lab varies by project scope — from a single-page landing site for small businesses to full-scale web applications. Contact us via WhatsApp (+91 87896 98369) or email (cosmicinnovationlab@gmail.com) for a free, no-obligation quote.' },
  { q: 'How long does Google SEO take to show results?', a: 'Most clients begin seeing meaningful SEO movement within 1 to 2 months, with Google Map Pack visibility for local searches often appearing within 2 to 5 weeks. Cosmicinnovation Lab provides monthly ranking reports so you can track progress from day one.' },
  { q: 'Can Cosmicinnovation Lab help a business appear in ChatGPT or Google Gemini answers?', a: 'Yes. This is called Generative Engine Optimisation (GEO) or Answer Engine Optimisation (AEO). Cosmicinnovation Lab implements structured data, entity signals, and content strategies specifically designed to increase the probability of your business being cited inside AI answer systems.' },
  { q: 'Does Cosmicinnovation Lab serve businesses Pan India?', a: 'Yes. Cosmicinnovation Lab serves clients across all of India with fully remote project delivery. Our portfolio includes businesses in Bihar, Jharkhand, Madhya Pradesh, Uttar Pradesh, and multiple other states.' },
  { q: 'What industries does Cosmicinnovation Lab specialise in?', a: 'Cosmicinnovation Lab has active projects in education (schools, EdTech), healthcare (clinics, therapy centres), legal (law firms, CA firms), real estate, e-commerce, logistics, and IT services — with particular depth in education and healthcare sectors.' },
  { q: 'What is the typical project timeline from start to launch?', a: 'A standard business website with Cosmicinnovation Lab typically launches within 1 to 2 weeks from project kickoff. Complex web applications or platforms with custom backend systems take 4 to 10 weeks depending on scope.' },
  { q: 'Why should a tier-2 or tier-3 city business choose Cosmicinnovation Lab?', a: 'Cosmicinnovation Lab is purpose-built for the tier-2 and tier-3 India market — meaning our websites are fully customized and optimised for low-bandwidth connections, mobile-first usage patterns, regional payment rails (UPI, COD), and local language search intent, unlike generic agencies that apply metropolitan templates to small-city businesses.' },
];

/* ------------------------------------------------------------------ */
/*  STRUCTURED DATA — unchanged                                        */
/* ------------------------------------------------------------------ */

const serviceSchema = {
  '@context': 'https://schema.org', '@type': 'ItemList', name: 'Cosmicinnovation Lab Services',
  description: 'Complete list of digital growth services offered by Cosmicinnovation Lab',
  itemListElement: CORE_SERVICES.map((s, i) => ({
    '@type': 'ListItem', position: i + 1,
    item: {
      '@type': 'Service', '@id': `${SITE_URL}/#service-${s.id}`, name: s.title, description: s.schemaDesc,
      provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Cosmicinnovation Lab' },
      areaServed: { '@type': 'Country', name: 'India' }, serviceType: s.category,
    },
  })),
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/#services` },
    { '@type': 'ListItem', position: 3, name: 'Portfolio', item: `${SITE_URL}/#work` },
    { '@type': 'ListItem', position: 4, name: 'Results', item: `${SITE_URL}/#results` },
    { '@type': 'ListItem', position: 5, name: 'Contact', item: `${SITE_URL}/#contact` },
  ],
};

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS — ported from the "Good Boy Supply" system            */
/* ------------------------------------------------------------------ */

const TONES = [
  { bg: 'var(--yellow)', fg: 'var(--ink)' },
  { bg: 'var(--cobalt)', fg: '#fff' },
  { bg: 'var(--pink)', fg: 'var(--ink)' },
];

/* ------------------------------------------------------------------ */
/*  SHARED HOOKS + PRIMITIVES                                          */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function CountUp({ value, suffix = '', decimals = 0 }) {
  const [ref, inView] = useInView(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / 1200, 1);
      setN(value * (1 - (1 - p) ** 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}

function Eyebrow({ children }) {
  return (
    <span className="sticker inline-flex px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em]" style={{ '--r': '-2deg', background: 'var(--cream)' }}>
      {children}
    </span>
  );
}

function WaveEdge({ color, position = 'bottom' }) {
  return (
    <svg
      viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-[60px] w-full ${position === 'top' ? '-top-[59px] rotate-180' : '-bottom-[59px]'}`}
    >
      <path style={{ fill: color }} d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" />
    </svg>
  );
}

function Frame({ src, alt, video = false, label, priority = false, className = '', aspect = 'aspect-[16/9]' }) {
  return (
    <div className={`card w-full overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 border-b-[3px] px-3.5 py-2.5" style={{ borderColor: 'var(--ink)', background: 'var(--cream)' }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--pink)' }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--yellow)' }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--cobalt)' }} />
      </div>
      {src ? (
        video ? (
          <video src={src} autoPlay muted loop playsInline aria-label={alt} className={`w-full ${aspect} object-cover`} />
        ) : (
          <div className={`relative w-full ${aspect}`}>
            <Image
              src={src} alt={alt} fill sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 650px" className="object-cover object-top"
              {...(priority ? { priority: true } : { loading: 'lazy' })}
            />
          </div>
        )
      ) : (
        <div className={`flex w-full ${aspect} items-center justify-center p-6 text-center font-mono text-xs`} style={{ background: 'var(--cream)', color: 'var(--ink)', opacity: 0.5 }}>
          {label}
        </div>
      )}
    </div>
  );
}

function PhoneFrame({ src, alt, label, priority = false, className = '', badgeText }) {
  return (
    <div className={`relative mx-auto flex w-full max-w-[290px] sm:max-w-[315px] items-center justify-center ${className}`}>
      {/* Neo-brutalist phone backdrop glow */}
      <div className="absolute -inset-3 rounded-[3.2rem] bg-gradient-to-tr from-[var(--yellow)] via-[var(--pink)] to-[var(--cobalt)] opacity-30 blur-lg" />

      {badgeText && (
        <span
          className="sticker absolute -right-3 -top-3 z-20 px-3 py-1 text-[10px]"
          style={{ '--r': '5deg', background: 'var(--yellow)' }}
        >
          {badgeText}
        </span>
      )}

      {/* Phone Shell */}
      <div
        className="relative w-full overflow-hidden rounded-[2.8rem] border-[3.5px] p-2.5 sm:p-3"
        style={{
          borderColor: 'var(--ink)',
          background: 'var(--ink)',
          boxShadow: '6px 6px 0 var(--ink)',
        }}
      >
        {/* Top Status bar with Dynamic Island */}
        <div className="mb-2 flex items-center justify-between px-3 pt-1 text-[10px] font-bold text-white/70">
          <span>9:41</span>
          <div className="flex h-3.5 w-16 items-center justify-center gap-1 rounded-full bg-black/90 px-2 shadow-inner">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2F55E8]" />
            <span className="h-1 w-3 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center gap-1.5 text-[9px]">
            <span>5G</span>
            <div className="h-2 w-3 rounded-xs border border-white/60 p-[1px]">
              <div className="h-full w-full rounded-[1px] bg-white/70" />
            </div>
          </div>
        </div>

        {/* Screen Container */}
        <div className="relative aspect-[9/16] sm:aspect-[9/17] w-full overflow-hidden rounded-[2rem] border-2 border-[var(--ink)]/40 bg-black">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 290px, 320px"
              className="object-cover object-top"
              {...(priority ? { priority: true } : { loading: 'lazy' })}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center p-6 text-center font-mono text-xs"
              style={{ background: 'var(--cream)', color: 'var(--ink)', opacity: 0.5 }}
            >
              {label}
            </div>
          )}
        </div>

        {/* Bottom Home Bar */}
        <div className="mt-2 flex justify-center pb-0.5">
          <div className="h-1 w-24 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}

function Section({ id, eyebrow, title, lead, className = '', background, children }) {
  return (
    <section id={id} className={`relative border-t-[3px] py-20 sm:py-24 ${className}`} style={{ borderColor: 'var(--ink)' }}>
      {background}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {eyebrow && <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>}
        {title && (
          <Reveal as="h2" className={`mt-5 max-w-2xl ${F_DISPLAY} text-3xl font-extrabold leading-[0.95] text-[var(--ink)] sm:text-4xl`}>
            {title}
          </Reveal>
        )}
        {lead && <Reveal as="p" className="mt-4 max-w-xl leading-relaxed text-[var(--ink)]/60">{lead}</Reveal>}
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  THREE.JS BACKGROUND — dynamically imported after first paint       */
/*  (idle-triggered, own async chunk, disposed on unmount)             */
/* ------------------------------------------------------------------ */

function ThreeBackground() {
  const mountRef = useRef(null);
  const stateRef = useRef({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const el = mountRef.current;
      if (!el || cancelled) return;
      const {
        Scene, PerspectiveCamera, WebGLRenderer, Mesh, MeshBasicMaterial,
        IcosahedronGeometry, TorusGeometry, BoxGeometry, EdgesGeometry, LineSegments, LineBasicMaterial,
      } = await import('three');
      if (cancelled || !mountRef.current) return;

      const { clientWidth: w, clientHeight: h } = el;
      const scene = new Scene();
      const camera = new PerspectiveCamera(48, w / (h || 1), 0.1, 100);
      camera.position.z = 9;
      const renderer = new WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);

      const geoms = [new IcosahedronGeometry(1, 0), new TorusGeometry(0.65, 0.25, 8, 16), new BoxGeometry(1.3, 1.3, 1.3)];
      const colors = [0xffc933, 0x2f55e8, 0xff8fb0];

      const getTorusColor = (baseColor, isMob) => {
        if (!isMob) return baseColor;
        // On mobile screen: blue donut -> white, pink donut -> green
        if (baseColor === 0x2f55e8) return 0xffffff;
        if (baseColor === 0xff8fb0) return 0x22c55e;
        return baseColor;
      };

      const isInitMobile = (w || window.innerWidth) < 768;

      const mobileSlots = [
        // Top perimeter (above heading & text)
        { x: -1.9, y: 3.5, z: -1.0 },
        { x: 0.0,  y: 3.8, z: -1.2 },
        { x: 1.9,  y: 3.5, z: -1.0 },
        // Outer margins (far left/right edges)
        { x: -2.7, y: 0.8, z: -1.5 },
        { x: 2.7,  y: 0.8, z: -1.5 },
        { x: 2.6,  y: -0.8, z: -1.3 },
        // Bottom perimeter (below text area)
        { x: -1.8, y: -3.5, z: -1.0 },
        { x: 0.0,  y: -3.8, z: -1.2 },
        { x: 1.8,  y: -3.5, z: -1.0 },
      ];

      const items = geoms.flatMap((geo, gi) => Array.from({ length: 3 }, (_, i) => {
        const index = gi * 3 + i;
        const isTorus = gi === 1;
        const baseColor = colors[(gi + i) % colors.length];
        const color = isTorus ? getTorusColor(baseColor, isInitMobile) : baseColor;
        const mat = new MeshBasicMaterial({ color });
        const mesh = new Mesh(geo, mat);
        mesh.add(new LineSegments(new EdgesGeometry(geo), new LineBasicMaterial({ color: 0x14162b })));

        const desktopPos = {
          x: (Math.random() - 0.5) * 12,
          y: (Math.random() - 0.5) * 7,
          z: (Math.random() - 0.5) * 4 - 2,
        };
        const mobilePos = mobileSlots[index] || { x: 2.5, y: 3.5, z: -1.0 };

        const initialPos = isInitMobile ? mobilePos : desktopPos;
        mesh.position.set(initialPos.x, initialPos.y, initialPos.z);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        mesh.scale.setScalar(isInitMobile ? 0.45 + Math.random() * 0.35 : 0.5 + Math.random() * 0.55);
        scene.add(mesh);

        return {
          mesh,
          isTorus,
          baseColor,
          desktopPos,
          mobilePos,
          baseY: initialPos.y,
          spin: 0.0015 + Math.random() * 0.003,
          seed: Math.random() * 10,
        };
      }));

      const ro = new ResizeObserver(() => {
        if (!mountRef.current) return;
        const { clientWidth: nw, clientHeight: nh } = mountRef.current;
        if (!nw || !nh) return;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);

        const isMob = nw < 768;
        items.forEach((item) => {
          if (item.isTorus && item.mesh.material) {
            item.mesh.material.color.setHex(getTorusColor(item.baseColor, isMob));
          }
          const targetPos = isMob ? item.mobilePos : item.desktopPos;
          item.mesh.position.x = targetPos.x;
          item.mesh.position.z = targetPos.z;
          item.baseY = targetPos.y;
          item.mesh.scale.setScalar(isMob ? 0.45 + Math.random() * 0.35 : 0.5 + Math.random() * 0.55);
        });
      });
      ro.observe(el);

      const t0 = performance.now();
      const tick = () => {
        const t = (performance.now() - t0) / 1000;
        items.forEach((item) => {
          item.mesh.rotation.x += item.spin;
          item.mesh.rotation.y += item.spin * 1.4;
          item.mesh.position.y = item.baseY + Math.sin(t + item.seed) * 0.12;
        });
        renderer.render(scene, camera);
        stateRef.current.frameId = requestAnimationFrame(tick);
      };
      tick();

      stateRef.current = { renderer, ro, items, geoms };
      setLoaded(true);
    };

    const ric = typeof window !== 'undefined' && window.requestIdleCallback ? window.requestIdleCallback : (cb) => setTimeout(cb, 150);
    const cic = typeof window !== 'undefined' && window.cancelIdleCallback ? window.cancelIdleCallback : clearTimeout;
    const handle = ric(init, { timeout: 850 });

    return () => {
      cancelled = true;
      cic(handle);
      const s = stateRef.current;
      if (s.frameId) cancelAnimationFrame(s.frameId);
      s.ro?.disconnect();
      s.items?.forEach(({ mesh }) => {
        mesh.material?.dispose?.();
        mesh.children.forEach((c) => { c.geometry?.dispose?.(); c.material?.dispose?.(); });
      });
      s.geoms?.forEach((g) => g.dispose());
      if (s.renderer) { s.renderer.dispose(); s.renderer.domElement.remove(); }
    };
  }, []);

  return (
    <div
      ref={mountRef} aria-hidden="true"
      className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  NAV + TICKER + PROGRESS LINE                                       */
/* ------------------------------------------------------------------ */

function TrajectoryLine() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="fixed left-0 top-0 z-50 h-1" style={{ width: `${p}%`, background: 'var(--cobalt)' }} />;
}

function Ticker({ items }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden py-2" style={{ background: 'var(--cobalt)' }}>
      <div className="marquee flex w-max gap-10 whitespace-nowrap text-xs font-extrabold uppercase tracking-wide text-white">
        {loop.map((t, i) => <span key={i}>{t} ·</span>)}
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b-[3px] bg-[#FFF8E7]" style={{ borderColor: 'var(--ink)' }}>
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#home" className="flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.02]">
            <Image
              src="/nonacadlogo.png"
              alt="Cosmicinnovation Lab Logo"
              width={36}
              height={36}
              className="h-8 w-8 rounded-lg object-contain sm:h-10 sm:w-10"
              priority
            />
            <span className={`${F_DISPLAY} text-base font-extrabold tracking-tight text-[var(--ink)] sm:text-xl leading-tight`}>
              Cosmicinnovation Lab
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-extrabold uppercase tracking-wide text-[var(--ink)]/80 transition-colors hover:text-[var(--cobalt)]">{l.label}</a>
            ))}
          </nav>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn hidden !px-3.5 !py-1.5 !text-xs !rounded-lg !border-2 !shadow-[2.5px_2.5px_0_var(--ink)] md:inline-flex">Let&rsquo;s dominate</a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close Menu' : 'Open Menu'}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-[2.5px] bg-[var(--yellow)] text-[var(--ink)] shadow-[2px_2px_0_var(--ink)] transition-transform active:translate-x-0.5 active:translate-y-0.5 md:hidden"
            style={{ borderColor: 'var(--ink)' }}
          >
            {open ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
          </button>
        </div>
      </header>

      {/* Backdrop overlay — closes the panel when clicking anywhere outside */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Dropdown — opens only till its last item with rounded bottom border */}
      {open && (
        <div
          className="fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-b-2xl border-b-[3px] border-x-[3px] p-4 shadow-[0_16px_32px_rgba(20,22,43,0.35)] md:hidden"
          style={{ borderColor: 'var(--ink)', background: 'var(--yellow)' }}
        >
          <div className="mx-auto flex max-w-lg flex-col gap-2">
            <div className="mb-1 flex items-center justify-between px-1">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--ink)]/70">
                Menu
              </span>
              <span className="sticker px-2 py-0.5 text-[9px]" style={{ '--r': '0deg', background: 'var(--cream)' }}>
                6 sections
              </span>
            </div>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="card flex items-center justify-between px-4 py-2.5 text-base font-extrabold text-[var(--ink)] shadow-[2.5px_2.5px_0_var(--ink)] transition-all active:translate-x-1"
                style={{ background: '#fff' }}
              >
                <span className={`${F_DISPLAY} text-base`}>{l.label}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border-2" style={{ borderColor: 'var(--ink)', background: 'var(--cream)' }}>
                  <ArrowUpRight size={14} style={{ color: 'var(--cobalt)' }} />
                </span>
              </a>
            ))}

            <div className="mt-2 border-t-2 pt-3" style={{ borderColor: 'rgba(20,22,43,0.15)' }}>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn w-full !py-2.5 text-center text-xs font-extrabold shadow-[2.5px_2.5px_0_var(--ink)]"
                style={{ background: 'var(--cobalt)', color: '#fff' }}
              >
                🚀 Let&rsquo;s dominate <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const words = 'Your business. Everywhere.'.split(' ');
  return (
    <section id="home" className="relative pt-24" style={{ background: 'var(--yellow)' }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 -top-16 h-72 w-72 rounded-full blur-3xl" style={{ background: 'var(--pink)', opacity: 0.4 }} />
        <div className="absolute -right-6 bottom-10 h-80 w-80 rounded-full blur-3xl" style={{ background: 'var(--cobalt)', opacity: 0.18 }} />
        <ThreeBackground />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-24 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal><Eyebrow>Sasaram, Bihar — Premium solutions for tier-2/3 India</Eyebrow></Reveal>

          <h1 className={`mt-6 ${F_DISPLAY} text-[3rem] font-extrabold uppercase leading-[0.92] tracking-tight text-[var(--ink)] sm:text-6xl lg:text-[4.2rem]`}>
            {words.map((w, i) => (
              <Reveal key={w} as="span" delay={i * 80} className="mr-4 inline-block">
                {w === 'Everywhere.' ? <span style={{ color: 'var(--cobalt)' }}>{w}</span> : w}
              </Reveal>
            ))}
          </h1>

          <Reveal as="p" delay={300} className="mt-6 max-w-xl text-lg font-extrabold text-[var(--ink)]/90 sm:text-xl">
            Cosmicinnovation Lab builds fast, conversion-ready websites, ranks businesses on Google, and gets you named inside AI answers — serving tier-2 and tier-3 India.
          </Reveal>

          <Reveal as="p" delay={360} className="mt-4 max-w-xl leading-relaxed">
            <span style={{ color: '#000000ff' }}>
              Reach your perfect customer with high accuracy — engineered with Expert Consultation.{' '}
            </span>
            <span className="font-extrabold" style={{ color: '#800000' }}>
              Get Found before your competitors!
            </span>
          </Reveal>

          <Reveal as="p" delay={420} className="mt-3 font-extrabold" style={{ color: 'var(--cobalt)' }}>Let&rsquo;s dominate the market.</Reveal>

          <Reveal delay={480} className="mt-8 flex flex-wrap items-center gap-4">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn">🚀 Let&rsquo;s dominate</a>
            <a href="#work" className="btn" style={{ background: 'var(--cream)' }}>View our work</a>
          </Reveal>

          <Reveal delay={540} className="mt-14 grid grid-cols-2 gap-5 border-t-[3px] pt-7 sm:grid-cols-4" style={{ borderColor: 'var(--ink)' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <div className={`${F_DISPLAY} text-3xl font-extrabold text-[var(--ink)]`}>
                  <CountUp value={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                </div>
                <div className="mt-1 text-[11px] font-extrabold uppercase tracking-wide text-[var(--ink)]/60">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-md">
          <div className="float">
            <Frame src="/cosmicinnovationlab.mp4" video alt="Live Google search ranking result for Cosmicinnovation Lab client" label="Drop cosmicinnovationlab.mp4 into /public" priority />
          </div>
          <span className="sticker absolute -right-4 -top-4 px-4 py-2 text-xs" style={{ '--r': '-8deg', background: 'var(--pink)' }}>
            {HERO_STATS[0].value}+ {HERO_STATS[0].label}
          </span>
        </Reveal>
      </div>

      <WaveEdge color="var(--yellow)" position="bottom" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICE DEEP-DIVE                                                   */
/* ------------------------------------------------------------------ */

function ServiceShowcase({ service, index }) {
  const reverse = index % 2 === 1;
  const isMobile = service.format === 'mobile';
  return (
    <div id={`service-${service.id}`} className="border-t-[3px] py-20" style={{ borderColor: 'var(--ink)' }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className={reverse ? 'lg:order-2' : ''}>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wide" style={{ color: 'var(--cobalt)' }}>/{service.code} — {service.category}</span>
              {service.badge && <span className="sticker px-2 py-1 text-[9px]" style={{ '--r': '-6deg', background: 'var(--pink)' }}>{service.badge}</span>}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border-[3px]" style={{ borderColor: 'var(--ink)', background: 'var(--yellow)' }}>
                <service.icon size={20} />
              </span>
              <h3 className={`${F_DISPLAY} text-2xl font-extrabold text-[var(--ink)] sm:text-3xl`}>{service.title}</h3>
            </div>
            <p className="mt-3 font-extrabold text-[var(--ink)]/80">{service.tagline}</p>
            <p className="mt-4 max-w-md leading-relaxed text-[var(--ink)]/60">{service.description}</p>
            <div className={`mt-8 ${F_DISPLAY} text-4xl font-extrabold`} style={{ color: 'var(--cobalt)' }}>
              <CountUp value={service.stat.value} suffix={service.stat.suffix} />
            </div>
            <div className="mt-1 max-w-[10rem] text-[10px] font-extrabold uppercase leading-relaxed tracking-wide text-[var(--ink)]/50">{service.stat.label}</div>
            <a
              href={waLink(`Hello, Cosmicinnovation Lab! I'd like to talk about ${service.title}.`)} target="_blank" rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide transition-colors hover:opacity-70"
              style={{ color: 'var(--cobalt)' }}
            >
              Ask about this <ArrowUpRight size={14} />
            </a>
          </Reveal>
          <Reveal className={reverse ? 'lg:order-1' : ''}>
            {isMobile ? (
              <PhoneFrame
                src={service.media ? `/${service.media}` : undefined}
                label={service.mediaLabel}
                alt={`${service.title} mobile preview — Cosmicinnovation Lab`}
                badgeText={service.phoneBadge}
              />
            ) : (
              <Frame
                src={service.media ? `/${service.media}` : undefined}
                label={service.mediaLabel}
                alt={`${service.title} result — Cosmicinnovation Lab`}
              />
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APPROACH — cobalt block with wave edges (the "self-wash" beat)     */
/* ------------------------------------------------------------------ */

function Approach() {
  return (
    <section className="relative py-20" style={{ background: 'var(--cobalt)' }}>
      <WaveEdge color="var(--cobalt)" position="top" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><Eyebrow>Approach</Eyebrow></Reveal>
        <Reveal as="h2" className={`mt-5 max-w-2xl ${F_DISPLAY} text-3xl font-extrabold leading-[0.95] text-white sm:text-4xl`}>
          Scalable, user-centric, and tuned for performance from day one.
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {APPROACH_METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 60} className="card p-5" style={{ background: 'var(--cream)' }}>
              <div className={`${F_DISPLAY} text-3xl font-extrabold sm:text-4xl`} style={{ color: 'var(--cobalt)' }}>
                <CountUp value={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-2 text-[11px] font-extrabold uppercase tracking-wide text-[var(--ink)]">{m.label}</div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink)]/60">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <WaveEdge color="var(--cobalt)" position="bottom" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                 */
/* ------------------------------------------------------------------ */

function Cta() {
  return (
    <section className="relative border-t-[3px] py-20 text-center" style={{ borderColor: 'var(--ink)', background: 'var(--pink)' }}>
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="flex justify-center"><Eyebrow>Launch</Eyebrow></Reveal>
        <Reveal as="h2" className={`mt-5 ${F_DISPLAY} text-3xl font-extrabold leading-tight text-[var(--ink)] sm:text-5xl`}>
          Ready to dominate the market?
        </Reveal>
        <Reveal as="p" className="mx-auto mt-5 max-w-xl leading-relaxed text-[var(--ink)]/70">
          Tell us what you&rsquo;re building — an MVP, a school platform, a storefront — and we&rsquo;ll reply with next steps within one business day.
        </Reveal>
        <Reveal className="mt-9 flex justify-center">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn">🚀 Let&rsquo;s dominate</a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer id="contact" className="relative pb-10 pt-20 text-[var(--cream)]" style={{ background: 'var(--ink)' }}>
      <WaveEdge color="var(--ink)" position="top" />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Image src="/nonacadlogo.png" alt="Cosmicinnovation Lab Logo" width={36} height={36} className="rounded-lg" />
          <div>
            <span className={`${F_DISPLAY} block text-lg font-extrabold`} style={{ color: 'var(--yellow)' }}>Cosmicinnovation Lab</span>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--cream)]/60">
              Website design, Google SEO, AI visibility & digital marketing for businesses across tier-2 and tier-3 India.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-[var(--cream)]/40">
              Updated: <time dateTime={LAST_UPDATED}>August 2025</time>
            </p>
          </div>
        </div>

        <address className="not-italic flex flex-col gap-3 font-mono text-sm">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[var(--cream)]/70 transition-colors hover:text-[var(--yellow)]">
            <MessageCircle size={15} /> +91 87896 98369
          </a>
          <a href="mailto:cosmicinnovationlab@gmail.com" className="flex items-center gap-2 text-[var(--cream)]/70 transition-colors hover:text-[var(--yellow)]">
            <Mail size={15} /> cosmicinnovationlab@gmail.com
          </a>
          <span className="flex items-center gap-2 text-[var(--cream)]/70"><MapPin size={15} /> Bihar, India</span>
        </address>

        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-[var(--cream)]/50">Follow us</p>
          <div className="flex flex-col gap-2 font-mono text-sm">
            <a href="https://www.instagram.com/cosmicinnovationlab" target="_blank" rel="noreferrer" className="text-[var(--cream)]/70 transition-colors hover:text-[var(--yellow)]">Instagram</a>
            <a href="https://www.facebook.com/cosmicinnovationlab" target="_blank" rel="noreferrer" className="text-[var(--cream)]/70 transition-colors hover:text-[var(--yellow)]">Facebook</a>
            <a href="https://www.linkedin.com/company/cosmicinnovationlab" target="_blank" rel="noreferrer" className="text-[var(--cream)]/70 transition-colors hover:text-[var(--yellow)]">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className={`mx-auto mt-14 max-w-7xl overflow-hidden px-6 ${F_DISPLAY} font-extrabold uppercase leading-[0.85]`} style={{ color: 'var(--yellow)', fontSize: 'clamp(2rem, 10vw, 7rem)' }}>
        Cosmicinnovation Lab
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t-[3px] px-6 pt-6" style={{ borderColor: 'rgba(255,248,231,.15)' }}>
        <p className="text-[11px] uppercase tracking-wide text-[var(--cream)]/40">
          © {new Date().getFullYear()} Cosmicinnovation Lab. All rights reserved. · Sasaram, Bihar, India
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <div className={`${display.variable} ${body.className} relative overflow-x-hidden text-[var(--ink)] antialiased`} style={{ background: 'var(--cream)' }}>
      <style jsx global>{`
        :root { --ink: #14162B; --cream: #FFF8E7; --yellow: #FFC933; --cobalt: #2F55E8; --pink: #FF8FB0; }
        html { scroll-behavior: smooth; }
        ::selection { background: var(--yellow); color: var(--ink); }
        .card { border: 3px solid var(--ink); border-radius: 1.25rem; background: #fff; box-shadow: 5px 5px 0 var(--ink); }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; border: 3px solid var(--ink); border-radius: .75rem; padding: .75rem 1.5rem; font-weight: 800; background: var(--yellow); color: var(--ink); box-shadow: 4px 4px 0 var(--ink); transition: transform .12s ease, box-shadow .12s ease; }
        .btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--ink); }
        .btn:active { transform: translate(4px, 4px); box-shadow: none; }
        .sticker { display: inline-flex; align-items: center; justify-content: center; border: 3px solid var(--ink); border-radius: 9999px; box-shadow: 3px 3px 0 var(--ink); font-weight: 800; color: var(--ink); transform: rotate(var(--r, 0deg)); transition: transform .3s ease; }
        .sticker:hover { animation: wobble .5s ease-in-out; }
        @keyframes wobble { 0%, 100% { transform: rotate(var(--r, 0deg)); } 30% { transform: rotate(calc(var(--r, 0deg) - 6deg)); } 70% { transform: rotate(calc(var(--r, 0deg) + 6deg)); } }
        .float { animation: float 4s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .marquee { animation: marquee 26s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <TrajectoryLine />
      <Ticker items={HERO_STATS.map((s) => `${s.value}${s.suffix} ${s.label}`)} />
      <Navbar />
      <Hero />

      <Section
        id="services" eyebrow="What we do"
        title={
          <>
            We don&rsquo;t just build websites.{' '}
            <span className="rainbow-text-flow">We build businesses that get found.</span>
          </>
        }
        lead={<span className="font-extrabold text-[var(--ink)]/85">A website is the starting point. The real work is making sure customers, Google, and AI assistants all find you first.</span>}
        className="overflow-hidden"
        background={
          <>
            <div className="pointer-events-none absolute inset-0 emerge-bg opacity-70" />
            <div className="pointer-events-none absolute inset-0 bg-[#FFF8E7]/30 backdrop-blur-[1px]" />
          </>
        }
      >
        <Reveal className="mt-4">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide" style={{ color: 'var(--cobalt)' }}>
            Discuss your scope <ArrowUpRight size={14} />
          </a>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_SERVICES.map((s, i) => {
            const tone = TONES[i % TONES.length];
            return (
              <Reveal
                key={s.id} as="a" href={`#service-${s.id}`} delay={i * 60}
                className="card block p-6 transition-transform hover:-translate-y-1"
                style={{ background: tone.bg, color: tone.fg }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border-[3px]" style={{ borderColor: 'var(--ink)', background: 'rgba(255,255,255,.55)' }}>
                    <s.icon size={18} />
                  </span>
                  {s.badge && <span className="sticker px-2 py-1 text-[9px]" style={{ '--r': '6deg', background: 'var(--ink)', color: '#fff' }}>{s.badge}</span>}
                </div>
                <h3 className={`mt-4 ${F_DISPLAY} text-lg font-extrabold`}>{s.title}</h3>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-wide opacity-70">{s.tagline}</p>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{s.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide">See the proof <ArrowUpRight size={11} /></span>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section id="about" eyebrow="About Cosmicinnovation Lab" title="A technology partner built for your maximum growth.">
        <Reveal as="p" className="max-w-2xl leading-relaxed text-[var(--ink)]/70">
          Founded in Sasaram, Bihar, Cosmicinnovation Lab is a dedicated team of senior engineers, SEO strategists, and digital marketers who treat every client engagement like it&rsquo;s our own product. We serve founders launching their first website and established businesses ready to scale their online presence across India.
        </Reveal>

        <Reveal className="card mt-8 max-w-2xl p-6" style={{ background: 'var(--cream)' }}>
          <p className="text-[11px] font-extrabold uppercase tracking-wide" style={{ color: 'var(--cobalt)' }}>Our methodology</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/70">
            Every project begins with a discovery audit — we map your competitive landscape, current search visibility, and conversion gaps before writing a single line of code or publishing a single piece of content. Our SEO campaigns are fully transparent: monthly ranking reports, keyword-by-keyword tracking, and a direct WhatsApp line to the team managing your account.
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-[var(--ink)]/40">
            Last updated: <time dateTime={LAST_UPDATED}>August 2025</time>
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {WHY_US.map((item, i) => (
            <Reveal key={item.title} delay={i * 60} className="card p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'var(--yellow)' }}><Check size={16} /></span>
              <h3 className={`mt-4 ${F_DISPLAY} text-lg font-extrabold text-[var(--ink)]`}>{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/60">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="card relative mt-10 p-8" style={{ background: 'var(--yellow)' }}>
          <p className={`${F_DISPLAY} text-xl italic leading-relaxed text-[var(--ink)] sm:text-2xl`}>
            &ldquo;Great software is built by people who stay accountable after the invoice is paid.&rdquo;
          </p>
          <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-[var(--ink)]/70">— Team Cosmicinnovation Lab</p>
        </Reveal>
      </Section>

      {CORE_SERVICES.map((s, i) => <ServiceShowcase key={s.id} service={s} index={i} />)}

      <Approach />

      <Section id="process" eyebrow="Flight path" title="Six stages from first call to launch day.">
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-[22px] hidden h-1 sm:block" style={{ background: 'var(--ink)' }} />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.stage} delay={i * 70} className="relative">
                <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-[3px]" style={{ borderColor: 'var(--ink)', background: 'var(--yellow)' }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: 'var(--ink)' }} />
                </div>
                <div className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.15em]" style={{ color: 'var(--cobalt)' }}>Stage {p.stage}</div>
                <h3 className={`mt-1 ${F_DISPLAY} text-base font-extrabold text-[var(--ink)]`}>{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink)]/60">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="work" eyebrow="Deployed" title="Live systems, currently in production.">
        <p className="mt-2 font-mono text-xs text-[var(--ink)]/50">Portfolio last updated <time dateTime="2025-06-21">21 Jun 2025</time></p>
        <div className="-mx-6 mt-10 overflow-x-auto pb-4">
          <div className="flex w-max gap-5 px-6">
            {PORTFOLIO.map((p, i) => (
              <Reveal key={p.domain} delay={i * 40} className="card w-72 shrink-0 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-[3px]" style={{ borderColor: 'var(--ink)', background: 'var(--cream)' }}><Globe size={16} /></span>
                  <div>
                    <h3 className={`${F_DISPLAY} text-base font-extrabold text-[var(--ink)]`}>{p.name}</h3>
                    <p className="text-[10px] font-extrabold uppercase tracking-wide" style={{ color: 'var(--cobalt)' }}>Live // {p.domain}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[var(--ink)]/60">{p.category}</p>
                <a href={p.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[var(--ink)]/80 hover:text-[var(--cobalt)]">
                  Visit site <ArrowUpRight size={12} />
                </a>
              </Reveal>
            ))}
            <div className="card flex w-56 shrink-0 flex-col items-center justify-center p-6 text-center" style={{ background: 'var(--cream)' }}>
              <span className="text-xs font-extrabold uppercase tracking-wide text-[var(--ink)]/50">More missions in progress</span>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="results" eyebrow="Proof, not promises" title="Real businesses. Real ranking gains."
        lead="Every number below belongs to a client currently live — click through and verify it yourself."
      >
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const tone = TONES[i % TONES.length];
            return (
              <Reveal key={t.domain} delay={i * 70} className="relative">
                <div className="card p-6" style={{ background: tone.bg, color: tone.fg }}>
                  <Frame src={t.media ? `/${t.media}` : undefined} label={`Drop ${t.media} into /public`} alt={`${t.name} — Cosmicinnovation Lab results`} className="mb-5" />
                  <blockquote><p className={`${F_DISPLAY} text-base italic leading-relaxed`}>&ldquo;{t.quote}&rdquo;</p></blockquote>
                  <div className="mt-5 flex items-end justify-between gap-3 border-t-[3px] pt-5" style={{ borderColor: 'var(--ink)' }}>
                    <div>
                      <div className={`${F_DISPLAY} text-2xl font-extrabold`}><CountUp value={t.stat.value} suffix={t.stat.suffix} /></div>
                      <div className="mt-1 max-w-[8rem] text-[10px] font-extrabold uppercase leading-relaxed tracking-wide opacity-70">{t.stat.label}</div>
                    </div>
                    <div className="text-right">
                      <div className={`${F_DISPLAY} text-sm font-extrabold`}>{t.name}</div>
                      <div className="text-[10px] font-extrabold opacity-70">{t.role}</div>
                    </div>
                  </div>
                  <a href={t.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide hover:underline">
                    Visit website <ArrowUpRight size={12} />
                  </a>
                </div>
                <span aria-hidden="true" className="absolute -bottom-3 left-8 h-6 w-6 rotate-45 border-b-[3px] border-r-[3px]" style={{ background: tone.bg, borderColor: 'var(--ink)' }} />
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section id="industries" eyebrow="Industries" title="Sector-specific software, not generic templates.">
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.title} delay={i * 50} className="card p-6">
              <h3 className={`${F_DISPLAY} text-lg font-extrabold text-[var(--ink)]`}>{ind.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/60">{ind.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="faq" eyebrow="Common questions" title="Answers you can quote"
        lead={<>Straight answers to the questions we hear most often. Last updated <time dateTime={LAST_UPDATED}>August 2025</time>.</>}
      >
        <div className="mt-10 divide-y-[3px]" style={{ borderColor: 'var(--ink)' }}>
          {FAQS.map((f, i) => (
            <Reveal as="details" key={f.q} delay={i * 30} className="group py-5">
              <summary className={`${F_DISPLAY} flex cursor-pointer list-none items-start gap-3 text-base font-extrabold text-[var(--ink)] sm:text-lg`}>
                <span className="mt-0.5 inline-block shrink-0 transition-transform group-open:rotate-45" style={{ color: 'var(--cobalt)' }}>+</span>
                {f.q}
              </summary>
              <p className="mt-3 pl-6 leading-relaxed text-[var(--ink)]/60">{f.a}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Cta />
      <Footer />
    </div>
  );
}