import { useState } from "react";
import TextField from "@mui/material/TextField";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import Button from "@mui/material/Button";

import classes from "./AddProblem.module.css";

type ProblemInputProps = {
	title?: string;
	name?: string;
	handleProblemTextChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	handleAddSubQuestion: (name: string) => void;
};

const MAX_DEPTH = 2;

export default function ProblemInput({
	title = undefined,
	name = "description",
	handleProblemTextChange,
	handleAddSubQuestion,
}: ProblemInputProps) {
	const [subQuestionCount, setSubQuestinoCount] = useState(0);
	const depth = name.split(".").filter((n) => n === "questions").length;
	const subquestionEnabled = depth < MAX_DEPTH;

	function onAddSubQuestion() {
		const subName = `${name}.questions[${subQuestionCount}]`;
		handleAddSubQuestion(subName);
		setSubQuestinoCount((prev) => prev + 1);
	}

	return (
		<div className={classes["problem-input"]}>
			{title && <label>{title}</label>}
			<TextField
				label={title}
				type="text"
				name={name}
				size="small"
				multiline
				rows={3}
				fullWidth
				onChange={handleProblemTextChange}
			/>
			{subquestionEnabled && (
				<Button
					variant="outlined"
					type="button"
					startIcon={<SubdirectoryArrowRightIcon />}
					size="small"
					onClick={onAddSubQuestion}
				>
					Add sub
				</Button>
			)}
			{subQuestionCount > 0 && (
				<ol>
					{Array.from({ length: subQuestionCount }, (_, i) => {
						const subName = `${name.replace(
							"description",
							"questions"
						)}.${i}.description`;
						return (
							<li key={subName}>
								<ProblemInput
									name={subName}
									handleProblemTextChange={
										handleProblemTextChange
									}
									handleAddSubQuestion={handleAddSubQuestion}
								/>
							</li>
						);
					})}
				</ol>
			)}
		</div>
	);
}
