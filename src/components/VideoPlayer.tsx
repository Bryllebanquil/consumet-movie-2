'use client';

import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaExpand, FaCompress, FaVolumeUp, FaVolumeMute, FaSpinner } from 'react-icons/fa';

interface VideoPlayerProps {
  tmdbId: string;
  mediaType: 'movie' | 'tv';
  season?: number;
  episode?: number;
}

export default function VideoPlayer({ tmdbId, mediaType, season, episode }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  // Mock video sources - in a real app, you would fetch these from your backend
  const videoSources = [
    { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video/mp4' },
    { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', type: 'video/mp4' }
  ];
  
  useEffect(() => {
    // Simulate API call to get video sources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setVolume(video.volume);
    const handleEnd = () => {
      setIsPlaying(false);
      if (video) video.currentTime = 0;
    };
    
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('ended', handleEnd);
    
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('ended', handleEnd);
    };
  }, []);
  
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };
  
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };
  
  const toggleFullScreen = () => {
    if (!playerRef.current) return;
    
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // For demo purposes, simulate what content is loading
  const contentInfo = mediaType === 'movie' 
    ? `Movie ID: ${tmdbId}` 
    : `TV Show ID: ${tmdbId}, Season: ${season}, Episode: ${episode}`;
  
  return (
    <div 
      ref={playerRef}
      className="relative w-full h-full bg-black group"
    >
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <FaSpinner className="animate-spin text-4xl mb-4" />
          <p className="text-lg">Loading video...</p>
          <p className="text-sm text-zinc-400 mt-2">{contentInfo}</p>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef}
            className="w-full h-full"
            onClick={togglePlay}
            poster="https://via.placeholder.com/1280x720/000000/FFFFFF?text=Loading+Video..."
          >
            {videoSources.map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
            ))}
            Your browser does not support the video tag.
          </video>
          
          {/* Player Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Progress bar */}
            <div 
              ref={progressRef}
              className="w-full h-1 bg-zinc-600 rounded-full cursor-pointer mb-2"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={togglePlay}
                  className="text-white hover:text-blue-500 transition-colors"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-blue-500 transition-colors"
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              
              <button 
                onClick={toggleFullScreen}
                className="text-white hover:text-blue-500 transition-colors"
              >
                {isFullScreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </div>
          
          {/* Big play button in center */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl opacity-80 hover:opacity-100 transition-opacity"
            >
              <FaPlay />
            </button>
          )}
        </>
      )}
    </div>
  );
} 