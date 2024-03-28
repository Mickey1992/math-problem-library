import Problem, { ProblemProps } from "./Problem";

export default function ProblemList({
	problems,
}: {
	problems: ProblemProps[];
}) {
	return (
		<div className="problem-list">
			<div className="problem-icon">
				<Problem />
			</div>
		</div>
	);
}
