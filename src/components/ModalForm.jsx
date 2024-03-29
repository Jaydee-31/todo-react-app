import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import TButton from "./core/TButton";

const ModalForm = ({ isOpen, onClose, onConfirm, title, content, formFields, onSubmit, errors }) => {
	const cancelButtonRef = useRef(null);

	return (
		<>
			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-start">
											<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
												<ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
											</div>
											<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
												<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
													{title}
												</Dialog.Title>
												<div className="mt-2">
													<p className="text-sm text-gray-500">{content}</p>
												</div>
												{formFields && (
													<form onSubmit={onSubmit} className="mt-4">
														{formFields.map((field, index) => (
															<div key={index} className="mb-4">
																<label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
																	{field.label}
																</label>
																<input type={field.type} id={field.name} name={field.name} value={field.value} onChange={field.onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
																{errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name][0]}</p>}
															</div>
														))}
														<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
															<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
																<TButton className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" color="red">
																	Delete
																</TButton>
																<button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={onClose}>
																	Cancel
																</button>
															</div>
														</div>
													</form>
												)}
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default ModalForm;
