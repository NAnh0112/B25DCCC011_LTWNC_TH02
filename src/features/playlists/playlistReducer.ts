export interface Playlist {
  id: string;
  name: string;
  songIds: string[];
}

export type PlaylistAction =
  | { type: 'create'; name: string }
  | { type: 'rename'; id: string; name: string }
  | { type: 'remove'; id: string }
  | { type: 'addSong'; playlistId: string; songId: string }
  | { type: 'removeSong'; playlistId: string; songId: string };

export const playlistReducer = (state: Playlist[], action: PlaylistAction): Playlist[] => {
  switch (action.type) {
    case 'create': {
      const trimmed = action.name.trim();
      if (!trimmed) return state;
      if (state.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) {
        return state;
      }
      const newPlaylist: Playlist = {
        id: `pl_${Date.now()}`,
        name: trimmed,
        songIds: [],
      };
      return [...state, newPlaylist];
    }
    case 'rename': {
      return state.map((p) => (p.id === action.id ? { ...p, name: action.name } : p));
    }
    case 'remove': {
      return state.filter((p) => p.id !== action.id);
    }
    case 'addSong': {
      return state.map((p) => {
        if (p.id === action.playlistId) {
          if (p.songIds.includes(action.songId)) return p;
          return { ...p, songIds: [...p.songIds, action.songId] };
        }
        return p;
      });
    }
    case 'removeSong': {
      return state.map((p) => {
        if (p.id === action.playlistId) {
          return { ...p, songIds: p.songIds.filter((id) => id !== action.songId) };
        }
        return p;
      });
    }
    default:
      return state;
  }
};