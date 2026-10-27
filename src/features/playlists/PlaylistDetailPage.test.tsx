import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PlaylistProvider } from './PlaylistContext';
import PlaylistDetailPage from './PlaylistDetailPage';
import { usePlayerStore } from '../player/usePlayerStore';

describe('PlaylistDetailPage', () => {
  beforeEach(() => {
    localStorage.setItem(
      'music-playlists',
      JSON.stringify([{ id: 'pl1', name: 'Chạy bộ', songIds: ['s1', 's2'] }])
    );
  });

  it('hiển thị tổng thời lượng, phát tất cả và bỏ bài', async () => {
    const playQueue = vi.spyOn(usePlayerStore.getState(), 'playQueue');
    render(
      <PlaylistProvider>
        <MemoryRouter initialEntries={['/playlists/pl1']}>
          <Routes>
            <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
          </Routes>
        </MemoryRouter>
      </PlaylistProvider>
    );

    expect(screen.getByText(/Tổng thời lượng: 5 phút 37 giây/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Phát tất cả' }));
    expect(playQueue).toHaveBeenCalledWith(expect.any(Array), 0);
    await userEvent.click(screen.getAllByRole('button', { name: 'Bỏ' })[0]);
    expect(screen.getByText('Tổng thời lượng: 3 phút 7 giây (1 bài)')).toBeInTheDocument();
  });

  it('báo không tìm thấy playlist', () => {
    render(
      <PlaylistProvider>
        <MemoryRouter initialEntries={['/playlists/missing']}>
          <Routes>
            <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
          </Routes>
        </MemoryRouter>
      </PlaylistProvider>
    );
    expect(screen.getByText('Không tìm thấy playlist')).toBeInTheDocument();
  });
});
