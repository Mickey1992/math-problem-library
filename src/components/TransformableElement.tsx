/* eslint-disable no-mixed-spaces-and-tabs */
import { useRef, useState, useEffect, useCallback } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import styled from "styled-components";

const StyledElement = styled.div`
	pointer-events: none;
`;
export default function TransformableElement({
	children,
	resizable,
	draggable,
	hideable,
	...props
}: {
	children: JSX.Element;
	resizable: boolean;
	draggable: boolean;
	hideable: boolean;
	[x: string]: JSX.Element | boolean | string | number;
}) {
	const wrapper = useRef(null);
	const elementRef = useRef(null);

	const [info, setInfo] = useState<null | {
		height: number;
		width: number;
		left: number;
		top: number;
		dragPointerX: number;
		dragPointerY: number;
		hover: boolean;
	}>(null);

	console.log(info);
	useEffect(() => {
		if (elementRef?.current === null || wrapper?.current === null) return;
		setInfo({
			height: elementRef.current["offsetHeight"],
			width: elementRef.current["offsetWidth"],
			left: wrapper.current["clientLeft"],
			top: wrapper.current["clientTop"],
			dragPointerX: 0,
			dragPointerY: 0,
			hover: false,
		});

		return () => {
			setInfo(null);
		};
	}, [wrapper]);

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
		document.removeEventListener("pointermove", doDrag);
		document.removeEventListener("pointerup", stopDrag);
	}, [doDrag]);

	const onDrag = useCallback(
		(event: React.PointerEvent) => {
			console.log("pointerdown on DraggableElement");
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
			document.addEventListener("pointermove", doDrag);
			document.addEventListener("pointerup", stopDrag);
		},
		[doDrag, stopDrag]
	);

	const doResize = useCallback((event: PointerEvent) => {
		setInfo((pre) => {
			if (!pre) return pre;
			const deltaX = event.clientX - pre.dragPointerX;
			const deltaY = event.clientY - pre.dragPointerY;
			if (pre.width + deltaX < 10 || pre.height + deltaY < 10) return pre;

			const scale = (deltaX + pre.width) / pre.width;
			return {
				...pre,
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
			ref={wrapper}
			onPointerDown={draggable ? onDrag : undefined}
			onPointerEnter={onHover}
			onPointerLeave={stopHover}
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
					  }
			}
			{...props}
		>
			<StyledElement
				ref={elementRef}
				className="element"
				style={
					info
						? {
								position: "relative",
								width: info.width,
								height: info.height,
						  }
						: {
								position: "relative",
								width: "100%",
								height: "100%",
						  }
				}
			>
				{children}
			</StyledElement>
			{hideable && (
				<div hidden={info?.hover ? false : true}>
					<HighlightOffIcon sx={{ position: "absolute", top: 0 }} />
				</div>
			)}
			{resizable && (
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
			)}
		</div>
	);
}
