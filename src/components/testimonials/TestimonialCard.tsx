import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
	name: string;
	img: string;
	title: string;
	short: string;
	desc: string;
	id: number | string;
}

interface TestimonialCardProps {
	testimonial: Testimonial;
	date?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
	testimonial,
	date = "Jan 2026",
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	// Prevent scrolling when expanded
	useEffect(() => {
		if (isExpanded) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [isExpanded]);

	const CardContent = ({ expanded = false }) => (
		<motion.div
			layoutId={`card-${testimonial.id}`}
			onClick={(e) => {
				if (!expanded) setIsExpanded(true);
				e.stopPropagation();
			}}
			className={`dark:bg-accent-600/20 clip flex flex-col border border-neutral-100 bg-white dark:border-neutral-800 ${
				expanded
					? "pointer-events-auto relative z-[1001] w-full max-w-2xl rounded-2xl p-8 shadow-2xl"
					: "relative z-10 w-72 cursor-pointer rounded-xl px-4 pt-6 pb-4 shadow-sm hover:shadow-xl"
			} `}
			transition={{ type: "spring", damping: 25, stiffness: 200 }}
		>
			{expanded && (
				<button
					onClick={(e) => {
						setIsExpanded(false);
						e.stopPropagation();
					}}
					className="absolute top-4 right-4 z-[1002] text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-200"
				>
					<svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			)}

			<motion.div className="mb-2 flex gap-3" layout="position">
				<motion.img
					layoutId={`img-${testimonial.id}`}
					src={testimonial.img}
					alt={testimonial.name}
					className={`${expanded ? "size-16 ring-4" : "size-11 ring-2"} rounded-full object-cover ring-neutral-50 dark:ring-neutral-800`}
				/>
				<div className="flex flex-col justify-center">
					<motion.div className="flex items-center gap-1" layout="position">
						<p
							className={`leading-tight font-semibold text-slate-900 dark:text-white ${expanded ? "text-xl" : "text-base"}`}
						>
							{testimonial.name}
						</p>
						<svg
							className="mt-0.5 text-blue-500"
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
								fill="currentColor"
							/>
						</svg>
					</motion.div>
					<motion.span
						layout="position"
						className="text-xs leading-tight text-slate-500 dark:text-slate-400"
					>
						{testimonial.title}
					</motion.span>
				</div>
			</motion.div>

			<div
				className={`custom-scrollbar mb-4 ${expanded ? "max-h-[60vh] overflow-y-auto pr-2" : ""}`}
			>
				<motion.p
					layout
					className={`pt-2 text-gray-700 dark:text-gray-300 ${expanded ? "text-lg leading-relaxed whitespace-pre-line" : "line-clamp-3 text-sm"} `}
				>
					{expanded ? testimonial.desc : testimonial.short}
				</motion.p>
			</div>

			<motion.div
				layout
				className="dark:border-accent-700 mt-auto flex items-center justify-between border-t border-neutral-50 pt-2 text-[12px] font-medium tracking-wider text-slate-400 uppercase dark:text-slate-400"
			>
				<div className="flex items-center gap-1">
					<svg className="size-3" viewBox="0 0 24 24" fill="none">
						<path
							d="M19 3C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19ZM18.5 18.5V13.2C18.5 11.235 17.435 10.25 16.035 10.25C14.905 10.25 14.4 10.87 14.115 11.31H14.075V10.45H11.565V18.5H14.115V14.4C14.115 13.295 14.325 12.225 15.69 12.225C17.035 12.225 17.055 13.485 17.055 14.475V18.5H18.5ZM7.04 8.71C7.855 8.71 8.515 8.05 8.515 7.235C8.515 6.42 7.855 5.76 7.04 5.76C6.225 5.76 5.565 6.42 5.565 7.235C5.565 8.05 6.225 8.71 7.04 8.71ZM8.315 18.5V10.45H5.765V18.5H8.315Z"
							fill="currentColor"
						/>
					</svg>
					<span>Linkedin</span>
				</div>
			</motion.div>
		</motion.div>
	);

	return (
		<div className="mx-4 w-72 shrink-0">
			<CardContent />

			{mounted &&
				createPortal(
					<AnimatePresence>
						{isExpanded && (
							<div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									onClick={() => setIsExpanded(false)}
									className="pointer-events-auto absolute inset-0 bg-neutral-950/60 backdrop-blur-md"
								/>
								<CardContent expanded={true} />
							</div>
						)}
					</AnimatePresence>,
					document.body
				)}
		</div>
	);
};
