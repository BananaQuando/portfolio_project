export interface INotificationStore {
	addNotification: Function
	notificationList: INotificationList
}

export type IPositions = 'top-right' | 'top-left' | 'top-center' | 'top-full-width' | 'bottom-right' | 'bottom-left' | 'bottom-center' | 'bottom-full-width';

export type INotificationList = {
	[index in IPositions]: {
		[key: number]: INotification
	}
}

export interface INotification {
	duration: number,
	title: string,
	content: string,
	type: string,
}