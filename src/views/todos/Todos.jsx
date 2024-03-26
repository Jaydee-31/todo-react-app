import React, { useState, useEffect } from "react";
import axiosClient from "../../axios";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/core/TButton";
import PaginationLinks from "../../components/PaginationLinks";

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

	return (
		<PageComponent
			title="Todos"
			buttons={[
				<TButton color="green" to="/todos/create">
					<PlusCircleIcon className="h-6 w-6 mr-2" />
					Create new
				</TButton>,
			]}>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
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
													<td className="whitespace-nowrap px-6 py-4">{todo.name}</td>
													<td className="whitespace-nowrap px-6 py-4">{todo.description}</td>
													<td className="whitespace-nowrap px-6 py-4">{todo.status ? "Active" : "Inactive"}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div>{todos.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}</div>
				</>
			)}
		</PageComponent>
	);
}
