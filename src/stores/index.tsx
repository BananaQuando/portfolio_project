import UserStore from './UserStore';

interface Stores {
	[key: string]: any;
}

export const stores: Stores = {
	userStore: new UserStore()
}