import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import Image from 'next/image';

interface AnimePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: AnimePageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const animeDetails = await api.getAnimeDetails(resolvedParams.id);
  
  if (!animeDetails) {
    return {
      title: 'Anime Not Found - MovieStream',
    };
  }
  
  return {
    title: `${animeDetails.title} - MovieStream`,
    description: animeDetails.synopsis,
  };
}

export default async function AnimeDetailsPage({ params }: AnimePageProps) {
  const resolvedParams = await Promise.resolve(params);
  const animeDetails = await api.getAnimeDetails(resolvedParams.id);
  
  if (!animeDetails) {
    notFound();
  }
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Anime Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src={animeDetails.images.jpg.large_image_url}
                alt={animeDetails.title}
                width={500}
                height={750}
                className="w-full h-auto"
              />
            </div>
            
            {/* Anime Info */}
            <div className="mt-4 bg-zinc-900 rounded-lg p-4 space-y-3">
              <div>
                <h3 className="text-zinc-500 font-medium">Status</h3>
                <p>{animeDetails.status}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Episodes</h3>
                <p>{animeDetails.episodes || 'Unknown'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Score</h3>
                <p>{animeDetails.score ? `${animeDetails.score}/10` : 'N/A'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Aired</h3>
                <p>{animeDetails.aired?.string || 'Unknown'}</p>
              </div>
              
              {animeDetails.studios && animeDetails.studios.length > 0 && (
                <div>
                  <h3 className="text-zinc-500 font-medium">Studios</h3>
                  <p>{animeDetails.studios.map((studio: { mal_id: number; type: string; name: string; url: string }) => studio.name).join(', ')}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Anime Details */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl font-bold mb-2">{animeDetails.title}</h1>
            {animeDetails.title_english && animeDetails.title_english !== animeDetails.title && (
              <h2 className="text-xl text-zinc-400 mb-4">{animeDetails.title_english}</h2>
            )}
            
            {/* Genres */}
            {animeDetails.genres && animeDetails.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {animeDetails.genres.map((genre: { mal_id: number; type: string; name: string; url: string }) => (
                  <span key={genre.mal_id} className="px-3 py-1 bg-blue-900/50 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            {/* Synopsis */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
              <p className="text-zinc-300 leading-relaxed">{animeDetails.synopsis || 'No synopsis available.'}</p>
            </div>
            
            {/* Trailer */}
            {animeDetails.trailer?.embed_url && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Trailer</h2>
                <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
                  <iframe
                    src={animeDetails.trailer.embed_url}
                    allowFullScreen
                    className="w-full h-full"
                    title={`${animeDetails.title} Trailer`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}