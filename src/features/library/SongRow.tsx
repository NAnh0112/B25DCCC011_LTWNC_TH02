import React, { memo } from 'react';
import type { Song } from '../../types';
import { formatDuration } from '../../utils/format';

interface SongRowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    songs: Song[];
    onPlay: (song: Song) => void;
    onAddToQueue: (song: Song, e: React.MouseEvent) => void;
    onToggleFavorite: (songId: string, e: React.MouseEvent) => void;
    favoriteIds: string[];
    playlists: { id: string; name: string }[];
    selectedPlaylistId: string;
    onAddToPlaylist: (playlistId: string, songId: string) => void;
  };
}

export const SongRow = memo(({ index, style, data }: SongRowProps) => {
  const { songs, onPlay, onAddToQueue, onToggleFavorite, favoriteIds, playlists, selectedPlaylistId, onAddToPlaylist } = data;
  const song = songs[index];
  if (!song) return null;

  const isFavorite = favoriteIds.includes(song.id);

  return (
    <div style={style} className="flex items-center px-4 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
      <div className="w-12 text-gray-500">{index + 1}</div>
      <div className="flex-1 font-medium truncate">{song.title}</div>
      <div className="w-32 truncate text-gray-600 dark:text-gray-400">{song.artist}</div>
      <div className="w-24 text-gray-500">{song.genre}</div>
      <div className="w-16 text-right text-gray-500">{formatDuration(song.duration)}</div>
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={() => onPlay(song)}
          className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
        >
          Phát
        </button>
        <button
          onClick={(e) => onAddToQueue(song, e)}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs hover:bg-gray-300"
        >
          + Hàng đợi
        </button>
        <button
          onClick={(e) => onToggleFavorite(song.id, e)}
          aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
          className="text-red-500 px-1"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        <button
          type="button"
          onClick={() => onAddToPlaylist(selectedPlaylistId, song.id)}
          disabled={!selectedPlaylistId || playlists.length === 0}
          className="text-xs border rounded px-1 py-0.5 dark:bg-gray-800 dark:border-gray-700"
        >
          + Playlist
        </button>
      </div>
    </div>
  );
});
SongRow.displayName = 'SongRow';