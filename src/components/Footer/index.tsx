import React from 'react';
import Nav from '../UI/Nav';
import NavItem from '../UI/Nav/NavItem';
import NavLink from '../UI/Nav/NavLink';


class Footer extends React.Component{

	render() {

		return(
			<div className="app-wrapper-footer">
				<div className="app-footer">
					<div className="app-footer__inner">
						<div className="app-footer-left">
							<Nav>
								<NavItem>
									<NavLink to='/'>Footer Link 1</NavLink>
								</NavItem>
							</Nav>
						</div>
						<div className="app-footer-right">
							<Nav>
								<NavItem>
									<NavLink to='/'>Footer Link 3</NavLink>
								</NavItem>
								<NavItem>
									<NavLink to='/'>
										<span className="badge badge-success mr-1 ml-0">
											<small>NEW</small>
										</span>
										Footer Link 4
									</NavLink>
								</NavItem>
							</Nav>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default Footer;