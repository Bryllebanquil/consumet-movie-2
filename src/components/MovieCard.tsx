import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { MediaBase } from '@/lib/types';
import { getImageUrl } from '@/lib/api';

interface MovieCardProps {
  media: MediaBase;
  aspectRatio?: 'poster' | 'backdrop';
  size?: 'sm' | 'md' | 'lg';
}

export default function MovieCard({ 
  media, 
  aspectRatio = 'poster', 
  size = 'md' 
}: MovieCardProps) {
  const title = media.title || media.name || 'Unknown Title';
  const mediaType = media.media_type || (media.title ? 'movie' : 'tv');
  
  // Determine href based on media type
  const href = mediaType === 'movie' 
    ? `/movies/${media.id}` 
    : mediaType === 'tv' 
      ? `/tv/${media.id}` 
      : mediaType === 'anime'
        ? `/anime/${media.id}`
        : mediaType === 'manga'
          ? `/manga/${media.id}`
          : '#';
      
  // Skip person media type
  if (mediaType === 'person') return null;
  
  // Determine aspect ratio class
  const aspectRatioClass = aspectRatio === 'poster' 
    ? 'aspect-[2/3]' 
    : 'aspect-video';
    
  // Determine size class
  const sizeClass = {
    sm: 'w-36 sm:w-40',
    md: 'w-40 sm:w-48 md:w-56',
    lg: 'w-48 sm:w-56 md:w-64',
  }[size];
  
  // Get appropriate image path and handle different URL formats
  const imagePath = aspectRatio === 'poster' 
    ? media.poster_path 
    : media.backdrop_path;

  // Determine if this is an anime/manga (direct URL) or movie/TV (TMDB path)
  const imageUrl = ['anime', 'manga'].includes(mediaType)
    ? imagePath || '/placeholder-image.svg' // Fallback for anime/manga
    : getImageUrl(imagePath || '', aspectRatio === 'poster' ? 'w500' : 'w780'); // Empty string fallback for TMDB
  
  return (
    <Link 
      href={href}
      className={`group relative ${sizeClass} ${aspectRatioClass} bg-zinc-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all duration-300 shadow-md hover:shadow-blue-500/20`}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes={`(max-width: 640px) 144px, (max-width: 768px) 192px, 224px`}
        className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-70"
        priority={false}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <h3 className="text-sm sm:text-base font-bold truncate text-white">{title}</h3>
        
        <div className="flex items-center mt-1">
          <FaStar className="text-yellow-500 w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span className="text-xs sm:text-sm text-white">
            {media.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}