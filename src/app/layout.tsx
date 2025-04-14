import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieStream - Watch Movies & TV Shows Online",
  description: "Stream your favorite movies and TV shows in HD quality with MovieStream.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vidsrc.to https://vidsrc.xyz https://2embed.org; frame-src https://vidsrc.to https://vidsrc.xyz https://2embed.org; img-src 'self' https://image.tmdb.org https://via.placeholder.com data:; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.themoviedb.org; font-src 'self'; media-src 'self' https://vidsrc.to https://vidsrc.xyz https://2embed.org; object-src 'none';"
        />
      </head>
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="py-6 border-t border-zinc-800 bg-zinc-900">
          <div className="container mx-auto px-4 text-center text-zinc-400">
            <p>© {new Date().getFullYear()} MovieStream. Powered by TMDb and VidSrc.</p>
            <p className="text-xs mt-2">This is a demo project for educational purposes only.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
