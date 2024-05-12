import React, { useRef, useState, useCallback } from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface WithHideableComponentProps {
	children: JSX.Element;
}
export default function withHideable(
	WrappedComponent: React.ComponentType<WithHideableComponentProps> = React.Fragment
) {
	return function Hideable({
		children,
		style,
	}: {
		children: JSX.Element;
		style?: React.CSSProperties;
	}) {
		const elementRef = useRef(null);

		const [hide, setHide] = useState(false);
		const [hover, setHover] = useState(false);

		const handleHide = useCallback(() => {
			setHide(true);
		}, []);

		if (hide) return null;

		return (
			<div
				ref={elementRef}
				style={{ ...style }}
				onPointerEnter={() => setHover(true)}
				onPointerLeave={() => setHover(false)}
			>
				<WrappedComponent>{children}</WrappedComponent>
				<div hidden={hover ? false : true} onPointerDown={handleHide}>
					<HighlightOffIcon sx={{ position: "absolute", top: 0 }} />
				</div>
			</div>
		);
	};
}
