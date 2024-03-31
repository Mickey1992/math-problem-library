import localforage from "localforage";
import ProblemText, { StructuredProblemHTML } from "./ProblemText";
import ProblemTitle from "./ProblemTitle";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import classes from "./ProblemDetail.module.css";
import { useState } from "react";

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
	const [selectedSubQuestionsNo, setSelectedSubQuestionsNo] =
		useState(allSubQuestionsIndex);

	const [preview, setPreview] = useState(false);

	function handleClickSubQuestionNo(
		event: React.MouseEvent<HTMLElement>,
		newSelected: number[]
	) {
		setSelectedSubQuestionsNo(newSelected);
	}

	return (
		<div className={classes.problem}>
			<ProblemTitle from={from} questionNo={questionNo} />
			<ToggleButtonGroup
				value={selectedSubQuestionsNo}
				color="primary"
				onChange={handleClickSubQuestionNo}
				sx={{
					display: preview ? undefined : "none",
				}}
			>
				{allSubQuestionsIndex.map((no) => (
					<ToggleButton value={no} key={no}>
						{no + 1}
					</ToggleButton>
				))}
			</ToggleButtonGroup>

			<ToggleButton
				value="preview"
				selected={preview}
				onChange={() => {
					setPreview((pre) => !pre);
				}}
				sx={{ position: "absolute", right: "20px", top: "5px" }}
			>
				Preview
			</ToggleButton>
			<ProblemText
				{...problem}
				selectedSubQuestion={selectedSubQuestionsNo}
			/>

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
