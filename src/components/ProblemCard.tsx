import { ProblemProps } from "./Problem";
import ProblemText from "./ProblemText";

import classes from "./ProblemCard.module.css";

export default function ProblemCard({
	from,
	questionNo,
	problem,
	images,
}: ProblemProps) {
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
	return (
		<div className={classes.card}>
			<header>{`${from} 第${questionNo}题`}</header>
			<section className={classes["card-content"]}>
				<ProblemText {...problem} />
				{cardMedia}
			</section>
		</div>
	);
}
