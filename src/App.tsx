import AddProblem from "./components/AddProblem";
import Problem from "./components/Problem";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{ path: "add", element: <AddProblem />, action: AddProblem.action },
			{ path: "problem", element: <Problem />, loader: Problem.loader },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
