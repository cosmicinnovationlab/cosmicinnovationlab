'use client';

import { useEffect, useRef, useState, useId } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export function CountUp({ value, suffix = '', decimals = 0 }) {
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

export function RadialGauge({ value, label, size = 116 }) {
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

export function GrowthBars({ className = '' }) {
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
