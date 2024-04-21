import { useEffect } from "react";
import { Problem } from "../components/AddOriginProblem";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

export default function useMathJax(problem: Problem | Problem[]) {
	useEffect(() => {
		if (window.MathJax) {
			window.MathJax.typesetPromise();
		}
	}, [problem]);
}
