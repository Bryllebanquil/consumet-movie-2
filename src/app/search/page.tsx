import { api } from "@/lib/api";
import { SearchResponse, MediaBase } from "@/lib/types";
import SearchBar from "@/components/SearchBar";
import MediaGrid from "@/components/MediaGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Movies & TV Shows - MovieStream",
  description: "Search for your favorite movies and TV shows to stream online.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  // Convert searchParams to regular variables after awaiting them
  const params = await Promise.resolve(searchParams);
  const query = params.q || '';
  const page = parseInt(params.page || '1', 10);
  
  let searchResults: SearchResponse | null = null;
  
  if (query) {
    searchResults = await api.search(query, page);
  }
  
  // Filter out person results and cast to MediaBase[]
  const mediaResults = (searchResults?.results?.filter(
    item => item.media_type !== 'person'
  ) || []) as MediaBase[];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Search Movies & TV Shows</h1>
        
        <SearchBar 
          className="mb-8" 
          placeholder="Search for movies, TV shows..."
        />
        
        {query ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">
              {mediaResults.length 
                ? `Results for "${query}"`
                : `No results found for "${query}"`}
            </h2>
            
            {mediaResults.length > 0 ? (
              <MediaGrid 
                items={mediaResults} 
                aspectRatio="poster"
              />
            ) : (
              <div className="text-center py-12 bg-zinc-900/30 rounded-lg">
                <p className="text-xl text-zinc-400">No results found</p>
                <p className="text-zinc-500 mt-2">Try a different search term</p>
              </div>
            )}
            
            {searchResults?.total_pages && searchResults.total_pages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {page > 1 && (
                  <a 
                    href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
                  >
                    Previous
                  </a>
                )}
                
                <span className="px-4 py-2 bg-zinc-800 rounded-md">
                  Page {page} of {searchResults.total_pages}
                </span>
                
                {page < searchResults.total_pages && (
                  <a 
                    href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                  >
                    Next
                  </a>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-900/30 rounded-lg">
            <p className="text-xl text-zinc-400">Enter a search term to find movies and TV shows</p>
          </div>
        )}
      </div>
    </div>
  );
} 