import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlaylists, usePlaylistDispatch } from './PlaylistContext';

export default function PlaylistsPage() {
  const { playlists } = usePlaylists();
  const dispatch = usePlaylistDispatch();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Tên playlist không được để trống');
      return;
    }
    const exists = playlists.some((p) => p.name.toLowerCase() === name.trim().toLowerCase());
    if (exists) {
      setError('Tên playlist đã tồn tại');
      return;
    }
    dispatch({ type: 'create', name });
    setName('');
    setError('');
  };

  return (
    <div className="p-6 pb-28">
      <h1 className="text-2xl font-bold mb-6">Danh sách Playlist</h1>

      <form onSubmit={handleCreate} className="mb-6 flex gap-3 items-start">
        <div>
          <input
            type="text"
            placeholder="Tên playlist..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            className="border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700"
          />
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700"
        >
          Tạo
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="border rounded p-4 bg-white dark:bg-gray-900 dark:border-gray-800 flex flex-col justify-between">
            <div>
              <Link to={`/playlists/${playlist.id}`} className="text-lg font-semibold hover:underline text-green-600">
                {playlist.name}
              </Link>
              <div className="text-sm text-gray-500 mt-1">{playlist.songIds.length} bài</div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => dispatch({ type: 'remove', id: playlist.id })}
                className="text-red-500 text-xs hover:underline"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}