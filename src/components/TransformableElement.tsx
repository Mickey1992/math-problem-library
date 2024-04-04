/* eslint-disable no-mixed-spaces-and-tabs */
import { useRef, useState, useEffect } from "react";
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

	useEffect(() => {
		console.log(elementRef.current.firstChild);
		setInfo({
			height: elementRef?.current?.offsetHeight ?? 0,
			width: elementRef?.current?.offsetWidth ?? 0,
			left: wrapper?.current?.clientLeft ?? 0,
			top: wrapper?.current?.clientTop ?? 0,
			dragPointerX: 0,
			dragPointerY: 0,
			hover: false,
		});

		return () => {
			setInfo(null);
		};
	}, [wrapper]);

	function onDrag(event) {
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
	}

	function doDrag(event) {
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
	}

	function stopDrag() {
		document.removeEventListener("pointermove", doDrag);
		document.removeEventListener("pointerup", stopDrag);
	}

	function onResize(event) {
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
	}

	function doResize(event) {
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
	}

	function stopResize() {
		document.removeEventListener("pointermove", doResize);
		document.removeEventListener("pointerup", stopResize);
	}
	function onHover() {
		setInfo((pre) => (pre ? { ...pre, hover: true } : pre));
	}

	function stopHover() {
		setInfo((pre) => (pre ? { ...pre, hover: false } : pre));
	}

	return (
		<div
			ref={wrapper}
			onPointerDown={onDrag}
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
