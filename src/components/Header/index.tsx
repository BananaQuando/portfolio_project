import React from 'react';
import Hamburger from './Hamburger';
import './styles.sass';
import MobileHamburger from './Hamburger/MobileHamburger';

class Header extends React.Component{

	render() {
		return (
			<div className="app-header header-shadow bg-plum-plate header-text-light">
				<div className="app-header__logo">
					<div className="logo-src"></div>
					<div className="header__pane ml-auto">
						<div>
							<Hamburger />
						</div>
					</div>
				</div>
				<div className="app-header__mobile-menu">
					<div>
						<MobileHamburger />
					</div>
				</div>
				<div className="app-header__menu">
					<span>
						<button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
							<span className="btn-icon-wrapper">
								<i className="fa fa-ellipsis-v fa-w-6"></i>
							</span>
						</button>
					</span>
				</div>    
				<div className="app-header__content">
					<div className="app-header-left">
						<div className="search-wrapper">
							<div className="input-holder">
								<input type="text" className="search-input" placeholder="Type to search" />
								<button className="search-icon"><span></span></button>
							</div>
							<button className="close"></button>
						</div>
						<ul className="header-menu nav">
							<li className="nav-item">
								<a href="/" className="nav-link">
									<i className="nav-link-icon fa fa-database"></i>
									Statistics
								</a>
							</li>
							<li className="btn-group nav-item">
								<a href="/" className="nav-link">
									<i className="nav-link-icon fa fa-edit"></i>
									Projects
								</a>
							</li>
							<li className="dropdown nav-item">
								<a href="/" className="nav-link">
									<i className="nav-link-icon fa fa-cog"></i>
									Settings
								</a>
							</li>
						</ul>
					</div>
					<div className="app-header-right">
						<div className="header-btn-lg pr-0">
							<div className="widget-content p-0">
								<div className="widget-content-wrapper">
									<div className="widget-content-left">
										<div className="btn-group">
											<button data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="p-0 btn">
												<img width="42" className="rounded-circle" src="assets/images/avatars/1.jpg" alt="" />
												<i className="fa fa-angle-down ml-2 opacity-8"></i>
											</button>
											<div role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
												<button type="button" className="dropdown-item">User Account</button>
												<button type="button" className="dropdown-item">Settings</button>
												<h6 className="dropdown-header">Header</h6>
												<button type="button" className="dropdown-item">Actions</button>
												<div className="dropdown-divider"></div>
												<button type="button" className="dropdown-item">Dividers</button>
											</div>
										</div>
									</div>
									<div className="widget-content-left  ml-3 header-user-info">
										<div className="widget-heading">
											Alina Mclourd
										</div>
										<div className="widget-subheading">
											VP People Manager
										</div>
									</div>
									<div className="widget-content-right header-user-info ml-3">
										<button type="button" className="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
											<i className="fa text-white fa-calendar pr-1 pl-1"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;