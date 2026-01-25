import React, { useEffect, useState } from "react";
import { generateSound } from "../utils/sounds";

interface DuckSpriteProps {
	className?: string;
}

const DuckSprite: React.FC<DuckSpriteProps> = ({ className = "" }) => {
	const [position, setPosition] = useState(0);
	const [animation, setAnimation] = useState("idle_normal");
	const [direction, setDirection] = useState<"left" | "right">("right");
	const [isWalking, setIsWalking] = useState(false);

	const handleQuack = () => {
		generateSound("duck");
	};

	useEffect(() => {
		const getContainerWidth = () => {
			const bodyWidth = document.body.clientWidth;
			return Math.max(320, bodyWidth - 32);
		};

		const containerWidth = getContainerWidth();
		setPosition(Math.random() * Math.max(0, containerWidth - 64));

		const interval = setInterval(
			() => {
				const shouldWalk = Math.random() > 0.4;

				if (shouldWalk) {
					setIsWalking(true);
					setDirection(Math.random() > 0.5 ? "right" : "left");
					setAnimation(Math.random() > 0.5 ? "walk_normal" : "walk_bounce");
				} else {
					setIsWalking(false);
					setAnimation(Math.random() > 0.5 ? "idle_normal" : "idle_bounce");
				}
			},
			2000 + Math.random() * 3000
		);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!isWalking) return;

		const moveInterval = setInterval(() => {
			setPosition((prev) => {
				const speed = direction === "right" ? 2 : -2;
				const newPos = prev + speed;

				const bodyWidth = document.body.clientWidth;
				const maxX = Math.max(0, bodyWidth - 96);

				if (newPos <= 0) {
					setDirection("right");
					return 0;
				} else if (newPos >= maxX) {
					setDirection("left");
					return maxX;
				}
				return newPos;
			});
		}, 50);

		return () => clearInterval(moveInterval);
	}, [isWalking, direction]);

	return (
		<div
			className={`duck-sprite ${animation} ${className}`}
			onClick={handleQuack}
			style={{
				position: "absolute",
				left: `${position}px`,
				bottom: "130px",
				width: "32px",
				height: "32px",
				backgroundImage: "url(/img/ducky_2_spritesheet.png)",
				backgroundSize: "192px 128px",
				imageRendering: "pixelated",
				transform: direction === "left" ? "scaleX(-2) scaleY(2)" : "scaleX(2) scaleY(2)",
				zIndex: 1000,
				pointerEvents: "auto",
				cursor: "pointer",
			}}
		/>
	);
};

export default DuckSprite;
