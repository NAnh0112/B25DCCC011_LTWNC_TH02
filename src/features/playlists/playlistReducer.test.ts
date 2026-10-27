import { describe, it, expect } from 'vitest';
import { playlistReducer } from './playlistReducer';
import type { Playlist } from './playlistReducer';

describe('playlistReducer', () => {
  it('tạo playlist và addSong không thêm trùng, removeSong, xóa playlist không tồn tại giữ nguyên state', () => {
    const initialState: Playlist[] = [];

    const state1 = playlistReducer(initialState, { type: 'create', name: 'Yêu thích' });
    expect(state1).toHaveLength(1);
    expect(state1[0].name).toBe('Yêu thích');

    const plId = state1[0].id;

    const state2 = playlistReducer(state1, { type: 'addSong', playlistId: plId, songId: 's1' });
    expect(state2[0].songIds).toEqual(['s1']);

    const state3 = playlistReducer(state2, { type: 'addSong', playlistId: plId, songId: 's1' });
    expect(state3[0].songIds).toEqual(['s1']);

    const state4 = playlistReducer(state3, { type: 'removeSong', playlistId: plId, songId: 's1' });
    expect(state4[0].songIds).toEqual([]);

    const state5 = playlistReducer(state4, { type: 'remove', id: 'non-existent' });
    expect(state5).toEqual(state4);
  });
});