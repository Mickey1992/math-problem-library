import { useState, useRef } from "react";
import { Form, redirect } from "react-router-dom";

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
				<Form method="PUT">
					<textarea name="problem-html" />
					<button>Submit</button>
				</Form>
			</div>
		</>
	);
}

export async function addProblemAction({ request }) {
	const data = await request.formData();
	const html = data.get("problem-html");
	console.log(html);

	return redirect("/");
}
