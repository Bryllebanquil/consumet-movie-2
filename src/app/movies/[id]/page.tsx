import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaStar, FaPlay, FaCalendar, FaClock, FaDollarSign } from 'react-icons/fa';
import { api, getImageUrl, getStreamingUrl } from '@/lib/api';
import { MovieDetails } from '@/lib/types';
import MediaGrid from '@/components/MediaGrid';

interface MoviePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const movie = await api.getMovieDetails(resolvedParams.id);
  
  if (!movie) {
    return {
      title: 'Movie Not Found - MovieStream',
    };
  }
  
  return {
    title: `${movie.title} (${movie.release_date?.slice(0, 4) || 'N/A'}) - MovieStream`,
    description: movie.overview,
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const resolvedParams = await Promise.resolve(params);
  const movie = await api.getMovieDetails(resolvedParams.id);
  
  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-500">Movie Not Found</h1>
        <p className="mt-4 text-lg text-zinc-400">
          The movie you are looking for might have been removed or doesn't exist.
        </p>
        <Link href="/" className="mt-8 inline-block px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
          Go Home
        </Link>
      </div>
    );
  }
  
  // Auto-detect media type for the streaming URL
  const watchUrl = await getStreamingUrl(resolvedParams.id);
  const releaseYear = movie.release_date?.slice(0, 4) || 'N/A';
  const formattedRuntime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';
  
  // Get director and top cast members
  const director = movie.credits?.crew.find(person => person.job === 'Director');
  const topCast = movie.credits?.cast?.slice(0, 6) || [];
  
  // Get trailer
  const trailer = movie.videos?.results?.find(
    video => video.site === 'YouTube' && video.type === 'Trailer'
  ) || movie.videos?.results?.find(video => video.site === 'YouTube');
  
  return (
    <>
      {/* Hero Section with Backdrop */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[800px]">
        <div className="absolute inset-0">
          <Image 
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
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
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Movie Info */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {movie.title} <span className="text-zinc-400">({releaseYear})</span>
              </h1>
              
              {/* Rating and Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-zinc-300">
                {movie.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                )}
                
                {movie.release_date && (
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-zinc-400" />
                    <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                  </div>
                )}
                
                {movie.runtime && movie.runtime > 0 && (
                  <div className="flex items-center gap-1">
                    <FaClock className="text-zinc-400" />
                    <span>{formattedRuntime}</span>
                  </div>
                )}
                
                {movie.budget && movie.budget > 0 && (
                  <div className="flex items-center gap-1">
                    <FaDollarSign className="text-zinc-400" />
                    <span>${(movie.budget / 1000000).toFixed(1)}M</span>
                  </div>
                )}
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-zinc-800 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
              
              {movie.tagline && (
                <p className="italic text-zinc-400">"{movie.tagline}"</p>
              )}
              
              <p className="text-zinc-300 max-w-3xl">{movie.overview}</p>
              
              {/* Watch Button */}
              <div className="pt-4 flex flex-wrap gap-4">
                <Link 
                  href={`/watch/movie/${resolvedParams.id}`} 
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors"
                >
                  <FaPlay />
                  <span>Watch Now</span>
                </Link>
                
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
      
      {/* Movie Details and Cast */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Cast and Crew */}
            {topCast.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {topCast.map(person => (
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
            {movie.recommendations?.results && movie.recommendations.results.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
                <MediaGrid 
                  items={movie.recommendations.results.slice(0, 12)} 
                  aspectRatio="poster"
                  size="sm"
                />
              </div>
            )}
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900 rounded-lg p-6 space-y-4">
              {/* Director */}
              {director && (
                <div>
                  <h3 className="text-zinc-400 font-medium">Director</h3>
                  <p>{director.name}</p>
                </div>
              )}
              
              {/* Status */}
              {movie.status && (
                <div>
                  <h3 className="text-zinc-400 font-medium">Status</h3>
                  <p>{movie.status}</p>
                </div>
              )}
              
              {/* Production Companies */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-zinc-400 font-medium">Production</h3>
                  <p>{movie.production_companies.map(co => co.name).join(', ')}</p>
                </div>
              )}
              
              {/* Budget & Revenue */}
              {movie.budget && movie.budget > 0 && (
                <div>
                  <h3 className="text-zinc-400 font-medium">Budget</h3>
                  <p>${movie.budget.toLocaleString()}</p>
                </div>
              )}
              
              {movie.revenue && movie.revenue > 0 && (
                <div>
                  <h3 className="text-zinc-400 font-medium">Revenue</h3>
                  <p>${movie.revenue.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}