import React, { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useAudioStore } from "@/store/useAudioStore";
import Button from "@/components/ui/Button";

interface MusicTrack {
	filename: string;
	title: string;
	artist: string;
	src: string;
}

interface LocalMusicPlayerProps {
	tracks?: MusicTrack[];
}

const LocalMusicPlayer: React.FC<LocalMusicPlayerProps> = ({ tracks = [] }) => {
	const { currentTrack, isPlaying, playTrack, pauseTrack, resumeTrack, setPlaylist } =
		useAudioStore();
	const [localTracks, setLocalTracks] = React.useState<MusicTrack[]>(tracks);

	React.useEffect(() => {
		setLocalTracks(tracks);
	}, [tracks]);

	const handlePlayTrack = (track: MusicTrack) => {
		const trackData = {
			id: track.src,
			title: track.title,
			artist: track.artist,
			duration: "3:00",
			src: track.src,
		};

		if (currentTrack?.id === track.src && isPlaying) {
			pauseTrack();
		} else if (currentTrack?.id === track.src) {
			resumeTrack();
		} else {
			// Set the full playlist context so next/prev works
			const storePlaylist = localTracks.map((t) => ({
				id: t.src,
				title: t.title,
				artist: t.artist,
				duration: "3:00",
				src: t.src,
			}));
			setPlaylist(storePlaylist);
			playTrack(trackData);
		}
	};

	if (localTracks.length === 0) {
		return (
			<div className="border-accent/50 bg-card rounded-lg border p-8 text-center">
				<p className="text-muted-foreground">No local music tracks found</p>
			</div>
		);
	}

	return (
		<div className="custom-scrollbar max-h-[400px] space-y-2 overflow-y-auto pr-2">
			{localTracks.map((track) => {
				const isCurrentTrack = currentTrack?.id === track.src;
				return (
					<div
						key={track.src}
						className={`group flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all duration-200 ${
							isCurrentTrack
								? "border-primary-500/50 bg-primary-500/5"
								: "border-accent/50 bg-card/50 hover:bg-card hover:border-accent"
						}`}
						onClick={() => handlePlayTrack(track)}
					>
						<div className="flex min-w-0 flex-1 items-center space-x-4">
							<button
								className="bg-primary-500/10 hover:bg-primary-500/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors"
								onClick={(e) => {
									e.stopPropagation();
									handlePlayTrack(track);
								}}
							>
								{isCurrentTrack && isPlaying ? (
									<Pause size={18} className="text-primary-500" />
								) : (
									<Play size={18} className="text-primary-500 ml-0.5" />
								)}
							</button>
							<div className="min-w-0 flex-1">
								<div className="text-foreground truncate text-sm font-medium">{track.title}</div>
								<div className="text-muted-foreground truncate text-xs">{track.artist}</div>
							</div>
						</div>
						{isCurrentTrack && (
							<div className="ml-4 flex shrink-0 items-center space-x-1">
								<div className="bg-primary-500 h-1 w-1 animate-pulse rounded-full" />
								<div className="bg-primary-500 h-1 w-1 animate-pulse rounded-full delay-100" />
								<div className="bg-primary-500 h-1 w-1 animate-pulse rounded-full delay-200" />
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default LocalMusicPlayer;
