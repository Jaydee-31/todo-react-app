import React, { useState } from "react";
import axiosClient from "../../../axios";
import TButton from "../../../components/core/TButton";

export default function UpdatePasswordForm({ user, className = "" }) {
	const [passwordData, setPasswordData] = useState({
		current_password: "",
		password: "",
		password_confirmation: "",
	});
	const [errors, setErrors] = useState({});

	const onSubmit = (ev) => {
		ev.preventDefault();

		// Make a PUT request using Axios to update the password
		axiosClient
			.put(`/password`, passwordData)
			.then((response) => {
				console.log("Password updated successfully:", response.data);
				// Redirect or show a success message
			})
			.catch((error) => {
				console.error("Error encountered:", error);
				setErrors(error.response.data.errors);
			});
	};

	return (
		<section className={className}>
			<header>
				<h2 className="text-lg font-medium text-gray-900">Update Password</h2>
				<p className="mt-1 text-sm text-gray-600">Ensure your account is using a long, random password to stay secure.</p>
			</header>

			<form onSubmit={onSubmit} className="mt-6 space-y-6">
				<div>
					<label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
						Current Password
					</label>
					<input type="password" name="current_password" id="current_password" value={passwordData.current_password} onChange={(ev) => setPasswordData({ ...passwordData, current_password: ev.target.value })} placeholder="Enter your current password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
					{errors.current_password && <p className="text-red-500 mt-1">{errors.current_password}</p>}
				</div>

				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-700">
						New Password
					</label>
					<input type="password" name="password" id="password" value={passwordData.password} onChange={(ev) => setPasswordData({ ...passwordData, password: ev.target.value })} placeholder="Enter your new password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
					{errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
				</div>

				<div>
					<label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
						Confirm Password
					</label>
					<input type="password" name="password_confirmation" id="password_confirmation" value={passwordData.password_confirmation} onChange={(ev) => setPasswordData({ ...passwordData, password_confirmation: ev.target.value })} placeholder="Confirm your new password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
					{errors.password_confirmation && <p className="text-red-500 mt-1">{errors.password_confirmation}</p>}
				</div>

				<div className="flex items-center gap-4">
					<TButton type="submit">Save</TButton>
				</div>
			</form>
		</section>
	);
}
