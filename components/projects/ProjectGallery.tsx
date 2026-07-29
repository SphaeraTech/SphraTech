'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { animate, utils } from 'animejs';
import { cn } from '@/utils/tailwind';
import { pick, type GalleryItem, type SanityImage } from '@/lib/projects';
import { useLanguage } from '@/app/contexts/LanguageContext';
import MediaReveal from '@/components/motion/MediaReveal';

function isVideo(item: GalleryItem): item is Extract<GalleryItem, { _type: 'galleryVideo' }> {
  return item._type === 'galleryVideo';
}

function aspect(image?: SanityImage) {
  return image?.asset?.metadata?.dimensions?.aspectRatio ?? 16 / 10;
}

export default function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const { t, language } = useLanguage();
  const r = t.realisations;

  /** Lightbox only cycles images — videos stay inline where they can be played. */
  const images = items.filter((item): item is SanityImage & { _type: 'galleryImage' } =>
    !isVideo(item) && Boolean(item.asset)
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (direction: 1 | -1) =>
      setOpenIndex((current) =>
        current === null ? null : (current + direction + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const el = lightboxRef.current;
    if (el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      utils.set(el, { opacity: 0 });
      animate(el, { opacity: [0, 1], duration: 220, ease: 'outQuad' });
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [openIndex, close, step]);

  if (items.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {items.map((item, index) => {
          const wide = item.wide;
          const caption = pick(item.caption, language);

          if (isVideo(item)) {
            const src = item.file?.asset?.url;
            if (!src) return null;
            return (
              <figure key={item._key ?? index} className={cn(wide && 'md:col-span-2')}>
                <MediaReveal
                  className="rounded-xl border border-edge bg-surface-2"
                  delay={(index % 2) * 90}
                  from={index % 2 === 0 ? 'left' : 'right'}
                >
                  <video
                    src={src}
                    poster={item.poster?.asset?.url}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-auto block"
                  />
                </MediaReveal>
                {caption && (
                  <figcaption className="mt-3 font-mono text-xs text-faint">{caption}</figcaption>
                )}
              </figure>
            );
          }

          const lightboxIndex = images.findIndex((img) => img === item);
          return (
            <figure key={item._key ?? index} className={cn(wide && 'md:col-span-2')}>
              <MediaReveal
                className="rounded-xl border border-edge bg-surface-2"
                delay={(index % 2) * 90}
                from={index % 2 === 0 ? 'left' : 'right'}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(lightboxIndex)}
                  className="group block w-full cursor-zoom-in"
                  style={{ aspectRatio: String(aspect(item)) }}
                  aria-label={caption ?? `Open image ${index + 1}`}
                >
                  <span className="relative block w-full h-full overflow-hidden">
                    <Image
                      src={item.asset!.url}
                      alt={item.alt ?? caption ?? ''}
                      fill
                      className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                      sizes={wide ? '(max-width: 768px) 100vw, 1200px' : '(max-width: 768px) 100vw, 50vw'}
                      placeholder={item.asset!.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={item.asset!.metadata?.lqip}
                    />
                  </span>
                </button>
              </MediaReveal>
              {caption && (
                <figcaption className="mt-3 font-mono text-xs text-faint">{caption}</figcaption>
              )}
            </figure>
          );
        })}
      </div>

      {openIndex !== null && images[openIndex]?.asset && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] bg-base/95 flex items-center justify-center p-4 md:p-12"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={r.closeGallery}
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-lg border border-edge text-ink hover:border-brand transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous image"
                className="absolute left-4 md:left-8 w-11 h-11 flex items-center justify-center rounded-lg border border-edge text-ink hover:border-brand transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                aria-label="Next image"
                className="absolute right-4 md:right-8 w-11 h-11 flex items-center justify-center rounded-lg border border-edge text-ink hover:border-brand transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <figure
            className="relative max-w-6xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="relative w-full rounded-xl overflow-hidden border border-edge"
              style={{ aspectRatio: String(aspect(images[openIndex])) }}
            >
              <Image
                src={images[openIndex].asset!.url}
                alt={images[openIndex].alt ?? ''}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between font-mono text-xs text-faint">
              <span>{pick(images[openIndex].caption, language)}</span>
              <span>
                {String(openIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
