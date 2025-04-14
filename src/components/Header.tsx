"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaHome, FaFilm, FaTv, FaSearch, FaBook } from 'react-icons/fa';
import { SiMyanimelist } from 'react-icons/si';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: FaHome },
    { href: '/movies', label: 'Movies', icon: FaFilm },
    { href: '/tv', label: 'TV Shows', icon: FaTv },
    { href: '/anime', label: 'Anime', icon: SiMyanimelist },
    { href: '/manga', label: 'Manga', icon: FaBook },
    { href: '/search', label: 'Search', icon: FaSearch },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-500 flex items-center">
            <span className="mr-1">🎬</span> MovieStream
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const activeClass = isActive(item.href) 
                ? 'text-blue-500 font-medium' 
                : 'text-zinc-400 hover:text-white transition-colors';
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center space-x-1 ${activeClass}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-zinc-400 hover:text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-zinc-800 mt-4">
            <ul className="space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const activeClass = isActive(item.href) 
                  ? 'text-blue-500 font-medium' 
                  : 'text-zinc-400 hover:text-white transition-colors';
                
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      className={`flex items-center space-x-2 ${activeClass}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}