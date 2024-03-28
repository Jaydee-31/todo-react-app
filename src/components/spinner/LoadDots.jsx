import React from "react";

const LoadDots = () => {
	return (
		<div className="h-full flex flex-col justify-center items-center">
			<p className="">Loading</p>
			<img className="w-28 h-8" src="/spinner.svg" alt="loading" />
		</div>
	);
};

export default LoadDots;
