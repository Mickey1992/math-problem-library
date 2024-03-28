import { useState, useRef } from "react";
import { Form, redirect } from "react-router-dom";

import { getJsonMathProblem } from "../utils/problem";

export default function AddProblem() {
	const [questionNo, setQuestionNo] = useState("");

	const setTimeoutRef = useRef<number | undefined>(undefined);

	function handleQuestionNoChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		clearTimeout(setTimeoutRef.current);
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

	return (
		<Form method="PUT">
			<div>
				<label>Question No: </label>
				<input
					name="questionNo"
					type="number"
					onChange={handleQuestionNoChange}
					placeholder="please input the question no. here"
				/>
				{extractCode && <pre>{extractCode}</pre>}
				<button onClick={handleCopy} type="button">
					Copy
				</button>
			</div>

			<div>
				<textarea name="problem-html" />
				<button>Submit</button>
			</div>
		</Form>
	);
}

export async function addProblemAction({ request }) {
	const data = await request.formData();

	const jsonProblem = await getJsonMathProblem(
		data.get("problem-html"),
		data.get("questionNo")
	);
	console.log(JSON.stringify(jsonProblem));

	return redirect("/");
}
