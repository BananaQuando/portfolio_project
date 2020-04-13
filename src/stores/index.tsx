import UserStore from './UserStore';
import NotificationStore from './NotificationStore'
import SidebarMenuStore from './SidebarMenuStore'

interface Stores {
	[key: string]: any;
}

export const stores: Stores = {
	userStore: new UserStore(),
	notificationStore: new NotificationStore(),
	sidebarMenuStore: new SidebarMenuStore(),
}