export default function ProblemTitle({
	from,
	questionNo,
}: {
	from: string;
	questionNo: number;
}) {
	return (
		<header>
			{from} 第{questionNo}题
		</header>
	);
}
