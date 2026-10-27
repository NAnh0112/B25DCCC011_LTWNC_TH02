import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FavoritesPage from './FavoritesPage';
import { useFavoritesStore } from './useFavoritesStore';
import { usePlayerStore } from '../player/usePlayerStore';

describe('FavoritesPage', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ ids: [] });
    usePlayerStore.setState({ queue: [], currentIndex: -1, isPlaying: false, position: 0 });
  });

  it('hiển thị thông báo khi chưa có bài yêu thích', () => {
    render(<FavoritesPage />);
    expect(screen.getByText('Bạn chưa có bài hát yêu thích')).toBeInTheDocument();
  });

  it('phát tất cả và bỏ yêu thích bài đang hiển thị', async () => {
    useFavoritesStore.setState({ ids: ['s1'] });
    const playQueue = vi.spyOn(usePlayerStore.getState(), 'playQueue');
    render(<FavoritesPage />);

    await userEvent.click(screen.getByRole('button', { name: 'Phát tất cả' }));
    expect(playQueue).toHaveBeenCalledWith([expect.objectContaining({ id: 's1' })], 0);

    await userEvent.click(screen.getByRole('button', { name: 'Bỏ yêu thích' }));
    expect(useFavoritesStore.getState().ids).toEqual([]);
  });
});
