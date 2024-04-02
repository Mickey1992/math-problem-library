import { motion, PanInfo } from "framer-motion";

import { useState } from "react";

export default function DraggableImg({ imgUrl }) {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	console.log(position);

	function onDragEnd(
		event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) {
		setPosition((prev) => ({
			x: prev.x + info.offset.x,
			y: prev.y + info.offset.y,
		}));
	}

	return (
		<motion.img
			src={imgUrl}
			key={imgUrl}
			initial={false}
			animate={position}
			drag
			whileDrag={{
				border: "1px dotted blue",
				"border-radius": "5px",
			}}
			onDragEnd={onDragEnd}
		/>
	);
}
