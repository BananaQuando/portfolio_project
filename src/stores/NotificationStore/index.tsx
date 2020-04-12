import {
	observable, action,
	// computed
} from "mobx";
import { INotificationStore, IAlertType, IPositions, IPositionsList, INotification } from './interfaces';

const defaultSettings = {
	position: 'top-right',
	duration: 0,
	title: '',
	type: 'success'
} as INotification;

class NotificationStore implements INotificationStore {
	
	@observable positionsList = {} as IPositionsList;
	
	@action addNotification = (data: INotification) => {

		const { position, content, title, duration, type } = { ...defaultSettings, ...data };

		const id = new Date().getTime() + Math.floor(Math.random() * 10000);

		if (!this.positionsList[position!]) this.positionsList[position!] = {}

		this.positionsList[position!][id] = {
			id,
			position,
			duration,
			title,
			content,
			type
		}
		if (duration){
			setTimeout(() => {
				delete this.positionsList[position!][id];
			}, duration);
		}
	}

	@action deleteNotification = (position: IPositions, id: number) => {

		delete this.positionsList[position][id];
	}
}

export default NotificationStore;