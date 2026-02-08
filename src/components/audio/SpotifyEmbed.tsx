import React, { useEffect, useRef, useState } from "react";

interface SpotifyEmbedProps {
	playlistId: string;
	title: string;
}

export default function SpotifyEmbed({ playlistId, title }: SpotifyEmbedProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (isVisible) return;
		const target = containerRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "0px" }
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [isVisible]);

	return (
		<div ref={containerRef} className="bg-dark/50 rounded-lg p-6 backdrop-blur-lg">
			<h3 className="font-basement mb-4 text-xl">{title}</h3>
			<div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-black/30">
				{isVisible ? (
					<iframe
						title={`${title} Spotify playlist`}
						src={`https://open.spotify.com/embed/album/${playlistId}`}
						width="100%"
						height="100%"
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
						className="absolute inset-0 h-full w-full"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
						Loading Spotify embed...
					</div>
				)}
			</div>
		</div>
	);
}
