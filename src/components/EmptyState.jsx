import { XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function EmptyState({ message, description }) {
	return (
		<div className="mx-auto mt-10">
			<div className="flex flex-col items-center justify-center">
				<XCircleIcon className="w-20 text-gray-400 justify-self-center" />
				<h3 className="text-center font-bold text-xl">{message}</h3>
				<p className="text-center">{description}</p>
			</div>
		</div>
	);
}
