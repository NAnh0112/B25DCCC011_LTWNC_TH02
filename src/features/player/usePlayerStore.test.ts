import { describe, it, expect, beforeEach } from 'vitest';
import { usePlayerStore } from './usePlayerStore';
import { SONGS } from '../../data/songs';

describe('usePlayerStore', () => {
  beforeEach(() => {
    usePlayerStore.setState({
      queue: [],
      currentIndex: -1,
      isPlaying: false,
      position: 0,
    });
  });

  it('playQueue đặt đúng bài và tick ở giây cuối tự sang bài sau', () => {
    const testSongs = SONGS.slice(0, 2);
    testSongs[0].duration = 2;

    usePlayerStore.getState().playQueue(testSongs, 0);
    expect(usePlayerStore.getState().currentIndex).toBe(0);
    expect(usePlayerStore.getState().isPlaying).toBe(true);

    usePlayerStore.getState().tick();
    expect(usePlayerStore.getState().position).toBe(1);
    usePlayerStore.getState().tick();
    expect(usePlayerStore.getState().position).toBe(2);

    usePlayerStore.getState().tick();
    expect(usePlayerStore.getState().currentIndex).toBe(1);
    expect(usePlayerStore.getState().position).toBe(0);
  });

  it('next ở bài cuối thì isPlaying là false', () => {
    const testSongs = SONGS.slice(0, 1);
    usePlayerStore.getState().playQueue(testSongs, 0);
    expect(usePlayerStore.getState().isPlaying).toBe(true);

    usePlayerStore.getState().next();
    expect(usePlayerStore.getState().isPlaying).toBe(false);
  });
});