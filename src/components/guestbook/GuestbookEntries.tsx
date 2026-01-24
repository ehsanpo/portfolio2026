import { useEffect, useState } from "react";
import Avatar from "boring-avatars";

interface GuestbookEntry {
	name: string;
	message: string;
	time: number;
}

interface GuestbookEntriesProps {
	refreshTrigger: number;
}

const API_URL = "https://guestbook-serverless-er4f3.vercel.app/api/guestbook";

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMs / 3600000);
	const diffDays = Math.floor(diffMs / 86400000);

	if (diffMins < 1) return "Just now";
	if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
	if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
	if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export default function GuestbookEntries({ refreshTrigger }: GuestbookEntriesProps) {
	const [entries, setEntries] = useState<GuestbookEntry[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		async function loadEntries() {
			setIsLoading(true);
			setError("");

			try {
				const response = await fetch(API_URL);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				const sortedData = [...data].sort((a, b) => b.time - a.time);
				setEntries(sortedData);
			} catch (err) {
				setError("Failed to load messages. Please try again later.");
				console.error("Error loading entries:", err);
			} finally {
				setIsLoading(false);
			}
		}

		loadEntries();
	}, [refreshTrigger]);

	if (isLoading) {
		return (
			<div className="py-12 text-center">
				<div className="border-primary-500 inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
				<p className="mt-4 text-neutral-600">Loading messages...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center text-red-800">
				{error}
			</div>
		);
	}

	if (entries.length === 0) {
		return (
			<div className="rounded-lg border-2 border-dashed border-neutral-300 p-12 text-center text-neutral-600">
				<p className="text-lg">No messages yet. Be the first to sign!</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{entries.map((entry, index) => (
				<div
					key={index}
					className="bg-secondary-50 dark:bg-secondary-950 rounded-lg border border-neutral-200 p-5 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800"
				>
					<div className="mb-3 flex items-start gap-3">
						<div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
							<Avatar
								size={40}
								name={entry.name}
								variant="beam"
								colors={["#efb503", "#ffd224", "#03aad7", "#1fc7f1", "#47d9fa"]}
							/>
						</div>
						<div className="flex-1">
							<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
									{entry.name}
								</h3>
								<span className="text-sm text-neutral-600 dark:text-neutral-400">
									{formatDate(new Date(entry.time).toISOString())}
								</span>
							</div>
							<p className="mt-2 whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
								{entry.message}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
