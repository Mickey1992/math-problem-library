export interface StructuredProblemHTML {
	description: string;
	questions: StructuredProblemHTML[];
	selectedSubQuestion?: number[];
}

export default function ProblemText({
	description,
	questions,
	selectedSubQuestion,
}: StructuredProblemHTML) {
	return (
		<p>
			<div dangerouslySetInnerHTML={{ __html: description }}></div>
			<div>
				{questions.length > 0 && (
					<ol>
						{questions.map((question, index) => {
							let hide = false;
							if (
								selectedSubQuestion &&
								selectedSubQuestion.length > 0 &&
								!selectedSubQuestion.includes(index)
							) {
								hide = true;
							}
							return (
								<li
									key={question.description}
									className={hide ? "hide" : undefined}
								>
									<ProblemText {...question} />
								</li>
							);
						})}
					</ol>
				)}
			</div>
		</p>
	);
}
