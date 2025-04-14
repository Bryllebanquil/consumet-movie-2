'use client';

import { useState } from 'react';

interface FallbackPlayerLinkProps {
  fallbackUrl: string;
}

export default function FallbackPlayerLink({ fallbackUrl }: FallbackPlayerLinkProps) {
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = fallbackUrl;
      setHasClicked(true);
    }
  };

  return (
    <a 
      href="#" 
      onClick={handleClick}
      className="text-blue-400 hover:text-blue-300 text-sm"
    >
      {hasClicked ? 'Trying alternate source...' : 'Video not playing? Try alternate source'}
    </a>
  );
} 