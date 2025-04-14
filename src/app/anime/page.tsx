import { Metadata } from 'next';
import { api } from '@/lib/api';
import MediaGrid from '@/components/MediaGrid';

export const metadata: Metadata = {
  title: 'Anime - MovieStream',
  description: 'Browse and watch the latest and most popular anime on MovieStream.',
};

export default async function AnimePage() {
  // Fetch top and seasonal anime
  const topAnime = await api.getTopAnime();
  const seasonalAnime = await api.getSeasonalAnime();
  
  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section with gradient background */}
      <div className="bg-gradient-to-b from-blue-900/50 to-zinc-900 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Anime</h1>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Discover the best anime from Japan and beyond. From action-packed shonen to heartwarming slice-of-life, find your next anime obsession.
          </p>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="container mx-auto px-4 space-y-12">
        {/* Top Anime */}
        <section>
          <MediaGrid 
            title="Top Anime" 
            items={topAnime.data.map(anime => ({
              id: anime.mal_id,
              title: anime.title,
              poster_path: anime.images.jpg.large_image_url,
              backdrop_path: null,
              overview: anime.synopsis,
              vote_average: anime.score,
              vote_count: anime.scored_by,
              popularity: anime.popularity,
              media_type: 'anime'
            }))} 
            aspectRatio="poster"
          />
        </section>
        
        {/* Seasonal Anime */}
        <section>
          <MediaGrid 
            title="Seasonal Anime" 
            items={seasonalAnime.data.map(anime => ({
              id: anime.mal_id,
              title: anime.title,
              poster_path: anime.images.jpg.large_image_url,
              backdrop_path: null,
              overview: anime.synopsis,
              vote_average: anime.score,
              vote_count: anime.scored_by,
              popularity: anime.popularity,
              media_type: 'anime'
            }))} 
            aspectRatio="poster"
          />
        </section>
      </div>
    </div>
  );
}