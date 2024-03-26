import React, { useState } from "react";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/core/TButton";
import axios from "axios";
import axiosClient from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TodoForm() {
	const navigate = useNavigate();

	const [todo, setTodo] = useState({
		name: "",
		description: "",
		status: false,
	});

	const [errors, setErrors] = useState({});

	const onSubmit = (ev) => {
		ev.preventDefault();
		// Make a POST request using Axios
		axiosClient
			.post("/todo/create", todo)
			.then((response) => {
				console.log("Todo created successfully:", response.data);
				toast("Todo created successfully!", {
					position: "bottom-right",
					className: "foo-bar",
				});
				navigate("/todos");
			})
			.catch((error) => {
				console.error("Error creating todo:", error);
				setErrors(error.response.data.errors);
				// Handle other errors
			});
	};

	return (
		<PageComponent title="Create new todo">
			<form action="#" method="POST" onSubmit={onSubmit}>
				<div className="shadow sm:overflow-hidden sm:rounded-md">
					<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
						{/*Name*/}
						<div className="col-span-6 sm:col-span-3">
							<label htmlFor="name" className="block text-sm font-medium text-gray-700">
								Survey Name
							</label>
							<input type="text" name="name" id="name" value={todo.name} onChange={(ev) => setTodo({ ...todo, name: ev.target.value })} placeholder="Todo Name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
							{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
						</div>
						{/*Name*/}

						{/*Description*/}
						<div className="col-span-6 sm:col-span-3">
							<label htmlFor="description" className="block text-sm font-medium text-gray-700">
								Description
							</label>
							{/* <pre>{ JSON.stringify(todo, undefined, 2) }</pre> */}
							<textarea name="description" id="description" value={todo.description || ""} onChange={(ev) => setTodo({ ...todo, description: ev.target.value })} placeholder="Describe your todo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
							{errors.description && <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>}
						</div>
						{/*Description*/}

						{/*Status*/}
						<div className="flex items-start">
							<div className="flex h-5 items-center">
								<input id="status" name="status" type="checkbox" checked={todo.status} onChange={(ev) => setTodo({ ...todo, status: ev.target.checked })} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="comments" className="font-medium text-gray-700">
									Active
								</label>
								<p className="text-gray-500">Whether to make todo publicly available</p>
							</div>
						</div>
						{/*Status*/}

						{/* <SurveyQuestions questions={todo.questions} onQuestionsUpdate={onQuestionsUpdate} /> */}
					</div>
					<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
						<TButton>Save</TButton>
					</div>
				</div>
			</form>
		</PageComponent>
	);
}
