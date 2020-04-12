import {
	observable, action,
	// computed
} from "mobx";
import { INotificationStore, INotificationList, IPositions } from './interfaces';


class NotificationStore implements INotificationStore {
	
	@observable notificationList = {} as INotificationList;
	
	@action addNotification = (position: IPositions, content: string, duration: number = 0, title: string = '', type: string = 'alert') => {

		const key = new Date().getTime() + Math.floor(Math.random() * 10000);

		if (!this.notificationList[position]) this.notificationList[position] = {}

		this.notificationList[position][key] = {
			duration,
			title,
			content,
			type
		}
		if (duration){
			setTimeout(() => {
				delete this.notificationList[position][key];
			}, duration);
		}
	}
}

export default NotificationStore;