import { MovieDetails, TVShow, Season, TrendingResponse, SearchResponse, AnimeResponse, MangaResponse } from './types';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';
const ANIMEPAHE_BASE_URL = 'https://api.consumet.org/anime/animepahe';

const tmdbApi = {
  async getTrending(mediaType: 'all' | 'movie' | 'tv', timeWindow: 'day' | 'week'): Promise<TrendingResponse> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${TMDB_API_KEY}&language=en-US`,
        {
          headers: {
            'Authorization': `Bearer ${TMDB_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trending media:', error);
      throw error;
    }
  },

  async getPopularMovies(): Promise<TrendingResponse> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  async getPopularTVShows(): Promise<TrendingResponse> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      throw error;
    }
  },

  async getMovieDetails(id: string): Promise<MovieDetails | null> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching TV details:', error);
      return null;
    }
  },

  async getTVDetails(id: string): Promise<TVShow | null> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching TV details:', error);
      return null;
    }
  },

  async getTVSeasonDetails(id: string, seasonNumber: number): Promise<Season | null> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/${id}/season/${seasonNumber}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching TV season details:', error);
      return null;
    }
  },

  async search(query: string, page: number = 1): Promise<SearchResponse> {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching media:', error);
      throw error;
    }
  }
};

// Get streaming URL from VidSrc
export const getStreamingUrl = async (tmdbId: string, mediaType?: 'movie' | 'tv', season?: number, episode?: number): Promise<string> => {
  // Use VidSrc.to API for real streaming links
  if (mediaType === 'movie' || !mediaType) {
    return `https://vidsrc.to/embed/movie/${tmdbId}`;
  } else {
    // For TV shows
    if (season && episode) {
      return `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}`;
    } else if (season) {
      return `https://vidsrc.to/embed/tv/${tmdbId}/${season}`;
    } else {
      return `https://vidsrc.to/embed/tv/${tmdbId}`;
    }
  }
};

// Get TMDB image URL with specified size
export const getImageUrl = (path: string | null, size: 'original' | 'w500' | 'w780' | 'w1280' | 'w342' | 'w185' | 'w92' = 'w500'): string => {
  if (!path) return '/placeholder-image.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Jikan API for anime and manga
const jikanApi = {
  async getTopAnime(page: number = 1, limit: number = 12): Promise<AnimeResponse> {
    try {
      const response = await fetch(
        `${JIKAN_BASE_URL}/top/anime?page=${page}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top anime:', error);
      throw error;
    }
  },

  async getSeasonalAnime(year: number = new Date().getFullYear(), season: string = 'now', page: number = 1, limit: number = 12): Promise<AnimeResponse> {
    try {
      const response = await fetch(
        `${JIKAN_BASE_URL}/seasons/${season === 'now' ? 'now' : `${year}/${season}`}?page=${page}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching seasonal anime:', error);
      throw error;
    }
  },

  async getAnimeDetails(id: string): Promise<any> {
    try {
      const response = await fetch(
        `${JIKAN_BASE_URL}/anime/${id}/full`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching anime details:', error);
      return null;
    }
  },

  async getTopManga(page: number = 1, limit: number = 12): Promise<MangaResponse> {
    try {
      const response = await fetch(
        `${JIKAN_BASE_URL}/top/manga?page=${page}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top manga:', error);
      throw error;
    }
  },

  async getMangaDetails(id: string): Promise<any> {
    try {
      const response = await fetch(
        `${JIKAN_BASE_URL}/manga/${id}/full`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching manga details:', error);
      return null;
    }
  },

  async searchAnime(query: string, page: number = 1, limit: number = 12): Promise<AnimeResponse> {
    try {
      const response = await fetch(
        `${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  },

  async getAnimeStreamingUrl(id: string): Promise<{ url: string }> {
    try {
      const response = await fetch(
        `${ANIMEPAHE_BASE_URL}/watch/${id}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { url: data.sources[0].url };
    } catch (error) {
      console.error('Error fetching anime streaming URL:', error);
      return { url: '' };
    }
  },

  async searchManga(query: string, page: number = 1, limit: number = 12): Promise<MangaResponse> {
    try {
      const response = await fetch(
        `${JIKAN_BASE_URL}/manga?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching manga:', error);
      throw error;
    }
  }
};

// Combine APIs
export const api = {
  ...tmdbApi,
  ...jikanApi
};