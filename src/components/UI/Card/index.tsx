import React from 'react';

interface Props{
	className?: string,
	id?: string,
	// headerClass?: string,
	bodyClass?: string,
}

class Card extends React.Component <Props>{

	render() {

		const {
			className,
			id,
			bodyClass
		} = this.props;

		return (
			<div id={id} className={`card ${className ? className : ''}`}>
				<div className={`card-body ${bodyClass ? bodyClass : ''}`}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Card;