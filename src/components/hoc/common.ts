export type WrappedComponentProps = {
	[x: string]:
		| JSX.Element
		| boolean
		| string
		| number
		| { [x: string]: string | number | boolean }
		| undefined
		| null;
};
