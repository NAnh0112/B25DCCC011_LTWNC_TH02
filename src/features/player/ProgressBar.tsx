import React, { useEffect } from 'react';
import { usePlayerStore } from './usePlayerStore';
import { formatDuration } from '../../utils/format';

export const ProgressBar: React.FC = () => {
  const position = usePlayerStore((s) => s.position);
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const tick = usePlayerStore((s) => s.tick);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, tick]);

  const currentSong = currentIndex !== -1 ? queue[currentIndex] : null;
  const duration = currentSong ? currentSong.duration : 0;
  const percent = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 w-full max-w-md">
      <span className="text-xs text-gray-500 w-10 text-right">{formatDuration(position)}</span>
      <div className="flex-1 bg-gray-300 dark:bg-gray-700 h-1.5 rounded overflow-hidden">
        <div
          className="bg-green-600 h-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 w-10">{formatDuration(duration)}</span>
    </div>
  );
};