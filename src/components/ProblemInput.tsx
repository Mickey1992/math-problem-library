import { useState } from "react";

const MAX_DEPTH = 2;

export default function ProblemInput({
	title = undefined,
	name = "description",
	handleProblemTextChange,
	handleAddSubQuestion,
}: {
	title?: string;
	name?: string;
	handleProblemTextChange;
	handleAddSubQuestion;
}) {
	const [subQuestionCount, setSubQuestinoCount] = useState(0);
	const depth = name.split("1").filter((n) => n === "subQuestion").length;
	const subquestionEnabled = depth < MAX_DEPTH;

	function onAddSubQuestion() {
		const subName = `${name}.subQuestion[${subQuestionCount}]`;
		handleAddSubQuestion(subName);
		setSubQuestinoCount((prev) => prev + 1);
	}

	return (
		<>
			{title && <label>{title}</label>}
			<input type="text" name={name} onChange={handleProblemTextChange} />
			{subquestionEnabled && (
				<button type="button" onClick={onAddSubQuestion}>
					+
				</button>
			)}
			{subQuestionCount > 0 && (
				<ol>
					{Array.from({ length: subQuestionCount }, (_, i) => {
						const subName = `${name.replace(
							"description",
							"subQuestion"
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
		</>
	);
}
