import React from 'react';
import { ISidebarMenuStore, ISidebarMenuList, ISidebarMenuItem } from '../../stores/SidebarMenuStore/interfaces';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import SidebarMenuItem from './SidebarMenuItem';

interface Props {
	sidebarMenuStore?: ISidebarMenuStore
}

@inject('sidebarMenuStore')
@observer
class SidebarMenu extends React.Component <Props> {

	@observable menu = {} as ISidebarMenuList; 

	async componentDidMount () {

		this.menu = await this.props.sidebarMenuStore!.getMenu();
	}

	generateMenu = (menuList: ISidebarMenuItem[]) => {

		const result = [] as any[];

		menuList.forEach((menuItem: ISidebarMenuItem, index) => {
			
			result.push(<SidebarMenuItem key={index} data={menuItem} />);
		});

		return result;
	}

	render() {

		return <>
			{ this.menu.list && this.generateMenu(this.menu.list) }
		</>
	}
}

export default SidebarMenu;