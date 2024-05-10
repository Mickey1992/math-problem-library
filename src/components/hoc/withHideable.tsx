import React, { useRef, useState, useCallback } from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface WithHideableComponentProps {
	children: JSX.Element;
}
export default function withHideable(
	WrappedComponent: React.ComponentType<WithHideableComponentProps> = React.Fragment
) {
	return function Resizable({
		children,
		style,
	}: {
		children: JSX.Element;
		style?: React.CSSProperties;
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
			>
				<WrappedComponent>{children}</WrappedComponent>
				<div hidden={hover ? false : true} onPointerDown={handleHide}>
					<HighlightOffIcon sx={{ position: "absolute", top: 0 }} />
				</div>
			</div>
		);
	};
}
