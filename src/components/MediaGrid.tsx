import { MediaBase } from '@/lib/types';
import MovieCard from './MovieCard';

interface MediaGridProps {
  items: MediaBase[];
  title?: string;
  aspectRatio?: 'poster' | 'backdrop';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function MediaGrid({
  items,
  title,
  aspectRatio = 'poster',
  size = 'md',
  className = '',
}: MediaGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 bg-zinc-900/30 rounded-lg">
        <p className="text-zinc-400">No items found</p>
      </div>
    );
  }

  // Determine grid columns based on aspect ratio
  const gridColsClass = aspectRatio === 'poster'
    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={className}>
      {title && <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>}
      
      <div className={`grid ${gridColsClass} gap-4 md:gap-6`}>
        {items.map((item) => (
          <MovieCard 
            key={item.id} 
            media={item} 
            aspectRatio={aspectRatio} 
            size={size} 
          />
        ))}
      </div>
    </div>
  );
} 