'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FreeTool } from '@/lib/freeToolsData';

interface FreeToolCardProps {
  tool: FreeTool;
}

export default function FreeToolCard({ tool }: FreeToolCardProps) {
  return (
    <Link
      href={tool.link}
      className="group flex flex-col bg-surface border border-edge hover:border-brand/40 rounded-xl overflow-hidden transition-all hover:-translate-y-0.5 h-full"
    >
      {/* Terminal-window header */}
      <div className="flex items-center gap-2 bg-surface-2 border-b border-edge px-4 py-2.5">
        <span className="w-2 h-2 rounded-full bg-edge-strong" />
        <span className="w-2 h-2 rounded-full bg-edge-strong" />
        <span className="w-2 h-2 rounded-full bg-edge-strong" />
        <span className="ml-2 font-mono text-xs text-faint truncate">~/tools/{tool.id}</span>
        {tool.featured && (
          <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-[0.15em] text-brand border border-brand/40 rounded px-2 py-0.5">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-3">
          $ {tool.categoryLabel.toLowerCase()}
        </span>
        <h3 className="font-display text-xl font-bold text-ink mb-2">{tool.title}</h3>
        <p className="text-body text-sm leading-relaxed flex-1">{tool.description}</p>

        <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-brand">
          Open tool
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
