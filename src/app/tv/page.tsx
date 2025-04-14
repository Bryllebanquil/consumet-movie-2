import { Metadata } from 'next';
import { api } from '@/lib/api';
import MediaGrid from '@/components/MediaGrid';

export const metadata: Metadata = {
  title: 'TV Shows - MovieStream',
  description: 'Browse and watch the latest and most popular TV shows on MovieStream.',
};

export default async function TVShowsPage() {
  // Fetch trending and popular TV shows
  const trendingTVShows = await api.getTrending('tv', 'week');
  const popularTVShows = await api.getPopularTVShows();
  
  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section with gradient background */}
      <div className="bg-gradient-to-b from-purple-900/50 to-zinc-900 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">TV Shows</h1>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Explore the best TV series from around the world. From gripping dramas to hilarious comedies, find your next binge-worthy show.
          </p>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="container mx-auto px-4 space-y-12">
        {/* Trending TV Shows */}
        <section>
          <MediaGrid 
            title="Trending TV Shows" 
            items={trendingTVShows.results.slice(0, 12)} 
            aspectRatio="poster"
          />
        </section>
        
        {/* Popular TV Shows */}
        <section>
          <MediaGrid 
            title="Popular TV Shows" 
            items={popularTVShows.results.slice(0, 12)} 
            aspectRatio="poster"
          />
        </section>
      </div>
    </div>
  );
}