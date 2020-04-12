import UserStore from './UserStore';
import NotificationStore from './NotificationStore'

interface Stores {
	[key: string]: any;
}

export const stores: Stores = {
	userStore: new UserStore(),
	notificationStore: new NotificationStore(),
}