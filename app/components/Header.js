'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GlowButton from './GlowButton';

const WHATSAPP_NUMBER = '918789698369';
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const WHATSAPP = waLink(
  'Hello, COSMIC Innovation! I would like to enquire about a software development requirement. Could you please provide more details?'
);

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Results', href: '#results' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
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
  );
}
