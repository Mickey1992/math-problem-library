export interface StructuredProblemHTML {
	description: string;
	questions: StructuredProblemHTML[];
}

export default function ProblemText({
	description,
	questions,
}: StructuredProblemHTML) {
	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: description }}></div>
			<div>
				{questions.length > 0 && (
					<ol>
						{questions.map((question) => (
							<li key={question.description}>
								<ProblemText {...question} />
							</li>
						))}
					</ol>
				)}
			</div>
		</>
	);
}
