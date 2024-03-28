import ProblemText, { ProblemHTML } from "./ProblemText";
import ProblemTitle from "./ProblemTitle";

export interface ProblemProps {
	from: string;
	questionNo: number;
	problem: ProblemHTML;
	images: string[];
}

export default function Problem({
	from,
	questionNo,
	problem,
	images,
}: ProblemProps) {
	return (
		<div className="problem">
			<ProblemTitle from={from} questionNo={questionNo} />
			<ProblemText {...problem} />

			<div className="images">
				{images.map((image) => (
					<img src={image} key={image} />
				))}
			</div>
		</div>
	);
}
