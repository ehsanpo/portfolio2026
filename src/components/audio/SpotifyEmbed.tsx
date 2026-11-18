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
		<div ref={containerRef} className="on-paper hard bg-cream text-ink">
			<div className="flex items-center gap-2.5 border-b-[1.5px] border-ink px-2.5 py-1.5">
				<span className="size-2.5 shrink-0 border-[1.5px] border-ink bg-mint" aria-hidden="true" />
				<span className="stripes h-[11px] flex-1" aria-hidden="true" />
				<span className="font-pixel max-w-[60%] truncate text-xs leading-none">{title}</span>
				<span className="stripes h-[11px] flex-1" aria-hidden="true" />
			</div>
			<div className="relative aspect-[4/5] w-full overflow-hidden bg-paper">
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
					<div className="label-mono flex h-full w-full items-center justify-center text-ink/70">
						Loading Spotify embed
					</div>
				)}
			</div>
		</div>
	);
}
