import React from 'react';
import { INotification, INotificationStore } from '../../../stores/NotificationStore/interfaces';
import './styles.sass';
import { inject, observer } from 'mobx-react';


interface Props {
	data: INotification
	notificationStore?: INotificationStore
}

@inject('notificationStore')
@observer
class NotificationItem extends React.Component <Props> {

	onRemoveHandler = (event: any) => {

		const { id, position } = this.props.data;

		this.props.notificationStore!.deleteNotification(position, id);
	}

	render() {

		const { title, content, duration, type } = this.props.data;

		return (
			<div className={`toast toast-${type}`} aria-live='polite'>
				<button onClick={this.onRemoveHandler} className="toast-close"><i className='pe-7s-close'></i></button>
				{ (duration! > 0) && <div className='toast-progress' style={ {animationDuration: `${(duration! / 1000)}s`} } /> }
				{ (title!.length > 0) && <div className="toast-title">{ title }</div> }
				<div className="toast-message">
					{ content }
				</div>
			</div>
		)
	}
}

export default NotificationItem;