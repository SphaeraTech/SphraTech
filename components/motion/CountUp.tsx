'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

/**
 * Splits "+180%" into "+", 180, "%" so the number can be tweened while the
 * prefix and suffix stay put.
 *
 * Returns null — meaning "render this literally, don't animate" — when there is
 * no number, or when more digits follow the first run. Counting only the
 * leading number of "24/7 uptime" or "€27 800" would show nonsense like
 * "0/7 uptime" on the way up.
 */
function parse(value: string) {
  const match = value.match(/^(\D*?)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  if (/\d/.test(suffix)) return null;
  const normalized = digits.replace(',', '.');
  const decimals = normalized.split('.')[1]?.length ?? 0;
  return { prefix, suffix, target: parseFloat(normalized), decimals };
}

interface CountUpProps {
  value: string;
  className?: string;
  delay?: number;
}

/**
 * Counts a metric up from zero the first time it scrolls into view.
 *
 * The real value is what renders on the server and in the initial HTML — the
 * zero state is only applied on the client, right before the observer is
 * attached. A visitor without JS (or one whose observer never fires) is left
 * looking at the actual figure rather than a permanent "0".
 */
export default function CountUp({ value, className, delay = 0 }: CountUpProps) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !parsed) return;

    const settle = () => setDisplay(value);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Drop to zero before paint so there's no flash of the final number.
    setDisplay(
      `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`
    );

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const counter = { n: 0 };
        animate(counter, {
          n: parsed.target,
          duration: 1100,
          ease: 'outExpo',
          delay,
          onUpdate: () =>
            setDisplay(`${parsed.prefix}${counter.n.toFixed(parsed.decimals)}${parsed.suffix}`),
          onComplete: settle,
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
    // `parsed` is derived from `value`; tracking value alone keeps the effect stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
