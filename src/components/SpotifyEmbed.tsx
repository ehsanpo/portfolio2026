interface SpotifyEmbedProps {
	playlistId: string;
	title: string;
}

export default function SpotifyEmbed({ playlistId, title }: SpotifyEmbedProps) {
	return (
		<div className="bg-dark/50 rounded-lg p-6 backdrop-blur-lg">
			<h3 className="font-basement mb-4 text-xl">{title}</h3>
			<div className="">
				<iframe
					src={`https://open.spotify.com/embed/album/${playlistId}`}
					width="100%"
					height="100%"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
					className="rounded-lg"
				/>
			</div>
		</div>
	);
}
