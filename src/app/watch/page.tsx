import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Watch - MovieStream',
  description: 'Stream movies and TV shows online.',
};

export default async function WatchPage({
  searchParams,
}: {
  searchParams: { 
    tmdb?: string;
    type?: 'movie' | 'tv';
    season?: string;
    episode?: string;
  };
}) {
  // This page is now deprecated - redirect to the new route structure
  const { tmdb, type = 'movie', season, episode } = searchParams;
  
  if (!tmdb) {
    redirect('/');
  }
  
  // Redirect to new URL structure
  if (type === 'movie') {
    redirect(`/watch/movie/${tmdb}`);
  } else {
    redirect(`/watch/tv/${tmdb}?season=${season || '1'}&episode=${episode || '1'}`);
  }
  
  // This code will never run due to the redirects above
  return null;
} 