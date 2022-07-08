import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import AuthHelper from "../helpers/AuthHelper";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

interface Props {
	isLightMode: boolean;
	toggleLightMode: (checked: boolean) => void;
}

// TODO: Add dark mode toggler
const Header = ({ isLightMode, toggleLightMode }: Props) => {
	const [ toggleSearch, setToggleSearch ] = useState<boolean>(false);
	const [ keywords, setKeywords ] = useState<string>();

	const handleSearch = (e : React.FormEvent) => {
		e.preventDefault();

		window.location.href = `/search/${ keywords }`;
	}

	return (
		<div>
			<nav id="main-nav">
				<div className="container">
					<div id="logo-img-wrap">
						<Link href="/">
							<a href="/">
								<img src="/logo.png" id="logo-img" alt="" />
							</a>
						</Link>
					</div>
					
					<div id="nav-left">
						<div id="nav-links">
							<Link href="/shows"><a className="nav-link">TV</a></Link>
							<Link href="/movies"><a className="nav-link">Movies</a></Link>
							<Link href=""><a className="nav-link">Discover</a></Link>

							{ AuthHelper.isLogged() && <Link href="/history"><a className="nav-link">Your History</a></Link> }
							{ AuthHelper.isLogged() && <Link href=""><a className="nav-link">Your Progress</a></Link> }
						</div>
					</div>

					<div id="nav-right">
						<div id="nav-right-links">
							<div className="account-btns">
								{ !AuthHelper.isLogged() && 
									<Link href="/login/">
										<a href="/login/">
											<div className="account-btn">Login/Register</div>
										</a>
									</Link>
								}

								{ AuthHelper.isLogged() && 
									<Link href="/profile/">
										<a href="/profile/">
											<div className="account-btn">My Profile</div>
										</a>
									</Link>
								}

								<div id="dark-mode-toggler">
									<DarkModeSwitch
										style={{ marginBottom: '0' }}
										checked={isLightMode}
										onChange={toggleLightMode}
										size={30}
									/>
								</div>
							</div>
							
							<form id="header-search-btn" onSubmit={ (e) => handleSearch(e) }>
								<AiOutlineSearch onClick={ () => setToggleSearch(!toggleSearch) }/>
								{ toggleSearch &&
									<input type="text" id="header-search-input" placeholder="Your search words" value={ keywords } onChange={ (e) => setKeywords(e.target.value) }/>
								}
							</form>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
