import AddProblem from "./components/AddProblem";
import ProblemDetail from "./components/ProblemDetail";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProblemList from "./components/ProblemList";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{
				index: true,
				element: <ProblemList />,
				loader: ProblemList.loader,
			},
			{ path: "add", element: <AddProblem />, action: AddProblem.action },
			{
				path: "problem/:id",
				element: <ProblemDetail />,
				loader: ProblemDetail.loader,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
