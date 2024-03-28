import localforage from "localforage";
import ProblemText, { StructuredProblemHTML } from "./ProblemText";
import ProblemTitle from "./ProblemTitle";
import { useLoaderData } from "react-router-dom";

export interface ProblemProps {
	from: string;
	questionNo: number;
	problem: StructuredProblemHTML;
	images: ArrayBuffer[];
}

export default function Problem() {
	const { from, questionNo, problem, images }: ProblemProps =
		useLoaderData() as ProblemProps;

	return (
		<div className="problem">
			<ProblemTitle from={from} questionNo={questionNo} />
			<ProblemText {...problem} />

			<div className="images">
				{images.map((arrayBuffer: ArrayBuffer) => {
					const blob = new Blob([arrayBuffer]);
					const url = URL.createObjectURL(blob);
					return <img src={url} key={url} />;
				})}
			</div>
		</div>
	);
}

Problem.loader = async () => {
	const problem = await localforage.getItem(
		"2024年上海青浦区高三下学期高三一模-20"
	);

	return problem;
};
