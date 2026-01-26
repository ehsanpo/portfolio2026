
import type { FC } from 'react';
import LocalMusicPlayer from './LocalMusicPlayer';

interface MusicTrack {
  filename: string;
  title: string;
  artist: string;
  src: string;
}

interface MusicPlayerIslandProps {
  tracks: MusicTrack[];
}


const MusicPlayerIsland: FC<MusicPlayerIslandProps> = ({ tracks }) => {
  return <LocalMusicPlayer tracks={tracks} />;
};

export default MusicPlayerIsland;
