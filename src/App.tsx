import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import LibraryPage from './features/library/LibraryPage';
import { PlayerBar } from './features/player/PlayerBar';
import { PlaylistProvider } from './features/playlists/PlaylistContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const FavoritesPage = lazy(() => import('./features/favorites/FavoritesPage'));
const PlaylistsPage = lazy(() => import('./features/playlists/PlaylistsPage'));
const PlaylistDetailPage = lazy(() => import('./features/playlists/PlaylistDetailPage'));

function NavigationBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex gap-6 font-medium text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-green-600 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-green-600'
          }
        >
          Thư viện
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? 'text-green-600 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-green-600'
          }
        >
          Yêu thích
        </NavLink>
        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            isActive ? 'text-green-600 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-green-600'
          }
        >
          Playlist
        </NavLink>
      </div>
      <button
        onClick={toggleTheme}
        className="px-3 py-1.5 border rounded text-xs font-medium dark:border-gray-700 dark:bg-gray-800"
      >
        {theme === 'light' ? '🌙 Giao diện tối' : '☀️ Giao diện sáng'}
      </button>
    </nav>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PlaylistProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
            <NavigationBar />
            <div className="flex-1">
              <Suspense fallback={<div className="p-6 text-center">Đang tải trang...</div>}>
                <Routes>
                  <Route path="/" element={<LibraryPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/playlists" element={<PlaylistsPage />} />
                  <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
                </Routes>
              </Suspense>
            </div>
            <PlayerBar />
          </div>
        </BrowserRouter>
      </PlaylistProvider>
    </ThemeProvider>
  );
}