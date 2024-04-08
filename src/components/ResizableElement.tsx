/* eslint-disable no-mixed-spaces-and-tabs */
import { useRef, useState, useEffect, useCallback } from "react";

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function ResizableElement({
	children,
	initialSize = { width: "calc(max(20vw, 100px))", height: "auto" },
	...props
}: {
	children: JSX.Element;
	initialSize: { width?: number | string; height?: number | string };
	[x: string]:
		| JSX.Element
		| boolean
		| string
		| number
		| { [x: string]: string | number | boolean };
}) {
	const elementRef = useRef(null);

	const [info, setInfo] = useState<null | {
		height: number;
		width: number;
		dragPointerX: number;
		dragPointerY: number;
		hover: boolean;
	}>(null);

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
		console.log("pointermove on ResizableElement");
		setInfo((pre) => {
			if (!pre) return pre;
			const deltaX = event.clientX - pre.dragPointerX;
			const deltaY = event.clientY - pre.dragPointerY;
			if (pre.width + deltaX < 10 || pre.height + deltaY < 10) return pre;

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
		console.log("pointerup on ResizableElement");
		document.removeEventListener("pointermove", doResize);
		document.removeEventListener("pointerup", stopResize);
	}, [doResize]);

	const onResize = useCallback(
		(event: React.PointerEvent) => {
			console.log("pointerdown on ResizableElement");
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
		console.log("pointerenter on ResizableElement");
		setInfo((pre) => (pre ? { ...pre, hover: true } : pre));
	}, []);

	const stopHover = useCallback(() => {
		console.log("pointerleave on ResizableElement");
		setInfo((pre) => (pre ? { ...pre, hover: false } : pre));
	}, []);

	return (
		<div
			ref={elementRef}
			style={
				info
					? {
							position: "relative",
							width: info.width,
							height: info.height,
					  }
					: { position: "relative", ...initialSize }
			}
			onPointerEnter={onHover}
			onPointerLeave={stopHover}
			{...props}
		>
			{children}
			<div hidden={info?.hover ? false : true}>
				<HighlightOffIcon sx={{ position: "absolute", top: 0 }} />
			</div>

			<div hidden={info?.hover ? false : true} onPointerDown={onResize}>
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
}
