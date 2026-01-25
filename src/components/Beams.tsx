import React, { forwardRef, useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {
	FileText,
	Figma as FigmaIcon,
	BookOpen,
	Bug,
	ShieldCheck,
	ClipboardList,
	Code2,
	CheckCircle,
	Terminal,
	FileEdit,
	Share2,
	Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
	({ className, children }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"relative z-10 flex size-12 items-center justify-center rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
					className
				)}
			>
				{children}
			</div>
		);
	}
);

Circle.displayName = "Circle";

export function ProcessFlowDiagram() {
	const containerRef = useRef<HTMLDivElement>(null);
	const jiraRef = useRef<HTMLDivElement>(null);

	const figmaRef = useRef<HTMLDivElement>(null);
	const apiRef = useRef<HTMLDivElement>(null);
	const feedbackRef = useRef<HTMLDivElement>(null);
	const bugReportsRef = useRef<HTMLDivElement>(null);
	const competitorRef = useRef<HTMLDivElement>(null);
	const complianceRef = useRef<HTMLDivElement>(null);

	const planRef = useRef<HTMLDivElement>(null);
	const codeDebugRef = useRef<HTMLDivElement>(null);
	const testRef = useRef<HTMLDivElement>(null);

	const codeImplRef = useRef<HTMLDivElement>(null);
	const docsRef = useRef<HTMLDivElement>(null);
	const interfacesRef = useRef<HTMLDivElement>(null);
	const bugFixesRef = useRef<HTMLDivElement>(null);

	const CircleWithTooltip = (
		circleRef: React.RefObject<HTMLDivElement>,
		IconComponent: React.FC<React.SVGProps<SVGSVGElement>>,
		tooltipText: string
	) => (
		<div className="group relative flex flex-col items-center gap-2">
			<Circle ref={circleRef}>
				<IconComponent className="stroke-secondary-500 h-6 w-6" />
			</Circle>

			<div className="clip4 pointer-events-none w-max rounded bg-gray-800 px-2 py-1 pb-2 text-sm text-white shadow-md transition-opacity">
				{tooltipText}
			</div>
		</div>
	);

	return (
		<div
			ref={containerRef}
			className="max bg-background relative m-auto flex w-full max-w-4xl items-center justify-between overflow-hidden rounded-lg p-10"
		>
			<div className="flex flex-col items-center gap-6">
				{CircleWithTooltip(jiraRef, FileText, "Jira Tasks")}
				{CircleWithTooltip(figmaRef, FigmaIcon, "Designs")}
				{CircleWithTooltip(apiRef, BookOpen, "API Docs")}
				{CircleWithTooltip(bugReportsRef, Bug, "Bug Reports")}
				{CircleWithTooltip(complianceRef, ShieldCheck, "Compliance")}
			</div>

			<div className="flex flex-row items-center gap-8">
				{CircleWithTooltip(planRef, ClipboardList, "Plan")}
				{CircleWithTooltip(codeDebugRef, Code2, "Code & Debug")}
				{CircleWithTooltip(testRef, CheckCircle, "Test")}
			</div>

			<div className="flex flex-col items-center gap-6">
				{CircleWithTooltip(codeImplRef, Terminal, "Code")}
				{CircleWithTooltip(docsRef, FileEdit, "Documentation")}
				{CircleWithTooltip(interfacesRef, Share2, "Functional Interfaces")}
				{CircleWithTooltip(bugFixesRef, Wrench, "Bug Fixes")}
			</div>

			<AnimatedBeam
				containerRef={containerRef}
				fromRef={useRef<HTMLDivElement>(null)}
				toRef={planRef}
			/>
			<AnimatedBeam containerRef={containerRef} fromRef={figmaRef} toRef={planRef} />
			<AnimatedBeam containerRef={containerRef} fromRef={apiRef} toRef={planRef} />
			<AnimatedBeam containerRef={containerRef} fromRef={feedbackRef} toRef={planRef} />
			<AnimatedBeam containerRef={containerRef} fromRef={bugReportsRef} toRef={planRef} />
			<AnimatedBeam containerRef={containerRef} fromRef={competitorRef} toRef={planRef} />
			<AnimatedBeam containerRef={containerRef} fromRef={complianceRef} toRef={planRef} />

			<AnimatedBeam containerRef={containerRef} fromRef={planRef} toRef={codeDebugRef} />
			<AnimatedBeam containerRef={containerRef} fromRef={codeDebugRef} toRef={testRef} />

			<AnimatedBeam containerRef={containerRef} fromRef={testRef} toRef={codeImplRef} />
			<AnimatedBeam containerRef={containerRef} fromRef={testRef} toRef={docsRef} />
			<AnimatedBeam containerRef={containerRef} fromRef={testRef} toRef={interfacesRef} />
			<AnimatedBeam containerRef={containerRef} fromRef={testRef} toRef={bugFixesRef} />
		</div>
	);
}
