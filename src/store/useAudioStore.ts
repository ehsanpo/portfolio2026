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
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  seekVersion: number;
  seekTime: number;
  setPlaylist: (tracks: Track[]) => void;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  requestSeek: (time: number) => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  playlist: [],
  currentIndex: 0,
  currentTime: 0,
  duration: 0,
  volume: 0.75,
  isMuted: false,
  seekVersion: 0,
  seekTime: 0,
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
      currentTime: 0,
      duration: 0,
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
        currentTime: 0,
        duration: 0,
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
        currentTime: 0,
        duration: 0,
      });
    }
  },
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),
  setMuted: (muted) => set({ isMuted: muted }),
  requestSeek: (time) =>
    set((state) => ({
      seekVersion: state.seekVersion + 1,
      seekTime: Math.max(0, time),
      currentTime: Math.max(0, time),
    })),
}));
