import localforage from "localforage";
import { ProblemProps } from "./ProblemDetail";
import { useLoaderData } from "react-router-dom";
import ProblemCard from "./ProblemCard";

import useMathJax from "../hooks/useMathJax";

export default function ProblemList() {
	const problems = useLoaderData() as ProblemProps[];

	useMathJax(problems);
	return (
		<div className="problem-list">
			{problems.map((problem) => {
				const key = `${problem.from}-${problem.questionNo}`;
				return <ProblemCard key={key} {...problem} />;
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
