import localforage from "localforage";
import AddProblem, { addProblemAction } from "./components/AddProblem";
import Problem, { problemLoader } from "./components/Problem";
import ProblemList from "./components/ProblemList";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{ path: "add", element: <AddProblem />, action: addProblemAction },
			{ path: "problem", element: <Problem />, loader: problemLoader },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
