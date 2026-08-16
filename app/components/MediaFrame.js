'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

// Removed: framer-motion motion.div scan-line animation.
// The original `animate={{ x: ['-100%', '400%'] }}` with `repeat: Infinity` was running
// continuously on EVERY visible service card — that's 6+ separate Framer Motion RAF loops
// running simultaneously, causing constant GPU work and hurting INP.
// Replaced with a pure CSS animation which runs on the compositor thread and costs
// significantly less CPU/GPU because the browser can optimize it natively.

export default function MediaFrame({
  src,
  alt = '',
  chrome = 'browser',
  label,
  className = '',
  lazy = true,           // New prop: false for the hero (LCP element), true for below-fold
  fetchPriority = 'auto', // New prop: 'high' for the LCP frame, 'low' for others
  poster,               // New prop: poster image path for <video> elements
}) {
  const [broken, setBroken] = useState(!src);
  const isPhone = chrome === 'phone';
  const cleanSrc = src ? src.replace(/ /g, '%20') : src;
  const isVideo = cleanSrc && cleanSrc.endsWith('.mp4');

  useEffect(() => {
    setBroken(!src);
  }, [src]);

  // ── Dual chrome (desktop + phone overlay) ─────────────────────────────────
  if (chrome === 'dual') {
    return (
      <div className={`relative w-full max-w-[500px] mx-auto py-8 px-4 ${className}`}>
        {/* Desktop Mockup (Background) */}
        <div className="w-[85%] aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#040610]/40 backdrop-blur-sm shadow-[0_0_50px_-20px_rgba(34,211,238,0.3)]">
          <ChromeBar type="browser" />
          <div className="relative w-full aspect-video bg-gradient-to-br from-white/[0.04] to-transparent">
            <MediaContent
              broken={broken}
              setBroken={setBroken}
              cleanSrc={cleanSrc}
              isVideo={isVideo}
              alt={alt}
              lazy={lazy}
              fetchPriority={fetchPriority}
              poster={poster}
              sizes="85vw"
              placeholder="Desktop Demo"
            />
            <ScanLine />
          </div>
        </div>

        {/* Mobile Mockup (Foreground Overlapping) */}
        <div className="absolute bottom-[-1rem] right-0 w-[140px] aspect-[9/18] overflow-hidden rounded-[1.75rem] border-[5px] border-white/15 bg-[#040610] shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:translate-y-[-4px] transition-transform duration-300">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-16 rounded-b-md bg-white/15 z-20" />
          <div className="relative h-full w-full bg-gradient-to-br from-white/[0.04] to-transparent">
            <MediaContent
              broken={broken}
              setBroken={setBroken}
              cleanSrc={cleanSrc}
              isVideo={isVideo}
              alt={alt}
              lazy={true}
              fetchPriority="low"
              poster={poster}
              sizes="140px"
              placeholder="Mobile Demo"
            />
          </div>
        </div>
      </div>
    );
  }

  // ── Standard chrome (browser, phone, card, chat) ───────────────────────────
  return (
    <div className={`relative ${isPhone ? 'mx-auto max-w-[230px]' : ''} ${className}`}>
      <div
        className={`overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_0_60px_-24px_rgba(34,211,238,0.45)] ${
          isPhone ? 'rounded-[2rem] border-[6px]' : ''
        }`}
      >
        <ChromeBar type={chrome} />

        <div
          className={`relative w-full bg-gradient-to-br from-white/[0.04] to-transparent ${
            isPhone ? 'aspect-[9/17]' : 'aspect-video'
          }`}
        >
          <MediaContent
            broken={broken}
            setBroken={setBroken}
            cleanSrc={cleanSrc}
            isVideo={isVideo}
            alt={alt}
            lazy={lazy}
            fetchPriority={fetchPriority}
            poster={poster}
            sizes={isPhone ? '230px' : '(max-width: 768px) 100vw, 50vw'}
            placeholder={label || 'Demo coming soon'}
          />
          <ScanLine />
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ChromeBar({ type }) {
  if (type === 'browser') {
    return (
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-white/35">
          google.com/search
        </span>
      </div>
    );
  }
  if (type === 'chat') {
    return (
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
        <Sparkles size={12} className="text-cyan-300" />
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
          AI Assistant
        </span>
      </div>
    );
  }
  return null;
}

function MediaContent({
  broken, setBroken, cleanSrc, isVideo,
  alt, lazy, fetchPriority, poster, sizes, placeholder,
}) {
  if (!broken && cleanSrc && isVideo) {
    return (
      <video
        src={cleanSrc}
        autoPlay
        loop
        muted
        playsInline
        // preload="none" for service showcase videos (not the hero).
        // This defers network cost until the user scrolls to it.
        // The hero video is handled separately with fetchPriority="high".
        preload={lazy ? 'none' : 'metadata'}
        poster={poster}
        onError={() => setBroken(true)}
        className="h-full w-full object-cover"
      />
    );
  }

  if (!broken && cleanSrc && !isVideo) {
    return (
      <Image
        src={cleanSrc}
        alt={alt}
        fill
        sizes={sizes}
        // loading="lazy" for below-fold images — tells browser to skip them during initial load.
        // loading="eager" for LCP image (when lazy=false) so it isn't deprioritized.
        loading={lazy ? 'lazy' : 'eager'}
        fetchPriority={fetchPriority}
        onError={() => setBroken(true)}
        className="object-cover"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/30">
        <ImageIcon size={16} />
      </span>
      <p className="max-w-[15rem] font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-white/30">
        {placeholder}
      </p>
    </div>
  );
}

// CSS-only scan line — replaces the Framer Motion `animate={{ x }}` infinite loop.
// Running this as a CSS animation (not JS) means it executes on the browser's
// compositor thread and does not block the main thread or trigger JS layout reads.
function ScanLine() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-px w-1/3 scan-line"
    />
  );
}
