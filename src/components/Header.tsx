import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/profile-photo.webp";

import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function Header() {
	//const navigate = useNavigate();
	return (
		<>
			<div id="header">
				<Link to="/">
					<img src={logo} alt="a girl is solving math problem" />
				</Link>

				<menu>
					<li>
						<NavLink
							to="/"
							className={({
								isActive,
								isPending,
								isTransitioning,
							}) =>
								[
									isPending ? "pending" : "",
									isActive ? "active" : "",
									isTransitioning ? "transitioning" : "",
								].join(" ")
							}
						>
							<LibraryBooksOutlinedIcon />
							Problems
						</NavLink>
					</li>
					<li>
						<NavLink to="/add">
							<AddOutlinedIcon />
							Add
						</NavLink>
					</li>
				</menu>
			</div>
			<Outlet />
		</>
	);
}
