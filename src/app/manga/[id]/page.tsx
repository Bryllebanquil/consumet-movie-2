import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import Image from 'next/image';

interface MangaPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MangaPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const mangaDetails = await api.getMangaDetails(resolvedParams.id);
  
  if (!mangaDetails) {
    return {
      title: 'Manga Not Found - MovieStream',
    };
  }
  
  return {
    title: `${mangaDetails.title} - MovieStream`,
    description: mangaDetails.synopsis,
  };
}

export default async function MangaDetailsPage({ params }: MangaPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const mangaDetails = await api.getMangaDetails(resolvedParams.id);
  
  if (!mangaDetails) {
    notFound();
  }
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Manga Cover */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src={mangaDetails.images.jpg.large_image_url}
                alt={mangaDetails.title}
                width={500}
                height={750}
                className="w-full h-auto"
              />
            </div>
            
            {/* Manga Info */}
            <div className="mt-4 bg-zinc-900 rounded-lg p-4 space-y-3">
              <div>
                <h3 className="text-zinc-500 font-medium">Status</h3>
                <p>{mangaDetails.status}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Chapters</h3>
                <p>{mangaDetails.chapters || 'Unknown'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Volumes</h3>
                <p>{mangaDetails.volumes || 'Unknown'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Score</h3>
                <p>{mangaDetails.score ? `${mangaDetails.score}/10` : 'N/A'}</p>
              </div>
              
              <div>
                <h3 className="text-zinc-500 font-medium">Published</h3>
                <p>{mangaDetails.published?.string || 'Unknown'}</p>
              </div>
              
              {mangaDetails.authors && mangaDetails.authors.length > 0 && (
                <div>
                  <h3 className="text-zinc-500 font-medium">Authors</h3>
                  <p>{mangaDetails.authors.map((author: { mal_id: number; type: string; name: string; url: string }) => author.name).join(', ')}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Manga Details */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl font-bold mb-2">{mangaDetails.title}</h1>
            {mangaDetails.title_english && mangaDetails.title_english !== mangaDetails.title && (
              <h2 className="text-xl text-zinc-400 mb-4">{mangaDetails.title_english}</h2>
            )}
            
            {/* Genres */}
            {mangaDetails.genres && mangaDetails.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {mangaDetails.genres.map((genre: { mal_id: number; type: string; name: string; url: string }) => (
                  <span key={genre.mal_id} className="px-3 py-1 bg-green-900/50 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            {/* Synopsis */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
              <p className="text-zinc-300 leading-relaxed">{mangaDetails.synopsis || 'No synopsis available.'}</p>
            </div>
            
            {/* Background */}
            {mangaDetails.background && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Background</h2>
                <p className="text-zinc-300 leading-relaxed">{mangaDetails.background}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}