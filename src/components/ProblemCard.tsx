import { ProblemProps } from "./Problem";
import ProblemText from "./ProblemText";
import { useNavigate } from "react-router-dom";

import classes from "./ProblemCard.module.css";

export default function ProblemCard({
	from,
	questionNo,
	problem,
	images,
}: ProblemProps) {
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
			<header>{`${from} 第${questionNo}题`}</header>
			<section className={classes["card-content"]}>
				<ProblemText {...problem} />
				{cardMedia}
			</section>
		</div>
	);
}
