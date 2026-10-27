import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SongRow } from './SongRow';
import type { Song } from '../../types';

describe('SongRow', () => {
  it('hiển thị tên bài và thời lượng 2:30, bấm nút Phát gọi hàm mock', async () => {
    const song: Song = {
      id: 's1',
      title: 'Mưa tháng Sáu',
      artist: 'Lê Minh',
      genre: 'Pop',
      duration: 150,
    };

    const mockPlay = vi.fn();
    const mockAddToQueue = vi.fn();
    const mockToggleFavorite = vi.fn();
    const mockAddToPlaylist = vi.fn();

    const data = {
      songs: [song],
      onPlay: mockPlay,
      onAddToQueue: mockAddToQueue,
      onToggleFavorite: mockToggleFavorite,
      favoriteIds: [],
      playlists: [],
      selectedPlaylistId: '',
      onAddToPlaylist: mockAddToPlaylist,
    };

    render(
      <div>
        <SongRow index={0} style={{}} data={data} />
      </div>
    );

    expect(screen.getByText('Mưa tháng Sáu')).toBeInTheDocument();
    expect(screen.getByText('2:30')).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: 'Phát' });
    await userEvent.click(playButton);

    expect(mockPlay).toHaveBeenCalledWith(song);
  });
});