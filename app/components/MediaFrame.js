'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export default function MediaFrame({ src, alt = '', chrome = 'browser', label, className = '' }) {
  const [broken, setBroken] = useState(!src);
  const isPhone = chrome === 'phone';
  const cleanSrc = src ? src.replace(/ /g, '%20') : src;
  const isVideo = cleanSrc && cleanSrc.endsWith('.mp4');

  useEffect(() => {
    setBroken(!src);
  }, [src]);

  if (chrome === 'dual') {
    return (
      <div className={`relative w-full max-w-[500px] mx-auto py-8 px-4 ${className}`}>
        {/* Desktop Mockup (Background) */}
        <div className="w-[85%] aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#040610]/40 backdrop-blur-sm shadow-[0_0_50px_-20px_rgba(34,211,238,0.3)]">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-400/40" />
            <span className="ml-2 truncate rounded bg-white/5 px-2 py-0.5 font-mono text-[8px] text-white/35">
              cosmic.io/dashboard
            </span>
          </div>
          <div className="relative w-full aspect-video bg-gradient-to-br from-white/[0.04] to-transparent">
            {!broken && cleanSrc && isVideo && (
              <video
                src={cleanSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                onError={() => setBroken(true)}
                className="h-full w-full object-cover"
              />
            )}
            {!broken && cleanSrc && !isVideo && (
              <div className="relative w-full h-full">
                <Image
                  src={cleanSrc}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => setBroken(true)}
                  className="object-cover"
                />
              </div>
            )}
            {broken && (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
                Desktop Demo
              </div>
            )}
          </div>
        </div>

        {/* Mobile Mockup (Foreground Overlapping) */}
        <div className="absolute bottom-[-1rem] right-0 w-[140px] aspect-[9/18] overflow-hidden rounded-[1.75rem] border-[5px] border-white/15 bg-[#040610] shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:translate-y-[-4px] transition-transform duration-300">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-16 rounded-b-md bg-white/15 z-20" />
          <div className="relative h-full w-full bg-gradient-to-br from-white/[0.04] to-transparent">
            {!broken && cleanSrc && isVideo && (
              <video
                src={cleanSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                onError={() => setBroken(true)}
                className="h-full w-full object-cover"
              />
            )}
            {!broken && cleanSrc && !isVideo && (
              <div className="relative w-full h-full">
                <Image
                  src={cleanSrc}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  onError={() => setBroken(true)}
                  className="object-cover"
                />
              </div>
            )}
            {broken && (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
                Mobile Demo
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
          {!broken && cleanSrc && isVideo && (
            <video
              src={cleanSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onError={() => setBroken(true)}
              className="h-full w-full object-cover"
            />
          )}
          {!broken && cleanSrc && !isVideo && (
            <div className="relative w-full h-full">
              <Image
                src={cleanSrc}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={() => setBroken(true)}
                className="object-cover"
              />
            </div>
          )}
          {(broken || !cleanSrc) && (
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
