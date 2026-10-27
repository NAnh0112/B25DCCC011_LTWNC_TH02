import { useFavoritesStore } from './useFavoritesStore';
import { SONGS } from '../../data/songs';
import { usePlayerStore } from '../player/usePlayerStore';
import { formatDuration } from '../../utils/format';

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((s) => s.ids);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const playQueue = usePlayerStore((s) => s.playQueue);

  const favoriteSongs = SONGS.filter((song) => favoriteIds.includes(song.id));

  return (
    <div className="p-6 pb-28">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bài hát yêu thích</h1>
        {favoriteSongs.length > 0 && (
          <button
            onClick={() => playQueue(favoriteSongs, 0)}
            className="px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700"
          >
            Phát tất cả
          </button>
        )}
      </div>

      {favoriteSongs.length === 0 ? (
        <div className="text-gray-500 text-center py-12">Bạn chưa có bài hát yêu thích</div>
      ) : (
        <div className="border rounded overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-800">
          {favoriteSongs.map((song, index) => (
            <div key={song.id} className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
              <div className="w-12 text-gray-500">{index + 1}</div>
              <div className="flex-1 font-medium">{song.title}</div>
              <div className="w-32 text-gray-600 dark:text-gray-400">{song.artist}</div>
              <div className="w-24 text-gray-500">{song.genre}</div>
              <div className="w-16 text-right text-gray-500">{formatDuration(song.duration)}</div>
              <div className="flex items-center gap-3 ml-4">
                <button
                  onClick={() => playQueue(favoriteSongs, index)}
                  className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                >
                  Phát
                </button>
                <button
                  onClick={() => toggleFavorite(song.id)}
                  aria-label="Bỏ yêu thích"
                  className="text-red-500"
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}