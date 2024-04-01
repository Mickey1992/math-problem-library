import localforage from "localforage";
import ProblemText, { StructuredProblemHTML } from "./ProblemText";
import ProblemTitle from "./ProblemTitle";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

import classes from "./ProblemDetail.module.css";
import { useState } from "react";

import ToggleButton from "./Buttons/ToggleButton";
import ToggleButtonGroup from "./Buttons/ToggleButtonGroup";
import DraggableImg from "./DraggableImg";

export interface ProblemProps {
	from: string;
	questionNo: number;
	problem: StructuredProblemHTML;
	images: ArrayBuffer[];
}

export default function ProblemDetail() {
	const { from, questionNo, problem, images }: ProblemProps =
		useLoaderData() as ProblemProps;

	const numberOfSubQuestions = problem.questions.length;
	const allSubQuestionsIndex = Array.from(
		{ length: numberOfSubQuestions },
		(_, i) => i
	);

	// SubQuestion No starts from 0
	const [selectedSubQuestion, setSelectedSubQuestion] = useState(
		Object.fromEntries(
			Array.from({ length: numberOfSubQuestions }, (_, i) => [i, true])
		)
	);

	function handleClickSubQuestionNo(clickedValue: number) {
		setSelectedSubQuestion((prev) => {
			return { ...prev, [clickedValue]: !prev[clickedValue] };
		});
	}

	return (
		<div className={classes.problem}>
			<ProblemTitle from={from} questionNo={questionNo} />

			<ToggleButtonGroup
				className={classes.buttonGroup}
				onToggle={handleClickSubQuestionNo}
			>
				{allSubQuestionsIndex.map((no) => (
					<ToggleButton
						className={classes.subQuestionNo}
						select
						value={no}
						key={no}
					>
						{no + 1}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
			<ProblemText
				{...problem}
				selectedSubQuestion={selectedSubQuestion}
			/>

			<div className={classes.images}>
				{images.map((arrayBuffer: ArrayBuffer) => {
					const blob = new Blob([arrayBuffer]);
					const url = URL.createObjectURL(blob);
					return (
						<DraggableImg imgUrl={url} />
						// <motion.img
						// 	src={url}
						// 	key={url}
						// 	drag
						// 	whileDrag={{
						// 		border: "2px solid blue",
						// 		"border-radius": "10px",
						// 	}}
						// />
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
