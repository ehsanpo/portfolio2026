import * as React from "react";
import { Minus, Plus } from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

const data = [
	{
		goal: 400,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 278,
	},
	{
		goal: 189,
	},
	{
		goal: 239,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 278,
	},
	{
		goal: 189,
	},
	{
		goal: 349,
	},
];

export function DrawerDemo() {
	const [goal, setGoal] = React.useState(350);

	function onClick(adjustment: number) {
		setGoal(Math.max(200, Math.min(400, goal + adjustment)));
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button className="flex cursor-pointer items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-teal-100 transition-all duration-200 ease-in hover:bg-teal-700">
					<svg className="w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
							fill="#ffffff"
						/>
					</svg>
					Send messager
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<iframe
						src="https://docs.google.com/forms/d/e/1FAIpQLSdh7FqtOF_cNTUyyOQ-_l4adOyRO_QPg4Ax0cf_e0XLj4W_6A/viewform?embedde"
						height="700"
						className="w-full"
						scrolling="no"
					>
						Loading…
					</iframe>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
