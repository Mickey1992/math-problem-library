import { ProblemProps } from "./ProblemDetail";
import ProblemText from "./ProblemText";
import ProblemTitle from "./ProblemTitle";
import { useNavigate } from "react-router-dom";

import classes from "./ProblemCard.module.css";

import { blobToUrl } from "../utils/image.ts";

export default function ProblemCard({
	from,
	questionNo,
	problem,
	images,
}: ProblemProps) {
	const navigate = useNavigate();
	const cardMedia = (
		<div className={classes["img-box"]}>
			{images.map((arrayBuffer: ArrayBuffer) => {
				const url = blobToUrl(arrayBuffer);
				return <img src={url} />;
			})}
		</div>
	);

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
