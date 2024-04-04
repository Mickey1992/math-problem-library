/* eslint-disable no-mixed-spaces-and-tabs */
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { useState, useEffect, useRef } from "react";

interface DraggableItemInfo {
	height: number;
	width: number;
	left: number;
	top: number;
	dragPointerX: number;
	dragPointerY: number;
	hover: boolean;
}

export default function DraggableImg({ imgUrl, ...props }: { imgUrl: string }) {
	const container = useRef(null);
	const image = useRef(null);

	const [info, setInfo] = useState<null | DraggableItemInfo>(null);

	console.log(info);

	useEffect(() => {
		setInfo({
			height: image?.current?.offsetHeight ?? 0,
			width: image?.current?.offsetWidth ?? 0,
			left: container?.current?.clientLeft ?? 0,
			top: container?.current?.clientTop ?? 0,
			dragPointerX: 0,
			dragPointerY: 0,
			hover: false,
		});

		return () => {
			setInfo(null);
		};
	}, [container]);

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
		document.removeEventListener("pointermove", stopResize);
	}

	function onDrag(event) {
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
		document.removeEventListener("pointermove", stopDrag);
	}

	function onHover() {
		setInfo((pre) => (pre ? { ...pre, hover: true } : pre));
	}

	function stopHover() {
		setInfo((pre) => (pre ? { ...pre, hover: false } : pre));
	}

	return (
		<div
			{...props}
			ref={container}
			style={
				info
					? { position: "relative", left: info.left, top: info.top }
					: { position: "relative" }
			}
			onPointerDown={onDrag}
			onPointerEnter={onHover}
			onPointerLeave={stopHover}
		>
			<img
				src={imgUrl}
				style={
					info
						? {
								pointerEvents: "none",
								width: info.width,
								height: info.height,
						  }
						: { pointerEvents: "none" }
				}
				ref={image}
			/>
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
