'use client';

import VideoPlayer from '@/components/VideoPlayer';

interface MoviePlayerProps {
  streamingUrl: string;
  title: string;
}

export default function MoviePlayer({ streamingUrl, title }: MoviePlayerProps) {
  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
      <iframe
        src={streamingUrl}
        allowFullScreen
        className="w-full h-full"
        title={`${title} Player`}
      />
    </div>
  );
}