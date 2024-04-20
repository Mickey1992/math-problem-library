import { useEffect, useState } from "react";

export default function AddOriginProblem() {
	const [question, setQuestion] = useState(undefined);

	useEffect(() => {
		if (window.MathJax) {
			window.MathJax.typesetPromise();
		}
	}, [question]);

	function handleQuestionChange(event) {
		setQuestion(event.target.value);
	}

	return (
		<form>
			<label>From</label>
			<input type="text" name="from" />
			<br />
			<label>Question</label>
			<input
				type="text"
				name="question"
				onChange={handleQuestionChange}
				value={question}
			/>

			<p
				id="preview"
				dangerouslySetInnerHTML={{ __html: question || "" }}
			></p>
		</form>
	);
}
