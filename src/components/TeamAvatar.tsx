import Avatar from "boring-avatars";

interface TeamAvatarProps {
	name: string;
	size?: number;
	className?: string;
}

export const TeamAvatar = ({ name, size = 40, className = "" }: TeamAvatarProps) => {
	return (
		<div className={className}>
			<Avatar
				size={size}
				name={name}
				variant="beam"
				colors={["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"]}
			/>
		</div>
	);
};

export default TeamAvatar;
