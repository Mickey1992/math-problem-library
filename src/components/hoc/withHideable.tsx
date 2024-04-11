import React, { useRef, useState, useCallback } from "react";

import { WrappedComponentProps } from "./common";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function withHideable(
	WrappedComponent: React.ComponentType<WrappedComponentProps> = React.Fragment
) {
	return function Resizable({
		children,
		style,
		...props
	}: {
		children: JSX.Element;
		style?: {
			[x: string]: string | number | boolean;
		};
		[x: string]:
			| JSX.Element
			| boolean
			| string
			| number
			| { [x: string]: string | number | boolean }
			| undefined;
	}) {
		const elementRef = useRef(null);

		const [hide, setHide] = useState(false);
		const [hover, sestHover] = useState(false);

		const onMouseMove = useCallback(() => {
			sestHover((pre) => !pre);
		}, []);

		const handleHide = useCallback(() => {
			setHide(true);
		}, []);

		if (hide) return null;

		return (
			<div
				ref={elementRef}
				style={{ ...style }}
				onPointerEnter={onMouseMove}
				onPointerLeave={onMouseMove}
				{...props}
			>
				<WrappedComponent>{children}</WrappedComponent>
				<div hidden={hover ? false : true} onPointerDown={handleHide}>
					<HighlightOffIcon sx={{ position: "absolute", top: 0 }} />
				</div>
			</div>
		);
	};
}
