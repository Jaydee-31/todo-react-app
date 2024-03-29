import React, { useEffect, useState } from "react";
import TButton from "../../../components/core/TButton";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios";

export default function UpdateProfileInformation({ currentUser, className = "" }) {
	const [errors, setErrors] = useState({});
	const [user, setUser] = useState({
		name: "",
		email: "",
	});

	useEffect(() => {
		if (currentUser) {
			setUser({
				name: currentUser.name || "",
				email: currentUser.email || "",
			});
		}
	}, [currentUser]);

	const onSubmit = (ev) => {
		ev.preventDefault();

		// Make a POST request using Axios
		axiosClient
			.put(`/profile/${currentUser.id}`, user)
			.then((response) => {
				console.log("Profile updated successfully:", response.data);
				toast("Profile updated successfully!", {
					position: "bottom-right",
					className: "foo-bar",
				});
				navigate("/profile");
			})
			.catch((error) => {
				console.error("Error encountered execution:", error);
				setErrors(error.response.data.errors);
			});
	};

	return (
		<section className={className}>
			<header>
				<h2 className="text-lg font-medium text-gray-900 ">Profile Information</h2>

				<p className="mt-1 text-sm text-gray-600 ">Update your account's profile information and email address.</p>
			</header>

			<form onSubmit={onSubmit} className="mt-6 space-y-6">
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<input type="text" name="name" id="name" value={user.name} onChange={(ev) => setUser({ ...user, name: ev.target.value })} placeholder="Todo Name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
				</div>

				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input type="email" name="email" id="email" value={user.email} onChange={(ev) => setUser({ ...user, email: ev.target.value })} placeholder="Todo Name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
				</div>

				{currentUser.email_verified_at === null && (
					<div>
						<p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
							Your email address is unverified.
							<Link href="#" method="post" as="button" className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
								Click here to re-send the verification email.
							</Link>
						</p>

						<div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">A new verification link has been sent to your email address.</div>
					</div>
				)}

				<div className="flex items-center gap-4">
					<TButton>Save</TButton>
				</div>
			</form>
		</section>
	);
}
