/* eslint-disable no-mixed-spaces-and-tabs */
import { useRef, useState, useEffect, useCallback } from "react";

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React from "react";

interface ResizeInfo {
	height: number;
	width: number;
	dragPointerX: number;
	dragPointerY: number;
	hover: boolean;
}

export default function withResizable(WrappedComponent = React.Fragment) {
	return function Resizable({
		children,
		initialSize = { width: "calc(max(20vw, 100px))", height: "auto" },
		style,
		...props
	}: {
		children: JSX.Element;
		initialSize: { width?: number | string; height?: number | string };
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

		const [info, setInfo] = useState<null | ResizeInfo>(null);

		useEffect(() => {
			if (elementRef?.current === null) return;
			setInfo({
				height: elementRef.current["offsetHeight"],
				width: elementRef.current["offsetWidth"],
				dragPointerX: 0,
				dragPointerY: 0,
				hover: false,
			});

			return () => {
				setInfo(null);
			};
		}, [elementRef]);

		const doResize = useCallback((event: PointerEvent) => {
			setInfo((pre) => {
				if (!pre) return pre;
				const deltaX = event.clientX - pre.dragPointerX;
				const deltaY = event.clientY - pre.dragPointerY;
				if (pre.width + deltaX < 10 || pre.height + deltaY < 10)
					return pre;

				const scale = (deltaX + pre.width) / pre.width;
				return {
					hover: true,
					width: pre.width + deltaX,
					height: pre.height * scale,
					dragPointerX: event.clientX,
					dragPointerY: event.clientY,
				};
			});
		}, []);

		const stopResize = useCallback(() => {
			document.removeEventListener("pointermove", doResize);
			document.removeEventListener("pointerup", stopResize);
		}, [doResize]);

		const onResize = useCallback(
			(event: React.PointerEvent) => {
				event.stopPropagation();
				setInfo((pre) =>
					pre
						? {
								...pre,
								dragPointerX: event.clientX,
								dragPointerY: event.clientY,
						  }
						: pre
				);
				document.addEventListener("pointermove", doResize);
				document.addEventListener("pointerup", stopResize);
			},
			[doResize, stopResize]
		);

		const onHover = useCallback(() => {
			setInfo((pre) => (pre ? { ...pre, hover: true } : pre));
		}, []);

		const stopHover = useCallback(() => {
			setInfo((pre) => (pre ? { ...pre, hover: false } : pre));
		}, []);

		return (
			<div
				ref={elementRef}
				style={
					info
						? {
								...style,
								position: "relative",
								width: info.width,
								height: info.height,
						  }
						: { ...style, position: "relative", ...initialSize }
				}
				onPointerEnter={onHover}
				onPointerLeave={stopHover}
				{...props}
			>
				<WrappedComponent>{children}</WrappedComponent>
				<div hidden={info?.hover ? false : true}>
					<HighlightOffIcon sx={{ position: "absolute", top: 0 }} />
				</div>

				<div
					hidden={info?.hover ? false : true}
					onPointerDown={onResize}
				>
					<OpenInFullIcon
						sx={{
							position: "absolute",
							right: 0,
							bottom: 0,
							rotate: "90deg",
						}}
					/>
				</div>
			</div>
		);
	};
}
