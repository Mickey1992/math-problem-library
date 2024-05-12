import { useState } from "react";
import ProblemInput from "./ProblemInput";
import ProblemText from "./ProblemText";
import ImageUploader from "./ImageUploader";

import localforage from "localforage";

import { Form, redirect } from "react-router-dom";

import useRerenderMathJax from "../hooks/useRerenderMathJax";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BackupIcon from "@mui/icons-material/Backup";
import classes from "./AddProblem.module.css";

export type Problem = {
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

function base64ToArrayBuffer(base64: string): ArrayBuffer {
	const binaryString = window.atob(
		base64.replace("data:image/png;base64,", "")
	);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
}

export default function AddOriginProblem() {
	const [problem, setProblem] = useState<Problem>({});
	const [images, setImages] = useState<ArrayBuffer[]>([]);

	useRerenderMathJax(problem);
	console.log(problem);

	function handleProblemTextChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const { name, value } = event.target;
		console.log(event.target);
		setProblem((pre) => updateProblemText(pre, name.split("."), value));
	}

	function handleAddSubQuestion(name: string) {
		setProblem((pre) => updateProblemText(pre, name.split("."), ""));
	}

	function handleImageUpload(image: ArrayBuffer) {
		setImages((pre) => [...pre, image]);
	}

	const jsonProblem = { problem, images };

	return (
		<Form method="PUT">
			<div className={classes["input-area"]}>
				<div className={classes.left}>
					<div className={classes["input-group"]}>
						<label>题源：</label>
						<TextField
							type="text"
							name="from"
							label="From"
							size="small"
						/>
					</div>

					<div className={classes["input-group"]}>
						<label>编号：</label>
						<TextField
							type="number"
							name="question-no"
							label="QuestionNo"
							size="small"
						/>
					</div>
					<div className={classes["input-group"]}>
						<label>题目：</label>
						<ProblemInput
							handleProblemTextChange={handleProblemTextChange}
							handleAddSubQuestion={handleAddSubQuestion}
						/>
					</div>
					<div className={classes["input-group"]}>
						<label>图片：</label>
						<ImageUploader
							handleImageUpload={handleImageUpload}
							uploadedImages={images}
						/>
					</div>
				</div>
				<div className={classes.right}>
					<p className={classes["problem-text-preview"]}>
						<ProblemText {...problem} />
					</p>
				</div>
			</div>

			<input
				hidden
				value={JSON.stringify(jsonProblem)}
				name="problem-data"
			></input>
			<div className={classes["submit-buttons"]}>
				<Button
					variant="outlined"
					type="submit"
					startIcon={<BackupIcon />}
					size="small"
				>
					Submit
				</Button>
			</div>
		</Form>
	);
}

AddOriginProblem.action = async ({ request }) => {
	console.log("AddOriginProblem.action");
	const data = await request.formData();
	console.log(data);
	console.log(JSON.parse(data.get("problem-data")));

	const jsonProblem = JSON.parse(data.get("problem-data"));
	jsonProblem.images = jsonProblem.images.map(base64ToArrayBuffer);
	jsonProblem.from = data.get("from");
	jsonProblem.questionNo = data.get("question-no");

	const index = `${jsonProblem.from}-${jsonProblem.questionNo}`;
	localforage.setItem(index, jsonProblem);

	return redirect("/");
};
