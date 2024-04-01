export default function ToggleButtonGroup({ children, onToggle, ...props }) {
	function handleClick(event) {
		onToggle(event.target.getAttribute("value"));
	}

	return (
		<div onClick={handleClick} {...props}>
			{children}
		</div>
	);
}
