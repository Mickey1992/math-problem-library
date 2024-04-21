import { ProblemProps } from "./ProblemDetail";
import ProblemText from "./ProblemText";
import ProblemTitle from "./ProblemTitle";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import classes from "./ProblemCard.module.css";

export default function ProblemCard({
	from,
	questionNo,
	problem,
	images,
}: ProblemProps) {
	useEffect(() => {
		if (window.MathJax) {
			window.MathJax.typesetPromise();
		}
	}, [problem]);

	const navigate = useNavigate();
	let cardMedia = null;
	if (images.length > 0) {
		const blob = new Blob([images[0]]);
		const url = URL.createObjectURL(blob);
		cardMedia = (
			<div className={classes["img-box"]}>
				<img src={url} />
			</div>
		);
	}

	function handleCLick() {
		navigate(`/problem/${from}-${questionNo}`);
	}
	return (
		<div className={classes.card} onClick={handleCLick}>
			<ProblemTitle from={from} questionNo={questionNo} />
			<section className={classes["card-content"]}>
				<ProblemText {...problem} />
				{cardMedia}
			</section>
		</div>
	);
}
