import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import AppLayout from "./views/layouts/AppLayout";
import GuestLayout from "./views/layouts/GuestLayout";
import Login from "./views/auth/Login";
import Signup from "./views/auth/Signup";
import Todos from "./views/todos/Todos";
import TodoForm from "./views/todos/TodoForm";
import Surveys from "./views/surveys/Surveys";
import SurveyForm from "./views/surveys/SurveyForm";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/dashboard",
				element: <Navigate to="/" />,
			},
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "/surveys",
				element: <Surveys />,
			},
			{
				path: "/surveys/create",
				element: <SurveyForm />,
			},
			{
				path: "/todos",
				element: <Todos />,
			},
			{
				path: "/todos/create",
				element: <TodoForm />,
			},
		],
	},
	{
		path: "/",
		element: <GuestLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
		],
	},
]);

export default router;
