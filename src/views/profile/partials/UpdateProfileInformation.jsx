import React, { useEffect, useState } from "react";
import TButton from "../../../components/core/TButton";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function UpdateProfileInformation({ currentUser, className = "" }) {
	const [errors, setErrors] = useState({});
	const [user, setUser] = useState({
		name: "",
		email: "",
		profile_photo_path: null,
		image_url: null,
	});

	const onImageChoose = (ev) => {
		console.log("On image choose");
		const file = ev.target.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			setUser({
				...user,
				profile_photo_path: file,
				image_url: reader.result,
			});

			ev.target.value = "";
		};
		reader.readAsDataURL(file);
	};

	const onSubmit = (ev) => {
		ev.preventDefault();

		const payload = { ...user };
		if (payload.profile_photo_path) {
			payload.profile_photo_path = payload.image_url;
		}
		delete payload.image_url;
		let result = null;

		// Make a POST request using Axios
		result = axiosClient.put(`/profile/${currentUser.id}`, payload);
		result
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

	useEffect(() => {
		if (currentUser) {
			setUser({
				name: currentUser.name || "",
				email: currentUser.email || "",
				profile_photo_path: currentUser.profile_photo_path || "",
				image_url: currentUser.image_url,
			});
		}
	}, [currentUser]);

	return (
		<div className="grid md:grid-cols-2 md:gap-4">
			<header className="mb-6 ">
				<h2 className="text-lg font-medium text-gray-900 ">Profile Information</h2>

				<p className="mt-1 text-sm text-gray-600 ">Update your account's profile information and email address.</p>
			</header>

			<section className={className}>
				<form onSubmit={onSubmit} className="space-y-6">
					{/*Image*/}
					<div>
						<label className="block text-sm font-medium text-gray-700">Photo</label>
						<div className="mt-1 flex items-center">
							{user.image_url && <img src={user.image_url} alt="" className="w-32 h-32 object-cover" />}
							{!user.image_url && (
								<span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
									<PhotoIcon className="w-8 h-8" />
								</span>
							)}
							<button type="button" className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
								<input type="file" onChange={onImageChoose} className="absolute left-0 top-0 right-0 bottom-0 opacity-0" />
								Change
							</button>
						</div>
					</div>
					{/*Image*/}
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
		</div>
	);
}
