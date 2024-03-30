import React, { useRef, useState } from "react";
import TButton from "../../../components/core/TButton";
import Modal from "../../../components/Modal";
import axiosClient from "../../../axios";
import ModalForm from "../../../components/ModalForm";
import XDangerButton from "../../../components/XDangerButton";
import XInputLabel from "../../../components/XInputLabel";
import XTextInput from "../../../components/XTextInput";
import XInputError from "../../../components/XInputError";
import XSecondaryButton from "../../../components/XSecondaryButton";
import XModal from "../../../components/XModal";
import { useNavigate } from "react-router-dom";

export default function DeleteUserForm({ user, className = "" }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
	const passwordInput = useRef();
	const navigate = useNavigate();

	const { data, setData, delete: destroy, processing, reset } = useState({});

	const confirmUserDeletion = () => {
		setConfirmingUserDeletion(true);
	};

	// Function to handle form submission
	function handleSubmitForm(ev) {
		ev.preventDefault();
		// Handle form submission logic here
		console.log("Form submitted with data:");
	}

	const deleteUser = (ev) => {
		ev.preventDefault();
		console.log(user);
		axiosClient
			.delete(`/profile/${user.id}`, {
				data: {
					password: password,
				},
			})
			.then((res) => {
				console.log("Account deleted successfully.");
				navigate("/login");
			})
			.catch((error) => {
				setErrors(error.response.data.errors);
				console.log(errors);
			});
	};

	const closeModal = () => {
		setConfirmingUserDeletion(false);

		reset();
	};

	return (
		<div className="grid md:grid-cols-2 md:gap-4">
			<header className="mb-6 ">
				<h2 className="text-lg font-medium text-gray-900">Delete Account</h2>
				<p className="mt-1 text-sm text-gray-600">Permanently delete your account.</p>
			</header>
			<section className={`space-y-6 ${className}`}>
				<p className="mt-1 text-sm text-gray-600">Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.</p>
				<XDangerButton onClick={confirmUserDeletion}>Delete Account</XDangerButton>

				<XModal show={confirmingUserDeletion} onClose={closeModal} className="z-20">
					<form onSubmit={deleteUser} className="p-6">
						<h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Are you sure you want to delete your account?</h2>

						<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.</p>

						<div className="mt-6">
							<XInputLabel htmlFor="password" value="Password" className="sr-only" />

							<XTextInput id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-3/4" isFocused placeholder="Password" />

							<XInputError message={errors.password} className="mt-2" />
						</div>

						<div className="mt-6 flex justify-end">
							<XSecondaryButton onClick={closeModal}>Cancel</XSecondaryButton>

							<XDangerButton className="ms-3" disabled={processing}>
								Delete Account
							</XDangerButton>
						</div>
					</form>
				</XModal>
			</section>
		</div>
	);
}
