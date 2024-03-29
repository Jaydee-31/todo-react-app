import React, { useState } from "react";
import TButton from "../../../components/core/TButton";
import Modal from "../../../components/Modal";

export default function DeleteUserForm({ className = "" }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const confirmUserDeletion = () => {};
	const deleteUser = () => {};
	return (
		<section className={`space-y-6 ${className}`}>
			<header>
				<h2 className="text-lg font-medium text-gray-900 ">Delete Account</h2>

				<p className="mt-1 text-sm text-gray-600 ">Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.</p>
			</header>

			<TButton
				onClick={() => {
					setIsModalOpen(true);
				}}>
				Delete Account
			</TButton>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<form onSubmit={deleteUser} className="p-6">
					<h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Are you sure you want to delete your account?</h2>

					<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.</p>

					<div className="mt-6">
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							New Password
						</label>
						<input type="password" name="password" id="password" placeholder="Todo Name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
					</div>

					<div className="mt-6 flex justify-end">
						<TButton className="ms-3" color="red">
							Delete Account
						</TButton>
					</div>
				</form>
			</Modal>
		</section>
	);
}
