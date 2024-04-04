import localforage from "localforage";
import ProblemText, { StructuredProblemHTML } from "./ProblemText";
import ProblemTitle from "./ProblemTitle";
import { useLoaderData } from "react-router-dom";

import classes from "./ProblemDetail.module.css";
import { useState } from "react";

import ToggleButton from "./Buttons/ToggleButton";
import ToggleButtonGroup from "./Buttons/ToggleButtonGroup";
import DraggableImg from "./DraggableImg";
import ResizableElement from "./ResizableElement";
import DraggableElement from "./DraggableElement";
import TransformableElement from "./TransformableElement";

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
						<TransformableElement
							className={classes.image}
							draggable
							resizable
							hideable
						>
							<img src={url} />
						</TransformableElement>
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
