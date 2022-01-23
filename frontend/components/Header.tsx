import React from "react";
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';

const Header = () => {
	return (
		<div>
			<nav id="main-nav">
				<img src="/logo.png" id="logo-img" alt="" />
				
				<div id="nav-left">
					<div id="nav-links">
						<Link href="/shows"><a className="nav-link">TV</a></Link>
						<Link href=""><a className="nav-link">Movies</a></Link>
						<Link href=""><a className="nav-link">Discover</a></Link>
						<Link href=""><a className="nav-link">Your History</a></Link>
						<Link href=""><a className="nav-link">Your Progress</a></Link>
					</div>
				</div>

				<div id="nav-right">
					<div id="nav-right-links">
						<div className="account-btns">
							<div className="account-btn">Login/Register</div>
						</div>
						
						<div id="header-search-btn">
							<AiOutlineSearch/>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
