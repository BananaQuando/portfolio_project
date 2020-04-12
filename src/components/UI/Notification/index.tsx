import React from 'react';
import { inject, observer } from 'mobx-react';
import { INotificationStore, INotificationList, IPositions, INotification, IPositionsList } from '../../../stores/NotificationStore/interfaces';
import NotificationItem from './NotificationItem';

interface Props{
	notificationStore?: INotificationStore
}

@inject('notificationStore')
@observer
class Notifications extends React.Component <Props>{

	generateNotifications = (positions: IPositionsList) => {

		const positionRecord:Record<IPositions, { [key: number]: INotification } > = positions;

		const result = [];
		for (const position in positions) {

			if (positions.hasOwnProperty(position)) {
				const notifications = positions[position as keyof typeof positionRecord];
				
				result.push(
					<div key={position} id={`toast-container-${position}`} className={`toast-${position} toast-container`}>
						{ this.addNotificationsToPosition(notifications) }
					</div>
				);
			}
		}

		return result;
	}

	addNotificationsToPosition = (notifications: INotificationList) => {

		const result = [];

		for (const key in notifications) {
			if (notifications.hasOwnProperty(key)) {
				const notification = notifications[key];
				
				result.push( <NotificationItem key={key} data={ notification } /> );
			}
		}

		return result;
	}

	render() {

		const { positionsList } = this.props.notificationStore!

		return <>
			{ this.generateNotifications(positionsList) }
		</>
	}
}

export default Notifications;