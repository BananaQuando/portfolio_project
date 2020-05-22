import React from 'react';
import { action } from 'mobx';


interface Props{
	active?: boolean,
	name: string,
	tabsID: string,
	link: string
}

export default class TabButton extends React.Component<Props> {

	@action onClickHandler = (_event: any) =>{

		_event.preventDefault();

		const { tabs_id, link } = _event.target.dataset;

		console.log(_event.target.dataset)

		document.querySelectorAll(`#${tabs_id} .tab-pane`).forEach(tab => {
			tab.classList.remove("active");
		});

		document.querySelectorAll(`#${tabs_id} .card-header .btn`).forEach(link => {
			link.classList.remove("active");
		});

		_event.target.classList.add('active');
		document.querySelector(link).classList.add('active');
	}


	render() {

		const { name, tabsID, link, active } = this.props;

		return (
			<button
				data-toggle="tab"
				data-tabs_id={tabsID}
				data-link={ link }
				onClick={this.onClickHandler}
				className={`btn-shadow btn btn-primary show ${ active ? 'active' : '' }`}>
				{ name }
			</button>
		);
	}
}