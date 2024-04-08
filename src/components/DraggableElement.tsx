/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useRef, useState, useEffect, useCallback } from "react";

export default function DraggableElement({
	children,
	...props
}: {
	children: JSX.Element;
	[x: string]: JSX.Element | boolean | string | number;
}) {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const [info, setInfo] = useState<null | {
		left: number;
		top: number;
		dragPointerX: number;
		dragPointerY: number;
		hover: boolean;
		dragging: boolean;
	}>(null);
	console.log(wrapperRef.current);

	useEffect(() => {
		if (wrapperRef.current === null) return;
		setInfo({
			left: wrapperRef.current["clientLeft"],
			top: wrapperRef.current["clientTop"],
			dragPointerX: 0,
			dragPointerY: 0,
			hover: false,
			dragging: false,
		});

		return () => {
			setInfo(null);
		};
	}, [wrapperRef]);

	const doDrag = useCallback((event: PointerEvent) => {
		console.log("pointermove on DraggableElement");
		setInfo((pre) => {
			if (!pre) return pre;
			const deltaX = event.clientX - pre.dragPointerX;
			const deltaY = event.clientY - pre.dragPointerY;
			return {
				...pre,
				left: pre.left + deltaX,
				top: pre.top + deltaY,
				dragPointerX: event.clientX,
				dragPointerY: event.clientY,
			};
		});
	}, []);

	const stopDrag = useCallback(() => {
		setInfo((pre) => (pre ? { ...pre, dragging: false } : pre));
		document.removeEventListener("pointermove", doDrag);
		document.removeEventListener("pointerup", stopDrag);
	}, [doDrag]);

	const onDragStart = useCallback(
		(event: React.PointerEvent) => {
			//event.stopPropagation();
			setInfo((pre) =>
				pre
					? {
							...pre,
							dragging: true,
							dragPointerX: event.clientX,
							dragPointerY: event.clientY,
					  }
					: pre
			);
			document.addEventListener("pointermove", doDrag);
			document.addEventListener("pointerup", stopDrag);
		},
		[doDrag, stopDrag]
	);

	return (
		<div
			ref={wrapperRef}
			onPointerDown={onDragStart}
			style={
				info
					? {
							position: "relative",
							height: "fit-content",
							width: "fit-content",
							left: info.left,
							top: info.top,
					  }
					: {
							position: "relative",
							height: "fit-content",
							width: "fit-content",
					  }
			}
			{...props}
		>
			<div style={info?.dragging ? { pointerEvents: "none" } : undefined}>
				{children}
			</div>
		</div>
	);
}
