import React from 'react';

interface Props{
	id?: string,
	className?: string
}


class Nav extends React.Component<Props>{

	render() {
		return (
			<ul className={`nav ${this.props.className}`} id={this.props.id}>
				{ this.props.children }
			</ul>
		);
	}
}

export default Nav;