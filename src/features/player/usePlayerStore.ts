import { create } from 'zustand';
import type { Song } from '../../types';

interface PlayerState {
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
  position: number;
  playQueue: (songs: Song[], startIndex: number) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  addToQueue: (song: Song) => void;
  tick: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  position: 0,
  playQueue: (songs, startIndex) => {
    set({
      queue: songs,
      currentIndex: startIndex,
      isPlaying: true,
      position: 0,
    });
  },
  togglePlay: () => {
    const { currentIndex } = get();
    if (currentIndex === -1) return;
    set((state) => ({ isPlaying: !state.isPlaying }));
  },
  next: () => {
    const { queue, currentIndex } = get();
    if (currentIndex < queue.length - 1) {
      set({ currentIndex: currentIndex + 1, position: 0, isPlaying: true });
    } else {
      set({ isPlaying: false });
    }
  },
  prev: () => {
    const { position, currentIndex } = get();
    if (position > 3 || currentIndex <= 0) {
      set({ position: 0 });
    } else {
      set({ currentIndex: currentIndex - 1, position: 0, isPlaying: true });
    }
  },
  addToQueue: (song) => {
    const { queue } = get();
    if (!queue.some((s) => s.id === song.id)) {
      set({ queue: [...queue, song] });
    }
  },
  tick: () => {
    const { isPlaying, position, queue, currentIndex } = get();
    if (!isPlaying || currentIndex === -1) return;
    const currentSong = queue[currentIndex];
    if (currentSong && position < currentSong.duration) {
      set({ position: position + 1 });
    } else {
      get().next();
    }
  },
}));