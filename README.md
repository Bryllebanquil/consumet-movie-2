<<<<<<< HEAD
# MovieStream - Movie & TV Show Streaming Platform

A modern movie and TV show streaming web application built with Next.js, TypeScript, and Tailwind CSS. This project uses the TMDb API for movie and TV show data, and VidSrc for streaming content.

## Features

- Browse trending movies and TV shows
- View movie and TV show details
- Watch trailers
- Stream movies and TV shows via VidSrc
- Responsive design for all devices
- Search functionality

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TMDb API](https://www.themoviedb.org/documentation/api) - Movie and TV show data
- [VidSrc](https://vidsrc.to/) - Streaming service
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- A TMDb API key (get one at [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/moviestream.git
cd moviestream
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your TMDb API key:

```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_TMDB_API_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
NEXT_PUBLIC_VIDSRC_BASE_URL=https://vidsrc.to/embed
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── movies/[id]/        # Movie details page
│   │   ├── tv/[id]/            # TV show details page
│   │   ├── search/             # Search page
│   │   ├── watch/              # Video player page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── HeroSection.tsx     # Hero section component
│   │   ├── MediaGrid.tsx       # Grid for movies/TV shows
│   │   ├── MovieCard.tsx       # Movie/TV show card
│   │   └── SearchBar.tsx       # Search input component
│   └── lib/                    # Utility functions
│       ├── api.ts              # API utility functions
│       └── types.ts            # TypeScript types
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind CSS configuration
└── next.config.js              # Next.js configuration
```

## Disclaimer

This project is for educational purposes only. All content is sourced from TMDb API and VidSrc, which aggregate data from various sources. Please respect copyright laws and only use this for personal and non-commercial purposes.

## Deployment to Render

1. Create a new account on [Render](https://render.com) if you haven't already.

2. Fork this repository to your GitHub account.

3. In the Render dashboard:
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Select the branch you want to deploy
   - Render will automatically detect the configuration from `render.yaml`

4. Configure environment variables:
   - In the Render dashboard, go to your web service
   - Add the required environment variables, especially `NEXT_PUBLIC_TMDB_API_KEY`

5. Deploy:
   - Render will automatically build and deploy your application
   - Once deployed, you can access your site at the provided Render URL

## License

MIT
"# consumet-movie-2" 
