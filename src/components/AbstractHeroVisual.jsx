import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';

/**
 * Original SVG composition: an isometric layered "stack" (a nod to backend layers —
 * data, services, interface) inside an orbit ring and technical grid.
 * Pointer-responsive tilt on fine-pointer devices only; static under reduced motion.
 */
export default function AbstractHeroVisual() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, [-1, 1], [-8, 8]);
  const rotateX = useTransform(sy, [-1, 1], [6, -6]);
  const shiftX = useTransform(sx, [-1, 1], [-10, 10]);
  const shiftY = useTransform(sy, [-1, 1], [-8, 8]);

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, mx, my]);

  // Isometric slab: top face, left face, right face
  const slab = (y, w, opacity, accent = false) => {
    const h = w * 0.5;
    const d = 22;
    const top = `0,${y - h / 2} ${w / 2},${y} 0,${y + h / 2} ${-w / 2},${y}`;
    const left = `${-w / 2},${y} 0,${y + h / 2} 0,${y + h / 2 + d} ${-w / 2},${y + d}`;
    const right = `${w / 2},${y} 0,${y + h / 2} 0,${y + h / 2 + d} ${w / 2},${y + d}`;
    return (
      <g>
        <polygon points={left} fill="url(#faceL)" opacity={opacity} />
        <polygon points={right} fill="url(#faceR)" opacity={opacity} />
        <polygon
          points={top}
          fill="url(#faceTop)"
          stroke={accent ? 'var(--color-accent)' : 'rgb(255 255 255 / 0.22)'}
          strokeWidth={accent ? 1.25 : 0.75}
          opacity={opacity}
        />
      </g>
    );
  };

  return (
    <div ref={ref} className="relative aspect-square w-full max-w-[560px] [perspective:1200px]" aria-hidden="true">
      {/* soft light */}
      <div className="absolute inset-[12%] rounded-full bg-accent/10 blur-[80px]" />

      <motion.svg
        viewBox="-260 -260 520 520"
        className="relative h-full w-full"
        style={{ rotateX, rotateY }}
      >
        <defs>
          <linearGradient id="faceTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a3d40" />
            <stop offset="1" stopColor="#1a1c1e" />
          </linearGradient>
          <linearGradient id="faceL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#202225" />
            <stop offset="1" stopColor="#0e0f10" />
          </linearGradient>
          <linearGradient id="faceR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#15171a" />
            <stop offset="1" stopColor="#090a0b" />
          </linearGradient>
          <radialGradient id="fade" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.55" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="gridMask">
            <rect x="-260" y="-260" width="520" height="520" fill="url(#fade)" />
          </mask>
        </defs>

        {/* technical grid */}
        <g mask="url(#gridMask)" stroke="rgb(255 255 255 / 0.06)" strokeWidth="1">
          {Array.from({ length: 13 }, (_, i) => -240 + i * 40).map((v) => (
            <g key={v}>
              <line x1={v} y1="-260" x2={v} y2="260" />
              <line x1="-260" y1={v} x2="260" y2={v} />
            </g>
          ))}
        </g>

        {/* orbit rings */}
        <g className="anim-slow-spin">
          <ellipse cx="0" cy="10" rx="210" ry="210" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeDasharray="2 7" />
          <circle cx="210" cy="10" r="4" fill="var(--color-accent)" />
        </g>
        <ellipse cx="0" cy="40" rx="190" ry="76" fill="none" stroke="rgb(255 255 255 / 0.08)" />

        {/* coordinates */}
        <g fontFamily="var(--font-mono)" fontSize="9" fill="rgb(255 255 255 / 0.35)" letterSpacing="1">
          <text x="-236" y="-226">X 0.00 / Y 0.00</text>
          <text x="140" y="236">SYS.LAYERS — 03</text>
          <line x1="-236" y1="-216" x2="-196" y2="-216" stroke="var(--color-accent)" strokeWidth="1" />
        </g>

        {/* the stack */}
        <motion.g style={{ x: shiftX, y: shiftY }}>
          <g className="anim-drift">
            {slab(70, 260, 0.9)}
            {slab(10, 220, 0.95)}
            {slab(-50, 180, 1, true)}
            {/* core node */}
            <circle cx="0" cy="-50" r="5" fill="var(--color-accent)" />
            <line x1="0" y1="-50" x2="0" y2="-150" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="0" cy="-156" r="3" fill="none" stroke="var(--color-accent)" />
          </g>
        </motion.g>

        {/* labels */}
        <g fontFamily="var(--font-mono)" fontSize="9" fill="rgb(255 255 255 / 0.45)" letterSpacing="1.5">
          <text x="132" y="-58">INTERFACE</text>
          <text x="152" y="4">SERVICES</text>
          <text x="172" y="66">DATA</text>
        </g>
      </motion.svg>
    </div>
  );
}
