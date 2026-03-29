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
  gradient: string;
  border: string;
  iconBg: string;
}

export default function ProjectCard({ client, gradient, border, iconBg }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % client.pictures.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + client.pictures.length) % client.pictures.length);
  };

  return (
    <div className={`group relative bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl border ${border} overflow-hidden hover:scale-[1.02] transition-all duration-300`}>
      {/* Image Carousel */}
      <div className="relative h-80 bg-slate-800 overflow-hidden">
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
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {client.pictures.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
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
            <div className={`w-24 h-24 bg-gradient-to-br ${iconBg} rounded-2xl`}></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold">{client.name}</h3>
          <a 
            href={client.siteLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${iconBg} rounded-full font-semibold hover:scale-105 transition-all`}
          >
            <span className="text-sm">Visit Site</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        
        {client.description && (
          <p className="text-slate-300 leading-relaxed">{client.description}</p>
        )}
      </div>
    </div>
  );
}