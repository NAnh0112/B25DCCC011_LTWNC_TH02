import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { PlaylistProvider } from '../playlists/PlaylistContext';
import { useFavoritesStore } from '../favorites/useFavoritesStore';
import LibraryPage from './LibraryPage';

describe('LibraryPage', () => {
  it('lọc bài hát và thêm bài vào playlist đã chọn', async () => {
    localStorage.setItem(
      'music-playlists',
      JSON.stringify([{ id: 'pl1', name: 'Chạy bộ', songIds: [] }])
    );
    useFavoritesStore.setState({ ids: [] });
    render(
      <PlaylistProvider>
        <LibraryPage />
      </PlaylistProvider>
    );

    const search = screen.getByLabelText('Tìm kiếm');
    fireEvent.change(search, { target: { value: 'mưa' } });
    await new Promise((resolve) => setTimeout(resolve, 350));
    expect(screen.getByText('Tìm thấy 1250 bài hát')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Chọn Playlist'), { target: { value: 'pl1' } });
    await userEvent.click(screen.getAllByRole('button', { name: '+ Playlist' })[0]);
    await userEvent.click(screen.getAllByRole('button', { name: 'Thêm vào yêu thích' })[0]);
    expect(useFavoritesStore.getState().ids).toEqual(['s1']);
  });
});
