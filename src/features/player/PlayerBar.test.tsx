import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { PlayerBar } from './PlayerBar';
import { usePlayerStore } from './usePlayerStore';

describe('PlayerBar', () => {
  beforeEach(() => {
    usePlayerStore.setState({
      queue: [{ id: 's1', title: 'Mưa tháng Sáu 1', artist: 'Lê Minh', genre: 'Pop', duration: 150 }],
      currentIndex: 0,
      isPlaying: true,
      position: 5,
    });
  });

  it('hiển thị bài đang phát và điều khiển tạm dừng', async () => {
    render(<PlayerBar />);
    expect(screen.getByText('Đang phát:')).toBeInTheDocument();
    expect(screen.getByText('Mưa tháng Sáu 1')).toBeInTheDocument();
    expect(screen.getByText('0:05')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Phát/Tạm dừng' }));
    expect(usePlayerStore.getState().isPlaying).toBe(false);
  });
});
