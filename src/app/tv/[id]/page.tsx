import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaStar, FaPlay, FaCalendar, FaClock } from 'react-icons/fa';
import { api, getImageUrl, getStreamingUrl } from '@/lib/api';
import { TVShowDetails, Season, Video } from '@/lib/types';
import MediaGrid from '@/components/MediaGrid';

interface TVShowPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: TVShowPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const tvShow = await api.getTVDetails(resolvedParams.id);
  
  if (!tvShow) {
    return {
      title: 'TV Show Not Found - MovieStream',
    };
  }
  
  return {
    title: `${tvShow.name} (${tvShow.first_air_date?.slice(0, 4) || 'N/A'}) - MovieStream`,
    description: tvShow.overview,
  };
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const tvShow = await api.getTVDetails(resolvedParams.id);
  
  if (!tvShow) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-500">TV Show Not Found</h1>
        <p className="mt-4 text-lg text-zinc-400">
          The TV show you are looking for might have been removed or doesn't exist.
        </p>
        <Link href="/" className="mt-8 inline-block px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
          Go Home
        </Link>
      </div>
    );
  }
  
  const airYear = tvShow.first_air_date?.slice(0, 4) || 'N/A';
  const endYear = tvShow.last_air_date?.slice(0, 4);
  const yearRange = endYear && endYear !== airYear ? `${airYear}-${endYear}` : airYear;
  const avgRuntime = tvShow.episode_run_time?.length 
    ? `${tvShow.episode_run_time[0]} min` 
    : 'N/A';
  
  // Get creators and top cast members
  const creators = tvShow.created_by || [];
  const topCast = tvShow.credits?.cast.slice(0, 6) || [];
  
  // Get trailer
  const trailer = tvShow.videos?.results.find(
    (video: Video) => video.site === 'YouTube' && video.type === 'Trailer'
  ) || tvShow.videos?.results.find((video: Video) => video.site === 'YouTube');
  
  // Sort seasons
  const sortedSeasons = [...(tvShow.seasons || [])].filter(
    season => season.season_number > 0
  ).sort((a, b) => a.season_number - b.season_number);
  
  return (
    <>
      {/* Hero Section with Backdrop */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[800px]">
        <div className="absolute inset-0">
          <Image 
            src={getImageUrl(tvShow.backdrop_path, 'original')}
            alt={tvShow.name}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Poster */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="relative aspect-[2/3] max-w-[300px] mx-auto md:mx-0 rounded-lg overflow-hidden shadow-2xl">
                <Image 
                  src={getImageUrl(tvShow.poster_path, 'w500')}
                  alt={tvShow.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* TV Show Info */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {tvShow.name} <span className="text-zinc-400">({yearRange})</span>
              </h1>
              
              {/* Rating and Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-zinc-300">
                {tvShow.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span>{tvShow.vote_average.toFixed(1)}</span>
                  </div>
                )}
                
                {tvShow.first_air_date && (
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-zinc-400" />
                    <span>{new Date(tvShow.first_air_date).toLocaleDateString()}</span>
                  </div>
                )}
                
                {tvShow.episode_run_time?.length > 0 && (
                  <div className="flex items-center gap-1">
                    <FaClock className="text-zinc-400" />
                    <span>{avgRuntime}</span>
                  </div>
                )}
                
                <div className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded">
                  {tvShow.status || 'Unknown Status'}
                </div>
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {tvShow.genres?.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-zinc-800 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
              
              <p className="text-zinc-300 max-w-3xl">{tvShow.overview}</p>
              
              {/* Watch Button */}
              <div className="pt-4 flex flex-wrap gap-4">
                {sortedSeasons.length > 0 && (
                  <Link 
                    href={`/watch/tv/${resolvedParams.id}?season=1&episode=1`} 
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors"
                  >
                    <FaPlay />
                    <span>Watch Now</span>
                  </Link>
                )}
                
                {trailer && (
                  <a 
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full transition-colors"
                  >
                    <span>Watch Trailer</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* TV Show Details, Cast, and Seasons */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Seasons */}
            {sortedSeasons.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Seasons</h2>
                <div className="space-y-6">
                  {sortedSeasons.map((season: Season) => (
                    <div key={season.id} className="bg-zinc-900 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-1 sm:grid-cols-5">
                        {/* Season Poster */}
                        <div className="sm:col-span-1">
                          <div className="relative aspect-[2/3] h-full">
                            <Image 
                              src={getImageUrl(season.poster_path, 'w342')}
                              alt={season.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Season Info */}
                        <div className="sm:col-span-4 p-6">
                          <div className="flex flex-wrap justify-between items-start gap-4">
                            <div>
                              <h3 className="text-xl font-semibold">{season.name}</h3>
                              <p className="text-zinc-400">
                                {season.episode_count} Episodes • {season.air_date ? new Date(season.air_date).getFullYear() : 'TBA'}
                              </p>
                            </div>
                            
                            <Link 
                              href={`/watch/tv/${resolvedParams.id}?season=${season.season_number}&episode=1`}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-2"
                            >
                              <FaPlay className="w-3 h-3" />
                              <span>Watch</span>
                            </Link>
                          </div>
                          
                          <p className="mt-4 text-zinc-300 line-clamp-3">
                            {season.overview || 'No overview available for this season.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Cast */}
            {topCast.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {topCast.map((person: {id: number, name: string, character: string, profile_path: string | null}) => (
                    <div key={person.id} className="text-center">
                      <div className="relative w-full aspect-square rounded-full overflow-hidden bg-zinc-800 mb-2">
                        {person.profile_path ? (
                          <Image 
                            src={getImageUrl(person.profile_path, 'w185')}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-zinc-500">
                            No Image
                          </div>
                        )}
                      </div>
                      <p className="font-semibold truncate">{person.name}</p>
                      <p className="text-sm text-zinc-400 truncate">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Recommendations */}
            {tvShow.recommendations?.results && tvShow.recommendations.results.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Recommended Shows</h2>
                <MediaGrid 
                  items={tvShow.recommendations.results.slice(0, 12)} 
                  aspectRatio="poster"
                  size="sm"
                />
              </div>
            )}
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900 rounded-lg p-6 space-y-4">
              {/* Creators */}
              {creators.length > 0 && (
                <div>
                  <h3 className="text-zinc-400 font-medium">Created By</h3>
                  <p>{creators.map(person => person.name).join(', ')}</p>
                </div>
              )}
              
              {/* Networks */}
              {tvShow.networks && tvShow.networks.length > 0 && (
                <div>
                  <h3 className="text-zinc-400 font-medium">Networks</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {tvShow.networks.map(network => (
                      <div key={network.id} className="bg-white p-2 rounded">
                        {network.logo_path ? (
                          <div className="relative h-8 w-16">
                            <Image 
                              src={getImageUrl(network.logo_path, 'w92')}
                              alt={network.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <span className="text-black">{network.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Status */}
              {tvShow.status && (
                <div>
                  <h3 className="text-zinc-400 font-medium">Status</h3>
                  <p>{tvShow.status}</p>
                </div>
              )}
              
              {/* Type */}
              <div>
                <h3 className="text-zinc-400 font-medium">Type</h3>
                <p>TV Show</p>
              </div>
              
              {/* Number of Seasons and Episodes */}
              <div>
                <h3 className="text-zinc-400 font-medium">Seasons</h3>
                <p>{tvShow.number_of_seasons}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-400 font-medium">Episodes</h3>
                <p>{tvShow.number_of_episodes}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}