import React from 'react';

interface Props{
	id?: string,
	className?: string,
	closable?: boolean
}

class Alert extends React.Component <Props>{

	render() {

		const {
			id,
			className,
			// closable
		} = this.props

		return (
			<div id={id} className={`alert ${ className ? className : ''}`} role="alert">
				{ this.props.children }
			</div>
		);
	}
}

export default Alert;