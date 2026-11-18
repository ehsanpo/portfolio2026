import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
	fullWidth?: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
	testimonial,
	fullWidth = false,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [mounted, setMounted] = useState(false);

	const sanitize = (text: string) => text.replace(/\s*[—–]\s*/g, ", ");

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	useEffect(() => {
		if (!isExpanded) {
			document.body.style.overflow = "";
			return;
		}
		document.body.style.overflow = "hidden";
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsExpanded(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isExpanded]);

	const CardBody = ({ expanded = false }: { expanded?: boolean }) => (
		<div
			role={expanded ? "dialog" : "button"}
			aria-modal={expanded ? "true" : undefined}
			aria-label={
				expanded
					? `Testimonial from ${testimonial.name}`
					: `Read full testimonial from ${testimonial.name}`
			}
			tabIndex={expanded ? -1 : 0}
			onClick={(e) => {
				if (!expanded) {
					setIsExpanded(true);
				}
				e.stopPropagation();
			}}
			onKeyDown={(e) => {
				if (!expanded && (e.key === "Enter" || e.key === " ")) {
					e.preventDefault();
					setIsExpanded(true);
				}
			}}
			className={`flex flex-col border-[1.5px] border-[#f2efe7]/30 bg-[#201c15] text-[#f2efe7] transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4b829] ${
				expanded
					? "pointer-events-auto relative z-[1001] w-full max-w-2xl shadow-[6px_6px_0_#f4b829]"
					: "relative z-10 h-full w-full cursor-pointer shadow-[4px_4px_0_rgba(242,239,231,0.18)] hover:-translate-y-0.5"
			}`}
		>
			<div className="flex items-center gap-3 border-b-[1.5px] border-[#f2efe7]/30 px-2.5 py-1.5">
				<span className="size-3 shrink-0 border-[1.5px] border-current" aria-hidden="true" />
				<span className="stripes h-[13px] flex-1 opacity-40" aria-hidden="true" />
				<span className="font-pixel text-xs leading-none text-[#f4b829]">On the record</span>
				<span className="stripes h-[13px] flex-1 opacity-40" aria-hidden="true" />
				{expanded && (
					<button
						type="button"
						onClick={(e) => {
							setIsExpanded(false);
							e.stopPropagation();
						}}
						aria-label="Close testimonial"
						className="ml-1 inline-flex size-6 items-center justify-center border-[1.5px] border-current bg-[#231e16] font-mono text-xs font-bold text-[#f2efe7] hover:bg-[#f4b829] hover:text-[#231e16]"
					>
						X
					</button>
				)}
			</div>

			<div className="flex flex-1 flex-col justify-between p-5">
				<div>
					<div className="mb-4 flex items-center gap-3.5">
						<img
							src={testimonial.img}
							alt={testimonial.name}
							className={`${
								expanded ? "size-14" : "size-12"
							} shrink-0 border-[1.5px] border-current object-cover`}
						/>
						<div className="min-w-0">
							<p className={`truncate font-bold text-[#f2efe7] ${expanded ? "text-xl" : "text-base"}`}>
								{testimonial.name}
							</p>
							<p className="label-mono mt-0.5 truncate text-[#f4b829]">{testimonial.title}</p>
						</div>
					</div>

					<div className={expanded ? "max-h-[55vh] overflow-y-auto pr-2" : ""}>
						<p
							className={`leading-relaxed text-[#f2efe7]/90 ${
								expanded ? "text-base whitespace-pre-line" : "line-clamp-4 text-sm"
							}`}
						>
							&ldquo;{expanded ? sanitize(testimonial.desc) : sanitize(testimonial.short)}&rdquo;
						</p>
					</div>
				</div>

				<div className="mt-4 flex items-center justify-between border-t border-[#f2efe7]/20 pt-3">
					<span className="label-mono text-[10px] opacity-75">LinkedIn recommendation</span>
					<span className="label-mono text-[10px] text-[#f4b829]">
						{expanded ? "Press ESC to close" : "Read dispatch"}
					</span>
				</div>
			</div>
		</div>
	);

	return (
		<div className={fullWidth ? "w-full" : "mx-3 w-80 shrink-0 sm:w-96"}>
			<CardBody />

			{mounted &&
				isExpanded &&
				createPortal(
					<div
						className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
						onClick={() => setIsExpanded(false)}
					>
						<div className="pointer-events-auto absolute inset-0 bg-[#17140f]/80" />
						<CardBody expanded={true} />
					</div>,
					document.body
				)}
		</div>
	);
};

