import React from 'react';

interface Props{
	id?: string,
	className?: string
}


class NavItem extends React.Component<Props>{

	render() {
		return (
			<li className={`nav-item ${this.props.className}`} id={this.props.id}>
				{ this.props.children }
			</li>
		);
	}
}

export default NavItem;