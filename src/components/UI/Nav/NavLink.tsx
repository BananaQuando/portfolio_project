import React from 'react';
import { Link } from 'react-router-dom';


interface Props{
	to: string,
	id?: string,
	className?: string
}


class NavLink extends React.Component<Props>{

	render() {
		return (
			<Link to={this.props.to} className={`nav-link ${this.props.className}`} id={this.props.id}>
				{ this.props.children }
			</Link>
		);
	}
}

export default NavLink;