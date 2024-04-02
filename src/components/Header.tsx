import { Link, Outlet } from "react-router-dom";
import logo from "../assets/profile-photo.webp";

export default function Header() {
	//const navigate = useNavigate();
	return (
		<>
			<div id="header">
				<Link to="/">
					<img src={logo} alt="a girl is solving math problem" />
				</Link>
			</div>
			<Outlet />
		</>
	);
}
