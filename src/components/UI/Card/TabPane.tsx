import React from 'react';

interface Props{
	className?: string,
	id?: string,
	active?: boolean
}

class TabPane extends React.Component <Props> {

	render() {

		const {
			className,
			id,
			active
		} = this.props;

		return (
			<div className={`tab-pane show ${className ? className : ''} ${active ? 'active' : ''}`} id={id} role="tabpanel">
				{ this.props.children }
			</div>
		);
	}
}

export default TabPane;