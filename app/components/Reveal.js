'use client';

import { motion, useReducedMotion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Reveal({ children, className = '', as = 'div', ...props }) {
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
