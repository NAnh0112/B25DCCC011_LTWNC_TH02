import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { playlistReducer } from './playlistReducer';
import type { Playlist, PlaylistAction } from './playlistReducer';
import { withLogger } from './withLogger';

const PlaylistStateContext = createContext<Playlist[] | undefined>(undefined);
const PlaylistDispatchContext = createContext<React.Dispatch<PlaylistAction> | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'music-playlists';

const getInitialPlaylists = (): Playlist[] => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) return [];

  try {
    const playlists: unknown = JSON.parse(saved);
    if (!Array.isArray(playlists)) return [];

    return playlists.filter((playlist): playlist is Playlist =>
      typeof playlist?.id === 'string' &&
      typeof playlist?.name === 'string' &&
      Array.isArray(playlist?.songIds)
    );
  } catch (error) {
    if (error instanceof SyntaxError) return [];
    throw error;
  }
};

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, dispatch] = useReducer(withLogger(playlistReducer), [], getInitialPlaylists);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playlists));
  }, [playlists]);

  const stateValue = useMemo(() => playlists, [playlists]);

  return (
    <PlaylistStateContext.Provider value={stateValue}>
      <PlaylistDispatchContext.Provider value={dispatch}>
        {children}
      </PlaylistDispatchContext.Provider>
    </PlaylistStateContext.Provider>
  );
};

export const usePlaylists = () => {
  const playlists = useContext(PlaylistStateContext);
  if (!playlists) {
    throw new Error('usePlaylists must be used within a PlaylistProvider');
  }
  return { playlists };
};

export const usePlaylistDispatch = () => {
  const context = useContext(PlaylistDispatchContext);
  if (!context) {
    throw new Error('usePlaylistDispatch must be used within a PlaylistProvider');
  }
  return context;
};