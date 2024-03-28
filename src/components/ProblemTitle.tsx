export default function ProblemTitle({
	from,
	questionNo,
}: {
	from: string;
	questionNo: number;
}) {
	return (
		<div className="problem-title">
			<h1>
				【{from} 第{questionNo}题】
			</h1>
		</div>
	);
}
