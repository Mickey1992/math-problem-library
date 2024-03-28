import localforage from "localforage";
import { ProblemProps } from "./Problem";
import { Link, useLoaderData } from "react-router-dom";

export default function ProblemList() {
	const problems = useLoaderData() as ProblemProps[];
	return (
		<div className="problem-list">
			{problems.map((problem) => {
				const key = `${problem.from}-${problem.questionNo}`;
				return (
					<Link
						key={key}
						to={`/problem/${key}`}
					>{`${problem.from}第${problem.questionNo}题`}</Link>
				);
			})}
		</div>
	);
}

ProblemList.loader = async () => {
	const problemKeys = await localforage.keys();
	const problems = problemKeys.map(
		async (key) => (await localforage.getItem(key)) as ProblemProps
	);

	return Promise.all(problems);
};
