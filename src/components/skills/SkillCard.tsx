import { Card } from "../ui/Card";

interface SkillCardProps {
	name: string;
	proficiency: number;
	description?: string;
	icon?: string;
}

export function SkillCard({ name, proficiency, description, icon }: SkillCardProps) {
	return (
		<Card
			title={name}
			icon={icon && <img src={icon} alt={name} className="h-8 w-8" />}
			action={
				<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
					{proficiency}/10
				</span>
			}
		>
			{description && <p className="mb-4">{description}</p>}
			<div className="h-2 w-full rounded-full bg-gray-200 dark:bg-neutral-700">
				<div
					className="h-2 rounded-full bg-primary-600 transition-all duration-300"
					style={{ width: `${proficiency * 10}%` }}
				/>
			</div>
		</Card>
	);
}
