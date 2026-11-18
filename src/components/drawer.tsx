import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export function DrawerDemo() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button type="button" className="key bg-ink text-cream">
					<svg className="size-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
							fill="currentColor"
						/>
					</svg>
					Send a message
				</button>
			</DrawerTrigger>
			<DrawerContent className="on-paper mt-24 rounded-none border-[1.5px] border-ink bg-cream text-ink">
				<div className="mx-auto w-full max-w-sm">
					<div className="flex items-center gap-3 border-b-[1.5px] border-ink px-2 py-1.5">
						<span className="size-3 shrink-0 border-[1.5px] border-ink bg-tomato" aria-hidden="true" />
						<span className="stripes h-[13px] flex-1" aria-hidden="true" />
						<DrawerTitle className="font-pixel text-sm leading-none font-normal tracking-normal">
							NEW MESSAGE
						</DrawerTitle>
						<span className="stripes h-[13px] flex-1" aria-hidden="true" />
					</div>
					<iframe
						title="Contact form"
						src="https://docs.google.com/forms/d/e/1FAIpQLSdh7FqtOF_cNTUyyOQ-_l4adOyRO_QPg4Ax0cf_e0XLj4W_6A/viewform?embedde"
						height="700"
						className="w-full border-0"
						style={{ overflow: "hidden" }}
					>
						Loading
					</iframe>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
