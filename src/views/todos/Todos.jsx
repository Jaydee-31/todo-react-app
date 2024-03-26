import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/core/TButton";

export default function Todos() {
	return (
		<PageComponent
			title="Todos"
			buttons={[
				<TButton color="green" to="/todos/create">
					<PlusCircleIcon className="h-6 w-6 mr-2" />
					Create new
				</TButton>,
			]}></PageComponent>
	);
}
