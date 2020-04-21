import React from 'react';
import { observable } from 'mobx';

interface Props {
	className?: string,
	id?: string,
	type?: "button" | "submit" | "reset" | undefined,
	onClick?: Function,
}


class Button extends React.Component <Props>{

	@observable onClick = this.props.onClick ? this.props.onClick : () => {}

	onClickHandler = (event: any, context?: any) => {
		
		this.onClick(event, context);
	}

	render() {
		const {
			className,
			id,
			type,
		} = this.props;

		return (

			<button type={ type ? type : 'button'} id={id} onClick={this.onClickHandler} className={`btn ${ className ? className : 'btn-primary'}`}>{this.props.children}</button>
		);
	}
}

export default Button;