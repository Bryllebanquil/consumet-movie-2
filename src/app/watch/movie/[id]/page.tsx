import { notFound } from 'next/navigation';
import { api, getStreamingUrl } from '@/lib/api';
import MoviePlayer from './MoviePlayer';

interface MovieWatchProps {
  params: {
    id: string;
  };
}

export default async function MovieWatchPage({ params }: MovieWatchProps) {
  const resolvedParams = await Promise.resolve(params);
  const movie = await api.getMovieDetails(resolvedParams.id);

  if (!movie) {
    notFound();
  }

  // Get VidSrc streaming URL
  const streamingUrl = await getStreamingUrl(resolvedParams.id, 'movie');

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
        
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
            <iframe
              src={streamingUrl}
              allowFullScreen
              className="w-full h-full"
              title={`${movie.title} Player`}
            />
          </div>
          
          <div className="mt-6 bg-zinc-900 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">About this movie</h2>
            <p className="text-zinc-300">{movie.overview}</p>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <h3 className="text-zinc-500 font-medium">Released</h3>
                <p>{movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Unknown'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Runtime</h3>
                <p>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'Unknown'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Rating</h3>
                <p>{movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'Unknown'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Genres</h3>
                <p>{movie.genres?.map((g: {id: number, name: string}) => g.name).join(', ') || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}