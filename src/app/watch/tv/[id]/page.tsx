import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api, getStreamingUrl } from '@/lib/api';
import { SeasonSelector } from '@/components/SeasonSelector';

interface TVWatchProps {
  params: {
    id: string;
  };
  searchParams: {
    season?: string;
    episode?: string;
  };
}

export async function generateMetadata({ params, searchParams }: TVWatchProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const tvShow = await api.getTVDetails(resolvedParams.id);
  
  if (!tvShow) {
    return {
      title: 'TV Show Not Found - MovieStream',
    };
  }
  
  const seasonNumber = parseInt(resolvedSearchParams.season || '1', 10);
  const episodeNumber = parseInt(resolvedSearchParams.episode || '1', 10);
  
  return {
    title: `Watch ${tvShow.name} S${seasonNumber}E${episodeNumber} - MovieStream`,
    description: `Watch ${tvShow.name} Season ${seasonNumber} Episode ${episodeNumber} online on MovieStream.`,
  };
}

export default async function TVWatchPage({ params, searchParams }: TVWatchProps) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const tvShow = await api.getTVDetails(resolvedParams.id);
  
  if (!tvShow) {
    notFound();
  }
  
  const seasonNumber = parseInt(resolvedSearchParams.season || '1', 10);
  const episodeNumber = parseInt(resolvedSearchParams.episode || '1', 10);
  
  // Fetch season details to get episode info
  const seasonDetails = await api.getTVSeasonDetails(resolvedParams.id, seasonNumber);
  const episode = seasonDetails?.episodes?.find((ep: {episode_number: number}) => ep.episode_number === episodeNumber);
  
  // Get VidSrc streaming URL
  const streamingUrl = await getStreamingUrl(resolvedParams.id, 'tv', seasonNumber, episodeNumber);
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-1">{tvShow.name}</h1>
        <h2 className="text-lg text-zinc-400 mb-4">
          Season {seasonNumber}, Episode {episodeNumber}
          {episode?.name ? `: ${episode.name}` : ''}
        </h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
            <iframe
              src={streamingUrl}
              allowFullScreen
              className="w-full h-full"
              title={`${tvShow.name} S${seasonNumber}E${episodeNumber}`}
            />
          </div>
          
          <div className="mt-6 bg-zinc-900 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Episode info</h2>
            <p className="text-zinc-300">{episode?.overview || 'No episode information available.'}</p>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <h3 className="text-zinc-500 font-medium">Air Date</h3>
                <p>{episode?.air_date ? new Date(episode.air_date).toLocaleDateString() : 'Unknown'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Runtime</h3>
                <p>{episode?.runtime ? `${episode.runtime} min` : (tvShow.episode_run_time?.[0] ? `${tvShow.episode_run_time[0]} min` : 'Unknown')}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Rating</h3>
                <p>{episode?.vote_average ? `${episode.vote_average.toFixed(1)}/10` : 'Unknown'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Season</h3>
                <p>{seasonNumber} of {tvShow.number_of_seasons || '?'}</p>
              </div>
            </div>
            
            {/* Episode navigation */}
            <div className="mt-6 flex flex-wrap gap-2">
              {episodeNumber > 1 && (
                <a 
                  href={`/watch/tv/${resolvedParams.id}?season=${seasonNumber}&episode=${episodeNumber - 1}`}
                  className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
                >
                  Previous Episode
                </a>
              )}
              
              {seasonDetails?.episodes && episodeNumber < seasonDetails.episodes.length && (
                <a 
                  href={`/watch/tv/${resolvedParams.id}?season=${seasonNumber}&episode=${episodeNumber + 1}`}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                >
                  Next Episode
                </a>
              )}
              
              {/* Season selector */}
              {tvShow.seasons && tvShow.seasons.length > 1 && (
                <SeasonSelector
                  seasons={tvShow.seasons}
                  currentSeason={seasonNumber}
                  currentEpisode={episodeNumber}
                  tvId={resolvedParams.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}