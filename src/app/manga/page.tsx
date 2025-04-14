import { Metadata } from 'next';
import { api } from '@/lib/api';
import MediaGrid from '@/components/MediaGrid';

export const metadata: Metadata = {
  title: 'Manga - MovieStream',
  description: 'Browse and discover the latest and most popular manga on MovieStream.',
};

export default async function MangaPage() {
  // Fetch top manga
  const topManga = await api.getTopManga();
  
  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section with gradient background */}
      <div className="bg-gradient-to-b from-green-900/50 to-zinc-900 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Manga</h1>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Explore the best manga from Japan and around the world. From action and adventure to romance and fantasy, find your next favorite read.
          </p>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="container mx-auto px-4 space-y-12">
        {/* Top Manga */}
        <section>
          <MediaGrid 
            title="Top Manga" 
            items={topManga.data.map(manga => ({
              id: manga.mal_id,
              title: manga.title,
              poster_path: manga.images.jpg.large_image_url,
              backdrop_path: null,
              overview: manga.synopsis,
              vote_average: manga.score,
              vote_count: manga.scored_by,
              popularity: manga.popularity,
              media_type: 'manga'
            }))} 
            aspectRatio="poster"
          />
        </section>
      </div>
    </div>
  );
}