import { useState, useRef } from "react";
import { Form, redirect } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BackupIcon from "@mui/icons-material/Backup";

import { getJsonMathProblem } from "../utils/problem";
import localforage from "localforage";

import classes from "./AddProblem.module.css";

export default function AddExistedProblem() {
	const [questionNo, setQuestionNo] = useState("");

	const setTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

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
		<Form method="PUT" className={classes.addForm}>
			<div>
				<TextField
					required
					label="Question No"
					id="questionNo"
					name="questionNo"
					type="number"
					defaultValue={0}
					onChange={handleQuestionNoChange}
					placeholder="please input the question no. here"
					margin="normal"
					size="small"
				/>
				{extractCode && (
					<div className={classes.code}>
						<pre>{extractCode}</pre>
						<Button
							variant="outlined"
							onClick={handleCopy}
							type="button"
							size="small"
							startIcon={<ContentCopyIcon />}
						>
							Copy
						</Button>
					</div>
				)}
			</div>

			<div className={classes.paste}>
				<TextField
					required
					label="Problem HTML"
					id="problem-html"
					name="problem-html"
					placeholder="please input the problem html here"
					defaultValue="<div>problem</div>"
					multiline
					rows={5}
					fullWidth
					margin="normal"
					size="small"
				/>
			</div>
			<div className={classes["submit-buttons"]}>
				<Button
					variant="outlined"
					type="submit"
					startIcon={<BackupIcon />}
					size="small"
				>
					Submit
				</Button>
				{/* TODO: Add a button to clear user input */}
			</div>
		</Form>
	);
}

AddExistedProblem.action = async ({ request }) => {
	const data = await request.formData();

	const jsonProblem = await getJsonMathProblem(
		data.get("problem-html"),
		data.get("questionNo")
	);

	const index = `${jsonProblem.from}-${jsonProblem.questionNo}`;
	localforage.setItem(index, jsonProblem);

	return redirect("/");
};
