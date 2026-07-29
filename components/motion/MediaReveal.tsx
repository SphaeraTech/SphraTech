'use client';

import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

interface MediaRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Extra delay in ms before the wipe starts once in view. */
  delay?: number;
  /** Wipe direction. Media alternating sides reads better with mirrored wipes. */
  from?: 'left' | 'right';
}

/**
 * A two-panel wipe for hero and gallery media: the ground-colored panel slides
 * off first, flashing the brand red beneath it, then the red panel follows to
 * expose the image. Uses transforms only — no clip-path tweening, no blur.
 *
 * This is the one place red is used as a large fill; it exists for ~200ms and
 * is what makes a case study feel like it was *presented* rather than loaded.
 */
export default function MediaReveal({
  children,
  className,
  delay = 0,
  from = 'left',
}: MediaRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const basePanel = baseRef.current;
    const brandPanel = brandRef.current;
    if (!root || !basePanel || !brandPanel) return;

    // Panels are only ever painted when we can actually animate them away.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      utils.set([basePanel, brandPanel], { opacity: 0 });
      return;
    }

    const exit = from === 'left' ? '101%' : '-101%';
    utils.set([basePanel, brandPanel], { opacity: 1, translateX: '0%' });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(basePanel, {
          translateX: exit,
          duration: 700,
          ease: 'inOutQuart',
          delay,
        });
        animate(brandPanel, {
          translateX: exit,
          duration: 700,
          ease: 'inOutQuart',
          delay: delay + 140,
        });
        io.disconnect();
      },
      { threshold: 0.25 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [delay, from]);

  return (
    <div ref={rootRef} className={`relative overflow-hidden ${className ?? ''}`}>
      {children}
      <div ref={brandRef} aria-hidden className="absolute inset-0 bg-brand opacity-0" />
      <div ref={baseRef} aria-hidden className="absolute inset-0 bg-base opacity-0" />
    </div>
  );
}
