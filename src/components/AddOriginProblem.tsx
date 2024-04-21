import { useEffect, useState } from "react";
import ProblemInput from "./ProblemInput";
import ProblemText from "./ProblemText";
import ImageUploader from "./ImageUploader";
import React from "react";

type Problem = {
	description?: string;
	questions?: Problem[];
};

//names: [subQuestion, subId, subQuestion, subId, ..., description]
function updateProblemText(problem: Problem, names: string[], text: string) {
	if (names.length <= 1) {
		return { ...problem, description: text };
	} else if (!problem.questions) {
		return { ...problem, questions: [{ description: text }] };
	} else if (parseInt(names[1]) >= problem.questions.length) {
		return {
			...problem,
			questions: [...problem.questions, { description: text }],
		};
	} else {
		const subId = parseInt(names[1]);
		const targetProblem = problem.questions[subId];
		const updatedProblem = {
			...problem,
			questions: [...problem.questions],
		};
		updatedProblem.questions[subId] = updateProblemText(
			targetProblem,
			names.slice(2),
			text
		);
		return updatedProblem;
	}
}

export default function AddOriginProblem() {
	const [problem, setProblem] = useState<Problem>({});

	useEffect(() => {
		if (window.MathJax) {
			window.MathJax.typesetPromise();
		}
	}, [problem]);

	function handleProblemTextChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const { name, value } = event.target;
		setProblem((pre) => updateProblemText(pre, name.split("."), value));
	}

	function handleAddSubQuestion(name: string) {
		setProblem((pre) => updateProblemText(pre, name.split("."), ""));
	}

	return (
		<form>
			<label>From</label>
			<input type="text" name="from" />
			<br />
			<label>Question</label>
			<ProblemInput
				title={"Problem"}
				handleProblemTextChange={handleProblemTextChange}
				handleAddSubQuestion={handleAddSubQuestion}
			/>

			<ImageUploader />

			<p id="preview">
				<ProblemText {...problem} />
			</p>
		</form>
	);
}
