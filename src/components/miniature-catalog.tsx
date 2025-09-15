'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { MiniatureCard } from './miniature-card';
import { Search } from 'lucide-react';
import type { Miniature } from '@/lib/types';

export function MiniatureCatalog({ miniatures }: { miniatures: Miniature[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMiniatures = useMemo(() => {
    if (!miniatures) return [];
    return miniatures.filter((miniature) =>
      miniature.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, miniatures]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for miniatures..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-full bg-card p-6 pl-12 text-lg"
        />
      </div>
      {filteredMiniatures.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMiniatures.map((miniature) => (
            <MiniatureCard key={miniature.id} miniature={miniature} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No miniatures found</h3>
            <p className="text-muted-foreground">Try adjusting your search term.</p>
        </div>
      )}
    </div>
  );
}
