import AddProblem, { addProblemAction } from "./components/AddProblem";
import Problem from "./components/Problem";
import ProblemList from "./components/ProblemList";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const MATH_PROBLEMS = [
	{
		from: "2022年上海初三下学期中考真题",
		questionNo: 25,
		problem: {
			description:
				"<p>平行四边形<math><mi>A</mi><mi>B</mi><mi>C</mi><mi>D</mi></math>，若<math><mi>P</mi></math>为<math><mi>B</mi><mi>C</mi></math>中点，<math><mi>A</mi><mi>P</mi></math>交<math><mi>B</mi><mi>D</mi></math>于点<math><mi>E</mi></math>，连接<math><mi>C</mi><mi>E</mi></math>．</p><p></p>",
			questions: [
				{
					description:
						"<p>若<math><mi>A</mi><mi>E</mi><mo>=</mo><mi>C</mi><mi>E</mi></math>．</p>",
					questions: [
						{
							description:
								"<p>证明四边形<math><mi>A</mi><mi>B</mi><mi>C</mi><mi>D</mi></math>为菱形．</p>",
							questions: [],
						},
						{
							description:
								"<p>若<math><mi>A</mi><mi>B</mi><mo>=</mo><mn>5</mn></math>，<math><mi>A</mi><mi>E</mi><mo>=</mo><mn>3</mn></math>，求<math><mi>B</mi><mi>D</mi></math>的长．</p>",
							questions: [],
						},
					],
				},
				{
					description:
						"<p>以<math><mi>A</mi></math>为圆心，<math><mi>A</mi><mi>E</mi></math>为半径，<math><mi>B</mi></math>为圆心，<math><mi>B</mi><mi>E</mi></math>为半径作圆，两圆另一交点记为点<math><mi>F</mi></math>，且<math><mi>C</mi><mi>E</mi><mo>=</mo><msqrt><mn>2</mn></msqrt><mi>A</mi><mi>E</mi></math>．若<math><mi>F</mi></math>在直线<math><mi>C</mi><mi>E</mi></math>上，求<math><mfrac><mrow><mi>A</mi><mi>B</mi></mrow><mrow><mi>B</mi><mi>C</mi></mrow></mfrac></math>的值．</p>",
					questions: [],
				},
			],
		},
		images: ["37be6663-2404-4c7a-bc52-56a4116dcd67.svg"],
	},
];

const router = createBrowserRouter([
	{
		index: true,
		element: <AddProblem />,
		action: addProblemAction,
	},
]);
function App() {
	return <RouterProvider router={router} />;
}

export default App;
