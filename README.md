# MovieStream - Netflix-Style Streaming Platform

A modern streaming platform built with Next.js, TypeScript, and Tailwind CSS, featuring a Netflix-like user interface.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/moviestream.git
cd moviestream
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
# TMDB API Configuration (Required)
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

# API Base URLs (Optional - already configured in the code)
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_JIKAN_BASE_URL=https://api.jikan.moe/v4
NEXT_PUBLIC_CONSUMET_BASE_URL=https://api.consumet.org
```

4. Get your TMDB API key:
   - Go to [TMDB website](https://www.themoviedb.org/)
   - Create an account
   - Go to Settings > API
   - Generate an API key

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build for production:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **APIs**:
  - TMDB (Movies & TV Shows)
  - Jikan (Anime)
  - Consumet (Streaming)

## 📦 Project Structure

```
moviestream/
├── src/
│   ├── app/           # Next.js 14 app directory
│   ├── components/    # Reusable components
│   └── lib/          # Utilities and API functions
├── public/           # Static assets
└── ...config files
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_TMDB_API_KEY` | TMDB API Key | Yes |
| `NEXT_PUBLIC_TMDB_BASE_URL` | TMDB API Base URL | No |
| `NEXT_PUBLIC_JIKAN_BASE_URL` | Jikan API Base URL | No |
| `NEXT_PUBLIC_CONSUMET_BASE_URL` | Consumet API Base URL | No |

## 🎨 Features

- Netflix-like UI/UX
- Responsive design
- Movie and TV show streaming
- Anime and manga browsing
- Search functionality
- Dynamic routing
- Smooth animations
- Video player integration

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop
- Tablet
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for their comprehensive movie and TV show database
- [Jikan](https://jikan.moe/) for the Anime and Manga data
- [Consumet](https://consumet.org/) for streaming capabilities
- Netflix for UI/UX inspiration

## ⚠️ Important Notes

- This is a demo project and not intended for commercial use
- Please ensure you comply with TMDB's terms of service when using their API
- Some features might require additional configuration or API keys

## 📥 Download and Setup

### Method 1: Direct Download
1. Go to the GitHub repository
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to your desired location
5. Open a terminal in the extracted folder

### Method 2: Git Clone (Recommended)
```bash
# Using HTTPS
git clone https://github.com/yourusername/moviestream.git

# Using SSH
git clone git@github.com:yourusername/moviestream.git

# Using GitHub CLI
gh repo clone yourusername/moviestream
```

### After Download
1. Navigate to the project directory:
```bash
cd moviestream
```

2. Install all dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. Set up environment variables:
```bash
# Create .env.local file
cp .env.example .env.local  # If .env.example exists
# OR create it manually
touch .env.local
```

4. Add required environment variables to `.env.local`:
```env
# Required
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

# Optional - Default values are already configured
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_JIKAN_BASE_URL=https://api.jikan.moe/v4
NEXT_PUBLIC_CONSUMET_BASE_URL=https://api.consumet.org
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Troubleshooting Common Download Issues

1. **Git Clone Error**
   - Ensure you have Git installed: `git --version`
   - Check your GitHub credentials
   - Try using HTTPS if SSH isn't configured

2. **Dependencies Installation Error**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`: 
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```

3. **Port Already in Use**
   - Change the port:
     ```bash
     npm run dev -- -p 3001
     # or
     yarn dev -p 3001
     ```

4. **Node Version Error**
   - Install correct Node.js version (18+)
   - Use nvm to manage Node.js versions:
     ```bash
     nvm install 18
     nvm use 18
     ```
"# consumet-movie-2" 
