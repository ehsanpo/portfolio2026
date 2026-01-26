import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  src?: string;
}

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];
  currentIndex: number;
  setPlaylist: (tracks: Track[]) => void;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  playlist: [],
  currentIndex: 0,
  setPlaylist: (tracks) => set({ playlist: tracks }),
  playTrack: (track) => {
    const { playlist } = get();
    let trackIndex = playlist.findIndex(t => t.id === track.id);
    let newPlaylist = playlist;
    if (trackIndex === -1) {
      newPlaylist = [...playlist, track];
      trackIndex = newPlaylist.length - 1;
    }
    set({
      currentTrack: track,
      isPlaying: true,
      playlist: newPlaylist,
      currentIndex: trackIndex,
    });
  },
  pauseTrack: () => set({ isPlaying: false }),
  resumeTrack: () => set({ isPlaying: true }),
  nextTrack: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length > 0 && currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      set({
        currentIndex: nextIndex,
        currentTrack: playlist[nextIndex],
        isPlaying: true,
      });
    }
  },
  prevTrack: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length > 0 && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      set({
        currentIndex: prevIndex,
        currentTrack: playlist[prevIndex],
        isPlaying: true,
      });
    }
  },
}));
