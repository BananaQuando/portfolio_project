import React from 'react';
import { ISidebarMenuItem } from '../../../stores/SidebarMenuStore/interfaces';
import { Link } from 'react-router-dom';

import './styles.sass';

interface Props {
	data: ISidebarMenuItem
}


class SidebarMenuItem extends React.Component <Props> {

	onClickHandler = () => {

		const { id } = this.props.data;

		document.getElementById(`childrens-of-${id}`)!.classList.toggle('mm-show');
		document.getElementById(`toggle-title-${id}`)!.classList.toggle('active');
	}

	render() {

		const {
			id,
			children,
			type,
			link,
			title,
			icon,
			level
		} = this.props.data;

		return <li className={`app-sidebar__${type}`}>
			{ type === 'menu_container' && <span className='app-sidebar__heading'>{ title }</span> }
			{ type !== 'menu_container' && (
				link ? 
					<Link to={link} className={`${ icon ? 'link-with-icon' : '' } level-${level}`}>
						{ icon && <i className={`metismenu-icon ${icon}`}></i> }
						{ title }
					</Link>
					: 
					<span onClick={ children ? this.onClickHandler : () => {}} id={`toggle-title-${id}`} className={`sidebar-title ${ icon ? 'link-with-icon' : '' } ${ children ? 'toggle-childrens' : ''}`}>
						{ icon && <i className={`metismenu-icon ${icon}`}></i> }
						{ title }
					</span>
			) }
			{ children && <ul className={`${ level > 1 ? 'mm-collapse' : '' }`} id={`childrens-of-${id}`}>
				{
					children.map((menuItem: ISidebarMenuItem, index) => (
						<SidebarMenuItem key={index} data={menuItem} />
					))
				}
			</ul> }
		</li>
	}
}

export default SidebarMenuItem;