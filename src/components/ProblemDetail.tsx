import localforage from "localforage";
import ProblemText, { StructuredProblemHTML } from "./ProblemText";
import ProblemTitle from "./ProblemTitle";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

import classes from "./ProblemDetail.module.css";

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
		<div className={classes.problem}>
			<ProblemTitle from={from} questionNo={questionNo} />
			<ProblemText {...problem} />

			<div className={classes.images}>
				{images.map((arrayBuffer: ArrayBuffer) => {
					const blob = new Blob([arrayBuffer]);
					const url = URL.createObjectURL(blob);
					return (
						<motion.img
							src={url}
							key={url}
							drag
							whileDrag={{
								border: "2px solid blue",
								"border-radius": "10px",
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

ProblemDetail.loader = async ({ params }) => {
	const problem = await localforage.getItem(params.id);

	return problem;
};
