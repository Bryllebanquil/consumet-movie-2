'use client';

import { useRouter } from 'next/navigation';

interface SeasonSelectorProps {
  seasons: Array<{
    id: number;
    season_number: number;
    episode_count: number;
  }>;
  currentSeason: number;
  currentEpisode: number;
  tvId: string;
}

export function SeasonSelector({
  seasons,
  currentSeason,
  currentEpisode,
  tvId,
}: SeasonSelectorProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [season, episode] = e.target.value.split(':');
    router.push(`/watch/tv/${tvId}?season=${season}&episode=${episode || '1'}`);
  };

  return (
    <select
      className="px-3 py-1 bg-zinc-800 rounded ml-auto"
      onChange={handleChange}
      value={`${currentSeason}:${currentEpisode}`}
    >
      {seasons
        .filter((s) => s.season_number > 0)
        .map((season) => (
          <optgroup key={season.id} label={`Season ${season.season_number}`}>
            {Array.from({ length: season.episode_count || 0 }, (_, i) => (
              <option key={i} value={`${season.season_number}:${i + 1}`}>
                S{season.season_number} E{i + 1}
              </option>
            ))}
          </optgroup>
        ))}
    </select>
  );
}