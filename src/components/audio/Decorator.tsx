import React from "react";
import Screw from "./screw";

interface DecoratorProps {
	isOn?: boolean;
}

const Decorator = ({}: DecoratorProps) => {
	return (
		<div className="decorator absolute inset-0 h-full">
			<div className="absolute top-5 left-[19.5px] h-[92%] w-0 border-l border-gray-300 shadow-sm shadow-gray-300 dark:shadow-gray-800  dark:border-gray-900" />
			<div className="absolute top-5 right-[19.5px] h-[92%] w-0 border-l border-gray-300 shadow-sm shadow-gray-300 dark:shadow-gray-800  dark:border-gray-900" />
			<div className="absolute top-[23.5px] left-4 h-0 w-[95%] border-t border-gray-300 shadow-sm shadow-gray-300 dark:shadow-gray-800  dark:border-gray-900" />
			<div className="absolute bottom-[19.5px] left-4 h-0 w-[95%] border-t border-gray-300 shadow-sm shadow-gray-300 dark:shadow-gray-800  dark:border-gray-900" />
			<Screw className="absolute top-4 left-3 z-2" />
			<Screw className="absolute top-4 right-3 z-2" />
			<Screw className="absolute bottom-3 left-3 z-2" />
			<Screw className="absolute right-3 bottom-3 z-2" />
		</div>
	);
};

export default Decorator;
