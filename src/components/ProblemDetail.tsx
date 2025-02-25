import localforage from "localforage";
import ProblemText from "./ProblemText";
import ProblemTitle from "./ProblemTitle";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import classes from "./ProblemDetail.module.css";
import { useState } from "react";

import ToggleButton from "./Buttons/ToggleButton";
import ToggleButtonGroup from "./Buttons/ToggleButtonGroup";
import withResizable from "./hoc/withResizable";
import withDraggable from "./hoc/withDraggable";
import withHideable from "./hoc/withHideable";

import useRerenderMathJax from "../hooks/useRerenderMathJax";
import { Problem } from "./AddOriginProblem";

import { blobToUrl } from "../utils/image.ts";

export interface ProblemProps {
	from: string;
	questionNo: number;
	problem: Problem;
	images: ArrayBuffer[];
}

export default function ProblemDetail() {
	const { from, questionNo, problem, images } =
		useLoaderData() as ProblemProps;

	useRerenderMathJax(problem);

	const numberOfSubQuestions = problem.questions?.length || 0;
	const allSubQuestionIndexes = Array.from(
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
				{allSubQuestionIndexes.map((no) => (
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
					const url = blobToUrl(arrayBuffer);
					const DraggableResizable = withDraggable(
						withHideable(withResizable())
					);
					return (
						<DraggableResizable className={classes.image} key={url}>
							<img src={url} />
						</DraggableResizable>
					);
				})}
			</div>
		</div>
	);
}

ProblemDetail.loader = async ({ params }: LoaderFunctionArgs) => {
	const problem = (await localforage.getItem(params.id!)) as ProblemProps;
	return problem;
};
