import AddProblem from "./components/AddProblem";
import Problem from "./components/Problem";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProblemList from "./components/ProblemList";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ProblemList />,
		loader: ProblemList.loader,
		children: [
			{ path: "add", element: <AddProblem />, action: AddProblem.action },
			{
				path: "problem/:id",
				element: <Problem />,
				loader: Problem.loader,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
