import { useState, useRef } from "react";

export default function AddProblem() {
	const [questionNo, setQuestionNo] = useState("");

	const setTimeoutRef = useRef<number | undefined>(undefined);

	function handleQuestionNoChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		clearTimeout(setTimeoutRef.current as number);
		setTimeoutRef.current = setTimeout(() => {
			console.log(`questionNo: ${event.target.value}`);
			setTimeoutRef.current = undefined;
			setQuestionNo(event.target.value);
		}, 1000);
	}

	function handleCopy() {
		navigator.clipboard.writeText(extractCode ?? "");
	}

	const extractCode = questionNo
		? `
        const button = document.createElement("button");
        button.textContent = "copy html code of this problem";
        button.style="background-color: red";
        button.addEventListener("click", function () {
            const html = document.querySelector(".element-question[data-index=\\"${questionNo}\\"]").outerHTML;
            navigator.clipboard.writeText(html);
        });

        document.querySelector(".element-question[data-index=\\"${questionNo}\\"]").querySelector(".element-question-header").append(button);
        `
		: undefined;

	` document.body.addEventListener("click", function () { \n
            let html = document.querySelector(".element-question[data-index=\\"${questionNo}\\"]").outerHTML; \n 
            navigator.clipboard.writeText(html)；`;

	`document.body.addEventListener("click", function () {
		let html = document.querySelector(".element-question[data-index=\\"${questionNo}\\"]").outerHTML;
		navigator.clipboard.writeText(html);
	});`;

	return (
		<>
			<div>
				<label>Question No: </label>
				<input
					type="number"
					onChange={handleQuestionNoChange}
					placeholder="please input the question no. here"
				/>
				{extractCode && <pre>{extractCode}</pre>}
				<button onClick={handleCopy}>Copy</button>
			</div>

			<div>
				<textarea />
			</div>
		</>
	);
}
