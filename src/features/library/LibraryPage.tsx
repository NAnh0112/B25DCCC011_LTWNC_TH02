import React, { useState, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { SONGS, GENRES } from '../../data/songs';
import { useDebounce } from '../../hooks/useDebounce';
import { SongRow } from './SongRow';
import type { Song } from '../../types';
import { usePlayerStore } from '../player/usePlayerStore';
import { useFavoritesStore } from '../favorites/useFavoritesStore';
import { usePlaylists, usePlaylistDispatch } from '../playlists/PlaylistContext';

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('default');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');

  const playQueue = usePlayerStore((s) => s.playQueue);
  const addToQueue = usePlayerStore((s) => s.addToQueue);
  const favoriteIds = useFavoritesStore((s) => s.ids);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);

  const { playlists } = usePlaylists();
  const dispatch = usePlaylistDispatch();

  const filteredSongs = useMemo(() => {
    let result = SONGS;
    if (debouncedSearch.trim()) {
      const lower = debouncedSearch.toLowerCase();
      result = result.filter(
        (song) =>
          song.title.toLowerCase().includes(lower) ||
          song.artist.toLowerCase().includes(lower)
      );
    }
    if (selectedGenre !== 'All') {
      result = result.filter((song) => song.genre === selectedGenre);
    }
    if (sortBy === 'title-asc') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    } else if (sortBy === 'duration-asc') {
      result = [...result].sort((a, b) => a.duration - b.duration);
    }
    return result;
  }, [debouncedSearch, selectedGenre, sortBy]);

  const handlePlay = useCallback((song: Song) => {
    const index = filteredSongs.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      playQueue(filteredSongs, index);
    }
  }, [filteredSongs, playQueue]);

  const handleAddToQueue = useCallback((song: Song, e: React.MouseEvent) => {
    e.stopPropagation();
    addToQueue(song);
  }, [addToQueue]);

  const handleToggleFavorite = useCallback((songId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(songId);
  }, [toggleFavorite]);

  const handleAddToPlaylist = useCallback((playlistId: string, songId: string) => {
    if (!playlistId) return;
    dispatch({ type: 'addSong', playlistId, songId });
  }, [dispatch]);

  const itemData = useMemo(() => ({
    songs: filteredSongs,
    onPlay: handlePlay,
    onAddToQueue: handleAddToQueue,
    onToggleFavorite: handleToggleFavorite,
    favoriteIds,
    playlists,
    selectedPlaylistId,
    onAddToPlaylist: handleAddToPlaylist,
  }), [filteredSongs, handlePlay, handleAddToQueue, handleToggleFavorite, favoriteIds, playlists, selectedPlaylistId, handleAddToPlaylist]);

  return (
    <div className="p-6 pb-28 flex flex-col h-[calc(100vh-80px)]">
      <h1 className="text-2xl font-bold mb-4">Thư viện bài hát</h1>
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <div>
          <label htmlFor="search-input" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Tìm kiếm</label>
          <input
            id="search-input"
            type="text"
            placeholder="Tìm theo tên bài hoặc ca sĩ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Thể loại</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="All">Tất cả</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Sắp xếp</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="default">Mặc định</option>
            <option value="title-asc">Tên A-Z</option>
            <option value="duration-asc">Thời lượng tăng dần</option>
          </select>
        </div>
        <div>
          <label htmlFor="playlist-select" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Chọn Playlist</label>
          <select
            id="playlist-select"
            value={selectedPlaylistId}
            onChange={(e) => setSelectedPlaylistId(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="">-- Chọn playlist để thêm nhanh --</option>
            {playlists.map((pl) => (
              <option key={pl.id} value={pl.id}>{pl.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        {filteredSongs.length > 0 ? `Tìm thấy ${filteredSongs.length} bài hát` : 'Không tìm thấy bài hát nào'}
      </div>

      <div className="flex-1 border rounded overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-800">
        {filteredSongs.length > 0 ? (
          <List
            height={560}
            itemCount={filteredSongs.length}
            itemSize={56}
            width="100%"
            itemData={itemData}
          >
            {SongRow}
          </List>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Không tìm thấy bài hát nào
          </div>
        )}
      </div>
    </div>
  );
}