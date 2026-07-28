'use client';

import { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Client {
  name: string;
  description: string;
  pictures: string[];
  siteLink: string;
}

interface ProjectCardProps {
  client: Client;
}

export default function ProjectCard({ client }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % client.pictures.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + client.pictures.length) % client.pictures.length);
  };

  return (
    <div className="group bg-surface border border-edge hover:border-brand/40 rounded-xl overflow-hidden transition-colors h-full">
      {/* Image Carousel */}
      <div className="relative h-80 bg-surface-2 overflow-hidden">
        {client.pictures.length > 0 ? (
          <>
            <Image
              src={`/${client.pictures[currentImageIndex]}`}
              alt={`${client.name} - Screenshot ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Image Navigation */}
            {client.pictures.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-base/70 hover:bg-base border border-edge text-ink rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-base/70 hover:bg-base border border-edge text-ink rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {client.pictures.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-brand w-8'
                          : 'bg-ink/40 hover:bg-ink/60 w-2'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 bg-brand/10 border border-brand/30 rounded-xl"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-display text-xl font-bold tracking-tight text-ink">{client.name}</h3>
          {client.siteLink && (
            <a
              href={client.siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-edge hover:border-brand text-ink rounded-lg font-mono text-xs uppercase tracking-[0.15em] transition-colors flex-shrink-0"
            >
              Visit Site
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {client.description && (
          <p className="text-body text-sm leading-relaxed">{client.description}</p>
        )}
      </div>
    </div>
  );
}
