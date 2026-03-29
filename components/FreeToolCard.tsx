'use client';

import Link from 'next/link';
import { FreeTool } from '@/lib/freeToolsData';

interface FreeToolCardProps {
  tool: FreeTool;
}

export default function FreeToolCard({ tool }: FreeToolCardProps) {
  return (
    <Link href={tool.link}>
      <div className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-red-500/50 transition-all duration-300 overflow-hidden h-full">
        {/* Featured Badge */}
        {tool.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-8 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>

          {/* Placeholder Icon/Image */}
          <div className={`relative w-32 h-32 bg-gradient-to-br ${tool.gradient} rounded-3xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
            <div className="w-16 h-16 bg-white/20 rounded-2xl"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-3">
            <span className="text-xs font-semibold text-red-400 tracking-wider">
              {tool.categoryLabel}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
            {tool.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed">
            {tool.description}
          </p>

          {/* Hover Effect Border */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/20 rounded-2xl transition-colors pointer-events-none"></div>
        </div>
      </div>
    </Link>
  );
}