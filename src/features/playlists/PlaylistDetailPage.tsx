import { useParams } from 'react-router-dom';
import { usePlaylists, usePlaylistDispatch } from './PlaylistContext';
import { SONGS } from '../../data/songs';
import { usePlayerStore } from '../player/usePlayerStore';
import { formatDuration } from '../../utils/format';

export default function PlaylistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { playlists } = usePlaylists();
  const dispatch = usePlaylistDispatch();
  const playQueue = usePlayerStore((s) => s.playQueue);

  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return <div className="p-6 text-center text-gray-500">Không tìm thấy playlist</div>;
  }

  const playlistSongs = SONGS.filter((song) => playlist.songIds.includes(song.id));

  const totalDurationSeconds = playlistSongs.reduce((acc, song) => acc + song.duration, 0);
  const totalMinutes = Math.floor(totalDurationSeconds / 60);
  const totalSeconds = totalDurationSeconds % 60;

  return (
    <div className="p-6 pb-28">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{playlist.name}</h1>
          <div className="text-sm text-gray-500 mt-1">
            Tổng thời lượng: {totalMinutes} phút {totalSeconds} giây ({playlistSongs.length} bài)
          </div>
        </div>
        {playlistSongs.length > 0 && (
          <button
            onClick={() => playQueue(playlistSongs, 0)}
            className="px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700"
          >
            Phát tất cả
          </button>
        )}
      </div>

      {playlistSongs.length === 0 ? (
        <div className="text-gray-500 text-center py-12">Playlist chưa có bài hát nào</div>
      ) : (
        <div className="border rounded overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-800">
          {playlistSongs.map((song, index) => (
            <div key={song.id} className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
              <div className="w-12 text-gray-500">{index + 1}</div>
              <div className="flex-1 font-medium">{song.title}</div>
              <div className="w-32 text-gray-600 dark:text-gray-400">{song.artist}</div>
              <div className="w-24 text-gray-500">{song.genre}</div>
              <div className="w-16 text-right text-gray-500">{formatDuration(song.duration)}</div>
              <div className="flex items-center gap-3 ml-4">
                <button
                  onClick={() => playQueue(playlistSongs, index)}
                  className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                >
                  Phát
                </button>
                <button
                  onClick={() => dispatch({ type: 'removeSong', playlistId: playlist.id, songId: song.id })}
                  className="text-red-500 text-xs hover:underline"
                >
                  Bỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}