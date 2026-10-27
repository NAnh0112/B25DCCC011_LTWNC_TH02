import { describe, it, expect } from 'vitest';
import { generateSongs } from './songs';

describe('generateSongs', () => {
  it('sinh ra đúng 10000 phần tử, id không trùng và thời lượng trong khoảng 150-300', () => {
    const songs = generateSongs(10000);
    expect(songs).toHaveLength(10000);

    const ids = new Set(songs.map((s) => s.id));
    expect(ids.size).toBe(10000);

    songs.forEach((song) => {
      expect(song.duration).toBeGreaterThanOrEqual(150);
      expect(song.duration).toBeLessThanOrEqual(300);
    });
  });
});