import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressBar } from './ProgressBar';
import { usePlayerStore } from './usePlayerStore';

describe('ProgressBar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    usePlayerStore.setState({
      queue: [{ id: 's1', title: 'Mưa', artist: 'Lê Minh', genre: 'Pop', duration: 150 }],
      currentIndex: 0,
      isPlaying: true,
      position: 0,
    });
  });

  it('tăng thời gian mỗi giây khi đang phát và dừng timer khi unmount', () => {
    const { unmount } = render(<ProgressBar />);
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText('0:01')).toBeInTheDocument();

    unmount();
    act(() => vi.advanceTimersByTime(1000));
    expect(usePlayerStore.getState().position).toBe(1);
    vi.useRealTimers();
  });
});
