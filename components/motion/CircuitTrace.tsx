'use client';

import { useEffect, useRef } from 'react';
import { animate, svg, utils } from 'animejs';

interface CircuitTraceProps {
  className?: string;
  /** Delay in ms before the draw starts once in view. */
  delay?: number;
  /** Mirror the trace horizontally. */
  flip?: boolean;
}

/**
 * The brand signature: a circuit trace with a 45° bend ending in a node pad,
 * drawn from the logo's own detailing. Draws itself in when scrolled into
 * view. Color follows currentColor — set text-brand (or text-edge-strong for
 * a quiet divider) on the parent.
 */
export default function CircuitTrace({ className, delay = 0, flip = false }: CircuitTraceProps) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const path = root.querySelector('path');
    const node = root.querySelector('circle');
    if (!path || !node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      utils.set([path, node], { opacity: 1 });
      return;
    }

    utils.set(node, { opacity: 0 });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const [drawable] = svg.createDrawable(path);
        utils.set(path, { opacity: 1 });
        animate(drawable, { draw: '0 1', duration: 900, ease: 'inOutQuad', delay });
        animate(node, {
          opacity: [0, 1],
          scale: [0, 1],
          duration: 350,
          ease: 'outBack',
          delay: delay + 750,
        });
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [delay]);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 320 24"
      fill="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M0 20 H176 L192 6 H298"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0"
      />
      <circle
        cx="306"
        cy="6"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        style={{ transformOrigin: '306px 6px' }}
      />
    </svg>
  );
}
