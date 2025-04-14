import { Metadata } from 'next';
import { api } from '@/lib/api';
import MediaGrid from '@/components/MediaGrid';

export const metadata: Metadata = {
  title: 'Movies - MovieStream',
  description: 'Browse and watch the latest and most popular movies on MovieStream.',
};

export default async function MoviesPage() {
  // Fetch trending and popular movies
  const trendingMovies = await api.getTrending('movie', 'week');
  const popularMovies = await api.getPopularMovies();
  
  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section with gradient background */}
      <div className="bg-gradient-to-b from-blue-900/50 to-zinc-900 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Movies</h1>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Discover the latest blockbusters and timeless classics. Stream in HD quality with no subscription required.
          </p>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="container mx-auto px-4 space-y-12">
        {/* Trending Movies */}
        <section>
          <MediaGrid 
            title="Trending Movies" 
            items={trendingMovies.results.slice(0, 12)} 
            aspectRatio="poster"
          />
        </section>
        
        {/* Popular Movies */}
        <section>
          <MediaGrid 
            title="Popular Movies" 
            items={popularMovies.results.slice(0, 12)} 
            aspectRatio="poster"
          />
        </section>
      </div>
    </div>
  );
}