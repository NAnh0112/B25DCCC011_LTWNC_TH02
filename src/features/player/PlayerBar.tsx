import React from 'react';
import { usePlayerStore } from './usePlayerStore';
import { ProgressBar } from './ProgressBar';

export const PlayerBar: React.FC = () => {
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const next = usePlayerStore((s) => s.next);
  const prev = usePlayerStore((s) => s.prev);

  const currentSong = currentIndex !== -1 ? queue[currentIndex] : null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 z-50">
      <div className="w-1/4 truncate">
        {currentSong ? (
          <div>
            <div className="text-xs text-gray-500">Đang phát:</div>
            <div className="font-semibold text-sm truncate">{currentSong.title}</div>
            <div className="text-xs text-gray-500 truncate">{currentSong.artist}</div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Chưa phát bài nào</div>
        )}
      </div>

      <div className="flex flex-col items-center gap-1 w-1/2">
        <div className="flex items-center gap-4">
          <button onClick={prev} className="p-1 hover:text-green-600" aria-label="Trước">⏮️</button>
          <button onClick={togglePlay} className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700" aria-label="Phát/Tạm dừng">
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button onClick={next} className="p-1 hover:text-green-600" aria-label="Sau">⏭️</button>
        </div>
        <ProgressBar />
      </div>

      <div className="w-1/4 text-right text-xs text-gray-500">
        Hàng đợi: {queue.length} bài
      </div>
    </div>
  );
};