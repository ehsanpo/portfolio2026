import { useState } from "react";
import GuestbookForm from "./GuestbookForm";
import GuestbookEntries from "./GuestbookEntries";

function WindowBar({ label }: { label: string }) {
	return (
		<div className="flex items-center gap-3 border-b-[1.5px] border-ink px-2 py-1.5">
			<span className="size-3 shrink-0 border-[1.5px] border-ink" aria-hidden="true" />
			<span className="stripes h-[13px] flex-1" aria-hidden="true" />
			<span className="font-pixel text-sm leading-none">{label}</span>
			<span className="stripes h-[13px] flex-1" aria-hidden="true" />
		</div>
	);
}

export default function GuestbookContainer() {
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const handleSuccess = () => {
		setRefreshTrigger((prev) => prev + 1);
	};

	return (
		<div className="flex flex-col-reverse gap-8 lg:flex-row">
			<div className="flex-1">
				<div className="on-paper hard bg-cream text-ink">
					<WindowBar label="GUESTBOOK / ENTRIES" />
					<div className="p-4">
						<GuestbookEntries refreshTrigger={refreshTrigger} />
					</div>
				</div>
			</div>

			<div className="w-full lg:w-[380px] lg:flex-shrink-0">
				<div className="on-paper hard bg-cream text-ink">
					<WindowBar label="SIGN THE BOOK" />
					<div className="p-4">
						<GuestbookForm onSuccess={handleSuccess} />
					</div>
				</div>
			</div>
		</div>
	);
}
