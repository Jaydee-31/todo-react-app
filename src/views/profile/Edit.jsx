import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/core/TButton";
import axiosClient from "../../axios";
import UpdateProfileInformation from "./partials/UpdateProfileInformation";
import UpdatePasswordForm from "./partials/UpdatePasswordForm";
import DeleteUserForm from "./partials/DeleteUserForm";

export default function Edit() {
	const [user, setUser] = useState({});

	useEffect(() => {
		axiosClient.get("/me").then(({ data }) => {
			setUser(data.data);
			// setLoading(false);
		});
	}, []);

	return (
		<PageComponent title="Update Profile">
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
					<div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
						<UpdateProfileInformation currentUser={user} className="max-w-xl" />
					</div>
					<hr />
					<div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
						<UpdatePasswordForm user={user} className="max-w-xl" />
					</div>
					<hr />
					<div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
						<DeleteUserForm user={user} className="max-w-xl" />
					</div>
				</div>
			</div>
		</PageComponent>
	);
}
