import React from 'react';
import SidebarMenu from './SidebarMenu';


class Sidebar extends React.Component{

	render(){

		return (
			<div className="app-sidebar sidebar-shadow bg-vicious-stance sidebar-text-light">
				<div className="scrollbar-sidebar ps ps--active-y">
					<div className="app-sidebar__inner">
						<ul className="vertical-nav-menu">
							<SidebarMenu />
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Sidebar;