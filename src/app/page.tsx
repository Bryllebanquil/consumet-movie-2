import HeroSection from "@/components/HeroSection";
import MediaGrid from "@/components/MediaGrid";
import { api } from "@/lib/api";
import { MediaBase } from "@/lib/types";

export default async function Home() {
  // Fetch trending movies and TV shows
  const trendingAll = await api.getTrending('all', 'week');
  const trendingMovies = await api.getTrending('movie', 'week');
  const trendingTVShows = await api.getTrending('tv', 'week');
  
  // Get popular movies and TV shows
  const popularMovies = await api.getPopularMovies();
  const popularTVShows = await api.getPopularTVShows();
  
  // Select a featured item for the hero section (first trending result with backdrop)
  const featuredItem = trendingAll.results.find((item: MediaBase) => item.backdrop_path) || trendingAll.results[0];
  
  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      {featuredItem && <HeroSection media={featuredItem} />}
      
      {/* Content Sections */}
      <div className="container mx-auto px-4 space-y-12 mt-12">
        {/* Trending Movies */}
        <section>
          <MediaGrid 
            title="Trending Movies" 
            items={trendingMovies.results.slice(0, 12)} 
            aspectRatio="poster"
          />
        </section>
        
        {/* Trending TV Shows */}
        <section>
          <MediaGrid 
            title="Trending TV Shows" 
            items={trendingTVShows.results.slice(0, 12)} 
            aspectRatio="poster"
          />
        </section>
        
        {/* Popular Movies */}
        <section>
          <MediaGrid 
            title="Popular Movies" 
            items={popularMovies.results.slice(0, 6)} 
            aspectRatio="backdrop"
            size="lg"
          />
        </section>
        
        {/* Popular TV Shows */}
        <section>
          <MediaGrid 
            title="Popular TV Shows" 
            items={popularTVShows.results.slice(0, 6)} 
            aspectRatio="backdrop"
            size="lg"
          />
        </section>
      </div>
    </div>
  );
}
