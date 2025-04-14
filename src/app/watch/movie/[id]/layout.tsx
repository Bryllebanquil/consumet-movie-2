import { Metadata } from 'next';
import { api } from '@/lib/api';

interface MovieWatchProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MovieWatchProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const movie = await api.getMovieDetails(resolvedParams.id);
  
  if (!movie) {
    return {
      title: 'Movie Not Found - MovieStream',
    };
  }
  
  return {
    title: `Watch ${movie.title} - MovieStream`,
    description: `Watch ${movie.title} online on MovieStream.`,
  };
}

export default function MovieWatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}