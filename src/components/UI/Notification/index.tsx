import React from 'react';
import { inject, observer } from 'mobx-react';
import { INotificationStore, INotificationList, IPositions } from '../../../stores/NotificationStore/interfaces';

interface Props{
	notificationStore?: INotificationStore
}

@inject('notificationStore')
@observer
class Notifications extends React.Component <Props>{

	generateNotifications = (list: INotificationList) => {

		Object.keys(list).forEach((key: in IPositions) => {

			console.log(list[key])
		})
	}

	render() {

		const { notificationList } = this.props.notificationStore!

		return <>
			{ this.generateNotifications(notificationList) }
		</>
	}
}

export default Notifications;