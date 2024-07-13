import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
	return (
		<header className="header">
			<div className="header-container">
				<Link to="/" className="header-logo-link">
					<div className="header-icon-container">
						<div className="header-icon-background"></div>
						<div className="header-icon">
							<span className="header-plus">+</span>
						</div>
					</div>
					<h1 className="header-title">BANCO</h1>
				</Link>
			</div>
		</header>
	);
};

export default Header;
