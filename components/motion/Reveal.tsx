'use client';

import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

interface RevealProps {
  children: React.ReactNode;
  /** Extra delay in ms — use for per-card stagger (e.g. index * 70). */
  delay?: number;
  className?: string;
}

/**
 * The one scroll-reveal used sitewide: fade + 12px rise, 550ms, outCubic.
 * Content is hidden pre-reveal only when scripting is available (see the
 * [data-reveal] rule in globals.css), so no-JS visitors and reduced-motion
 * users always see it.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      utils.set(el, { opacity: 1 });
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(el, {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 550,
          ease: 'outCubic',
          delay,
        });
        io.disconnect();
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}
