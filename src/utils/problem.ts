import { StructuredProblemHTML } from "../components/ProblemText";

function levelUpMathElement(element: Element) {
	Array.from(element.getElementsByTagName("mjx-container")).forEach((e) => {
		const mathElement = e.getElementsByTagName("math")[0].cloneNode(true);
		e.replaceChildren();
		e.replaceWith(mathElement);
	});
}

function removeAttributes(element: Element) {
	Array.from(element.getElementsByTagName("*")).forEach((tag: Element) => {
		Array.from(tag.attributes).forEach((attribute) => {
			tag.removeAttribute(attribute.nodeName);
		});
	});
}

async function extractImages(element: Element) {
	const imgElements = Array.from(element.querySelectorAll("p > img"));
	return Promise.all(
		imgElements.map(async (imgElement) => {
			const arrayBuffer = await imageToBlob(imgElement);
			const parentElement = imgElement.parentElement!;
			parentElement.remove();
			return arrayBuffer;
		})
	);
}

async function imageToBlob(imageNode: Element): Promise<ArrayBuffer> {
	const imageUrl = imageNode.getAttribute("src");

	const response = await fetch(imageUrl!);
	const blob = await response.blob();
	const arrayBuffer = await new Response(blob).arrayBuffer();

	return arrayBuffer;
}

function structureProblem(problem: Element) {
	const description = problem.querySelector("div.talqs_content");
	if (description) {
		levelUpMathElement(description);
		removeAttributes(description);
	}

	const problemObj: StructuredProblemHTML = {
		description: description!.innerHTML
			.replaceAll("\n", "")
			.replaceAll(" ", ""),
		questions: [],
	};

	const subQuestions = problem.querySelector("div.talqs_subqs")?.children;

	if (subQuestions && subQuestions.length > 0) {
		problemObj.questions = Array.from(subQuestions).map((subQuestion) =>
			structureProblem(subQuestion)
		);
	} else {
		problemObj.questions = [];
	}

	levelUpMathElement(problem);
	removeAttributes(problem);

	return problemObj;
}

export async function getJsonMathProblem(
	problemHTML: string,
	questionNo: number
) {
	//console.log(problemHTML);
	const question: Element = document.createElement("div");
	question.innerHTML = problemHTML;

	//2024年上海松江区高三下学期高三一模
	const from = question!
		.querySelector("span.eq-source-text")!
		.textContent!.slice(4);

	// saveImages
	const images = await extractImages(question);

	// 题目
	const problem = structureProblem(
		question!.querySelector("div.talqs_main")!
	);

	return {
		from,
		questionNo,
		problem,
		images,
	};
}
