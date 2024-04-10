import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/profile-photo.webp";

import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
	const [headerDisplay, setHeaderDisplay] = useState(true);

	function toggleHeader() {
		setHeaderDisplay((pre) => !pre);
	}

	return (
		<>
			<motion.div
				id="header"
				variants={{
					show: { opacity: 1, y: 0 },
					hide: { opacity: 0, height: 0, y: "-100%" },
				}}
				initial={false}
				animate={headerDisplay ? "show" : "hide"}
				transition={{ duration: 0.5 }}
			>
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
			</motion.div>
			<motion.p
				id="header-toggle-icon"
				variants={{
					show: { rotate: "0deg", opacity: 0.3, y: 0 },
					hide: { rotate: "180deg", opacity: 0.3, y: 0 },
				}}
				initial={false}
				animate={headerDisplay ? "show" : "hide"}
				whileHover={{ opacity: 0.6 }}
				transition={{ duration: 0.5 }}
			>
				<KeyboardDoubleArrowUpIcon onClick={toggleHeader} />
			</motion.p>
			<Outlet />
		</>
	);
}
