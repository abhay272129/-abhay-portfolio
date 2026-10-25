import { motion } from 'motion/react';

/** Fades and lifts children into view once. Respects reduced motion via MotionConfig. */
export default function Reveal({ children, delay = 0, y = 24, as = 'div', className = '' }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
