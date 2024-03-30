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

export default function ProblemDetail() {
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

ProblemDetail.loader = async ({ params }) => {
	const problem = await localforage.getItem(params.id);

	return problem;
};
