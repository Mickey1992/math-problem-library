export interface StructuredProblemHTML {
	description?: string;
	questions?: StructuredProblemHTML[];
	selectedSubQuestion?: {
		[k: string]: boolean;
	};
}

export default function ProblemText({
	description,
	questions,
	selectedSubQuestion = undefined,
}: StructuredProblemHTML) {
	if (!description) return null;
	return (
		<p>
			<div dangerouslySetInnerHTML={{ __html: description }}></div>
			<div>
				{questions && questions.length > 0 && (
					<ol>
						{questions.map((question, index) => {
							return (
								<li
									key={question.description}
									className={
										!selectedSubQuestion ||
										selectedSubQuestion[index]
											? undefined
											: "hide"
									}
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
