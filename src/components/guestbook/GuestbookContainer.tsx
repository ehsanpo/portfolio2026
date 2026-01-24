import { useState } from "react";
import GuestbookForm from "./GuestbookForm";
import GuestbookEntries from "./GuestbookEntries";

export default function GuestbookContainer() {
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const handleSuccess = () => {
		setRefreshTrigger((prev) => prev + 1);
	};

	return (
		<div className="flex flex-col-reverse gap-6 lg:flex-row">
			<div className="flex-1">
				<GuestbookEntries refreshTrigger={refreshTrigger} />
			</div>

			<div className="w-full lg:w-[380px] lg:flex-shrink-0">
				<GuestbookForm onSuccess={handleSuccess} />
			</div>
		</div>
	);
}
