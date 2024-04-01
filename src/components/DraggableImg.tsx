import { motion } from "framer-motion";

export default function DraggableImg({ imgUrl }) {
	return (
		<motion.img
			src={imgUrl}
			key={imgUrl}
			drag
			whileDrag={{
				border: "1px dotted blue",
				"border-radius": "5px",
			}}
		/>
	);
}
