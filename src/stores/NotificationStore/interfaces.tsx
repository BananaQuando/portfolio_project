export interface INotificationStore {
	addNotification: Function
	deleteNotification: Function
	positionsList: IPositionsList
}

export type IPositions = 'top-right' | 'top-left' | 'top-center' | 'top-full-width' | 'bottom-right' | 'bottom-left' | 'bottom-center' | 'bottom-full-width';

export type IAlertType = 'success' | 'info' | 'warning' | 'error';

export type IPositionsList = {
	[index in IPositions]: INotificationList
}

export interface INotificationList {
	[key: number]: INotification
}

export interface INotification {
	id: number
	position?: IPositions
	duration?: number
	title?: string
	content: string
	type?: IAlertType
}