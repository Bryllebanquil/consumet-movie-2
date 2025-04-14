import { notFound } from 'next/navigation';
import { api } from '@/lib/api';

interface AnimeWatchProps {
  params: {
    id: string;
  };
}

export default async function AnimeWatchPage({ params }: AnimeWatchProps) {
  const resolvedParams = await Promise.resolve(params);
  const anime = await api.getAnimeDetails(resolvedParams.id);

  if (!anime) {
    notFound();
  }

  // Get AnimePahe streaming URL
  const streamingData = await api.getAnimeStreamingUrl(resolvedParams.id);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">{anime.title}</h1>
        
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
            <iframe
              src={streamingData?.url}
              allowFullScreen
              className="w-full h-full"
              title={`${anime.title} Player`}
            />
          </div>
          
          <div className="mt-6 bg-zinc-900 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">About this anime</h2>
            <p className="text-zinc-300">{anime.synopsis}</p>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <h3 className="text-zinc-500 font-medium">Status</h3>
                <p>{anime.status}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Episodes</h3>
                <p>{anime.episodes || 'Unknown'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Rating</h3>
                <p>{anime.score ? `${anime.score}/10` : 'Unknown'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Genres</h3>
                <p>{anime.genres?.map((g: {name: string}) => g.name).join(', ') || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}