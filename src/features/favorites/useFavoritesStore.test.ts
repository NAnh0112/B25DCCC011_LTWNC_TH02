import { beforeEach, describe, expect, it } from 'vitest';
import { useFavoritesStore } from './useFavoritesStore';

describe('useFavoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ ids: [] });
    localStorage.removeItem('music-favorites');
  });

  it('thêm và bỏ bài hát yêu thích theo cùng một id', () => {
    useFavoritesStore.getState().toggle('s1');
    expect(useFavoritesStore.getState().ids).toEqual(['s1']);

    useFavoritesStore.getState().toggle('s1');
    expect(useFavoritesStore.getState().ids).toEqual([]);
  });

  it('không thêm trùng id khi chuyển đổi nhiều bài hát', () => {
    useFavoritesStore.getState().toggle('s1');
    useFavoritesStore.getState().toggle('s3');
    useFavoritesStore.getState().toggle('s1');
    useFavoritesStore.getState().toggle('s1');

    expect(useFavoritesStore.getState().ids).toEqual(['s3', 's1']);
  });
});
