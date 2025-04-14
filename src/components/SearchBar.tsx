"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  dark?: boolean;
}

export default function SearchBar({ 
  className = '', 
  placeholder = 'Search for movies, TV shows...', 
  dark = true 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const bgColorClass = dark ? 'bg-zinc-800/50' : 'bg-white/10';
  const textColorClass = dark ? 'text-white' : 'text-zinc-900';
  const borderColorClass = dark ? 'border-zinc-700' : 'border-white/30';
  const placeholderColorClass = dark ? 'placeholder:text-zinc-400' : 'placeholder:text-zinc-500';

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`w-full max-w-xl relative ${className}`}
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-3 px-4 pl-12 ${bgColorClass} ${textColorClass} ${placeholderColorClass} border ${borderColorClass} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        <FaSearch 
          className="h-5 w-5 absolute left-4 text-zinc-400" 
        />
        <button
          type="submit"
          className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
} 