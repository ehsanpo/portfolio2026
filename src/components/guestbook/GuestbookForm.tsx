import { useState } from "react";

interface GuestbookFormProps {
	onSuccess: () => void;
}

const API_URL = "https://guestbook-serverless-er4f3.vercel.app/api/guestbook";

export default function GuestbookForm({ onSuccess }: GuestbookFormProps) {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (!name.trim() || !message.trim()) {
			setError("Please fill in all fields");
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: name.trim(), message: message.trim() }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			setName("");
			setMessage("");
			setSuccess("Thank you for signing! :)");
			onSuccess();
		} catch (err) {
			setError("Error! Please try again.");
			console.error("Error submitting entry:", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="sticky top-24">
			<div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
				<h2 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white">
					Sign Guestbook
				</h2>

				{error && (
					<div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
						{error}
					</div>
				)}

				{success && (
					<div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
						{success}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="name"
							className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							maxLength={100}
							required
							disabled={isSubmitting}
							placeholder="Your name"
							className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-400 dark:focus:ring-primary-400 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
						/>
					</div>

					<div>
						<label
							htmlFor="message"
							className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
						>
							Message
						</label>
						<textarea
							id="message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							maxLength={500}
							required
							disabled={isSubmitting}
							placeholder="Leave your message..."
							rows={6}
							className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-400 dark:focus:ring-primary-400 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
					>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</form>
			</div>
		</div>
	);
}
