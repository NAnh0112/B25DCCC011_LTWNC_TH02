import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PlaylistsPage from './PlaylistsPage';
import { PlaylistProvider } from './PlaylistContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <PlaylistProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </PlaylistProvider>
  );
};

describe('PlaylistsPage', () => {
  it('bấm Tạo khi ô trống hiển thị lỗi, nhập tên rồi bấm Tạo thì xuất hiện trong danh sách', async () => {
    renderWithProviders(<PlaylistsPage />);

    const createButton = screen.getByRole('button', { name: 'Tạo' });
    await userEvent.click(createButton);

    expect(screen.getByText('Tên playlist không được để trống')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Tên playlist...');
    await userEvent.type(input, 'Nhạc học tập');
    await userEvent.click(createButton);

    expect(screen.getByText('Nhạc học tập')).toBeInTheDocument();
  });
});