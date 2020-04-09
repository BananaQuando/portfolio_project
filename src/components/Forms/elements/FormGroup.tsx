import React from 'react';

interface Props {

	className?: string,
	id?: string
}

class FormGroup extends React.Component <Props>{

	render() {

		const {
			className,
			id
		} = this.props;

		return(
			<div id={id} className={`form-group ${className ? className : ''}`}>
				{ this.props.children }
			</div>
		);
	}
}

export default FormGroup;