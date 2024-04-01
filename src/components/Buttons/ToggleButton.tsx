import { useState } from "react";
import { motion } from "framer-motion";

export default function ToggleButton({
	children,
	toggleStyles = [
		{ backgroundColor: "white", color: "#007bff" },
		{ backgroundColor: "#027bff", color: "white" },
	],
	select = false,
	...props
}) {
	const [selected, setSelected] = useState(select);

	function handleClick() {
		setSelected((preState) => !preState);
	}
	return (
		<motion.button
			type="button"
			onClick={handleClick}
			animate={toggleStyles[+selected]}
			initial={false}
			{...props}
			whileHover={{ opacity: 0.5 }}
		>
			{children}
		</motion.button>
	);
}
