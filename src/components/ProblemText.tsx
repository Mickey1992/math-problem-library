export interface ProblemHTML {
	description: string;
	questions: ProblemHTML[];
}

export default function ProblemText({ description, questions }: ProblemHTML) {
	return (
		console.log(description),
		(
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
		)
	);
}
