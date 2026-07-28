import Reveal from './motion/Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
}

/** The one section-header pattern: mono red eyebrow, display heading, lede. */
export default function SectionHeader({ eyebrow, title, lede, className }: SectionHeaderProps) {
  return (
    <Reveal className={className ?? 'mb-12 md:mb-16'}>
      <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-4">
        {'// '}
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-2xl text-body md:text-lg">{lede}</p>}
    </Reveal>
  );
}
