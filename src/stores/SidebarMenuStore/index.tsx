import {
	observable, action,
	// computed
} from "mobx";
import { ISidebarMenuStore, ISidebarMenuList } from './interfaces';
import { getMenu } from "../../utils/api";


class SidebarMenuStore implements ISidebarMenuStore {
	
	@observable SidebarMenu = {} as ISidebarMenuList;

	@action getMenu = async () => {

		if (Object.keys(this.SidebarMenu).length === 0) {
			
			const menu = await getMenu();

			this.SidebarMenu.list = menu;
		}

		return this.SidebarMenu;
	}
}

export default SidebarMenuStore;