'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function TrajectoryLine() {
  const { scrollYProgress } = useScroll();
  const trajectoryY = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 90,
    damping: 24,
    mass: 0.3,
  });

  return (
    <div className="pointer-events-none fixed right-6 top-0 z-40 hidden h-full w-px lg:block">
      <div className="absolute inset-y-24 right-0 w-px bg-white/10" />
      <motion.div style={{ height: trajectoryY }} className="absolute right-0 top-24 w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-fuchsia-500" />
      <motion.div
        style={{ top: trajectoryY }}
        className="absolute right-0 -mt-24 h-2.5 w-2.5 -translate-x-1/2 translate-y-24 rounded-full bg-cyan-300 shadow-[0_0_16px_4px_rgba(34,211,238,0.8)]"
      />
    </div>
  );
}
