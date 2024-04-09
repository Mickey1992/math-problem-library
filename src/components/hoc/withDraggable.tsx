/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useRef, useState, useCallback } from "react";
import { WrappedComponentProps } from "./common";

interface DragInfo {
	left: number;
	top: number;
	dragPointerX: number;
	dragPointerY: number;
	dragging: boolean;
}

export default function withDraggable(
	WrappedComponent: React.ComponentType<WrappedComponentProps>
) {
	return function Draggable({
		children,
		...props
	}: {
		children: JSX.Element;
		[x: string]: JSX.Element | boolean | string | number;
	}) {
		const wrapperRef = useRef<HTMLDivElement | null>(null);
		const [info, setInfo] = useState<null | DragInfo>(null);

		const doDrag = useCallback((event: PointerEvent) => {
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
				setInfo((pre) => ({
					left: pre?.left || wrapperRef.current!["clientLeft"],
					top: pre?.top || wrapperRef.current!["clientTop"],
					hover: false,
					dragging: true,
					dragPointerX: event.clientX,
					dragPointerY: event.clientY,
				}));
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
				<WrappedComponent
					style={
						info?.dragging ? { pointerEvents: "none" } : undefined
					}
				>
					{children}
				</WrappedComponent>
			</div>
		);
	};
}
