import { useState } from "react";

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
		</>
	);
}
