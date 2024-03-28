import React, { useState, useEffect } from "react";
import axiosClient from "../../axios";
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/core/TButton";
import PaginationLinks from "../../components/PaginationLinks";
import EmptyState from "../../components/EmptyState";
import LoadDots from "../../components/spinner/LoadDots";
import { PencilIcon } from "@heroicons/react/20/solid";
import Modal from "../../components/Modal";

export default function Todos() {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [meta, setMeta] = useState({});

	const onPageClick = (link) => {
		getTodos(link.url);
	};

	const getTodos = (url) => {
		url = url || "/todo/list";
		setLoading(true);
		axiosClient.get(url).then(({ data }) => {
			setTodos(data.data);
			setMeta(data.meta);
			setLoading(false);
		});
	};

	useEffect(() => {
		getTodos();
	}, []);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const onDelete = () => {
		// Perform delete action here
		// For demonstration purposes, we'll just log a message
		console.log("Item deleted");
		setIsModalOpen(false); // Close the modal after deletion
	};

	const handleCancel = () => {
		setIsModalOpen(false); // Close the modal without performing delete action
	};

	return (
		<PageComponent
			title="Todos"
			buttons={
				<TButton color="green" to="/todo/create">
					<PlusCircleIcon className="h-6 w-6 mr-2" />
					Create new
				</TButton>
			}>
			{loading ? (
				<LoadDots />
			) : (
				<>
					{todos.length === 0 ? ( // Check if todos array is empty
						<EmptyState message="No Todos" description="Get started by creating a new todo." />
					) : (
						<div className="flex flex-col">
							<div className="overflow-x-auto ">
								<div className="inline-block min-w-full bg-white rounded-md shadow-md">
									<div className="overflow-hidden">
										<table className="min-w-full text-left text-sm font-light">
											<thead className="border-b font-medium dark:border-neutral-500">
												<tr>
													<th scope="col" className="px-6 py-4">
														#
													</th>
													<th scope="col" className="px-6 py-4">
														Name
													</th>
													<th scope="col" className="px-6 py-4">
														Description
													</th>
													<th scope="col" className="px-6 py-4">
														Status
													</th>
												</tr>
											</thead>
											<tbody>
												{todos.map((todo) => (
													<tr key={todo.id} className="border-b transition duration-50 ease-in-out hover:bg-neutral-200">
														<td className="whitespace-nowrap px-6 py-4 font-medium">{todo.id}</td>
														<td className="whitespace-nowrap px-6 py-4 font-normal">{todo.name}</td>
														<td className="whitespace-nowrap px-6 py-4 font-normal">{todo.description}</td>
														<td className="whitespace-nowrap px-6 py-4 font-normal">{todo.status ? "Active" : "Inactive"}</td>
														<td>
															<div className="flex items-center">
																<TButton to={`/todo/update/${todo.id}`} circle link color="green">
																	<PencilSquareIcon className="w-5 h-5 mr-2 " />
																</TButton>
																<TButton onClick={() => setIsModalOpen(true)} circle link color="red">
																	<TrashIcon className="w-5 h-5" />
																</TButton>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					)}
					<div>{todos.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}</div>
				</>
			)}

			{/* Display Modal */}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={onDelete} title="Delete Item" content="Are you sure you want to delete this item? This action cannot be undone." />
		</PageComponent>
	);
}
