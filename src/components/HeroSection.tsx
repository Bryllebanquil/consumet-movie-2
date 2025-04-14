import Link from 'next/link';
import Image from 'next/image';
import { FaPlay, FaStar, FaInfoCircle } from 'react-icons/fa';
import { getImageUrl } from '@/lib/api';
import { MediaBase } from '@/lib/types';
import SearchBar from './SearchBar';

interface HeroSectionProps {
  media: MediaBase;
}

export default function HeroSection({ media }: HeroSectionProps) {
  const title = media.title || media.name || 'Untitled';
  const mediaType = media.media_type || (media.title ? 'movie' : 'tv');
  const href = mediaType === 'movie' ? `/movies/${media.id}` : `/tv/${media.id}`;
  const watchHref = `/watch/${mediaType}/${media.id}`;

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(media.backdrop_path, 'original')}
          alt={title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-blue-600 text-white text-xs uppercase tracking-wide rounded">
              {mediaType === 'movie' ? 'Movie' : 'TV Show'}
            </span>
            <div className="flex items-center space-x-1 text-yellow-500">
              <FaStar />
              <span className="text-white">{media.vote_average?.toFixed(1)}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{title}</h1>
          
          <p className="text-zinc-300 text-sm md:text-base line-clamp-3 md:line-clamp-4">
            {media.overview}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              href={watchHref}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full transition-colors"
            >
              <FaPlay />
              <span>Watch Now</span>
            </Link>
            <Link 
              href={href}
              className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-3 rounded-full transition-colors"
            >
              <FaInfoCircle />
              <span>More Info</span>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-8 md:mt-12 lg:mt-16 max-w-xl">
          <SearchBar 
            dark={false} 
            placeholder="Search for movies, TV shows..." 
          />
        </div>
      </div>
    </section>
  );
} 