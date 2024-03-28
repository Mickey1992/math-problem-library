import https from "https";
import fs from "fs";

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
	const imgNodes = Array.from(element.querySelectorAll("p > img"));
	const imgNames: string[] = [];

	imgNodes.forEach(async (imgNode) => {
		imgNames.push((await saveImage(imgNode)) as string);
		imgNode!.parentNode!.removeChild(imgNode);
	});
	return imgNames;
}

async function saveImage(imageNode: Element) {
	const imageUrl = imageNode.getAttribute("src");

	//download Image
	return await downloadImage(imageUrl!);
}
async function downloadImage(imageUrl: string) {
	const imageName = imageUrl.split("/").slice(-1).toString();
	const outputFolder = "public" + "/";
	const outputFileName = outputFolder + imageName;

	return new Promise((resolve, reject) => {
		https.get(imageUrl, (res) => {
			res.pipe(fs.createWriteStream(outputFileName))
				.on("error", reject)
				.once("close", resolve);
		});
	});
}

// async function downloafImage(imageUrl) {
// 	const fileName = imageUrl.split("/").slice(-1).toString();

// 	// 使用fetch获取图片
// 	await fetch(imageUrl)
// 		.then((response) => response.blob())
// 		.then((blob) => {
// 			// 创建一个临时的URL指向图片
// 			const objectUrl = URL.createObjectURL(blob);

// 			// 创建一个临时的<a>标签用于下载
// 			const downloadLink = document.createElement("a");
// 			downloadLink.href = objectUrl;
// 			downloadLink.download = fileName; // 指定下载文件名
// 			document.body.appendChild(downloadLink);

// 			// 触发下载
// 			downloadLink.click();

// 			// 清理临时的URL和<a>标签
// 			document.body.removeChild(downloadLink);
// 			URL.revokeObjectURL(objectUrl);
// 		})
// 		.catch((error) => console.error("下载失败:", error));

// 	return fileName;
// }

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

	// 题干
	// const mainQuestion = question.querySelector(".talqs_content");
	// levelUpMathElement(mainQuestion);
	// removeAttributes(mainQuestion);

	// 子问
	// let subQuestions = question
	// 	.querySelector("div.talqs_subqs")
	//	.querySelectorAll(".talqs_main>div");

	// let subQuestions = question.querySelector("div.talqs_subqs").children;

	// subQuestions.forEach((subQuestion) => {
	//	levelUpMathElement(subQuestion);
	//	removeAttributes(subQuestion);
	// });

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
