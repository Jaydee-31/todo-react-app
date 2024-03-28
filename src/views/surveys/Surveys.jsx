import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/core/TButton";
import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import PaginationLinks from "../../components/PaginationLinks";
import SurveyList from "./SurveyList";
import { toast } from "react-toastify";
import LoadCircle from "../../components/spinner/LoadCircle";

export default function Surveys() {
	// const { surveys } = useStateContext();
	const [surveys, setSurveys] = useState([]);
	const [meta, setMeta] = useState({});
	const [loading, setLoading] = useState(false);

	const onDeleteClick = (id) => {
		console.log("Deleted successfully");
		axiosClient.delete(`/survey/${id}`).then(() => {
			getSurveys();
			toast("Todo deleted successfully!", {
				position: "bottom-right",
				className: "foo-bar",
			});
		});
	};

	const onPageClick = (link) => {
		getSurveys(link.url);
	};

	const getSurveys = (url) => {
		url = url || "/survey";
		setLoading(true);
		axiosClient.get(url).then(({ data }) => {
			setSurveys(data.data);
			setMeta(data.meta);
			setLoading(false);
		});
	};

	useEffect(() => {
		getSurveys();
	}, []);

	return (
		<PageComponent
			title="Surveys"
			buttons={
				<TButton color="green" to="/surveys/create">
					<PlusCircleIcon className="h-6 w-6 mr-2" />
					Create new
				</TButton>
			}>
			{loading ? (
				<LoadCircle />
			) : (
				<div>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 mb-4">
						{surveys.map((survey) => (
							<SurveyList survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
						))}
					</div>
					{surveys.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}
				</div>
			)}
		</PageComponent>
	);
}
