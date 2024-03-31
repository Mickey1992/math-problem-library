import { Outlet } from "react-router-dom";
import logo from "../assets/profile-photo.webp";

export default function Header() {
	return (
		<>
			<div id="header">
				<img src={logo} alt="a girl is solving math problem" />
			</div>
			<Outlet />
		</>
	);
}
