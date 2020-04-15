import UserStore from './UserStore';
import NotificationStore from './NotificationStore';
import SidebarMenuStore from './SidebarMenuStore';
import SEOStore from './SEOStore';

interface Stores {
	[key: string]: any;
}

export const stores: Stores = {
	userStore: new UserStore(),
	notificationStore: new NotificationStore(),
	sidebarMenuStore: new SidebarMenuStore(),
	seoStore: new SEOStore(),
}